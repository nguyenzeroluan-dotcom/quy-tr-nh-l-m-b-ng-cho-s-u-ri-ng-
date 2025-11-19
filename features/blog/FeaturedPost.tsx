import React from 'react';
import { BlogPost } from '../../blog-data';
import { ChevronRightIcon } from '../../components/Icons';

interface FeaturedPostProps {
  post: BlogPost;
  onClick: (post: BlogPost) => void;
}

export const FeaturedPost: React.FC<FeaturedPostProps> = ({ post, onClick }) => (
  <div
    className="relative rounded-3xl overflow-hidden shadow-2xl mb-16 group cursor-pointer h-[500px] md:h-[600px]"
    onClick={() => onClick(post)}
  >
    <img
      src={post.imageUrl}
      alt={post.title}
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
    <div className="absolute bottom-0 left-0 p-10 md:p-16 text-white max-w-5xl">
      <div className="flex items-center gap-3 mb-4">
        <span className="bg-green-600 text-sm font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
          {post.category}
        </span>
        <span className="text-gray-300 text-sm font-medium">{post.date}</span>
      </div>
      <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight group-hover:text-green-400 transition-colors">
        {post.title}
      </h2>
      <p className="text-gray-200 line-clamp-2 text-xl md:text-2xl mb-8 font-light max-w-3xl">
        {post.excerpt}
      </p>
      <div className="flex items-center text-green-400 font-bold text-lg group-hover:translate-x-2 transition-transform">
        Đọc chi tiết bài viết <ChevronRightIcon className="w-6 h-6 ml-2" />
      </div>
    </div>
  </div>
);
