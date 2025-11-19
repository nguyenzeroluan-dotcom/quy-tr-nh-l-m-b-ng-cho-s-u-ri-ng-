import React from 'react';
import { VideoItem } from '../../blog-data';
import { BaseModal } from '../../components/Modal';
import { ChevronRightIcon } from '../../components/Icons';

interface VideoPlayerModalProps {
  video: VideoItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({ video, isOpen, onClose }) => {
  const getEmbedUrl = (videoId: string | undefined) => {
    if (!videoId) return '';
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&origin=${origin}`;
  };

  if (!video) return null;

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={video.title}
      initialWidth={1000}
      initialHeight={650}
    >
      <div className="w-full h-full flex flex-col">
        <div className="relative w-full pt-[56.25%] bg-black rounded-xl overflow-hidden shadow-2xl">
          <iframe
            src={getEmbedUrl(video.youtubeId)}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          ></iframe>
        </div>
        <div className="mt-6 flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">{video.title}</h3>
            <p className="text-gray-500">Nguồn: Youtube Farmersmart</p>
          </div>
          <a
            href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 bg-red-600 hover:bg-red-700 text-white text-sm font-bold px-6 py-3 rounded-lg flex items-center gap-2 transition-all shadow-md hover:shadow-lg self-start"
          >
            Xem trên Youtube <ChevronRightIcon className="w-4 h-4" />
          </a>
        </div>
      </div>
    </BaseModal>
  );
};
