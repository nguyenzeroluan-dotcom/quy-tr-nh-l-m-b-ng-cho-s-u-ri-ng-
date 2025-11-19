import { TimelineItemData } from '../types';
import { 
  ScissorsIcon, DropletIcon, SprayIcon, LeafIcon, 
  FlowerIcon
} from '../components/Icons';

// --- Data ---
export const timelineData: TimelineItemData[] = [
  {
    id: 1,
    day: "01/10/2025",
    stage: "recovery",
    stageLabel: "Sau Thu Hoạch & Xử Lý Vườn",
    title: "Cải Tạo & Vệ Sinh Vườn",
    action: "Cắt cành tạo tán, cắt cỏ, xới đất quanh gốc.",
    purpose: "Tạo thông thoáng, hạn chế cạnh tranh dinh dưỡng, hạn chế mầm bệnh và côn trùng gây hại.",
    products: ["Dụng cụ làm vườn"],
    productDetails: [
      { name: "Cắt cành tạo tán", purpose: "Tạo thông thoáng, hạn chế mầm bệnh", dosage: "Ngày 01/10/2025", unit: "Lần", quantity: 1, totalCost: 2000000 },
      { name: "Cắt cỏ, xới đất quanh gốc", purpose: "Hạn chế cạnh tranh dinh dưỡng", dosage: "Ngày 01/10/2025", unit: "Lần", quantity: 1, totalCost: 1000000 }
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
    day: "16/10/2025",
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
      { name: "Cây khỏe 90 (tưới gốc)", purpose: "Quản lý côn trùng gây hại trong đất", dosage: "Tưới gốc", unit: "kg", quantity: 2, totalCost: 466000 },
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
    day: "31/10/2025 - 14/11/2025",
    stage: "growth",
    stageLabel: "Cơi Đọt 1: Dưỡng Lá",
    title: "Bảo Vệ & Dưỡng Cơi Đọt 1 (Lá)",
    action: "Phun định kỳ 7 ngày/lần để ngừa côn trùng và dưỡng lá.",
    purpose: "Ngừa rầy xanh, bọ trĩ, nấm bệnh tấn công cơi đọt non. Bổ sung dinh dưỡng giúp lá mở to, dày.",
    products: ["NPK 30-10-10", "Cây khỏe 90", "Cây khỏe 180", "Cây khỏe 50"],
    productDetails: [
      { name: "NPK 30-10-10", purpose: "Dinh dưỡng phục hồi", dosage: "Dinh dưỡng", unit: "kg", quantity: 506, totalCost: 8602000 },
      { name: "Cây khỏe 90 (Phun lần 1)", purpose: "Quản lý côn trùng gây hại (phun lá)", dosage: "Ngày 31/10/2025", unit: "kg", quantity: 2, totalCost: 466000 },
      { name: "Cây khỏe 180 (Phun lần 1)", purpose: "Phòng bệnh", dosage: "Ngày 31/10/2025", unit: "lít", quantity: 2, totalCost: 378000 },
      { name: "Cây khỏe 50 (Phun lần 1)", purpose: "Bám dính", dosage: "Ngày 31/10/2025", unit: "ml", quantity: 500, totalCost: 56000 },
      { name: "Cây khỏe 90 (Phun lần 2)", purpose: "Quản lý côn trùng gây hại (phun lá)", dosage: "Ngày 07/11/2025", unit: "kg", quantity: 2, totalCost: 466000 },
      { name: "Cây khỏe 180 (Phun lần 2)", purpose: "Phòng bệnh", dosage: "Ngày 07/11/2025", unit: "lít", quantity: 2, totalCost: 378000 },
      { name: "Cây khỏe 50 (Phun lần 2)", purpose: "Bám dính", dosage: "Ngày 07/11/2025", unit: "ml", quantity: 500, totalCost: 56000 },
      { name: "Cây khỏe 90 (Phun lần 3)", purpose: "Quản lý côn trùng gây hại (phun lá)", dosage: "Ngày 14/11/2025", unit: "kg", quantity: 2, totalCost: 466000 },
      { name: "Cây khỏe 180 (Phun lần 3)", purpose: "Phòng bệnh", dosage: "Ngày 14/11/2025", unit: "lít", quantity: 2, totalCost: 378000 },
      { name: "Cây khỏe 50 (Phun lần 3)", purpose: "Bám dính", dosage: "Ngày 14/11/2025", unit: "ml", quantity: 500, totalCost: 56000 },
    ],
    totalCost: 11302000,
    icon: SprayIcon,
    imageType: "spray_protection",
    imageUrl: "https://tapdoanvinasa.com/wp-content/uploads/2023/05/coi-dot-sau-rieng-tap-doan-vinasa-com-2.jpg"
  },
  {
    id: 4,
    day: "15/12/2025 - 14/01/2026",
    stage: "growth",
    stageLabel: "Cơi Đọt 2",
    title: "Dưỡng Cơi Đọt 2 (Hoàn Chỉnh Tán)",
    action: "Tiếp tục quy trình bảo vệ và dưỡng lá cho cơi 2.",
    purpose: "Hoàn thiện bộ lá khỏe mạnh để chuẩn bị làm bông.",
    products: ["NPK 30-10-10", "Combo Phun Cây Khỏe"],
    productDetails: [
      { name: "Combo Phun Lần 1", purpose: "Ngừa côn trùng, phòng bệnh, bám dính", dosage: "Ngày 15/12/2025", unit: "Lần", quantity: 1, totalCost: 900000 },
      { name: "NPK 30-10-10", purpose: "Dinh dưỡng", dosage: "Dinh dưỡng", unit: "kg", quantity: 506, totalCost: 8602000 },
      { name: "Combo Phun Lần 2", purpose: "Ngừa côn trùng, phòng bệnh, bám dính", dosage: "Ngày 22/12/2025", unit: "Lần", quantity: 1, totalCost: 900000 },
      { name: "Combo Phun Lần 3", purpose: "Ngừa côn trùng, phòng bệnh, bám dính", dosage: "Ngày 29/12/2025", unit: "Lần", quantity: 1, totalCost: 900000 },
      { name: "NPK 30-10-10", purpose: "Dinh dưỡng", dosage: "Ngày 14/01/2026", unit: "kg", quantity: 506, totalCost: 8602000 },
    ],
    totalCost: 19904000,
    icon: LeafIcon,
    imageType: "leaf_growth",
    imageUrl: "https://tapdoanvinasa.com/wp-content/uploads/2022/04/dot-sau-rieng2.jpg"
  },
  {
    id: 5,
    day: "29/01/2026 - 12/02/2026",
    stage: "flowering",
    stageLabel: "Cơi 3 & Chuẩn Bị Làm Bông",
    title: "Tạo Mầm Hoa & Dằn Lân",
    action: "Bón Lân Văn Điển gốc và phun tạo mầm.",
    purpose: "Chuyển cây sang giai đoạn sinh sản, phân hóa mầm hoa.",
    products: ["Lân Văn Điển", "Combo Phun Cây Khỏe"],
    productDetails: [
      { name: "Combo Phun (Cơi 3)", purpose: "Bảo vệ cơi đọt 3", dosage: "Ngày 29/01/2026", unit: "Lần", quantity: 1, totalCost: 900000 },
      { name: "Lân Văn Điển", purpose: "Làm bông (Bón gốc)", dosage: "Bón gốc", unit: "kg", quantity: 1518, totalCost: 13662000 },
      { name: "Combo Phun (Tạo mầm 1)", purpose: "Tạo mầm, phòng bệnh", dosage: "Ngày 05/02/2026", unit: "Lần", quantity: 1, totalCost: 900000 },
      { name: "Combo Phun (Tạo mầm 2)", purpose: "Tạo mầm, phòng bệnh", dosage: "Ngày 12/02/2026", unit: "Lần", quantity: 1, totalCost: 900000 },
    ],
    totalCost: 16362000,
    icon: FlowerIcon,
    imageType: "bloom_initiation",
    imageUrl: "https://vinadurian.com/wp-content/uploads/2023/12/5-san-pham-tao-mam-hoa-sau-rieng-03.jpg"
  },
  {
    id: 6,
    day: "28/02/2026 - 28/03/2026",
    stage: "flowering",
    stageLabel: "Giai Đoạn Làm Bông",
    title: "Siết Nước & Kích Thích Ra Hoa",
    action: "Mở 3 cặp lá, phun 10-60-10 định kỳ 7 ngày/lần.",
    purpose: "Ức chế sinh trưởng, kích thích cây ra hoa đồng loạt.",
    products: ["DAP", "Kali Sunfat", "10-60-10"],
    productDetails: [
      { name: "DAP + Kali Sunfat (1:1)", purpose: "Làm bông (Mở 3 cặp lá)", dosage: "Ngày 28/02/2026", unit: "kg", quantity: 760, totalCost: 9120000 },
      { name: "Phun 10-60-10 (Lần 1)", purpose: "Làm bông", dosage: "Ngày 28/02/2026", unit: "kg", quantity: 1, totalCost: 40000 },
      { name: "Phun 10-60-10 (Lần 2)", purpose: "Làm bông", dosage: "Ngày 07/03/2026", unit: "kg", quantity: 1, totalCost: 40000 },
      { name: "Phun 10-60-10 (Lần 3)", purpose: "Làm bông", dosage: "Ngày 14/03/2026", unit: "kg", quantity: 1, totalCost: 40000 },
      { name: "Phun 10-60-10 (Lần 4)", purpose: "Làm bông", dosage: "Ngày 21/03/2026", unit: "kg", quantity: 1, totalCost: 40000 },
      { name: "Phun 10-60-10 (Lần 5)", purpose: "Làm bông", dosage: "Ngày 28/03/2026", unit: "kg", quantity: 1, totalCost: 40000 },
    ],
    totalCost: 9320000,
    icon: FlowerIcon,
    imageType: "flower_bud",
    imageUrl: "https://nhatnonggroup.com/wp-content/uploads/2022/11/mat-cua-sau-rieng-bi-den-kho-va-cach-khac-phuc-nhatnonggroup-com-2.jpg"
  },
  {
    id: 7,
    day: "01/04/2026 - 06/04/2026",
    stage: "flowering",
    stageLabel: "Giai Đoạn Ra Hoa",
    title: "Kéo Mắt Cua & Ra Hoa Đồng Loạt",
    action: "Phun KNO3 phá miên trạng, kích thích ra hoa.",
    purpose: "Giúp mắt cua sáng, ra hoa đều, hạn chế nghẹn hoa.",
    products: ["KNO3"],
    productDetails: [
      { name: "Phun KNO3 (Lần 1)", purpose: "Ra hoa đồng loạt (Mắt cua)", dosage: "Ngày 01/04/2026", unit: "kg", quantity: 38, totalCost: 4750000 },
      { name: "Phun KNO3 (Lần 2)", purpose: "Ra hoa đồng loạt", dosage: "Ngày 06/04/2026", unit: "kg", quantity: 19, totalCost: 2375000 },
    ],
    totalCost: 7125000,
    icon: FlowerIcon,
    imageType: "bloom_initiation",
    imageUrl: "https://nhatnonggroup.com/wp-content/uploads/2022/11/mat-cua-sau-rieng-bi-den-kho-va-cach-khac-phuc-nhatnonggroup-com-2.jpg"
  }
];
