
import React from 'react';
import { 
  ScissorsIcon, DropletIcon, SprayIcon, LeafIcon, 
  FlowerIcon
} from './components/Icons';

// --- Types ---

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

// --- Categories Label Helper ---
export const CATEGORY_LABELS: Record<string, string> = {
    tool: "Dụng Cụ & Thiết Bị Đo",
    nutrition: "Dinh Dưỡng & Cải Tạo Đất",
    protection: "Bảo Vệ Thực Vật & Phòng Trừ Sâu Bệnh",
    other: "Sản Phẩm Khác"
};

// --- Product Database ---
export const PRODUCT_DB: Record<string, ProductInfo> = {
  // --- DỤNG CỤ (TOOLS) ---
  "ph_meter_dm15": {
      id: "ph_meter_dm15",
      category: "tool",
      name: "Máy Đo pH và Độ Ẩm Đất Takemura DM-15",
      imageUrl: "https://sieuthidienmaychinhhang.com/upload/images/thiet-bi-do/but-do-ph/550x550/1/May-do-pH-va-do-am-dat-Takemura-DM-15-Nhat-Ban-duoc-thiet-ke-gon-nhe.jpg",
      description: "Thiết bị đo pH đất chuyên dụng từ Nhật Bản, không cần pin, độ chính xác cao.",
      benefits: [
          "Đo chính xác độ pH đất (1-8) và độ ẩm.",
          "Không cần dùng pin, dễ sử dụng.",
          "Đầu dò nhạy, bền bỉ với môi trường nông nghiệp.",
          "Giúp bà con kiểm soát pH để xử lý đất kịp thời."
      ],
      usage: "Cắm ngập đầu kim loại vào đất ẩm, đợi 1 phút và đọc chỉ số."
  },
  "litmus_paper": {
      id: "litmus_paper",
      category: "tool",
      name: "Giấy Quỳ Đo pH Nước (Tệp 80 lá)",
      imageUrl: "https://cdn.hstatic.net/products/200001048938/b9ca3b64-19cf-459a-87ea-ed11230cc40d_ba75927a4f95480cb9780651103db237_master.jpg",
      description: "Giải pháp kiểm tra nhanh độ pH của nước tưới và dung dịch pha thuốc.",
      benefits: [
          "Chi phí thấp, dễ sử dụng.",
          "Kiểm tra nhanh pH nước trước khi pha thuốc BVTV.",
          "Tránh hiện tượng kết tủa thuốc do pH nước không phù hợp."
      ],
      usage: "Nhúng giấy vào nước 1 giây, so màu với bảng màu đi kèm."
  },

  // --- DINH DƯỠNG (NUTRITION) ---
  "ck70": {
    id: "ck70",
    category: "nutrition",
    name: "FMS - CÂY KHOẺ 70 (Tinh Vôi)",
    imageUrl: "https://lavish-kitty-16b.notion.site/image/attachment%3A4e4be20e-c1c3-46e2-a646-2a5d9d001ed8%3Ack70.jpg?table=block&id=2b0a0a49-3a08-8007-b34c-d76d683e759b&spaceId=228174f8-4a60-4bbf-b8cf-11db580b1ecb&width=1420&userId=&cache=v2", 
    description: "VÔI TINH - BÍ QUYẾT HẠ PHÈN, MẶN. > 90% canxi, phụ gia đặc biệt.",
    benefits: [
      "Hạ phèn, mặn nhanh chóng sau 30 phút.",
      "Giúp bộ rễ phát triển mạnh, chống bó rễ.",
      "Giúp cây hấp thu đầy đủ Đa trung vi lượng.",
      "Giúp cây kháng được nhiều bệnh gây hại.",
      "Vi sinh phân giải kali – cải thiện chất lượng quả."
    ],
    usage: "Pha 1kg với 1000 lít nước tưới đẫm."
  },
  "ck30": {
      id: "ck30",
      category: "nutrition",
      name: "FMS - CÂY KHOẺ 30",
      imageUrl: "https://cdn.nhanh.vn/cdn/store/26493/ps/20240108/8_1657849641_633.jpg", // Placeholder
      description: "Chế phẩm sinh học cố định đạm, hòa tan lân, phân giải kali.",
      benefits: [
          "Cung cấp dinh dưỡng đa lượng tự nhiên từ vi sinh.",
          "Giảm chi phí phân bón hóa học.",
          "Giúp đất tơi xốp, thoáng khí."
      ],
      usage: "Pha 1 lít với 300 lít nước tưới ướt bộ rễ."
  },
  "ck320": {
      id: "ck320",
      category: "nutrition",
      name: "FMS - CÂY KHOẺ 320 (Đạm Cá)",
      imageUrl: "https://abichemical.com.vn/wp-content/uploads/2020/06/dam-ca-hoi-abi.jpg", // Placeholder
      description: "Đạm cá thủy phân cô đặc, giàu Amino Acid.",
      benefits: [
          "Dưỡng lá xanh dày, bóng mượt.",
          "Phục hồi cây suy yếu nhanh chóng.",
          "Cung cấp đạm hữu cơ dễ hấp thu."
      ],
      usage: "Pha 1 lít với 400 lít nước tưới đều gốc cây."
  },
  "combi": {
      id: "combi",
      category: "nutrition",
      name: "Vi Lượng Combi (Gói 25g)",
      imageUrl: "https://nongnghiepthuanthien.vn/wp-content/uploads/2021/05/trung-vi-luong-combi-chelate-nong-nghiep-thuan-thien-5.jpg", // Placeholder
      description: "Tổ hợp vi lượng dạng Chelate giúp cây hấp thụ hoàn toàn.",
      benefits: [
          "Khắc phục hiện tượng vàng lá do thiếu vi lượng.",
          "Giúp trái xanh, gai đều, hạn chế méo trái.",
          "Tăng sức đề kháng cho cây."
      ],
      usage: "Pha 1 gói 25g với 200 lít nước, phun đều trên cây."
  },

  // --- BẢO VỆ THỰC VẬT (PROTECTION) ---
  "ck180": {
      id: "ck180",
      category: "protection",
      name: "FMS - CÂY KHOẺ 180 (Nano Chitosan)",
      imageUrl: "https://cf.shopee.vn/file/d3860b86836e41188690946692197851", // Placeholder
      description: "Vắc xin thực vật - Phòng trừ nấm bệnh và vi khuẩn.",
      benefits: [
          "Cô lập vết bệnh, ngăn chặn nấm khuẩn lây lan.",
          "Kích thích cơ chế tự vệ của cây trồng.",
          "An toàn, không gây kháng thuốc."
      ],
      usage: "Pha 1 lít với 400 lít nước, phun đều hoặc tưới gốc."
  },
  "ck90": {
      id: "ck90",
      category: "protection",
      name: "FMS - CÂY KHOẺ 90 (Thảo Mộc)",
      imageUrl: "https://hoangminhagri.com/wp-content/uploads/2023/03/tinh-dau-thao-moc.jpg", // Placeholder
      description: "Chế phẩm xua đuổi và phòng trừ côn trùng từ tinh dầu thảo mộc.",
      benefits: [
          "Xua đuổi rầy xanh, bọ trĩ, nhện đỏ.",
          "Không gây nóng bông, nóng trái.",
          "An toàn cho thiên địch và người sử dụng."
      ],
      usage: "Pha 1kg với 5 lít nước ngâm qua đêm, sau đó pha loãng với 400 lít nước phun."
  },
  "ck50": {
      id: "ck50",
      category: "protection",
      name: "FMS - CÂY KHOẺ 50 (Bám Dính)",
      imageUrl: "https://nongnghiepvietnam.org/wp-content/uploads/2019/08/chat-bam-dinh-sinh-hoc.jpg", // Placeholder
      description: "Chất tăng lực bám dính sinh học.",
      benefits: [
          "Giúp thuốc loang trải đều và bám dính tốt trên bề mặt lá.",
          "Hạn chế rửa trôi khi gặp mưa.",
          "Tăng hiệu lực của thuốc BVTV và phân bón lá."
      ],
      usage: "Chai 500ml pha 800 lít nước."
  },
  "lactobio": {
      id: "lactobio",
      category: "protection",
      name: "LactoBio (Vi Sinh Đối Kháng)",
      imageUrl: "https://chephamsinhhocbio.com/upload/images/che-pham-em-goc-bot.jpg", // Placeholder
      description: "Tập đoàn vi sinh vật hữu ích đối kháng nấm bệnh.",
      benefits: [
          "Tiêu diệt nấm Phytophthora, Fusarium gây thối rễ.",
          "Phân giải rơm rạ, xác bã thực vật.",
          "Cải tạo hệ vi sinh vật đất."
      ],
      usage: "Ngâm kích hoạt rồi pha loãng tưới gốc."
  }
};

