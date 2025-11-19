export interface LegalPageContent {
    title: string;
    lastUpdated: string;
    sections: {
        title: string;
        content: string;
    }[];
}

export const PRIVACY_POLICY_CONTENT: LegalPageContent = {
    title: "Chính Sách Bảo Mật",
    lastUpdated: "Ngày 15 tháng 10 năm 2025",
    sections: [
        {
            title: "1. Giới thiệu",
            content: "Chào mừng bạn đến với Farmersmart. Chúng tôi cam kết bảo vệ thông tin cá nhân của bạn. Chính sách này giải thích cách chúng tôi thu thập, sử dụng và bảo vệ dữ liệu của bạn khi bạn sử dụng dịch vụ và trang web của chúng tôi."
        },
        {
            title: "2. Thông tin chúng tôi thu thập",
            content: "Chúng tôi có thể thu thập các loại thông tin sau:\n- Thông tin liên hệ (ví dụ: email) khi bạn đăng ký nhận bản tin.\n- Dữ liệu sử dụng (ví dụ: các trang bạn truy cập, tính năng bạn sử dụng) để cải thiện dịch vụ.\n- Dữ liệu kỹ thuật (ví dụ: địa chỉ IP, loại trình duyệt) cho mục đích phân tích và bảo mật."
        },
        {
            title: "3. Cách chúng tôi sử dụng thông tin",
            content: "Thông tin của bạn được sử dụng để:\n- Cung cấp và duy trì dịch vụ của chúng tôi.\n- Thông báo cho bạn về những thay đổi đối với dịch vụ.\n- Cung cấp hỗ trợ khách hàng.\n- Phân tích để cải thiện dịch vụ.\n- Gửi cho bạn các tin tức, ưu đãi đặc biệt và thông tin chung về các sản phẩm và dịch vụ khác."
        },
        {
            title: "4. Chia sẻ thông tin",
            content: "Chúng tôi không bán hoặc cho thuê thông tin cá nhân của bạn cho bên thứ ba. Chúng tôi chỉ có thể chia sẻ thông tin với các nhà cung cấp dịch vụ đáng tin cậy để hỗ trợ hoạt động của chúng tôi (ví dụ: phân tích web) hoặc khi pháp luật yêu cầu."
        },
        {
            title: "5. Bảo mật dữ liệu",
            content: "Sự an toàn của dữ liệu của bạn là quan trọng đối với chúng tôi. Chúng tôi sử dụng các biện pháp bảo mật hợp lý về mặt thương mại để bảo vệ thông tin cá nhân của bạn, nhưng không có phương pháp truyền tải qua Internet hoặc lưu trữ điện tử nào là an toàn 100%."
        },
        {
            title: "6. Thay đổi chính sách",
            content: "Chúng tôi có thể cập nhật Chính sách Bảo mật này theo thời gian. Chúng tôi sẽ thông báo cho bạn về bất kỳ thay đổi nào bằng cách đăng chính sách mới trên trang này."
        },
        {
            title: "7. Liên hệ",
            content: "Nếu bạn có bất kỳ câu hỏi nào về Chính sách Bảo mật này, vui lòng liên hệ với chúng tôi qua email: support@farmersmart.vn."
        }
    ]
};

export const TERMS_OF_USE_CONTENT: LegalPageContent = {
    title: "Điều Khoản Sử Dụng",
    lastUpdated: "Ngày 15 tháng 10 năm 2025",
    sections: [
        {
            title: "1. Chấp nhận điều khoản",
            content: "Bằng cách truy cập và sử dụng trang web của Farmersmart, bạn đồng ý tuân thủ và bị ràng buộc bởi các Điều khoản Sử dụng này. Nếu bạn không đồng ý, vui lòng không sử dụng trang web."
        },
        {
            title: "2. Mục đích sử dụng",
            content: "Thông tin và nội dung trên trang web này (bao gồm quy trình canh tác, bài viết blog) chỉ nhằm mục đích tham khảo. Đây không phải là lời khuyên chuyên môn và bạn nên tham khảo ý kiến của chuyên gia nông nghiệp trước khi áp dụng. Farmersmart không chịu trách nhiệm cho bất kỳ tổn thất nào phát sinh từ việc sử dụng thông tin này."
        },
        {
            title: "3. Sở hữu trí tuệ",
            content: "Tất cả nội dung trên trang web này, bao gồm văn bản, đồ họa, logo, và hình ảnh, là tài sản của Farmersmart hoặc các nhà cung cấp nội dung của chúng tôi và được bảo vệ bởi luật bản quyền. Bạn không được phép sao chép, phân phối hoặc sử dụng lại bất kỳ nội dung nào mà không có sự cho phép bằng văn bản của chúng tôi."
        },
        {
            title: "4. Hành vi bị cấm",
            content: "Bạn đồng ý không sử dụng trang web để:\n- Vi phạm bất kỳ luật hoặc quy định nào.\n- Đăng tải nội dung sai lệch, lừa đảo hoặc gây hại.\n- Cố gắng can thiệp vào tính bảo mật hoặc tính toàn vẹn của hệ thống."
        },
        {
            title: "5. Miễn trừ trách nhiệm",
            content: "Trang web được cung cấp trên cơ sở \"nguyên trạng\". Chúng tôi không đưa ra bất kỳ bảo đảm nào, dù rõ ràng hay ngụ ý, về hoạt động của trang web hoặc thông tin, nội dung, hoặc tài liệu có trên đó."
        },
        {
            title: "6. Giới hạn trách nhiệm",
            content: "Trong mọi trường hợp, Farmersmart sẽ không chịu trách nhiệm cho bất kỳ thiệt hại gián tiếp, ngẫu nhiên, hoặc do hậu quả nào phát sinh từ việc bạn sử dụng trang web."
        },
        {
            title: "7. Thay đổi điều khoản",
            content: "Chúng tôi có quyền sửa đổi các Điều khoản Sử dụng này bất kỳ lúc nào. Việc bạn tiếp tục sử dụng trang web sau khi các thay đổi được đăng sẽ được coi là bạn chấp nhận các điều khoản đã được sửa đổi."
        },
        {
            title: "8. Liên hệ",
            content: "Nếu bạn có bất kỳ câu hỏi nào về các Điều khoản này, vui lòng liên hệ với chúng tôi qua email: support@farmersmart.vn."
        }
    ]
};
