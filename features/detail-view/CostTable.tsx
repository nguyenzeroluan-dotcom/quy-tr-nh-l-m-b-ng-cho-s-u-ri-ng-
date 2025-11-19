import React from 'react';
import { ProductDetail, ProductInfo } from '../../types';
import { findProductByName } from '../../data/products';
import { LeafIcon, InfoIcon } from '../../components/Icons';

interface CostTableProps {
  productDetails: ProductDetail[];
  totalCost?: number;
  onProductClick: (product: ProductInfo) => void;
  onProductHover: (e: React.MouseEvent, product: ProductInfo) => void;
  onProductLeave: () => void;
}

const formatCurrency = (val: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);

export const CostTable: React.FC<CostTableProps> = ({ productDetails, totalCost, onProductClick, onProductHover, onProductLeave }) => {
  return (
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
            {productDetails.map((detail, idx) => {
              const productInfo = findProductByName(detail.name);
              return (
                <tr key={idx} className="hover:bg-green-50/50 transition-colors">
                  <td className="px-8 py-4 font-bold text-gray-800 relative">
                    {productInfo ? (
                      <div
                        className="inline-flex items-center cursor-pointer text-green-700 hover:text-green-900 hover:underline decoration-dotted group/product"
                        onClick={() => onProductClick(productInfo)}
                        onMouseEnter={(e) => onProductHover(e, productInfo)}
                        onMouseLeave={onProductLeave}
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
          {totalCost && (
            <tfoot className="bg-gray-50">
              <tr>
                <td colSpan={3} className="px-8 py-4 text-right font-bold text-gray-600 uppercase">Tổng Cộng:</td>
                <td className="px-8 py-4 text-right font-extrabold text-green-700 text-xl">{formatCurrency(totalCost)}</td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </div>
  );
};
