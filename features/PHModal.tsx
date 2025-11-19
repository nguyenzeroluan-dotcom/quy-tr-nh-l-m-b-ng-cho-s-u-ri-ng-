
import React, { useState } from 'react';
import { BaseModal } from '../components/Modal';
import { LeafIcon, InfoIcon } from '../components/Icons';
import ImageViewer from '../components/ImageViewer';

export const PHGuideModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const phLevels = [
    { range: "3-4", title: "Axit Cực Mạnh", desc: "Độc Al/Mn, rễ chết.", color: "bg-red-600 text-white" },
    { range: "4-5", title: "Axit Mạnh", desc: "Thiếu dinh dưỡng, rễ kém phát triển.", color: "bg-orange-500 text-white" },
    { range: "5-6", title: "Axit Nhẹ", desc: "Tốt cho sầu riêng, hấp thu tối ưu.", color: "bg-yellow-400 text-gray-800" },
    { range: "6-7", title: "Trung Tính Nhẹ", desc: "Chấp nhận được.", color: "bg-green-500 text-white" },
    { range: "7-8", title: "Kiềm Nhẹ", desc: "Thiếu Fe/Zn, vàng lá.", color: "bg-teal-500 text-white" },
    { range: "8-11", title: "Kiềm Mạnh", desc: "Rễ thối, cây chết.", color: "bg-purple-600 text-white" },
  ];

  return (
    <>
      <BaseModal
        isOpen={isOpen}
        onClose={onClose}
        title="Kiến Thức Đất & pH Trong Canh Tác Sầu Riêng"
        initialWidth={900}
        initialHeight={800}
      >
        <div className="space-y-8">
          
          {/* SECTION 1: SOIL TREATMENT */}
          <div className="bg-gradient-to-r from-stone-50 to-stone-100 p-5 rounded-xl border border-stone-200 shadow-sm">
              <h4 className="font-bold text-stone-800 text-lg mb-4 flex items-center">
                 <LeafIcon className="w-5 h-5 mr-2 text-stone-600" />
                 1. Tại Sao Cần Xử Lý & Cải Tạo Đất?
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 <div className="bg-white p-4 rounded-lg shadow-sm border border-stone-100 hover:shadow-md transition-shadow">
                    <h5 className="font-bold text-stone-700 text-sm mb-2">Đất Tơi Xốp (Thông Thoáng)</h5>
                    <p className="text-xs text-stone-500 leading-relaxed">
                      Giúp rễ cây dễ dàng hô hấp và len lỏi tìm dinh dưỡng. Tránh hiện tượng nén dẽ khiến rễ bị nghẹt.
                    </p>
                 </div>
                 <div className="bg-white p-4 rounded-lg shadow-sm border border-stone-100 hover:shadow-md transition-shadow">
                    <h5 className="font-bold text-stone-700 text-sm mb-2">Cân Bằng Hệ Vi Sinh</h5>
                    <p className="text-xs text-stone-500 leading-relaxed">
                      Tạo môi trường cho vi sinh vật có lợi (Trichoderma, Bacillus) phát triển, đối kháng nấm bệnh gây hại.
                    </p>
                 </div>
                 <div className="bg-white p-4 rounded-lg shadow-sm border border-stone-100 hover:shadow-md transition-shadow">
                    <h5 className="font-bold text-stone-700 text-sm mb-2">Mùn Hữu Cơ</h5>
                    <p className="text-xs text-stone-500 leading-relaxed">
                      Keo đất giúp giữ ẩm, giữ phân bón, tránh rửa trôi dinh dưỡng trong mùa mưa.
                    </p>
                 </div>
              </div>
          </div>

          {/* SECTION 2: pH Info */}
          <div>
            <div className="bg-green-50 p-4 rounded-xl border border-green-200 text-center mb-6">
                <h4 className="font-bold text-green-800 text-lg mb-1">2. pH đất tác động trực tiếp lên sức khỏe bộ rễ</h4>
                <p className="text-gray-600">Kiểm soát pH là chìa khóa để cây hấp thu dinh dưỡng hiệu quả nhất.</p>
            </div>

            {/* pH Scale Visualization */}
            <div className="mb-6">
              <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">Thang Đo pH Đất</h4>
              <div className="relative h-16 rounded-lg bg-gradient-to-r from-red-600 via-yellow-400 to-purple-600 shadow-inner flex items-center">
                  {/* Markers */}
                  <div className="absolute left-[10%] text-white font-bold text-xs top-2">3</div>
                  <div className="absolute left-[50%] text-white font-bold text-xs top-2">7</div>
                  <div className="absolute left-[90%] text-white font-bold text-xs top-2">11</div>
                  
                  {/* Ideal Range Highlight */}
                  <div className="absolute left-[39%] width-[15%] w-[15%] h-[140%] -top-[20%] border-4 border-white shadow-lg bg-green-500/20 backdrop-blur-sm rounded-lg flex flex-col items-center justify-center animate-pulse z-10">
                     <div className="bg-white text-green-700 text-xs font-bold px-2 py-1 rounded shadow mb-1 whitespace-nowrap">Lý Tưởng</div>
                     <span className="text-white font-bold text-shadow">5.5 - 6.5</span>
                  </div>
              </div>
              <div className="flex justify-between text-xs font-bold text-gray-400 mt-2 px-2">
                 <span>Axit (Chua)</span>
                 <span>Trung Tính</span>
                 <span>Kiềm</span>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {phLevels.map((level, idx) => (
                   <div key={idx} className={`${level.color} p-4 rounded-xl shadow-md transform transition-transform hover:scale-105`}>
                       <div className="flex justify-between items-start mb-2">
                           <span className="text-2xl font-extrabold opacity-90">pH {level.range}</span>
                       </div>
                       <h5 className="font-bold text-lg mb-1">{level.title}</h5>
                       <p className="text-sm opacity-90">{level.desc}</p>
                   </div>
                ))}
            </div>
          </div>

          {/* Images Section */}
          <div className="space-y-6 pt-4 border-t border-gray-200">
              <h4 className="text-lg font-bold text-gray-800 flex items-center">
                  <InfoIcon className="w-5 h-5 mr-2 text-gray-500" />
                  Minh Họa Thực Tế
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div 
                    className="bg-white p-2 rounded-xl shadow-sm border border-gray-100 cursor-zoom-in group"
                    onClick={() => setPreviewImage("https://agriplusvn.com/wp-content/uploads/2023/11/muc-do-phat-trien-cua-re-theo-pH.png")}
                  >
                      <div className="overflow-hidden rounded-lg">
                        <img src="https://agriplusvn.com/wp-content/uploads/2023/11/muc-do-phat-trien-cua-re-theo-pH.png" alt="Biểu đồ dinh dưỡng pH" className="w-full h-56 object-contain transform transition-transform duration-500 group-hover:scale-105" />
                      </div>
                      <p className="text-center text-xs text-gray-500 mt-2 italic group-hover:text-green-600">Khả năng hấp thu dinh dưỡng theo độ pH (Bấm để phóng to)</p>
                  </div>
                   <div 
                    className="bg-white p-2 rounded-xl shadow-sm border border-gray-100 cursor-zoom-in group"
                    onClick={() => setPreviewImage("https://baominhagri.com/upload/news/030023672419.jpg")}
                   >
                      <div className="overflow-hidden rounded-lg">
                        <img src="https://baominhagri.com/upload/news/030023672419.jpg" alt="Tác động lên rễ" className="w-full h-56 object-cover transform transition-transform duration-500 group-hover:scale-105" />
                      </div>
                      <p className="text-center text-xs text-gray-500 mt-2 italic group-hover:text-green-600">Sự phát triển của rễ cây ở các mức pH khác nhau (Bấm để phóng to)</p>
                  </div>
              </div>
          </div>
        </div>
      </BaseModal>

      <ImageViewer 
        isOpen={!!previewImage}
        imageUrl={previewImage}
        onClose={() => setPreviewImage(null)}
      />
    </>
  );
};
