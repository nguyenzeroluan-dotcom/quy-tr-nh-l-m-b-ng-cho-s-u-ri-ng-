import React from 'react';
import { TimelineItemData } from '../../types';
import { SprayIcon, CheckCircleIcon, BookOpenIcon, InfoIcon } from '../../components/Icons';

interface MainInfoProps {
  item: TimelineItemData;
  onPHGuideClick: () => void;
}

export const MainInfo: React.FC<MainInfoProps> = ({ item, onPHGuideClick }) => {
  const isSoilPHItem = item.id === 2;

  return (
    <div className="p-8 grid md:grid-cols-2 gap-8 bg-white rounded-2xl shadow-xl border border-gray-100">
      {/* Action Card */}
      <div
        className={`bg-blue-50 p-6 rounded-xl border border-blue-100 relative group/card h-full ${isSoilPHItem ? 'cursor-pointer hover:bg-blue-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300' : ''}`}
        onClick={() => isSoilPHItem && onPHGuideClick()}
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
  );
};
