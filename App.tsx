import React, { useState, useEffect, useRef } from 'react';
import { TimelineItemData } from './types';
import { LegalPageContent, PRIVACY_POLICY_CONTENT, TERMS_OF_USE_CONTENT } from './legal-data';
import ListView from './views/ListView';
import DetailView from './views/DetailView';
import RecoveryWateringView from './views/RecoveryWateringView';
import BlogView from './views/BlogView';
import ProductsView from './views/ProductsView';
import LegalView from './views/LegalView';
import FarmersmartLogo from './components/Logo';
import { BackToTopButton } from './components/UI';

type ViewState = 'list' | 'detail' | 'subpage' | 'blog' | 'products' | 'legal';

const App = () => {
  const [view, setView] = useState<ViewState>('list');
  const [selectedItem, setSelectedItem] = useState<TimelineItemData | null>(null);
  const [currentSubPageId, setCurrentSubPageId] = useState<string | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<string | undefined>(undefined);
  const [legalPageContent, setLegalPageContent] = useState<LegalPageContent | null>(null);

  // Smart Header State
  const [showHeader, setShowHeader] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 20) {
        setIsAtTop(true);
        setShowHeader(true);
      } else {
        setIsAtTop(false);
        // Show if scrolling up, hide if scrolling down
        if (currentScrollY > lastScrollY.current) {
          setShowHeader(false);
        } else {
          setShowHeader(true);
        }
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleItemClick = (item: TimelineItemData) => {
      setSelectedItem(item);
      setView('detail');
      window.scrollTo(0, 0);
  };

  const handleBackToHome = () => {
      setView('list');
      setSelectedItem(null);
      setCurrentSubPageId(null);
      setSelectedProductId(undefined);
      setLegalPageContent(null);
      window.scrollTo(0, 0);
  };

  const handleNavigateToSubPage = (id: string) => {
      setCurrentSubPageId(id);
      setView('subpage');
      window.scrollTo(0, 0);
  }

  const handleBackToDetail = () => {
      setView('detail');
      setCurrentSubPageId(null);
      window.scrollTo(0, 0);
  }

  const handleNavigateToBlog = () => {
      setView('blog');
      window.scrollTo(0, 0);
  }

  const handleNavigateToProducts = (productId?: string) => {
      if (productId) {
        setSelectedProductId(productId);
      }
      setView('products');
      window.scrollTo(0, 0);
  }

  const handleNavigateToLegal = (page: 'privacy' | 'terms') => {
      if (page === 'privacy') {
        setLegalPageContent(PRIVACY_POLICY_CONTENT);
      } else {
        setLegalPageContent(TERMS_OF_USE_CONTENT);
      }
      setView('legal');
      window.scrollTo(0, 0);
  }

  const renderHeader = (lightLogo = false) => (
    <header 
        className={`fixed top-0 w-full z-30 transition-all duration-300 ${
            showHeader ? 'translate-y-0' : '-translate-y-full'
        } ${
            isAtTop 
            ? 'bg-white border-b border-gray-200 shadow-sm py-4' 
            : 'bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-md py-3'
        }`}
    >
        <div className="container mx-auto px-4 flex justify-between items-center">
            <div className="flex items-center gap-2 cursor-pointer" onClick={handleBackToHome}>
                <FarmersmartLogo className="h-8 w-auto" light={lightLogo} />
            </div>
        </div>
    </header>
  );

  if (view === 'legal' && legalPageContent) {
    return (
        <div className="min-h-screen">
            {renderHeader()}
            <LegalView onBack={handleBackToHome} content={legalPageContent} />
            <BackToTopButton />
        </div>
    );
  }

  if (view === 'products') {
     return (
        <div className="min-h-screen">
             {renderHeader()}
             <ProductsView onBack={handleBackToHome} preselectedProductId={selectedProductId} />
             <BackToTopButton />
        </div>
     )
  }

  if (view === 'blog') {
      return (
        <div className="min-h-screen">
             {renderHeader()}
             <BlogView onBack={handleBackToHome} />
             <BackToTopButton />
        </div>
      )
  }

  if (view === 'subpage' && currentSubPageId === 'recovery-watering') {
     return (
        <div className="min-h-screen pb-20 bg-gradient-to-b from-blue-50 to-white">
             {renderHeader()}
             {/* Add padding top to compensate for fixed header */}
             <div className="pt-20">
                <RecoveryWateringView onBack={handleBackToDetail} />
             </div>
             <BackToTopButton />
        </div>
     )
  }

  if (view === 'detail' && selectedItem) {
      return (
        <div className="min-h-screen pb-20 bg-gradient-to-b from-green-50 to-white">
             {/* Smart Header for Detail View */}
             <header 
                className={`fixed top-0 w-full z-30 transition-all duration-300 ${
                    showHeader ? 'translate-y-0' : '-translate-y-full'
                } ${
                    isAtTop 
                    ? 'bg-green-800 shadow-md py-4' 
                    : 'bg-green-800/85 backdrop-blur-md shadow-lg py-3'
                }`}
             >
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={handleBackToHome}>
                        <FarmersmartLogo className="h-8 w-auto" light={true} />
                    </div>
                </div>
             </header>

             {/* Add padding top to compensate for fixed header */}
             <div className="pt-20">
                <DetailView 
                    item={selectedItem} 
                    onBack={handleBackToHome} 
                    onNavigateToSubPage={handleNavigateToSubPage}
                />
             </div>
             <BackToTopButton />
        </div>
      );
  }

  return <ListView 
            onItemClick={handleItemClick} 
            onNavigateToBlog={handleNavigateToBlog}
            onNavigateToProducts={() => handleNavigateToProducts()}
            onNavigateToLegal={handleNavigateToLegal}
         />;
};

export default App;
