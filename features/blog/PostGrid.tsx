import React from 'react';
import { BlogPost } from '../../blog-data';
import { PostCard } from './PostCard';

interface PostGridProps {
  posts: BlogPost[];
  onPostClick: (post: BlogPost) => void;
}

export const PostGrid: React.FC<PostGridProps> = ({ posts, onPostClick }) => (
  <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-20">
    {posts.map((post) => (
      <PostCard key={post.id} post={post} onClick={onPostClick} />
    ))}
  </div>
);
