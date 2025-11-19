import React from 'react';

interface BlogHeaderProps {
  title: string;
  subtitle: string;
}

export const BlogHeader: React.FC<BlogHeaderProps> = ({ title, subtitle }) => (
  <div className="text-center mb-16">
    <h1 className="text-5xl font-bold text-green-800 mb-6">{title}</h1>
    <p className="text-gray-600 max-w-3xl mx-auto text-xl font-light">{subtitle}</p>
  </div>
);
