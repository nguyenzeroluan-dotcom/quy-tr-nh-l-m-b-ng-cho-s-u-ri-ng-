import React from 'react';
import { TimelineItemData } from '../../types';
import { StageBadge } from '../../components/UI';

interface HeroSectionProps {
  item: TimelineItemData;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ item }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
      <div className="relative h-64 md:h-96 bg-gray-200 group">
        {item.imageUrl ? (
          <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-green-50">
            <item.icon className="w-24 h-24 text-green-200" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-8 md:p-10 text-white">
          <StageBadge stage={item.stage} label={item.stageLabel} />
          <h1 className="text-3xl md:text-5xl font-bold mt-3 mb-2 leading-tight">{item.title}</h1>
          <div className="flex items-center gap-4 text-green-100 text-lg font-medium">
            <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded">Lịch trình: {item.day}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
