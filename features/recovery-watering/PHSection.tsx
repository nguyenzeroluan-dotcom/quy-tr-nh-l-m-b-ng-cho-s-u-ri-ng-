import React from 'react';

interface PHSectionProps {
  onImageClick: (url: string) => void;
}

export const PHSection: React.FC<PHSectionProps> = ({ onImageClick }) => (
  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 h-full">
    <div className="flex items-center gap-4 mb-8 pb-4 border-b border-gray-100">
      <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 shadow-sm">
        <span className="font-bold text-2xl">1</span>
      </div>
      <h2 className="text-3xl font-bold text-gray-800">Tầm Quan Trọng Của pH Đất</h2>
    </div>

    <div className="space-y-6">
      <p className="text-gray-600 text-lg leading-relaxed">
        <strong className="text-gray-800 text-xl">pH đất (Độ chua)</strong> quyết định khả năng hòa tan dinh dưỡng trong đất để rễ cây hấp thu.
      </p>
      
      <div className="bg-gray-50 rounded-xl p-6 space-y-4">
        <div className="flex items-start gap-4">
          <div className="mt-2 w-3 h-3 rounded-full bg-red-500 shadow-sm ring-2 ring-red-200"></div>
          <div>
            <h4 className="font-bold text-red-700 text-lg">pH &lt; 4.5 (Đất chua)</h4>
            <p className="text-gray-600">Rễ bị bó, không hấp thu được phân bón. Nhôm (Al) và Sắt (Fe) di động mạnh gây ngộ độc rễ.</p>
          </div>
        </div>
        <div className="w-full h-px bg-gray-200"></div>
        <div className="flex items-start gap-4">
          <div className="mt-2 w-3 h-3 rounded-full bg-green-500 shadow-sm ring-2 ring-green-200"></div>
          <div>
            <h4 className="font-bold text-green-700 text-lg">pH 5.5 - 6.5 (Lý tưởng)</h4>
            <p className="text-gray-600">Vi sinh vật có lợi phát triển mạnh, phân bón được hấp thu tối đa (gần 100%).</p>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 italic text-yellow-900 text-lg rounded-r-lg shadow-sm">
        "Bón 10 bao phân ở đất chua chỉ bằng bón 1 bao ở đất tốt."
      </div>

      {/* Image 1: Root Development */}
      <div 
        className="rounded-xl overflow-hidden shadow-lg border border-gray-200 cursor-zoom-in group mt-6"
        onClick={() => onImageClick("https://agriplusvn.com/wp-content/uploads/2023/11/muc-do-phat-trien-cua-re-theo-pH.png")}
      >
        <img 
          src="https://agriplusvn.com/wp-content/uploads/2023/11/muc-do-phat-trien-cua-re-theo-pH.png" 
          alt="Biểu đồ pH và rễ" 
          className="w-full h-64 object-contain bg-white transform transition-transform duration-500 group-hover:scale-105"
        />
        <p className="text-center text-sm text-gray-500 bg-gray-50 py-2 font-medium group-hover:text-green-600 transition-colors">Bấm để xem biểu đồ phát triển của rễ</p>
      </div>

      {/* Image 2: Nutrient Availability */}
      <div 
        className="rounded-xl overflow-hidden shadow-lg border border-gray-200 cursor-zoom-in group mt-6"
        onClick={() => onImageClick("https://nongnghiepthuanthien.vn/wp-content/uploads/2022/05/pH-dat-anh-huong-den-su-san-co-cua-cac-chat-dinh-duong-trong-dat.jpg")}
      >
        <img 
          src="https://nongnghiepthuanthien.vn/wp-content/uploads/2022/05/pH-dat-anh-huong-den-su-san-co-cua-cac-chat-dinh-duong-trong-dat.jpg" 
          alt="Biểu đồ dinh dưỡng theo pH" 
          className="w-full h-64 object-contain bg-white transform transition-transform duration-500 group-hover:scale-105"
        />
        <p className="text-center text-sm text-gray-500 bg-gray-50 py-2 font-medium group-hover:text-green-600 transition-colors">Bấm để xem biểu đồ hấp thu dinh dưỡng</p>
      </div>
    </div>
  </div>
);
