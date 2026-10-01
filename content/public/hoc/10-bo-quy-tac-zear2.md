# 10 — Bộ quy tắc vào lệnh của tôi (hệ ZEAR2, H4 → M15)

Đây là bộ quy tắc **đang dùng thật**: EA `ZO_Analyst` chạy đúng các luật này. Nó là hệ tốt nhất sau hơn 30 vòng backtest
trên EURUSD (19/12/2025 → 1/10/2026, 41 tuần).

Trang này viết cho người mới: mỗi quy tắc có ba phần — **làm gì**, **nhìn vào đâu**, **vì sao** (cơ sở từ lý thuyết ZO
và số liệu backtest).

> **Đọc trước khi tin:** mọi con số ở đây là backtest trên **một cặp tiền, 41 tuần**, và bộ luật được chỉnh trên chính
> dữ liệu đó. Kết quả thật gần như chắc chắn kém hơn. Chạy demo trước, và coi các con số là "luật nào tốt hơn luật
> nào", không phải "sẽ lãi bao nhiêu".

Cần biết trước: nến ZOS và màu nến ([09](09-ban-chat-nen-zo.md)), LP / Main / Shield ([03](03-zos-khai-niem.md)).

---

## 0. Cả hệ trong một câu

> **Chờ giá hồi về một LP H4 cùng chiều (Main hoặc Shield), chờ nến ZOS M15 báo "phe kéo ngược đã hết lực", rồi vào
> theo hướng đó. Chốt ở LP H4 ngược chiều. Giữ lệnh khi nến M15 chưa đổi màu.**

Hệ dùng hai khung:

| Khung | Dùng để | Câu hỏi nó trả lời |
|---|---|---|
| **H4** | Phân tích | Đánh hướng nào? Vào ở vùng nào? Chốt ở đâu? |
| **M15** | Vào lệnh | Vào lúc nào? SL ở đâu? Giữ hay chốt? |
| D1, W1 | Rào chắn | Có vùng lớn ngược chiều chặn trước mặt không? |

**Vì sao chỉ H4 → M15:** H4 đủ lớn để LP có ý nghĩa (ít nhiễu), M15 đủ nhỏ để SL chỉ 8–15 pip. Các vòng backtest
đầu thử thêm H1 và M5 đều không cải thiện.

---

## 1. Ba thứ phải đọc được trên chart

### 1.1. Nến ZOS: màu và râu

| Màu | Nghĩa |
|---|---|
| 🟩 Xanh lá | Phe mua **mạnh** |
| 🟦 Xanh dương | Phe mua **yếu** (hồi, hoặc mới chớm) |
| 🟥 Đỏ | Phe bán **mạnh** |
| 🟪 Hồng / tím | Phe bán **yếu** |
| 🟨 Vàng | Nến **Build**: MM đang đặt lệnh, chưa phe nào thắng |

**Râu nến ZOS là lực kéo, không phải "bị từ chối".** Đây là điểm khác nến thường quan trọng nhất:

- Với lệnh **BUY**, chỉ nhìn **râu dưới** (gọi là *râu ngược*): râu dưới dài = phe bán còn đang kéo giá xuống.
- Râu dưới biến mất = phe bán hết lực.
- Với lệnh **SELL** thì ngược lại: nhìn râu trên.
- Râu cùng chiều nến (râu trên của nến tăng) gần như lúc nào cũng có, nên **không mang thông tin**.

*Cơ sở:* kiểm trên 19.000 nến ZOS M15, râu cùng chiều xuất hiện ở 96–97% số nến, râu ngược chỉ ở 41–42%. Thứ hiếm
mới là tín hiệu.

### 1.2. LP (vùng thanh khoản)

**Cách xác định một LP:**

