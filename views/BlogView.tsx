
import React, { useState, useEffect } from 'react';
import { Breadcrumb } from '../components/UI';
import { BaseModal } from '../components/Modal';
import { BLOG_POSTS, BlogPost, BLOG_VIDEOS, VideoItem } from '../blog-data';
import { InfoIcon, BookOpenIcon, ChevronRightIcon } from '../components/Icons';

const BlogView = ({ onBack }: { onBack: () => void }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Helper to construct the safe embed URL
  const getEmbedUrl = (videoId: string) => {
    // Adding origin is crucial for avoiding Error 153/150 on some domains
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&origin=${origin}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 pt-20">
       <div className="container mx-auto px-4 max-w-6xl animate-fade-in">
           <Breadcrumb 
                onNavigate={onBack}
                items={[
                    { label: "Trang Chủ", action: onBack },
                    { label: "Blog & Tin Tức" }
                ]} 
            />

            {/* Header Section */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-green-800 mb-4">Kiến Thức & Tin Tức Nông Nghiệp</h1>
                <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                    Chia sẻ kinh nghiệm canh tác, cập nhật thị trường và giải pháp kỹ thuật tiên tiến dành cho người trồng sầu riêng.
                </p>
            </div>

            {/* Featured Post (First item) */}
            {BLOG_POSTS.length > 0 && (
                <div 
                    className="relative rounded-2xl overflow-hidden shadow-xl mb-12 group cursor-pointer h-[400px]"
                    onClick={() => setSelectedPost(BLOG_POSTS[0])}
                >
                    <img 
                        src={BLOG_POSTS[0].imageUrl} 
                        alt={BLOG_POSTS[0].title} 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-8 text-white max-w-3xl">
                        <span className="bg-green-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3 inline-block">
                            {BLOG_POSTS[0].category}
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold mb-3 leading-tight group-hover:text-green-400 transition-colors">
                            {BLOG_POSTS[0].title}
                        </h2>
                        <div className="flex items-center gap-4 text-sm text-gray-300 mb-4">
                             <span>{BLOG_POSTS[0].author}</span>
                             <span>•</span>
                             <span>{BLOG_POSTS[0].date}</span>
                        </div>
                        <p className="text-gray-200 line-clamp-2 md:line-clamp-3 text-lg">
                            {BLOG_POSTS[0].excerpt}
                        </p>
                    </div>
                </div>
            )}

            {/* Blog Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {BLOG_POSTS.slice(1).map((post) => (
                    <div 
                        key={post.id} 
                        className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col cursor-pointer group"
                        onClick={() => setSelectedPost(post)}
                    >
                        <div className="h-48 overflow-hidden relative">
                            <img 
                                src={post.imageUrl} 
                                alt={post.title} 
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-green-800 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                                {post.category}
                            </div>
                        </div>
                        <div className="p-6 flex-grow flex flex-col">
                            <div className="text-xs text-gray-500 mb-2 flex justify-between">
                                <span>{post.date}</span>
                                <span>{post.author}</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-green-700 transition-colors">
                                {post.title}
                            </h3>
                            <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow">
                                {post.excerpt}
                            </p>
                            <div className="mt-auto pt-4 border-t border-gray-100 flex items-center text-green-600 font-bold text-sm group-hover:translate-x-2 transition-transform">
                                Đọc tiếp <ChevronRightIcon className="w-4 h-4 ml-1" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Video Section */}
            <div className="mb-16">
              <div className="flex items-center justify-between mb-8 border-l-4 border-red-600 pl-4">
                <h2 className="text-2xl font-bold text-gray-800">Thư Viện Video Kỹ Thuật</h2>
                <a href="https://www.youtube.com/@Farmersmartvn2202" target="_blank" rel="noreferrer" className="text-red-600 font-bold hover:underline text-sm">
                    Xem thêm trên Youtube &rarr;
                </a>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {BLOG_VIDEOS.map(video => (
                    <div 
                        key={video.id}
                        className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-gray-100"
                        onClick={() => setSelectedVideo(video)}
                    >
                        <div className="relative aspect-video bg-black">
                            <img 
                                src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`} 
                                alt={video.title} 
                                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-14 h-14 bg-red-600/90 text-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 ml-1">
                                        <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded">
                                VIDEO
                            </div>
                        </div>
                        <div className="p-4">
                            <h3 className="font-bold text-gray-800 line-clamp-2 group-hover:text-red-600 transition-colors text-sm md:text-base">
                                {video.title}
                            </h3>
                        </div>
                    </div>
                ))}
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-green-800 rounded-2xl p-8 md:p-12 text-center text-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                     <BookOpenIcon className="w-full h-full" />
                </div>
                <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-4">Đăng Ký Nhận Tin Tức Nông Nghiệp</h3>
                    <p className="mb-8 max-w-lg mx-auto text-green-100">
                        Nhận các bài viết kỹ thuật, cập nhật giá cả và ưu đãi mới nhất từ Farmersmart trực tiếp vào email của bạn.
                    </p>
                    <div className="max-w-md mx-auto flex gap-2">
                        <input 
                            type="email" 
                            placeholder="Nhập email của bạn..." 
                            className="flex-grow px-4 py-3 rounded-lg text-gray-800 outline-none focus:ring-2 focus:ring-green-400"
                        />
                        <button className="bg-yellow-500 hover:bg-yellow-400 text-green-900 font-bold px-6 py-3 rounded-lg transition-colors">
                            Đăng Ký
                        </button>
                    </div>
                </div>
            </div>
       </div>

       {/* Post Detail Modal */}
       <BaseModal
            isOpen={!!selectedPost}
            onClose={() => setSelectedPost(null)}
            title={selectedPost?.category || "Chi Tiết Bài Viết"}
            initialWidth={800}
            initialHeight={700}
       >
            {selectedPost && (
                <article className="px-2">
                    <div className="rounded-xl overflow-hidden mb-6 shadow-sm">
                         <img src={selectedPost.imageUrl} alt={selectedPost.title} className="w-full h-64 md:h-80 object-cover" />
                    </div>
                    
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 leading-tight">
                        {selectedPost.title}
                    </h1>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6 border-b border-gray-200 pb-4">
                         <span className="flex items-center"><InfoIcon className="w-4 h-4 mr-1" /> {selectedPost.author}</span>
                         <span>•</span>
                         <span>{selectedPost.date}</span>
                    </div>

                    <div className="prose prose-green max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
                        {selectedPost.content}
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <p className="text-sm text-gray-500 italic">
                            * Bài viết mang tính chất tham khảo kỹ thuật. Tùy thuộc vào điều kiện thực tế của vườn, bà con nên điều chỉnh cho phù hợp.
                        </p>
                    </div>
                </article>
            )}
       </BaseModal>

       {/* Video Player Modal */}
       <BaseModal
            isOpen={!!selectedVideo}
            onClose={() => setSelectedVideo(null)}
            title={selectedVideo?.title || "Xem Video"}
            initialWidth={800}
            initialHeight={500}
       >
           {selectedVideo && (
               <div className="w-full h-full flex flex-col">
                   <div className="relative w-full pt-[56.25%] bg-black rounded-lg overflow-hidden shadow-lg">
                       <iframe 
                          src={getEmbedUrl(selectedVideo.youtubeId)}
                          title={selectedVideo.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          className="absolute inset-0 w-full h-full"
                       ></iframe>
                   </div>
                   <div className="mt-4 flex flex-col md:flex-row md:items-start justify-between gap-4">
                       <div>
                           <h3 className="text-lg font-bold text-gray-800">{selectedVideo.title}</h3>
                           <p className="text-sm text-gray-500 mt-1">Nguồn: Youtube Farmersmart</p>
                       </div>
                       <a 
                            href={`https://www.youtube.com/watch?v=${selectedVideo.youtubeId}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex-shrink-0 bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3 py-2 rounded flex items-center gap-1 transition-colors self-start"
                        >
                            Xem trên Youtube <ChevronRightIcon className="w-3 h-3" />
                        </a>
                   </div>
               </div>
           )}
       </BaseModal>
    </div>
  );
};

export default BlogView;
