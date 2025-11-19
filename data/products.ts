import { ProductInfo } from '../types';

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
    imageUrl: "https://lavish-kitty-16b.notion.site/image/attachment%3Aafd8f603-a327-4ede-b4e9-908f3494f0d7%3Ack70_new.jpg?table=block&id=2b0a0a49-3a08-8031-8552-f080457aeb75&spaceId=228174f8-4a60-4bbf-b8cf-11db580b1ecb&width=2000&userId=&cache=v2", 
    description: "VÔI TINH - BÍ QUYẾT HẠ PHÈN, MẶN. > 90% canxi, phụ gia đặc biệt.",
    benefits: [
      "Hạ phèn, mặn nhanh chóng sau 30 phút.",
      "Giúp bộ rễ phát triển mạnh, chống bó rễ.",
      "Giúp cây hấp thu đầy đủ Đa trung vi lượng.",
      "Giúp cây kháng được nhiều bệnh gây hại.",
      "Vi sinh phân giải kali – cải thiện chất lượng quả."
    ],
    usage: "Pha 1kg với 400 lít nước tưới đẫm để nâng pH. Pha 1kg với 50 lít nước để diệt rong rêu."
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
      imageUrl: "https://lavish-kitty-16b.notion.site/image/attachment%3A228b17a1-d6fd-4950-a602-50c02aa0f738%3Az7196617799339_d87b65b0998fe24ae0782ee7489e6417.jpg?table=block&id=2b0a0a49-3a08-808c-b8b4-da8355aed75b&spaceId=228174f8-4a60-4bbf-b8cf-11db580b1ecb&width=2000&userId=&cache=v2",
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
      imageUrl: "https://product.hstatic.net/200000772895/product/z4857480616072_34e078999c81a8f8756629e393128718_e389b90136ed48d38547359d4980f245_master.jpg", 
      description: "Tổ hợp vi lượng dạng Chelate giúp cây hấp thụ hoàn toàn.",
      benefits: [
          "Khắc phục hiện tượng vàng lá do thiếu vi lượng.",
          "Giúp trái xanh, gai đều, hạn chế méo trái.",
          "Tăng sức đề kháng cho cây."
      ],
      usage: "Pha 1 gói 25g với 200 lít nước, phun đều trên cây."
  },
  "phan_bo_vi_sinh": {
    id: "phan_bo_vi_sinh",
    category: "nutrition",
    name: "Phân Bò Hữu Cơ Vi Sinh",
    imageUrl: "https://sfarm.vn/wp-content/uploads/2024/11/che-pham-vi-sinh-la-gi-cong-dung-cach-dung-1-scaled.jpg",
    description: "Phân bò được xử lý với quy trình kỹ thuật cao, chứa các vi sinh vật có lợi giúp phân giải Cellulose và kháng bệnh trong đất.",
    benefits: [
        "Bổ sung vi sinh vật có lợi, đối kháng nấm bệnh.",
        "Phân giải nhanh xác bã thực vật, Cellulose, tăng mùn cho đất.",
        "Giúp đất tơi xốp, cải tạo cấu trúc đất hiệu quả.",
        "Cung cấp dinh dưỡng hữu cơ bền vững cho cây trồng."
    ],
    usage: "Bón lót hoặc bón thúc quanh gốc, liều lượng tùy theo độ tuổi và tình trạng cây."
  },
   "npk_10_60_10": {
    id: "npk_10_60_10",
    category: "nutrition",
    name: "Phân Bón Lá AC NPK 10-60-10 + TE",
    imageUrl: "https://product.hstatic.net/1000269461/product/ac-10-60-10_a77e55890ae641569dbf97ea125e5de7.jpg",
    description: "Phân bón lá chuyên gia tạo mầm hoa với hàm lượng Lân cao giúp tạo mầm hoa cực mạnh, bật mầm hoa, hoa to, trổ đồng loạt, chống khô bông và rụng bông.",
    benefits: [
      "Hàm lượng lân cực cao giúp hình thành nhiều mầm hoa.",
      "Giúp cây trổ nhiều hoa, hoa trổ đồng loạt, bông hoa to, cánh hoa dày.",
      "Chống rụng hoa, khô hoa, hạn chế nghẽn bông.",
      "Hạ phèn nhanh, kích thích ra rễ mạnh, giúp bộ rễ phát triển khỏe.",
      "Kích thích cây đâm chồi, nhú mầm.",
      "Giúp hạt phấn khỏe, tăng khả năng đậu trái."
    ],
    usage: "Pha 5-10g/8 lít nước, định kỳ 7-10 ngày/lần. Tưới vào sáng sớm hoặc chiều mát."
  },
   "kno3": {
    id: "kno3",
    category: "nutrition",
    name: "KNO3 (Potassium Nitrate)",
    imageUrl: "https://thapxanh.com/images/thumbs/0022451_kali-nitrat-potassium-nitrate-kno3-phan-bon-kali-nito-13-0-46.jpeg",
    description: "Phân bón KNO3 (Kali Nitrat) với thành phần N >= 13%, K2O >= 46%. Hấp thu nhanh hơn các loại phân kali khác, giúp tăng năng suất và cải thiện chất lượng cho nhiều loại cây trồng.",
    benefits: [
        "Cung cấp nguồn Kali và Đạm (dạng Nitrat) hiệu quả cho cây trồng.",
        "Dinh dưỡng được cây hấp thu nhanh, mang lại hiệu quả tức thì.",
        "Tăng năng suất, cải thiện chất lượng, màu sắc và hương vị nông sản.",
        "Hỗ trợ quá trình xử lý ra hoa, giúp cây ra hoa đồng loạt."
    ],
    usage: "Dùng để phun lá hoặc tưới gốc trong giai đoạn cây cần nhiều Kali như lúc làm bông, nuôi trái. Liều lượng pha theo hướng dẫn của nhà sản xuất."
  },
  "ck180": {
      id: "ck180",
      category: "nutrition",
      name: "FMS - CÂY KHOẺ 180",
      imageUrl: "https://lavish-kitty-16b.notion.site/image/attachment%3A9dcee1fb-f1d3-4565-8bfb-ed57f8a461bb%3Az7196617458206_4f6feb214d37870c7a4e88055c3cc300.jpg?table=block&id=2b0a0a49-3a08-80b6-a49a-d2fd3784d8ea&spaceId=228174f8-4a60-4bbf-b8cf-11db580b1ecb&width=2000&userId=&cache=v2",
      description: "Cung cấp trung vi lượng thiết yếu (đặc biệt là Canxi) giúp cây cứng cáp, tăng đậu trái, hạn chế nứt trái và tăng khả năng chống chịu sâu bệnh.",
      benefits: [
          "Cung cấp các trung vi lượng thiết yếu giúp cây cứng cáp, hạn chế đổ ngã, hạn chế nứt trái, móp trái do thiếu canxi.",
          "Tăng khả năng thụ phấn, hạn chế rụng hoa và trái non.",
          "Tăng khả năng chống chịu với thời tiết bất lợi và sâu bệnh hại.",
          "Giúp làm khô vết bệnh, tạo lớp áo bảo vệ bên ngoài hạn chế nấm bệnh xâm nhập gây hại cây trồng."
      ],
      usage: "Phun lá: Pha 25ml/20L nước hoặc 500ml/400L.\nĐổ gốc: Pha 500ml/400L, đổ 4L/gốc hoặc tưới 1000m² để khử chua, kích rễ.\nLưu ý: Dùng lúc sáng sớm hoặc chiều mát. Đọc kỹ hướng dẫn. Tránh xa tầm tay trẻ em."
  },

  // --- BẢO VỆ THỰC VẬT (PROTECTION) ---
  "trichoderma": {
      id: "trichoderma",
      category: "protection",
      name: "Trichoderma (Tưới Gốc)",
      imageUrl: "https://api-static.bacsicayxanh.vn/pictures/0001591_trichoderma.jpeg.webp",
      description: "Chế phẩm vi sinh nấm đối kháng Trichoderma, giúp phân giải hữu cơ, ủ phân, và đặc biệt là phòng ngừa hiệu quả các bệnh về rễ như vàng lá, thối rễ do nấm Phytophthora, Fusarium gây ra.",
      benefits: [
          "Ủ phân chuồng, vỏ cà phê, xác thực vật nhanh và hiệu quả.",
          "Diệt các mầm bệnh có trong đất, nguyên liệu, hạn chế các nấm bệnh phát triển.",
          "Phòng ngừa các bệnh về vàng lá thối rễ, tuyến trùng do nấm Phytophthora và Fusarium gây nên."
      ],
      usage: "Pha với nước theo liều lượng khuyến cáo và tưới đều quanh gốc. Dùng để ủ phân hoặc xử lý đất trước khi trồng."
  },
  "ck90": {
      id: "ck90",
      category: "protection",
      name: "FMS - CÂY KHOẺ 90 (Trừ Sâu Sinh Học)",
      imageUrl: "https://lavish-kitty-16b.notion.site/image/attachment%3A4383321c-1bd0-42e0-b9d7-4a1b376f0c8e%3Az7196617249151_64b7794682ad385ce0223732703e0490.jpg?table=block&id=2b0a0a49-3a08-8058-b736-fecdb3914d84&spaceId=228174f8-4a60-4bbf-b8cf-11db580b1ecb&width=2000&userId=&cache=v2",
      description: "Thuốc trừ sâu sinh học, tổ hợp các chủng nấm ký sinh (nấm trắng, xanh, tím,...) và vi khuẩn BT để quản lý hơn 110 loại côn trùng gây hại.",
      benefits: [
          "Quản lý hiệu quả hơn 110 loại côn trùng gây hại.",
          "Phổ tác động rộng nhờ tổ hợp nấm trắng, nấm xanh, nấm tím, nấm tua, nấm bột.",
          "Bổ sung vi khuẩn BT (Bacillus thuringiensis) tăng cường hiệu quả.",
          "An toàn, không gây nóng bông, nóng trái."
      ],
      usage: "Pha 1kg với 5 lít nước ngâm qua đêm, sau đó pha loãng với 400 lít nước phun."
  },
  "ck50": {
      id: "ck50",
      category: "protection",
      name: "FMS - CÂY KHOẺ 50 (Bám Dính)",
      imageUrl: "https://lavish-kitty-16b.notion.site/image/attachment%3A3cac68be-cba1-47fa-bee1-8a2d00af4a6b%3Az7196617181063_9f84a0de6b9836bb17a6551ab7cf63f4.jpg?table=block&id=2b0a0a49-3a08-8042-9114-e0ec2e99618d&spaceId=228174f8-4a60-4bbf-b8cf-11db580b1ecb&width=2000&userId=&cache=v2",
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
      imageUrl: "https://nongnghiepthuanthien.vn/wp-content/uploads/2019/10/12.jpg", // Placeholder
      description: "Tập đoàn vi sinh vật hữu ích đối kháng nấm bệnh.",
      benefits: [
          "Tiêu diệt nấm Phytophthora, Fusarium gây thối rễ.",
          "Phân giải rơm rạ, xác bã thực vật.",
          "Cải tạo hệ vi sinh vật đất."
      ],
      usage: "Ngâm kích hoạt rồi pha loãng tưới gốc."
  }
};

