# Bộ NEO: hướng dẫn cài và dùng

Bộ NEO là bộ công cụ MT4 tự viết, không cần ZOS. Gồm bốn indicator, một EA phân tích và một template để nạp tất cả trong một lần.

> **Đọc trước khi dùng.** Nghiên cứu đằng sau bộ NEO đã kiểm tra khoảng 60 giả thuyết và **không tìm thấy lợi thế ổn định** từ cấu trúc, LP hay các tín hiệu nến. Bộ này là công cụ để *đọc* thị trường có kỷ luật, không phải hệ thống báo lệnh thắng. Tin "EP tiềm năng" là setup sách vở để bạn xem xét.

## Trong gói có gì

| Tên | Loại | Làm gì |
|---|---|---|
| `NC` | Indicator | Nến NEO: nến làm mượt, tô màu theo M = EMA50 − EMA200 (xanh lá / xanh dương khi M > 0, đỏ / hồng khi M < 0), nến Build màu vàng. Khớp nến ZOS. |
| `NS` | Indicator | Cấu trúc (mức bảo vệ, BOS, CHoCH), range, LP của H4 / D1 / W1 (cặp đường High – Low) và LP của M15 (hộp), swing chưa bị phá. Có nút bật / tắt từng lớp. |
| `NV` | Indicator | Volume theo sóng, ở cửa sổ phụ. |
| `NE` | Indicator | Đánh dấu vùng chờ và điểm vào theo sách vở trên M15 để xem lại bằng mắt. |
| `NEO_Analyst` | EA | Gửi phân tích và cảnh báo qua Telegram, đặt SL / TP và kéo hoà vốn cho lệnh bạn vào tay. **Không tự mở lệnh.** |
| `NeoCore.mqh` | Thư viện | Phần tính toán dùng chung của EA (đặt cạnh file EA). |
| `NEO.tpl` | Template | Nạp NC + NS + NE + NV + EA lên chart với màu chuẩn. |

## Cài đặt

1. MT4 → **File → Open Data Folder**.
2. Chép thư mục `MQL4` trong gói đè vào thư mục `MQL4` vừa mở (gộp thư mục). Chép `templates/NEO.tpl` vào thư mục `templates`.
3. Trong Navigator bấm chuột phải → **Refresh**. Bạn sẽ thấy `Indicators/NEO` và `Expert Advisors/NEO`.
4. **Tools → Options → Expert Advisors**: tick **Allow WebRequest for listed URL** và thêm `https://api.telegram.org`.
5. Mở chart **M15** của cặp muốn theo dõi → chuột phải → **Template → NEO**.
6. Bật nút **AutoTrading** trên thanh công cụ (cần cho việc đặt SL / TP / hoà vốn).
7. Nhấp đúp vào mặt cười góc phải trên chart → tab **Inputs** → điền `InpTelegramToken` và `InpTelegramChatId`. Bản tải về để trống hai ô này. Cách tạo bot: xem [hướng dẫn Telegram](02-huong-dan-telegram-discord.md).

MT4 cần đủ lịch sử nến: mở lần lượt chart W1, D1, H4, M15 của cặp đó một lần để MT4 tải dữ liệu.

## EA gửi những tin gì

| Tin | Khi nào | Nội dung |
|---|---|---|
| 📊 Phân tích ngày | Lần đầu EA chạy trong mỗi ngày (giờ server). Mở lại MT4 trong cùng ngày không gửi lại. | Trạng thái W1 / D1 / H4 / M15 (xu hướng, mức bảo vệ, range, màu nến NC); các vùng cần quan sát trong 100 pip phía trên và phía dưới giá, gần nhất trước, kèm khoảng cách. Phía nào không có sẽ ghi "Không có vùng nào". Cuối tin là các vùng đang chờ EP. |
| 🔔 Sự kiện LP | Khi một nến H4 / D1 / W1 đóng. | LP mới, LP bị phá thành GLP / RLP, LP bị xoá, Main mới. |
| 🔔 Sự kiện cấu trúc | Khi một nến H4 / D1 đóng. | BOS, CHoCH, xác nhận đảo chiều, đảo chiều thất bại, kèm mức bảo vệ mới. |
| 📍 Chạm vùng | Giá tới trong 3 pip quanh một vùng đang theo dõi. | Tên vùng. Mỗi vùng chỉ báo lại sau khi giá đã rời xa 15 pip. |
| 👀 EP tiềm năng | Giá chạm một vùng chờ thuận xu hướng H4. | Vùng nào, chờ phản ứng M15 trong 32 nến. |
| 🎯 EP | Có phản ứng M15 (quét hoặc bứt phá) tại vùng chờ. | Giá vào, SL, TP, tỉ lệ R, lot gợi ý theo % rủi ro. |
| 🛡 Lệnh | EA vừa đặt SL / TP hoặc kéo hoà vốn. | Số lệnh và mức vừa đặt. |

Nút **NEO: phân tích ngay** ở góc dưới trái chart gửi lại bản phân tích bất cứ lúc nào.

### Vùng cần quan sát là những gì

