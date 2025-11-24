
import React, { useState, useEffect, useRef } from 'react';
import CarouselHeader from '../features/CarouselHeader';
import TimelineCard from '../features/TimelineCard';
import { dataManager } from '../lib/DataManager'; 
import { TimelineItemData } from '../types';
import { FilterButton, BackToTopButton } from '../components/UI';
import FarmersmartLogo from '../components/Logo';
import { BookOpenIcon, LeafIcon } from '../components/Icons';

interface ListViewProps {
  onItemClick: (item: TimelineItemData) => void;
  onNavigateToBlog: () => void;
  onNavigateToProducts: () => void;
  onNavigateToLegal: (page: 'privacy' | 'terms') => void;
}

const ListView: React.FC<ListViewProps> = ({ onItemClick, onNavigateToBlog, onNavigateToProducts, onNavigateToLegal }) => {
  const [filter, setFilter] = useState('all');
  const [items, setItems] = useState<TimelineItemData[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Smart Header State
  const [showHeader, setShowHeader] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    // Load timeline data from DataManager (Async)
    dataManager.getTimeline().then(data => {
        setItems(data);
        setLoading(false);
    });

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 50) {
        // At top
        setIsAtTop(true);
        setShowHeader(true);
      } else {
        setIsAtTop(false);
        // Show if scrolling up, hide if scrolling down
        if (currentScrollY < lastScrollY.current) {
          setShowHeader(true);
        } else if (currentScrollY > lastScrollY.current) {
          setShowHeader(false);
        }
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredData = filter === 'all' 
    ? items 
    : items.filter(item => item.stage === filter);

  if (loading) {
     return <div className="min-h-screen flex items-center justify-center bg-green-50 text-green-800">Đang tải quy trình...</div>;
  }

  return (
    <div className="min-h-screen pb-20 bg-gradient-to-b from-green-50 to-white">
      <CarouselHeader />

      {/* Sticky Smart Navigation Filter */}
      <div 
        className={`sticky top-0 z-30 transition-all duration-300 transform border-b border-green-100 py-4 ${
          showHeader ? 'translate-y-0' : '-translate-y-full'
        } ${
          isAtTop ? 'bg-white/95 shadow-sm' : 'bg-white/80 backdrop-blur-md shadow-md'
        }`}
      >
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

      {/* Main Timeline Content - Full Width PC Upgrade */}
      <main className="container mx-auto px-4 py-12 relative min-h-[800px] max-w-[1920px]">
        {/* Vertical Line */}
        <div className="timeline-line"></div>

        <div className="relative z-10 max-w-[1400px] mx-auto">
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
      <footer className="bg-green-900 text-green-300 py-16">
         <div className="container mx-auto px-4 max-w-[1600px]">
            <div className="grid md:grid-cols-3 gap-12 mb-12 text-center md:text-left">
                <div className="flex flex-col items-center md:items-start">
                     <FarmersmartLogo className="h-16 w-auto text-white mb-6" light={true} />
                     <p className="text-base text-green-200 leading-relaxed">Đồng hành cùng nhà nông kiến tạo nền nông nghiệp bền vững.</p>
                </div>
                
                <div className="flex flex-col items-center md:items-start">
                     <h3 className="text-white font-bold text-xl mb-6">Liên Hệ</h3>
                     <p className="mb-3 text-lg">Địa chỉ: Ấp Tân Long, Xã Tân Dương, Tỉnh Đồng Tháp</p>
                     <p className="mb-3 text-lg">Hotline: <span className="text-white font-bold">0908.119.987</span></p>
                </div>

                <div className="flex flex-col items-center md:items-start">
                    <h3 className="text-white font-bold text-xl mb-6">Thông Tin Hữu Ích</h3>
                    <button 
                        onClick={onNavigateToBlog}
                        className="flex items-center gap-2 text-green-200 hover:text-white hover:underline transition-colors mb-3 text-lg"
                    >
                        <BookOpenIcon className="w-5 h-5" /> Blog & Kỹ Thuật Canh Tác
                    </button>
                     <button 
                        onClick={onNavigateToProducts}
                        className="flex items-center gap-2 text-green-200 hover:text-white hover:underline transition-colors mb-3 text-lg"
                    >
                        <LeafIcon className="w-5 h-5" /> Sản Phẩm & Dụng Cụ
                    </button>
                    <button onClick={() => onNavigateToLegal('privacy')} className="text-green-200 hover:text-white hover:underline transition-colors mb-3 text-lg">Chính sách bảo mật</button>
                    <button onClick={() => onNavigateToLegal('terms')} className="text-green-200 hover:text-white hover:underline transition-colors text-lg">Điều khoản sử dụng</button>
                </div>
            </div>

            <div className="border-t border-green-800 pt-8 text-center text-green-400">
               <p>© 2025 Công Ty Cổ Phần Farmersmart. All rights reserved.</p>
               <p className="mt-2 text-sm italic opacity-70">Lưu ý: Quy trình và liều lượng có thể thay đổi tùy theo diễn biến thực tế của thời tiết và sức khỏe cây trồng.</p>
            </div>
         </div>
      </footer>
      
      <BackToTopButton />
    </div>
  );
};

export default ListView;
