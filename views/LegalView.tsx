import React, { useEffect } from 'react';
import { Breadcrumb } from '../components/UI';
import { LegalPageContent } from '../legal-data';

const LegalView = ({ onBack, content }: { onBack: () => void, content: LegalPageContent }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [content]);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
       <div className="container mx-auto px-4 max-w-5xl animate-fade-in">
           <div className="mb-8">
                <Breadcrumb 
                    onNavigate={onBack}
                    items={[
                        { label: "Trang Chủ", action: onBack },
                        { label: content.title }
                    ]} 
                />
           </div>

            {/* Header Section */}
            <header className="mb-12 border-b border-gray-200 pb-8">
                <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">{content.title}</h1>
                <p className="text-gray-500 text-lg">Cập nhật lần cuối: {content.lastUpdated}</p>
            </header>

            {/* Main Content */}
            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-lg border border-gray-100">
                <div className="prose prose-lg max-w-none prose-h2:text-2xl prose-h2:font-bold prose-h2:text-green-800 prose-p:leading-relaxed prose-p:text-gray-700 prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-2 prose-li:text-gray-700">
                    {content.sections.map((section, index) => (
                        <div key={index} className="mb-8">
                            <h2>{section.title}</h2>
                            <p className="whitespace-pre-line">{section.content}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-12 text-center">
                <button 
                    onClick={onBack}
                    className="bg-white hover:bg-gray-100 border-2 border-gray-200 text-gray-700 font-bold py-3 px-8 rounded-full transition-all shadow-sm hover:shadow-md text-base"
                >
                    &larr; Quay lại Trang Chủ
                </button>
            </div>
       </div>
    </div>
  );
};

export default LegalView;