1. Tìm nến **Build (vàng)**. Một nến Build đứng lẻ phải có râu cả hai đầu; từ 2 nến Build liền nhau thì luôn tính.
2. Vùng LP = từ **đỉnh râu cao nhất** tới **đáy râu thấp nhất** của cụm nến Build đó.
3. Chờ nến ZOS **đóng** ra ngoài vùng:
   - đóng **trên** vùng → **GLP** (vùng xanh, phe mua thắng, là vùng đỡ);
   - đóng **dưới** vùng → **RLP** (vùng đỏ, phe bán thắng, là vùng cản).

**LP chết khi nào (khung H4 trở lên):** khi **thân** một nến ZOS bị điểm cuối của vùng cắt qua — GLP chết khi thân
nến xuống dưới Low của nó, RLP chết khi thân nến lên trên High của nó.

*Cơ sở:* Zerd: "râu không liên quan, áp lực là close". Đã thử yêu cầu râu hai đầu của nến Build ≥ 2 pip (lần 30): số
LP M15 giảm gần một nửa và tổng R giảm từ +138R còn +92R → giữ cách vẽ hiện tại.

Công cụ: `ZO_LP` tự tính, `ZO_DrawLP` vẽ LP W1 (đỏ), D1 (vàng), H4 (xanh lam) thành đường có nhãn.

### 1.3. Main và Shield

- **Main:** khi một LP bị giết, LP **ngược chiều** với nó, **sinh sau** nó và đang sống trở thành Main. Nói gọn: *LP
  thành Main khi nó clear được LP ngược chiều có trước nó.*
- **Shield:** LP **cùng chiều** với Main, sinh ra **sau** khi Main được xác lập. Shield là "lớp rào" mới dựng để bảo
  vệ hướng đi.

*Cơ sở:* Zerd: "MM tạo main, SM tạo shield". Trong backtest, vị trí "tại Main hoặc Shield H4" là yếu tố **ổn định
nhất** của cả hệ (nghiên cứu Potential EP, lần 24). Lệnh ZM vào ở LP H4 không phải Main / Shield: 7 lệnh chỉ +1.0R,
so với 19 lệnh +18.1R ở Main / Shield (lần 29).

---

## 2. Bước 1 — Xác định bias (hướng đánh)

Làm mỗi sáng và mỗi khi nến H4 đóng. Bốn câu hỏi, theo thứ tự:

### 2.1. Main H4 đang là gì?

- Lần xác lập Main gần nhất trên H4 là **GLP** → xu thế H4 **tăng** → ưu tiên **BUY**.
- Là **RLP** → xu thế H4 **giảm** → ưu tiên **SELL**.

Hai kiểu lệnh **ZM** và **U1w** chỉ đánh thuận hướng này. Kiểu **EPA** không bắt buộc thuận, nhưng bắt buộc phải nằm ở
Main / Shield H4 của phe mình (xem mục 4.3).

*Cơ sở:* quy tắc gốc của ZO "không đánh ngược Main". Điểm yếu đã đo được: Main H4 **chậm hơn giá** khi thị trường
đảo chiều — tháng 1/2026 hệ thua 12/15 lệnh vì lý do này. Luật "nghỉ 48 giờ sau 2 lệnh thua" (mục 5) sinh ra để vá
chỗ đó.

### 2.2. Nến ZOS H4 vừa đóng màu gì?

- Nến H4 vừa đóng màu **mạnh của phe ngược** (muốn BUY mà nến H4 **đỏ**; muốn SELL mà nến H4 **xanh lá**) → **không
  vào lệnh nào**, chờ nến H4 sau.

*Cơ sở (lần 32):* nhóm lệnh vào lúc nến H4 mạnh ngược có 23 lệnh, chỉ thắng 2, thua 12, tổng +2.5R. 109 lệnh còn lại
được +135.9R. Áp lực H4 đang mạnh ngược thì cú hồi M15 chưa chắc đã hết.

### 2.3. H4 đang ở pha nào?

