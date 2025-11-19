import React, { useState, useEffect } from 'react';
import { TimelineItemData, RichStep, PRODUCT_USAGE_GUIDE, PRODUCT_DB, ProductInfo } from '../data';
import { PHGuideModal } from '../features/PHModal';
import { BaseModal } from '../components/Modal';
import { ProductModal } from '../components/ProductModal';
import FarmersmartLogo from '../components/Logo';
import { Breadcrumb, StageBadge } from '../components/UI';
import { SprayIcon, CheckCircleIcon, InfoIcon, LeafIcon, BookOpenIcon, ChevronRightIcon, DropletIcon } from '../components/Icons';
import ImageViewer from '../components/ImageViewer';

const DetailView = ({ item, onBack, onNavigateToSubPage }: { item: TimelineItemData, onBack: () => void, onNavigateToSubPage: (id: string) => void }) => {
    const [selectedStep, setSelectedStep] = useState<RichStep | null>(null);
    const [showPHModal, setShowPHModal] = useState(false);
    const [fullScreenImage, setFullScreenImage] = useState<string | null>(null);
    
    // Product Modal State
    const [selectedProduct, setSelectedProduct] = useState<ProductInfo | null>(null);
    const [showProductModal, setShowProductModal] = useState(false);

    // Hover Tooltip State
    const [hoveredProduct, setHoveredProduct] = useState<{ product: ProductInfo, y: number, x: number } | null>(null);

    // Check if this is the "Xử Lý Đất & Kích Rễ" item (ID 2)
    const isSoilPHItem = item.id === 2;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Helper to format currency
    const formatCurrency = (val: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);

    // Helper to find product by name/keyword
    const findProduct = (text: string): ProductInfo | null => {
       const lowerText = text.toLowerCase();
       // Map specific keywords to IDs for better accuracy
       const mapping: Record<string, string> = {
           "ck70": "ck70",
           "cây khỏe 70": "ck70",
           "cây khoẻ 70": "ck70",
           "ck30": "ck30",
           "cây khỏe 30": "ck30",
           "cây khoẻ 30": "ck30",
           "ck320": "ck320",
           "cây khỏe 320": "ck320",
           "cây khoẻ 320": "ck320",
           "ck180": "ck180",
           "cây khỏe 180": "ck180",
           "cây khoẻ 180": "ck180",
           "ck90": "ck90",
           "cây khỏe 90": "ck90",
           "cây khoẻ 90": "ck90",
           "ck50": "ck50",
           "cây khỏe 50": "ck50",
           "cây khoẻ 50": "ck50",
           "combi": "combi",
           "lactobio": "lactobio",
           "phân bò vi sinh": "phan_bo_vi_sinh",
           "dm15": "ph_meter_dm15",
           "ph": "litmus_paper" // Default loose match for pH paper
       };

       // 1. Check mapping first
       for (const [key, id] of Object.entries(mapping)) {
           if (lowerText.includes(key)) return PRODUCT_DB[id];
       }

       // 2. Fallback search in DB
       return Object.values(PRODUCT_DB).find(p => 
           lowerText.includes(p.name.toLowerCase()) || 
           lowerText.includes(p.id.toLowerCase())
       ) || null;
    };

    const handleMouseEnterProduct = (e: React.MouseEvent, product: ProductInfo) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setHoveredProduct({
            product,
            x: rect.left, // Position to the left of the element
            y: rect.top + (rect.height / 2)
        });
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-[1800px] animate-fade-in relative">
            <div className="mb-6">
                 <Breadcrumb 
                    onNavigate={onBack}
                    items={[
                        { label: item.stageLabel, action: onBack },
                        { label: item.title }
                    ]} 
                />
            </div>

            {/* Grid Layout for PC: Main Content (Left) vs Sidebar (Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* --- MAIN CONTENT COLUMN (8/12) --- */}
                <div className="lg:col-span-8 space-y-8">
                    
                    {/* Hero Section */}
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                        <div className="relative h-64 md:h-96 bg-gray-200 group">
                            {item.imageUrl ? (
                                <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-green-50">
                                    <item.icon className="w-24 h-24 text-green-200" />
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-8 md:p-10 text-white">
                                <StageBadge stage={item.stage} label={item.stageLabel} />
                                <h1 className="text-3xl md:text-5xl font-bold mt-3 mb-2 leading-tight">{item.title}</h1>
                                <div className="flex items-center gap-4 text-green-100 text-lg font-medium">
                                    <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded">Lịch trình: {item.day}</span>
                                </div>
                            </div>
                        </div>
                        
                        {/* Intro Grid */}
                        <div className="p-8 grid md:grid-cols-2 gap-8 bg-white">
                             {/* Action Card */}
                            <div 
                                className={`bg-blue-50 p-6 rounded-xl border border-blue-100 relative group/card h-full ${isSoilPHItem ? 'cursor-pointer hover:bg-blue-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300' : ''}`}
                                onClick={() => isSoilPHItem && setShowPHModal(true)}
                            >
                                {isSoilPHItem && (
                                    <div className="absolute top-4 right-4 text-blue-400 group-hover/card:text-blue-600 transition-colors animate-pulse">
                                        <BookOpenIcon className="w-6 h-6" />
                                    </div>
                                )}

                                <h3 className="flex items-center text-blue-900 font-bold text-xl mb-4">
                                    <SprayIcon className="w-6 h-6 mr-2" />
                                    Hoạt Động Chính
                                </h3>
                                <p className={`text-gray-700 text-lg leading-relaxed mb-6 ${isSoilPHItem ? 'group-hover/card:text-blue-900 font-medium' : ''}`}>
                                    {item.action}
                                </p>
                                
                                {isSoilPHItem && (
                                <div className="mt-auto">
                                    <div className="w-full flex items-center justify-center gap-2 bg-white border border-blue-200 text-blue-600 px-4 py-3 rounded-lg font-bold transition-all shadow-sm group-hover/card:bg-blue-600 group-hover/card:text-white group-hover/card:border-blue-600">
                                        <InfoIcon className="w-5 h-5" /> Tìm hiểu chi tiết về Đất & pH
                                    </div>
                                </div>
                                )}
                            </div>

                            {/* Purpose Card */}
                            <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-100 h-full">
                                <h3 className="flex items-center text-yellow-900 font-bold text-xl mb-4">
                                    <CheckCircleIcon className="w-6 h-6 mr-2" />
                                    Mục Tiêu
                                </h3>
                                <p className="text-gray-800 text-lg leading-relaxed">{item.purpose}</p>
                            </div>
                        </div>
                    </div>

                    {/* Rich Detail Steps */}
                    {item.richDetail && (
                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                                <span className="bg-green-100 p-2 rounded-lg mr-3"><LeafIcon className="w-6 h-6 text-green-700" /></span>
                                Quy Trình Chi Tiết
                            </h2>
                            <p className="text-gray-600 mb-8 leading-relaxed border-l-4 border-green-500 pl-6 italic text-lg bg-gray-50 py-4 rounded-r-lg">
                                {item.richDetail.intro}
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {item.richDetail.steps.map((step, idx) => (
                                    <div 
                                    key={idx} 
                                    onClick={() => setSelectedStep(step)}
                                    className="group relative bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-xl hover:border-green-400 hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col h-full"
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors shadow-inner">
                                                {step.icon ? <step.icon className="w-6 h-6"/> : <span className="font-bold text-xl">{idx + 1}</span>}
                                            </div>
                                            <span className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full group-hover:bg-green-600 group-hover:text-white transition-colors">Bước {idx + 1}</span>
                                        </div>
                                        
                                        <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-green-700 transition-colors">{step.title}</h3>
                                        <p className="text-gray-600 leading-relaxed line-clamp-3 mb-4 flex-grow">{step.content}</p>
                                        
                                        <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
                                            <span className="text-sm text-gray-400">Bấm để xem chi tiết</span>
                                            <ChevronRightIcon className="w-5 h-5 text-gray-300 group-hover:text-green-600 group-hover:translate-x-1 transition-all" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Cost Table (Moved to main content for wide view readability) */}
                     {item.productDetails && item.productDetails.length > 0 && (
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                            <div className="bg-gray-50 px-8 py-5 border-b border-gray-200 flex justify-between items-center">
                                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                                    <LeafIcon className="w-6 h-6 mr-3 text-green-600" />
                                    Bảng Kê Chi Tiết Vật Tư
                                </h2>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-base">
                                    <thead className="bg-gray-100 text-gray-600 uppercase text-xs font-bold tracking-wider">
                                        <tr>
                                            <th className="px-8 py-4">Sản Phẩm</th>
                                            <th className="px-6 py-4">Công Dụng</th>
                                            <th className="px-6 py-4">Liều Lượng</th>
                                            <th className="px-8 py-4 text-right">Thành Tiền (VNĐ)</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {item.productDetails.map((detail, idx) => {
                                            const productInfo = findProduct(detail.name);

                                            return (
                                                <tr key={idx} className="hover:bg-green-50/50 transition-colors">
                                                    <td className="px-8 py-4 font-bold text-gray-800 relative">
                                                        {productInfo ? (
                                                            <div 
                                                                className="inline-flex items-center cursor-pointer text-green-700 hover:text-green-900 hover:underline decoration-dotted group/product"
                                                                onClick={() => { setSelectedProduct(productInfo); setShowProductModal(true); }}
                                                                onMouseEnter={(e) => handleMouseEnterProduct(e, productInfo)}
                                                                onMouseLeave={() => setHoveredProduct(null)}
                                                            >
                                                                {detail.name}
                                                                <InfoIcon className="w-4 h-4 ml-2 opacity-50 group-hover/product:opacity-100" />
                                                            </div>
                                                        ) : (
                                                            detail.name
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 text-gray-600">{detail.purpose}</td>
                                                    <td className="px-6 py-4 text-gray-600">
                                                        <span className="bg-gray-100 px-2 py-1 rounded text-sm font-medium text-gray-700">{detail.quantity} {detail.unit}</span>
                                                        <span className="block text-xs text-gray-400 mt-1">{detail.dosage}</span>
                                                    </td>
                                                    <td className="px-8 py-4 text-right font-bold text-green-700 group cursor-pointer">
                                                        <span className="blur-[4px] group-hover:blur-none transition-all duration-300 select-none text-lg">
                                                            {formatCurrency(detail.totalCost)}
                                                        </span>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                    {item.totalCost && (
                                        <tfoot className="bg-gray-50">
                                            <tr>
                                                <td colSpan={3} className="px-8 py-4 text-right font-bold text-gray-600 uppercase">Tổng Cộng:</td>
                                                <td className="px-8 py-4 text-right font-extrabold text-green-700 text-xl">{formatCurrency(item.totalCost)}</td>
                                            </tr>
                                        </tfoot>
                                    )}
                                </table>
                            </div>
                        </div>
                    )}

                </div>

                {/* --- SIDEBAR COLUMN (4/12) --- */}
                <div className="lg:col-span-4 space-y-8">
                    
                    {/* Sticky Container */}
                    <div className="sticky top-24 space-y-8">
                        
                        {/* Total Cost Card (Hidden by default, show on hover) */}
                        {item.totalCost && (
                            <div className="group bg-gradient-to-br from-green-600 to-green-800 rounded-2xl shadow-xl relative overflow-hidden transition-all duration-500 ease-in-out h-[70px] hover:h-[200px] cursor-help">
                                {/* Background Effect */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
                                
                                {/* Header Row (Always Visible) */}
                                <div className="h-[70px] flex items-center justify-between px-6">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-white/20 p-2 rounded-lg text-white">
                                            <LeafIcon className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-white font-bold text-lg">Chi Phí Dự Kiến</h3>
                                    </div>
                                    <span className="text-green-200 text-sm bg-black/20 px-3 py-1 rounded-full group-hover:opacity-0 transition-opacity duration-300">
                                        Xem chi tiết
                                    </span>
                                </div>

                                {/* Hidden Content (Revealed on Hover) */}
                                <div className="px-6 pb-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 delay-100">
                                    <div className="text-4xl font-extrabold mb-4 tracking-tight text-white border-t border-white/20 pt-4">
                                        {formatCurrency(item.totalCost)}
                                    </div>
                                    <div className="text-sm text-green-200 bg-black/20 p-3 rounded-lg flex items-start gap-2">
                                        <InfoIcon className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                        <span>Chi phí dựa trên đơn giá tham khảo và liều lượng khuyến nghị.</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Quick Usage Guide */}
                        {item.productDetails && (
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 max-h-[600px] overflow-y-auto custom-scrollbar relative">
                                <h3 className="text-lg font-bold text-gray-800 mb-5 flex items-center border-b border-gray-100 pb-3 sticky top-0 bg-white z-10">
                                    <InfoIcon className="w-5 h-5 mr-2 text-blue-500" />
                                    Hướng Dẫn Pha Chế Nhanh
                                </h3>
                                <div className="space-y-4">
                                    {item.productDetails.map((detail, idx) => {
                                        const key = Object.keys(PRODUCT_USAGE_GUIDE).find(k => detail.name.includes(k));
                                        const guide = key ? PRODUCT_USAGE_GUIDE[key] : null;
                                        if (!guide) return null;

                                        // Try to find the linked product info
                                        const productInfo = findProduct(detail.name);

                                        return (
                                            <div 
                                                key={idx} 
                                                className={`rounded-xl p-4 transition-all border ${productInfo 
                                                    ? 'bg-green-50/50 border-green-100 hover:bg-green-100 hover:border-green-200 cursor-pointer group/item' 
                                                    : 'bg-gray-50 border-gray-100 hover:bg-gray-100'}`}
                                                onClick={() => { if(productInfo) { setSelectedProduct(productInfo); setShowProductModal(true); } }}
                                                onMouseEnter={(e) => { if(productInfo) handleMouseEnterProduct(e, productInfo); }}
                                                onMouseLeave={() => setHoveredProduct(null)}
                                            >
                                                <div className={`font-bold text-sm mb-2 flex items-center justify-between ${productInfo ? 'text-green-800 group-hover/item:underline' : 'text-gray-800'}`}>
                                                    {detail.name}
                                                    {productInfo && <InfoIcon className="w-4 h-4 text-green-500 opacity-0 group-hover/item:opacity-100 transition-opacity" />}
                                                </div>
                                                <p className="text-gray-700 text-sm mb-2 leading-snug">{guide.usage}</p>
                                                {guide.note && <div className="text-xs text-gray-500 italic bg-white p-2 rounded border border-gray-100 inline-block">{guide.note}</div>}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        <button 
                            onClick={onBack} 
                            className="w-full bg-white border-2 border-gray-200 hover:border-green-500 text-gray-600 hover:text-green-600 font-bold py-4 rounded-xl transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2"
                        >
                            &larr; Quay lại danh sách
                        </button>
                    </div>
                </div>
            </div>

            {/* Floating Hover Tooltip */}
            {hoveredProduct && (
                <div 
                    className="fixed z-50 bg-white rounded-xl shadow-2xl border border-green-100 w-72 p-4 animate-scale-in pointer-events-none"
                    style={{ 
                        top: hoveredProduct.y, 
                        left: hoveredProduct.x - 300, // Offset to left
                        transform: 'translateY(-50%)'
                    }}
                >
                    <div className="w-full h-32 bg-gray-50 rounded-lg mb-3 overflow-hidden flex items-center justify-center">
                        <img src={hoveredProduct.product.imageUrl} alt={hoveredProduct.product.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="text-xs font-bold text-green-600 uppercase tracking-wider mb-1">
                        {hoveredProduct.product.category === 'tool' ? 'Dụng Cụ' : 
                         hoveredProduct.product.category === 'nutrition' ? 'Dinh Dưỡng' : 'Sản Phẩm'}
                    </div>
                    <h4 className="font-bold text-gray-800 text-sm mb-2 line-clamp-2 leading-tight">{hoveredProduct.product.name}</h4>
                    <p className="text-xs text-gray-500 line-clamp-3">{hoveredProduct.product.description}</p>
                    <div className="mt-2 pt-2 border-t border-gray-100 text-xs text-green-600 font-bold flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                        Bấm để xem chi tiết
                    </div>
                    
                    {/* Arrow pointing right */}
                    <div className="absolute top-1/2 -right-2 w-4 h-4 bg-white transform -translate-y-1/2 rotate-45 border-t border-r border-green-100"></div>
                </div>
            )}

            {/* PH Guide Modal */}
            <PHGuideModal isOpen={showPHModal} onClose={() => setShowPHModal(false)} />
            
            {/* Product Detail Modal */}
            <ProductModal 
                isOpen={showProductModal} 
                onClose={() => setShowProductModal(false)} 
                product={selectedProduct} 
            />
            
             {/* Step Modal */}
            <BaseModal
              isOpen={!!selectedStep}
              onClose={() => setSelectedStep(null)}
              title={selectedStep?.title || "Chi Tiết"}
              initialWidth={800}
              initialHeight={700}
              footer={
                  selectedStep?.subPageId ? (
                      <div className="w-full flex justify-end">
                        <button 
                            onClick={() => {
                                if (selectedStep?.subPageId) {
                                    onNavigateToSubPage(selectedStep.subPageId);
                                    setSelectedStep(null);
                                }
                            }}
                            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition-colors shadow-lg hover:scale-105 transform"
                        >
                            Xem Chi Tiết Quy Trình <ChevronRightIcon className="w-5 h-5" />
                        </button>
                      </div>
                  ) : undefined
              }
            >
               {selectedStep && (
                 <div className="grid md:grid-cols-2 gap-8 h-full">
                    {selectedStep.imageUrl && (
                      <div 
                        className="rounded-xl overflow-hidden shadow-lg border border-gray-100 cursor-zoom-in group relative h-fit"
                        onClick={() => setFullScreenImage(selectedStep.imageUrl || null)}
                      >
                        <img src={selectedStep.imageUrl} alt={selectedStep.title} className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105" />
                         <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity font-medium backdrop-blur-sm">
                            Phóng to
                        </div>
                      </div>
                    )}
                    <div className={`${!selectedStep.imageUrl ? 'md:col-span-2' : ''} overflow-y-auto pr-2 custom-scrollbar`}>
                        <div className="prose prose-green prose-lg max-w-none">
                            <h4 className="text-2xl font-bold text-green-800 mb-4 border-b pb-2">Mô tả chi tiết</h4>
                            <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
                                {selectedStep.content}
                            </p>
                        </div>
                    </div>
                 </div>
               )}
            </BaseModal>

            <ImageViewer 
                isOpen={!!fullScreenImage}
                imageUrl={fullScreenImage}
                onClose={() => setFullScreenImage(null)}
            />
        </div>
    );
};

export default DetailView;