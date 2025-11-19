
import React, { useState, useEffect } from 'react';
import { TimelineItemData, RichStep } from '../data';
import { PHGuideModal } from '../features/PHModal';
import { BaseModal } from '../components/Modal';
import FarmersmartLogo from '../components/Logo';
import { Breadcrumb, StageBadge } from '../components/UI';
import { SprayIcon, CheckCircleIcon, InfoIcon, LeafIcon, BookOpenIcon, ChevronRightIcon } from '../components/Icons';

const DetailView = ({ item, onBack, onNavigateToSubPage }: { item: TimelineItemData, onBack: () => void, onNavigateToSubPage: (id: string) => void }) => {
    const [selectedStep, setSelectedStep] = useState<RichStep | null>(null);
    const [showPHModal, setShowPHModal] = useState(false);

    // Check if this is the "Xử Lý Đất & Kích Rễ" item (ID 2)
    const isSoilPHItem = item.id === 2;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl animate-fade-in">
            <Breadcrumb 
                onNavigate={onBack}
                items={[
                    { label: item.stageLabel, action: onBack },
                    { label: item.title }
                ]} 
            />

            {/* Hero Section */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
                <div className="relative h-64 md:h-80 bg-gray-200">
                     {item.imageUrl ? (
                         <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                     ) : (
                         <div className="w-full h-full flex items-center justify-center bg-green-50">
                             <item.icon className="w-24 h-24 text-green-200" />
                         </div>
                     )}
                     <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                     <div className="absolute bottom-0 left-0 p-6 md:p-8 text-white">
                         <StageBadge stage={item.stage} label={item.stageLabel} />
                         <h1 className="text-3xl md:text-4xl font-bold mt-2">{item.title}</h1>
                     </div>
                </div>
                
                {/* Main Info Cards */}
                <div className="p-6 md:p-8 grid md:grid-cols-2 gap-6">
                     <div 
                        className={`bg-blue-50 p-5 rounded-xl border border-blue-100 relative group/card ${isSoilPHItem ? 'cursor-pointer hover:bg-blue-100 hover:shadow-md transition-all' : ''}`}
                        onClick={() => isSoilPHItem && setShowPHModal(true)}
                     >
                         {/* Interactive Indicator for Soil Item */}
                         {isSoilPHItem && (
                             <div className="absolute top-3 right-3 text-blue-400 group-hover/card:text-blue-600 transition-colors animate-pulse">
                                 <BookOpenIcon className="w-5 h-5" />
                             </div>
                         )}

                         <h3 className="flex items-center text-blue-800 font-bold mb-3">
                             <SprayIcon className="w-5 h-5 mr-2" />
                             Hoạt Động Chính
                         </h3>
                         <p className={`text-gray-700 leading-relaxed mb-4 ${isSoilPHItem ? 'group-hover/card:text-blue-900 font-medium' : ''}`}>
                            {item.action}
                         </p>
                         
                         {/* Button included for visibility, but whole card is clickable now */}
                         {isSoilPHItem && (
                           <div 
                             className="w-full flex items-center justify-center gap-2 bg-white border border-blue-200 text-blue-600 px-4 py-2 rounded-lg font-bold text-sm transition-colors shadow-sm group-hover/card:bg-blue-600 group-hover/card:text-white group-hover/card:border-blue-600"
                           >
                             <InfoIcon className="w-4 h-4" /> Tìm hiểu chi tiết về Đất & pH
                           </div>
                         )}
                     </div>
                     <div className="bg-yellow-50 p-5 rounded-xl border border-yellow-100">
                         <h3 className="flex items-center text-yellow-800 font-bold mb-3">
                             <CheckCircleIcon className="w-5 h-5 mr-2" />
                             Mục Tiêu
                         </h3>
                         <p className="text-gray-700 leading-relaxed">{item.purpose}</p>
                     </div>
                </div>
            </div>

            {/* PH Guide Modal */}
            <PHGuideModal isOpen={showPHModal} onClose={() => setShowPHModal(false)} />

            {/* Rich Detail Content (5 Steps for Item 1) */}
            {item.richDetail ? (
                <div className="mb-10">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Quy Trình Chi Tiết</h2>
                    <p className="text-gray-600 mb-6 leading-relaxed border-l-4 border-green-500 pl-4 italic">
                        {item.richDetail.intro}
                    </p>
                    
                    <div className="space-y-4 relative">
                        {item.richDetail.steps.map((step, idx) => (
                            <div 
                              key={idx} 
                              onClick={() => setSelectedStep(step)}
                              className="group relative bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-lg hover:border-green-300 transition-all duration-300 flex gap-4 cursor-pointer"
                            >
                                <div className="flex-shrink-0 mt-1">
                                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors">
                                        {step.icon ? <step.icon className="w-6 h-6"/> : <span className="font-bold">{idx + 1}</span>}
                                    </div>
                                </div>
                                <div className="flex-grow">
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-green-700 transition-colors">{step.title}</h3>
                                        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full group-hover:bg-green-100 group-hover:text-green-700 transition-colors">Xem chi tiết</span>
                                    </div>
                                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">{step.content}</p>
                                </div>

                                {/* HOVER CARD - Desktop Only */}
                                <div className="hidden md:block absolute left-[102%] top-1/2 -translate-y-1/2 w-72 bg-white rounded-xl shadow-2xl border border-green-200 p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 pointer-events-none">
                                    {/* Arrow pointing left */}
                                    <div className="absolute top-1/2 -left-2 -translate-y-1/2 border-t-8 border-b-8 border-r-8 border-transparent border-r-white drop-shadow-sm"></div>
                                    
                                    {/* Image Area */}
                                    <div className="w-full h-40 bg-gray-100 rounded-lg mb-3 overflow-hidden relative">
                                        {step.imageUrl ? (
                                            <img src={step.imageUrl} alt={step.title} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-green-50">
                                                 {step.icon ? <step.icon className="w-16 h-16 text-green-200" /> : <LeafIcon className="w-16 h-16 text-green-200" />}
                                            </div>
                                        )}
                                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                                            <span className="text-white text-xs font-bold bg-green-600 px-2 py-0.5 rounded">
                                                Bước {idx + 1}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <h4 className="font-bold text-gray-800 text-sm mb-1">{step.title}</h4>
                                    <p className="text-xs text-gray-500 line-clamp-4 leading-relaxed">
                                        {step.content}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="bg-gray-50 rounded-xl p-8 text-center mb-10 border border-dashed border-gray-300">
                    <p className="text-gray-500">Thông tin chi tiết cho giai đoạn này đang được cập nhật.</p>
                </div>
            )}

            {/* Step Modal */}
            <BaseModal
              isOpen={!!selectedStep}
              onClose={() => setSelectedStep(null)}
              title={selectedStep?.title || "Chi Tiết"}
              initialWidth={600}
              initialHeight={500}
              footer={
                  selectedStep?.subPageId ? (
                      <div className="w-full flex justify-end">
                        <button 
                            onClick={() => {
                                if (selectedStep.subPageId) {
                                    onNavigateToSubPage(selectedStep.subPageId);
                                    setSelectedStep(null);
                                }
                            }}
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors shadow-md"
                        >
                            Xem Chi Tiết Quy Trình <ChevronRightIcon className="w-4 h-4" />
                        </button>
                      </div>
                  ) : undefined
              }
            >
               {selectedStep && (
                 <div className="space-y-4">
                    {selectedStep.imageUrl && (
                      <div className="rounded-xl overflow-hidden shadow-md">
                        <img src={selectedStep.imageUrl} alt={selectedStep.title} className="w-full h-64 object-cover" />
                      </div>
                    )}
                    <div className="prose prose-green max-w-none">
                        <h4 className="text-xl font-bold text-green-800 mb-2">Mô tả chi tiết</h4>
                        <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
                            {selectedStep.content}
                        </p>
                    </div>
                    {/* Render additional hoverDetail if different from content */}
                    {selectedStep.hoverDetail && selectedStep.hoverDetail !== selectedStep.content && (
                         <div className="bg-green-50 p-4 rounded-lg border border-green-100 text-sm text-gray-600 italic">
                             {selectedStep.hoverDetail}
                         </div>
                    )}
                 </div>
               )}
            </BaseModal>

            {/* Products Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-green-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <LeafIcon className="w-6 h-6 mr-2 text-green-600" />
                    Sản Phẩm Farmersmart Khuyên Dùng
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {item.products.map((prod, idx) => (
                        <div key={idx} className="bg-green-50 rounded-lg p-4 border border-green-200 flex items-center space-x-3 hover:bg-green-100 transition-colors">
                             <FarmersmartLogo variant="icon" className="w-10 h-10 flex-shrink-0" />
                             <span className="font-semibold text-green-900">{prod}</span>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="mt-8 text-center">
                <button onClick={onBack} className="text-green-600 font-bold hover:underline">
                    &larr; Quay lại quy trình
                </button>
            </div>
        </div>
    );
};

export default DetailView;
