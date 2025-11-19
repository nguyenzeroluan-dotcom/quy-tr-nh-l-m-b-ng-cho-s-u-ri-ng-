
import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { loadMediaConfig, saveMediaConfig, MediaItem } from './demo-save-data';

// --- Icons ---
const LeafIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 22l-4-9a8 8 0 0 1 12.3-6.3c.9.7 1.7 1.5 1.7 2.3 0 3.2-3.5 8-8 13Z" />
    <path d="m12 22 4-9" />
  </svg>
);

const FlowerIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 16.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 1 1 12 7.5a4.5 4.5 0 1 1 4.5 4.5 4.5 4.5 0 1 1-4.5 4.5" />
    <path d="M12 7.5V9" />
    <path d="M7.5 12H9" />
    <path d="M16.5 12H15" />
    <path d="M12 16.5V15" />
    <path d="M8 8l1.5 1.5" />
    <path d="M14.5 14.5L16 16" />
    <path d="M8 16l1.5-1.5" />
    <path d="M14.5 9.5L16 8" />
  </svg>
);

const ScissorsIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="6" cy="6" r="3" />
    <circle cx="6" cy="18" r="3" />
    <line x1="20" y1="4" x2="8.12" y2="15.88" />
    <line x1="14.47" y1="14.48" x2="20" y2="20" />
    <line x1="8.12" y1="8.12" x2="12" y2="12" />
  </svg>
);

const SprayIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 3v18h18" />
    <path d="M18.5 21a8.5 8.5 0 1 0-14-8.5" />
    <path d="M12 12v9" />
    <path d="M16 16a4 4 0 0 0-4-8 4 4 0 0 0-8 4" />
  </svg>
);

const DropletIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
  </svg>
);

const ChevronRightIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const HomeIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const CheckCircleIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const SettingsIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
  </svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const TrashIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
  </svg>
);

const PlusIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const GripIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 15l-6 6" />
    <path d="M21 9l-12 12" />
    <path d="M21 3L3 21" />
  </svg>
);

const ArrowUpIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="12" y1="19" x2="12" y2="5"></line>
    <polyline points="5 12 12 5 19 12"></polyline>
  </svg>
);

const InfoIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);


// --- Logo Component ---
const FarmersmartLogo = ({ className, variant = 'full', light = false }: { className?: string, variant?: 'full' | 'icon', light?: boolean }) => {
    // Main green: #0f5132 (green-900 roughly) or #15803d (green-700)
    // Light mode: White
    const mainColor = light ? "#ffffff" : "#1a5d1a"; 
    const leafColor = light ? "#f0fdf4" : "#1a5d1a";
    
    const IconGroup = () => (
        <g transform="translate(0,0)">
           {/* Circle Emblem */}
           <circle cx="35" cy="55" r="22" fill="none" stroke={mainColor} strokeWidth="3.5" />
           
           {/* Mountain ZigZag inside circle */}
           <path d="M 18 60 L 30 45 L 40 58 L 48 48" fill="none" stroke={mainColor} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
           <path d="M 18 60 V 68 M 48 48 V 55" stroke="none" />

           {/* Leaves (3 leaves at top) */}
           <path d="M 35 33 Q 32 15 40 8 Q 50 15 38 33" fill="none" stroke={leafColor} strokeWidth="3.5" strokeLinecap="round" />
           <path d="M 28 35 Q 15 25 18 15 Q 28 20 28 35" fill="none" stroke={leafColor} strokeWidth="3.5" strokeLinecap="round" />
           <path d="M 42 35 Q 55 25 52 15 Q 42 20 42 35" fill="none" stroke={leafColor} strokeWidth="3.5" strokeLinecap="round" />
        </g>
    );

    const TextGroup = () => (
        <g transform="translate(70, 25)">
            {/* Stylized FM */}
            <path d="M 5 5 H 30 M 5 5 Q 0 5 0 15 V 25 Q 0 35 15 35 M 5 20 H 25" fill="none" stroke={mainColor} strokeWidth="7" strokeLinecap="round" />
            <path d="M 40 35 V 15 Q 40 5 50 5 Q 60 5 60 15 V 25 Q 60 15 70 15 Q 80 15 80 25 V 35" fill="none" stroke={mainColor} strokeWidth="7" strokeLinecap="round" />
            {/* FARMERSMART Text */}
            <text x="0" y="55" fontFamily="sans-serif" fontSize="11" fontWeight="900" letterSpacing="3" fill={mainColor} style={{ textTransform: 'uppercase' }}>
                Farmersmart
            </text>
        </g>
    );

    if (variant === 'icon') {
        return (
            <svg className={className} viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
                <g transform="scale(1.1) translate(5, -10)">
                  <IconGroup />
                </g>
            </svg>
        );
    }

    return (
        <svg className={className} viewBox="0 0 250 90" xmlns="http://www.w3.org/2000/svg">
            <IconGroup />
            <TextGroup />
        </svg>
    );
};


// --- Types ---

type RichStep = {
  title: string;
  content: string;
  icon?: React.FC<{ className?: string }>;
  imageUrl?: string;
  hoverDetail?: string; // Kept for backward compatibility but not used directly in modal logic if content is full
};

type TimelineItemData = {
  id: number;
  day: number;
  stage: string;
  stageLabel: string;
  title: string;
  action: string;
  purpose: string;
  products: string[];
  icon: React.FC<{ className?: string }>;
  imageType: string;
  imageUrl?: string;
  richDetail?: {
    intro: string;
    steps: RichStep[];
  };
};

