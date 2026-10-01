# 09 — Bản chất nến ZO (ZOS)

Tổng hợp từ 3 nguồn: wiki ZO (docs.kythuatforex.com: *ZOS - ZO Signal*, *Trạng thái thị trường*, *Tìm các tín hiệu vào lệnh*),
các đoạn giảng trên Discord, và **kiểm chứng trên 19.000 nến ZOS M15** của EURUSD (12/2025 → 9/2026).

> Wiki: *"80% thời gian, các ZO Trader sẽ dành cho việc đọc và phân tích các cây nến."*
> Zerd (28/3/2025): *"Mọi thứ nằm trong nến ZO cả rồi."*

---

## 1. Nến ZO được tính thế nào

Wiki: *"cây nến của ZOS khá tương tự Heiken Ashi, nhưng có râu nến dài hơn và thân nến có độ dốc lớn hơn."*

Kiểm chứng trên dữ liệu:

| Thành phần | Nến ZOS | Ý nghĩa |
|---|---|---|
| **Open** | **= trung điểm thân nến ZOS trước** (khớp 100%, đúng như Heiken Ashi) | Nến mở ở chỗ "cân bằng" của nến trước, không phải giá mở thật |
| **Close** | Một giá trung bình, lệch giá đóng thật khoảng 2 pip | Không phải giá đóng cửa thật |
| **High / Low** | Thường **bằng đúng** đỉnh/đáy giá thật | Giá thực sự đã tới đó |
| Biên độ | Khoảng 1.1 lần nến thường | Do open "trễ" có thể nằm ngoài biên độ thật |

→ Nến ZO là **nến đà (trend candle)**, được làm mượt và có độ trễ. Nó không phải nến price action.
Mô hình nến Nhật như pin bar, nhấn chìm, rút râu **không áp dụng trực tiếp** được.

## 2. Râu nến ZO = lực kéo, không phải "bị từ chối"

Số liệu trên nến ZOS M15:

| | Có râu **cùng chiều** nến | Có râu **ngược chiều** nến |
|---|---|---|
| Nến tăng | Râu trên: **96%** | Râu dưới: **42%** |
| Nến giảm | Râu dưới: **97%** | Râu trên: **41%** |

- **Râu cùng chiều gần như luôn có.** Vì open trễ và close là giá trung bình, đỉnh/đáy thật hầu như luôn vượt quá thân. Râu này chỉ cho thấy đà đang chạy, **không phải tín hiệu**.
- **Râu ngược chiều mới là thông tin.** Ví dụ nến tăng có râu dưới: trong nến đó có lực kéo xuống.
  - Trong xu hướng tăng mạnh, nến ZO **không có râu dưới** (nến 1 đầu).
  - Râu dưới xuất hiện nghĩa là phe bán bắt đầu kéo.
- **Nến thân nhỏ, râu dài một phía:** trạng thái giá đang bị kéo sang phía có râu. Râu thể hiện **sự kéo**, không phải "đã bị từ chối".
  - Zerd (29/3/2025, trên chart ZOZU): *"lên ARB có lực kéo của bot nên mới hình thành râu… các nến lên có râu trên là do bot nó kéo xuống."*
- **Nến 1 đầu:** chỉ biết chắc đầu có râu. ZZZ (10/9/2025): *"nến build 1 đầu giống nến Heiken Ashi… nến râu dưới thì xác định được Low, còn đỉnh nến chưa chắc đã là High."*
- **Nến 2 đầu:** hai phe cùng kéo → giằng co, tích luỹ. Có thể dùng làm biên High/Low của LP.

**Hệ quả cho việc vào lệnh (theo ý bạn):** mua ở G khi:
1. Có nến ZO với **râu dưới dài**: phe bán đang kéo giá xuống vào vùng.
2. **Nến kế tiếp không còn râu dưới** (hết lực kéo xuống), hoặc **có râu trên** (lực kéo đã đổi sang phía mua).

Đây là dấu hiệu "một phe thua" đúng theo cách nến ZO vận hành.

## 3. Thân nến = áp lực

- Wiki (Chạy lợi nhuận): *"ZOS thường tăng biên độ của thân nến và tạo ra một loạt các nến chỉ có râu về một phía. Thân càng dài, lực chạy càng lớn; thân giảm dần là dấu hiệu một giai đoạn Tích luỹ sắp bắt đầu."*
- Zerd (7/10/2024): *"Body càng to áp lực càng lớn; body càng bé áp lực đang cân bằng và có thể xoay giá."*
- Zerd (23/4/2025): *"Thân nến càng dài to nghiêng về 1 hướng = áp lực đang nghiêng về bên đó; đợi thân nến nhỏ lại, 2 đầu nhiều → có thể đảo chiều."*
- **Thu nến:** thân nhỏ dần, rồi nhiều nến 2 đầu, rồi chuyển hướng. Zerd (20/3/2025): *"Nến nó giảm thân dần, sau đó nhiều nến 2 đầu xuất hiện, cuối cùng chuyển hướng."*
- **Đóng thân mới tính, râu không tính:** Zerd (25/2/2025) *"râu ko liên quan, áp lực là close"*; (4/4/2025) *"áp lực đã kéo thân nến clear bên ngoài → vẫn là clear"*.
- **Phạm vi ảnh hưởng nằm trong thân:** Zerd (20/5/2025) *"nến D râu dài mà thân có chút tý, áp lực không lớn; phạm vi ảnh hưởng của D phải trong thân nến D."*

