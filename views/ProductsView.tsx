
import React, { useState, useEffect } from 'react';
import { Breadcrumb, FilterButton } from '../components/UI';
import { ProductInfo } from '../types';
import { dataManager } from '../lib/DataManager'; 
import { CATEGORY_LABELS } from '../data/products';
import { ProductModal } from '../components/ProductModal';
import { PlusIcon } from '../components/Icons';

const ProductsView = ({ onBack, preselectedProductId }: { onBack: () => void, preselectedProductId?: string }) => {
    const [filter, setFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedProduct, setSelectedProduct] = useState<ProductInfo | null>(null);
    const [showProductModal, setShowProductModal] = useState(false);
    const [loading, setLoading] = useState(true);
    
    // State for products (now dynamic from DataManager)
    const [products, setProducts] = useState<ProductInfo[]>([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        // Load products async
        dataManager.getProducts().then(data => {
            setProducts(data);
            setLoading(false);
        });
    }, []);

    // Handle direct linking to a product if ID is passed
    useEffect(() => {
        if (preselectedProductId && products.length > 0) {
            const found = products.find(p => p.id === preselectedProductId);
            if (found) {
                setSelectedProduct(found);
                setShowProductModal(true);
            }
        }
    }, [preselectedProductId, products]);

    // Filter Logic
    const filteredProducts = products.filter(product => {
        const matchesCategory = filter === 'all' || product.category === filter;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              product.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center text-green-600">Đang tải dữ liệu sản phẩm...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <div className="container mx-auto px-4 max-w-[1920px] animate-fade-in">
                 <div className="max-w-[1600px] mx-auto">
                    <Breadcrumb 
                        onNavigate={onBack}
                        items={[
                            { label: "Trang Chủ", action: onBack },
                            { label: "Sản Phẩm & Dụng Cụ" }
                        ]} 
                    />
                 </div>

                {/* Header */}
                <div className="text-center mb-12 mt-6">
                    <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-4">Danh Mục Sản Phẩm</h1>
                    <p className="text-gray-600 max-w-3xl mx-auto text-xl font-light">
                        Các giải pháp dinh dưỡng, bảo vệ thực vật và dụng cụ canh tác nông nghiệp thông minh được tin dùng bởi Farmersmart.
                    </p>
                </div>

                {/* Controls Wrapper */}
                <div className="max-w-[1600px] mx-auto mb-10 sticky top-20 z-20">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white/90 p-5 rounded-2xl backdrop-blur-md shadow-lg border border-gray-100">
                        {/* Categories */}
                        <div className="flex flex-wrap justify-center gap-3">
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
                                className="w-full md:w-80 pl-12 pr-5 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all shadow-inner"
                             />
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Grid - 5 Columns on Ultra Wide */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 max-w-[1800px] mx-auto">
                    {filteredProducts.map(product => (
                        <div 
                            key={product.id} 
                            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 group cursor-pointer flex flex-col transform hover:-translate-y-2"
                            onClick={() => { setSelectedProduct(product); setShowProductModal(true); }}
                        >
                            <div className="relative h-64 overflow-hidden bg-gray-100 flex items-center justify-center p-6">
                                <img 
                                    src={product.imageUrl} 
                                    alt={product.name} 
                                    className="w-full h-full object-contain transform transition-transform duration-500 group-hover:scale-110 drop-shadow-md"
                                />
                                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur px-3 py-1.5 rounded-full text-xs font-bold text-gray-600 shadow-sm border border-gray-100">
                                    {CATEGORY_LABELS[product.category]}
                                </div>
                            </div>
                            
                            <div className="p-6 flex-grow flex flex-col">
                                <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-green-700 transition-colors min-h-[3.5rem] leading-tight">
                                    {product.name}
                                </h3>
                                <p className="text-sm text-gray-500 line-clamp-3 mb-6 flex-grow leading-relaxed">
                                    {product.description}
                                </p>
                                
                                <button className="w-full py-3 rounded-xl bg-gray-50 text-green-700 font-bold text-sm group-hover:bg-green-600 group-hover:text-white transition-all shadow-sm">
                                    Xem Chi Tiết
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredProducts.length === 0 && (
                    <div className="text-center py-32 text-gray-500">
                        <div className="text-6xl mb-4 opacity-20">🍃</div>
                        <p className="text-xl">Không tìm thấy sản phẩm nào phù hợp với từ khóa của bạn.</p>
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
