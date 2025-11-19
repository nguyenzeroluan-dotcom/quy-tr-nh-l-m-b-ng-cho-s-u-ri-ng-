import React, { useState, useEffect, useRef } from 'react';
import FarmersmartLogo from '../components/Logo';
import { BackToTopButton } from '../components/UI';

interface MainLayoutProps {
    children: React.ReactNode;
    onNavigateHome: () => void;
    headerVariant?: 'light' | 'dark';
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, onNavigateHome, headerVariant = 'light' }) => {
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
                if (currentScrollY > lastScrollY.current) {
                    setShowHeader(false); // Scrolling down
                } else {
                    setShowHeader(true); // Scrolling up
                }
            }
            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isDarkHeader = headerVariant === 'dark';

    return (
        <div className="min-h-screen pb-20 bg-gradient-to-b from-green-50/50 to-white">
            <header
                className={`fixed top-0 w-full z-40 transition-all duration-300 ${
                    showHeader ? 'translate-y-0' : '-translate-y-full'
                } ${
                    isAtTop
                        ? `${isDarkHeader ? 'bg-green-800' : 'bg-white border-b border-gray-200'} shadow-sm py-4`
                        : `${isDarkHeader ? 'bg-green-800/90' : 'bg-white/90'} backdrop-blur-md border-b ${isDarkHeader ? 'border-green-700/50' : 'border-gray-200/50'} shadow-lg py-3`
                }`}
            >
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={onNavigateHome}>
                        <FarmersmartLogo className="h-8 w-auto" light={isDarkHeader} />
                    </div>
                </div>
            </header>

            <main className="pt-24">
                {children}
            </main>

            <BackToTopButton />
        </div>
    );
};

export default MainLayout;