// --- Data ---
const timelineData: TimelineItemData[] = [
  {
    id: 1,
    day: 1,
    stage: "recovery",
    stageLabel: "Sau Thu Hoạch & Xử Lý Vườn",
    title: "Cắt Cành & Vệ Sinh Vườn",
    action: "Cắt cành tạo tán, cắt cỏ, xới đất quanh gốc.",
    purpose: "Tạo thông thoáng, hạn chế cạnh tranh dinh dưỡng, hạn chế mầm bệnh và côn trùng gây hại.",
    products: ["Dụng cụ làm vườn"],
    icon: ScissorsIcon,
    imageType: "pruning",
    imageUrl: "https://lh7-rt.googleusercontent.com/docsz/AD_4nXcg4sSs3hVnLhBvBtDIlPddaxEbRWJpXeukguH6x-gDpxTmXbuppI-q-cxfOWB51lhAffDOA699AzwaGJSSHenOPzn0_fUmsfggYjcAHbF-SSSU-8Erih4X8o5lwv0hR8Q7An21cw?key=HW9Is8Th0VJ0Ln4U3kUKOP64",
    richDetail: {
      intro: "Sau một vụ mùa bội thu, cây sầu riêng bị mất sức rất nhiều. Việc cải tạo đất và vệ sinh vườn ngay sau thu hoạch là bước then chốt để cây phục hồi nhanh, sẵn sàng cho vụ mùa tiếp theo. Dưới đây là 5 bước chuẩn hóa:",
      steps: [
        {
          title: "Bước 1: Vệ sinh tàn dư thực vật",
          content: "Sau khi thu hoạch, tiến hành cắt bỏ các cành khô, cành sâu bệnh, cuống trái còn sót lại. Thu gom toàn bộ tàn dư ra khỏi vườn và tiêu hủy để loại bỏ nơi trú ngụ của nấm bệnh và sâu hại.",
          icon: ScissorsIcon,
          imageUrl: "https://lh7-rt.googleusercontent.com/docsz/AD_4nXcg4sSs3hVnLhBvBtDIlPddaxEbRWJpXeukguH6x-gDpxTmXbuppI-q-cxfOWB51lhAffDOA699AzwaGJSSHenOPzn0_fUmsfggYjcAHbF-SSSU-8Erih4X8o5lwv0hR8Q7An21cw?key=HW9Is8Th0VJ0Ln4U3kUKOP64"
        },
        {
          title: "Bước 2: Xới mô, kích thích rễ",
          content: "Sử dụng cuốc hoặc chĩa xới nhẹ lớp đất mặt quanh tán cây (sâu 5-7cm). Việc này giúp phá vỡ lớp đất nén chặt, tạo độ thông thoáng (Oxy) cho rễ hô hấp và dễ dàng hấp thu dinh dưỡng mới.",
          icon: DropletIcon,
          imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn_yLslum_c7FtHJsq1Lp3xgmMX7wVSmMRaQ&s"
        },
        {
          title: "Bước 3: Bón vôi xử lý đất",
          content: "Rải vôi bột đều khắp mặt mô và rãnh thoát nước. Vôi giúp nâng pH đất, trung hòa axit và sát khuẩn, tiêu diệt các mầm bệnh nấm tồn dư trong đất.",
          icon: LeafIcon
        },
        {
          title: "Bước 4: Rửa vườn",
          content: "Phun thuốc sát khuẩn toàn bộ thân, cành, lá và mặt đất xung quanh gốc. Bước này nhằm 'tắm' sạch cây, rửa trôi bào tử nấm và rong rêu bám trên cây.",
          icon: SprayIcon
        },
        {
          title: "Bước 5: Bón hữu cơ tái tạo đất",
          content: "Sau khi xử lý vôi 7-10 ngày, tiến hành bón phân hữu cơ vi sinh Farmersmart. Hữu cơ giúp cải thiện cấu trúc đất, làm đất tơi xốp, giữ ẩm và cung cấp hệ vi sinh vật có lợi bảo vệ rễ.",
          icon: LeafIcon
        }
      ]
    }
  },
  {
    id: 2,
    day: 15,
    stage: "growth",
    stageLabel: "Giai Đoạn Cơi Đọt 1",
    title: "Xử Lý Đất & Kích Rễ",
    action: "Tưới phục hồi, nâng pH đất, phân hủy hữu cơ và ngừa tuyến trùng.",
    purpose: "Cải tạo đất, nâng pH, phòng bệnh rễ, bổ sung dinh dưỡng hữu cơ.",
    products: ["CK70", "Trichoderma", "Cây khỏe 220", "Cây khỏe 90", "CK180", "CK320"],
    icon: DropletIcon,
    imageType: "soil",
    imageUrl: "https://nongnghiepthuanthien.vn/wp-content/uploads/2021/11/thuoc-kich-re-sau-rieng.jpg.webp",
    richDetail: {
      intro: "Hệ rễ khỏe mạnh là yếu tố tiên quyết cho một vụ mùa thắng lợi. Giai đoạn này tập trung vào việc tái tạo môi trường đất lý tưởng và kích thích bộ rễ cám phát triển mạnh mẽ sau thời gian mang trái.",
      steps: [
        {
          title: "Bước 1: Tưới Kích Rễ & Phục Hồi",
          content: "Sử dụng dòng sản phẩm Cây Khỏe (CK) kết hợp Humic tưới ướt đẫm vùng quanh tán. Hoạt chất hữu cơ sẽ kích thích các đầu rễ tơ (rễ trắng) bung ra mạnh mẽ để hút dinh dưỡng.",
          icon: DropletIcon,
          imageUrl: "https://nongnghiepthuanthien.vn/wp-content/uploads/2021/11/thuoc-kich-re-sau-rieng.jpg.webp"
        },
        {
          title: "Bước 2: Cân Bằng pH Đất",
          content: "pH đất thấp (axit) làm rễ kém phát triển và nấm bệnh dễ tấn công. Sử dụng sản phẩm nâng pH để đưa đất về ngưỡng 5.5 - 6.5, giúp cây hấp thu phân bón tối đa.",
          icon: SettingsIcon
        },
        {
          title: "Bước 3: Phân Hủy Hữu Cơ",
          content: "Bổ sung tập đoàn vi sinh vật có lợi (Trichoderma, Bacillus) để phân giải nhanh xác bã thực vật, lá mục thành mùn hữu cơ tơi xốp, hạn chế ngộ độc hữu cơ cho rễ.",
          icon: LeafIcon
        },
        {
          title: "Bước 4: Phòng Ngừa Tuyến Trùng",
          content: "Tưới thuốc trị tuyến trùng định kỳ để bảo vệ bộ rễ non mới ra. Tuyến trùng gây u sưng rễ, làm tắc mạch dẫn nhựa, khiến cây vàng lá và còi cọc.",
          icon: SprayIcon
        }
      ]
    }
  },
  {
    id: 3,
    day: 30,
    stage: "growth",
    stageLabel: "Đọt Non Cơi 1",
    title: "Bảo Vệ Đọt Non (Lần 1)",
    action: "Phun ngừa côn trùng, phòng bệnh và chất bám dính.",
    purpose: "Bảo vệ cơi đọt khỏi sâu bệnh hại khi lá bắt đầu mở.",
    products: ["Cây khỏe 90", "Cây khỏe 180", "Cây khỏe 50"],
    icon: SprayIcon,
    imageType: "spray"
  },
  {
    id: 4,
    day: 37,
    stage: "growth",
    stageLabel: "Đọt Non Cơi 1",
    title: "Bảo Vệ Đọt Non (Lần 2)",
    action: "Phun lặp lại để bảo vệ đọt non đang phát triển mạnh.",
    purpose: "Tiếp tục bảo vệ cơi đọt, phòng rầy rệp tấn công.",
    products: ["Cây khỏe 90", "Cây khỏe 180", "Cây khỏe 50"],
    icon: SprayIcon,
    imageType: "spray"
  },
  {
    id: 5,
    day: 44,
    stage: "growth",
    stageLabel: "Đọt Non Cơi 1",
    title: "Dinh Dưỡng & Dưỡng Lá",
    action: "Phun dinh dưỡng qua lá kết hợp bón gốc.",
    purpose: "Cung cấp dinh dưỡng nuôi cây, giúp lá xanh dày.",
    products: ["Cây khỏe 90", "Cây khỏe 180", "Cây khỏe 50", "NPK 30-10-10"],
    icon: LeafIcon,
    imageType: "fertilizer"
  },
  {
    id: 6,
    day: 75,
    stage: "growth",
    stageLabel: "Đọt Non Cơi 2",
    title: "Kéo Đọt Cơi 2 (Lần 1)",
    action: "Phun kích thích đọt và bón gốc dinh dưỡng đạm cao.",
    purpose: "Thúc đẩy cơi 2 phát triển khỏe mạnh, đồng loạt.",
    products: ["Cây khỏe 90", "Cây khỏe 180", "Cây khỏe 50", "NPK 30-10-10"],
    icon: LeafIcon,
    imageType: "growth"
  },
  {
    id: 7,
    day: 82,
    stage: "growth",
    stageLabel: "Đọt Non Cơi 2",
    title: "Bảo Vệ Cơi 2 (Lần 2)",
    action: "Phun phòng trừ sâu bệnh định kỳ cho cơi 2.",
    purpose: "Phòng trừ sâu bệnh, giữ bộ lá nguyên vẹn.",
    products: ["Cây khỏe 90", "Cây khỏe 180", "Cây khỏe 50"],
    icon: SprayIcon,
    imageType: "spray"
  },
  {
    id: 8,
    day: 89,
    stage: "growth",
    stageLabel: "Đọt Non Cơi 2",
    title: "Bảo Vệ Cơi 2 (Lần 3)",
    action: "Phun phòng trừ sâu bệnh.",
    purpose: "Bảo vệ lá non giai đoạn nhạy cảm.",
    products: ["Cây khỏe 90", "Cây khỏe 180", "Cây khỏe 50"],
    icon: SprayIcon,
    imageType: "spray"
  },
  {
    id: 9,
    day: 105,
    stage: "growth",
    stageLabel: "Đọt Non Cơi 2",
    title: "Dinh Dưỡng Nuôi Cơi 2",
    action: "Bón phân gốc hàm lượng đạm cao.",
    purpose: "Dinh dưỡng nuôi cây, chuẩn bị lực cho giai đoạn làm bông.",
    products: ["NPK 30-10-10"],
    icon: LeafIcon,
    imageType: "fertilizer"
  },
  {
    id: 10,
    day: 120,
    stage: "flowering",
    stageLabel: "Chuẩn Bị Làm Bông (Cơi 3)",
    title: "Tạo Mầm & Bảo Vệ Cơi 3",
    action: "Phun bộ sản phẩm bảo vệ và bón lân gốc.",
    purpose: "Bắt đầu quy trình tạo mầm hoa và bảo vệ cơi lá cuối cùng.",
    products: ["Cây khỏe 90", "Cây khỏe 180", "Cây khỏe 50", "Lân Văn Điển"],
    icon: FlowerIcon,
    imageType: "bloom-prep"
  },
  {
    id: 11,
    day: 127,
    stage: "flowering",
    stageLabel: "Chuẩn Bị Làm Bông",
    title: "Dưỡng Cơi 3 (Lần 2)",
    action: "Phun bảo vệ lá, giúp lá mau thuần thục.",
    purpose: "Giữ bộ lá xanh, dày, khỏe mạnh để nuôi hoa.",
    products: ["Cây khỏe 90", "Cây khỏe 180", "Cây khỏe 50"],
    icon: SprayIcon,
    imageType: "leaf"
  },
  {
    id: 12,
    day: 134,
    stage: "flowering",
    stageLabel: "Chuẩn Bị Làm Bông",
    title: "Dưỡng Cơi 3 (Lần 3)",
    action: "Phun lần cuối trước khi vào quy trình xiết nước.",
    purpose: "Đảm bảo sạch bệnh và côn trùng trước khi làm bông.",
    products: ["Cây khỏe 90", "Cây khỏe 180", "Cây khỏe 50"],
    icon: SprayIcon,
    imageType: "leaf"
  },
  {
    id: 13,
    day: 150,
    stage: "flowering",
    stageLabel: "Quy Trình Làm Bông",
    title: "Tạo Mầm Gốc & Mở Lá",
    action: "Bón gốc DAP + Kali Sunfat. Phun tạo mầm lá.",
    purpose: "Thúc đẩy già lá, phân hóa mầm hoa mạnh mẽ.",
    products: ["DAP", "Kali Sunfat", "Phân bón lá 10-60-10"],
    icon: FlowerIcon,
    imageType: "flower-start"
  },
  {
    id: 14,
    day: 157,
    stage: "flowering",
    stageLabel: "Tạo Mầm Hoa",
    title: "Phun Tạo Mầm (Lần 2)",
    action: "Phun ướt đều tán lá.",
    purpose: "Ủ mầm hoa, hỗ trợ phân hóa mầm.",
    products: ["Phân bón lá 10-60-10"],
    icon: SprayIcon,
    imageType: "bloom-spray"
  },
  {
    id: 15,
    day: 164,
    stage: "flowering",
    stageLabel: "Tạo Mầm Hoa",
    title: "Phun Tạo Mầm (Lần 3)",
    action: "Phun ướt đều tán lá.",
    purpose: "Tăng cường phân hóa mầm hoa.",
    products: ["Phân bón lá 10-60-10"],
    icon: SprayIcon,
    imageType: "bloom-spray"
  },
  {
    id: 16,
    day: 171,
    stage: "flowering",
    stageLabel: "Tạo Mầm Hoa",
    title: "Phun Tạo Mầm (Lần 4)",
    action: "Phun ướt đều tán lá.",
    purpose: "Thúc đẩy quá trình tạo mầm.",
    products: ["Phân bón lá 10-60-10"],
    icon: SprayIcon,
    imageType: "bloom-spray"
  },
  {
    id: 17,
    day: 178,
    stage: "flowering",
    stageLabel: "Tạo Mầm Hoa",
    title: "Phun Tạo Mầm (Lần 5)",
    action: "Phun lần cuối trước khi kích hoa.",
    purpose: "Hoàn tất quá trình ủ mầm.",
    products: ["Phân bón lá 10-60-10"],
    icon: SprayIcon,
    imageType: "bloom-spray"
  },
  {
    id: 18,
    day: 182,
    stage: "flowering",
    stageLabel: "Kích Thích Ra Hoa",
    title: "Kích Mắt Cua & Xiết Nước",
    action: "Phun khi lá đã già, xanh đậm, có dấu hiệu khựng lại. Cắt nước hoàn toàn.",
    purpose: "Phá vỡ miên trạng, kích thích mắt cua bung ra.",
    products: ["KNO3"],
    icon: FlowerIcon,
    imageType: "eye-wakeup"
  },
  {
    id: 19,
    day: 187,
    stage: "flowering",
    stageLabel: "Ra Hoa",
    title: "Kéo Hoa Đồng Loạt",
    action: "Phun kích thích khi mắt cua đã sáng.",
    purpose: "Giúp hoa ra đều và đồng loạt trên toàn vườn.",
    products: ["KNO3"],
    icon: FlowerIcon,
    imageType: "full-bloom"
  }
];