| Pha | Nhận biết trên H4 | Ảnh hưởng |
|---|---|---|
| **Chạy mạnh (RUN)** | 3 nến H4 gần nhất cùng màu mạnh | Không vào kiểu **U1w** (giá không hồi thật) |
| **Đuối phía mình (FADE)** | 2 nến H4 gần nhất màu **yếu** của phe mình (BUY: xanh dương) | Không vào kiểu **EPA** |
| Tích luỹ / không rõ | Nhiều nến hai râu, màu lẫn lộn | Vào bình thường |

*Cơ sở:* U1w khi H4 đang RUN: 7 lệnh, −2.9R (lần 29). EPA khi phe mình đang đuối trên H4 là nhóm thua rõ nhất trong
nghiên cứu Potential EP (lần 24).

### 2.4. Có vùng D1 / W1 ngược chiều chặn không?

- Giá đang nằm **trong** một LP D1 hoặc W1 **ngược chiều** từng là Main và còn sống → không vào kiểu ZM và U1w.

*Cơ sở:* "khung lớn dẫn khung nhỏ". Đánh BUY ngay trong vùng cản của khung ngày / tuần là đánh vào chỗ MM khung lớn
đang thủ (lần 22).

---

## 3. Bước 2 — Xác định vùng chờ và đích

### 3.1. Vùng chờ (nơi sẽ vào lệnh)

Lấy các **LP H4 cùng chiều lệnh** là **Main hoặc Shield** (BUY: các GLP H4; SELL: các RLP H4). Đánh dấu High, Low và
điểm giữa (50%) của từng vùng.

- **Nửa sâu** của vùng = từ điểm cuối tới 50% (GLP: từ Low tới giữa; RLP: từ High tới giữa). Vào ở đây thì SL ngắn
  và điểm vào rẻ.

*Cơ sở:* quy tắc ZO "chỉ buy ở Low vùng G, chỉ sell ở High vùng R". Vào ở mép ngoài (High G) thì SL phải dài hơn cả
vùng.

### 3.2. Đích (nơi sẽ chốt)

Tìm **LP H4 ngược chiều gần nhất phía trước** (BUY: RLP H4 phía trên). Ba mức chốt là **mép gần**, **điểm giữa** và
**đầu xa** của vùng đó. Không có LP nào phía trước thì dùng 5R.

*Cơ sở (lần 27):* đích đặt theo LP H4 ngược cho kết quả tốt hơn đích cố định theo R (2R, 3R…). LP ngược là nơi phe
kia đang thủ, giá hay phản ứng ở đó.

### 3.3. Không vào khi giá lơ lửng

Giá không nằm trong hoặc sát (≤ 10 pip) một LP H4 cùng chiều → **không có lệnh**, dù nến M15 đẹp tới đâu.

*Cơ sở:* mẫu nến M15 đứng một mình **không có lợi thế**. Thử mẫu "râu ngắn dần rồi quay đầu" không cần vị trí: 230
lệnh, thắng 37%, −33.8R; cùng mẫu đó tại Main / Shield H4: 63 lệnh, thắng 52%, +24.1R (lần 30).

---

## 4. Bước 3 — Tín hiệu vào lệnh trên M15

Có **ba kiểu**. Khớp một kiểu là vào. Luôn vào bằng **lệnh thị trường khi nến M15 đóng**, không đặt lệnh chờ.

*Cơ sở:* quy tắc ZO "không vào khi giá đang lao tới — chờ phản ứng". Phải thấy nến đóng mới biết phe kéo ngược đã
hết lực hay chưa.

Tất cả ví dụ dưới đây là lệnh **BUY**. Lệnh SELL đổi ngược lại: râu dưới ↔ râu trên, GLP ↔ RLP, đáy ↔ đỉnh.

### 4.1. Cặp nến A/B — viên gạch chung

- **Nến A:** râu dưới dài — ít nhất bằng thân, ít nhất 1/3 chiều cao cả nến, ít nhất 1 pip. Nghĩa là phe bán đang
  kéo mạnh.