// --- Helper Module for Product Links ---
// Use this to get the correct ID structure for navigation
export const ProductHelper = {
    getAllProducts: () => Object.values(PRODUCT_DB),
    getProductById: (id: string) => PRODUCT_DB[id],
    getProductsByCategory: (cat: string) => Object.values(PRODUCT_DB).filter(p => p.category === cat),
    // This returns a command object or string that the App can interpret
    getLinkAction: (id: string) => ({ type: 'navigate_product', payload: id })
};


// --- Product Usage Dictionary (From Page 3) ---
export const PRODUCT_USAGE_GUIDE: Record<string, { usage: string, note?: string }> = {
  "Cây khỏe 30": { usage: "Pha 1 lít với 300 lít nước tưới ướt bộ rễ.", note: "Cố định đạm, hòa tan lân, phân giải kali" },
  "Cây khỏe 70": { usage: "Pha 1kg với 1000 lít nước tưới đẫm.", note: "Nâng pH đất và nước (pH = 6 đến 7 là tốt nhất)" }, // Mapped from CK70
  "Cây khỏe 320": { usage: "Pha 1 lít với 400 lít nước tưới đều gốc cây.", note: "Đạm cá" },
  "Cây khỏe 180": { usage: "Pha 1 lít với 400 lít nước, phun đều trên cây.", note: "Phòng trừ bệnh" }, // Mapped from CK180
  "Cây khỏe 90": { usage: "Pha 1kg với 5 lít nước ngâm qua đêm, sau đó lấy pha với 400 lít nước phun đều trên cây.", note: "Phòng trừ côn trùng" },
  "LactoBio": { usage: "Pha hết gói sản phẩm với thùng nước uống tinh khiết 10 lít, ngâm 1-3 ngày, sau đó pha thêm 400 lít nước phun đều trên cây.", note: "Phòng trừ bệnh" },
  "Vi lượng Combi": { usage: "Pha 1 gói với 200 lít nước, Phun đều trên cây.", note: "Tăng cường vi lượng" },
  "Cây khỏe 50": { usage: "Chai 500ml pha 800 lít nước", note: "Tăng bám dính" },
  "NPK 30-10-10": { usage: "URE = 3,6KG + DAP = 1,8KG + KALI = 0,6KG. Pha 1.500 lít nước tưới chung hệ thống tưới.", note: "Công thức pha 6kg hỗn hợp" },
  "NPK 20-20-15": { usage: "URE = 3KG + DAP = 2,8KG + KALI = 2,2KG. Pha 2.000 lít nước tưới chung hệ thống tưới.", note: "Công thức pha 8kg hỗn hợp" },
  "NPK 13-13-21": { usage: "URE = 2,4KG + DAP = 3KG + KALI = 4,6KG. Pha 2.500 lít nước tưới chung hệ thống tưới.", note: "Công thức pha 10kg hỗn hợp" },
  "CK70": { usage: "Pha 1kg với 1000 lít nước tưới đẫm.", note: "Nâng pH đất và nước" },
  "CK180": { usage: "Pha 1 lít với 400 lít nước, phun đều trên cây (hoặc tưới gốc phòng bệnh).", note: "Phòng bệnh" },
};

