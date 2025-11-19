import React from 'react';
import { BaseModal } from './Modal';
import { ProductInfo } from '../types';
import { CheckCircleIcon } from './Icons';

export const ProductModal = ({ isOpen, onClose, product }: { isOpen: boolean, onClose: () => void, product: ProductInfo | null }) => {
  if (!product) return null;

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Chi Tiết Sản Phẩm"
      initialWidth={800}
      initialHeight={600}
    >
      <div className="grid md:grid-cols-2 gap-6">
        <div className="flex items-center justify-center bg-gray-50 rounded-xl p-4">
           <img src={product.imageUrl} alt={product.name} className="max-h-80 object-contain drop-shadow-xl" />
        </div>
        <div>
           <h3 className="text-2xl font-bold text-green-800 mb-2">{product.name}</h3>
           <p className="text-gray-600 font-medium mb-4">{product.description}</p>
           
           <div className="mb-4">
              <h4 className="font-bold text-gray-800 mb-2">Công Dụng:</h4>
              <ul className="space-y-2">
                 {product.benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-700 text-sm">
                       <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                       <span>{b}</span>
                    </li>
                 ))}
              </ul>
           </div>
           
           {product.usage && (
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 text-sm text-blue-800">
                 <strong>Hướng dẫn:</strong> {product.usage}
              </div>
           )}
        </div>
      </div>
    </BaseModal>
  );
};
