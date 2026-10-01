# 11 — Tổng kết nghiên cứu backtest: cái gì có tác dụng, cái gì không

Hơn 30 vòng backtest trên EURUSD (19/12/2025 → 1/10/2026, 41 tuần, khung H4 → M15). Trang này ghi lại kết luận để
không phải thử lại những thứ đã thử. Bộ luật cuối cùng nằm ở [10 — Bộ quy tắc ZEAR2](10-bo-quy-tac-zear2.md).

> Mọi con số là backtest trên một cặp tiền, 41 tuần, và các luật được chọn trên chính dữ liệu đó. Hãy đọc chúng như
> "hướng nào tốt hơn hướng nào".

**Cách đo:** chạy từng nến M15 theo thứ tự thời gian; chỉ dùng thông tin đã có lúc nến đóng; vào ở giá đóng nến cộng
1 pip spread; nến chạm cả SL và TP tính là thua. **R** = lãi hoặc lỗ chia cho số tiền rủi ro của lệnh. Tỉ lệ thắng
không tính lệnh hoà. Vốn 1000$, rủi ro 5%/lệnh, tối đa 2 lệnh mở.

---

## 1. Các hệ qua từng giai đoạn

| Hệ | Ý tưởng | Lệnh | Thắng / Hoà / Thua | Tỉ lệ thắng | Tổng R | PF | Sụt vốn |
|---|---|---|---|---|---|---|---|
| ZOU | ZM + U1w: thuận Main H4, đọc lực kéo trên nến ZOS | 56 | 35 / 2 / 19 | 65% | +54.8R | 4.67 | 26% |
| EPA | Cặp nến A/B tại Main / Shield H4 + 2 nến xác nhận | 86 | 54 / 1 / 31 | 64% | +63.7R | 2.91 | 20% |
| ZEA | ZOU + EPA, đích 1R / giữa / xa | 131 | 82 / 3 / 46 | 64% | +106.9R | 2.84 | 25% |
| ZEA3 | ZEA, EPA chờ 3 nến xác nhận | 112 | 72 / 2 / 38 | 65% | +116.6R | 4.54 | 17% |
| ZEAR | ZEA, đích mép gần / giữa / xa của LP H4 ngược | 132 | 44 / 39 / 49 | 47% | +138.4R | 3.25 | 26% |
| ZEA2 | ZEA + luật nến H4 + giữ phần 2, 3 tới nến màu ngược | 111 | 74 / 1 / 36 | 67% | +118.1R | 4.19 | 25% |
| **ZEAR2** | ZEAR + luật nến H4 + giữ tới nến màu ngược + khoá lời 0.5R | 112 | 41 / 33 / 38 | 52% | +161.5R | 5.61 | 26% |

Các hệ trước ZOU (dùng nến giá thường kiểu "rút râu", lệnh phụ theo trend mạnh, nhấn chìm theo đà) chỉ hoà vốn tới
lãi nhỏ với tỉ lệ thắng 33–37%. Bước ngoặt là **đọc nến ZOS theo đúng bản chất: râu = lực kéo**
([09](09-ban-chat-nen-zo.md)).

---

## 2. Những thứ CÓ tác dụng

| Luật | Số liệu |
|---|---|
| Vào tại **Main / Shield H4** cùng chiều | ZM tại Main / Shield: 19 lệnh +18.1R; ngoài: 7 lệnh +1.0R. Mẫu nến không cần vị trí: 230 lệnh −33.8R |
| **Cặp nến A/B** (nến A râu ngược dài, nến B mất râu) | Nền của cả ba kiểu vào lệnh |
| EPA chờ **2 nến xác nhận** | Đưa tỉ lệ thắng lên trên 50%. Chờ 3 nến: ít lệnh hơn, sụt vốn 25% → 17% |
| **Đích ở LP H4 ngược** | Tốt hơn đích cố định theo R |
| **BE ở 1R** | Không BE: +123.8R. BE ở 1R: +138.4R. BE ở 0.5R: +64.3R |
| **Bỏ lệnh khi nến H4 vừa đóng màu mạnh ngược** | Nhóm bị bỏ: 23 lệnh, thắng 2, thua 12. PF 3.25 → 4.92 |
| **Giữ phần đã chạm đích tới khi có nến M15 màu ngược** | +138.4R → +164.2R; ổn định ở cả ba đoạn của kỳ và trên cả ZEA, ZEA3, ZEAR |
| **Khoá lời 0.5R khi bắt đầu giữ** | Giữ tỉ lệ thắng gần mức cũ (46% so với 47%) mà vẫn thêm 24R |
| **Nghỉ 48 giờ** sau 2 lệnh thua cùng hướng | Vá chỗ Main H4 chậm hơn giá (tháng 1/2026 thua 12/15 lệnh) |
| Không vào trong **Main D1 / W1 ngược** | Dùng làm rào chắn thì tốt; dùng để chọn hướng thì không |
| EPA **bỏ phiên New York**, mọi kiểu bỏ 0h–6h | Potential EP phiên New York âm cả khi gần tin lẫn xa tin |
| **Đóng lệnh tối thứ 6** | Bỏ luật này mất 35R |
| U1w **không vào khi H4 chạy mạnh** | 7 lệnh, −2.9R |
| SL **tối đa 15 pip** | SL 12.5–15 pip: 34 lệnh +8.0R; dưới 12.5 pip: 98 lệnh +130R |

---

## 3. Những thứ KHÔNG có tác dụng (đã thử, đã bỏ)

### Điều kiện vào lệnh

