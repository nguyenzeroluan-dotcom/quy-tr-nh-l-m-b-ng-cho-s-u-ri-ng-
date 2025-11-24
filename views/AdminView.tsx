
import React, { useState, useEffect } from 'react';
import { dataManager } from '../lib/DataManager';
import { ProductInfo, TimelineItemData, ProductDetail } from '../types';
import { BaseModal } from '../components/Modal';
import { PlusIcon, TrashIcon, SettingsIcon, LeafIcon, XIcon, CheckCircleIcon } from '../components/Icons';
import FarmersmartLogo from '../components/Logo';

// --- Simple Toast Component ---
const Toast = ({ message, type, onClose }: { message: string, type: 'success' | 'error', onClose: () => void }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={`fixed top-4 right-4 z-[100] px-6 py-3 rounded-lg shadow-xl text-white font-bold animate-fade-in flex items-center gap-2 ${type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
            {type === 'success' ? <CheckCircleIcon className="w-5 h-5"/> : <XIcon className="w-5 h-5"/>}
            {message}
        </div>
    );
};

const AdminView = ({ onBack }: { onBack: () => void }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [activeTab, setActiveTab] = useState<'products' | 'timeline'>('products');
    const [toast, setToast] = useState<{msg: string, type: 'success' | 'error'} | null>(null);

    // Data State
    const [products, setProducts] = useState<ProductInfo[]>([]);
    const [timeline, setTimeline] = useState<TimelineItemData[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    // Edit State
    const [editingProduct, setEditingProduct] = useState<ProductInfo | null>(null);
    const [editingTimeline, setEditingTimeline] = useState<TimelineItemData | null>(null);

    useEffect(() => {
        if (isAuthenticated) {
            refreshData();
        }
    }, [isAuthenticated]);

    const showToast = (msg: string, type: 'success' | 'error') => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3000);
    };

    const refreshData = async () => {
        setLoading(true);
        try {
            const p = await dataManager.getProducts();
            const t = await dataManager.getTimeline();
            setProducts(p);
            setTimeline(t);
        } catch (e) {
            showToast('Lỗi tải dữ liệu', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === 'admin123') {
            setIsAuthenticated(true);
        } else {
            alert('Sai mật khẩu! (Gợi ý: admin123)');
        }
    };

    // --- Product Handlers ---
    const handleSaveProduct = async () => {
        if (editingProduct) {
            if (!editingProduct.id || !editingProduct.name) {
                showToast("Vui lòng nhập ID và Tên sản phẩm", 'error');
                return;
            }
            try {
                await dataManager.saveProduct(editingProduct);
                await refreshData();
                setEditingProduct(null);
                showToast("Lưu sản phẩm thành công", 'success');
            } catch (e) {
                showToast("Lưu thất bại", 'error');
            }
        }
    };

    const handleDeleteProduct = async (id: string) => {
        if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
            try {
                await dataManager.deleteProduct(id);
                await refreshData();
                showToast("Đã xóa sản phẩm", 'success');
            } catch (e) {
                showToast("Xóa thất bại", 'error');
            }
        }
    };

    // --- Timeline Handlers ---
    const handleSaveTimeline = async () => {
        if (editingTimeline) {
            if (!editingTimeline.title) {
                showToast("Vui lòng nhập tên quy trình", 'error');
                return;
            }
            // Recalculate total cost
            const total = editingTimeline.productDetails?.reduce((sum, item) => sum + (item.totalCost || 0), 0) || 0;
            const itemToSave = { ...editingTimeline, totalCost: total };

            try {
                await dataManager.saveTimelineItem(itemToSave);
                await refreshData();
                setEditingTimeline(null);
                showToast("Lưu quy trình thành công", 'success');
            } catch (e) {
                showToast("Lưu thất bại", 'error');
            }
        }
    };

    const handleDeleteTimeline = async (id: number) => {
        if (confirm('Bạn có chắc chắn muốn xóa bước quy trình này?')) {
            try {
                await dataManager.deleteTimelineItem(id);
                await refreshData();
                showToast("Đã xóa quy trình", 'success');
            } catch (e) {
                showToast("Xóa thất bại", 'error');
            }
        }
    };

    const handleAddTimelineDetail = () => {
        if (!editingTimeline) return;
        const newDetails = [...(editingTimeline.productDetails || [])];
        newDetails.push({
            name: '',
            purpose: '',
            dosage: '',
            unit: 'kg',
            quantity: 1,
            totalCost: 0
        });
        setEditingTimeline({ ...editingTimeline, productDetails: newDetails });
    };

    const handleUpdateTimelineDetail = (index: number, field: keyof ProductDetail, value: any) => {
        if (!editingTimeline || !editingTimeline.productDetails) return;
        const newDetails = [...editingTimeline.productDetails];
        newDetails[index] = { ...newDetails[index], [field]: value };
        setEditingTimeline({ ...editingTimeline, productDetails: newDetails });
    };

    const handleRemoveTimelineDetail = (index: number) => {
        if (!editingTimeline || !editingTimeline.productDetails) return;
        const newDetails = editingTimeline.productDetails.filter((_, i) => i !== index);
        setEditingTimeline({ ...editingTimeline, productDetails: newDetails });
    };

    // --- Filtered Data ---
    const filteredProducts = products.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.id.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredTimeline = timeline.filter(t => 
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.stageLabel.toLowerCase().includes(searchQuery.toLowerCase())
    );


    // --- Render Login ---
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded-xl shadow-lg w-96">
                    <div className="flex justify-center mb-6">
                        <FarmersmartLogo className="h-12" />
                    </div>
                    <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Đăng Nhập Quản Trị</h2>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <input 
                            type="password" 
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                            placeholder="Mật khẩu (admin123)"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="submit" className="w-full bg-green-700 text-white font-bold py-3 rounded-lg hover:bg-green-800 transition-colors">
                            Truy Cập
                        </button>
                    </form>
                    <button onClick={onBack} className="w-full mt-4 text-gray-500 hover:text-gray-700 text-sm">
                        Quay lại trang chủ
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}

            {/* Sidebar */}
            <aside className="w-64 bg-green-900 text-white fixed h-full overflow-y-auto flex flex-col z-10 shadow-xl">
                <div className="p-6 flex-grow">
                    <FarmersmartLogo className="h-8 mb-8 brightness-0 invert" />
                    <nav className="space-y-2">
                        <button 
                            onClick={() => { setActiveTab('products'); setSearchQuery(''); }}
                            className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${activeTab === 'products' ? 'bg-green-700 font-bold' : 'hover:bg-green-800'}`}
                        >
                            <LeafIcon className="w-5 h-5" /> Sản Phẩm
                        </button>
                        <button 
                            onClick={() => { setActiveTab('timeline'); setSearchQuery(''); }}
                            className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${activeTab === 'timeline' ? 'bg-green-700 font-bold' : 'hover:bg-green-800'}`}
                        >
                            <SettingsIcon className="w-5 h-5" /> Quy Trình
                        </button>
                    </nav>
                </div>
                <div className="p-4 border-t border-green-800">
                    <button onClick={onBack} className="w-full text-green-200 hover:text-white text-sm py-2">Thoát về Trang Chủ</button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="ml-64 flex-1 p-8 overflow-y-auto h-screen">
                <div className="flex justify-between items-center mb-8 sticky top-0 bg-gray-50 py-4 z-10">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                            {activeTab === 'products' ? 'Quản Lý Sản Phẩm' : 'Quản Lý Quy Trình'}
                            {loading && <div className="w-5 h-5 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>}
                        </h1>
                        <p className="text-gray-500 mt-1">
                            {activeTab === 'products' ? `Tổng số: ${products.length} sản phẩm` : `Tổng số: ${timeline.length} bước quy trình`}
                        </p>
                    </div>
                    
                    <div className="flex gap-4">
                        <input 
                            type="text"
                            placeholder="Tìm kiếm..."
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none w-64"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button 
                            onClick={() => {
                                if (activeTab === 'products') {
                                    setEditingProduct({
                                        id: `new_${Date.now()}`,
                                        name: '',
                                        category: 'nutrition',
                                        imageUrl: '',
                                        description: '',
                                        benefits: [''],
                                        usage: ''
                                    });
                                } else {
                                    setEditingTimeline({
                                        id: Math.floor(Date.now() / 1000), // Generate numeric ID
                                        day: '',
                                        stage: 'growth',
                                        stageLabel: '',
                                        title: '',
                                        action: '',
                                        purpose: '',
                                        products: [],
                                        productDetails: [],
                                        totalCost: 0,
                                        imageType: 'default',
                                        imageUrl: '',
                                        icon: LeafIcon,
                                        richDetail: undefined
                                    });
                                }
                            }}
                            className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 font-bold shadow-sm"
                        >
                            <PlusIcon className="w-5 h-5" /> Thêm Mới
                        </button>
                    </div>
                </div>

                {/* --- PRODUCT TABLE --- */}
                {activeTab === 'products' && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-gray-100 text-gray-600 font-bold uppercase text-xs sticky top-0">
                                <tr>
                                    <th className="px-6 py-4">Hình ảnh</th>
                                    <th className="px-6 py-4">Tên Sản Phẩm</th>
                                    <th className="px-6 py-4">ID / Mã</th>
                                    <th className="px-6 py-4">Danh Mục</th>
                                    <th className="px-6 py-4 text-right">Hành Động</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredProducts.map(p => (
                                    <tr key={p.id} className="hover:bg-green-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="w-12 h-12 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center p-1">
                                                {p.imageUrl ? <img src={p.imageUrl} className="max-w-full max-h-full object-contain" alt="" /> : <span className="text-xs text-gray-400">N/A</span>}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-bold text-gray-800">{p.name}</td>
                                        <td className="px-6 py-4 text-gray-500 text-sm font-mono bg-gray-50 rounded px-2 py-1 w-fit">{p.id}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wider
                                                ${p.category === 'nutrition' ? 'bg-green-100 text-green-800' : 
                                                  p.category === 'protection' ? 'bg-yellow-100 text-yellow-800' :
                                                  p.category === 'tool' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}
                                            `}>
                                                {p.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-2">
                                            <button 
                                                onClick={() => setEditingProduct(p)}
                                                className="text-blue-600 hover:text-blue-800 font-bold text-sm bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded transition-colors"
                                            >
                                                Sửa
                                            </button>
                                            <button 
                                                onClick={() => handleDeleteProduct(p.id)}
                                                className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded transition-colors"
                                            >
                                                Xóa
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {filteredProducts.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="text-center py-10 text-gray-500">Không tìm thấy sản phẩm nào.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* --- TIMELINE TABLE --- */}
                {activeTab === 'timeline' && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-gray-100 text-gray-600 font-bold uppercase text-xs sticky top-0">
                                <tr>
                                    <th className="px-6 py-4">Giai Đoạn</th>
                                    <th className="px-6 py-4">Tiêu Đề Bước</th>
                                    <th className="px-6 py-4">Ngày Thực Hiện</th>
                                    <th className="px-6 py-4 text-right">Chi Phí (VNĐ)</th>
                                    <th className="px-6 py-4 text-right">Hành Động</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredTimeline.map(item => (
                                     <tr key={item.id} className="hover:bg-green-50/50 transition-colors">
                                         <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded text-xs font-bold uppercase
                                                ${item.stage === 'recovery' ? 'bg-stone-100 text-stone-600' : 
                                                  item.stage === 'growth' ? 'bg-green-100 text-green-600' : 
                                                  'bg-yellow-100 text-yellow-600'}
                                            `}>
                                                {item.stageLabel}
                                            </span>
                                         </td>
                                         <td className="px-6 py-4">
                                             <div className="font-bold text-gray-800">{item.title}</div>
                                             <div className="text-xs text-gray-500 mt-1 line-clamp-1">{item.action}</div>
                                         </td>
                                         <td className="px-6 py-4 text-sm text-gray-600">{item.day}</td>
                                         <td className="px-6 py-4 text-right font-mono text-green-700 font-bold">
                                             {item.totalCost?.toLocaleString('vi-VN')}
                                         </td>
                                         <td className="px-6 py-4 text-right space-x-2">
                                             <button 
                                                onClick={() => setEditingTimeline(item)}
                                                className="text-blue-600 hover:text-blue-800 font-bold text-sm bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded transition-colors"
                                             >
                                                Sửa
                                             </button>
                                             <button 
                                                onClick={() => handleDeleteTimeline(item.id)}
                                                className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded transition-colors"
                                             >
                                                Xóa
                                             </button>
                                         </td>
                                     </tr>
                                ))}
                                {filteredTimeline.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="text-center py-10 text-gray-500">Không tìm thấy bước quy trình nào.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </main>

            {/* --- MODAL EDIT PRODUCT --- */}
            <BaseModal
                isOpen={!!editingProduct}
                onClose={() => setEditingProduct(null)}
                title={editingProduct?.id?.startsWith('new') ? "Thêm Sản Phẩm Mới" : "Chỉnh Sửa Sản Phẩm"}
                initialWidth={800}
                initialHeight={800}
                footer={
                    <div className="flex justify-end gap-3 w-full">
                        <button onClick={() => setEditingProduct(null)} className="px-5 py-2 text-gray-600 font-bold hover:bg-gray-100 rounded-lg">Hủy</button>
                        <button onClick={handleSaveProduct} className="px-6 py-2 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 shadow-lg">Lưu Thay Đổi</button>
                    </div>
                }
            >
                {editingProduct && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Tên Sản Phẩm *</label>
                                <input 
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                                    value={editingProduct.name}
                                    onChange={e => setEditingProduct({...editingProduct, name: e.target.value})}
                                    placeholder="Nhập tên sản phẩm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Mã ID (Duy nhất) *</label>
                                <input 
                                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-green-500 outline-none"
                                    value={editingProduct.id}
                                    onChange={e => setEditingProduct({...editingProduct, id: e.target.value})}
                                    disabled={!editingProduct.id.startsWith('new_')}
                                    placeholder="vd: npk_10_60_10"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Danh Mục</label>
                            <select 
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none bg-white"
                                value={editingProduct.category}
                                // @ts-ignore
                                onChange={e => setEditingProduct({...editingProduct, category: e.target.value})}
                            >
                                <option value="nutrition">Dinh Dưỡng & Cải Tạo Đất</option>
                                <option value="protection">Bảo Vệ Thực Vật</option>
                                <option value="tool">Dụng Cụ</option>
                                <option value="other">Khác</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">URL Hình Ảnh</label>
                            <div className="flex gap-4">
                                <input 
                                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                                    value={editingProduct.imageUrl}
                                    onChange={e => setEditingProduct({...editingProduct, imageUrl: e.target.value})}
                                    placeholder="https://..."
                                />
                                <div className="w-20 h-12 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center overflow-hidden">
                                     {editingProduct.imageUrl ? (
                                        <img src={editingProduct.imageUrl} className="w-full h-full object-contain" alt="Preview"/>
                                     ) : <span className="text-xs text-gray-400">No Img</span>}
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Mô Tả Ngắn</label>
                            <textarea 
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none h-24"
                                value={editingProduct.description}
                                onChange={e => setEditingProduct({...editingProduct, description: e.target.value})}
                                placeholder="Mô tả ngắn gọn về sản phẩm..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Hướng Dẫn Sử Dụng</label>
                            <textarea 
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none h-24"
                                value={editingProduct.usage || ''}
                                onChange={e => setEditingProduct({...editingProduct, usage: e.target.value})}
                                placeholder="vd: Pha 20ml cho bình 25 lít..."
                            />
                        </div>
                        
                         {/* Benefits Management */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Công Dụng (Lợi Ích)</label>
                            <div className="bg-gray-50 p-4 rounded-xl space-y-3">
                                {editingProduct.benefits.map((b, idx) => (
                                    <div key={idx} className="flex gap-2">
                                        <input 
                                            className="flex-1 p-2 border border-gray-300 rounded focus:ring-1 focus:ring-green-500 outline-none text-sm"
                                            value={b}
                                            onChange={(e) => {
                                                const newBen = [...editingProduct.benefits];
                                                newBen[idx] = e.target.value;
                                                setEditingProduct({...editingProduct, benefits: newBen});
                                            }}
                                            placeholder={`Công dụng ${idx + 1}`}
                                        />
                                        <button 
                                            onClick={() => {
                                                 const newBen = editingProduct.benefits.filter((_, i) => i !== idx);
                                                 setEditingProduct({...editingProduct, benefits: newBen});
                                            }}
                                            className="text-red-500 hover:bg-red-50 p-2 rounded transition-colors"
                                        >
                                            <TrashIcon className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                                <button 
                                    onClick={() => setEditingProduct({...editingProduct, benefits: [...editingProduct.benefits, '']})}
                                    className="text-sm text-green-600 font-bold hover:underline flex items-center gap-1 mt-2"
                                >
                                    <PlusIcon className="w-4 h-4" /> Thêm dòng công dụng
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </BaseModal>

            {/* --- MODAL EDIT TIMELINE --- */}
            <BaseModal
                isOpen={!!editingTimeline}
                onClose={() => setEditingTimeline(null)}
                title={editingTimeline?.title ? "Chỉnh Sửa Quy Trình" : "Thêm Quy Trình Mới"}
                initialWidth={900}
                initialHeight={850}
                footer={
                     <div className="flex justify-between items-center w-full">
                         <div className="text-sm text-gray-500 italic">
                            Tổng chi phí sẽ tự động cập nhật
                         </div>
                        <div className="flex gap-3">
                            <button onClick={() => setEditingTimeline(null)} className="px-5 py-2 text-gray-600 font-bold hover:bg-gray-100 rounded-lg">Hủy</button>
                            <button onClick={handleSaveTimeline} className="px-6 py-2 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 shadow-lg">Lưu Quy Trình</button>
                        </div>
                    </div>
                }
            >
                {editingTimeline && (
                    <div className="space-y-8">
                        {/* Basic Info Section */}
                        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                             <h4 className="text-sm font-bold text-gray-500 uppercase mb-4 tracking-wider">Thông Tin Chung</h4>
                             <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Tên Quy Trình *</label>
                                    <input 
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                                        value={editingTimeline.title}
                                        onChange={e => setEditingTimeline({...editingTimeline, title: e.target.value})}
                                        placeholder="vd: Cải Tạo Vườn"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Giai Đoạn</label>
                                    <select 
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none bg-white"
                                        value={editingTimeline.stage}
                                        onChange={e => setEditingTimeline({...editingTimeline, stage: e.target.value})}
                                    >
                                        <option value="recovery">Phục Hồi</option>
                                        <option value="growth">Cơi Đọt (Sinh Trưởng)</option>
                                        <option value="flowering">Làm Bông (Ra Hoa)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Tên Hiển Thị Giai Đoạn</label>
                                    <input 
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                                        value={editingTimeline.stageLabel}
                                        onChange={e => setEditingTimeline({...editingTimeline, stageLabel: e.target.value})}
                                        placeholder="vd: Sau thu hoạch..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Thời Gian (Ngày)</label>
                                    <input 
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                                        value={editingTimeline.day}
                                        onChange={e => setEditingTimeline({...editingTimeline, day: e.target.value})}
                                        placeholder="vd: 01/10/2025"
                                    />
                                </div>
                             </div>
                             <div className="mt-4">
                                <label className="block text-sm font-bold text-gray-700 mb-2">Hành Động Chính</label>
                                <textarea 
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none h-20"
                                    value={editingTimeline.action}
                                    onChange={e => setEditingTimeline({...editingTimeline, action: e.target.value})}
                                    placeholder="Mô tả hành động..."
                                />
                             </div>
                              <div className="mt-4">
                                <label className="block text-sm font-bold text-gray-700 mb-2">Mục Đích</label>
                                <textarea 
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none h-20"
                                    value={editingTimeline.purpose}
                                    onChange={e => setEditingTimeline({...editingTimeline, purpose: e.target.value})}
                                    placeholder="Mô tả mục đích..."
                                />
                             </div>
                        </div>
                        
                        {/* Product Details Section */}
                        <div className="border border-green-200 rounded-xl overflow-hidden shadow-sm">
                            <div className="bg-green-50 px-6 py-4 flex justify-between items-center border-b border-green-200">
                                <h4 className="font-bold text-green-800 flex items-center gap-2">
                                    <LeafIcon className="w-5 h-5"/> Chi Tiết Vật Tư & Chi Phí
                                </h4>
                                <button 
                                    onClick={handleAddTimelineDetail}
                                    className="text-xs bg-green-600 text-white px-3 py-1.5 rounded hover:bg-green-700 font-bold flex items-center gap-1"
                                >
                                    <PlusIcon className="w-4 h-4"/> Thêm dòng
                                </button>
                            </div>
                            <div className="bg-white p-0 overflow-x-auto">
                                <table className="w-full min-w-[700px]">
                                    <thead className="bg-gray-100 text-xs font-bold text-gray-500 uppercase">
                                        <tr>
                                            <th className="p-3 text-left">Tên Vật Tư / Sản Phẩm</th>
                                            <th className="p-3 text-left w-32">Liều Lượng</th>
                                            <th className="p-3 text-center w-20">SL</th>
                                            <th className="p-3 text-center w-20">Đơn Vị</th>
                                            <th className="p-3 text-right w-32">Thành Tiền</th>
                                            <th className="p-3 w-10"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {editingTimeline.productDetails?.map((detail, idx) => (
                                            <tr key={idx} className="group hover:bg-gray-50">
                                                <td className="p-2">
                                                    <input 
                                                        className="w-full p-2 border border-gray-200 rounded text-sm focus:border-green-500 outline-none"
                                                        value={detail.name}
                                                        onChange={(e) => handleUpdateTimelineDetail(idx, 'name', e.target.value)}
                                                        placeholder="Tên SP..."
                                                    />
                                                    <input 
                                                        className="w-full p-1 mt-1 border-b border-dashed border-gray-200 text-xs text-gray-500 focus:border-green-300 outline-none"
                                                        value={detail.purpose}
                                                        onChange={(e) => handleUpdateTimelineDetail(idx, 'purpose', e.target.value)}
                                                        placeholder="Mục đích sử dụng (vd: Phòng bệnh)"
                                                    />
                                                </td>
                                                <td className="p-2">
                                                    <input 
                                                        className="w-full p-2 border border-gray-200 rounded text-sm"
                                                        value={detail.dosage}
                                                        onChange={(e) => handleUpdateTimelineDetail(idx, 'dosage', e.target.value)}
                                                        placeholder="vd: 1 lít/200L"
                                                    />
                                                </td>
                                                <td className="p-2">
                                                     <input 
                                                        type="number"
                                                        className="w-full p-2 border border-gray-200 rounded text-sm text-center"
                                                        value={detail.quantity}
                                                        onChange={(e) => handleUpdateTimelineDetail(idx, 'quantity', parseFloat(e.target.value))}
                                                    />
                                                </td>
                                                <td className="p-2">
                                                     <input 
                                                        className="w-full p-2 border border-gray-200 rounded text-sm text-center"
                                                        value={detail.unit}
                                                        onChange={(e) => handleUpdateTimelineDetail(idx, 'unit', e.target.value)}
                                                    />
                                                </td>
                                                <td className="p-2">
                                                     <input 
                                                        type="number"
                                                        className="w-full p-2 border border-gray-200 rounded text-sm text-right font-mono"
                                                        value={detail.totalCost}
                                                        onChange={(e) => handleUpdateTimelineDetail(idx, 'totalCost', parseFloat(e.target.value))}
                                                        placeholder="0"
                                                    />
                                                </td>
                                                <td className="p-2 text-center">
                                                    <button 
                                                        onClick={() => handleRemoveTimelineDetail(idx)}
                                                        className="text-gray-400 hover:text-red-500 transition-colors"
                                                    >
                                                        <TrashIcon className="w-4 h-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot className="bg-gray-50 font-bold text-gray-700">
                                        <tr>
                                            <td colSpan={4} className="p-3 text-right uppercase text-xs">Tổng cộng:</td>
                                            <td className="p-3 text-right text-green-700">
                                                {(editingTimeline.productDetails?.reduce((sum, item) => sum + (item.totalCost || 0), 0) || 0).toLocaleString()}
                                            </td>
                                            <td></td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
            </BaseModal>
        </div>
    );
};

export default AdminView;
