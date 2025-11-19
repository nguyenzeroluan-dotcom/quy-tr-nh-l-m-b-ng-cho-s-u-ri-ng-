import React from 'react';
import { BlogPost } from '../../blog-data';
import { BaseModal } from '../../components/Modal';
import { InfoIcon } from '../../components/Icons';

interface PostDetailModalProps {
  post: BlogPost | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PostDetailModal: React.FC<PostDetailModalProps> = ({ post, isOpen, onClose }) => {
  if (!post) return null;

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={post.category}
      initialWidth={1000}
      initialHeight={800}
    >
      <article className="px-4 py-2 max-w-5xl mx-auto">
        <div className="rounded-2xl overflow-hidden mb-8 shadow-lg">
          <img src={post.imageUrl} alt={post.title} className="w-full h-[400px] object-cover" />
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
          {post.title}
        </h1>
        <div className="flex flex-wrap items-center gap-6 text-base text-gray-500 mb-8 border-b border-gray-200 pb-6">
          <span className="flex items-center font-medium text-gray-700"><InfoIcon className="w-5 h-5 mr-2" /> {post.author}</span>
          <span>•</span>
          <span>{post.date}</span>
        </div>
        <div className="prose prose-green prose-xl max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
          {post.content}
        </div>
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-base text-gray-500 italic bg-gray-50 p-4 rounded-lg border border-gray-100">
            * Bài viết mang tính chất tham khảo kỹ thuật. Tùy thuộc vào điều kiện thực tế của vườn, bà con nên điều chỉnh cho phù hợp.
          </p>
        </div>
      </article>
    </BaseModal>
  );
};
