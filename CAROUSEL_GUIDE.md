# 🎠 Product Image Carousel - Auto-Sliding Album

## ✅ Đã Hoàn Thành

Đã tạo **carousel slider tự động** với 5 hình ảnh sản phẩm!

### 🌟 **Features**

#### **Auto-Slide**
- ⏱️ Tự động chuyển slide mỗi 4 giây
- ⏸️ Pause khi hover chuột (desktop)
- 🔄 Loop vô hạn (slide cuối → slide đầu)

#### **Manual Navigation**
- ◀️▶️ **Arrow Buttons** - Click để prev/next
- 🔘 **Dots Indicators** - Click để skip đến slide bất kỳ
- ⌨️ **Keyboard** - Dùng mũi tên ← → để navigate
- 📱 **Touch Swipe** - Vuốt trái/phải trên mobile

#### **Visual Design**
- 🎨 Bamboo green theme
- ✨ Smooth fade transitions
- 🔘 Interactive dots với hover/active states
- ◀️▶️ Circular nav buttons với bamboo colors

---

## 📂 Cách Thay Hình Ảnh

### Bước 1: Chuẩn Bị 5 Hình

Đặt hình vào folder `assets/`:

```
assets/
├── product-1.jpg
├── product-2.jpg
├── product-3.jpg
├── product-4.jpg
└── product-5.jpg
```

**Kích thước đề xuất**: 800x800px (vuông) hoặc 800x1000px (dọc)

---

### Bước 2: Cập Nhật HTML

Mở `index.html`, tìm dòng ~127-147:

```html
<div class="carousel-slide active">
    <img src="assets/product.jpg" ...>  ← Đổi thành product-1.jpg
</div>
<div class="carousel-slide">
    <img src="assets/product.jpg" ...>  ← Đổi thành product-2.jpg
</div>
<!-- ... tương tự cho 3, 4, 5 -->
```

**Sửa thành:**

```html
<div class="carousel-slide active">
    <img src="assets/product-1.jpg" alt="Rượu Ông Tre - Hình 1" class="carousel-image">
</div>
<div class="carousel-slide">
    <img src="assets/product-2.jpg" alt="Rượu Ông Tre - Hình 2" class="carousel-image">
</div>
<div class="carousel-slide">
    <img src="assets/product-3.jpg" alt="Rượu Ông Tre - Hình 3" class="carousel-image">
</div>
<div class="carousel-slide">
    <img src="assets/product-4.jpg" alt="Rượu Ông Tre - Hình 4" class="carousel-image">
</div>
<div class="carousel-slide">
    <img src="assets/product-5.jpg" alt="Rượu Ông Tre - Hình 5" class="carousel-image">
</div>
```

---

### Bước 3: Reload & Test!

1. **Reload** trang: http://localhost:8000
2. **Chờ 4 giây** → Carousel tự động chuyển slide
3. **Hover** chuột lên → Tạm dừng
4. **Click dots** → Skip đến slide khác
5. **Swipe** trên mobile → Navigate

---

## ⚙️ Tùy Chỉnh

### Thay Đổi Tốc Độ Auto-Slide

Trong `script.js`, dòng ~196:

```javascript
const AUTO_SLIDE_DELAY = 4000; // ← Thay đổi (miliseconds)
// 3000 = 3 giây
// 5000 = 5 giây
// 6000 = 6 giây
```

### Tắt Auto-Slide

Trong `script.js`, comment dòng cuối function `setupCarousel()`:

```javascript
// Start auto-slide
// startAutoSlide(); // ← Comment dòng này
```

### Thay Đổi Kích Thước Dots

Trong `style.css`, dòng ~524:

```css
.dot {
    width: 12px;   /* ← Thay đổi */
    height: 12px;  /* ← Thay đổi */
    ...
}
```

### Thay Đổi Màu Dots

Trong `style.css`:

```css
.dot.active {
    background: var(--bamboo-green); /* ← Màu active */
    border-color: var(--sage-green); /* ← Màu viền */
}
```

### Thay Đổi Vị Trí Navigation Buttons

Trong `style.css`, dòng ~497-503:

```css
.carousel-prev {
    left: 15px; /* ← Khoảng cách từ lề trái */
}

.carousel-next {
    right: 15px; /* ← Khoảng cách từ lề phải */
}
```

### Ẩn Navigation Buttons

Trong `style.css`, thêm:

```css
.carousel-nav {
    display: none;
}
```

---

## 🎮 Controls Reference

