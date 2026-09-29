# 05 — Bộ quy tắc giao dịch ZOS

Mỗi quy tắc: **Luật** → **Bản chất** (vì sao đúng — để bạn tự suy ra khi gặp tình huống lạ) → **Dẫn chứng**.
Quy tắc gắn nhãn: 🔒 = bắt buộc (vi phạm là dừng) · ⚖️ = nguyên tắc ưu tiên · 💡 = kinh nghiệm tình huống.

> Zerd (2025-03-19): *"ZO giờ dùng tư duy hơn indicator: tư duy → lên plan → theo dõi plan → true/false → kèo winrate cao nả."*

---

## I. Bối cảnh (trước khi nhìn điểm vào)

### Q1 🔒 Xác định xu thế của từng khung bằng LP, từ lớn xuống nhỏ
- **Luật:** Với mỗi khung (W, D, H4, H1, M15): phe nào vừa clear LP của phe kia? Main nào còn sống? Shield nào còn?
- **Bản chất:** Xu thế = phe đang kiểm soát chỗ MM bảo vệ. Main còn nguyên = MM chưa bỏ vị thế.
- **Dẫn chứng:** *"Xu thế được xác định bằng MLP; cấu trúc chuẩn cho xu thế: MLP → Shield"* (2024-09-20).

### Q2 🔒 Xác định target
- **Luật:** Ghi ra LP khung lớn gần nhất phía trước theo hướng xu thế — đó là nơi giá đang tới.
- **Bản chất:** Chưa tới target thì mọi cú ngược là săn; tới target mới có đảo chiều.
- **Dẫn chứng:** *"Ranh giới giữa trader và mộng mơ là biết mục tiêu là gì"* (2025-03-24).

### Q3 ⚖️ Xác định pha: tích luỹ / chạy / phân phối / săn
- **Luật:** Nhiều nến 2 đầu, range hẹp, nhiều LP nhỏ = tích luỹ → **không trade**, chờ run. Chạy mạnh không LP = run hoặc
  SHs (xem dấu hiệu SHs ở file 03 §11). Lên mượt xuống giật = phân phối.
- **Bản chất:** Trade trong tích luỹ là đánh cờ với người có nhiều thời gian hơn bạn.
- **Dẫn chứng:** *"Khi market tích luỹ ta không trade được, chỉ trade khi nó run"* (2025-04-10); *"MM muốn chạy thì đã chạy;
  chỉ có đang dụ người ta mới làm giá đắn đo chậm chạp"* (2026-03-03).

### Q4 ⚖️ Áp lực 3 khung
- **Luật:** Khung vào lệnh + 2 khung trên cùng áp lực → theo. Xen kẽ → nghỉ hoặc chỉ scalp nhỏ.
- **Dẫn chứng:** Zerd 2025-05-07 — *"tăng cả 3 khung = tìm buy, giảm cả 3 = tìm sell, xen kẽ thì nghỉ"*.

### Q5 🔒 Không trade trong: nội chiến, LP chồng/kẹp, vùng trung lập, 30 phút quanh tin đỏ, khuya, sáng thứ 2 phiên Á, chiều thứ 6
- **Bản chất:** Ở những chỗ đó cả hai phe đều có thể đúng → xác suất 50/50, SL dễ bị quét, không có điểm cuối rõ.
- **Dẫn chứng:** file 04 mục C.

## II. Điểm vào

### Q6 🔒 Chỉ buy ở Low vùng G, chỉ sell ở High vùng R (của LP khung vào lệnh trở lên)
- **Bản chất:** Low G / High R là nơi MM thủ cuối cùng. Vào ở đó: đúng → phản ứng đủ BE; sai → SL ngắn và SL "đáng" vì MM
  đã vỡ trận thật.
- **Dẫn chứng:** *"Cứ low G high R thôi, an toàn chắc ăn"* (2025-03-06); *"nhiệm vụ của mình là phụ MM đoạn cuối"* (2024-01-19).
- **Ngoại lệ 💡:** Khi xu thế khung lớn mạnh (vd đang chạy đường của W), High G / Low R nhỏ cũng có thể kích — nhưng chỉ lot nhỏ
  (*"tại High H4, High H1 đều có thể kích hoạt GLP, không nhất thiết phải về Low"* — 2024-09-18).

### Q7 🔒 Không đuổi break — vào ở retest (BBR)
- **Bản chất:** Break là lúc đám đông nhảy vào; retest là lúc MM lấy thêm hàng. Vào retest = cùng giá với MM, SL ngay mép.
- **Dẫn chứng:** *"Đã confirm out thì sẽ retest"* (2025-03-19); *"retest mới có kèo ngon"* (2025-04-14).

### Q8 🔒 Không vào khi giá lao tới — chờ phản ứng
- **Luật:** Giá chạm vùng → khung nhỏ (M1–M15) **thu nến** / **nến 2 đầu** / **LP cùng chiều** / **cấu trúc xoay** → mới vào.
- **Bản chất:** Lao ầm ầm = áp lực còn nguyên, rất có thể đi xuyên. Chậm lại = phe đối diện bắt đầu hấp thụ.
- **Dẫn chứng:** ZZZ 2025-11-05; Zerd 2025-03-20 *"khi chạm Low H1 rồi đi chậm dần và xây thì ok"*.