// --- Components ---

const Breadcrumb = ({ items, onNavigate }: { items: { label: string, action?: () => void }[], onNavigate: () => void }) => (
  <nav className="flex text-sm text-gray-500 mb-6 overflow-x-auto whitespace-nowrap pb-2">
    <div 
        onClick={onNavigate}
        className="flex items-center hover:text-green-700 cursor-pointer transition-colors"
    >
        <HomeIcon className="w-4 h-4 mr-1" />
        Trang Chủ
    </div>
    {items.map((item, index) => (
      <React.Fragment key={index}>
        <ChevronRightIcon className="w-4 h-4 mx-2 flex-shrink-0" />
        <span 
          className={`${index === items.length - 1 ? 'font-bold text-green-800' : 'hover:text-green-700 cursor-pointer transition-colors'}`}
          onClick={item.action}
        >
          {item.label}
        </span>
      </React.Fragment>
    ))}
  </nav>
);

const ImagePlaceholder = ({ type, text, imageUrl }: { type: string, text: string, imageUrl?: string }) => {
  if (imageUrl) {
      return (
        <div className="w-full h-48 md:h-64 rounded-lg mb-4 relative overflow-hidden group shadow-sm">
            <img src={imageUrl} alt={text} className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
            <div className="absolute bottom-0 left-0 right-0 p-3">
                <span className="text-xs md:text-sm font-bold text-white uppercase tracking-wider bg-green-600/80 px-2 py-1 rounded backdrop-blur-sm">
                    {text}
                </span>
            </div>
        </div>
      );
  }

  let color = "bg-gray-200";
  let iconColor = "text-gray-400";
  let borderColor = "border-gray-300";

  if (type.includes("spray")) { color = "bg-blue-100"; iconColor = "text-blue-400"; borderColor = "border-blue-200"; }
  else if (type.includes("fertilizer")) { color = "bg-amber-100"; iconColor = "text-amber-500"; borderColor = "border-amber-200"; }
  else if (type.includes("growth") || type.includes("leaf")) { color = "bg-green-100"; iconColor = "text-green-500"; borderColor = "border-green-200"; }
  else if (type.includes("pruning")) { color = "bg-stone-100"; iconColor = "text-stone-500"; borderColor = "border-stone-200"; }
  else if (type.includes("bloom") || type.includes("flower")) { color = "bg-yellow-100"; iconColor = "text-yellow-500"; borderColor = "border-yellow-200"; }

  return (
    <div className={`w-full h-40 md:h-48 rounded-lg mb-4 flex items-center justify-center ${color} border-2 ${borderColor} relative overflow-hidden group`}>
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-50"></div>
      <div className={`transform transition-transform duration-500 group-hover:scale-110 flex flex-col items-center`}>
        <span className={`text-5xl mb-2 ${iconColor} opacity-80`}>
            {type.includes('spray') && <SprayIcon className="w-12 h-12"/>}
            {type.includes('fertilizer') && <LeafIcon className="w-12 h-12"/>}
            {type.includes('growth') && <LeafIcon className="w-12 h-12"/>}
            {type.includes('leaf') && <LeafIcon className="w-12 h-12"/>}
            {type.includes('pruning') && <ScissorsIcon className="w-12 h-12"/>}
            {(type.includes('bloom') || type.includes('flower')) && <FlowerIcon className="w-12 h-12"/>}
            {type.includes('soil') && <DropletIcon className="w-12 h-12"/>}
        </span>
        <span className="text-sm font-bold text-gray-600 uppercase tracking-wider px-4 text-center bg-white/60 rounded py-1 backdrop-blur-sm">{text}</span>
      </div>
    </div>
  );
};

