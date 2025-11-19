
import React, { useState, useEffect } from 'react';
import { SettingsIcon, TrashIcon, PlusIcon } from '../components/Icons';
import FarmersmartLogo from '../components/Logo';
import { BaseModal } from '../components/Modal';
import { loadMediaConfig, saveMediaConfig, MediaItem } from '../demo-save-data';

const ConfigModal = ({ isOpen, onClose, media, onSave }: { isOpen: boolean, onClose: () => void, media: MediaItem[], onSave: (data: MediaItem[]) => void }) => {
  const [localMedia, setLocalMedia] = useState<MediaItem[]>(media);

  useEffect(() => {
    setLocalMedia(media);
  }, [media]);

  const handleAdd = () => {
    setLocalMedia([...localMedia, { id: Date.now().toString(), type: 'image', url: '' }]);
  };

  const handleRemove = (id: string) => {
    setLocalMedia(localMedia.filter(m => m.id !== id));
  };

  const handleChange = (id: string, field: keyof MediaItem, value: string) => {
    setLocalMedia(localMedia.map(m => m.id === id ? { ...m, [field]: value } : m));
  };

  const handleSave = () => {
    onSave(localMedia);
    onClose();
  };

  return (
    <BaseModal 
        isOpen={isOpen} 
        onClose={onClose} 
        title="Cấu Hình Header Media"
        initialWidth={700}
        initialHeight={600}
        footer={
            <>
                <button onClick={onClose} className="px-5 py-2 text-gray-600 font-bold hover:bg-gray-200 rounded-lg transition-colors">Hủy</button>
                <button onClick={handleSave} className="px-6 py-2 bg-gradient-to-r from-green-600 to-green-500 text-white font-bold rounded-lg hover:shadow-lg hover:from-green-500 hover:to-green-400 transition-all shadow-md">
                    Lưu Cấu Hình
                </button>
            </>
        }
    >
        <div className="space-y-5">
          {localMedia.map((item, index) => (
            <div key={item.id} className="group relative flex flex-col gap-3 p-5 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-green-200 transition-all">
               <div className="flex items-center gap-3">
                   <span className="w-6 h-6 flex items-center justify-center bg-green-100 text-green-700 font-bold rounded-full text-xs">
                       {index + 1}
                   </span>
                   <div className="flex-grow grid grid-cols-1 md:grid-cols-4 gap-3">
                       <div className="md:col-span-1">
                           <select 
                             className="w-full p-2.5 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all cursor-pointer"
                             value={item.type}
                             onChange={(e) => handleChange(item.id, 'type', e.target.value)}
                           >
                             <option value="image">Ảnh</option>
                             <option value="video">Video</option>
                           </select>
                       </div>
                       <div className="md:col-span-3">
                           <input 
                             type="text" 
                             className="w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                             placeholder="Nhập URL hình ảnh hoặc video..."
                             value={item.url}
                             onChange={(e) => handleChange(item.id, 'url', e.target.value)}
                           />
                       </div>
                   </div>
                   <button 
                        onClick={() => handleRemove(item.id)} 
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Xóa"
                   >
                     <TrashIcon className="w-5 h-5" />
                   </button>
               </div>
               
               {/* Preview Mini */}
               {item.url && (
                   <div className="w-full h-24 bg-gray-100 rounded-lg overflow-hidden relative mt-1">
                       {item.type === 'video' ? (
                           <video src={item.url} className="w-full h-full object-cover opacity-80" />
                       ) : (
                           <img src={item.url} alt="Preview" className="w-full h-full object-cover opacity-80" />
                       )}
                       <div className="absolute bottom-1 right-2 text-[10px] text-gray-500 bg-white/80 px-2 py-0.5 rounded">Preview</div>
                   </div>
               )}
            </div>
          ))}

          <button onClick={handleAdd} className="w-full py-3 border-2 border-dashed border-green-300 text-green-600 rounded-xl hover:bg-green-50 hover:border-green-400 transition-all flex items-center justify-center font-bold text-sm uppercase tracking-wide shadow-sm">
            <PlusIcon className="w-5 h-5 mr-2" /> Thêm Media Mới
          </button>
        </div>
    </BaseModal>
  );
};

