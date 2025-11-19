
import React, { useState, useEffect } from 'react';
import { Breadcrumb, FilterButton } from '../components/UI';
import { ProductInfo, PRODUCT_DB, CATEGORY_LABELS } from '../data';
import { BaseModal } from '../components/Modal';
import { ProductModal } from '../components/ProductModal';
import { CheckCircleIcon, LeafIcon, SprayIcon, DropletIcon } from '../components/Icons';

const ProductsView = ({ onBack, preselectedProductId }: { onBack: () => void, preselectedProductId?: string }) => {
    const [filter, setFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedProduct, setSelectedProduct] = useState<ProductInfo | null>(null);
    const [showProductModal, setShowProductModal] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Handle direct linking to a product if ID is passed
    useEffect(() => {
        if (preselectedProductId && PRODUCT_DB[preselectedProductId]) {
            setSelectedProduct(PRODUCT_DB[preselectedProductId]);
            setShowProductModal(true);
        }
    }, [preselectedProductId]);

    // Filter Logic
    const allProducts = Object.values(PRODUCT_DB);
    const filteredProducts = allProducts.filter(product => {
        const matchesCategory = filter === 'all' || product.category === filter;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              product.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const handleCopyLink = (id: string) => {
        // Simulate a link for the user (in a real app this would be a URL)
        // Here we just copy the ID so the admin can use it in code
        navigator.clipboard.writeText(id);
        alert(`Đã sao chép mã sản phẩm: ${id}`);
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20 pt-20">
            <div className="container mx-auto px-4 max-w-7xl animate-fade-in">
                 <Breadcrumb 
                    onNavigate={onBack}
                    items={[
                        { label: "Trang Chủ", action: onBack },
                        { label: "Sản Phẩm & Dụng Cụ" }
                    ]} 
                />

                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-green-800 mb-3">Danh Mục Sản Phẩm</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Các giải pháp dinh dưỡng, bảo vệ thực vật và dụng cụ canh tác nông nghiệp thông minh được tin dùng bởi Farmersmart.
                    </p>
                </div>

                {/* Controls */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 sticky top-20 z-20 bg-gray-50/95 p-4 rounded-xl backdrop-blur-sm shadow-sm border border-gray-100">
                    {/* Categories */}
                    <div className="flex flex-wrap justify-center gap-2">
                        <FilterButton 
                            label="Tất Cả" 
                            active={filter === 'all'} 
                            onClick={() => setFilter('all')} 
                            colorClass="bg-green-800"
                        />
                        <FilterButton 
                            label="Dụng Cụ Đo" 
                            active={filter === 'tool'} 
                            onClick={() => setFilter('tool')} 
                            colorClass="bg-blue-600"
                        />
                        <FilterButton 
                            label="Dinh Dưỡng" 
                            active={filter === 'nutrition'} 
                            onClick={() => setFilter('nutrition')} 
                            colorClass="bg-green-600"
                        />
                        <FilterButton 
                            label="BVTV" 
                            active={filter === 'protection'} 
                            onClick={() => setFilter('protection')} 
                            colorClass="bg-yellow-600 border-yellow-600"
                        />
                    </div>

                    {/* Search */}
                    <div className="w-full md:w-auto relative">
                         <input 
                            type="text" 
                            placeholder="Tìm kiếm sản phẩm..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full md:w-64 pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                         />
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map(product => (
                        <div 
                            key={product.id} 
                            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer flex flex-col"
                            onClick={() => { setSelectedProduct(product); setShowProductModal(true); }}
                        >
                            <div className="relative h-56 overflow-hidden bg-gray-100 flex items-center justify-center p-4">
                                <img 
                                    src={product.imageUrl} 
                                    alt={product.name} 
                                    className="w-full h-full object-contain transform transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-gray-600 shadow-sm">
                                    {CATEGORY_LABELS[product.category]}
                                </div>
                            </div>
                            
                            <div className="p-5 flex-grow flex flex-col">
                                <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-green-700 transition-colors min-h-[3.5rem]">
                                    {product.name}
                                </h3>
                                <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-grow">
                                    {product.description}
                                </p>
                                
                                <button className="w-full py-2 rounded-lg bg-gray-50 text-green-700 font-bold text-sm group-hover:bg-green-600 group-hover:text-white transition-colors">
                                    Xem Chi Tiết
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredProducts.length === 0 && (
                    <div className="text-center py-20 text-gray-500">
                        Không tìm thấy sản phẩm nào phù hợp.
                    </div>
                )}
            </div>

            {/* Global Product Modal */}
            <ProductModal 
                isOpen={showProductModal} 
                onClose={() => setShowProductModal(false)} 
                product={selectedProduct} 
            />
        </div>
    );
};

export default ProductsView;
