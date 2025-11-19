
import React, { useState } from 'react';
import { TimelineItemData } from './data';
import ListView from './views/ListView';
import DetailView from './views/DetailView';
import RecoveryWateringView from './views/RecoveryWateringView';
import FarmersmartLogo from './components/Logo';
import { BackToTopButton } from './components/UI';

const App = () => {
  const [view, setView] = useState<'list' | 'detail' | 'subpage'>('list');
  const [selectedItem, setSelectedItem] = useState<TimelineItemData | null>(null);
  const [currentSubPageId, setCurrentSubPageId] = useState<string | null>(null);

  const handleItemClick = (item: TimelineItemData) => {
      setSelectedItem(item);
      setView('detail');
  };

  const handleBackToHome = () => {
      setView('list');
      setSelectedItem(null);
      setCurrentSubPageId(null);
  };

  const handleNavigateToSubPage = (id: string) => {
      setCurrentSubPageId(id);
      setView('subpage');
  }

  const handleBackToDetail = () => {
      setView('detail');
      setCurrentSubPageId(null);
  }

  if (view === 'subpage' && currentSubPageId === 'recovery-watering') {
     return (
        <div className="min-h-screen pb-20 bg-gradient-to-b from-blue-50 to-white">
            <header className="bg-white border-b border-gray-200 py-4 sticky top-0 z-30 shadow-sm">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={handleBackToHome}>
                        <FarmersmartLogo className="h-8 w-auto" />
                    </div>
                </div>
             </header>
             <RecoveryWateringView onBack={handleBackToDetail} />
             <BackToTopButton />
        </div>
     )
  }

  if (view === 'detail' && selectedItem) {
      return (
        <div className="min-h-screen pb-20 bg-gradient-to-b from-green-50 to-white">
             {/* Minimal Header for Detail View */}
             <header className="bg-green-800 text-white py-4 sticky top-0 z-30 shadow-md">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={handleBackToHome}>
                        <FarmersmartLogo className="h-8 w-auto" light={true} />
                    </div>
                </div>
             </header>
             <DetailView 
                item={selectedItem} 
                onBack={handleBackToHome} 
                onNavigateToSubPage={handleNavigateToSubPage}
             />
             <BackToTopButton />
        </div>
      );
  }

  return <ListView onItemClick={handleItemClick} />;
};

export default App;
