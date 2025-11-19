import React, { useState } from 'react';
import { TimelineItemData } from './types';
import { LegalPageContent, PRIVACY_POLICY_CONTENT, TERMS_OF_USE_CONTENT } from './legal-data';

import MainLayout from './layouts/MainLayout';
import ListView from './views/ListView';
import DetailView from './views/DetailView';
import RecoveryWateringView from './views/RecoveryWateringView';
import BlogView from './views/BlogView';
import ProductsView from './views/ProductsView';
import LegalView from './views/LegalView';

type ViewState = 'list' | 'detail' | 'subpage' | 'blog' | 'products' | 'legal';

const App = () => {
    const [view, setView] = useState<ViewState>('list');
    const [selectedItem, setSelectedItem] = useState<TimelineItemData | null>(null);
    const [currentSubPageId, setCurrentSubPageId] = useState<string | null>(null);
    const [selectedProductId, setSelectedProductId] = useState<string | undefined>(undefined);
    const [legalPageContent, setLegalPageContent] = useState<LegalPageContent | null>(null);

    const resetToHome = () => {
        setView('list');
        setSelectedItem(null);
        setCurrentSubPageId(null);
        setSelectedProductId(undefined);
        setLegalPageContent(null);
        window.scrollTo(0, 0);
    };
    
    const handleItemClick = (item: TimelineItemData) => {
        setSelectedItem(item);
        setView('detail');
        window.scrollTo(0, 0);
    };

    const handleNavigateToSubPage = (id: string) => {
        setCurrentSubPageId(id);
        setView('subpage');
        window.scrollTo(0, 0);
    };

    const handleBackToDetail = () => {
        setView('detail');
        setCurrentSubPageId(null);
        window.scrollTo(0, 0);
    };

    const handleNavigateToBlog = () => {
        setView('blog');
        window.scrollTo(0, 0);
    };

    const handleNavigateToProducts = (productId?: string) => {
        setSelectedProductId(productId);
        setView('products');
        window.scrollTo(0, 0);
    };

    const handleNavigateToLegal = (page: 'privacy' | 'terms') => {
        setLegalPageContent(page === 'privacy' ? PRIVACY_POLICY_CONTENT : TERMS_OF_USE_CONTENT);
        setView('legal');
        window.scrollTo(0, 0);
    };
    
    // ListView is special, it has its own header and footer layout
    if (view === 'list') {
        return (
            <ListView
                onItemClick={handleItemClick}
                onNavigateToBlog={handleNavigateToBlog}
                onNavigateToProducts={handleNavigateToProducts}
                onNavigateToLegal={handleNavigateToLegal}
            />
        );
    }

    // All other views use the MainLayout
    let pageContent: React.ReactNode = null;
    let headerVariant: 'light' | 'dark' = 'light';

    switch (view) {
        case 'detail':
            if (selectedItem) {
                pageContent = (
                    <DetailView
                        item={selectedItem}
                        onBack={resetToHome}
                        onNavigateToSubPage={handleNavigateToSubPage}
                    />
                );
                headerVariant = 'dark'; // Detail view has a dark header
            }
            break;
        case 'subpage':
            if (currentSubPageId === 'recovery-watering') {
                pageContent = <RecoveryWateringView onBack={handleBackToDetail} />;
            }
            break;
        case 'blog':
            pageContent = <BlogView onBack={resetToHome} />;
            break;
        case 'products':
            pageContent = <ProductsView onBack={resetToHome} preselectedProductId={selectedProductId} />;
            break;
        case 'legal':
            if (legalPageContent) {
                pageContent = <LegalView onBack={resetToHome} content={legalPageContent} />;
            }
            break;
    }
    
    // If something went wrong (e.g., no selectedItem), default to home
    if (!pageContent) {
        return (
             <ListView
                onItemClick={handleItemClick}
                onNavigateToBlog={handleNavigateToBlog}
                onNavigateToProducts={handleNavigateToProducts}
                onNavigateToLegal={handleNavigateToLegal}
            />
        );
    }
    
    return (
        <MainLayout onNavigateHome={resetToHome} headerVariant={headerVariant}>
            {pageContent}
        </MainLayout>
    );
};

export default App;
