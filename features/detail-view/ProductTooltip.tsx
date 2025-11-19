import React from 'react';
import { ProductInfo } from '../../types';
import { CATEGORY_LABELS } from '../../data/products';

interface ProductTooltipProps {
  hoveredProduct: { product: ProductInfo, y: number, x: number } | null;
}

export const ProductTooltip: React.FC<ProductTooltipProps> = ({ hoveredProduct }) => {
  if (!hoveredProduct) return null;

  return (
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
        {CATEGORY_LABELS[hoveredProduct.product.category] || 'Sản Phẩm'}
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
  );
};
