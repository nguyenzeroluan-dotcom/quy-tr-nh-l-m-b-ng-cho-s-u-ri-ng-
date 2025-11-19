import React, { useEffect, useState } from 'react';
import { Breadcrumb } from '../components/UI';
import { DropletIcon, InfoIcon, LeafIcon, XIcon } from '../components/Icons';
import ImageViewer from '../components/ImageViewer';

const RecoveryWateringView = ({ onBack }: { onBack: () => void }) => {
  const [viewImage, setViewImage] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container mx-auto px-4 pb-8 max-w-[1600px] animate-fade-in">
       <Breadcrumb 
            onNavigate={onBack}
            items={[
                { label: "Xử Lý Đất & Kích Rễ", action: onBack },
                { label: "Quy Trình Tưới Phục Hồi" }
            ]} 
        />

      {/* Header Hero */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-10 md:p-16 text-white shadow-xl mb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10 transform translate-x-1/4 -translate-y-1/4">
           <DropletIcon className="w-96 h-96" />
        </div>
        <div className="relative z-10 max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Quy Trình Tưới Phục Hồi & Kiểm Soát Cadimi
            </h1>
            <p className="text-blue-100 text-xl md:text-2xl font-light">
            Hướng dẫn chuyên sâu về kỹ thuật phục hồi hệ rễ, cân bằng pH đất và giải độc kim loại nặng (Cadimi) để cây sầu riêng phát triển bền vững.
            </p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 mb-16">
          
          {/* Section 1: pH Đất */}
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
                        onClick={() => setViewImage("https://agriplusvn.com/wp-content/uploads/2023/11/muc-do-phat-trien-cua-re-theo-pH.png")}
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
                        onClick={() => setViewImage("https://nongnghiepthuanthien.vn/wp-content/uploads/2022/05/pH-dat-anh-huong-den-su-san-co-cua-cac-chat-dinh-duong-trong-dat.jpg")}
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

          {/* Section 2: Cadimi */}
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
      </div>

      {/* Section 3: Process Steps - Full Width */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-10 md:p-12 mb-12">
            <div className="flex items-center gap-4 mb-10 justify-center">
                <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg ring-4 ring-blue-100">
                    <span className="font-bold text-2xl">3</span>
                </div>
                <h2 className="text-4xl font-bold text-gray-800">Quy Trình Tưới Phục Hồi Chuẩn</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Step 1 */}
                <div className="relative group">
                    <div className="absolute inset-0 bg-blue-600 rounded-2xl transform rotate-1 opacity-10 group-hover:rotate-2 transition-transform"></div>
                    <div className="relative bg-white rounded-2xl shadow-md border border-gray-200 p-8 h-full hover:-translate-y-1 transition-transform">
                        <div className="flex items-center gap-4 mb-4">
                             <div className="bg-blue-100 text-blue-700 font-bold px-4 py-2 rounded-lg">Bước 1</div>
                             <h4 className="font-bold text-2xl text-gray-800">Xả Phèn & Giải Độc</h4>
                        </div>
                        <p className="text-gray-600 text-lg mb-4">Sử dụng các sản phẩm có gốc Canxi hoặc vôi tinh để tưới đẫm vùng đất quanh tán cây.</p>
                        <div className="flex items-center text-blue-800 bg-blue-50 px-4 py-3 rounded-xl font-medium">
                            <InfoIcon className="w-5 h-5 mr-2" /> Mục đích: Đẩy ion H+ và kim loại nặng ra khỏi vùng rễ.
                        </div>
                    </div>
                </div>

                 {/* Step 2 */}
                <div className="relative group">
                    <div className="absolute inset-0 bg-green-600 rounded-2xl transform -rotate-1 opacity-10 group-hover:-rotate-2 transition-transform"></div>
                    <div className="relative bg-white rounded-2xl shadow-md border border-gray-200 p-8 h-full hover:-translate-y-1 transition-transform">
                        <div className="flex items-center gap-4 mb-4">
                             <div className="bg-green-100 text-green-700 font-bold px-4 py-2 rounded-lg">Bước 2</div>
                             <h4 className="font-bold text-2xl text-gray-800">Kích Rễ & Nâng pH</h4>
                        </div>
                        <p className="text-gray-600 text-lg mb-4">Pha hỗn hợp <strong>Humic Acid + Fulvic Acid + Vi sinh vật</strong> tưới đều quanh gốc.</p>
                        <div className="flex items-center text-green-800 bg-green-50 px-4 py-3 rounded-xl font-medium">
                            <LeafIcon className="w-5 h-5 mr-2" /> Kết quả: Rễ cám bung mạnh sau 5-7 ngày.
                        </div>
                    </div>
                </div>
            </div>
      </div>

      <div className="text-center">
          <button 
            onClick={onBack}
            className="bg-white hover:bg-gray-50 border-2 border-gray-200 text-gray-700 font-bold py-4 px-12 rounded-full transition-all shadow-sm hover:shadow-md text-lg"
          >
              Quay lại trang trước
          </button>
      </div>

      <ImageViewer 
          isOpen={!!viewImage}
          imageUrl={viewImage}
          onClose={() => setViewImage(null)}
      />
    </div>
  );
};

export default RecoveryWateringView;
