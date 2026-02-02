# 🏮 Rượu Truyền Thống - Landing Page Phong Cách Trung Hoa

Landing page bán rượu với thiết kế Traditional Chinese (phong cách hoàng gia Trung Quốc), tích hợp Google Sheets để quản lý đơn hàng.

## ✨ Tính Năng

- 🎨 **Thiết kế Traditional Chinese**: Màu đỏ hoàng gia, vàng kim, hoa văn rồng phượng
- 📱 **Responsive**: Hoạt động mượt mà trên mọi thiết bị (mobile, tablet, desktop)
- 📝 **Form Đặt Hàng**: Thu thập tên, SĐT, địa chỉ, số lượng với validation đầy đủ
- 📊 **Google Sheets Integration**: Tự động lưu đơn hàng vào Google Sheets
- ⭐ **Customer Reviews**: Hiển thị đánh giá khách hàng
- 🎯 **Single Product Focus**: Tập trung vào 1 sản phẩm duy nhất
- 🚀 **GitHub Pages Ready**: Deploy miễn phí lên GitHub Pages

## 🗂️ Cấu Trúc Dự Án

```
ladi_ruou_ongtre/
├── index.html                 # Trang chính
├── style.css                  # Stylesheet với Traditional Chinese design
├── script.js                  # JavaScript (form validation, Google Sheets integration)
├── assets/
│   └── product.jpg           # Hình ảnh sản phẩm (cần thêm)
├── google-apps-script/
│   ├── Code.gs               # Google Apps Script code
│   └── README.md             # Hướng dẫn setup Google Sheets
└── README.md                 # File này
```

## 🚀 Hướng Dẫn Setup

### Bước 1: Chuẩn Bị Hình Ảnh Sản Phẩm

1. Chuẩn bị hình ảnh sản phẩm rượu (khuyến nghị: 800x1200px, PNG/JPG)
2. Đặt hình ảnh vào thư mục `assets/` với tên `product.jpg`

### Bước 2: Cập Nhật Thông Tin Sản Phẩm

Mở `index.html` và cập nhật:

1. **Tên sản phẩm** (dòng ~67):
   ```html
   <h3 class="product-name" id="productName">TÊN RƯỢU CỦA BẠN</h3>
   ```

2. **Giá sản phẩm** (dòng ~69):
   ```html
   <span class="product-price" id="productPrice">999,000đ</span>
   ```

3. **Mô tả sản phẩm** (dòng ~75):
   ```html
   <p>MÔ TẢ SẢN PHẨM CỦA BẠN...</p>
   ```

Mở `script.js` và cập nhật giá (dòng ~8):
```javascript
PRODUCT_PRICE: 999000, // Thay đổi giá ở đây (đơn vị: VND)
```

### Bước 3: Cấu Hình Google Sheets

Xem hướng dẫn chi tiết tại: [`google-apps-script/README.md`](google-apps-script/README.md)

**Tóm tắt:**
1. Tạo Google Sheet mới
2. Thêm Apps Script code từ `google-apps-script/Code.gs`
3. Deploy as Web App
4. Copy URL và paste vào `script.js`:
   ```javascript
   GOOGLE_SCRIPT_URL: 'https://script.google.com/macros/s/YOUR_ID/exec',
   ```

### Bước 4: Test Local

1. Mở `index.html` trong trình duyệt
2. Kiểm tra giao diện
3. Test form đặt hàng
4. Verify dữ liệu xuất hiện trong Google Sheet

## 🌐 Deploy Lên GitHub Pages

### Bước 1: Tạo GitHub Repository

1. Truy cập [GitHub](https://github.com)
2. Click **New repository**
3. Đặt tên repository (VD: `wine-landing-page`)
4. Chọn **Public**
5. Click **Create repository**

### Bước 2: Push Code Lên GitHub

Mở Terminal/CMD trong thư mục dự án và chạy:

```bash
# Initialize git (nếu chưa có)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Traditional Chinese Wine Landing Page"

# Add remote (thay YOUR_USERNAME và YOUR_REPO)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Bước 3: Enable GitHub Pages

1. Trong repository, click **Settings**
2. Scroll xuống phần **Pages** (menu bên trái)
3. Trong **Source**, chọn:
   - Branch: `main`
   - Folder: `/ (root)`
4. Click **Save**
5. Đợi vài phút, GitHub sẽ hiển thị URL:
   ```
   https://YOUR_USERNAME.github.io/YOUR_REPO/
   ```

### Bước 4: Verify

1. Truy cập URL GitHub Pages
2. Kiểm tra trang hoạt động bình thường
3. Test form đặt hàng
4. Kiểm tra dữ liệu vào Google Sheet

## 🎨 Tùy Chỉnh Thiết Kế

### Thay Đổi Màu Sắc

Mở `style.css` và edit các biến trong `:root` (dòng ~7):

```css
:root {
    --imperial-red: #C8102E;    /* Màu đỏ chính */
    --chinese-gold: #FFD700;    /* Màu vàng/gold */
    --cream: #FFF8DC;           /* Màu nền */
    /* ... */
}
```

### Thay Đổi Font

Mặc định: `Times New Roman`

Để đổi font, sửa trong `style.css` (dòng ~50):
```css
body {
    font-family: 'Your Font', 'Times New Roman', Times, serif;
}
```

### Thêm/Sửa Testimonials

Mở `index.html`, tìm phần `testimonials-section` (dòng ~91) và chỉnh sửa nội dung.

## 📊 Quản Lý Đơn Hàng

Sau khi có đơn hàng, mở Google Sheet để xem:

- **Thời gian**: Thời điểm đặt hàng
- **Họ tên**: Tên khách hàng
- **SĐT**: Số điện thoại
- **Địa chỉ**: Địa chỉ nhận hàng
- **Số lượng**: Số chai đặt
- **Tổng tiền**: Thành tiền
- **Trạng thái**: Mới / Đang xử lý / Hoàn thành

Bạn có thể:
- Sort theo thời gian
- Filter theo trạng thái
- Export Excel để quản lý
- Tạo charts/graphs

## 🔧 Troubleshooting

### Hình ảnh không hiển thị

- Kiểm tra đường dẫn file trong `index.html`
- Đảm bảo file `product.jpg` nằm trong thư mục `assets/`
- Kiểm tra tên file có đúng (case-sensitive)

### Form không submit

- Mở Chrome DevTools (F12) > Console để xem lỗi
- Kiểm tra `GOOGLE_SCRIPT_URL` trong `script.js` có đúng không
- Verify Google Apps Script đã deploy thành công

### CSS không load

- Clear browser cache (Ctrl + F5)
- Kiểm tra đường dẫn `<link>` trong `index.html`

### GitHub Pages 404

- Đợi 5-10 phút sau khi enable Pages
- Kiểm tra branch và folder settings
- Verify file `index.html` ở root của repository

## 📋 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Android)

## 🛡️ Security Notes

- ⚠️ Google Apps Script URL là public - đừng lo, đây là bình thường
- ✅ Server-side validation trong Apps Script bảo vệ khỏi spam
- ✅ HTTPS được bật tự động trên GitHub Pages

## 📝 License

Free to use và customize cho dự án của bạn.

## 🙏 Support

Nếu gặp vấn đề:
1. Xem lại các bước trong README
2. Kiểm tra `google-apps-script/README.md`
3. Xem Console logs (F12)
4. Kiểm tra Apps Script logs (View > Logs)

---

**🏮 Chúc bạn bán hàng thành công! 福禄寿**