- LP còn sống của H4, D1, W1 (GLP, RLP, LP chưa bị phá; `M` phía trước là Main).
- Mức bảo vệ của H4 và D1.
- Cạnh trên / dưới range của H4 và D1.
- Ba đỉnh và ba đáy swing chưa bị phá gần giá nhất của mỗi khung H4, D1, W1.

Vùng không bao giờ lấy từ M15: M15 chỉ dùng để tìm điểm vào.

### Quy tắc EP (giống indicator NE)

1. H4 đang có xu hướng rõ (TĂNG hoặc GIẢM). H4 đang đảo chiều thì không chờ EP.
2. Giá về một vùng chờ thuận xu hướng: **RT** (retest mức vừa bị phá), **PR** (mức bảo vệ) hoặc **LP** cùng phía.
3. Trong 32 nến M15 sau khi chạm có phản ứng thuận xu hướng: **quét** (lấy đỉnh / đáy 20 nến rồi đóng ngược lại) hoặc **bứt phá** (nến lớn đóng vượt 4 nến trước).
4. SL đặt 3 pip sau điểm xa nhất kể từ lúc chạm.

Trong ba loại vùng, chỉ PR kết hợp quét / bứt phá là còn trên hoà vốn ở cả ba đoạn dữ liệu đã thử, và chỉ ở mức rất mỏng. Tắt RT hoặc LP bằng `InpZoneRetest`, `InpZoneLp` nếu muốn ít tin hơn.

## EA quản lý lệnh thế nào

EA **không bao giờ mở hay đóng lệnh**. Với lệnh thị trường của đúng cặp trên chart, mặc định chỉ lệnh bạn vào tay (magic 0):

| Việc | Quy tắc | Input |
|---|---|---|
| Đặt SL khi lệnh chưa có | 3 pip sau đỉnh / đáy của 20 nến M15 gần nhất, tối đa 40 pip | `InpSetStop`, `InpStopPadPips`, `InpMaxStopPips` |
| Đặt TP khi lệnh chưa có | Cạnh gần của LP H4 đối diện hoặc đỉnh / đáy swing H4, lấy mốc gần nhất cách điểm vào từ 30 pip. Không có mốc nào thì lấy 2R. | `InpSetTarget`, `InpMinTargetPips` |
| Kéo hoà vốn | Khi giá đi được 10 pip, SL về điểm vào + 1 pip. Đổi `InpBeMode` sang "After 1R" để kéo khi giá đi được đúng khoảng SL. | `InpBeMode`, `InpBePips`, `InpBeLockPips` |

Lưu ý:

- Ngay khi gắn EA, mọi lệnh tay đang mở của cặp đó mà chưa có SL / TP sẽ được đặt. Không muốn thì đặt `InpManageOrders = false` trước.
- SL / TP bạn đã đặt sẵn thì EA giữ nguyên, chỉ kéo hoà vốn.
- Nút AutoTrading tắt thì EA vẫn gửi tin nhưng không sửa được lệnh; bảng trên chart sẽ báo.

## Các input khác

| Input | Mặc định | Ý nghĩa |
|---|---|---|
| `InpPush`, `InpAlert` | bật | Gửi thêm thông báo đẩy MT4 (cần nhập MetaQuotes ID trong Options → Notifications) và Alert trên máy. |
| `InpQuietFrom`, `InpQuietTo` | −1 (tắt) | Giờ yên lặng theo giờ server. Trong khoảng này chỉ còn tin về lệnh. |
| `InpWatchPips` | 100 | Bán kính liệt kê vùng trong bản phân tích. |
| `InpTouchPips`, `InpRearmPips` | 3, 15 | Thế nào là chạm, và khi nào một vùng được báo lại. |
| `InpRiskPercent` | 1.0 | % số dư dùng để gợi ý lot trong tin EP. |
| `InpShowPanel` | bật | Bảng trạng thái góc dưới trái: xu hướng từng khung, vùng gần nhất trên / dưới, số vùng chờ EP, số lệnh đang quản lý, tin gần nhất và cảnh báo. |

## Khi không nhận được tin

1. Tab **Experts** của MT4 có dòng `WebRequest failed, error 4060`: chưa thêm `https://api.telegram.org` ở bước 4.
2. Có dòng `Telegram HTTP 401` hoặc `400`: sai token hoặc chat id; nhớ bấm Start với bot trước.
3. Bảng trên chart ghi "Đang tải dữ liệu": MT4 chưa có đủ nến W1 / D1 / H4 / M15, mở các chart đó một lần.
4. Không có mặt cười ở góc chart: EA chưa chạy, bật AutoTrading và tick "Allow live trading" trong tab Common của EA.

## Giới hạn đã biết

- Bộ NEO mới được nghiên cứu trên EURUSD. Trên cặp khác công cụ vẫn chạy nhưng chưa có số liệu nào.
- Khi MT4 tắt qua nhiều nến, EA chỉ báo sự kiện của nến mới nhất lúc mở lại; bản phân tích ngày sẽ cho thấy trạng thái hiện tại.
- LP và cấu trúc trong EA tính lại từ tối đa 2500 nến mỗi khung, cùng công thức với NS; nếu hai bên dùng số nến lịch sử khác nhau, vài LP rất cũ có thể lệch.