- **Nến B** (ngay sau A): râu dưới gần như mất (≤ 0.5 pip hoặc ≤ 10% chiều cao nến), **hoặc** râu trên dài hơn râu
  dưới. Nghĩa là phe bán vừa hết lực.

Đọc là: *"một phe vừa thua"*.

### 4.2. Kiểu ZM — vào sâu trong LP H4

Đủ cả 4 điều:

1. Main H4 là GLP và đã giữ hướng tăng **ít nhất 48 giờ**.
2. Đáy của nến A (hoặc nến trước A) nằm trong **nửa sâu** của một GLP H4 là Main / Shield.
3. Có cặp nến A/B ở hai nến M15 vừa đóng.
4. Vào khi nến B đóng.

*Cơ sở:* Main vừa đổi hướng chưa đủ 48 giờ thì hay bị đảo lại. Trong ZEAR2, ZM cho 25 lệnh, +35.6R.

### 4.3. Kiểu EPA — cặp A/B có thêm nến xác nhận

Đủ cả 4 điều:

1. Có cặp nến A/B.
2. **Hai nến tiếp theo** đều: không có râu dưới (≤ 0.5 pip hoặc ≤ 20% chiều cao nến) và thân tăng.
3. Đáy của cả đoạn từ nến A tới nến vào nằm **trong hoặc cách ≤ 10 pip** một GLP H4 là Main / Shield.
4. Vào khi nến xác nhận thứ hai đóng. Hai lệnh EPA cùng hướng cách nhau ít nhất 4 giờ.

EPA là kiểu duy nhất được phép **ngược** Main H4 hiện tại, miễn là có Main / Shield của phe mình ở đó.

*Cơ sở:* chờ thêm 2 nến xác nhận là thay đổi đưa tỉ lệ thắng lên trên 50% (lần 26). EPA là nguồn lãi chính của hệ:
61 lệnh, +95.7R.

### 4.4. Kiểu U1w — cú kéo mạnh rồi hết lực

Đủ cả 4 điều:

1. Main H4 là GLP, và H4 không ở pha chạy mạnh.
2. Trong 4 giờ gần nhất giá bị kéo xuống **ít nhất 15 pip**, đáy nằm trong / sát một GLP H4 hoặc GLP M15.
3. Một trong 3 nến M15 trước có **râu dưới ≥ 5 pip** (và ≥ 1/3 chiều cao nến đó).
4. Nến vừa đóng: hết râu dưới, thân tăng → vào.

*Cơ sở:* 26 lệnh, +29.8R. Kiểu này bắt các cú quét nhanh mà hai kiểu trên bỏ lỡ.

---

## 5. Khi nào KHÔNG vào (dù có tín hiệu)

| Trường hợp | Áp dụng | Vì sao |
|---|---|---|
| **0h–6h** (giờ Việt Nam) | mọi kiểu | Thanh khoản mỏng, spread rộng, hay bị quét |
| **19h–24h** (phiên New York) | EPA | Potential EP phiên New York lỗ cả khi gần tin (10 lệnh, −6.5R) lẫn xa tin (49 lệnh, −5.1R); chưa tìm được luật riêng nào cho phiên này (lần 25, 26) |
| Nến H4 vừa đóng màu **mạnh ngược** | mọi kiểu | 23 lệnh, thắng 2, thua 12 (lần 32) |
| H4 **đuối phía mình** (2 nến màu yếu) | EPA | Phe mình đang mất lực trên khung lớn |
| H4 đang **chạy mạnh** (3 nến màu mạnh) | U1w | 7 lệnh, −2.9R: không có cú hồi thật |
| Giá trong **Main D1 / W1 ngược chiều** | ZM, U1w | Khung lớn đang thủ ở đó |
| Vừa **thua 2 lệnh liên tiếp** cùng hướng | ZM, U1w | Nghỉ hướng đó 48 giờ: Main H4 có thể đang chậm hơn giá |
| **SL cần hơn 15 pip** | mọi kiểu | SL 12.5–15 pip: 34 lệnh chỉ +8.0R; dưới 12.5 pip: 98 lệnh +130R |
| Đang có **2 lệnh mở** | mọi kiểu | Giới hạn rủi ro cùng lúc |
| Giá đã **chạy quá 3 pip** khỏi giá tín hiệu | mọi kiểu | Lỡ kèo thì bỏ, không đuổi |
| **±30 phút quanh tin đỏ** USD / EUR | mọi kiểu | Thận trọng: spread giãn, trượt giá. Backtest chưa chứng minh là có lợi |
| Giá **không ở LP H4** cùng chiều | mọi kiểu | Mẫu nến đứng một mình không có lợi thế |