// Helper to find product by name/keyword
export const findProductByName = (text: string): ProductInfo | null => {
   const lowerText = text.toLowerCase();
   // Map specific keywords to IDs for better accuracy
   const mapping: Record<string, string> = {
       "ck70": "ck70", "cây khỏe 70": "ck70", "cây khoẻ 70": "ck70",
       "ck30": "ck30", "cây khỏe 30": "ck30", "cây khoẻ 30": "ck30",
       "ck320": "ck320", "cây khỏe 320": "ck320", "cây khoẻ 320": "ck320",
       "ck180": "ck180", "cây khỏe 180": "ck180", "cây khoẻ 180": "ck180",
       "ck90": "ck90", "cây khỏe 90": "ck90", "cây khoẻ 90": "ck90",
       "ck50": "ck50", "cây khỏe 50": "ck50", "cây khoẻ 50": "ck50",
       "combi": "combi", "lactobio": "lactobio",
       "phân bò vi sinh": "phan_bo_vi_sinh", "dm15": "ph_meter_dm15",
       "ph": "litmus_paper",
       "kno3": "kno3",
       "trichoderma": "trichoderma",
       "10-60-10": "npk_10_60_10"
   };

   // 1. Check mapping first
   for (const [key, id] of Object.entries(mapping)) {
       if (lowerText.includes(key)) return PRODUCT_DB[id];
   }

   // 2. Fallback search in DB
   return Object.values(PRODUCT_DB).find(p => 
       lowerText.includes(p.name.toLowerCase()) || 
       lowerText.includes(p.id.toLowerCase())
   ) || null;
};