| Action | Desktop | Mobile | Result |
|--------|---------|--------|--------|
| **Auto** | Wait 4s | Wait 4s | Next slide |
| **Prev** | Click ‹ | Swipe right | Previous slide |
| **Next** | Click › | Swipe left | Next slide |
| **Skip** | Click dot | Tap dot | Jump to slide |
| **Pause** | Hover | - | Stop auto-slide |
| **Resume** | Mouse leave | - | Restart auto-slide |
| **Keyboard** | ← → keys | - | Navigate |

---

## 📱 Responsive Behavior

### Desktop
- ✅ Full carousel với auto-slide
- ✅ Hover pause works
- ✅ Arrow buttons visible
- ✅ Keyboard navigation

### Mobile/Tablet
- ✅ Touch swipe support
- ✅ Tap navigation buttons
- ✅ Tap dots
- ✅ Auto-slide continues
- ❌ No hover pause (không có chuột)

---

## 🎨 Bamboo Theme Integration

Carousel sử dụng **bamboo color palette**:

- **Navigation Arrows**: `rgba(74, 124, 89, 0.85)` - Bamboo green semi-transparent
- **Dots (default)**: `#e8f5e9` - Light gray
- **Dots (hover)**: `#8FBC8F` - Light bamboo
- **Dots (active)**: `#4A7C59` - Bamboo green với border sage green
- **Container**: White với bamboo sage border (from ornament)

---

## ⚡ Performance

- **Auto-slide**: JavaScript setInterval (efficient)
- **Transitions**: CSS-only (no JavaScript animation)
- **Touch events**: Native touch API (smooth)
- **No libraries**: Pure vanilla JavaScript
- **Lightweight**: ~150 lines JS code

---

## 🐛 Troubleshooting

### Carousel không tự động chuyển?
- Check console (F12) có lỗi không
- Đảm bảo `setupCarousel()` được gọi trong `init()`
- Check `AUTO_SLIDE_DELAY` có value hợp lệ

### Slides không hiển thị?
- Check đường dẫn hình ảnh chính xác
- Check class `carousel-slide` và `active`
- Đảm bảo CSS load đầy đủ

### Dots không click được?
- Check `data-slide` index đúng (0, 1, 2, 3, 4)
- Check dots event listener setup
- Check console có lỗi không

### Swipe không work trên mobile?
- Đảm bảo test trên thiết bị thật (không phải desktop emulator)
- Check touch events có bị block không
- Tăng `swipeThreshold` nếu cần (hiện tại 50px)

### Hover pause không work?
- Chỉ work trên desktop (có chuột)
- Mobile không hỗ trợ hover
- Check event listeners đã setup đúng chưa

---

## 🎯 Best Practices

### Hình Ảnh
- **Định dạng**: JPG hoặc WebP
- **Kích thước**: 800x800px đến 1200x1200px
- **Dung lượng**: < 200KB mỗi hình (optimize để load nhanh)
- **Aspect ratio**: Giữ tỉ lệ nhất quán cho tất cả 5 hình

### Timing
- **Auto-slide**: 4-6 giây (không quá nhanh/chậm)
- **Transition**: 0.3-0.5s (mượt mà, không lag)

### Accessibility
- **Alt text**: Mô tả rõ ràng từng hình
- **Keyboard**: Hỗ trợ arrow keys
- **Contrast**: Navigation buttons có contrast tốt

---

## 📊 Carousel Structure

```
.product-carousel
├── .carousel-container
│   ├── .carousel-track
│   │   ├── .carousel-slide (active)
│   │   │   └── img.carousel-image
│   │   ├── .carousel-slide
│   │   ├── .carousel-slide
│   │   ├── .carousel-slide
│   │   └── .carousel-slide
│   ├── button.carousel-prev
│   └── button.carousel-next
└── .carousel-dots
    ├── span.dot (active)
    ├── span.dot
    ├── span.dot
    ├── span.dot
    └── span.dot
```

---

## ✅ Testing Checklist

- [ ] Upload 5 hình vào `assets/`
- [ ] Update `src` trong HTML
- [ ] Test auto-slide (chờ 4s)
- [ ] Test manual navigation (arrows)
- [ ] Test dots click
- [ ] Test keyboard (← →)
- [ ] Test hover pause (desktop)
- [ ] Test swipe (mobile)
- [ ] Check transitions mượt
- [ ] Check responsive trên mobile

---

**Carousel hoàn chỉnh! Tự động slide mượt mà! 🎠✨**