## 4. Màu nến = trạng thái xu hướng

| Màu | Wiki | Bên trong màu đó |
|---|---|---|
| **Xanh lá** | Xu hướng **tăng mạnh** | Nến tăng: xanh lá sáng · nến giảm: xanh lá đậm |
| **Xanh dương** | **Hồi** trong xu hướng tăng, hoặc **bắt đầu** xu hướng tăng | Sáng / đậm |
| **Đỏ** | Xu hướng **giảm mạnh** | Nến giảm: đỏ đậm · nến tăng: đỏ nhạt |
| **Hồng / tím** | **Hồi** trong xu hướng giảm, hoặc **bắt đầu** xu hướng giảm | Nến tăng: hồng · nến giảm: tím |
| **Vàng (Build)** | Hoạt động của **MM** | Thường đơn lẻ, hiếm khi thành chuỗi |

Trên M15 dữ liệu thật: đỏ 25% · tím 26% · xanh lá 18% · xanh dương 21% · vàng 9%.

- Màu đổi từ **xanh lá sang xanh dương** (hoặc đỏ sang tím) là giai đoạn giao nhau: đà yếu đi, có thể hồi hoặc xoay. Zerd (27/6/2025).
- **Matrix:** giá trị > 0 là tăng, < 0 là giảm; đọc từ M1 lên theo kiểu **domino**. Zerd (20/2/2024): *"xanh từ M1 tới H1 nhưng H4 tím → các khung nhỏ đang đánh lên H4, H4 vẫn giảm cho đến khi H4 xanh."*

## 5. Nến vàng (Build)

- Zerd (10/9/2025): *"nến vàng tượng trưng cho vùng MM đặt thanh khoản lớn để xả hoặc gom hàng; nến vàng 2 đầu là range MM tạo ra để thao tác với thanh khoản, hai đầu tượng trưng cho phạm vi kiểm soát của MM."*
- Build 2 đầu (hoặc chuỗi build) tạo **LP**. Build 1 đầu thì chỉ xác định được 1 đầu.
- Zerd (17/4/2025): *"trong 1 sóng, ở cuối sóng có 1 nến build (không phải nến 2 đầu) → thường là nến kết thúc sóng."*
- Zerd (23/3/2026): *"nến build = hoạt động cao (MM can thiệp); nến 2 đầu = hoạt động tích luỹ (không biết hướng nào)."*

## 6. Trạng thái thị trường đọc qua nến ZO (wiki)

| Trạng thái | Cách nhận biết trên nến ZO |
|---|---|
| **Tích luỹ** | Nhiều nến **2 đầu**, thường **không vàng**; biên độ nhỏ lại, giá chậm |
| **Chạy lợi nhuận** | Thân dài dần, một loạt nến **chỉ có râu một phía** |
| **Săn dừng lỗ** | Sau tích luỹ có vài nến "chạy" tiếp hướng cũ, rồi xoay lại hướng tích luỹ |

## 7. Những điều khác cần nhớ

- **Không quan tâm gap.** Zerd (3/3/2025): *"nến ZO thì không quan tâm GAP lắm"*, nhưng gap có ảnh hưởng tới áp lực của nến khung lớn.
- **Khung cao có độ trễ.** Zerd (4/3/2025): *"bản chất nến ZO không hiển thị kịp sóng nhỏ nhất ở khung cao… muốn nhìn rõ con sóng thì ngó M1 rồi về khung cao xem tiếp."*
- **ZOS đúng trên chart của chính khung đó.** Đọc từ khung khác qua iCustom sẽ sai (đã kiểm chứng).
- **Quy tắc vào lệnh trên wiki:** *mua khi khung nhỏ tạo GLP trong GLP khung lớn, vào càng gần Low càng tốt; bán ngược lại.* Các quy tắc đọc nến áp dụng ở **khung vào lệnh** (M15).

## 8. Hệ quả cho bộ luật backtest

| Hiện tại | Vấn đề | Sửa theo bản chất nến ZO |
|---|---|---|
| A2h dùng nến giá thường: râu ≥ 2 lần thân | Đọc theo price action, không phải nến ZO | Dùng nến ZOS: nến A có **râu ngược chiều dài** (lực kéo vào vùng), nến B **mất râu đó** hoặc **có râu phía ta** → vào |
| TC/TD dùng nến ZOS nhưng theo kiểu "râu ≥ 2 lần thân" | Coi râu là "từ chối" | Cùng luật A/B như trên |
| Giữ lệnh khi màu mạnh | Hợp lý | Thêm: còn **nến 1 đầu cùng chiều, thân không nhỏ lại** thì giữ; khi xuất hiện râu ngược chiều hoặc thu nến thì chốt |
