
import React from 'react';
import { 
  ScissorsIcon, DropletIcon, SprayIcon, LeafIcon, 
  FlowerIcon
} from './components/Icons';

// --- Types ---

export type RichStep = {
  title: string;
  content: string;
  icon?: React.FC<{ className?: string }>;
  imageUrl?: string;
  hoverDetail?: string;
};

export type TimelineItemData = {
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
export const timelineData: TimelineItemData[] = [
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
      intro: "Sau một vụ mùa bội thu, cây sầu riêng bị mất sức rất nhiều. Việc cải tạo đất và vệ sinh vườn ngay sau thu hoạch là bước then chốt để cây phục hồi nhanh, sẵn sàng cho vụ mùa tiếp theo. Dưới đây là các bước chuẩn hóa:",
      steps: [
        {
          title: "Bước 1: Vệ sinh tàn dư thực vật",
          content: "Sau khi thu hoạch, tiến hành cắt bỏ các cành khô, cành sâu bệnh, cuống trái còn sót lại. Thu gom toàn bộ tàn dư ra khỏi vườn và tiêu hủy để loại bỏ nơi trú ngụ của nấm bệnh và sâu hại.\n\nTạo thông thoáng, hạn chế cạnh tranh dinh dưỡng, hạn chế mầm bệnh và côn trùng gây hại.",
          icon: ScissorsIcon,
          imageUrl: "https://lh7-rt.googleusercontent.com/docsz/AD_4nXcg4sSs3hVnLhBvBtDIlPddaxEbRWJpXeukguH6x-gDpxTmXbuppI-q-cxfOWB51lhAffDOA699AzwaGJSSHenOPzn0_fUmsfggYjcAHbF-SSSU-8Erih4X8o5lwv0hR8Q7An21cw?key=HW9Is8Th0VJ0Ln4U3kUKOP64"
        },
        {
          title: "Bước 2: Xới mô, kích thích rễ",
          content: "Sử dụng cuốc hoặc chĩa xới nhẹ lớp đất mặt quanh tán cây (sâu 5-7cm). Việc này giúp phá vỡ lớp đất nén chặt, tạo độ thông thoáng (Oxy) cho rễ hô hấp và hấp thu dinh dưỡng tốt hơn.\n\nTạo thông thoáng, hạn chế cạnh tranh dinh dưỡng, hạn chế mầm bệnh và côn trùng gây hại.",
          icon: LeafIcon,
          imageUrl: "https://vinadurian.com/wp-content/uploads/2023/08/bon-phan-qua-la-sau-rieng-khi-nao-la-thich-hop-02.jpg"
        },
        {
            title: "Bước 3: Rửa vườn",
            content: "Phun thuốc tẩy rửa vườn để diệt rong rêu, nấm khuẩn bám trên thân, cành, lá.",
            icon: SprayIcon,
            imageUrl: "https://cdn.vnfarm.com.vn/san-pham/nano-cu-3.jpg"
        }
      ]
    }
  },
  {
    id: 2,
    day: 7,
    stage: "recovery",
    stageLabel: "Sau Thu Hoạch & Xử Lý Vườn",
    title: "Xử Lý Đất & Kích Rễ",
    action: "Tưới phục hồi, nâng pH đất, phân hủy hữu cơ và ngừa tuyến trùng.",
    purpose: "Cải tạo đất, nâng pH, phòng bệnh rễ, bổ sung dinh dưỡng hữu cơ.",
    products: ["Tưới Gốc: pH Đất, Fulvic, Vi sinh vật"],
    icon: DropletIcon,
    imageType: "soil_treatment",
    imageUrl: "https://tincay.com/wp-content/uploads/2024/07/trai-nghiem-cac-vuon-sau-rieng-sieu-trai-o-tay-nguyen-08.jpg",
    richDetail: {
      intro: "Bộ rễ khỏe là nền tảng cho cây sầu riêng phát triển bền vững. Giai đoạn này tập trung vào việc cân bằng lại môi trường đất và kích thích hệ rễ mới phát triển mạnh.",
      steps: [
        {
          title: "Tưới phục hồi & Nâng pH",
          content: "Cung cấp dinh dưỡng dễ hấp thu để cây hồi sức, đồng thời nâng pH đất lên ngưỡng thích hợp (5.5 - 6.5) giúp rễ hấp thu khoáng chất tối đa.",
          icon: DropletIcon
        },
        {
          title: "Phân hủy hữu cơ",
          content: "Bổ sung hệ vi sinh vật phân giải các chất hữu cơ khó tiêu trong đất thành dinh dưỡng cho cây.",
          icon: LeafIcon
        },
        {
          title: "Ngừa tuyến trùng",
          content: "Xử lý các loại nấm bệnh và tuyến trùng hại rễ tiềm ẩn trong đất.",
          icon: SprayIcon
        }
      ]
    }
  },
  {
    id: 3,
    day: 15,
    stage: "growth",
    stageLabel: "Cơi Đọt 1: Phục Hồi & Sinh Trưởng",
    title: "Bảo Vệ Đọt Non (Lần 1)",
    action: "Phun thuốc rầy, rệp sáp, bọ trĩ khi đọt vừa nhú (mũi giáo).",
    purpose: "Bảo vệ bộ lá non khỏi côn trùng chích hút, giúp lá phát triển hoàn chỉnh.",
    products: ["Thuốc trừ sâu (gốc sinh học hoặc hóa học)", "Amino Acid"],
    icon: SprayIcon,
    imageType: "spray_protection",
    imageUrl: "https://tapdoanvinasa.com/wp-content/uploads/2023/05/coi-dot-sau-rieng-tap-doan-vinasa-com-2.jpg"
  },
  {
    id: 4,
    day: 22,
    stage: "growth",
    stageLabel: "Cơi Đọt 1: Phục Hồi & Sinh Trưởng",
    title: "Kéo Đọt & Dưỡng Lá",
    action: "Phun dưỡng chất qua lá (NPK tỉ lệ đạm cao, Vi lượng).",
    purpose: "Giúp đọt vươn dài, lá mở to, dày và xanh mướt.",
    products: ["Phân bón lá 30-10-10", "Combi", "Kích thích sinh trưởng"],
    icon: LeafIcon,
    imageType: "leaf_growth",
    imageUrl: "https://tapdoanvinasa.com/wp-content/uploads/2022/04/dot-sau-rieng2.jpg"
  },
  {
    id: 5,
    day: 45,
    stage: "flowering",
    stageLabel: "Giai Đoạn Làm Bông (Nghịch Vụ/Thuận Vụ)",
    title: "Tạo Mầm Hoa",
    action: "Bón phân Lân & Kali cao (gốc), Phun tạo mầm (lá).",
    purpose: "Chuyển đổi trạng thái sinh lý từ sinh trưởng sang sinh sản, phân hóa mầm hoa.",
    products: ["Lân 86", "MKB (0-52-34)", "10-60-10"],
    icon: FlowerIcon,
    imageType: "bloom_initiation",
    imageUrl: "https://vinadurian.com/wp-content/uploads/2023/12/5-san-pham-tao-mam-hoa-sau-rieng-03.jpg"
  },
  {
    id: 6,
    day: 60,
    stage: "flowering",
    stageLabel: "Giai Đoạn Làm Bông",
    title: "Kéo Mắt Cua",
    action: "Tưới nước nhử, phun kích phát tố khi mắt cua sáng.",
    purpose: "Đánh thức mầm hoa, giúp hoa ra đồng loạt, sáng và mập.",
    products: ["Kích phát tố", "Rước mắt cua"],
    icon: DropletIcon,
    imageType: "flower_bud",
    imageUrl: "https://nhatnonggroup.com/wp-content/uploads/2022/11/mat-cua-sau-rieng-bi-den-kho-va-cach-khac-phuc-nhatnonggroup-com-2.jpg"
  }
];
