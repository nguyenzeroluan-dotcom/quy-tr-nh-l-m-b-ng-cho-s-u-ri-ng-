
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
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&origin=${origin}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 pt-20">
       <div className="container mx-auto px-4 max-w-screen-2xl animate-fade-in">
           <Breadcrumb 
                onNavigate={onBack}
                items={[
                    { label: "Trang Chủ", action: onBack },
                    { label: "Blog & Tin Tức" }
                ]} 
            />

            {/* Header Section */}
            <div className="text-center mb-16">
                <h1 className="text-5xl font-bold text-green-800 mb-6">Kiến Thức & Tin Tức Nông Nghiệp</h1>
                <p className="text-gray-600 max-w-3xl mx-auto text-xl font-light">
                    Chia sẻ kinh nghiệm canh tác, cập nhật thị trường và giải pháp kỹ thuật tiên tiến dành cho người trồng sầu riêng.
                </p>
            </div>

            {/* Featured Post (First item) - Cinematic Style */}
            {BLOG_POSTS.length > 0 && (
                <div 
                    className="relative rounded-3xl overflow-hidden shadow-2xl mb-16 group cursor-pointer h-[500px] md:h-[600px]"
                    onClick={() => setSelectedPost(BLOG_POSTS[0])}
                >
                    <img 
                        src={BLOG_POSTS[0].imageUrl} 
                        alt={BLOG_POSTS[0].title} 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-10 md:p-16 text-white max-w-5xl">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="bg-green-600 text-sm font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                                {BLOG_POSTS[0].category}
                            </span>
                            <span className="text-gray-300 text-sm font-medium">{BLOG_POSTS[0].date}</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight group-hover:text-green-400 transition-colors">
                            {BLOG_POSTS[0].title}
                        </h2>
                        
                        <p className="text-gray-200 line-clamp-2 text-xl md:text-2xl mb-8 font-light max-w-3xl">
                            {BLOG_POSTS[0].excerpt}
                        </p>
                        <div className="flex items-center text-green-400 font-bold text-lg group-hover:translate-x-2 transition-transform">
                            Đọc chi tiết bài viết <ChevronRightIcon className="w-6 h-6 ml-2" />
                        </div>
                    </div>
                </div>
            )}

            {/* Blog Grid - 4 Columns on Extra Large Screens */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-20">
                {BLOG_POSTS.slice(1).map((post) => (
                    <div 
                        key={post.id} 
                        className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col cursor-pointer group h-full transform hover:-translate-y-2"
                        onClick={() => setSelectedPost(post)}
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
                ))}
            </div>

            {/* Video Section */}
            <div className="mb-20">
              <div className="flex items-center justify-between mb-10 border-l-8 border-red-600 pl-6">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Thư Viện Video Kỹ Thuật</h2>
                <a href="https://www.youtube.com/@Farmersmartvn2202" target="_blank" rel="noreferrer" className="text-red-600 font-bold hover:underline text-lg flex items-center">
                    Xem thêm trên Youtube <ChevronRightIcon className="w-5 h-5" />
                </a>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {BLOG_VIDEOS.map(video => (
                    <div 
                        key={video.id}
                        className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-gray-100 transform hover:-translate-y-1"
                        onClick={() => setSelectedVideo(video)}
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
                ))}
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-green-900 rounded-3xl p-10 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none scale-150">
                     <BookOpenIcon className="w-full h-full" />
                </div>
                <div className="relative z-10">
                    <h3 className="text-3xl md:text-4xl font-bold mb-6">Đăng Ký Nhận Tin Tức Nông Nghiệp</h3>
                    <p className="mb-10 max-w-2xl mx-auto text-green-100 text-lg md:text-xl font-light">
                        Nhận các bài viết kỹ thuật chuyên sâu, cập nhật giá cả thị trường và các chương trình ưu đãi mới nhất từ Farmersmart trực tiếp vào email của bạn.
                    </p>
                    <div className="max-w-lg mx-auto flex gap-3">
                        <input 
                            type="email" 
                            placeholder="Nhập email của bạn..." 
                            className="flex-grow px-6 py-4 rounded-xl text-gray-800 outline-none focus:ring-4 focus:ring-green-500/50 text-lg shadow-inner"
                        />
                        <button className="bg-yellow-500 hover:bg-yellow-400 text-green-900 font-bold px-8 py-4 rounded-xl transition-colors shadow-lg hover:shadow-xl text-lg whitespace-nowrap">
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
            initialWidth={1000}
            initialHeight={800}
       >
            {selectedPost && (
                <article className="px-4 py-2 max-w-5xl mx-auto">
                    <div className="rounded-2xl overflow-hidden mb-8 shadow-lg">
                         <img src={selectedPost.imageUrl} alt={selectedPost.title} className="w-full h-[400px] object-cover" />
                    </div>
                    
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
                        {selectedPost.title}
                    </h1>
                    
                    <div className="flex flex-wrap items-center gap-6 text-base text-gray-500 mb-8 border-b border-gray-200 pb-6">
                         <span className="flex items-center font-medium text-gray-700"><InfoIcon className="w-5 h-5 mr-2" /> {selectedPost.author}</span>
                         <span>•</span>
                         <span>{selectedPost.date}</span>
                    </div>

                    <div className="prose prose-green prose-xl max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
                        {selectedPost.content}
                    </div>

                    <div className="mt-12 pt-8 border-t border-gray-200">
                        <p className="text-base text-gray-500 italic bg-gray-50 p-4 rounded-lg border border-gray-100">
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
            initialWidth={1000}
            initialHeight={650}
       >
           {selectedVideo && (
               <div className="w-full h-full flex flex-col">
                   <div className="relative w-full pt-[56.25%] bg-black rounded-xl overflow-hidden shadow-2xl">
                       <iframe 
                          src={getEmbedUrl(selectedVideo.youtubeId)}
                          title={selectedVideo.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          className="absolute inset-0 w-full h-full"
                       ></iframe>
                   </div>
                   <div className="mt-6 flex flex-col md:flex-row md:items-start justify-between gap-6">
                       <div>
                           <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">{selectedVideo.title}</h3>
                           <p className="text-gray-500">Nguồn: Youtube Farmersmart</p>
                       </div>
                       <a 
                            href={`https://www.youtube.com/watch?v=${selectedVideo.youtubeId}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex-shrink-0 bg-red-600 hover:bg-red-700 text-white text-sm font-bold px-6 py-3 rounded-lg flex items-center gap-2 transition-all shadow-md hover:shadow-lg self-start"
                        >
                            Xem trên Youtube <ChevronRightIcon className="w-4 h-4" />
                        </a>
                   </div>
               </div>
           )}
       </BaseModal>
    </div>
  );
};

export default BlogView;
