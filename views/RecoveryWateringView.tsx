
import React, { useEffect } from 'react';
import { Breadcrumb } from '../components/UI';
import { DropletIcon, InfoIcon, LeafIcon, XIcon } from '../components/Icons';

const RecoveryWateringView = ({ onBack }: { onBack: () => void }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl animate-fade-in">
       <Breadcrumb 
            onNavigate={onBack}
            items={[
                { label: "Xử Lý Đất & Kích Rễ", action: onBack },
                { label: "Quy Trình Tưới Phục Hồi" }
            ]} 
        />

      {/* Header Hero */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white shadow-xl mb-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10 transform translate-x-1/4 -translate-y-1/4">
           <DropletIcon className="w-64 h-64" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4 relative z-10">
          Quy Trình Tưới Phục Hồi & Kiểm Soát Cadimi
        </h1>
        <p className="text-blue-100 text-lg max-w-2xl relative z-10">
          Hướng dẫn chuyên sâu về kỹ thuật phục hồi hệ rễ, cân bằng pH đất và giải độc kim loại nặng (Cadimi) để cây sầu riêng phát triển bền vững.
        </p>
      </div>

      {/* Section 1: pH Đất */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
            <span className="font-bold text-xl">1</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Tầm Quan Trọng Của pH Đất</h2>
        </div>

        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 md:p-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
             <div>
                <p className="text-gray-600 mb-4 leading-relaxed text-lg">
                   <strong className="text-gray-800">pH đất (Độ chua)</strong> quyết định khả năng hòa tan dinh dưỡng trong đất để rễ cây hấp thu.
                </p>
                <ul className="space-y-3 mb-4">
                   <li className="flex items-start gap-3">
                      <div className="mt-1 min-w-[8px] w-2 h-2 rounded-full bg-red-500"></div>
                      <span className="text-gray-700"><strong>pH &lt; 4.5 (Đất chua):</strong> Rễ bị bó, không hấp thu được phân bón. Nhôm (Al) và Sắt (Fe) di động mạnh gây ngộ độc rễ.</span>
                   </li>
                   <li className="flex items-start gap-3">
                      <div className="mt-1 min-w-[8px] w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="text-gray-700"><strong>pH 5.5 - 6.5 (Lý tưởng):</strong> Vi sinh vật có lợi phát triển mạnh, phân bón được hấp thu tối đa (gần 100%).</span>
                   </li>
                </ul>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 italic text-yellow-800 text-sm">
                   "Bón 10 bao phân ở đất chua chỉ bằng bón 1 bao ở đất tốt."
                </div>
             </div>
             <div className="rounded-lg overflow-hidden shadow-lg border border-gray-200">
                <img 
                  src="https://agriplusvn.com/wp-content/uploads/2023/11/muc-do-phat-trien-cua-re-theo-pH.png" 
                  alt="Biểu đồ pH" 
                  className="w-full h-auto object-contain bg-white"
                />
             </div>
          </div>
        </div>
      </div>

      {/* Section 2: Cadimi */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
            <span className="font-bold text-xl">2</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Mối Nguy Hại Từ Cadimi (Cadmium)</h2>
        </div>

        <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
           <div className="grid md:grid-cols-3 border-b border-gray-100">
              <div className="p-6 md:col-span-2">
                 <h3 className="font-bold text-lg text-red-700 mb-3 flex items-center">
                    <InfoIcon className="w-5 h-5 mr-2" /> Cadimi là gì?
                 </h3>
                 <p className="text-gray-600 mb-4 leading-relaxed">
                    Cadimi (Cd) là một kim loại nặng cực độc, thường tồn tại tạp chất trong các loại phân bón hóa học (đặc biệt là phân Lân kém chất lượng) hoặc do ô nhiễm nguồn nước.
                 </p>
                 <h4 className="font-bold text-gray-800 mb-2">Tác hại lên cây sầu riêng:</h4>
                 <ul className="list-disc pl-5 text-gray-700 space-y-2">
                    <li>Làm ức chế sự phát triển của rễ non, đầu rễ bị đen và thối.</li>
                    <li>Cản trở quá trình hấp thu vi lượng Kẽm (Zn) và Sắt (Fe), gây vàng lá.</li>
                    <li>Tích tụ trong trái, gây ảnh hưởng đến sức khỏe người tiêu dùng (xuất khẩu bị trả về).</li>
                 </ul>
              </div>
              <div className="bg-red-50 p-6 flex flex-col items-center justify-center text-center">
                 <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
                     <XIcon className="w-12 h-12 text-red-500" />
                 </div>
                 <span className="text-red-800 font-bold text-lg">Kẻ Thù Giấu Mặt</span>
                 <span className="text-red-600 text-sm">Của Bộ Rễ Khỏe</span>
              </div>
           </div>
           
           <div className="p-6 bg-green-50">
              <h4 className="font-bold text-green-800 mb-3">Giải Pháp Kiểm Soát Cadimi:</h4>
              <div className="grid md:grid-cols-2 gap-4">
                 <div className="bg-white p-4 rounded-lg shadow-sm flex items-start gap-3">
                    <LeafIcon className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                        <p className="font-bold text-gray-800">Nâng pH Đất</p>
                        <p className="text-sm text-gray-600">Ở pH trung tính (>6.0), Cadimi bị kết tủa và rễ cây khó hấp thu hơn.</p>
                    </div>
                 </div>
                 <div className="bg-white p-4 rounded-lg shadow-sm flex items-start gap-3">
                    <LeafIcon className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                        <p className="font-bold text-gray-800">Sử Dụng Hữu Cơ Vi Sinh</p>
                        <p className="text-sm text-gray-600">Các chủng vi sinh vật đối kháng và chất hữu cơ humic giúp cố định kim loại nặng trong đất.</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Section 3: Quy Trình Thực Hiện */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
            <span className="font-bold text-xl">3</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Quy Trình Tưới Phục Hồi</h2>
        </div>

        <div className="space-y-6">
            {/* Step 1 */}
            <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-blue-600 text-white p-4 md:w-40 flex flex-col items-center justify-center text-center">
                    <span className="text-2xl font-bold mb-1">B1</span>
                    <span className="text-sm opacity-90">Xả Phèn & Giải Độc</span>
                </div>
                <div className="p-6 flex-grow">
                    <h4 className="font-bold text-lg text-gray-800 mb-2">Tưới Rửa Trôi Độc Tố</h4>
                    <p className="text-gray-600 mb-3">Sử dụng các sản phẩm có gốc Canxi hoặc vôi để tưới đẫm vùng đất quanh tán cây.</p>
                    <div className="text-sm text-blue-800 bg-blue-50 px-3 py-2 rounded inline-block font-medium">
                        Mục đích: Đẩy các ion H+ (gây chua) và kim loại nặng ra khỏi vùng rễ.
                    </div>
                </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-green-600 text-white p-4 md:w-40 flex flex-col items-center justify-center text-center">
                    <span className="text-2xl font-bold mb-1">B2</span>
                    <span className="text-sm opacity-90">Kích Rễ & Nâng pH</span>
                </div>
                <div className="p-6 flex-grow">
                    <h4 className="font-bold text-lg text-gray-800 mb-2">Tưới Hữu Cơ Phục Hồi</h4>
                    <p className="text-gray-600 mb-3">Pha hỗn hợp <strong>Humic Acid + Fulvic Acid + Vi sinh vật</strong> tưới đều quanh gốc.</p>
                    <ul className="list-disc pl-5 text-gray-700 text-sm space-y-1 mb-3">
                        <li>Nên tưới vào buổi sáng sớm hoặc chiều mát.</li>
                        <li>Giữ độ ẩm đất ổn định sau khi tưới.</li>
                    </ul>
                     <div className="text-sm text-green-800 bg-green-50 px-3 py-2 rounded inline-block font-medium">
                        Kết quả: Rễ cám bung mạnh sau 5-7 ngày, pH đất cải thiện rõ rệt.
                    </div>
                </div>
            </div>
        </div>
      </div>

      <div className="text-center pt-8 border-t border-gray-200">
          <button 
            onClick={onBack}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 px-8 rounded-full transition-colors shadow-sm"
          >
              Quay lại trang trước
          </button>
      </div>

    </div>
  );
};

export default RecoveryWateringView;
