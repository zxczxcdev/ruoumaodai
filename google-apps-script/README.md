# Hướng Dẫn Cấu Hình Google Sheets

## Bước 1: Tạo Google Sheet Mới

1. Truy cập [Google Sheets](https://sheets.google.com)
2. Tạo một spreadsheet mới
3. Đặt tên cho sheet, ví dụ: **"Đơn Hàng Rượu"**
4. Để sheet trống (headers sẽ được tạo tự động khi có đơn hàng đầu tiên)

## Bước 2: Mở Apps Script Editor

1. Trong Google Sheet vừa tạo, click vào **Extensions** (Tiện ích mở rộng) trên menu
2. Chọn **Apps Script**
3. Một tab mới sẽ mở ra với Apps Script editor

## Bước 3: Dán Code

1. Xóa toàn bộ code mặc định trong editor (function `myFunction()`)
2. Mở file `Code.gs` trong thư mục `google-apps-script/`
3. Copy toàn bộ nội dung file `Code.gs`
4. Paste vào Apps Script editor
5. Click **Save** (💾) hoặc `Ctrl+S`
6. Đặt tên project, ví dụ: **"Wine Order API"**

## Bước 4: Deploy Web App

### 4.1. Deploy

1. Click nút **Deploy** (Triển khai) ở góc trên bên phải
2. Chọn **New deployment** (Triển khai mới)
3. Click vào icon ⚙️ (gear) bên cạnh "Select type"
4. Chọn **Web app**

### 4.2. Cấu Hình Deploy

Điền thông tin như sau:

- **Description**: `Initial deployment` (hoặc mô tả tùy ý)
- **Execute as**: Chọn **Me** (your-email@gmail.com)
- **Who has access**: Chọn **Anyone** (Bất kỳ ai)

> ⚠️ **LƯU Ý**: Phải chọn "Anyone" để landing page có thể gửi dữ liệu

### 4.3. Authorize

1. Click **Deploy**
2. Hệ thống sẽ yêu cầu authorize (cấp quyền)
3. Click **Authorize access**
4. Chọn tài khoản Google của bạn
5. Click **Advanced** (Nâng cao)
6. Click **Go to [Project Name] (unsafe)** - Đây là safe, đừng lo!
7. Click **Allow** để cấp quyền

### 4.4. Lấy Web App URL

Sau khi deploy thành công:

1. Copy **Web app URL** - URL sẽ có dạng:
   ```
   https://script.google.com/macros/s/ABCD.../exec
   ```
2. **LƯU GIỮ URL NÀY** - bạn sẽ cần nó ở bước tiếp theo!

## Bước 5: Cấu Hình Landing Page

1. Mở file `script.js`
2. Tìm dòng:
   ```javascript
   GOOGLE_SCRIPT_URL: 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE',
   ```
3. Thay thế bằng URL vừa copy:
   ```javascript
   GOOGLE_SCRIPT_URL: 'https://script.google.com/macros/s/ABCD.../exec',
   ```
4. Lưu file

## Bước 6: Test

### Test Trực Tiếp Google Apps Script

1. Trong Apps Script editor, chọn function `doGet` từ dropdown
2. Click **Run**
3. Kiểm tra logs - không có lỗi là OK

### Test Từ Landing Page

1. Mở `index.html` trong trình duyệt
2. Điền form đặt hàng với thông tin test:
   - Tên: Test User
   - SĐT: 0123456789
   - Địa chỉ: 123 Test Street, Test City
   - Số lượng: 1
3. Click **Đặt Hàng Ngay**
4. Kiểm tra Google Sheet - dữ liệu sẽ xuất hiện ngay lập tức!

## Cấu Trúc Google Sheet

Sheet sẽ tự động tạo các cột:

| Thời Gian | Họ Tên | Số Điện Thoại | Địa Chỉ | Số Lượng | Tổng Tiền | Trạng Thái |
|-----------|---------|---------------|---------|-----------|-----------|------------|
| 02/02/2026 15:30:00 | Nguyễn Văn A | 0123456789 | 123 ABC... | 2 | 1,998,000đ | Mới |

## Tính Năng Bổ Sung (Tùy Chọn)

### Bật Email Notification

Nếu muốn nhận email khi có đơn hàng mới:

1. Mở file `Code.gs` trong Apps Script editor
2. Tìm function `sendNotificationEmail`
3. Uncomment code (xóa `/*` và `*/`)
4. Thay `your-email@example.com` bằng email của bạn
5. Trong function `saveOrderToSheet`, uncomment dòng:
   ```javascript
   sendNotificationEmail(data);
   ```
6. Save và Re-deploy:
   - Click **Deploy** > **Manage deployments**
   - Click ✏️ Edit
   - Tăng version number
   - Click **Deploy**

## Troubleshooting

### Lỗi: "Script function not found"

- Đảm bảo bạn đã save code trong Apps Script editor
- Try refresh và deploy lại

### Lỗi: "Authorization required"

- Deploy lại và authorize lại
- Đảm bảo chọn "Anyone" trong "Who has access"

### Dữ liệu không lưu vào Sheet

- Kiểm tra URL trong `script.js` có đúng không
- Mở Chrome DevTools (F12) > Console để xem lỗi
- Kiểm tra Apps Script logs: View > Logs

### Cross-Origin (CORS) Error

- Đây là normal với `no-cors` mode
- Nếu dữ liệu vẫn lưu vào sheet thì OK

## Update Code Sau Này

Nếu cần update Apps Script code:

1. Edit code trong Apps Script editor
2. Save
3. **Deploy** > **Manage deployments**
4. Click ✏️ **Edit** bên cạnh deployment hiện tại
5. Chọn **New version**
6. Click **Deploy**
7. **KHÔNG CẦN** thay đổi URL trong `script.js`

---

✅ **Hoàn thành!** Bây giờ landing page đã kết nối với Google Sheets và sẵn sàng nhận đơn hàng!