| Ý tưởng | Kết quả |
|---|---|
| Đánh ngược xu thế (ngoài EPA tại Main / Shield) | Lỗ |
| Hướng theo Main M15 | Không ổn định |
| Hướng theo Main D1 / W1 | Không được; chỉ dùng làm rào chắn |
| Số tròn (25 pip) làm mốc vào | Chỉ thêm lệnh lỗ |
| Khối lượng kiểu PVSRA | Không cải thiện |
| LP phải có râu hai đầu ≥ 2 pip | Mất gần nửa LP M15; ZEAR +138.4R → +91.8R |
| Mẫu "2–3 nến râu ngắn dần rồi quay đầu" | Thêm 60% số lệnh nhưng tỉ lệ thắng giảm 6–9 điểm, PF ~3 → ~2 |
| Chấm điểm EP bằng mô hình (ridge) | Khớp quá khứ: +57.7R khi học → −4.0R khi kiểm tra → −12.5R ở giai đoạn cuối |
| Bỏ thêm giờ, bỏ phiên London, luật riêng cho phiên New York | Không biến thể nào dương ở cả ba giai đoạn |
| Chặn ±60 phút quanh tin | Không khác biệt rõ |

### Luật của các phương pháp H4 → M15 phổ biến

| Ý tưởng | Kết quả |
|---|---|
| ICT: chỉ mua ở nửa rẻ (discount) của biên độ | Ngược: nửa rẻ +49.3R (sụt 52%), nửa còn lại +101.9R (sụt 14%) |
| ICT: quét thanh khoản rồi phá cấu trúc (sweep + MSS) | Chạy riêng: 0R đến −30.8R |
| EMA hồi (H4 trên EMA200, M15 chạm EMA50) | 228 lệnh, thắng 31%, +9.1R |
| Phá biên độ phiên Á lúc London mở | 38 lệnh, +9.5R; thêm vào hệ không đổi gì |
| RSI quá bán / quá mua, khoảng trống giá (FVG), giờ London | Đổi chiều giữa hai giai đoạn |

Ghi chú: bộ lọc "không vào ở nửa rẻ" làm hệ sạch hơn (61 lệnh, thắng 59%, sụt 14%) nhưng bỏ hơn nửa số lệnh và giảm
tổng R. Chưa dùng; để dành nếu sau này ưu tiên sụt vốn thấp.

### Thoát lệnh

| Ý tưởng | Kết quả (ZEAR gốc +138.4R) |
|---|---|
| Đích cố định 2R, 3R | Kém hơn đích theo LP H4 |
| SL bám theo R (trailing) | Kém hơn |
| SL bám đáy 8 / 16 / 32 nến M15 | +70.9R / +102.7R / +119.1R |
| SL bám theo LP M15 mới (bài học Discord) | +106.5R |
| Thoát khi nến H4 đổi màu | +100.7R |
| Cắt sớm khi 1 nến M15 mạnh ngược | +106.8R |
| Thoát nếu sau 4 nến chưa đạt 0.3R | +100.1R |
| Không đóng cuối tuần | +103.7R |
| Tại LP ngược thì quay về luật chốt cũ | Mất hết phần lãi thêm của luật giữ |
| Đổi cách thoát theo pha H4 hoặc theo đà | Không cải thiện |

**Bài học chung về thoát lệnh:** giá hay hồi sâu trước khi chạy tiếp. Mọi kiểu siết SL hoặc cắt sớm đều làm mất lệnh
thắng nhiều hơn là cứu lệnh thua.

---

## 4. Lệnh thua và lệnh hoà trông thế nào (ZEAR, trước khi thêm hai luật mới)

- **Lệnh thua chết nhanh:** 29/49 chưa đi được 0.3R; 38/49 dính SL trong 4 giờ đầu.
- **Lệnh hoà đi đúng hướng:** 38/39 lệnh bị quét SL ở giá vào sau khi đã đi trung bình 1.85R; trong 24 giờ sau đó
  36/39 lệnh đi tiếp ít nhất 1R theo hướng cũ.
- **Lệnh thắng bị đóng sớm:** thực nhận 4.23R trong khi giá đi xa nhất 6.43R; 16/44 lệnh thắng đóng vì hết tuần.
- Không khác biệt theo thứ trong tuần, tin đỏ sau khi vào, biến động M15.

---

## 5. Vốn và rủi ro (ZEAR2, bắt đầu 30$)

| Lịch rủi ro | Backtest: 30$ → | Xáo trộn thứ tự lệnh: 5% xui nhất | Xác suất tụt dưới 20$ |
|---|---|---|---|
| 5% cố định | 6 254$ | 565$ | 0.1% |
| 3% cố định | 673$ | 52$ | 0% |
| **5% → 3% từ 200$ → 2% từ 500$** | 1 354$ | 420$ | 0.1% |
| 10% → 5% → 3% → 2% | 2 586$ | 933$ | 6.4% |

Nếu lệnh thắng ngoài đời chỉ còn 30% số R của backtest: lịch khởi đầu 5% có 16.8% khả năng lỗ sau 41 tuần và 4.8%
khả năng tụt dưới 20$; lịch khởi đầu 10% là 19.3% và 37.6%.

Các con số tiền phóng đại rất mạnh vì lãi kép. Chỉ dùng để so sánh các lịch với nhau.

---

## 6. Việc còn dở

- **Thêm dữ liệu:** ZOS chỉ tính được lịch sử tới 12/2025. Cần xuất thêm cặp tiền khác, hoặc chờ dữ liệu demo.
- **Chưa thử:** vào theo khoảng trống giữa các LP; mẫu săn dừng lỗ (SHs) theo 4 dấu hiệu của Zerd; bộ lọc nội chiến.
- **Chưa kiểm chứng:** EA chạy thật so với backtest từng lệnh; ZOS có vẽ lại nến cũ hay không.
