# 🖼️ Product Image Gallery - Setup Guide

## ✅ Đã Hoàn Thành

Đã tạo **image gallery với 5 hình ảnh** cho sản phẩm:

### 📸 Features

1. **Main Display** - Hình lớn chính
2. **Thumbnail Carousel** - 5 hình thu nhỏ ở dưới
3. **Navigation Buttons** - Nút prev/next (‹ ›)
4. **Click Thumbnails** - Click vào thumbnail để xem hình lớn
5. **Keyboard Support** - Dùng mũi tên ← → để navigate
6. **Fade Transition** - Hiệu ứng mượt khi đổi hình
7. **Active State** - Thumbnail được chọn có viền xanh

---

## 📂 Cách Thay Thế Hình Ảnh

### Bước 1: Chuẩn Bị Hình Ảnh

Tạo **5 hình ảnh sản phẩm** và đặt vào folder `assets/`:

```
assets/
├── product-1.jpg  (Hình chính - góc chính diện)
├── product-2.jpg  (Góc cạnh)
├── product-3.jpg  (Chi tiết nhãn)
├── product-4.jpg  (Đóng gói/hộp)
└── product-5.jpg  (Sử dụng/tiệc)
```

**Kích thước đề xuất**: 800x800px hoặc 1000x1000px (vuông hoặc dọc)

---

### Bước 2: Cập Nhật File `script.js`

Mở file **`script.js`** và tìm dòng ~16:

```javascript
// Product Images for Gallery
PRODUCT_IMAGES: [
    'assets/product.jpg',      // ← Đổi thành 'assets/product-1.jpg'
    'assets/product.jpg',      // ← Đổi thành 'assets/product-2.jpg'
    'assets/product.jpg',      // ← Đổi thành 'assets/product-3.jpg'
    'assets/product.jpg',      // ← Đổi thành 'assets/product-4.jpg'
    'assets/product.jpg',      // ← Đổi thành 'assets/product-5.jpg'
],
```

**Sửa thành:**

```javascript
// Product Images for Gallery
PRODUCT_IMAGES: [
    'assets/product-1.jpg',
    'assets/product-2.jpg',
    'assets/product-3.jpg',
    'assets/product-4.jpg',
    'assets/product-5.jpg',
],
```

---

### Bước 3: Cập Nhật File `index.html`

Mở file **`index.html`** và tìm phần thumbnail gallery (dòng ~139):

```html
<div class="thumbnail-item active" data-index="0">
    <img src="assets/product.jpg" alt="Sản phẩm 1">  ← Đổi thành product-1.jpg
</div>
<div class="thumbnail-item" data-index="1">
    <img src="assets/product.jpg" alt="Sản phẩm 2">  ← Đổi thành product-2.jpg
</div>
<!-- ... tương tự cho 3, 4, 5 -->
```

**Sửa thành:**

```html
<div class="thumbnail-item active" data-index="0">
    <img src="assets/product-1.jpg" alt="Sản phẩm 1">
</div>
<div class="thumbnail-item" data-index="1">
    <img src="assets/product-2.jpg" alt="Sản phẩm 2">
</div>
<div class="thumbnail-item" data-index="2">
    <img src="assets/product-3.jpg" alt="Sản phẩm 3">
</div>
<div class="thumbnail-item" data-index="3">
    <img src="assets/product-4.jpg" alt="Sản phẩm 4">
</div>
<div class="thumbnail-item" data-index="4">
    <img src="assets/product-5.jpg" alt="Sản phẩm 5">
</div>
```

**Và cả hình main (dòng ~126):**

```html
<img src="assets/product-1.jpg" alt="Rượu Ông Tre" class="product-image" id="mainImage">
```

---

## 🎨 Tùy Chỉnh Gallery

### Thay Đổi Số Lượng Hình

Nếu muốn **nhiều hơn hoặc ít hơn 5 hình**:

1. **Thêm/bớt** trong `PRODUCT_IMAGES` array (script.js)
2. **Thêm/bớt** thumbnail HTML (index.html)
3. Update `data-index` cho đúng (0, 1, 2, 3...)

### Thay Đổi Kích Thước Thumbnail

Trong `style.css`, tìm dòng ~515:

```css
.thumbnail-item {
    width: 80px;   /* ← Thay đổi */
    height: 80px;  /* ← Thay đổi */
    ...
}
```

### Thay Đổi Màu Viền Active

Trong `style.css`, tìm dòng ~538:

```css
.thumbnail-item.active {
    border-color: var(--bamboo-green);  /* ← Đổi màu */
    ...
}
```

### Ẩn Navigation Buttons

Trong `style.css`, thêm:

```css
.gallery-nav {
    display: none;  /* Ẩn nút prev/next */
}
```

---

## 🎯 Gallery Controls

### Mouse/Touch
- **Click thumbnail**: Xem hình đó
- **Click ‹**: Hình trước
- **Click ›**: Hình sau
- **Hover thumbnail**: Hiệu ứng lift + border

### Keyboard
- **← (Left Arrow)**: Hình trước
- **→ (Right Arrow)**: Hình sau

---

## 📱 Responsive

- **Desktop**: Full gallery với 5 thumbnails ngang
- **Mobile**: Thumbnails wrap xuống 2-3 hàng
- **All Screens**: Navigation buttons luôn hiển thị

---

## 🎨 Bamboo Theme Integration

Gallery sử dụng **bamboo color scheme**:

- **Navigation buttons**: Bamboo green với white border
- **Active thumbnail**: Bamboo green border + shadow
- **Hover effects**: Light bamboo color
- **Transitions**: Smooth fade (0.3s)

---

## ⚡ Performance

- **Lazy loading**: Tất cả hình load ngay (5 hình không nhiều)
- **Smooth transitions**: CSS transitions (GPU accelerated)
- **No external libraries**: Pure vanilla JavaScript
- **Lightweight**: ~100 lines JavaScript code

---

## 🔧 Troubleshooting

### Hình không hiển thị?
1. Check đường dẫn file chính xác
2. File có tồn tại trong `assets/` folder
3. Check console (F12) xem có lỗi không

### Thumbnail không active?
- Check `data-index` trong HTML khớp với index array
- Check JavaScript console có lỗi không

### Navigation không work?
- Đảm bảo `setupGallery()` được gọi trong `init()`
- Check buttons có đúng ID (`prevBtn`, `nextBtn`)

---

## 📊 File Structure

```
project/
├── assets/
│   ├── product-1.jpg ← 5 hình sản phẩm
│   ├── product-2.jpg
│   ├── product-3.jpg
│   ├── product-4.jpg
│   └── product-5.jpg
├── index.html         ← Gallery HTML
├── style.css          ← Gallery styles
└── script.js          ← Gallery JavaScript
```

---

## ✅ Testing Checklist

- [ ] Upload 5 hình vào `assets/`
- [ ] Update `PRODUCT_IMAGES` array
- [ ] Update thumbnail `src` attributes
- [ ] Update main image `src`
- [ ] Test click thumbnails
- [ ] Test prev/next buttons
- [ ] Test keyboard arrows
- [ ] Test on mobile
- [ ] Check all transitions smooth

---

**Xong! Gallery sẵn sàng với 5 hình sản phẩm đẹp! 🎉**
