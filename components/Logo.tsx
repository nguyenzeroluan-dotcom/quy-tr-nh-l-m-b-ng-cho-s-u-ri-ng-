import React from 'react';

const FarmersmartLogo = ({ className, variant = 'full', light = false }: { className?: string, variant?: 'full' | 'icon', light?: boolean }) => {
    // Sử dụng file logo từ URL người dùng cung cấp
    // Filter: brightness(0) invert(1) sẽ biến toàn bộ điểm ảnh (không trong suốt) thành màu trắng
    // giúp logo hiển thị tốt trên nền tối khi light={true}
    return (
        <img 
            src="https://farmersmart.vn/_next/image?url=%2Fstatic%2Flogo.png&w=128&q=75" 
            alt="Farmersmart" 
            className={`${className} object-contain transition-all duration-300 ${light ? 'brightness-0 invert' : ''}`} 
        />
    );
};

export default FarmersmartLogo;