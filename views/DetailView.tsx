import React, { useState, useEffect } from 'react';
import { TimelineItemData, RichStep, ProductInfo } from '../types';
import { PHGuideModal } from '../features/PHModal';
import { BaseModal } from '../components/Modal';
import { ProductModal } from '../components/ProductModal';
import { Breadcrumb } from '../components/UI';
import { ChevronRightIcon } from '../components/Icons';
import ImageViewer from '../components/ImageViewer';

// Import new components
import { HeroSection } from '../features/detail-view/HeroSection';
import { MainInfo } from '../features/detail-view/MainInfo';
import { DetailedSteps } from '../features/detail-view/DetailedSteps';
import { CostTable } from '../features/detail-view/CostTable';
import { DetailSidebar } from '../features/detail-view/DetailSidebar';
import { ProductTooltip } from '../features/detail-view/ProductTooltip';


const DetailView = ({ item, onBack, onNavigateToSubPage }: { item: TimelineItemData, onBack: () => void, onNavigateToSubPage: (id: string) => void }) => {
    const [selectedStep, setSelectedStep] = useState<RichStep | null>(null);
    const [showPHModal, setShowPHModal] = useState(false);
    const [fullScreenImage, setFullScreenImage] = useState<string | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<ProductInfo | null>(null);
    const [showProductModal, setShowProductModal] = useState(false);
    const [hoveredProduct, setHoveredProduct] = useState<{ product: ProductInfo, y: number, x: number } | null>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleProductClick = (product: ProductInfo) => {
        setSelectedProduct(product);
        setShowProductModal(true);
    };

    const handleMouseEnterProduct = (e: React.MouseEvent, product: ProductInfo) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setHoveredProduct({
            product,
            x: rect.left,
            y: rect.top + (rect.height / 2)
        });
    };

    const handleMouseLeaveProduct = () => {
        setHoveredProduct(null);
    };

    return (
        <div className="container mx-auto px-4 pb-8 max-w-[1800px] animate-fade-in relative">
            <div className="mb-6">
                <Breadcrumb
                    onNavigate={onBack}
                    items={[
                        { label: item.stageLabel, action: onBack },
                        { label: item.title }
                    ]}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* --- MAIN CONTENT COLUMN (8/12) --- */}
                <div className="lg:col-span-8 space-y-8">
                    <HeroSection item={item} />
                    <MainInfo item={item} onPHGuideClick={() => setShowPHModal(true)} />

                    {item.richDetail && (
                        <DetailedSteps
                            intro={item.richDetail.intro}
                            steps={item.richDetail.steps}
                            onStepClick={setSelectedStep}
                        />
                    )}

                    {item.productDetails && item.productDetails.length > 0 && (
                        <CostTable
                            productDetails={item.productDetails}
                            totalCost={item.totalCost}
                            onProductClick={handleProductClick}
                            onProductHover={handleMouseEnterProduct}
                            onProductLeave={handleMouseLeaveProduct}
                        />
                    )}
                </div>

                {/* --- SIDEBAR COLUMN (4/12) --- */}
                <div className="lg:col-span-4">
                    <DetailSidebar
                        item={item}
                        onProductClick={handleProductClick}
                        onProductHover={handleMouseEnterProduct}
                        onProductLeave={handleMouseLeaveProduct}
                        onBack={onBack}
                    />
                </div>
            </div>

            {/* --- MODALS & TOOLTIPS --- */}
            <ProductTooltip hoveredProduct={hoveredProduct} />
            <PHGuideModal isOpen={showPHModal} onClose={() => setShowPHModal(false)} />
            <ProductModal
                isOpen={showProductModal}
                onClose={() => setShowProductModal(false)}
                product={selectedProduct}
            />
            <ImageViewer
                isOpen={!!fullScreenImage}
                imageUrl={fullScreenImage}
                onClose={() => setFullScreenImage(null)}
            />

            {/* Step Detail Modal */}
            <BaseModal
                isOpen={!!selectedStep}
                onClose={() => setSelectedStep(null)}
                title={selectedStep?.title || "Chi Tiết"}
                initialWidth={800}
                initialHeight={700}
                footer={
                    selectedStep?.subPageId ? (
                        <div className="w-full flex justify-end">
                            <button
                                onClick={() => {
                                    if (selectedStep?.subPageId) {
                                        onNavigateToSubPage(selectedStep.subPageId);
                                        setSelectedStep(null);
                                    }
                                }}
                                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition-colors shadow-lg hover:scale-105 transform"
                            >
                                Xem Chi Tiết Quy Trình <ChevronRightIcon className="w-5 h-5" />
                            </button>
                        </div>
                    ) : undefined
                }
            >
                {selectedStep && (
                    <div className="grid md:grid-cols-2 gap-8 h-full">
                        {selectedStep.imageUrl && (
                            <div
                                className="rounded-xl overflow-hidden shadow-lg border border-gray-100 cursor-zoom-in group relative h-fit"
                                onClick={() => setFullScreenImage(selectedStep.imageUrl || null)}
                            >
                                <img src={selectedStep.imageUrl} alt={selectedStep.title} className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105" />
                                <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity font-medium backdrop-blur-sm">
                                    Phóng to
                                </div>
                            </div>
                        )}
                        <div className={`${!selectedStep.imageUrl ? 'md:col-span-2' : ''} overflow-y-auto pr-2 custom-scrollbar`}>
                            <div className="prose prose-green prose-lg max-w-none">
                                <h4 className="text-2xl font-bold text-green-800 mb-4 border-b pb-2">Mô tả chi tiết</h4>
                                <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
                                    {selectedStep.content}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </BaseModal>
        </div>
    );
};

export default DetailView;
