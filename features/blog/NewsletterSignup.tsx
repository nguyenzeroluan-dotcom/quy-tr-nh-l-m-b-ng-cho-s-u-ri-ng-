import React from 'react';
import { BookOpenIcon } from '../../components/Icons';

export const NewsletterSignup: React.FC = () => (
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
);
