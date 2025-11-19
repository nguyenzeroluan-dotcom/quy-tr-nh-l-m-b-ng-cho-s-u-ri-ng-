import React from 'react';
import { VideoItem } from '../../blog-data';

interface VideoCardProps {
  video: VideoItem;
  onClick: (video: VideoItem) => void;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video, onClick }) => (
  <div
    className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-gray-100 transform hover:-translate-y-1"
    onClick={() => onClick(video)}
  >
    <div className="relative aspect-video bg-black overflow-hidden">
      <img
        src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
        alt={video.title}
        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 bg-red-600/90 text-white rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 ml-1">
            <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
    <div className="p-6">
      <h3 className="font-bold text-gray-800 line-clamp-2 group-hover:text-red-600 transition-colors text-lg leading-snug">
        {video.title}
      </h3>
    </div>
  </div>
);
