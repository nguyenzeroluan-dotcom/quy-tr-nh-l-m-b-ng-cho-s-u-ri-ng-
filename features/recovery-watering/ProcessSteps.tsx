import React from 'react';
import { InfoIcon, LeafIcon } from '../../components/Icons';

export const ProcessSteps = () => (
  <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-10 md:p-12 mb-12">
    <div className="flex items-center gap-4 mb-10 justify-center">
      <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg ring-4 ring-blue-100">
        <span className="font-bold text-2xl">3</span>
      </div>
      <h2 className="text-4xl font-bold text-gray-800">Quy Trình Tưới Phục Hồi Chuẩn</h2>
    </div>

    <div className="grid md:grid-cols-2 gap-8">
      {/* Step 1 */}
      <div className="relative group">
        <div className="absolute inset-0 bg-blue-600 rounded-2xl transform rotate-1 opacity-10 group-hover:rotate-2 transition-transform"></div>
        <div className="relative bg-white rounded-2xl shadow-md border border-gray-200 p-8 h-full hover:-translate-y-1 transition-transform">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-blue-100 text-blue-700 font-bold px-4 py-2 rounded-lg">Bước 1</div>
            <h4 className="font-bold text-2xl text-gray-800">Xả Phèn & Giải Độc</h4>
          </div>
          <p className="text-gray-600 text-lg mb-4">Sử dụng các sản phẩm có gốc Canxi hoặc vôi tinh để tưới đẫm vùng đất quanh tán cây.</p>
          <div className="flex items-center text-blue-800 bg-blue-50 px-4 py-3 rounded-xl font-medium">
            <InfoIcon className="w-5 h-5 mr-2" /> Mục đích: Đẩy ion H+ và kim loại nặng ra khỏi vùng rễ.
          </div>
        </div>
      </div>

      {/* Step 2 */}
      <div className="relative group">
        <div className="absolute inset-0 bg-green-600 rounded-2xl transform -rotate-1 opacity-10 group-hover:-rotate-2 transition-transform"></div>
        <div className="relative bg-white rounded-2xl shadow-md border border-gray-200 p-8 h-full hover:-translate-y-1 transition-transform">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-green-100 text-green-700 font-bold px-4 py-2 rounded-lg">Bước 2</div>
            <h4 className="font-bold text-2xl text-gray-800">Kích Rễ & Nâng pH</h4>
          </div>
          <p className="text-gray-600 text-lg mb-4">Pha hỗn hợp <strong>Humic Acid + Fulvic Acid + Vi sinh vật</strong> tưới đều quanh gốc.</p>
          <div className="flex items-center text-green-800 bg-green-50 px-4 py-3 rounded-xl font-medium">
            <LeafIcon className="w-5 h-5 mr-2" /> Kết quả: Rễ cám bung mạnh sau 5-7 ngày.
          </div>
        </div>
      </div>
    </div>
  </div>
);
