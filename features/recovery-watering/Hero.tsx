import React from 'react';
import { DropletIcon } from '../../components/Icons';

export const RecoveryWateringHero = () => (
  <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-10 md:p-16 text-white shadow-xl mb-12 relative overflow-hidden">
    <div className="absolute top-0 right-0 opacity-10 transform translate-x-1/4 -translate-y-1/4">
      <DropletIcon className="w-96 h-96" />
    </div>
    <div className="relative z-10 max-w-4xl">
      <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
        Quy Trình Tưới Phục Hồi & Kiểm Soát Cadimi
      </h1>
      <p className="text-blue-100 text-xl md:text-2xl font-light">
        Hướng dẫn chuyên sâu về kỹ thuật phục hồi hệ rễ, cân bằng pH đất và giải độc kim loại nặng (Cadimi) để cây sầu riêng phát triển bền vững.
      </p>
    </div>
  </div>
);
