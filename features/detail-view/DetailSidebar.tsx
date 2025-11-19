import React from 'react';
import { TimelineItemData, ProductInfo, ProductDetail } from '../../types';
import { PRODUCT_USAGE_GUIDE, findProductByName } from '../../data/products';
import { LeafIcon, InfoIcon } from '../../components/Icons';

const formatCurrency = (val: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);

interface DetailSidebarProps {
  item: TimelineItemData;
  onProductClick: (product: ProductInfo) => void;
  onProductHover: (e: React.MouseEvent, product: ProductInfo) => void;
  onProductLeave: () => void;
  onBack: () => void;
}

const TotalCostCard: React.FC<{ cost?: number }> = ({ cost }) => {
    if (!cost) return null;
    return (
        <div className="group bg-gradient-to-br from-green-600 to-green-800 rounded-2xl shadow-xl relative overflow-hidden transition-all duration-500 ease-in-out h-[70px] hover:h-[200px] cursor-help">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
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
            <div className="px-6 pb-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 delay-100">
                <div className="text-4xl font-extrabold mb-4 tracking-tight text-white border-t border-white/20 pt-4">
                    {formatCurrency(cost)}
                </div>
                <div className="text-sm text-green-200 bg-black/20 p-3 rounded-lg flex items-start gap-2">
                    <InfoIcon className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Chi phí dựa trên đơn giá tham khảo và liều lượng khuyến nghị.</span>
                </div>
            </div>
        </div>
    );
};

interface QuickUsageGuideProps {
    productDetails?: ProductDetail[];
    onProductClick: (product: ProductInfo) => void;
    onProductHover: (e: React.MouseEvent, product: ProductInfo) => void;
    onProductLeave: () => void;
}

const QuickUsageGuide: React.FC<QuickUsageGuideProps> = ({ productDetails, onProductClick, onProductHover, onProductLeave }) => {
    if (!productDetails) return null;
    
    const validGuides = productDetails.filter(detail => {
        const key = Object.keys(PRODUCT_USAGE_GUIDE).find(k => detail.name.includes(k));
        return !!key;
    });

    if (validGuides.length === 0) return null;

    return (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 max-h-[600px] overflow-y-auto custom-scrollbar relative">
            <h3 className="text-lg font-bold text-gray-800 mb-5 flex items-center border-b border-gray-100 pb-3 sticky top-0 bg-white z-10">
                <InfoIcon className="w-5 h-5 mr-2 text-blue-500" />
                Hướng Dẫn Pha Chế Nhanh
            </h3>
            <div className="space-y-4">
                {productDetails.map((detail, idx) => {
                    const key = Object.keys(PRODUCT_USAGE_GUIDE).find(k => detail.name.includes(k));
                    const guide = key ? PRODUCT_USAGE_GUIDE[key] : null;
                    if (!guide) return null;

                    const productInfo = findProductByName(detail.name);

                    return (
                        <div
                            key={idx}
                            className={`rounded-xl p-4 transition-all border ${productInfo ? 'bg-green-50/50 border-green-100 hover:bg-green-100 hover:border-green-200 cursor-pointer group/item' : 'bg-gray-50 border-gray-100 hover:bg-gray-100'}`}
                            onClick={() => { if (productInfo) onProductClick(productInfo); }}
                            onMouseEnter={(e) => { if (productInfo) onProductHover(e, productInfo); }}
                            onMouseLeave={onProductLeave}
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
    );
};


export const DetailSidebar: React.FC<DetailSidebarProps> = ({ item, onProductClick, onProductHover, onProductLeave, onBack }) => {
  return (
    <div className="sticky top-24 space-y-8">
      <TotalCostCard cost={item.totalCost} />
      <QuickUsageGuide 
        productDetails={item.productDetails}
        onProductClick={onProductClick}
        onProductHover={onProductHover}
        onProductLeave={onProductLeave}
      />
      <button
        onClick={onBack}
        className="w-full bg-white border-2 border-gray-200 hover:border-green-500 text-gray-600 hover:text-green-600 font-bold py-4 rounded-xl transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2"
      >
        &larr; Quay lại danh sách
      </button>
    </div>
  );
};
