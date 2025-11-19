import React, { useEffect, useState } from 'react';
import { Breadcrumb } from '../components/UI';
import ImageViewer from '../components/ImageViewer';

import { RecoveryWateringHero } from '../features/recovery-watering/Hero';
import { PHSection } from '../features/recovery-watering/PHSection';
import { CadmiumSection } from '../features/recovery-watering/CadmiumSection';
import { ProcessSteps } from '../features/recovery-watering/ProcessSteps';

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

      <RecoveryWateringHero />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 mb-16">
          <PHSection onImageClick={setViewImage} />
          <CadmiumSection />
      </div>

      <ProcessSteps />

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