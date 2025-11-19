
import React, { useState } from 'react';
import CarouselHeader from '../features/Header';
import TimelineCard from '../features/TimelineCard';
import { timelineData, TimelineItemData } from '../data';
import { FilterButton, BackToTopButton } from '../components/UI';
import FarmersmartLogo from '../components/Logo';

interface ListViewProps {
  onItemClick: (item: TimelineItemData) => void;
}

const ListView: React.FC<ListViewProps> = ({ onItemClick }) => {
  const [filter, setFilter] = useState('all');

  const filteredData = filter === 'all' 
    ? timelineData 
    : timelineData.filter(item => item.stage === filter);

  return (
    <div className="min-h-screen pb-20 bg-gradient-to-b from-green-50 to-white">
      <CarouselHeader />

      {/* Sticky Navigation Filter */}
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-md shadow-sm border-b border-green-100 py-4">
        <div className="container mx-auto px-4 overflow-x-auto no-scrollbar">
          <div className="flex md:justify-center space-x-2 min-w-max px-2">
            <FilterButton 
              label="Tất Cả" 
              active={filter === 'all'} 
              onClick={() => setFilter('all')} 
              colorClass="bg-green-800"
            />
            <FilterButton 
              label="Phục Hồi" 
              active={filter === 'recovery'} 
              onClick={() => setFilter('recovery')} 
              colorClass="bg-stone-600"
            />
            <FilterButton 
              label="Cơi Đọt (Sinh Trưởng)" 
              active={filter === 'growth'} 
              onClick={() => setFilter('growth')} 
              colorClass="bg-green-600"
            />
            <FilterButton 
              label="Làm Bông (Ra Hoa)" 
              active={filter === 'flowering'} 
              onClick={() => setFilter('flowering')} 
              colorClass="bg-yellow-500 border-yellow-500"
            />
          </div>
        </div>
      </div>

      {/* Main Timeline Content */}
      <main className="container mx-auto px-4 py-12 relative min-h-[800px]">
        {/* Vertical Line */}
        <div className="timeline-line"></div>

        <div className="relative z-10">
          {filteredData.map((item, index) => (
            <TimelineCard 
                key={item.id} 
                item={item} 
                index={index} 
                onClick={() => onItemClick(item)}
            />
          ))}
        </div>

        {filteredData.length === 0 && (
           <div className="text-center py-20 text-gray-500">
             Không có dữ liệu cho giai đoạn này.
           </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-green-900 text-green-300 py-12">
         <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center mb-6">
                <FarmersmartLogo className="h-12 w-auto text-white" light={true} />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Công Ty Cổ Phần Farmersmart</h2>
            <p className="mb-2">Địa chỉ: Ấp Tân Long, Xã Tân Dương, Tỉnh Đồng Tháp</p>
            <p className="mb-6">Hotline: 0908.119.987</p>
            <div className="border-t border-green-800 pt-6 text-sm">
               <p>Lưu ý: Quy trình và liều lượng có thể thay đổi tùy theo diễn biến thực tế của thời tiết và sức khỏe cây trồng.</p>
            </div>
         </div>
      </footer>
      
      <BackToTopButton />
    </div>
  );
};

export default ListView;
