
import React from 'react';
import { TimelineItemData } from '../data';
import { FlowerIcon, ChevronRightIcon } from '../components/Icons';
import { ImagePlaceholder, StageBadge } from '../components/UI';

const TimelineCard: React.FC<{ item: TimelineItemData, index: number, onClick: () => void }> = ({ item, index, onClick }) => {
  const isEven = index % 2 === 0;

  // Format currency
  const costString = item.totalCost 
    ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumSignificantDigits: 3 }).format(item.totalCost)
    : null;

  return (
    <div className={`relative flex items-start mb-12 md:mb-24 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} group`}>
      
      {/* Day Badge */}
      <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 -translate-y-4 md:-translate-y-1/2 z-20">
        <div className="bg-white border-4 border-green-500 text-green-800 font-bold rounded-full w-16 h-16 md:w-20 md:h-20 flex flex-col items-center justify-center shadow-lg transition-transform hover:scale-110 z-20">
          <span className="text-[10px] md:text-xs uppercase text-gray-500 font-bold">Ngày</span>
          <span className="text-xs md:text-lg leading-none font-extrabold">{item.day.split('/')[0]}</span>
          <span className="text-[8px] md:text-[10px] text-gray-400">{item.day.split('/').slice(1).join('/')}</span>
        </div>
      </div>

      {/* Content Card */}
      <div 
        className={`ml-16 md:ml-0 w-full md:w-[calc(50%-40px)] bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden cursor-pointer ${item.stage === 'flowering' ? 'ring-2 ring-yellow-400' : ''}`}
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
      <div className="hidden md:block w-[calc(50%-40px)]"></div>
    </div>
  );
};

export default TimelineCard;
