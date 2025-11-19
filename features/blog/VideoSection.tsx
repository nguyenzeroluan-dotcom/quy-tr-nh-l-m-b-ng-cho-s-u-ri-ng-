import React from 'react';
import { VideoItem } from '../../blog-data';
import { VideoCard } from './VideoCard';
import { ChevronRightIcon } from '../../components/Icons';

interface VideoSectionProps {
  videos: VideoItem[];
  onVideoClick: (video: VideoItem) => void;
}

export const VideoSection: React.FC<VideoSectionProps> = ({ videos, onVideoClick }) => (
  <div className="mb-20">
    <div className="flex items-center justify-between mb-10 border-l-8 border-red-600 pl-6">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Thư Viện Video Kỹ Thuật</h2>
      <a href="https://www.youtube.com/@Farmersmartvn2202" target="_blank" rel="noreferrer" className="text-red-600 font-bold hover:underline text-lg flex items-center">
        Xem thêm trên Youtube <ChevronRightIcon className="w-5 h-5" />
      </a>
    </div>
    <div className="grid md:grid-cols-3 gap-8">
      {videos.map(video => (
        <VideoCard key={video.id} video={video} onClick={onVideoClick} />
      ))}
    </div>
  </div>
);
