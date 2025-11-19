
export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    author: string;
    imageUrl: string;
    category: string;
}

export const BLOG_POSTS: BlogPost[] = [
    {
        id: "1",
        title: "Kỹ Thuật Phục Hồi Sầu Riêng Sau Thu Hoạch: Những Sai Lầm Cần Tránh",
        excerpt: "Sau một vụ mùa bội thu, cây sầu riêng cần được nghỉ ngơi và phục hồi đúng cách. Nhiều bà con thường mắc phải sai lầm khi cắt cành quá tay hoặc bón phân không cân đối...",
        content: `Giai đoạn sau thu hoạch là thời điểm nhạy cảm nhất của cây sầu riêng. Việc phục hồi quyết định đến 70% năng suất của vụ mùa tiếp theo.
        
        1. Không cắt cành quá sớm
        Ngay sau khi cắt trái, cây đang bị "stress". Cần để cây nghỉ khoảng 7-10 ngày trước khi tiến hành tỉa cành tạo tán. Việc cắt cành quá sớm khi cây chưa hồi sức dễ dẫn đến xì mủ.

        2. Rửa vườn là bắt buộc
        Nấm khuẩn tồn tại rất nhiều trong các kẽ nứt của vỏ cây và dưới thảm mục. Sử dụng các dòng tẩy rong rêu và nấm khuẩn để rửa vườn sạch sẽ giúp hạn chế bệnh thối thân xì mủ.

        3. Cân bằng pH đất
        Đất sau một vụ nuôi trái thường bị chua (pH thấp) do bón nhiều phân hóa học. Việc đầu tiên cần làm là nâng pH đất lên ngưỡng 5.5 - 6.5 để rễ cây có thể hấp thu dinh dưỡng tốt nhất.`,
        date: "15/10/2025",
        author: "Kỹ sư Nguyễn Văn A",
        imageUrl: "https://lh7-rt.googleusercontent.com/docsz/AD_4nXcg4sSs3hVnLhBvBtDIlPddaxEbRWJpXeukguH6x-gDpxTmXbuppI-q-cxfOWB51lhAffDOA699AzwaGJSSHenOPzn0_fUmsfggYjcAHbF-SSSU-8Erih4X8o5lwv0hR8Q7An21cw?key=HW9Is8Th0VJ0Ln4U3kUKOP64",
        category: "Kỹ Thuật Canh Tác"
    },
    {
        id: "2",
        title: "Cập Nhật Giá Sầu Riêng Xuất Khẩu Tháng 10/2025",
        excerpt: "Thị trường Trung Quốc tiếp tục là đầu ra chủ lực. Giá sầu riêng Thái và Ri6 có sự biến động nhẹ do nguồn cung từ các tỉnh Tây Nguyên đang vào cuối vụ...",
        content: `Theo ghi nhận tại các vựa thu mua lớn ở Tiền Giang và Đắk Lắk, giá sầu riêng hôm nay duy trì ở mức cao.
        
        - Sầu riêng Thái (Monthong): Loại A (2.7 hộc trở lên, da đẹp, 2-5kg) đang có giá thu mua tại kho khoảng 140.000 - 160.000đ/kg.
        - Sầu riêng Ri6: Loại A giao động từ 110.000 - 130.000đ/kg.

        Dự báo trong tháng tới, khi nguồn cung khan hiếm dần, giá có thể tăng nhẹ thêm 10-15%. Bà con cần chú ý giữ mẫu mã trái đẹp, không bị rệp sáp để đảm bảo tiêu chuẩn xuất khẩu.`,
        date: "12/10/2025",
        author: "Ban Biên Tập Farmersmart",
        imageUrl: "https://giacaphe.com/wp-content/uploads/2024/06/dien-tich-sau-rieng.jpg",
        category: "Thị Trường"
    },
    {
        id: "3",
        title: "Bệnh Vàng Lá Thối Rễ: Nguyên Nhân & Cách Phòng Trị Hiệu Quả",
        excerpt: "Mùa mưa là thời điểm bùng phát mạnh mẽ của nấm Phytophthora và tuyến trùng, gây ra bệnh vàng lá thối rễ - nỗi ám ảnh của người trồng sầu riêng...",
        content: `Bệnh vàng lá thối rễ không làm cây chết ngay nhưng sẽ làm cây suy kiệt dần, lá vàng rụng, cơi đọt kém phát triển.

        **Nguyên nhân:**
        Chủ yếu do sự kết hợp giữa tuyến trùng tấn công tạo vết thương hở rễ và nấm Fusarium, Phytophthora xâm nhập.

        **Quy trình xử lý:**
        Bước 1: Xới nhẹ đất quanh gốc để tạo độ thoáng.
        Bước 2: Sử dụng các chế phẩm chứa Chaetomium và Trichoderma để đối kháng nấm bệnh.
        Bước 3: Kích thích ra rễ mới bằng Humic Acid kết hợp Amino Acid.
        
        Lưu ý: Tuyệt đối không bón phân NPK hóa học trong giai đoạn cây đang bệnh.`,
        date: "05/10/2025",
        author: "TS. Nông Học Trần B",
        imageUrl: "https://tincay.com/wp-content/uploads/2024/07/trai-nghiem-cac-vuon-sau-rieng-sieu-trai-o-tay-nguyen-08.jpg",
        category: "Sâu Bệnh Hại"
    },
    {
        id: "4",
        title: "Ứng Dụng Chế Phẩm Sinh Học Trong Canh Tác Bền Vững",
        excerpt: "Xu hướng nông nghiệp sạch đang lên ngôi. Việc thay thế dần thuốc BVTV hóa học bằng chế phẩm sinh học giúp cây bền, đất khỏe và trái đạt tiêu chuẩn xuất khẩu...",
        content: `Sử dụng chế phẩm sinh học Farmersmart không chỉ giúp bảo vệ môi trường mà còn mang lại hiệu quả kinh tế lâu dài.
        
        Các dòng vi sinh bản địa có khả năng thích nghi tốt với khí hậu Việt Nam, giúp phân giải lân khó tan, cố định đạm và đối kháng mạnh mẽ với nấm bệnh.
        
        Đặc biệt, việc bổ sung hữu cơ vi sinh thường xuyên giúp đất tơi xốp, tăng khả năng giữ nước và dinh dưỡng, giảm chi phí phân bón hóa học lên đến 30%.`,
        date: "01/10/2025",
        author: "Farmersmart Team",
        imageUrl: "https://tapdoanvinasa.com/wp-content/uploads/2023/05/coi-dot-sau-rieng-tap-doan-vinasa-com-2.jpg",
        category: "Nông Nghiệp Xanh"
    }
];

export interface VideoItem {
    id: string;
    title: string;
    youtubeId: string;
}

export const BLOG_VIDEOS: VideoItem[] = [
    {
        id: "v1",
        title: "Farmersmart - Tham quan vườn sầu riêng chú Vũ Anh Hùng tại Xã Tân Lạc, Huyện Bảo Lâm, Lâm Đồng.",
        youtubeId: "HEqX87w04bE"
    },
    {
        id: "v2",
        title: "GIẢI PHÁP TỐT NHẤT CHO CHỐNG RỤNG VÀ TĂNG ĐẬU TRÁI",
        youtubeId: "3_6yVmKgHsE"
    },
    {
        id: "v3",
        title: "CHƯƠNG TRÌNH CHIA SẺ KIẾN THỨC ỨNG DỤNG VI SINH TRÊN SẦU RIÊNG TẠI LÂM ĐỒNG.",
        youtubeId: "F940jjYVqM0"
    }
];
