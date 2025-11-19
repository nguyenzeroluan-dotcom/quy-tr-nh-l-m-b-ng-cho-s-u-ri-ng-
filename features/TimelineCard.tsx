import React from 'react';
import { TimelineItemData } from '../types';
import { FlowerIcon, ChevronRightIcon } from '../components/Icons';
import { ImagePlaceholder, StageBadge } from '../components/UI';

const TimelineCard: React.FC<{ item: TimelineItemData, index: number, onClick: () => void }> = ({ item, index, onClick }) => {
  const isEven = index % 2 === 0;

  // Format currency
  const costString = item.totalCost 
    ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumSignificantDigits: 3 }).format(item.totalCost)
    : null;

  // --- Logic tính số ngày trong quy trình ---
  // Mốc bắt đầu: 01/10/2025
  const BASE_DATE = new Date(2025, 9, 1); // Tháng 0-indexed (9 = Tháng 10)

  // Lấy ngày bắt đầu của item hiện tại (item.day string dạng "dd/mm/yyyy" hoặc "dd/mm/yyyy - ...")
  const startDateString = item.day.split('-')[0].trim(); 
  const [d, m, y] = startDateString.split('/');
  const currentDate = new Date(parseInt(y), parseInt(m) - 1, parseInt(d));

  // Tính chênh lệch thời gian (milliseconds)
  const diffTime = currentDate.getTime() - BASE_DATE.getTime();
  // Quy đổi ra ngày (làm tròn)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // Format hiển thị ngày dương lịch ngắn gọn (dd/mm/yy)
  const displayDate = `${d}/${m}/${y.slice(-2)}`;

  return (
    <div className={`relative flex items-start mb-12 md:mb-24 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} group`}>
      
      {/* Date Badge - Hiển thị số ngày trong quy trình */}
      <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 -translate-y-4 md:-translate-y-1/2 z-20">
        <div className="bg-white border-4 border-green-600 text-green-800 rounded-xl w-20 h-20 md:w-24 md:h-24 flex flex-col items-center justify-center shadow-lg transition-transform hover:scale-110 z-20 overflow-hidden relative">
            {/* Label nhỏ phía trên */}
            <span className="text-[10px] font-bold text-green-600 uppercase tracking-wider mt-1">NGÀY</span>
            
            {/* Số ngày to in đậm */}
            <span className="text-3xl md:text-4xl leading-none font-extrabold text-green-800 my-0.5">
                {diffDays}
            </span>
            
            {/* Ngày dương lịch phía dưới */}
            <div className="w-full bg-gray-100 text-center py-0.5 mt-1 border-t border-gray-200">
                <span className="text-[10px] md:text-xs font-bold text-gray-600 block leading-tight">
                    {displayDate}
                </span>
            </div>
        </div>
      </div>

      {/* Content Card */}
      <div 
        className={`ml-16 md:ml-0 w-full md:w-[calc(50%-48px)] bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden cursor-pointer ${item.stage === 'flowering' ? 'ring-2 ring-yellow-400' : ''}`}
        onClick={onClick}
      >
        
        <div className="p-5">
          <div className="flex justify-between items-start mb-2">
            <StageBadge stage={item.stage} label={item.stageLabel} />
            {item.stage === 'flowering' && <FlowerIcon className="w-5 h-5 text-yellow-500 animate-pulse" />}
          </div>
          
          <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-green-700 transition-colors">
            {item.title}
          </h3>
          <div className="text-xs text-gray-500 font-medium mb-3 flex items-center gap-1">
             <span className="bg-gray-100 px-2 py-0.5 rounded border border-gray-200">
                 Lịch trình: {item.day}
             </span>
          </div>
          
          <div className="mb-4">
             <ImagePlaceholder type={item.imageType} text={item.title} imageUrl={item.imageUrl} />
          </div>

          <div className="flex items-start gap-2 text-gray-600 mb-3">
             <div className="mt-1 min-w-[20px]"><item.icon className="w-5 h-5 text-green-600"/></div>
             <p className="text-sm font-medium leading-relaxed line-clamp-2">{item.action}</p>
          </div>
          
          {/* Cost Estimate Badge */}
          {costString && (
             <div className="mb-4 flex justify-end">
                <div className="bg-stone-100 rounded-lg px-3 py-1 text-xs font-bold text-stone-600 flex items-center gap-2 group/cost">
                   <span>Chi phí dự kiến:</span>
                   <span className="blur-sm group-hover/cost:blur-none transition-all duration-300 cursor-pointer text-stone-800">{costString}</span>
                </div>
             </div>
          )}

          <div className="mt-4 text-center">
            <span className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full flex items-center justify-center gap-1 w-full hover:bg-green-100 transition-colors">
               Xem Chi Tiết <ChevronRightIcon className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>

      {/* Empty space for desktop layout balance */}
      <div className="hidden md:block w-[calc(50%-48px)]"></div>
    </div>
  );
};

export default TimelineCard;