// --- Product Usage Dictionary (From Page 3) ---
export const PRODUCT_USAGE_GUIDE: Record<string, { usage: string, note?: string }> = {
  "Cây khỏe 30": { usage: "Pha 1 lít với 300 lít nước tưới ướt bộ rễ.", note: "Cố định đạm, hòa tan lân, phân giải kali" },
  "Cây khỏe 70": { usage: "Pha 1kg với 400 lít nước tưới đẫm để nâng pH. Pha 1kg với 50 lít nước để diệt rong rêu.", note: "Nâng pH đất và nước (pH = 6 đến 7 là tốt nhất)" }, // Mapped from CK70
  "Cây khỏe 320": { usage: "Pha 1 lít với 400 lít nước tưới đều gốc cây.", note: "Đạm cá" },
  "Cây khỏe 180": { usage: "Phun lá: 25ml/20L nước. Đổ gốc: 500ml/400L nước.", note: "Bổ sung Canxi & trung vi lượng" }, // Mapped from CK180
  "Cây khỏe 90": { usage: "Pha 1kg với 5 lít nước ngâm qua đêm, sau đó lấy pha với 400 lít nước phun đều trên cây.", note: "Trừ sâu sinh học, quản lý côn trùng" },
  "LactoBio": { usage: "Pha hết gói sản phẩm với thùng nước uống tinh khiết 10 lít, ngâm 1-3 ngày, sau đó pha thêm 400 lít nước phun đều trên cây.", note: "Phòng trừ bệnh" },
  "Vi lượng Combi": { usage: "Pha 1 gói với 200 lít nước, Phun đều trên cây.", note: "Tăng cường vi lượng" },
  "Cây khỏe 50": { usage: "Chai 500ml pha 800 lít nước", note: "Tăng bám dính" },
  "NPK 30-10-10": { usage: "URE = 3,6KG + DAP = 1,8KG + KALI = 0,6KG. Pha 1.500 lít nước tưới chung hệ thống tưới.", note: "Công thức pha 6kg hỗn hợp" },
  "NPK 20-20-15": { usage: "URE = 3KG + DAP = 2,8KG + KALI = 2,2KG. Pha 2.000 lít nước tưới chung hệ thống tưới.", note: "Công thức pha 8kg hỗn hợp" },
  "NPK 13-13-21": { usage: "URE = 2,4KG + DAP = 3KG + KALI = 4,6KG. Pha 2.500 lít nước tưới chung hệ thống tưới.", note: "Công thức pha 10kg hỗn hợp" },
  "CK70": { usage: "Pha 1kg với 400 lít nước tưới đẫm để nâng pH. Pha 1kg với 50 lít nước để diệt rong rêu.", note: "Nâng pH đất và nước" },
  "CK180": { usage: "Phun lá: 25ml/20L nước. Đổ gốc: 500ml/400L nước.", note: "Bổ sung Canxi & trung vi lượng" },
};