### Q9 ⚖️ Ưu tiên LP nhỏ cùng chiều sinh ra trong lúc retest LP lớn ("retest-run")
- **Luật:** LP lớn đang retest; khung nhỏ tạo LP **cùng chiều** LP lớn (hoặc Main cùng chiều) → vào khi retest LP nhỏ đó.
- **Bản chất:** LP nghịch trong lúc retest là MM ép giá; LP đồng chiều xuất hiện = MM bắt đầu bảo vệ → cực hạn đã đến.
- **Dẫn chứng:** Zerd 2023-12-12 (LP nghịch / đồng BBR); ZZZ 2023-11-23 (khung kích).

### Q10 🔒 Không đánh ngược Main
- **Luật:** Chỉ sell khi khung đang xét không có Main G đối nghịch; chỉ buy khi không có Main R đối nghịch.
- **Bản chất:** Main là vua. Đánh ngược Main = đánh vào nơi MM phòng thủ mạnh nhất.
- **Dẫn chứng:** *"Chỉ sell khi MM không tạo ra bất kỳ Main GLP nào đối nghịch; chỉ buy khi không có Main RLP đối nghịch; các
  vị trí EP phải nằm trong 1 cái Shield nào đó"* (2024-01-18).

### Q11 ⚖️ Ít nhất 3 lý do độc lập
- Ví dụ: (1) mép LP khung lớn, (2) cùng xu thế, (3) khung nhỏ thu nến / LP cùng chiều, (4) RN, (5) trùng mép LP khung khác, (6) giờ phiên phù hợp.

## III. SL — TP — BE

### Q12 🔒 Đặt SL trước, rồi mới quyết định có vào không
- **Luật:** SL ở ngoài mép LP (1–3 pip + spread) hoặc ngoài cấu trúc khung nhỏ. Nếu SL > giới hạn → bỏ kèo, không kéo lot.
- **Bản chất:** SL là câu trả lời cho "khi nào mình sai". Nếu không trả lời được thì chưa có kèo.
- **Dẫn chứng:** *"Điểm đặt SL quyết định trước cả EP"* (ZZZ 2025-05-08).

### Q13 🔒 RR tối thiểu 1:1.5 tới TP thực tế (mép LP ngược chiều gần nhất)
- **Bản chất:** Backtest của bộ tool: RR < 1.5 là bộ lọc loại lệnh lỗ nhiều nhất. Target phải có chỗ trống để chạy.

### Q14 ⚖️ BE theo LP mới, không theo số pip cố định
- **Luật:** Giá tạo LP bảo vệ mới cùng chiều → dời SL ra sau mép LP đó 1–2 pip. Gặp LP ngược chiều → kéo BE.
- **Dẫn chứng:** Zerd 2025-04-21.

### Q15 ⚖️ Chốt khi giá "làm trò" ở LP khung lớn
- **Luật:** Tới gần LP lớn ngược chiều: vẫn chạy mạnh → giữ; lên build / nến 2 đầu / tạo LP ngược → chốt phần lớn.
- **Dẫn chứng:** Zerd 2024-01-16.

## IV. Kỷ luật

### Q16 🔒 Giới hạn ngày: thua 2 lệnh liên tiếp hoặc -3% → nghỉ hết ngày. Thắng đủ target ngày → nghỉ.
- **Dẫn chứng:** *"1 ngày làm được 1 combo 2 thì nghỉ; 1 ngày lỗ 3 lần thì nghỉ"* (2025-06-12).

### Q17 🔒 Lỡ kèo thì bỏ
- **Bản chất:** Đuổi = vào ở giữa → SL xa, RR xấu. Xu thế còn thì sẽ có Shield mới.
- **Dẫn chứng:** ZZZ 2025-06-04: *"1 tuần 1 kèo hoặc 2 tuần 1 kèo; lỡ thì bỏ."*

### Q18 🔒 Không DCA lệnh âm, không dời SL xa hơn
- **Dẫn chứng:** *"DCA từ 61.8 là tà đạo vì làm âm trạng thái, mất thế chủ động BE"* (2025-03-13).

### Q19 ⚖️ Ghi nhật ký mỗi lệnh: lý do, SL ở đâu vì sao, kết quả, bài học
- **Dẫn chứng:** ZZZ 2023-11-22: *"thống kê ≥ 10 kèo đo winrate"*; Zerd *"vào lệnh đi nghịch ý thì bới móc tìm hiểu tại sao"*.

### Q20 💡 Một plan bị huỷ là huỷ hẳn
- **Dẫn chứng:** Zerd 2023-11-23: *"Một khi đã huỷ thì mọi plan phải bị huỷ, không phải giá còn trong plan mà huỷ ngang."*

---

## Quy trình 1 phiên (dán cạnh màn hình)

```
1. Sáng (7h15 bản tin):  W/D áp lực? H4 xu thế + Main? Target? Pha (tích luỹ/run)?
2. Vạch 2 kịch bản với mốc xác nhận: "Nếu H4 đóng dưới X → sell ở …; nếu giữ trên Y → buy ở …"
3. Đặt cảnh báo ở các mép Low G / High R quan trọng. TẮT chart.
4. Có cảnh báo → mở H1/M15:  giá đã chạm? đã chậm lại? có LP/cấu trúc cùng chiều?
5. Tính SL trước → RR ≥ 1.5? → lot theo % rủi ro → vào.
6. Có LP bảo vệ mới → dời SL. Gặp LP lớn ngược → BE / chốt.
7. Ghi nhật ký. Hết giới hạn ngày → nghỉ.
```
