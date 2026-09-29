# 01 — Nền tảng trading (cho người mới)

File này chỉ giữ những gì **cần để hiểu ZOS**. Mỗi mục có phần "Liên hệ ZO" để thấy kiến thức cơ bản được dùng ở đâu.

---

## 1. Đơn vị và lệnh

| Khái niệm | EURUSD | Ghi chú |
|---|---|---|
| **Pip** | 0.0001 (MT4 5 số: 10 point = 1 pip) | 1.10250 → 1.10350 = 10 pip |
| **Lot** | 1 lot = 100.000 EUR | 1 lot ≈ 10 USD/pip; 0.01 lot ≈ 0.1 USD/pip |
| **Spread** | XM Ultra Low ~0.6–1.2 pip | Chi phí mỗi lệnh; tin tức làm giãn spread |
| **Đòn bẩy x1000** | Chỉ ảnh hưởng **ký quỹ**, không ảnh hưởng lãi/lỗ mỗi pip | Đòn bẩy cao ≠ được vào lot to. Rủi ro do **lot + SL** quyết định |

**Công thức lot** (bắt buộc thuộc):

```
lot = (vốn × %rủi ro) / (SL_pip × 10)
Ví dụ: vốn 500$, rủi ro 2% = 10$, SL 15 pip → lot = 10 / (15 × 10) = 0.066 → 0.06
```

**Liên hệ ZO:** Zerd (2025-01-14): *"thu nhập 2k/tháng mà đánh 1 lot, âm 20 pip mất 10%… dương thì không dám hold vì
sợ mất lãi"* → lot sai làm hỏng tâm lý trước khi kỹ thuật kịp đúng.

## 2. SL, TP, RR, BE

