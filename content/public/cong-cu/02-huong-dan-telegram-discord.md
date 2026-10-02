# Hướng dẫn: nhận cảnh báo ZO qua Telegram / Discord (làm trên điện thoại)

> **Lưu ý (2/10/2026):** đây là ghi chú cũ. `ZO_Notifier`, `ZO_DrawLP`, `ZO_Wick` đã bị gỡ khỏi bộ tool (ZO_Analyst gửi Telegram, ZO_View vẽ LP khung lớn); tool backtest nằm trong thư mục con `ZO_Backtest`. Hướng dẫn hiện hành: `mt4/docs/HUONG-DAN-SU-DUNG.md` (hệ chính ZO-FLEX).

Bạn chỉ cần chọn **một** trong hai (Telegram gọn hơn, khuyên dùng). Tên nút có thể khác đôi chút tuỳ phiên bản app.

---

## Cách A — Telegram (khuyên dùng)

### Bước 1: Tạo bot, lấy **token**
1. Mở Telegram → chạm biểu tượng **kính lúp (Tìm kiếm)** → gõ `BotFather` → chọn **@BotFather** (có dấu tích xanh).
2. Chạm **BẮT ĐẦU** (hoặc gõ `/start`).
3. Gõ `/newbot` → gửi.
4. BotFather hỏi tên hiển thị → gõ ví dụ `ZO Alert` → gửi.
5. BotFather hỏi username → gõ tên **kết thúc bằng `bot`**, không trùng ai, ví dụ `tuan_zo_alert_bot` → gửi.
6. BotFather trả về tin nhắn có dòng **"Use this token to access the HTTP API:"** và một chuỗi dạng
   `7123456789:AAH...xyz` → **chạm giữ vào chuỗi đó → Sao chép**. Đây là **token** (giữ bí mật như mật khẩu).

### Bước 2: "Mở khoá" bot để nó được nhắn cho bạn
7. Trong tin nhắn của BotFather chạm vào link `t.me/tuan_zo_alert_bot` → chạm **BẮT ĐẦU**.
   (Bắt buộc: nếu bỏ bước này bot không gửi tin cho bạn được.)

### Bước 3: Lấy **chat id** của bạn
8. Tìm kiếm `userinfobot` → chọn **@userinfobot** → chạm **BẮT ĐẦU**.
9. Bot trả lời có dòng **Id: 123456789** → sao chép số đó. Đây là **chat id**.

### Bước 4: Chuyển token + chat id sang máy tính
10. Vào **Tin nhắn đã lưu** (Saved Messages) của chính bạn → dán token và chat id vào → gửi.
11. Trên máy tính mở Telegram Desktop hoặc https://web.telegram.org → **Tin nhắn đã lưu** → copy ra.

---

## Cách B — Discord webhook

Webhook cần một kênh mà bạn có quyền quản lý → dễ nhất là **tạo server riêng**.

### Bước 1: Tạo server riêng (bỏ qua nếu đã có)
1. Mở Discord → chạm **dấu +** ở cột bên trái → **Tạo Máy Chủ Của Tôi** → **Cho tôi và bạn bè tôi** →
   đặt tên ví dụ `ZO Alerts` → **Tạo Máy Chủ**.

### Bước 2: Tạo webhook
2. Trong server vừa tạo, chạm **tên server** ở trên cùng → **Cài đặt** (biểu tượng bánh răng).
3. Kéo xuống chọn **Tích hợp** → **Webhook** → **Webhook Mới** (hoặc **Tạo Webhook**).
4. Chạm vào webhook vừa tạo:
   - Đổi tên, ví dụ `ZO Alert`.
   - **Kênh**: chọn kênh sẽ nhận cảnh báo (ví dụ `#general`).
   - Chạm **Lưu** nếu có.
5. Chạm **Sao chép URL Webhook**. URL dạng `https://discord.com/api/webhooks/123.../abc...`
   (giữ bí mật: ai có URL này đều gửi được tin vào kênh của bạn).

### Bước 3: Chuyển URL sang máy tính
6. Dán URL vào một tin nhắn gửi cho chính bạn (hoặc Telegram **Tin nhắn đã lưu**), rồi mở trên máy tính để copy.

---

## Cài vào MT4 (làm trên máy tính)

1. **Cho phép MT4 gửi tin ra ngoài**: menu **Tools → Options → tab Expert Advisors**
   (MT4 tiếng Việt: **Công cụ → Tùy chọn → Cố vấn chuyên gia**):
   - Tick **Allow WebRequest for listed URL**.
   - Chạm dấu **+** (hoặc dòng trống) để thêm:
     - `https://api.telegram.org` (nếu dùng Telegram)
     - `https://discord.com` (nếu dùng Discord)
   - **OK**.
2. Trong **Navigator → Expert Advisors**, kéo **ZO_Notifier** vào **một chart bất kỳ** (chỉ 1 chart).
3. Tab **Inputs**:
   - Telegram: `InpTelegramToken` = token, `InpTelegramChatId` = chat id.
   - Discord: `InpDiscordWebhook` = URL webhook.
   - **OK**.
4. Vài giây sau điện thoại nhận tin **"ZO_Notifier đã kết nối: ..."** → xong.
   ZO_Notifier **không đặt lệnh**, nên không cần bật nút AutoTrading.
5. Trên chart EURUSD M15 có ZOS: gắn **ZO_LP**, giữ `InpAlertQueue = true`.

### Không nhận được tin?
Xem tab **Experts** (dưới cùng MT4):
- `err=4060` → chưa thêm URL ở bước 1.
- `HTTP 403` (Telegram) → chưa bấm **BẮT ĐẦU** với bot (bước A.7).
- `HTTP 400 chat not found` → sai chat id.
- `HTTP 401/404` → sai token hoặc URL webhook.

---

## Bạn sẽ nhận những cảnh báo nào

| Cảnh báo | Ý nghĩa | Việc cần làm |
|---|---|---|
| **Giá bắt đầu vào ... (retest)** | Giá chạm GLP/RLP đã break | Mở chart, chuẩn bị theo dõi khung nhỏ |
| **... đang RETEST** | Nến đóng trong vùng | Hạ khung tìm tín hiệu kích |
| **SETUP BUY/SELL** | Khung nhỏ tạo GLP trong GLP khung lớn đang retest (hoặc RLP trong RLP) — kèm EP/SL/TP/RR | Kiểm tra lại bằng mắt, đặt lệnh limit theo plan nếu hợp lý |
| **... trở thành MAIN** | LP vừa clear được LP ngược chiều | Ghi nhận vị trí phòng thủ chính |
| **Lệnh #... : Dời SL/BE về ...** | Có LP mới cùng chiều lệnh đang chạy | Dời SL theo gợi ý (luật Zerd: cách mép LP 1–2 pip) |
| **KIỂM TRA LỆNH #...** | Lệnh vừa vào phạm luật ZO (vào trong LP chưa break, sai nửa vùng, không có LP, ngược xu thế, SL trong LP) | Xem lại — có phải đang FOMO? |
