import React from 'react';

// From data.ts
export type ProductDetail = {
  name: string;
  purpose: string;
  dosage: string;
  unit: string;
  quantity: number;
  unitPrice?: number; // Optional if calculated
  totalCost: number;
  usageNote?: string; // Instructions from page 3
};

export type RichStep = {
  title: string;
  content: string;
  icon?: React.FC<{ className?: string }>;
  imageUrl?: string;
  hoverDetail?: string;
  subPageId?: string;
};

export type TimelineItemData = {
  id: number;
  day: string; // Changed to string to support dates like "1/10/2025"
  stage: string;
  stageLabel: string;
  title: string;
  action: string;
  purpose: string;
  products: string[]; // Simple list for summary
  productDetails?: ProductDetail[]; // Detailed list for cost table
  totalCost?: number;
  icon: React.FC<{ className?: string }>;
  imageType: string;
  imageUrl?: string;
  richDetail?: {
    intro: string;
    steps: RichStep[];
  };
};

export interface ProductInfo {
  id: string;
  name: string;
  category: 'tool' | 'nutrition' | 'protection' | 'other'; // Added category
  imageUrl: string;
  description: string;
  benefits: string[];
  usage?: string;
}
