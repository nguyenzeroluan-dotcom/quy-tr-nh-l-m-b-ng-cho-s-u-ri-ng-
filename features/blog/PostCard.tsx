import React from 'react';
import { BlogPost } from '../../blog-data';
import { ChevronRightIcon } from '../../components/Icons';

interface PostCardProps {
  post: BlogPost;
  onClick: (post: BlogPost) => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, onClick }) => (
  <div
    className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col cursor-pointer group h-full transform hover:-translate-y-2"
    onClick={() => onClick(post)}
  >
    <div className="h-56 overflow-hidden relative">
      <img
        src={post.imageUrl}
        alt={post.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md text-green-800 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
        {post.category}
      </div>
    </div>
    <div className="p-6 flex-grow flex flex-col">
      <div className="text-xs text-gray-500 mb-3 flex justify-between font-medium uppercase tracking-wide">
        <span>{post.date}</span>
        <span>{post.author}</span>
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-green-700 transition-colors leading-snug">
        {post.title}
      </h3>
      <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow leading-relaxed">
        {post.excerpt}
      </p>
      <div className="mt-auto pt-4 border-t border-gray-100 flex items-center text-green-600 font-bold text-sm group-hover:translate-x-2 transition-transform">
        Đọc tiếp <ChevronRightIcon className="w-4 h-4 ml-1" />
      </div>
    </div>
  </div>
);