**Những thứ nghe hợp lý nhưng backtest cho thấy KHÔNG nên dùng làm điều kiện:**

- **Số tròn** (25 pip một mốc): chỉ thêm lệnh lỗ (lần 28). Chỉ để tham khảo.
- **Mua ở "nửa rẻ" của biên độ** (kiểu ICT): ngược lại, lệnh ở nửa rẻ kém hơn hẳn (lần 31).
- **Quét đỉnh / đáy, phá cấu trúc, RSI, EMA, phá biên độ phiên Á:** không ổn định hoặc không có lợi thế (lần 31).
- **Khối lượng (PVSRA volume):** không cải thiện. Zerd cũng nói không đọc volume MT4.

---

## 6. Đặt lệnh: SL, khối lượng, TP

### 6.1. SL

- **ZM, U1w:** dưới đáy thấp nhất của **4 nến M15 gần nhất**, trừ thêm 3 pip.
- **EPA:** dưới đáy thấp nhất của đoạn **từ nến A tới nến vào**, trừ thêm 3 pip.
- Nếu khoảng cách dưới 8 pip → nới thành 8 pip. Nếu trên 15 pip → **bỏ lệnh**.

Khoảng cách từ giá vào tới SL gọi là **1R**. Mọi thứ về sau tính theo R.

*Cơ sở:* quy tắc ZO "đặt SL trước rồi mới quyết định có vào không". Đáy của cú kéo là chỗ phe bán đã thử và thua;
giá quay lại phá đáy đó nghĩa là nhận định sai.

### 6.2. Khối lượng

`lot = số dư × rủi ro% ÷ (SL tính bằng pip × 10$)` — với EURUSD, 1 lot = 10$ mỗi pip.

| Số dư | Rủi ro mỗi lệnh |
|---|---|
| dưới 200$ | 5% |
| 200$ – 500$ | 3% |
| trên 500$ | 2% |

- Với vốn 30$, 0.01 lot và SL 8–15 pip đã là 0.8–1.5$ = 2.7–5% số dư. Đặt thấp hơn 5% chỉ làm bỏ lỡ lệnh.
- **Không khởi đầu ở 7–10%:** xác suất tụt dưới 20$ (hết khả năng đặt lệnh) tăng từ 0.1% lên 1.5–6.4%, và lên 16–38%
  nếu hệ chạy kém hơn backtest.
- Số dư xuống dưới **22$** → dừng, xem lại. Backtest chưa từng xuống dưới 26.9$.

### 6.3. TP

Chia lệnh làm **3 phần bằng nhau**, đích ở **mép gần / giữa / đầu xa** của LP H4 ngược. Chỉ giữ các đích cách giá vào
ít nhất 1R.

Lot dưới 0.03 (không chia 3 được) → **một đích**: ZM lấy 2R hoặc mép gần LP; U1w và EPA lấy 3R, giữa hoặc đầu xa —
chọn mức gần nhất cách ít nhất 1.5R.

---

## 7. Quản lý lệnh đang mở

