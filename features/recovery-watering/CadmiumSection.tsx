import React from 'react';
import { InfoIcon, XIcon } from '../../components/Icons';

export const CadmiumSection = () => (
  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 h-full flex flex-col">
    <div className="flex items-center gap-4 mb-8 pb-4 border-b border-gray-100">
      <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600 shadow-sm">
        <span className="font-bold text-2xl">2</span>
      </div>
      <h2 className="text-3xl font-bold text-gray-800">Mối Nguy Hại Từ Cadimi</h2>
    </div>
    
    <div className="flex-grow">
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <div className="flex-grow">
          <h3 className="font-bold text-xl text-red-700 mb-3 flex items-center">
            <InfoIcon className="w-6 h-6 mr-2" /> Cadimi là gì?
          </h3>
          <p className="text-gray-600 leading-relaxed text-lg mb-4">
            Cadimi (Cd) là kim loại nặng cực độc, thường có trong phân bón kém chất lượng hoặc nguồn nước ô nhiễm.
          </p>
          <h4 className="font-bold text-gray-800 mb-2">Tác hại chính:</h4>
          <ul className="list-disc pl-5 text-gray-700 space-y-2 mb-4">
            <li>Ức chế rễ non, gây đen đầu rễ.</li>
            <li>Cản trở hấp thu Kẽm (Zn), Sắt (Fe).</li>
            <li>Tích tụ trong trái, gây mất an toàn.</li>
          </ul>
        </div>
        <div className="md:w-1/3 flex-shrink-0">
          <div className="bg-red-50 p-6 rounded-xl text-center h-full flex flex-col items-center justify-center border border-red-100">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-3 shadow-sm">
              <XIcon className="w-10 h-10 text-red-500" />
            </div>
            <span className="text-red-800 font-bold text-lg">Sát Thủ</span>
            <span className="text-red-600">Của Bộ Rễ</span>
          </div>
        </div>
      </div>
      
      {/* Mechanism Visual */}
      <div className="bg-stone-50 rounded-xl p-6 border border-stone-200">
        <h3 className="text-lg font-bold text-blue-900 mb-4 text-center uppercase tracking-wide">
          Cơ chế "Khóa" Cadimi bằng pH
        </h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-blue-600 mb-1">pH ↑</div>
            <div className="text-xs text-gray-500 font-bold">Keo đất tích điện Âm (-)</div>
          </div>
          <div className="flex items-center justify-center text-gray-400 font-bold text-xl">➔</div>
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-green-600 mb-1">Hút</div>
            <div className="text-xs text-gray-500 font-bold">Cd2+ (Dương) bị giữ chặt</div>
          </div>
        </div>
        <div className="mt-4 bg-blue-100/50 border border-blue-200 p-3 rounded-lg text-center text-blue-800 text-sm italic font-medium">
          "pH đất 6.0 - 6.5 là điều kiện tiên quyết để vô hiệu hóa Cadimi."
        </div>
      </div>
    </div>
  </div>
);