// --- Data ---
export const timelineData: TimelineItemData[] = [
  {
    id: 1,
    day: "01/10/25",
    stage: "recovery",
    stageLabel: "Sau Thu Hoạch & Xử Lý Vườn",
    title: "Cải Tạo & Vệ Sinh Vườn",
    action: "Cắt cành tạo tán, cắt cỏ, xới đất quanh gốc.",
    purpose: "Tạo thông thoáng, hạn chế cạnh tranh dinh dưỡng, hạn chế mầm bệnh và côn trùng gây hại.",
    products: ["Dụng cụ làm vườn"],
    productDetails: [
      { name: "Cắt cành tạo tán", purpose: "Tạo thông thoáng, hạn chế mầm bệnh", dosage: "Toàn vườn", unit: "Lần", quantity: 1, totalCost: 2000000 },
      { name: "Cắt cỏ, xới đất quanh gốc", purpose: "Hạn chế cạnh tranh dinh dưỡng", dosage: "Toàn vườn", unit: "Lần", quantity: 1, totalCost: 1000000 }
    ],
    totalCost: 3000000,
    icon: ScissorsIcon,
    imageType: "pruning",
    imageUrl: "https://lh7-rt.googleusercontent.com/docsz/AD_4nXcg4sSs3hVnLhBvBtDIlPddaxEbRWJpXeukguH6x-gDpxTmXbuppI-q-cxfOWB51lhAffDOA699AzwaGJSSHenOPzn0_fUmsfggYjcAHbF-SSSU-8Erih4X8o5lwv0hR8Q7An21cw?key=HW9Is8Th0VJ0Ln4U3kUKOP64",
    richDetail: {
      intro: "Bước đầu tiên và quan trọng nhất để chuẩn bị cho vụ mùa mới.",
      steps: [
        {
          title: "Bước 1: Vệ sinh tàn dư thực vật",
          content: "Thu gom cành khô, trái rụng, tiêu hủy nguồn bệnh.\n\nTạo thông thoáng, hạn chế cạnh tranh dinh dưỡng, hạn chế mầm bệnh và côn trùng gây hại.",
          icon: ScissorsIcon,
          imageUrl: "https://lh7-rt.googleusercontent.com/docsz/AD_4nXcg4sSs3hVnLhBvBtDIlPddaxEbRWJpXeukguH6x-gDpxTmXbuppI-q-cxfOWB51lhAffDOA699AzwaGJSSHenOPzn0_fUmsfggYjcAHbF-SSSU-8Erih4X8o5lwv0hR8Q7An21cw?key=HW9Is8Th0VJ0Ln4U3kUKOP64"
        },
        {
          title: "Bước 2: Xới mô, kích thích rễ",
          content: "Xới nhẹ đất mặt 5-7cm giúp đất tơi xốp, rễ dễ hô hấp.\n\nTạo thông thoáng, hạn chế cạnh tranh dinh dưỡng, hạn chế mầm bệnh và côn trùng gây hại.",
          icon: LeafIcon,
          imageUrl: "https://vinadurian.com/wp-content/uploads/2023/08/bon-phan-qua-la-sau-rieng-khi-nao-la-thich-hop-02.jpg"
        },
        {
          title: "Bước 3: Rửa vườn",
          content: "Phun tẩy rong rêu, nấm khuẩn.",
          icon: SprayIcon,
          imageUrl: "https://cdn.vnfarm.com.vn/san-pham/nano-cu-3.jpg"
        }
      ]
    }
  },
  {
    id: 2,
    day: "16/10/25",
    stage: "recovery",
    stageLabel: "Cơi Đọt 1: Xử Lý Gốc",
    title: "Tưới Phục Hồi & Kích Rễ (Gốc)",
    action: "Tưới bộ sản phẩm phục hồi đất, nâng pH, ngừa tuyến trùng.",
    purpose: "Nâng pH = 6-7, phân hủy hữu cơ, ngừa tuyến trùng, giúp đất tơi xốp.",
    products: ["CK70", "Trichoderma", "Cây khỏe 220", "Cây khỏe 90", "CK180", "Phân bò vi sinh"],
    productDetails: [
      { name: "Tưới CK70", purpose: "Mục tiêu nâng pH = 6 đến 7", dosage: "Cho 100 gốc pH thấp", unit: "kg", quantity: 6, totalCost: 420000 },
      { name: "Trichoderma (tưới gốc)", purpose: "Phân hủy xác hữu cơ", dosage: "Tưới gốc", unit: "kg", quantity: 5, totalCost: 400000 },
      { name: "Cây khỏe 220 (tưới gốc)", purpose: "Ngừa tuyến trùng", dosage: "Tưới gốc", unit: "lít", quantity: 2, totalCost: 452000 },
      { name: "Cây khỏe 90 (tưới gốc)", purpose: "Ngừa côn trùng gây hại", dosage: "Tưới gốc", unit: "kg", quantity: 2, totalCost: 466000 },
      { name: "CK180 (tưới gốc)", purpose: "Phòng bệnh", dosage: "Tưới gốc", unit: "lít", quantity: 2, totalCost: 378000 },
      { name: "Cây khỏe 320 (tưới gốc)", purpose: "Đạm cá", dosage: "Tưới gốc", unit: "lít", quantity: 2, totalCost: 338000 },
      { name: "Phân bò vi sinh Quốc Tế", purpose: "Giúp đất tơi xốp, thêm dinh dưỡng", dosage: "Bón gốc", unit: "kg", quantity: 1265, totalCost: 7590000 },
      { name: "Cây khỏe 30 (tưới gốc)", purpose: "Phát triển rễ, cân bằng NPK, phát triển cơi đọt", dosage: "Tỷ lệ 1/300", unit: "lít", quantity: 30, totalCost: 3795000 }
    ],
    totalCost: 13839000,
    icon: DropletIcon,
    imageType: "soil_treatment",
    imageUrl: "https://tincay.com/wp-content/uploads/2024/07/trai-nghiem-cac-vuon-sau-rieng-sieu-trai-o-tay-nguyen-08.jpg",
    richDetail: {
      intro: "Giai đoạn phục hồi quan trọng nhất để tái tạo bộ rễ.",
      steps: [
        {
          title: "Tưới phục hồi & Nâng pH",
          content: "Sử dụng CK70 để nâng pH đất lên ngưỡng 6-7, kết hợp Trichoderma phân giải hữu cơ.",
          icon: DropletIcon,
          subPageId: "recovery-watering"
        }
      ]
    }
  },
  {
    id: 3,
    day: "31/10 - 14/11",
    stage: "growth",
    stageLabel: "Cơi Đọt 1: Dưỡng Lá",
    title: "Bảo Vệ & Dưỡng Cơi Đọt 1 (Lá)",
    action: "Phun định kỳ 7 ngày/lần để ngừa côn trùng và dưỡng lá.",
    purpose: "Ngừa rầy xanh, bọ trĩ, nấm bệnh tấn công cơi đọt non. Bổ sung dinh dưỡng giúp lá mở to, dày.",
    products: ["NPK 30-10-10", "Cây khỏe 90", "Cây khỏe 180", "Cây khỏe 50"],
    productDetails: [
      { name: "NPK 30-10-10", purpose: "Dinh dưỡng phục hồi", dosage: "Tưới/Phun", unit: "kg", quantity: 506, totalCost: 8602000 },
      { name: "Cây khỏe 90 (Phun lần 1)", purpose: "Ngừa côn trùng gây hại", dosage: "Ngày 31/10", unit: "kg", quantity: 2, totalCost: 466000 },
      { name: "Cây khỏe 180 (Phun lần 1)", purpose: "Phòng bệnh", dosage: "Ngày 31/10", unit: "lít", quantity: 2, totalCost: 378000 },
      { name: "Cây khỏe 50 (Phun lần 1)", purpose: "Bám dính", dosage: "Ngày 31/10", unit: "ml", quantity: 500, totalCost: 56000 },
      { name: "Cây khỏe 90 (Phun lần 2)", purpose: "Ngừa côn trùng gây hại", dosage: "Ngày 07/11", unit: "kg", quantity: 2, totalCost: 466000 },
      { name: "Cây khỏe 180 (Phun lần 2)", purpose: "Phòng bệnh", dosage: "Ngày 07/11", unit: "lít", quantity: 2, totalCost: 378000 },
      { name: "Cây khỏe 50 (Phun lần 2)", purpose: "Bám dính", dosage: "Ngày 07/11", unit: "ml", quantity: 500, totalCost: 56000 },
      { name: "Cây khỏe 90 (Phun lần 3)", purpose: "Ngừa côn trùng gây hại", dosage: "Ngày 14/11", unit: "kg", quantity: 2, totalCost: 466000 },
      { name: "Cây khỏe 180 (Phun lần 3)", purpose: "Phòng bệnh", dosage: "Ngày 14/11", unit: "lít", quantity: 2, totalCost: 378000 },
      { name: "Cây khỏe 50 (Phun lần 3)", purpose: "Bám dính", dosage: "Ngày 14/11", unit: "ml", quantity: 500, totalCost: 56000 },
    ],
    totalCost: 11302000,
    icon: SprayIcon,
    imageType: "spray_protection",
    imageUrl: "https://tapdoanvinasa.com/wp-content/uploads/2023/05/coi-dot-sau-rieng-tap-doan-vinasa-com-2.jpg"
  },
  {
    id: 4,
    day: "15/12 - 14/01",
    stage: "growth",
    stageLabel: "Cơi Đọt 2",
    title: "Dưỡng Cơi Đọt 2 (Hoàn Chỉnh Tán)",
    action: "Tiếp tục quy trình bảo vệ và dưỡng lá cho cơi 2.",
    purpose: "Hoàn thiện bộ lá khỏe mạnh để chuẩn bị làm bông.",
    products: ["NPK 30-10-10", "Combo Phun Cây Khỏe"],
    productDetails: [
      { name: "Combo Phun Lần 1", purpose: "Ngừa côn trùng, phòng bệnh, bám dính", dosage: "Ngày 15/12", unit: "Lần", quantity: 1, totalCost: 900000 },
      { name: "NPK 30-10-10", purpose: "Dinh dưỡng", dosage: "Tưới", unit: "kg", quantity: 506, totalCost: 8602000 },
      { name: "Combo Phun Lần 2", purpose: "Ngừa côn trùng, phòng bệnh, bám dính", dosage: "Ngày 22/12", unit: "Lần", quantity: 1, totalCost: 900000 },
      { name: "Combo Phun Lần 3", purpose: "Ngừa côn trùng, phòng bệnh, bám dính", dosage: "Ngày 29/12", unit: "Lần", quantity: 1, totalCost: 900000 },
      { name: "NPK 30-10-10", purpose: "Dinh dưỡng", dosage: "Ngày 14/01", unit: "kg", quantity: 506, totalCost: 8602000 },
    ],
    totalCost: 19904000,
    icon: LeafIcon,
    imageType: "leaf_growth",
    imageUrl: "https://tapdoanvinasa.com/wp-content/uploads/2022/04/dot-sau-rieng2.jpg"
  },
  {
    id: 5,
    day: "29/01 - 12/02",
    stage: "flowering",
    stageLabel: "Cơi 3 & Chuẩn Bị Làm Bông",
    title: "Tạo Mầm Hoa & Dằn Lân",
    action: "Bón Lân Văn Điển gốc và phun tạo mầm.",
    purpose: "Chuyển cây sang giai đoạn sinh sản, phân hóa mầm hoa.",
    products: ["Lân Văn Điển", "Combo Phun Cây Khỏe"],
    productDetails: [
      { name: "Combo Phun (Cơi 3)", purpose: "Bảo vệ cơi đọt 3", dosage: "Ngày 29/01", unit: "Lần", quantity: 1, totalCost: 900000 },
      { name: "Lân Văn Điển", purpose: "Làm bông (Bón gốc)", dosage: "Bón gốc", unit: "kg", quantity: 1518, totalCost: 13662000 },
      { name: "Combo Phun (Tạo mầm 1)", purpose: "Tạo mầm, phòng bệnh", dosage: "Ngày 05/02", unit: "Lần", quantity: 1, totalCost: 900000 },
      { name: "Combo Phun (Tạo mầm 2)", purpose: "Tạo mầm, phòng bệnh", dosage: "Ngày 12/02", unit: "Lần", quantity: 1, totalCost: 900000 },
    ],
    totalCost: 16362000,
    icon: FlowerIcon,
    imageType: "bloom_initiation",
    imageUrl: "https://vinadurian.com/wp-content/uploads/2023/12/5-san-pham-tao-mam-hoa-sau-rieng-03.jpg"
  },
  {
    id: 6,
    day: "28/02 - 28/03",
    stage: "flowering",
    stageLabel: "Giai Đoạn Làm Bông",
    title: "Siết Nước & Kích Thích Ra Hoa",
    action: "Mở 3 cặp lá, phun 10-60-10 định kỳ 7 ngày/lần.",
    purpose: "Ức chế sinh trưởng, kích thích cây ra hoa đồng loạt.",
    products: ["DAP", "Kali Sunfat", "10-60-10"],
    productDetails: [
      { name: "DAP + Kali Sunfat (1:1)", purpose: "Làm bông (Mở 3 cặp lá)", dosage: "Ngày 28/02", unit: "kg", quantity: 760, totalCost: 9120000 },
      { name: "Phun 10-60-10 (Lần 1)", purpose: "Làm bông", dosage: "Ngày 28/02", unit: "kg", quantity: 1, totalCost: 40000 },
      { name: "Phun 10-60-10 (Lần 2)", purpose: "Làm bông", dosage: "Ngày 07/03", unit: "kg", quantity: 1, totalCost: 40000 },
      { name: "Phun 10-60-10 (Lần 3)", purpose: "Làm bông", dosage: "Ngày 14/03", unit: "kg", quantity: 1, totalCost: 40000 },
      { name: "Phun 10-60-10 (Lần 4)", purpose: "Làm bông", dosage: "Ngày 21/03", unit: "kg", quantity: 1, totalCost: 40000 },
      { name: "Phun 10-60-10 (Lần 5)", purpose: "Làm bông", dosage: "Ngày 28/03", unit: "kg", quantity: 1, totalCost: 40000 },
    ],
    totalCost: 9320000,
    icon: FlowerIcon,
    imageType: "flower_bud",
    imageUrl: "https://nhatnonggroup.com/wp-content/uploads/2022/11/mat-cua-sau-rieng-bi-den-kho-va-cach-khac-phuc-nhatnonggroup-com-2.jpg"
  },
  {
    id: 7,
    day: "01/04 - 06/04",
    stage: "flowering",
    stageLabel: "Giai Đoạn Ra Hoa",
    title: "Kéo Mắt Cua & Ra Hoa Đồng Loạt",
    action: "Phun KNO3 phá miên trạng, kích thích ra hoa.",
    purpose: "Giúp mắt cua sáng, ra hoa đều, hạn chế nghẹn hoa.",
    products: ["KNO3"],
    productDetails: [
      { name: "Phun KNO3 (Lần 1)", purpose: "Ra hoa đồng loạt (Mắt cua)", dosage: "Ngày 01/04", unit: "kg", quantity: 38, totalCost: 4750000 },
      { name: "Phun KNO3 (Lần 2)", purpose: "Ra hoa đồng loạt", dosage: "Ngày 06/04", unit: "kg", quantity: 19, totalCost: 2375000 },
    ],
    totalCost: 7125000,
    icon: FlowerIcon,
    imageType: "bloom_initiation",
    imageUrl: "https://nhatnonggroup.com/wp-content/uploads/2022/11/mat-cua-sau-rieng-bi-den-kho-va-cach-khac-phuc-nhatnonggroup-com-2.jpg"
  }
];