| Lúc nào | Làm gì | Vì sao |
|---|---|---|
| Giá đi được **1R** | Dời SL về **giá vào** (BE) | Không dời BE: +123.8R; dời ở 1R: +138.4R. Dời sớm hơn (0.5R): chỉ +64.3R vì bị quét liên tục (lần 32, 33) |
| Giá **chạm một đích** mà nến ZOS M15 **chưa đổi sang màu phe ngược** | **Giữ tiếp** phần đó, kéo SL của cả lệnh lên **+0.5R** | Giữ tới nến màu ngược thêm +26R so với chốt ngay (lần 33). Khoá lời để lệnh đã chạm đích không quay về hoà |
| Nến ZOS M15 đóng **màu phe ngược** (BUY: đỏ hoặc hồng) | **Chốt** các phần đã chạm đích, ở giá đóng nến | Phe kia đã bắt đầu đẩy |
| **22h thứ 6** | Đóng hết | Giữ qua cuối tuần làm mất 35R (lần 33) |
| LP H4 mà lệnh dựa vào **bị giết** | Đóng hết | Lý do vào lệnh không còn |

**Không làm:**

- **Không cắt lỗ sớm** khi lệnh đang âm. Lệnh thắng cũng hay âm lúc đầu; cắt sớm đổi một lệnh thua lớn lấy nhiều lệnh
  thua nhỏ (lần 32).
- **Không kéo SL bám sát** theo đáy M15 hay LP M15 mới: +70R đến +119R, kém hẳn so với +138R (lần 33).
- **Không dời SL ra xa hơn, không nhồi thêm lệnh âm.**

---

## 8. Checklist trước mỗi lệnh

Trả lời "có" hết mới vào:

1. ☐ Bây giờ là 6h–24h (và trước 19h nếu là kiểu EPA)?
2. ☐ Nến ZOS H4 vừa đóng **không** phải màu mạnh ngược hướng lệnh?
3. ☐ Giá đang ở trong / sát một LP H4 cùng chiều là **Main hoặc Shield**?
4. ☐ Có đủ điều kiện của **một** trong ba kiểu (ZM / EPA / U1w)?
5. ☐ SL theo cấu trúc **không quá 15 pip**?
6. ☐ Có LP H4 ngược phía trước làm đích, cách ít nhất 1R?
7. ☐ Không nằm trong vùng Main D1 / W1 ngược chiều (với ZM, U1w)?
8. ☐ Chưa thua 2 lệnh liên tiếp cùng hướng trong 48 giờ (với ZM, U1w)?
9. ☐ Đang có ít hơn 2 lệnh mở?
10. ☐ Không trong ±30 phút quanh tin đỏ USD / EUR?

Có tín hiệu mà một ô không tick được → **bỏ, chờ lệnh sau**. Mỗi tuần hệ chỉ có khoảng 3 lệnh, và 7 trên 40 tuần
không có lệnh nào.

---

## 9. Ví dụ đi từ đầu tới cuối (lệnh BUY, số minh hoạ)

1. **Bias:** Main H4 là GLP 1.1700–1.1720, xác lập 3 ngày trước → ưu tiên BUY. Nến H4 vừa đóng màu xanh dương → không
   bị chặn.
2. **Vùng chờ:** GLP H4 1.1700–1.1720. Điểm giữa 1.1710. **Đích:** RLP H4 phía trên 1.1790–1.1810.
3. **Chờ:** 15h, giá từ 1.1760 hồi xuống 1.1716.
4. **Tín hiệu (kiểu EPA):**
   - Nến A: râu dưới chọc xuống 1.1714, thân nhỏ.
   - Nến B: không còn râu dưới.
   - Hai nến tiếp: xanh, không râu dưới. Nến thứ hai đóng ở 1.1727.
5. **SL:** đáy đoạn này 1.1714 − 3 pip = **1.1711**. Giá mua = giá đóng + 1 pip spread = 1.1728 → khoảng cách 17 pip
   → quá 15 pip → **bỏ**.
   *Nếu nến xác nhận đóng ở 1.1724:* giá mua 1.1725, khoảng cách 14 pip → vào được, 1R = 14 pip.
