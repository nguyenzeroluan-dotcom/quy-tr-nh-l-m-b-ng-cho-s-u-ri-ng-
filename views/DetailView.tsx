
import React, { useState, useEffect } from 'react';
import { TimelineItemData, RichStep, PRODUCT_USAGE_GUIDE, PRODUCT_DB, ProductInfo } from '../data';
import { PHGuideModal } from '../features/PHModal';
import { BaseModal } from '../components/Modal';
import { ProductModal } from '../components/ProductModal';
import FarmersmartLogo from '../components/Logo';
import { Breadcrumb, StageBadge } from '../components/UI';
import { SprayIcon, CheckCircleIcon, InfoIcon, LeafIcon, BookOpenIcon, ChevronRightIcon } from '../components/Icons';
import ImageViewer from '../components/ImageViewer';

const DetailView = ({ item, onBack, onNavigateToSubPage }: { item: TimelineItemData, onBack: () => void, onNavigateToSubPage: (id: string) => void }) => {
    const [selectedStep, setSelectedStep] = useState<RichStep | null>(null);
    const [showPHModal, setShowPHModal] = useState(false);
    const [fullScreenImage, setFullScreenImage] = useState<string | null>(null);
    
    // Product Modal State
    const [selectedProduct, setSelectedProduct] = useState<ProductInfo | null>(null);
    const [showProductModal, setShowProductModal] = useState(false);

    // Check if this is the "Xử Lý Đất & Kích Rễ" item (ID 2)
    const isSoilPHItem = item.id === 2;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Helper to format currency
    const formatCurrency = (val: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);

    // Helper to check if product exists in DB
    const getProductKey = (text: string) => {
       const lower = text.toLowerCase();
       if (lower.includes('ck70') || lower.includes('cây khỏe 70')) return 'ck70';
       return null;
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl animate-fade-in">
            <Breadcrumb 
                onNavigate={onBack}
                items={[
                    { label: item.stageLabel, action: onBack },
                    { label: item.title }
                ]} 
            />

            {/* Hero Section */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
                <div className="relative h-64 md:h-80 bg-gray-200">
                     {item.imageUrl ? (
                         <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                     ) : (
                         <div className="w-full h-full flex items-center justify-center bg-green-50">
                             <item.icon className="w-24 h-24 text-green-200" />
                         </div>
                     )}
                     <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                     <div className="absolute bottom-0 left-0 p-6 md:p-8 text-white">
                         <StageBadge stage={item.stage} label={item.stageLabel} />
                         <h1 className="text-3xl md:text-4xl font-bold mt-2">{item.title}</h1>
                         <div className="mt-2 text-green-200 font-medium">Thời điểm dự kiến: {item.day}</div>
                     </div>
                </div>
                
                {/* Main Info Cards */}
                <div className="p-6 md:p-8 grid md:grid-cols-2 gap-6">
                     <div 
                        className={`bg-blue-50 p-5 rounded-xl border border-blue-100 relative group/card ${isSoilPHItem ? 'cursor-pointer hover:bg-blue-100 hover:shadow-md transition-all' : ''}`}
                        onClick={() => isSoilPHItem && setShowPHModal(true)}
                     >
                         {isSoilPHItem && (
                             <div className="absolute top-3 right-3 text-blue-400 group-hover/card:text-blue-600 transition-colors animate-pulse">
                                 <BookOpenIcon className="w-5 h-5" />
                             </div>
                         )}

                         <h3 className="flex items-center text-blue-800 font-bold mb-3">
                             <SprayIcon className="w-5 h-5 mr-2" />
                             Hoạt Động Chính
                         </h3>
                         <p className={`text-gray-700 leading-relaxed mb-4 ${isSoilPHItem ? 'group-hover/card:text-blue-900 font-medium' : ''}`}>
                            {item.action}
                         </p>
                         
                         {isSoilPHItem && (
                           <div 
                             className="w-full flex items-center justify-center gap-2 bg-white border border-blue-200 text-blue-600 px-4 py-2 rounded-lg font-bold text-sm transition-colors shadow-sm group-hover/card:bg-blue-600 group-hover/card:text-white group-hover/card:border-blue-600"
                           >
                             <InfoIcon className="w-4 h-4" /> Tìm hiểu chi tiết về Đất & pH
                           </div>
                         )}
                     </div>
                     <div className="bg-yellow-50 p-5 rounded-xl border border-yellow-100">
                         <h3 className="flex items-center text-yellow-800 font-bold mb-3">
                             <CheckCircleIcon className="w-5 h-5 mr-2" />
                             Mục Tiêu
                         </h3>
                         <p className="text-gray-700 leading-relaxed">{item.purpose}</p>
                     </div>
                </div>
            </div>

            {/* PH Guide Modal */}
            <PHGuideModal isOpen={showPHModal} onClose={() => setShowPHModal(false)} />
            
            {/* Product Detail Modal */}
            <ProductModal 
                isOpen={showProductModal} 
                onClose={() => setShowProductModal(false)} 
                product={selectedProduct} 
            />

            {/* Rich Detail Content (if any) */}
            {item.richDetail && (
                <div className="mb-10">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Quy Trình Chi Tiết</h2>
                    <p className="text-gray-600 mb-6 leading-relaxed border-l-4 border-green-500 pl-4 italic">
                        {item.richDetail.intro}
                    </p>
                    <div className="space-y-4 relative">
                        {item.richDetail.steps.map((step, idx) => (
                            <div 
                              key={idx} 
                              onClick={() => setSelectedStep(step)}
                              className="group relative bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-lg hover:border-green-300 transition-all duration-300 flex gap-4 cursor-pointer"
                            >
                                <div className="flex-shrink-0 mt-1">
                                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors">
                                        {step.icon ? <step.icon className="w-6 h-6"/> : <span className="font-bold">{idx + 1}</span>}
                                    </div>
                                </div>
                                <div className="flex-grow">
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-green-700 transition-colors">{step.title}</h3>
                                        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full group-hover:bg-green-100 group-hover:text-green-700 transition-colors">Xem chi tiết</span>
                                    </div>
                                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">{step.content}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            
             {/* Step Modal */}
            <BaseModal
              isOpen={!!selectedStep}
              onClose={() => setSelectedStep(null)}
              title={selectedStep?.title || "Chi Tiết"}
              initialWidth={600}
              initialHeight={500}
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
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors shadow-md"
                        >
                            Xem Chi Tiết Quy Trình <ChevronRightIcon className="w-4 h-4" />
                        </button>
                      </div>
                  ) : undefined
              }
            >
               {selectedStep && (
                 <div className="space-y-4">
                    {selectedStep.imageUrl && (
                      <div 
                        className="rounded-xl overflow-hidden shadow-md cursor-zoom-in group relative"
                        onClick={() => setFullScreenImage(selectedStep.imageUrl || null)}
                      >
                        <img src={selectedStep.imageUrl} alt={selectedStep.title} className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105" />
                         <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                            Bấm để xem ảnh lớn
                        </div>
                      </div>
                    )}
                    <div className="prose prose-green max-w-none">
                        <h4 className="text-xl font-bold text-green-800 mb-2">Mô tả chi tiết</h4>
                        <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
                            {selectedStep.content}
                        </p>
                    </div>
                 </div>
               )}
            </BaseModal>

            <ImageViewer 
                isOpen={!!fullScreenImage}
                imageUrl={fullScreenImage}
                onClose={() => setFullScreenImage(null)}
            />

            {/* Cost & Usage Table */}
            {item.productDetails && item.productDetails.length > 0 && (
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8">
                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                         <h2 className="text-xl font-bold text-gray-800 flex items-center">
                            <LeafIcon className="w-5 h-5 mr-2 text-green-600" />
                            Chi Tiết Sử Dụng & Chi Phí
                        </h2>
                        {item.totalCost && (
                            <div className="text-sm text-gray-500 italic">
                                Tổng cộng: <span className="font-bold text-green-700">{formatCurrency(item.totalCost)}</span>
                            </div>
                        )}
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-100 text-gray-600 uppercase text-xs font-bold">
                                <tr>
                                    <th className="px-6 py-3">Sản Phẩm / Nội Dung</th>
                                    <th className="px-6 py-3">Công Dụng</th>
                                    <th className="px-6 py-3">Liều Lượng</th>
                                    <th className="px-6 py-3 text-right">Chi Phí (VNĐ)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {item.productDetails.map((detail, idx) => {
                                    const productKey = getProductKey(detail.name);
                                    const productInfo = productKey ? PRODUCT_DB[productKey] : null;

                                    return (
                                        <tr key={idx} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 font-medium text-gray-900 relative">
                                                {productInfo ? (
                                                    <div 
                                                        className="inline-block cursor-pointer text-green-700 underline decoration-dotted group/product relative"
                                                        onClick={() => { setSelectedProduct(productInfo); setShowProductModal(true); }}
                                                    >
                                                        {detail.name}
                                                        {/* Hover Image Tooltip */}
                                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 hidden group-hover/product:block z-50 w-48 bg-white p-2 rounded-lg shadow-xl border border-gray-200 animate-fade-in pointer-events-none">
                                                            <img src={productInfo.imageUrl} alt="Preview" className="w-full h-auto rounded border border-gray-100" />
                                                            <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-b border-r border-gray-200 transform rotate-45"></div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    detail.name
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-gray-600">{detail.purpose}</td>
                                            <td className="px-6 py-4 text-gray-600">
                                                {detail.dosage}
                                                <span className="text-gray-400 text-xs ml-1">({detail.quantity} {detail.unit})</span>
                                            </td>
                                            <td className="px-6 py-4 text-right font-bold text-green-700 group cursor-pointer relative">
                                                <span className="blur-[5px] group-hover:blur-none transition-all duration-300 select-none">
                                                    {formatCurrency(detail.totalCost)}
                                                </span>
                                                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-xs text-gray-400 opacity-100 group-hover:opacity-0 transition-opacity pointer-events-none">
                                                    Hiện giá
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="bg-yellow-50 p-4 text-xs text-yellow-800 italic border-t border-yellow-100">
                        * Chi phí trên là ước tính tham khảo, có thể thay đổi tùy theo giá thị trường và tình trạng thực tế của vườn. Rê chuột vào cột "Chi Phí" để xem giá.
                    </div>
                </div>
            )}

            {/* Usage Guide (Matched from Page 3) */}
            {item.productDetails && (
                <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-6 md:p-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                        <InfoIcon className="w-6 h-6 mr-2 text-green-600" />
                        Hướng Dẫn Pha Chế (Tham Khảo)
                    </h2>
                    <div className="grid grid-cols-1 gap-4">
                        {item.productDetails.map((detail, idx) => {
                            // Simple fuzzy match or direct lookup
                            const key = Object.keys(PRODUCT_USAGE_GUIDE).find(k => detail.name.includes(k));
                            const guide = key ? PRODUCT_USAGE_GUIDE[key] : null;
                            
                            if (!guide) return null;

                            return (
                                <div key={idx} className="flex flex-col md:flex-row md:items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                                    <div className="md:w-1/4 font-bold text-green-800">{detail.name}</div>
                                    <div className="md:w-3/4">
                                        <p className="text-gray-800 font-medium mb-1">{guide.usage}</p>
                                        {guide.note && <p className="text-sm text-gray-500 italic">({guide.note})</p>}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                     <p className="mt-4 text-xs text-gray-500 text-center">
                        Lưu ý: Đọc kỹ hướng dẫn trên bao bì sản phẩm trước khi sử dụng.
                    </p>
                </div>
            )}
            
            <div className="mt-8 text-center">
                <button onClick={onBack} className="text-green-600 font-bold hover:underline">
                    &larr; Quay lại quy trình
                </button>
            </div>
        </div>
    );
};

export default DetailView;