- **SL (stop loss)** — nơi lệnh bị cắt. Trong ZO, SL **không phải số tiền chấp nhận mất**, mà là *nơi nếu giá chạm
  tới thì kịch bản của bạn đã sai* (ZZZ 2025-05-08: *"SL ở ZO là khi bị cắn tức thị trường đã đảo chiều… điểm đặt SL
  quyết định trước cả EP"*).
- **TP (take profit)** — thường là mép LP ngược chiều phía trước (nơi có lực cản).
- **RR (risk:reward)** — TP/SL. RR 1:2 = rủi ro 10 pip để lấy 20 pip.
- **BE (break-even)** — dời SL về giá vào → rủi ro = 0. ZO dùng BE rất nhiều: *"10 lệnh của Zerd thì 7 lệnh BE"* (ZZZ 2025-06-12).
- **Winrate × RR** mới ra lợi nhuận: winrate 40% với RR 1:2 vẫn lãi; winrate 70% với RR 1:0.3 vẫn lỗ.

## 3. Nến và giá

- Mỗi nến có **Open, High, Low, Close**. Thân (body) = Open→Close; râu (wick/bóng) = phần còn lại.
- **Thân dài** = một phe áp đảo trong khung thời gian đó. **Râu dài** = giá bị đẩy đi rồi bị từ chối.
- **Nến 2 đầu** (râu cả trên và dưới, thân nhỏ) = hai phe giằng co → do dự / tích luỹ.
- **Đóng nến (close)** quan trọng hơn râu: *"râu không liên quan; áp lực là close qua High W, close càng xa càng cho
  thấy khả năng thành công cao"* (Zerd 2025-02-25).

## 4. Cấu trúc giá (xu hướng theo sóng)

- **Tăng:** đỉnh sau cao hơn đỉnh trước (HH), đáy sau cao hơn đáy trước (HL).
- **Giảm:** LH + LL.
- **Đổi cấu trúc:** trong xu hướng tăng, xuất hiện đáy thấp hơn đáy trước → cấu trúc có thể chuyển giảm.
- Zerd (2025-04-08): *"cách dễ nhất để scalp là xem cấu trúc: đỉnh thấp hơn, đáy thấp hơn → đổi cấu trúc giảm; trong
  quá trình đó LP quan trọng sinh ra → khai thác đón cú run"*.
- Zerd (2025-03-20): mục đích đọc cấu trúc ở khung nhỏ là **xác định SL gần nhất**: *"sai cấu trúc = SL"*.

**Liên hệ ZO:** Zerd phân biệt **sóng = xu hướng** (thấy được khi giá đã đi) và **LP = xu thế** (diễn ra âm thầm,
sớm hơn sóng) — xem file 03, mục Xu thế.

## 5. Hỗ trợ / kháng cự (S&R)

- Nơi giá từng phản ứng mạnh → có lệnh chờ / có người quan tâm → dễ phản ứng lại.
- **Số tròn (RN)**: 1.1000 (whole), 1.1050 (half), 1.1025/1.1075 (quarter). Lệnh chờ & SL của đám đông tụ ở đây.
- Trong ZO, S&R quan trọng nhất là **High/Low của các LP khung lớn**, RN là yếu tố cộng thêm.

## 6. Đa khung thời gian

- Khung lớn quyết định **hướng và phạm vi**; khung nhỏ quyết định **điểm vào và SL**.
- Sức mạnh: *"W > D > H4 > H1 > M15"* (Zerd 2024-01-19).
- Cặp khung ZO (Zerd 2025-05-07): **M1 → M15 → H4 → W** và **M5 → H1 → D1 → MN** (mỗi khung ≈ ×15/×4 khung dưới).
- Xu hướng **bắt đầu từ khung nhỏ nhất rồi lan lên** (M1 → M5 → M15 → H1 → H4…) — *"M1 có thể thay đổi cả MN"*
  (2026-03-03) — nhưng khung lớn **xác nhận chậm** hơn.

## 7. Phiên giao dịch (giờ Hà Nội, mùa hè châu Âu)

| Phiên | Giờ VN | Đặc điểm theo Discord |
|---|---|---|
| Á (Tokyo) | 6h–14h | Thanh khoản thấp; *"clear vào sáng thứ 2 lúc phiên Á thanh khoản thấp → cần LO và NY xác nhận"* (2025-01-27) |
| Frankfurt / London (LO) | 13h–22h | *"phiên F test cầu, LO đạp, NY bay"* (2026-03-23) |
| New York (NY) | 19h–4h | Tin Mỹ 19h30/21h; cú chạy lớn thường ở đây |
| Khuya | 0h–6h | *"khuya đa số ngân hàng nghỉ, lực kéo không còn"*; *"BE treo qua đêm hay bị cắn"* |

Thói quen tuần/tháng: thứ 2 hay bẫy, thứ 6 cuối tuần hay "trở mặt", cuối/đầu tháng MM thiết lập lại vị thế
(Zerd 2024-10-01, 2025-06-25).

## 8. Tin tức

- Tin chỉ là **thời điểm (timing)** để MM thực hiện kế hoạch, không phải nguyên nhân (PVSRA). MM có thể đi ngược tin.
- *"Mỗi tin lưu tác động 2–3 ngày"* (Zerd 2024-04-11). CPI = lạm phát ngắn hạn, PPI = dài hạn; NFP/thất nghiệp →
  Powell/Fed; ECB cho EUR.
- *"Gần tin nó tạo thế trung lập, cả 2 bên đều có thể đúng"*; *"tin rate: đừng làm gì cả, còn họp báo"*;
  *"CPI thì BE cũng như không, flash trượt giá"*.

## 9. MM, retail và thanh khoản — nền của mọi thứ

- Để **mua một khối lượng lớn** mà không đẩy giá lên, MM cần **người bán đối ứng** → cần đám đông đang bán
  (hoặc SL của phe mua bị kích hoạt — SL của lệnh buy là lệnh bán).
- Vì vậy MM **đưa giá tới nơi có nhiều lệnh** (dưới đáy cũ, dưới RN, dưới vùng hỗ trợ ai cũng thấy) → đó là
  **thanh khoản**. Săn SL (SHs) là cách "gom hàng".
- Hệ quả: *"cái gì trader ngoài kia thấy nó sẽ săn; cái em thấy mà họ không thấy thì không săn"* (Zerd 2025-04-11).
- *"Thanh khoản mỏng chạy mạnh, thanh khoản dày chạy yếu"* (2024-10-26); *"80% thời gian market hút thanh khoản, rơi
  vào vùng trung lập nên đại đa số trader tạch; thời điểm vàng không nhiều"* (2024-09-12).
- Loại sàn: Zerd nhận xét XM là sàn MM (ôm lệnh) — số liệu tick/volume và cả nến có thể khác sàn ECN (2025-03-27,
  2025-05-16). ZOS dùng dữ liệu riêng (on-chain/API), nên LP vẫn dùng được.

## 10. Checklist trước khi học tiếp

- [ ] Tính được lot từ vốn, % rủi ro, SL.
- [ ] Nhìn chart gọi được: đang HH-HL hay LH-LL.
- [ ] Hiểu vì sao "SL = nơi kịch bản sai" chứ không phải "số tiền chịu mất".
- [ ] Hiểu vì sao MM cần đám đông ở phía ngược lại.