const StageBadge = ({ stage, label }: { stage: string, label: string }) => {
  const colors: Record<string, string> = {
    recovery: "bg-stone-600 text-white",
    growth: "bg-green-600 text-white",
    flowering: "bg-yellow-600 text-white",
  };
  
  const colorClass = colors[stage] || "bg-gray-500 text-white";

  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-2 ${colorClass} shadow-sm`}>
      {label}
    </span>
  );
};

// --- Back To Top Component ---
const BackToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-50 p-3 rounded-full bg-gradient-to-br from-green-600 to-green-800 text-white shadow-xl transition-all duration-500 transform hover:scale-110 hover:shadow-2xl focus:outline-none ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
      aria-label="Back to top"
    >
      <ArrowUpIcon className="w-6 h-6" />
    </button>
  );
};

// --- Modal Components ---

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  initialWidth?: number;
  initialHeight?: number;
}

const BaseModal: React.FC<BaseModalProps> = ({ 
  isOpen, onClose, title, children, footer,
  initialWidth = 600,
  initialHeight = 500
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ width: initialWidth, height: initialHeight });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const resizeStartRef = useRef({ x: 0, y: 0, width: 0, height: 0 });
  const isMobile = window.innerWidth < 768;

  useEffect(() => {
    // Center initially
    if (isOpen && !isMobile) {
       const initialX = (window.innerWidth - size.width) / 2;
       const initialY = (window.innerHeight - size.height) / 2;
       setPosition({ x: Math.max(0, initialX), y: Math.max(0, initialY) });
    }
  }, [isOpen, isMobile]);

  // Drag Logic
  const handleMouseDownDrag = (e: React.MouseEvent) => {
    if (isMobile) return;
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX - position.x, y: e.clientY - position.y };
  };

  // Resize Logic
  const handleMouseDownResize = (e: React.MouseEvent) => {
    if (isMobile) return;
    e.stopPropagation(); // Prevent drag when resizing
    setIsResizing(true);
    resizeStartRef.current = { 
        x: e.clientX, 
        y: e.clientY, 
        width: size.width, 
        height: size.height 
    };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragStartRef.current.x,
          y: e.clientY - dragStartRef.current.y
        });
      }
      if (isResizing) {
        const dx = e.clientX - resizeStartRef.current.x;
        const dy = e.clientY - resizeStartRef.current.y;
        setSize({
          width: Math.max(300, resizeStartRef.current.width + dx), // Min width 300
          height: Math.max(200, resizeStartRef.current.height + dy) // Min height 200
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing]);


  if (!isOpen) return null;

  // Style for Desktop (Floating) vs Mobile (Fixed Full)
  const modalStyle: React.CSSProperties = isMobile ? {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    width: '100%', height: '100%'
  } : {
    position: 'fixed',
    left: position.x,
    top: position.y,
    width: size.width,
    height: size.height,
    maxWidth: '90vw',
    maxHeight: '90vh'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
       {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
      
      {/* Modal Window */}
      <div 
        ref={modalRef}
        style={modalStyle}
        className="flex flex-col bg-white/95 backdrop-blur-xl shadow-2xl rounded-2xl border border-white/50 overflow-hidden transition-shadow duration-200 animate-scale-in"
      >
        {/* Header (Draggable) */}
        <div 
           className={`flex justify-between items-center px-6 py-4 bg-gradient-to-r from-green-800 to-green-700 text-white select-none ${!isMobile ? 'cursor-move' : ''}`}
           onMouseDown={handleMouseDownDrag}
        >
          <h3 className="text-lg font-bold tracking-wide flex items-center gap-2">
            {title}
          </h3>
          <button 
            onClick={onClose} 
            className="text-white/70 hover:text-white hover:bg-white/10 p-1.5 rounded-full transition-colors"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-grow overflow-y-auto p-6 bg-gradient-to-b from-white to-green-50/30 custom-scrollbar">
           {children}
        </div>

        {/* Footer */}
        {footer && (
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
                {footer}
            </div>
        )}

        {/* Resize Handle (Desktop Only) */}
        {!isMobile && (
            <div 
                className="absolute bottom-0 right-0 p-1 cursor-nwse-resize text-gray-400 hover:text-green-600"
                onMouseDown={handleMouseDownResize}
            >
                <GripIcon className="w-5 h-5" />
            </div>
        )}
      </div>
    </div>
  );
};


const ConfigModal = ({ isOpen, onClose, media, onSave }: { isOpen: boolean, onClose: () => void, media: MediaItem[], onSave: (data: MediaItem[]) => void }) => {
  const [localMedia, setLocalMedia] = useState<MediaItem[]>(media);

  useEffect(() => {
    setLocalMedia(media);
  }, [media]);

  const handleAdd = () => {
    setLocalMedia([...localMedia, { id: Date.now().toString(), type: 'image', url: '' }]);
  };

  const handleRemove = (id: string) => {
    setLocalMedia(localMedia.filter(m => m.id !== id));
  };

  const handleChange = (id: string, field: keyof MediaItem, value: string) => {
    setLocalMedia(localMedia.map(m => m.id === id ? { ...m, [field]: value } : m));
  };

  const handleSave = () => {
    onSave(localMedia);
    onClose();
  };

  return (
    <BaseModal 
        isOpen={isOpen} 
        onClose={onClose} 
        title="Cấu Hình Header Media"
        initialWidth={700}
        initialHeight={600}
        footer={
            <>
                <button onClick={onClose} className="px-5 py-2 text-gray-600 font-bold hover:bg-gray-200 rounded-lg transition-colors">Hủy</button>
                <button onClick={handleSave} className="px-6 py-2 bg-gradient-to-r from-green-600 to-green-500 text-white font-bold rounded-lg hover:shadow-lg hover:from-green-500 hover:to-green-400 transition-all shadow-md">
                    Lưu Cấu Hình
                </button>
            </>
        }
    >
        <div className="space-y-5">
          {localMedia.map((item, index) => (
            <div key={item.id} className="group relative flex flex-col gap-3 p-5 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-green-200 transition-all">
               <div className="flex items-center gap-3">
                   <span className="w-6 h-6 flex items-center justify-center bg-green-100 text-green-700 font-bold rounded-full text-xs">
                       {index + 1}
                   </span>
                   <div className="flex-grow grid grid-cols-1 md:grid-cols-4 gap-3">
                       <div className="md:col-span-1">
                           <select 
                             className="w-full p-2.5 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all cursor-pointer"
                             value={item.type}
                             onChange={(e) => handleChange(item.id, 'type', e.target.value)}
                           >
                             <option value="image">Ảnh</option>
                             <option value="video">Video</option>
                           </select>
                       </div>
                       <div className="md:col-span-3">
                           <input 
                             type="text" 
                             className="w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                             placeholder="Nhập URL hình ảnh hoặc video..."
                             value={item.url}
                             onChange={(e) => handleChange(item.id, 'url', e.target.value)}
                           />
                       </div>
                   </div>
                   <button 
                        onClick={() => handleRemove(item.id)} 
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Xóa"
                   >
                     <TrashIcon className="w-5 h-5" />
                   </button>
               </div>
               
               {/* Preview Mini */}
               {item.url && (
                   <div className="w-full h-24 bg-gray-100 rounded-lg overflow-hidden relative mt-1">
                       {item.type === 'video' ? (
                           <video src={item.url} className="w-full h-full object-cover opacity-80" />
                       ) : (
                           <img src={item.url} alt="Preview" className="w-full h-full object-cover opacity-80" />
                       )}
                       <div className="absolute bottom-1 right-2 text-[10px] text-gray-500 bg-white/80 px-2 py-0.5 rounded">Preview</div>
                   </div>
               )}
            </div>
          ))}

          <button onClick={handleAdd} className="w-full py-3 border-2 border-dashed border-green-300 text-green-600 rounded-xl hover:bg-green-50 hover:border-green-400 transition-all flex items-center justify-center font-bold text-sm uppercase tracking-wide shadow-sm">
            <PlusIcon className="w-5 h-5 mr-2" /> Thêm Media Mới
          </button>
        </div>
    </BaseModal>
  );
};

const PHGuideModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const phLevels = [
    { range: "3-4", title: "Axit Cực Mạnh", desc: "Độc Al/Mn, rễ chết.", color: "bg-red-600 text-white" },
    { range: "4-5", title: "Axit Mạnh", desc: "Thiếu dinh dưỡng, rễ kém phát triển.", color: "bg-orange-500 text-white" },
    { range: "5-6", title: "Axit Nhẹ", desc: "Tốt cho sầu riêng, hấp thu tối ưu.", color: "bg-yellow-400 text-gray-800" },
    { range: "6-7", title: "Trung Tính Nhẹ", desc: "Chấp nhận được.", color: "bg-green-500 text-white" },
    { range: "7-8", title: "Kiềm Nhẹ", desc: "Thiếu Fe/Zn, vàng lá.", color: "bg-teal-500 text-white" },
    { range: "8-11", title: "Kiềm Mạnh", desc: "Rễ thối, cây chết.", color: "bg-purple-600 text-white" },
  ];

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Tầm Quan Trọng Của pH Đất Với Sầu Riêng"
      initialWidth={900}
      initialHeight={750}
    >
      <div className="space-y-8">
        
        {/* Intro */}
        <div className="bg-green-50 p-4 rounded-xl border border-green-200 text-center">
            <h4 className="font-bold text-green-800 text-lg mb-1">pH đất tác động trực tiếp lên sức khỏe bộ rễ</h4>
            <p className="text-gray-600">Kiểm soát pH là chìa khóa để cây hấp thu dinh dưỡng hiệu quả nhất.</p>
        </div>

        {/* pH Scale Visualization */}
        <div>
          <h4 className="text-xl font-bold text-gray-800 mb-4">Thang Đo pH Đất</h4>
          <div className="relative h-16 rounded-lg bg-gradient-to-r from-red-600 via-yellow-400 to-purple-600 shadow-inner flex items-center">
              {/* Markers */}
              <div className="absolute left-[10%] text-white font-bold text-xs top-2">3</div>
              <div className="absolute left-[50%] text-white font-bold text-xs top-2">7</div>
              <div className="absolute left-[90%] text-white font-bold text-xs top-2">11</div>
              
              {/* Ideal Range Highlight */}
              <div className="absolute left-[39%] width-[15%] w-[15%] h-[140%] -top-[20%] border-4 border-white shadow-lg bg-green-500/20 backdrop-blur-sm rounded-lg flex flex-col items-center justify-center animate-pulse z-10">
                 <div className="bg-white text-green-700 text-xs font-bold px-2 py-1 rounded shadow mb-1 whitespace-nowrap">Lý Tưởng</div>
                 <span className="text-white font-bold text-shadow">5.5 - 6.5</span>
              </div>
          </div>
          <div className="flex justify-between text-xs font-bold text-gray-400 mt-2 px-2">
             <span>Axit (Chua)</span>
             <span>Trung Tính</span>
             <span>Kiềm</span>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {phLevels.map((level, idx) => (
               <div key={idx} className={`${level.color} p-4 rounded-xl shadow-md transform transition-transform hover:scale-105`}>
                   <div className="flex justify-between items-start mb-2">
                       <span className="text-2xl font-extrabold opacity-90">pH {level.range}</span>
                   </div>
                   <h5 className="font-bold text-lg mb-1">{level.title}</h5>
                   <p className="text-sm opacity-90">{level.desc}</p>
               </div>
            ))}
        </div>

        {/* Images Section */}
        <div className="space-y-6">
            <h4 className="text-xl font-bold text-gray-800 border-l-4 border-green-500 pl-3">Minh Họa Thực Tế</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-100">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Soil_pH_effect_on_nutrient_availability.svg/1200px-Soil_pH_effect_on_nutrient_availability.svg.png" alt="Biểu đồ dinh dưỡng pH" className="w-full h-56 object-contain" />
                    <p className="text-center text-xs text-gray-500 mt-2 italic">Khả năng hấp thu dinh dưỡng theo độ pH</p>
                </div>
                 <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-100">
                    <img src="https://extension.usu.edu/images/soil/pH-scale-roots.jpg" alt="Tác động lên rễ" className="w-full h-56 object-cover rounded-lg" />
                    <p className="text-center text-xs text-gray-500 mt-2 italic">Sự phát triển của rễ cây ở các mức pH khác nhau</p>
                </div>
            </div>
        </div>
      </div>
    </BaseModal>
  );
};

const CarouselHeader = () => {
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showConfig, setShowConfig] = useState(false);

  useEffect(() => {
    const data = loadMediaConfig();
    setMediaList(data);
  }, []);

  useEffect(() => {
    if (mediaList.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % mediaList.length);
    }, 6000); // 6 seconds per slide
    return () => clearInterval(interval);
  }, [mediaList]);

  const handleSaveConfig = (newData: MediaItem[]) => {
    setMediaList(newData);
    saveMediaConfig(newData);
  };

  return (
    <header className="relative h-[500px] md:h-[600px] bg-gray-900 overflow-hidden group">
      {/* Carousel Backgrounds */}
      {mediaList.map((item, index) => (
        <div 
          key={item.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        >
           {item.type === 'video' ? (
             <video 
               src={item.url} 
               autoPlay 
               muted 
               loop 
               className="w-full h-full object-cover opacity-60"
             />
           ) : (
             <img 
               src={item.url} 
               alt="Background" 
               className="w-full h-full object-cover opacity-60"
             />
           )}
           <div className="absolute inset-0 bg-gradient-to-b from-green-900/40 via-black/20 to-green-900/80"></div>
        </div>
      ))}

      {/* Content Overlay */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center p-4">
          <div className="mb-8 transform hover:scale-105 transition-transform duration-500">
            <div className="p-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/50">
               <FarmersmartLogo className="h-20 w-auto text-green-800" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg tracking-tight">
            Quy Trình Tổng Quát
          </h1>
          <p className="text-green-100 text-lg md:text-2xl max-w-3xl mx-auto mb-10 drop-shadow-md font-light">
            Giải pháp chăm sóc chuyên biệt ứng dụng bộ chế phẩm sinh học <span className="font-bold text-white">Farmersmart</span>
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-xl">
            <div className="text-center px-4 border-r border-white/10 last:border-0">
                <p className="text-green-300 text-xs uppercase tracking-widest mb-1">Loại Vườn</p>
                <p className="font-bold text-base md:text-xl text-white">Kinh Doanh</p>
            </div>
             <div className="text-center px-4 border-r border-white/10 last:border-0">
                <p className="text-green-300 text-xs uppercase tracking-widest mb-1">Độ Tuổi</p>
                <p className="font-bold text-base md:text-xl text-white">Trên 9 Năm</p>
            </div>
            <div className="text-center px-4 border-r border-white/10 last:border-0">
                <p className="text-green-300 text-xs uppercase tracking-widest mb-1">Giải Pháp</p>
                <p className="font-bold text-base md:text-xl text-white">Hữu Cơ Vi Sinh</p>
            </div>
            <div className="text-center px-4">
                <p className="text-green-300 text-xs uppercase tracking-widest mb-1">Mục Tiêu</p>
                <p className="font-bold text-base md:text-xl text-white">Bền Vững</p>
            </div>
          </div>
      </div>

      {/* Config Button (Hidden until hover) */}
      <button 
        className="absolute top-4 right-4 z-50 bg-white/20 hover:bg-white text-white hover:text-gray-800 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm"
        onClick={() => setShowConfig(true)}
        title="Cấu hình Header"
      >
        <SettingsIcon className="w-5 h-5" />
      </button>

      {/* Config Modal */}
      <ConfigModal 
        isOpen={showConfig} 
        onClose={() => setShowConfig(false)} 
        media={mediaList}
        onSave={handleSaveConfig}
      />
    </header>
  );
};

// --- Main List Component ---
const TimelineCard: React.FC<{ item: TimelineItemData, index: number, onClick: () => void }> = ({ item, index, onClick }) => {
  const isEven = index % 2 === 0;

  return (
    <div className={`relative flex items-start mb-12 md:mb-24 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} group`}>
      
      {/* Day Badge */}
      <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 -translate-y-4 md:-translate-y-1/2 z-20">
        <div className="bg-white border-4 border-green-500 text-green-800 font-bold rounded-full w-16 h-16 md:w-20 md:h-20 flex flex-col items-center justify-center shadow-lg transition-transform hover:scale-110 z-20">
          <span className="text-[10px] md:text-xs uppercase text-gray-500 font-bold">Ngày</span>
          <span className="text-xl md:text-3xl leading-none font-extrabold">{item.day}</span>
        </div>
      </div>

      {/* Content Card */}
      <div 
        className={`ml-16 md:ml-0 w-full md:w-[calc(50%-40px)] bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden cursor-pointer ${item.stage === 'flowering' ? 'ring-2 ring-yellow-400' : ''}`}
        onClick={onClick}
      >
        
        <div className="p-5">
          <div className="flex justify-between items-start mb-2">
            <StageBadge stage={item.stage} label={item.stageLabel} />
            {item.stage === 'flowering' && <FlowerIcon className="w-5 h-5 text-yellow-500 animate-pulse" />}
          </div>
          
          <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-green-700 transition-colors">
            {item.title}
          </h3>
          
          <div className="mb-4">
             <ImagePlaceholder type={item.imageType} text={item.title} imageUrl={item.imageUrl} />
          </div>

          <div className="flex items-start gap-2 text-gray-600 mb-3">
             <div className="mt-1 min-w-[20px]"><item.icon className="w-5 h-5 text-green-600"/></div>
             <p className="text-sm font-medium leading-relaxed line-clamp-2">{item.action}</p>
          </div>
          
          <div className="mt-4 text-center">
            <span className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full flex items-center justify-center gap-1 w-full hover:bg-green-100 transition-colors">
               Xem Chi Tiết <ChevronRightIcon className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>

      {/* Empty space for desktop layout balance */}
      <div className="hidden md:block w-[calc(50%-40px)]"></div>
    </div>
  );
};

const FilterButton = ({ label, active, onClick, colorClass }: { label: string, active: boolean, onClick: () => void, colorClass: string }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 transform hover:scale-105 shadow-sm border ${
      active 
        ? `${colorClass} text-white shadow-md scale-105` 
        : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
    }`}
  >
    {label}
  </button>
);

