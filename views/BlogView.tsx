import React, { useState, useEffect } from 'react';
import { Breadcrumb } from '../components/UI';
import { BLOG_POSTS, BlogPost, BLOG_VIDEOS, VideoItem } from '../blog-data';

// Import new components
import { BlogHeader } from '../features/blog/BlogHeader';
import { FeaturedPost } from '../features/blog/FeaturedPost';
import { PostGrid } from '../features/blog/PostGrid';
import { VideoSection } from '../features/blog/VideoSection';
import { NewsletterSignup } from '../features/blog/NewsletterSignup';
import { PostDetailModal } from '../features/blog/PostDetailModal';
import { VideoPlayerModal } from '../features/blog/VideoPlayerModal';

const BlogView = ({ onBack }: { onBack: () => void }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const featuredPost = BLOG_POSTS[0];
  const otherPosts = BLOG_POSTS.slice(1);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="container mx-auto px-4 max-w-screen-2xl animate-fade-in">
        <Breadcrumb
          onNavigate={onBack}
          items={[
            { label: "Trang Chủ", action: onBack },
            { label: "Blog & Tin Tức" }
          ]}
        />

        <BlogHeader
          title="Kiến Thức & Tin Tức Nông Nghiệp"
          subtitle="Chia sẻ kinh nghiệm canh tác, cập nhật thị trường và giải pháp kỹ thuật tiên tiến dành cho người trồng sầu riêng."
        />

        {featuredPost && (
          <FeaturedPost post={featuredPost} onClick={setSelectedPost} />
        )}

        <PostGrid posts={otherPosts} onPostClick={setSelectedPost} />

        <VideoSection videos={BLOG_VIDEOS} onVideoClick={setSelectedVideo} />

        <NewsletterSignup />
      </div>

      <PostDetailModal
        isOpen={!!selectedPost}
        onClose={() => setSelectedPost(null)}
        post={selectedPost}
      />

      <VideoPlayerModal
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
        video={selectedVideo}
      />
    </div>
  );
};

export default BlogView;