6. **Khối lượng:** vốn 1000$, rủi ro 2% = 20$ → 20 ÷ (14 × 10) = 0.14 lot → chia 3 phần ~0.04 lot.
7. **Đích:** 1.1790 / 1.1800 / 1.1810 (4.6R / 5.4R / 6.1R).
8. **Quản lý:**
   - Giá lên 1.1739 (+1R) → SL về 1.1725.
   - Giá chạm 1.1790, nến M15 vẫn xanh → giữ, SL lên 1.1732 (+0.5R).
   - Vài nến sau xuất hiện nến M15 hồng → chốt các phần đã chạm đích ở giá đóng nến đó.

---

## 10. Quy trình một ngày

| Lúc | Việc | Công cụ |
|---|---|---|
| Sáng (trước 9h) | Đọc bias: Main H4, màu nến H4, vùng D1 / W1 | Bản tin `ZOS MARKET ANALYSIS` của EA; `ZO_DrawLP` |
| | Đánh dấu vùng chờ và đích | `ZO_View`, `ZO_DrawLP` |
| Trong ngày | Chờ tin `🔔 POTENTIAL EP` (mới là báo trước, chưa vào) | Telegram |
| | Có tin `✅ ENTRY` hoặc `🎯 TÍN HIỆU ZOU` → soát checklist mục 8 | Telegram, chart |
| Khi có lệnh | BE ở 1R, giữ / chốt theo màu nến M15 | EA tự làm trên demo; tin `🤖` |
| Tối thứ 6 | Đóng hết trước 22h | EA tự làm |
| Cuối tuần | Mở `ZO_BTView`, so lệnh của mình với lệnh của hệ | `ZO_BTView` |

---

## 11. Hệ này đã cho kết quả gì trong backtest

EURUSD, 41 tuần, spread 1 pip, nến chạm cả SL và TP tính là thua.

| | ZEAR2 |
|---|---|
| Số lệnh | 112 (khoảng 2.8 lệnh/tuần) |
| Thắng / Hoà / Thua | 41 / 33 / 38 |
| Tỉ lệ thắng (không tính hoà) | 52% |
| Lãi trung bình mỗi lệnh | +1.44R |
| Tổng | +161.5R |
| Tổng lãi ÷ tổng lỗ (PF) | 5.61 |
| Sụt vốn sâu nhất (rủi ro 5%) | 26% |
| Chuỗi thua dài nhất | 5 lệnh |
| Hai tháng cuối (8–9/2026) | 30 lệnh, +50.8R |

Theo kiểu lệnh: EPA 61 lệnh +95.7R · ZM 25 lệnh +35.6R · U1w 26 lệnh +29.8R.

**Lệnh thua trông thế nào:** phần lớn chết nhanh — 38/49 lệnh thua (đo trên bản trước khi thêm luật nến H4) dính SL
trong 4 giờ đầu, và 29/49 chưa từng đi được 0.3R. Thấy lệnh âm ngay sau khi vào là chuyện bình thường của hệ.

**Chuẩn bị tâm lý:** 1 trong 3 lệnh là hoà, 1 trong 3 là thua. Lãi đến từ số ít lệnh chạy xa: lệnh thắng trung bình
được hơn 4R.

---

## 12. Giới hạn cần nhớ

- **Dữ liệu ít:** một cặp tiền, 41 tuần. ZOS không tính được lịch sử xa hơn.
- **Đã chỉnh trên chính dữ liệu đó** qua hơn 30 vòng. Hai tháng "kiểm tra cuối" cũng đã bị nhìn nhiều lần.
- **Backtest theo nến M15**, không theo tick; spread cố định 1 pip, không tính trượt giá, phí, swap.
- **Main H4 chậm hơn giá** ở các đoạn đảo chiều.
- **EA chưa chạy thật lâu.** Phần giữ lệnh theo màu nến cần MT4 luôn mở: lệnh đang giữ không có TP trên server.
- Mỗi tuần trôi qua trên demo là thêm một tuần dữ liệu thật sự mới. Đó mới là phép kiểm tra đáng tin.