// --- Detail View Component ---
const DetailView = ({ item, onBack }: { item: TimelineItemData, onBack: () => void }) => {
    const [selectedStep, setSelectedStep] = useState<RichStep | null>(null);
    const [showPHModal, setShowPHModal] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl animate-fade-in">
            <Breadcrumb 
                onNavigate={onBack}
                items={[
                    { label: item.stageLabel, action: onBack },
                    { label: item.title }
                ]} 
            />

            {/* Hero Section */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
                <div className="relative h-64 md:h-80 bg-gray-200">
                     {item.imageUrl ? (
                         <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                     ) : (
                         <div className="w-full h-full flex items-center justify-center bg-green-50">
                             <item.icon className="w-24 h-24 text-green-200" />
                         </div>
                     )}
                     <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                     <div className="absolute bottom-0 left-0 p-6 md:p-8 text-white">
                         <StageBadge stage={item.stage} label={item.stageLabel} />
                         <h1 className="text-3xl md:text-4xl font-bold mt-2">{item.title}</h1>
                     </div>
                </div>
                
                {/* Main Info Cards */}
                <div className="p-6 md:p-8 grid md:grid-cols-2 gap-6">
                     <div className="bg-blue-50 p-5 rounded-xl border border-blue-100">
                         <h3 className="flex items-center text-blue-800 font-bold mb-3">
                             <SprayIcon className="w-5 h-5 mr-2" />
                             Hoạt Động Chính
                         </h3>
                         <p className="text-gray-700 leading-relaxed mb-4">{item.action}</p>
                         
                         {/* Special Button for Soil Treatment (ID 2) */}
                         {item.id === 2 && (
                           <button 
                             onClick={() => setShowPHModal(true)}
                             className="w-full flex items-center justify-center gap-2 bg-white border border-blue-200 text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-lg font-bold text-sm transition-colors shadow-sm"
                           >
                             <InfoIcon className="w-4 h-4" /> Tìm hiểu chi tiết về pH
                           </button>
                         )}
                     </div>
                     <div className="bg-yellow-50 p-5 rounded-xl border border-yellow-100">
                         <h3 className="flex items-center text-yellow-800 font-bold mb-3">
                             <CheckCircleIcon className="w-5 h-5 mr-2" />
                             Mục Tiêu
                         </h3>
                         <p className="text-gray-700 leading-relaxed">{item.purpose}</p>
                     </div>
                </div>
            </div>

            {/* PH Guide Modal */}
            <PHGuideModal isOpen={showPHModal} onClose={() => setShowPHModal(false)} />

            {/* Rich Detail Content (5 Steps for Item 1) */}
            {item.richDetail ? (
                <div className="mb-10">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Quy Trình Chi Tiết</h2>
                    <p className="text-gray-600 mb-6 leading-relaxed border-l-4 border-green-500 pl-4 italic">
                        {item.richDetail.intro}
                    </p>
                    
                    <div className="space-y-4 relative">
                        {item.richDetail.steps.map((step, idx) => (
                            <div 
                              key={idx} 
                              onClick={() => setSelectedStep(step)}
                              className="group relative bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-lg hover:border-green-300 transition-all duration-300 flex gap-4 cursor-pointer"
                            >
                                <div className="flex-shrink-0 mt-1">
                                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors">
                                        {step.icon ? <step.icon className="w-6 h-6"/> : <span className="font-bold">{idx + 1}</span>}
                                    </div>
                                </div>
                                <div className="flex-grow">
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-green-700 transition-colors">{step.title}</h3>
                                        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full group-hover:bg-green-100 group-hover:text-green-700 transition-colors">Xem chi tiết</span>
                                    </div>
                                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">{step.content}</p>
                                </div>

                                {/* HOVER CARD - Desktop Only */}
                                <div className="hidden md:block absolute left-[102%] top-1/2 -translate-y-1/2 w-72 bg-white rounded-xl shadow-2xl border border-green-200 p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 pointer-events-none">
                                    {/* Arrow pointing left */}
                                    <div className="absolute top-1/2 -left-2 -translate-y-1/2 border-t-8 border-b-8 border-r-8 border-transparent border-r-white drop-shadow-sm"></div>
                                    
                                    {/* Image Area */}
                                    <div className="w-full h-40 bg-gray-100 rounded-lg mb-3 overflow-hidden relative">
                                        {step.imageUrl ? (
                                            <img src={step.imageUrl} alt={step.title} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-green-50">
                                                 {step.icon ? <step.icon className="w-16 h-16 text-green-200" /> : <LeafIcon className="w-16 h-16 text-green-200" />}
                                            </div>
                                        )}
                                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                                            <span className="text-white text-xs font-bold bg-green-600 px-2 py-0.5 rounded">
                                                Bước {idx + 1}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <h4 className="font-bold text-gray-800 text-sm mb-1">{step.title}</h4>
                                    <p className="text-xs text-gray-500 line-clamp-4 leading-relaxed">
                                        {step.content}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="bg-gray-50 rounded-xl p-8 text-center mb-10 border border-dashed border-gray-300">
                    <p className="text-gray-500">Thông tin chi tiết cho giai đoạn này đang được cập nhật.</p>
                </div>
            )}

            {/* Step Modal */}
            <BaseModal
              isOpen={!!selectedStep}
              onClose={() => setSelectedStep(null)}
              title={selectedStep?.title || "Chi Tiết"}
              initialWidth={600}
              initialHeight={500}
            >
               {selectedStep && (
                 <div className="space-y-4">
                    {selectedStep.imageUrl && (
                      <div className="rounded-xl overflow-hidden shadow-md">
                        <img src={selectedStep.imageUrl} alt={selectedStep.title} className="w-full h-64 object-cover" />
                      </div>
                    )}
                    <div className="prose prose-green max-w-none">
                        <h4 className="text-xl font-bold text-green-800 mb-2">Mô tả chi tiết</h4>
                        <p className="text-gray-700 text-lg leading-relaxed">
                            {selectedStep.content}
                        </p>
                    </div>
                    {/* Render additional hoverDetail if different from content, but here content is the main part */}
                    {selectedStep.hoverDetail && selectedStep.hoverDetail !== selectedStep.content && (
                         <div className="bg-green-50 p-4 rounded-lg border border-green-100 text-sm text-gray-600 italic">
                             {selectedStep.hoverDetail}
                         </div>
                    )}
                 </div>
               )}
            </BaseModal>

            {/* Products Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-green-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <LeafIcon className="w-6 h-6 mr-2 text-green-600" />
                    Sản Phẩm Farmersmart Khuyên Dùng
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {item.products.map((prod, idx) => (
                        <div key={idx} className="bg-green-50 rounded-lg p-4 border border-green-200 flex items-center space-x-3 hover:bg-green-100 transition-colors">
                             <FarmersmartLogo variant="icon" className="w-10 h-10 flex-shrink-0" />
                             <span className="font-semibold text-green-900">{prod}</span>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="mt-8 text-center">
                <button onClick={onBack} className="text-green-600 font-bold hover:underline">
                    &larr; Quay lại quy trình
                </button>
            </div>
        </div>
    );
};

const App = () => {
  const [filter, setFilter] = useState('all');
  const [view, setView] = useState<'list' | 'detail'>('list');
  const [selectedItem, setSelectedItem] = useState<TimelineItemData | null>(null);

  const filteredData = filter === 'all' 
    ? timelineData 
    : timelineData.filter(item => item.stage === filter);

  const handleItemClick = (item: TimelineItemData) => {
      setSelectedItem(item);
      setView('detail');
  };

  const handleBack = () => {
      setView('list');
      setSelectedItem(null);
  };

  if (view === 'detail' && selectedItem) {
      return (
        <div className="min-h-screen pb-20 bg-gradient-to-b from-green-50 to-white">
             {/* Minimal Header for Detail View */}
             <header className="bg-green-800 text-white py-4 sticky top-0 z-30 shadow-md">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={handleBack}>
                        <FarmersmartLogo className="h-8 w-auto" light={true} />
                    </div>
                </div>
             </header>
             <DetailView item={selectedItem} onBack={handleBack} />
             <BackToTopButton />
        </div>
      );
  }

  return (
    <div className="min-h-screen pb-20 bg-gradient-to-b from-green-50 to-white">
      {/* Replaced old header with CarouselHeader */}
      <CarouselHeader />

      {/* Sticky Navigation Filter */}
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-md shadow-sm border-b border-green-100 py-4">
        <div className="container mx-auto px-4 overflow-x-auto no-scrollbar">
          <div className="flex md:justify-center space-x-2 min-w-max px-2">
            <FilterButton 
              label="Tất Cả" 
              active={filter === 'all'} 
              onClick={() => setFilter('all')} 
              colorClass="bg-green-800"
            />
            <FilterButton 
              label="Phục Hồi" 
              active={filter === 'recovery'} 
              onClick={() => setFilter('recovery')} 
              colorClass="bg-stone-600"
            />
            <FilterButton 
              label="Cơi Đọt (Sinh Trưởng)" 
              active={filter === 'growth'} 
              onClick={() => setFilter('growth')} 
              colorClass="bg-green-600"
            />
            <FilterButton 
              label="Làm Bông (Ra Hoa)" 
              active={filter === 'flowering'} 
              onClick={() => setFilter('flowering')} 
              colorClass="bg-yellow-500 border-yellow-500"
            />
          </div>
        </div>
      </div>

      {/* Main Timeline Content */}
      <main className="container mx-auto px-4 py-12 relative min-h-[800px]">
        {/* Vertical Line */}
        <div className="timeline-line"></div>

        <div className="relative z-10">
          {filteredData.map((item, index) => (
            <TimelineCard 
                key={item.id} 
                item={item} 
                index={index} 
                onClick={() => handleItemClick(item)}
            />
          ))}
        </div>

        {filteredData.length === 0 && (
           <div className="text-center py-20 text-gray-500">
             Không có dữ liệu cho giai đoạn này.
           </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-green-900 text-green-300 py-12">
         <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center mb-6">
                <FarmersmartLogo className="h-12 w-auto text-white" light={true} />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Công Ty Cổ Phần Farmersmart</h2>
            <p className="mb-2">Địa chỉ: Ấp Tân Long, Xã Tân Dương, Tỉnh Đồng Tháp</p>
            <p className="mb-6">Hotline: 0908.119.987</p>
            <div className="border-t border-green-800 pt-6 text-sm">
               <p>Lưu ý: Quy trình và liều lượng có thể thay đổi tùy theo diễn biến thực tế của thời tiết và sức khỏe cây trồng.</p>
            </div>
         </div>
      </footer>
      
      <BackToTopButton />
    </div>
  );
};

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);
