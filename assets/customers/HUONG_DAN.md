# Hướng Dẫn Upload Ảnh Khách Hàng

## 📁 Vị Trí File
Upload các ảnh khách hàng vào thư mục này với tên:
- `customer-1.jpg`
- `customer-2.jpg`
- `customer-3.jpg`
- `customer-4.jpg`
- `customer-5.jpg`
- `customer-6.jpg`
- `customer-7.jpg`
- `customer-8.jpg`

## 📸 Yêu Cầu Ảnh

### Kích Thước Đề Xuất
- **Width:** Tối thiểu 600px
- **Height:** Linh hoạt (masonry layout tự động điều chỉnh)
- **Tỷ lệ:** Có thể khác nhau (portrait/landscape/square) để tạo hiệu ứng masonry đẹp

### Chất Lượng
- **Format:** JPG hoặc PNG
- **Dung lượng:** < 500KB mỗi ảnh (nên compress)
- **Resolution:** 72-150 DPI

## 🎨 Nội Dung Ảnh Đề Xuất
1. **Khách hàng cầm sản phẩm**
2. **Khách hàng trong buổi tiệc/sự kiện**
3. **Sản phẩm được trưng bày đẹp mắt**
4. **Khách hàng review sản phẩm**
5. **Ảnh đập ống tre**
6. **Ảnh rượu đã rót ra ly**
7. **Ảnh gift box/quà tặng**
8. **Ảnh testimonial/review**

## 📐 Layout Masonry

Layout sẽ tự động sắp xếp ảnh theo kiểu Pinterest:
- **Desktop:** 4 cột
- **Tablet:** 3 cột  
- **Mobile:** 2 cột

Ảnh có chiều cao khác nhau sẽ tạo hiệu ứng đẹp mắt!

## 🔄 Thay Đổi Số Lượng Ảnh

Để thêm/bớt ảnh, chỉnh sửa file `index.html` trong section `.customer-gallery`:

```html
<div class="masonry-item" data-aos="fade-up">
  <img src="assets/customers/customer-9.jpg" alt="Khách hàng 9" class="masonry-img">
</div>
```

## ✨ Hiệu Ứng
- Hover: Ảnh phóng to nhẹ + nâng lên
- Scroll: AOS animation fade-up
- Responsive: Tự động điều chỉnh số cột