const CarouselHeader = () => {
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showConfig, setShowConfig] = useState(false);

  useEffect(() => {
    const data = loadMediaConfig();
    setMediaList(data);
  }, []);

  useEffect(() => {
    if (mediaList.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % mediaList.length);
    }, 6000); // 6 seconds per slide
    return () => clearInterval(interval);
  }, [mediaList]);

  const handleSaveConfig = (newData: MediaItem[]) => {
    setMediaList(newData);
    saveMediaConfig(newData);
  };

  return (
    <header className="relative h-[500px] md:h-[700px] bg-gray-900 overflow-hidden group">
      {/* Carousel Backgrounds */}
      {mediaList.map((item, index) => (
        <div 
          key={item.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        >
           {item.type === 'video' ? (
             <video 
               src={item.url} 
               autoPlay 
               muted 
               loop 
               className="w-full h-full object-cover opacity-60"
             />
           ) : (
             <img 
               src={item.url} 
               alt="Background" 
               className="w-full h-full object-cover opacity-60"
             />
           )}
           <div className="absolute inset-0 bg-gradient-to-b from-green-900/40 via-black/20 to-green-900/80"></div>
        </div>
      ))}

      {/* Content Overlay - Wide Container */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center p-4">
          <div className="mb-8 transform hover:scale-105 transition-transform duration-500">
            <div className="p-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/50">
               <FarmersmartLogo className="h-20 w-auto text-green-800" />
            </div>
          </div>
          <h1 className="text-4xl md:text-7xl font-bold mb-6 text-white drop-shadow-lg tracking-tight">
            Quy Trình Tổng Quát
          </h1>
          <p className="text-green-100 text-lg md:text-3xl max-w-5xl mx-auto mb-12 drop-shadow-md font-light">
            Giải pháp chăm sóc chuyên biệt ứng dụng bộ chế phẩm sinh học <span className="font-bold text-white">Farmersmart</span>
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-7xl mx-auto bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-xl w-full md:w-auto">
            <div className="text-center px-6 border-r border-white/10 last:border-0">
                <p className="text-green-300 text-xs uppercase tracking-widest mb-2">Loại Vườn</p>
                <p className="font-bold text-xl md:text-2xl text-white">Kinh Doanh</p>
            </div>
             <div className="text-center px-6 border-r border-white/10 last:border-0">
                <p className="text-green-300 text-xs uppercase tracking-widest mb-2">Độ Tuổi</p>
                <p className="font-bold text-xl md:text-2xl text-white">Trên 9 Năm</p>
            </div>
            <div className="text-center px-6 border-r border-white/10 last:border-0">
                <p className="text-green-300 text-xs uppercase tracking-widest mb-2">Giải Pháp</p>
                <p className="font-bold text-xl md:text-2xl text-white">Hữu Cơ Vi Sinh</p>
            </div>
            <div className="text-center px-6">
                <p className="text-green-300 text-xs uppercase tracking-widest mb-2">Mục Tiêu</p>
                <p className="font-bold text-xl md:text-2xl text-white">Bền Vững</p>
            </div>
          </div>
      </div>

      {/* Config Button (Hidden until hover) */}
      <button 
        className="absolute top-4 right-4 z-50 bg-white/20 hover:bg-white text-white hover:text-gray-800 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm"
        onClick={() => setShowConfig(true)}
        title="Cấu hình Header"
      >
        <SettingsIcon className="w-5 h-5" />
      </button>

      {/* Config Modal */}
      <ConfigModal 
        isOpen={showConfig} 
        onClose={() => setShowConfig(false)} 
        media={mediaList}
        onSave={handleSaveConfig}
      />
    </header>
  );
};

export default CarouselHeader;
