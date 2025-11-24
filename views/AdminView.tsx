
import React, { useState, useEffect } from 'react';
import { dataManager } from '../lib/DataManager';
import { ProductInfo, TimelineItemData } from '../types';
import { BaseModal } from '../components/Modal';
import { PlusIcon, TrashIcon, SettingsIcon, CheckCircleIcon, LeafIcon, XIcon } from '../components/Icons';
import FarmersmartLogo from '../components/Logo';

const AdminView = ({ onBack }: { onBack: () => void }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [activeTab, setActiveTab] = useState<'products' | 'timeline'>('products');

    // Data State
    const [products, setProducts] = useState<ProductInfo[]>([]);
    const [timeline, setTimeline] = useState<TimelineItemData[]>([]);
    const [loading, setLoading] = useState(false);

    // Edit State
    const [editingProduct, setEditingProduct] = useState<ProductInfo | null>(null);

    useEffect(() => {
        if (isAuthenticated) {
            refreshData();
        }
    }, [isAuthenticated]);

    const refreshData = async () => {
        setLoading(true);
        const p = await dataManager.getProducts();
        const t = await dataManager.getTimeline();
        setProducts(p);
        setTimeline(t);
        setLoading(false);
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Mật khẩu giả lập đơn giản: "admin123"
        if (password === 'admin123') {
            setIsAuthenticated(true);
        } else {
            alert('Sai mật khẩu! (Gợi ý: admin123)');
        }
    };

    const handleSaveProduct = async () => {
        if (editingProduct) {
            if (!editingProduct.id || !editingProduct.name) {
                alert("Vui lòng nhập ID và Tên sản phẩm");
                return;
            }
            await dataManager.saveProduct(editingProduct);
            await refreshData();
            setEditingProduct(null);
        }
    };

    const handleDeleteProduct = async (id: string) => {
        if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
            await dataManager.deleteProduct(id);
            await refreshData();
        }
    };

    // Helper to manage benefits array
    const updateBenefit = (index: number, val: string) => {
        if (!editingProduct) return;
        const newBenefits = [...editingProduct.benefits];
        newBenefits[index] = val;
        setEditingProduct({ ...editingProduct, benefits: newBenefits });
    };

    const addBenefit = () => {
        if (!editingProduct) return;
        setEditingProduct({ ...editingProduct, benefits: [...editingProduct.benefits, ''] });
    };

    const removeBenefit = (index: number) => {
        if (!editingProduct) return;
        const newBenefits = editingProduct.benefits.filter((_, i) => i !== index);
        setEditingProduct({ ...editingProduct, benefits: newBenefits });
    };

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
            {/* Sidebar */}
            <aside className="w-64 bg-green-900 text-white fixed h-full overflow-y-auto">
                <div className="p-6">
                    <FarmersmartLogo className="h-8 mb-8 brightness-0 invert" />
                    <nav className="space-y-2">
                        <button 
                            onClick={() => setActiveTab('products')}
                            className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 ${activeTab === 'products' ? 'bg-green-700' : 'hover:bg-green-800'}`}
                        >
                            <LeafIcon className="w-5 h-5" /> Sản Phẩm
                        </button>
                        <button 
                            onClick={() => setActiveTab('timeline')}
                            className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 ${activeTab === 'timeline' ? 'bg-green-700' : 'hover:bg-green-800'}`}
                        >
                            <SettingsIcon className="w-5 h-5" /> Quy Trình
                        </button>
                    </nav>
                </div>
                <div className="absolute bottom-0 w-full p-4 border-t border-green-800">
                    <button onClick={onBack} className="w-full text-green-200 hover:text-white text-sm">Thoát về Trang Chủ</button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="ml-64 flex-1 p-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        {activeTab === 'products' ? 'Quản Lý Sản Phẩm' : 'Quản Lý Quy Trình'}
                        {loading && <span className="text-sm font-normal text-gray-500 ml-4 italic">(Đang đồng bộ...)</span>}
                    </h1>
                    <div className="flex gap-2">
                         {activeTab === 'products' && (
                            <button 
                                onClick={() => setEditingProduct({
                                    id: `new_${Date.now()}`,
                                    name: '',
                                    category: 'nutrition',
                                    imageUrl: '',
                                    description: '',
                                    benefits: [''],
                                    usage: ''
                                })}
                                className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 font-bold"
                            >
                                <PlusIcon className="w-5 h-5" /> Thêm Mới
                            </button>
                        )}
                    </div>
                </div>

                {activeTab === 'products' && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-gray-600 font-bold uppercase text-xs">
                                <tr>
                                    <th className="px-6 py-4">Hình ảnh</th>
                                    <th className="px-6 py-4">Tên Sản Phẩm</th>
                                    <th className="px-6 py-4">ID</th>
                                    <th className="px-6 py-4">Danh Mục</th>
                                    <th className="px-6 py-4 text-right">Hành Động</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {products.map(p => (
                                    <tr key={p.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <img src={p.imageUrl || 'https://via.placeholder.com/50'} className="w-12 h-12 object-contain bg-gray-100 rounded" alt="" />
                                        </td>
                                        <td className="px-6 py-4 font-bold text-gray-800">{p.name}</td>
                                        <td className="px-6 py-4 text-gray-500 text-sm font-mono">{p.id}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded text-xs font-bold uppercase
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
                                                className="text-blue-600 hover:text-blue-800 font-bold text-sm bg-blue-50 px-3 py-1 rounded"
                                            >
                                                Sửa
                                            </button>
                                            <button 
                                                onClick={() => handleDeleteProduct(p.id)}
                                                className="text-red-500 hover:text-red-700 bg-red-50 px-3 py-1 rounded"
                                            >
                                                Xóa
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === 'timeline' && (
                    <div className="space-y-4">
                        <div className="bg-yellow-50 p-4 border border-yellow-200 rounded-lg text-yellow-800 mb-4 flex items-center">
                            <SettingsIcon className="w-5 h-5 mr-2" />
                            Tính năng chỉnh sửa Quy Trình đang được phát triển.
                        </div>
                        {timeline.map(item => (
                             <div key={item.id} className="bg-white p-6 rounded-xl border border-gray-200 flex justify-between items-center shadow-sm">
                                 <div>
                                     <div className={`text-xs font-bold uppercase mb-1 px-2 py-0.5 rounded inline-block
                                        ${item.stage === 'recovery' ? 'bg-gray-100 text-gray-600' : 
                                          item.stage === 'growth' ? 'bg-green-100 text-green-600' : 
                                          'bg-yellow-100 text-yellow-600'}
                                     `}>
                                        {item.stageLabel}
                                     </div>
                                     <div className="font-bold text-xl text-gray-800">{item.title}</div>
                                     <div className="text-sm text-gray-500 mt-1">Lịch trình: {item.day}</div>
                                 </div>
                                 <button className="text-gray-400 cursor-not-allowed bg-gray-100 px-4 py-2 rounded">Chỉnh sửa</button>
                             </div>
                        ))}
                    </div>
                )}
            </main>

            {/* Edit Product Modal */}
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
                                <label className="block text-sm font-bold text-gray-700 mb-2">Mã ID (Không dấu, không khoảng trắng) *</label>
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
                                        <img src={editingProduct.imageUrl} className="w-full h-full object-contain" />
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
                            <label className="block text-sm font-bold text-gray-700 mb-2">Công Dụng (Lợi Ích)</label>
                            <div className="space-y-2">
                                {editingProduct.benefits.map((b, idx) => (
                                    <div key={idx} className="flex gap-2">
                                        <input 
                                            className="flex-1 p-2 border border-gray-300 rounded focus:ring-1 focus:ring-green-500 outline-none text-sm"
                                            value={b}
                                            onChange={(e) => updateBenefit(idx, e.target.value)}
                                            placeholder={`Công dụng ${idx + 1}`}
                                        />
                                        <button onClick={() => removeBenefit(idx)} className="text-red-500 hover:bg-red-50 p-2 rounded">
                                            <TrashIcon className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                                <button onClick={addBenefit} className="text-sm text-green-600 font-bold hover:underline flex items-center gap-1">
                                    <PlusIcon className="w-4 h-4" /> Thêm dòng công dụng
                                </button>
                            </div>
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
                    </div>
                )}
            </BaseModal>
        </div>
    );
};

export default AdminView;
