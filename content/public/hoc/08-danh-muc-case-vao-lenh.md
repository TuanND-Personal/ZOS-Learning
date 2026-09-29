# 08 — Danh mục tình huống giá vs LP: H4 phân tích → M15 vào lệnh

Chỉ 1 bộ khung: **H4** là khung phân tích, **M15** là khung vào lệnh. Quy trình: tìm LP H4 → xu thế và Main H4 →
phân tích M15 (xu thế, LP M15 sinh ra khi giá ở LP H4) → vào lệnh ở retest LP M15 → quản lý lệnh.
Mỗi case có điều kiện máy đo được để **backtest**. (Bản [06](06-danh-sach-case-lp.md) là danh sách rộng cũ, nhiều khung.)
Ảnh chart minh hoạ từ Discord: xem trang riêng tư [Minh hoạ case](minh-hoa-case.md).
Cột **Đề xuất** đã điền sẵn — sửa trực tiếp chỗ nào không đúng ý. Mình sẽ chuyển mỗi dòng thành luật backtest;
dòng ghi **TEST** sẽ được chạy cả 2 cách để so sánh.

## Đề xuất tổng: 1 setup chính + 2 biến thể để so

**Setup chính (H4 → M15):**

1. **Nền H4:** LP H4 đã là G/R, cùng xu thế LP H4 (B1), đang retest lần 1–2 (A8/A9), ưu tiên Shield/Main H4 (B6/B7).
   Loại: giá trong LP H4 chưa break, nội chiến H4, kẹp chật, vùng trống, xu thế H4 chưa rõ.
2. **Trigger M15:** khi giá ở trong / sát LP H4, M15 tạo **LP cùng chiều LP H4 rồi break** (D1) hoặc **Main M15 cùng chiều** (D2).
3. **Vào lệnh:** chờ giá retest LP M15 đó, **vào khi nến M15 đóng ra lại theo hướng break** (E5).
4. **SL:** điểm cuối LP M15 + 2 pip. **TP:** mép gần của LP H4 ngược gần nhất. **RR ≥ 1.5**, không có Main H4 ngược chắn đường.
5. **Quản lý:** chưa tới 1.5R thì giữ nguyên SL; **đạt 1.5R thì dời SL về BE** (TEST 1R); sau đó dời SL ra sau mỗi LP M15 mới cùng chiều; lệnh chờ quá 12h thì huỷ; thứ 6 sau 22h đóng hết.
6. **Giới hạn:** rủi ro 1%/lệnh, tối đa 2 lệnh thua/ngày thì nghỉ; không vào lúc khuya, sáng thứ 2, tối thứ 6, quanh tin đỏ.

**Bản linh động (đang đề xuất dùng, ≈ 1–2 lệnh/tuần):** giống setup chính nhưng
xu thế H4 linh động (LP trend / màu ZOS H4 / chưa rõ), không giới hạn số lần retest H4, nội chiến H4 từ 12 nến mới loại,
"ở LP H4" cách vùng ≤ 10 pip, chờ nến vào lệnh tới 24h, chỉ tránh khuya 0–6h, **TP thẳng tới LP H4 ngược** (bỏ rút TP về LP M15),
**BE ở 1.5R**. Setup chính (chặt) chỉ cho khoảng 1 lệnh/tháng.

**Biến thể để backtest so sánh:**

- **A — limit 50% LP M15** (E3): giá tốt hơn, RR cao hơn, nhưng khớp cả những lần giá đi xuyên.
- **B — thu nến M15 tại LP H4** (D9): vào sớm hơn, không cần LP M15; SL ngoài điểm cuối LP H4 (xa hơn).
- **C — nội chiến** (N1/N2/N4): trong LP H4 ngược xu thế, M15 tạo LP tấn công → đánh về điểm cuối LP H4 (có thể clear); lot 50%, backtest riêng.

Lý do chọn: backtest trước đã cho thấy vào bằng nến xác nhận tốt hơn limit ở mép, RR < 1.5 là thứ kéo lỗ nhiều nhất,
và chỉ đánh thuận xu thế tốt hơn đánh ngược. Setup chính bám đúng bài của Zerd: LP H4 là nơi MM thủ, M15 tạo LP cùng chiều
là dấu hiệu MM bắt đầu bảo vệ (retest xong), vào ở retest LP M15 cho SL ngắn và SL "đáng".

Ba loại case:

- **Điểm vào** — sự kiện có thể kích hoạt lệnh: bạn chọn VÀO / CHỜ / KHÔNG, hướng, EP, xác nhận, SL, TP, hết hạn.
- **Bộ lọc** — bối cảnh đi kèm: *bắt buộc có* / *loại bỏ* / *giảm lot* / *không quan tâm*.
- **Quản lý** — khi lệnh đang mở: BE, dời SL, chốt một phần / hết, cắt, giữ, huỷ lệnh chờ.

Máy đo: ✅ đo được · 🟡 cần tham số / dữ liệu thêm · ❌ cần mắt người.

Cách viết ngắn gọn (ví dụ):

- Điểm vào: `VÀO theo LP H4 · EP đóng-xác-nhận · SL điểm cuối LP M15 · TP LP ngược H4 · hết hạn 12h` hoặc `KHÔNG` hoặc `CHỜ → E1`
  (EP: mép gần / 50% / điểm cuối / đóng xác nhận / retest LP M15 · xác nhận: thu nến M15 / LP M15 cùng chiều / Main M15 cùng chiều ·
  SL: điểm cuối LP M15 / điểm cuối LP H4 · TP: LP ngược M15 / LP ngược H4 / 2R / 3R / dời BE theo LP M15).
- Bộ lọc: `BẮT BUỘC` (chỉ vào khi có) / `LOẠI` (không vào khi có) / `GIẢM LOT` / `BỎ QUA`.
- Quản lý: `BE` / `DỜI SL sau LP` / `CHỐT 50%` / `CHỐT HẾT` / `CẮT` / `GIỮ` / `HUỶ LỆNH CHỜ`.
- Muốn đổi ngưỡng thì sửa cột **Mặc định** ở bảng tham số.

## Tham số dùng trong điều kiện

| Mã | Ý nghĩa | Mặc định |
|---|---|---|
| `breakFar` | Break xa: close cách mép ≥ … % chiều cao LP | 30 |
| `breakNear` | Break sát: close cách mép < … % chiều cao LP | 10 |
| `runAway` | Chạy xa: giá cách mép ≥ … × chiều cao LP | 1 |
| `stallBars` | Nằm trong vùng (nội chiến) / chờ base: ≥ … nến của khung đó | 6 |
| `fastBody` | Nến lao mạnh: thân ≥ … × thân TB 10 nến | 1.5 |
| `shsBars` | Chết ngay sau break (SHs): trong ≤ … nến | 3 |
| `tightPips` | Kẹp chật: khoảng trống giữa 2 LP < … pip | 15 |
| `roomPips` | Khoảng trống / vùng trống: ≥ … pip | 30 |
| `confluencePips` | Trùng RN / trùng mép LP khác: ≤ … pip | 5 |
| `slBuffer` | SL cách mép: … pip | 2 |
| `minRR` | RR tối thiểu | 1.5 |
| `beAtR` | Dời SL về BE khi giá đã đi được ≥ … R (TEST 1 và 1.5) | 1–1.5 |

## A. Bước 1 · Trạng thái LP H4 quanh giá

Tìm các LP H4 gần giá và xem mỗi LP đang ở giai đoạn nào.

| ID | Loại | Tình huống | Điều kiện máy đo | Gợi ý Discord | Máy | Đề xuất (sửa nếu không đúng ý) |
|---|---|---|---|---|---|---|
| A1 | Bộ lọc | Giá nằm trong LP H4 chưa break | LP H4 dir = 0, giá giữa Low–High. | Còn là LP thì tranh chấp; EP trong LP chưa màu không an toàn (27/10/2024). | ✅ | LOẠI — chưa biết phe nào thắng, không có điểm cuối để đặt SL. |
| A2 | Bộ lọc | LP H4 vừa break xa | Nến H4 break có close cách mép ≥ breakFar % chiều cao LP. | Close càng xa càng dễ thành công (25/2/2025). | ✅ | BỎ QUA — break xa là điểm cộng; TEST xem có nên chỉ nhận break xa không. |
| A3 | Bộ lọc | LP H4 vừa break sát | Nến H4 break có close cách mép < breakNear %. | Close sát thì chỉ cần quay lại là hỏng (25/2/2025). | ✅ | LOẠI — H4 đóng sát mép dễ quay vào lại; chờ H4 đóng xa hơn hoặc bỏ. |
| A4 | Bộ lọc | LP H4 đã break, giá chạy xa chưa retest | Giá cách mép ≥ runAway × chiều cao LP H4, chưa vào vùng. | Retest rồi run hiếm quay lại (28/2/2025); lỡ thì bỏ (ZZZ). | ✅ | BỎ QUA — không đuổi; chờ LP H4 tiếp theo hoặc retest (G7 tự loại nếu không có nền H4). |
| A5 | Điểm vào | LP H4 đang retest nông (chạm mép gần) | Giá M15 chạm mép gần LP H4 (High G / Low R), chưa qua 50%. | LP lên rồi làm R thì retest hay nông (24/4/2025). | ✅ | CHỜ → trigger M15 (D1 / D2), không đặt limit trực tiếp ở mép H4. |
| A6 | Điểm vào | LP H4 đang retest sâu (qua 50%) | Giá qua 50% LP H4, chưa qua điểm cuối. | ZZZ: cố bắt khi retest hơn 50% (22/11/2023). | ✅ | CHỜ → trigger M15 (D1 / D2). Vùng qua 50% là vùng đẹp nhất để chờ. |
| A7 | Điểm vào | Giá quét qua điểm cuối LP H4 rồi quay lại | Râu M15/H4 qua Low G (High R) H4, nến H4 vẫn đóng trong LP. | Quét SL trước khi chạy; test lần 2 thọc sâu hơn (23/8/2024). | ✅ | CHỜ → trigger M15 (D1 / D2); SL phải ngoài râu quét. |
| A8 | Bộ lọc | Retest LP H4 lần đầu | retests H4 = 1. | Lần đầu mạnh nhất (1/12/2023, 3/1/2025). | ✅ | BỎ QUA — retest lần 1 là điểm cộng (tính riêng trong thống kê). |
| A9 | Bộ lọc | Retest LP H4 lần 2 | retests H4 = 2. | Không còn full sức như lần đầu (3/1/2025). | ✅ | BỎ QUA — vẫn nhận; so sánh kết quả với lần 1. |
| A10 | Bộ lọc | Retest LP H4 lần ≥ 3 | retests H4 ≥ 3. | Lần 3 là quyết định, quá 3 lần hay xoay (17/4/2025). | ✅ | BỎ QUA (bản linh động) — ghi số lần retest vào thống kê; bản chặt: LOẠI lần ≥ 3. |
| A11 | Bộ lọc | Nội chiến H4: giá nằm trong LP H4 lâu | Giá trong LP H4 (đã G/R) ≥ stallBars nến H4. | Nội chiến → đóng máy đi ngủ (ZZZ 19/1/2024); chỉ scalp. | ✅ | LOẠI khi giá đóng nến H4 trong LP H4 ≥ 12 nến liên tiếp (bản chặt: 6). Nội chiến có cách đánh riêng ở nhóm N (TEST). |
| A12 | Điểm vào | LP H4 vừa thủng / clear | Nến H4 close qua điểm cuối, hoặc thân bao cả LP. | MM vỡ trận; LP bảo vệ gãy thì tiếp tục hướng đó (13/1/2025). | ✅ | KHÔNG vào ngược ngay. Xu thế H4 có thể đổi → chờ LP H4 mới / Main mới (B4) rồi làm lại quy trình. |
| A13 | Bộ lọc | LP H4 chết ngay sau break (SHs) | tDead − tBreak ≤ shsBars nến H4. | LP xây xong bị phá ngay = dấu hiệu SHs (22/4/2025). | ✅ | BỎ QUA — LP đã chết thì không dùng; ghi nhận dấu hiệu SHs trong nhật ký. |
| A14 | Điểm vào | Giá quay lại chạm LP H4 đã chết từ phía bên kia | LP H4 đã thủng/clear; giá M15 chạm lại vùng đó từ phía đối diện. |  | ✅ | KHÔNG (setup chính). TEST riêng: coi LP chết là vùng phía ngược lại, chờ trigger M15. |
| A15 | Bộ lọc | Giá ở vùng trống H4 | Không LP H4 nào trong roomPips cả trên lẫn dưới. | Không có base thì EP thế nào cũng sai (16/4/2025). | ✅ | LOẠI — không có nền H4 (trùng G7). |
| A16 | Điểm vào | Giá kẹp giữa G H4 dưới và R H4 trên, có khoảng trống | G H4 sống bên dưới, R H4 sống bên trên, cách nhau ≥ roomPips. | G + R kẹp = biên SW, scalp 2 biên (20/3/2025). | ✅ | KHÔNG với người mới. TEST riêng: trigger M15 ở biên, TP = biên kia. |
| A17 | Bộ lọc | Kẹp chật giữa 2 LP H4 | Khoảng trống giữa LP H4 trên và dưới < tightPips. | LP chồng LP: kẽ hở 5–20 pip (19/9/2024). | ✅ | LOẠI — không đủ không gian cho RR. |
| A18 | Bộ lọc | G H4 và R H4 chồng lấn nhau | Hai LP H4 ngược chiều sống, vùng giao nhau > 0. | Giáp lá cà, không có range chạy. | ✅ | LOẠI — giáp lá cà. |
| A19 | Điểm vào | Giá chạm target H4 (LP H4 ngược phía trước) | Giá chạm mép LP H4 ngược chiều với xu thế đang chạy. | Chạm High R rồi thì sell dí không sao; chưa chạm mà sell = cờ bạc (24/3/2025). | ✅ | KHÔNG đánh ngược ngay tại target. Chỉ khi H4 đổi xu thế (B9) hoặc có Main H4 ngược mới. |
| A20 | Bộ lọc | Nhiều LP H4 cùng chiều xếp tầng phía sau giá | ≥ 3 LP H4 cùng chiều còn sống liên tiếp. | Nhiều lớp → càng quan trọng với MM (5/6/2025). | ✅ | BỎ QUA — điểm cộng khi chọn TP xa (nhiều lớp phía sau = nền chắc). |

## B. Bước 1 · Xu thế và Main H4

Phe nào đang thắng ở H4, Main / Shield H4 ở đâu, lực nến H4.

| ID | Loại | Tình huống | Điều kiện máy đo | Gợi ý Discord | Máy | Đề xuất (sửa nếu không đúng ý) |
|---|---|---|---|---|---|---|
| B1 | Bộ lọc | Lệnh cùng xu thế LP H4 | Hướng lệnh = xu thế LP H4 (phe vừa giết LP gần nhất). | Không cản tàu (13/8/2025). | ✅ | BẮT BUỘC dạng linh động: xu thế LP H4 cùng hướng, HOẶC màu ZOS H4 cùng hướng, HOẶC xu thế H4 chưa rõ. Bản chặt: chỉ xu thế LP H4. |
| B2 | Bộ lọc | Lệnh ngược xu thế LP H4 | Hướng lệnh ngược xu thế LP H4. | EP nghịch xu thế là 1 trong 4 EP không an toàn (27/10/2024). | ✅ | LOẠI khi cả xu thế LP H4 lẫn màu ZOS H4 đều ngược hướng lệnh. |
| B3 | Bộ lọc | Xu thế H4 chưa rõ | Chưa có LP H4 nào chết trong dữ liệu (trend = 0). |  | ✅ | LOẠI — chưa biết phe thắng. |
| B4 | Điểm vào | Main H4 mới hình thành | Một LP H4 vừa được gắn Main (LP H4 ngược vừa chết). | Vừa xác nhận Main → khả năng test lại Shield (17/10/2024). | ✅ | CHỜ → giá retest Shield / Main H4 (B6 / B7) rồi trigger M15. |
| B5 | Bộ lọc | Main H4 chưa có Shield | Main H4 sống, chưa có LP H4 cùng chiều nào sinh sau nó. | Tướng ra trận không có lính (26/7/2024). | ✅ | BỎ QUA — vẫn nhận; TEST có nên giảm lot không. |
| B6 | Điểm vào | Giá retest Shield H4 | Giá vào vùng Shield H4 còn sống. | Gặp shield là nối xu thế (19/6/2025). | ✅ | CHỜ → trigger M15 (D1 / D2). Vùng ưu tiên. |
| B7 | Điểm vào | Giá retest Main H4 | Giá vào vùng Main H4 còn sống. | Quay lại Main có nhiều lực hỗ trợ hơn (18/1/2024). | ✅ | CHỜ → trigger M15 (D1 / D2). Vùng ưu tiên nhất (vua). |
| B8 | Điểm vào | Shield H4 chết, Main H4 còn | Shield H4 vừa thủng/clear, Main cùng chiều còn sống. | 3 kịch bản: đánh vào Main / hạ xuống build G / sập về G gần nhất (3/4/2025). | ✅ | KHÔNG mở lệnh mới cùng chiều cho tới khi giá về Main H4 và có trigger M15. |
| B9 | Điểm vào | Main H4 chết | Main H4 vừa thủng/clear → xu thế H4 đổi. | Bẻ cả Main thì xác nhận mất xu thế (10/1/2025). | ✅ | Đóng lệnh cùng chiều cũ; KHÔNG vào ngược ngay — chờ LP H4 mới của phe thắng. |
| B10 | Bộ lọc | Nến H4 thu nến (giảm áp lực) | ≥ 3/5 nến H4 gần nhất là nến 2 đầu thân ≤ 40% range. | Thân nhỏ dần, nến 2 đầu = giảm áp lực, sắp xoay (7/10/2024). | ✅ | BỎ QUA — điểm cộng khi giá đang ở LP H4; TEST làm bộ lọc bắt buộc. |
| B11 | Bộ lọc | Nến H4 thân dài đang lao về phía LP | Nến H4 gần nhất thân ≥ fastBody × thân TB, hướng vào LP. | Áp lực lớn còn nguyên → dễ đi xuyên. | ✅ | BỎ QUA — trigger M15 tự lọc (lao mạnh thì M15 chưa tạo LP cùng chiều). |
| B12 | Bộ lọc | Màu ZOS H4 cùng hướng lệnh | Nến ZOS H4 đóng gần nhất xanh lá/xanh dương (buy) hoặc đỏ/tím (sell). | Đồng màu = đồng luồng (30/1/2025). | ✅ | BỎ QUA — TEST: bắt buộc màu H4 cùng hướng lệnh. |

## C. Bước 2 · Xu thế M15

Xu thế LP của M15 so với H4.

| ID | Loại | Tình huống | Điều kiện máy đo | Gợi ý Discord | Máy | Đề xuất (sửa nếu không đúng ý) |
|---|---|---|---|---|---|---|
| C1 | Bộ lọc | M15 cùng xu thế H4 | Xu thế LP M15 = xu thế LP H4. | Đồng luồng = chạy trend (30/1/2025). | ✅ | BỎ QUA — là trạng thái sau khi đã có trigger. |
| C2 | Bộ lọc | M15 ngược xu thế H4 (đang hồi) | Xu thế LP M15 ≠ xu thế LP H4. | Về khung nhỏ tìm điểm đồng thuận theo khung lớn (ZZZ 20/11/2023). | ✅ | BỎ QUA — bình thường khi H4 đang retest; trigger M15 sẽ lật nó lại. |
| C3 | Bộ lọc | M15 xu thế chưa rõ | Chưa có LP M15 nào chết gần đây (trend = 0). |  | ✅ | BỎ QUA. |
| C4 | Điểm vào | M15 vừa đổi xu thế về cùng hướng H4 | LP M15 ngược hướng H4 vừa chết → xu thế M15 quay về cùng H4. | Khung nhỏ đảo chiều → kích run khung lớn (17/9/2024). | ✅ | Gộp với D2 (cùng một sự kiện nhìn từ xu thế M15). |
| C5 | Bộ lọc | M15 có Main ngược hướng lệnh | Main M15 sống, ngược hướng lệnh. | Chỉ sell khi không có Main G đối nghịch (18/1/2024). | ✅ | BỎ QUA — nếu Main M15 ngược nằm chắn đường thì G2 xử lý. |

## D. Bước 2 · M15 làm gì khi giá ở LP H4

LP / Main M15 sinh ra trong lúc giá đang ở trong hoặc sát LP H4.

| ID | Loại | Tình huống | Điều kiện máy đo | Gợi ý Discord | Máy | Đề xuất (sửa nếu không đúng ý) |
|---|---|---|---|---|---|---|
| D1 | Điểm vào | M15 tạo LP cùng chiều LP H4 rồi break cùng chiều | Giá trong/sát LP H4; LP M15 mới break theo hướng LP H4. | LP đồng BBR ở cực hạn = retest xong (12/12/2023). Setup kích BBR. | ✅ | CHỜ → vào ở retest LP M15 đó (E5 là chính, E3 là biến thể). SETUP CHÍNH #1. |
| D2 | Điểm vào | M15 tạo Main cùng chiều LP H4 | Giá trong/sát LP H4; M15 có Main mới cùng hướng LP H4. | MGLP M15 sinh ra để xoay xu thế M15 rồi lan lên H4 (19/1/2024). | ✅ | CHỜ → vào ở retest Main / Shield M15 (E9 / E8). SETUP CHÍNH #2. |
| D3 | Bộ lọc | M15 tạo LP ngược chiều LP H4 | Giá trong/sát LP H4; LP M15 mới break ngược hướng LP H4. | LP nghịch BBR = MM còn ép giá; tới cực hạn vẫn nghịch → gãy (12/12/2023). | ✅ | LOẠI — chờ LP M15 ngược đó chết (F2) rồi mới tính. |
| D4 | Bộ lọc | M15 tạo Main ngược chiều LP H4 | Giá trong/sát LP H4; Main M15 mới ngược hướng LP H4. |  | ✅ | LOẠI. |
| D5 | Bộ lọc | LP M15 cùng chiều nằm ở nửa "đúng" LP H4 | Buy: LP M15 ở nửa dưới G H4. Sell: nửa trên R H4. | Tìm LP M15 ở nửa dưới LP lớn để buy (ZZZ 23/11/2023). | ✅ | BỎ QUA — điểm cộng; TEST làm bắt buộc. |
| D6 | Bộ lọc | LP M15 cùng chiều nằm ở nửa "sai" LP H4 | Buy: LP M15 ở nửa trên G H4. Sell: nửa dưới R H4. | Nhiều G nhưng ít G an toàn vì đa số ở High G (25/2/2025). | ✅ | BỎ QUA — TEST: loại nếu LP M15 ở nửa sai của LP H4. |
| D7 | Bộ lọc | LP M15 tựa lưng điểm cuối LP H4 | Điểm cuối LP M15 cách điểm cuối LP H4 ≤ confluencePips. | Lựa LP M15 tựa lưng LP khung to (19/1/2024). | ✅ | BỎ QUA — điểm cộng (SL ngắn, được bảo vệ bởi điểm cuối H4). |
| D8 | Bộ lọc | M15 không tạo LP nào trong lúc giá ở LP H4 | Từ lúc chạm LP H4 tới giờ, M15 không sinh LP. | Vùng không ra LP → MM không tham gia (3/10/2024). | ✅ | BỎ QUA — không có LP M15 thì không có trigger, tự nhiên không vào. |
| D9 | Điểm vào | M15 thu nến tại LP H4 | Giá trong/sát LP H4; ≥ 3/5 nến M15 là nến 2 đầu thân nhỏ. | Bài tập Zerd: tới High R H4 thì về khung nhỏ đợi thu nến là nả (20/3/2025). | ✅ | TEST (biến thể B): VÀO khi nến M15 đóng theo hướng LP H4 sau cụm thu nến; SL ngoài điểm cuối LP H4 + 2 pip. |
| D10 | Bộ lọc | M15 lao mạnh vào LP H4 | Nến M15 vào LP H4 có thân ≥ fastBody × thân TB. | Lao ầm ầm mà vào là bị quét (ZZZ 5/11/2025). | ✅ | BỎ QUA — trigger M15 tự lọc. |
| D11 | Điểm vào | LP M15 ngược chiều sinh ở nửa trên G H4 | LP M15 mới là R, nằm trong nửa trên của một G H4. | Ý của bạn (28/9): R nhỏ ở > 50% G lớn → ưu tiên sell về phía dưới. | ✅ | KHÔNG trong setup chính (ngược hướng LP H4). TEST riêng để kiểm chứng ý tưởng 50%. |
| D12 | Điểm vào | LP M15 cùng chiều sinh ở nửa dưới G H4 | LP M15 mới là G, nằm trong nửa dưới của một G H4 (ngược lại cho R H4). | Ý của bạn (28/9): G nhỏ ở < 50% G lớn → ưu tiên buy. | ✅ | Là D1 + D5 → nằm trong SETUP CHÍNH #1. |

## N. Nội chiến trong LP H4 (mẫu từ Discord)

Giá đã vào bên trong một LP H4 đã là G/R. M15 tạo LP bên trong để tấn công điểm cuối (có thể clear) hoặc để từ chối nội chiến. Zerd đọc nội chiến từ khung thấp hơn 1 bậc (H1 cho D); ở đây dùng M15 nên nhiễu hơn — cần kiểm chứng bằng backtest.

| ID | Loại | Tình huống | Điều kiện máy đo | Gợi ý Discord | Máy | Đề xuất (sửa nếu không đúng ý) |
|---|---|---|---|---|---|---|
| N1 | Điểm vào | Trong R H4, M15 tạo G rồi break lên (tấn công High R H4) | Giá trong R H4 đã break; G M15 mới sinh bên trong R H4 và break lên. | H1 G = nội chiến H4 R (23/6/2025); nội chiến thành công là clear LP hoặc ít nhất về biên kia (11/4/2025); MM tạo hỗ trợ tại Low R khi muốn clear R đó (4/4/2025). | ✅ | TEST (setup nội chiến): chỉ khi xu thế H4 TĂNG (R H4 là R ngược xu thế). VÀO ở retest G M15 bằng nến xác nhận; SL điểm cuối G M15 + 2 pip; TP High R H4; lot 50%. H4 đóng qua High thì giữ theo quy tắc BE/dời SL. |
| N2 | Điểm vào | Trong G H4, M15 tạo R rồi break xuống (tấn công Low G H4) | Giá trong G H4 đã break; R M15 mới sinh bên trong G H4 và break xuống. | H4 xây R bao trùm High G D → điểm kháng đánh về Low G D (27/2/2025); nội chiến không clear được High R sẽ rơi mạnh về Low (29/5/2024). | ✅ | TEST: đối xứng N1 — chỉ khi xu thế H4 GIẢM; TP Low G H4; lot 50%. |
| N3 | Điểm vào | Trong LP H4, M15 tạo LP cùng chiều LP H4 (từ chối nội chiến) | Giá trong LP H4; LP M15 mới cùng hướng LP H4 và break theo hướng đó. | H1 R trong R H4 = từ chối nội chiến, test sâu (23/6/2025; 28/1/2025). | ✅ | Là D1 trong LP H4 → SETUP CHÍNH #1. |
| N4 | Điểm vào | Lần 1 đánh vào LP H4 bị đẩy ra, lần 2 vào được bên trong rồi retest mép làm bệ | Lần chạm 1: giá chạm LP H4 rồi rời ≥ 1× chiều cao; lần 2: M15 đóng vào trong, retest lại mép vừa vượt và giữ được. | R D: lần đầu bị đẩy xuống; lần 2 vào được bên trong, retest Low R làm bước đệm đánh thẳng lên High (21/8/2024); lần đầu thường không clear được (13/9/2024). | ✅ | TEST: vào như N1/N2 ở lần retest mép (bệ); TP điểm cuối LP H4. |
| N5 | Bộ lọc | Mép LP H4 cản: giá vào vùng rồi không ra lại được | Sau khi vào LP H4, ≥ stallBars nến M15 không đóng ra lại qua mép gần. | High không ngăn, đi qua dễ → Retest Run; bị giữ lại, khó xuyên → khả năng Clear điểm cuối (12/9/2024). | ✅ | Nếu mép CẢN: huỷ setup chính theo hướng LP H4, chuyển sang theo dõi N1/N2. Mép không cản: giữ setup chính. TEST. |
| N6 | Điểm vào | LP M15 tấn công bị chết giữa chừng (nội chiến thất bại) | LP M15 ngược hướng LP H4 (N1/N2) thủng/clear trước khi tới điểm cuối LP H4. | Không clear được thì rơi mạnh về phía ngược lại (29/5/2024). | ✅ | VÀO theo hướng LP H4 như setup chính (retest LP M15 cùng chiều LP H4 mới, hoặc nến xác nhận); TP LP H4 ngược. TEST. |
| N7 | Điểm vào | Nội chiến thành công: clear điểm cuối LP H4 | Sau N1/N2/N4, nến H4 đóng qua điểm cuối LP H4. | Retest đâm sâu mà High không cho lên → retest sâu, thậm chí clear Low (30/8/2024); clear xong tạo LP lại đồng hướng thì run mạnh (25/4/2025). | ✅ | CHỜ → LP M15 mới theo hướng clear + retest (E5) → VÀO; TP LP H4 tiếp theo. Đóng lệnh ngược chiều nếu có. TEST. |

## E. Bước 3 · Retest LP M15 (điểm vào)

Giá quay lại LP M15 — nơi đặt lệnh thực tế.

| ID | Loại | Tình huống | Điều kiện máy đo | Gợi ý Discord | Máy | Đề xuất (sửa nếu không đúng ý) |
|---|---|---|---|---|---|---|
| E1 | Điểm vào | Retest LP M15 nông (chạm mép gần) | Râu chạm mép gần LP M15, close ngoài vùng. |  | ✅ | KHÔNG vào ở mép — chờ nến xác nhận (E5). |
| E2 | Điểm vào | Retest LP M15 đóng trong vùng, chưa qua 50% | Close trong LP M15, nửa phía mép gần. |  | ✅ | KHÔNG — chờ E5 (hoặc biến thể E3). |
| E3 | Điểm vào | Retest LP M15 qua 50% | Close/râu qua 50% LP M15, chưa qua điểm cuối. |  | ✅ | TEST (biến thể A): limit 50% LP M15, SL điểm cuối LP M15 + 2 pip, hết hạn 12h. |
| E4 | Điểm vào | Râu quét qua điểm cuối LP M15, đóng lại trong vùng | Low < Low G M15 (High > High R) nhưng close trong LP. |  | ✅ | VÀO khi nến đóng lại trong vùng (cùng quy tắc E5), SL ngoài râu quét + 2 pip. |
| E5 | Điểm vào | Retest LP M15 xong, nến đóng ra lại theo hướng break | Sau khi vào vùng, nến M15 đầu tiên đóng ra ngoài mép gần theo hướng break. | High không cản → Retest Run (12/9/2024). Backtest cũ: vào bằng close xác nhận tốt hơn limit mép. | ✅ | VÀO (chính): market khi nến M15 đóng ra lại theo hướng break. SL điểm cuối LP M15 + 2 pip. TP mép gần của LP H4 ngược gần nhất. Chờ tối đa 24h kể từ trigger. |
| E6 | Bộ lọc | Retest LP M15 lần ≥ 2 | retests M15 ≥ 2. |  | ✅ | LOẠI lần ≥ 3; lần 2 vẫn nhận — TEST. |
| E7 | Bộ lọc | Nội chiến M15 | Giá nằm trong LP M15 ≥ stallBars nến. |  | ✅ | LOẠI. |
| E8 | Điểm vào | Giá retest Shield M15 | Giá vào Shield M15 còn sống. |  | ✅ | VÀO như E5. |
| E9 | Điểm vào | Giá retest Main M15 | Giá vào Main M15 còn sống. | MM EP ở Main, SM EP ở Shield (25/3/2025). | ✅ | VÀO như E5. |
| E10 | Bộ lọc | LP M15 chưa retest, giá chạy xa | Sau break giá cách mép ≥ runAway × chiều cao LP M15. | Lỡ thì bỏ, chờ LP M15 tiếp theo (ZZZ 4/6/2025). | ✅ | BỎ QUA — không đuổi, chờ LP M15 tiếp theo cùng chiều. |

## F. Bước 3 · LP M15 chết

LP M15 bị thủng hoặc clear.

| ID | Loại | Tình huống | Điều kiện máy đo | Gợi ý Discord | Máy | Đề xuất (sửa nếu không đúng ý) |
|---|---|---|---|---|---|---|
| F1 | Quản lý | LP M15 dùng để vào lệnh bị thủng / clear | LP M15 của setup chết trước hoặc sau khi khớp. | SL sao cho đáng: bị cắn tức là thị trường đã đảo (ZZZ 8/5/2025). | ✅ | HUỶ LỆNH CHỜ nếu chưa khớp; nếu đã khớp thì SL tự cắt (không dời SL xa hơn). |
| F2 | Điểm vào | LP M15 ngược hướng H4 bị clear (M15 xoay về cùng H4) | LP M15 ngược xu thế H4 vừa chết, giá đang ở LP H4. | Clear LP ngược = tiềm năng Main (18/1/2024). | ✅ | Gộp với D2 khi LP ngược chết tạo Main M15 cùng hướng H4. |
| F3 | Bộ lọc | LP M15 chết ngay sau break (SHs) | tDead − tBreak ≤ shsBars nến M15. |  | ✅ | BỎ QUA — ghi nhận SHs; TEST: bỏ setup kế tiếp cùng hướng. |
| F4 | Bộ lọc | Clear xong M15 tạo ngay LP cùng hướng phá (base) | Trong ≤ stallBars nến M15 sau clear sinh LP cùng hướng nến clear. | Clear xong tạo LP lại thường đồng hướng và run mạnh (25/4/2025). | ✅ | BỎ QUA. |
| F5 | Bộ lọc | Clear xong M15 chạy thẳng, không LP nào | Sau clear, giá đi ≥ runAway × chiều cao LP mà M15 không sinh LP. | Clear xong đi thẳng → clear chỉ là SHs (16/4/2025). | ✅ | BỎ QUA. |

## P. Mẫu hình khác từ Discord

Các thói quen MM được nhắc lại nhiều lần trong kênh.

| ID | Loại | Tình huống | Điều kiện máy đo | Gợi ý Discord | Máy | Đề xuất (sửa nếu không đúng ý) |
|---|---|---|---|---|---|---|
| P1 | Bộ lọc | 3 LP M15 cùng chiều liên tiếp | 3 LP M15 gần nhất cùng hướng lệnh, không LP ngược xen giữa. | 3 cái R H1 liên tiếp = đà giảm vững chắc (19/2/2025; 5/5/2025). | ✅ | BỎ QUA — điểm cộng; TEST làm bắt buộc. |
| P2 | Bộ lọc | LP mới sinh sát G H4 sau đoạn chạy xa (hoặc nhiều LP ở nơi từng là G) | Sau đoạn chạy ≥ runAway × chiều cao, ≥ 1 LP M15 mới sinh cách G H4 ≤ confluencePips (ngược lại với R H4). | Rất cao khả năng là R để đục xuyên GLP (27/2/2025). | 🟡 | LOẠI buy tại G H4 đó (và đối xứng: loại sell tại R H4). |
| P3 | Bộ lọc | Chuỗi R → G → R clear G (không phải Main thật) | LP M15 vừa thành Main nhưng LP bị giết sinh sau một LP cùng hướng Main đó. | Tạo R rồi tạo G rồi clear G thì không xem là Main (27/1/2025). | ✅ | Không tính là Main trong backtest (sửa định nghĩa Main). |
| P4 | Bộ lọc | Sóng tăng ảo: đáy cao dần sát G nhưng không đi được xa | Giá test G (M15 hoặc H4) ≥ 3 lần, mỗi lần bật < 1× chiều cao LP, đáy sau cao hơn đáy trước. | Túi thanh khoản dụ buy; MM muốn đảo chiều không cần test support nhiều lần, đi mạnh ngay (2/3/2026). | 🟡 | LOẠI buy tại G đó (đối xứng cho sell). |
| P5 | Bộ lọc | Giá bật rất nhanh khỏi điểm cuối | Sau khi chạm điểm cuối LP H4, ≤ 2 nến M15 đã rời ≥ 50% chiều cao LP. | MM thật sự thủ thì không cho giá nằm lâu ở vị trí của nó (2/2/2025). | ✅ | BỎ QUA — điểm cộng; TEST: chỉ vào khi bật nhanh (nhưng dễ lỡ kèo). |
| P6 | Bộ lọc | Nến build 1 đầu ở cuối sóng M15, ngay tại LP H4 | Nến build M15 chỉ có 1 râu, đứng riêng, sau ≥ 5 nến cùng hướng, trong/sát LP H4. | Build 1 đầu cuối sóng thường là nến kết thúc sóng (17/4/2025). | ✅ | BỎ QUA — điểm cộng khi hướng build cùng hướng lệnh; TEST. |
| P7 | Bộ lọc | Nến H4 đầu tuần là G (hoặc R) | Nến H4 đầu tiên của tuần tạo LP rồi thành G (R). | H4 đầu tuần là G → MM muốn ngăn giá xuống (25/2/2025). | ✅ | BỎ QUA — ghi nhận thống kê, chưa lọc. |
| P8 | Bộ lọc | Đoạn chạy tới LP H4 không để lại LP nào | Từ LP H4 xuất phát tới giá hiện tại, M15 không có LP cùng chiều nào còn sống. | Lên không có LP thì lúc xuống không biết chỗ nào ngăn (13/5/2025); chạy vội không xây rào → sập bất ngờ (18/9/2024). | ✅ | BỎ QUA cho lệnh theo LP H4 (không có LP cản phía sau thì giá dễ quay nhanh — tốt cho lệnh); TEST. |

## G. Vị trí, không gian chạy, RR

Khoảng trống tới target, LP chắn đường, hội tụ với số tròn / mép H4.

| ID | Loại | Tình huống | Điều kiện máy đo | Gợi ý Discord | Máy | Đề xuất (sửa nếu không đúng ý) |
|---|---|---|---|---|---|---|
| G1 | Bộ lọc | RR tới target < minRR | Target = mép LP H4 ngược gần nhất (hoặc LP M15 ngược nếu gần hơn). | Backtest cũ: RR < 1.5 là bộ lọc loại lệnh lỗ nhiều nhất. | ✅ | LOẠI nếu RR < 1.5 (bộ lọc mạnh nhất trong các lần backtest trước). |
| G2 | Bộ lọc | Có LP M15 ngược chắn giữa EP và target H4 | LP M15 ngược hướng lệnh còn sống nằm giữa EP và TP. |  | ✅ | BỎ QUA — TP thẳng tới LP H4 ngược; LP M15 ngược trên đường xử lý bằng quản lý lệnh (K2). Rút TP về LP M15 làm RR tụt, loại gần hết lệnh. |
| G3 | Bộ lọc | Có Main H4 ngược chắn giữa EP và TP | Main H4 ngược hướng lệnh nằm giữa EP và TP. | Không đánh ngược Main (18/1/2024). | ✅ | LOẠI. |
| G4 | Bộ lọc | Mép vào lệnh trùng số tròn | Mép LP M15 dùng để vào cách RN (.x000/.x050) ≤ confluencePips. | RN tốt ở lần đánh đầu; close qua rồi hết giá trị (22/11/2023). | ✅ | BỎ QUA — điểm cộng. |
| G5 | Bộ lọc | Điểm vào M15 trùng mép / điểm cuối LP H4 | Mép LP M15 cách mép LP H4 ≤ confluencePips. | Low các khung cùng trong 10 pip → điểm MM thủ (18/9/2024). | ✅ | BỎ QUA — điểm cộng. |
| G6 | Bộ lọc | Kẹp chật giữa 2 LP M15 | Khoảng trống giữa LP M15 trên và dưới < tightPips. |  | ✅ | LOẠI. |
| G7 | Bộ lọc | Setup M15 không nằm ở LP H4 nào | Điểm vào cách mọi LP H4 > confluencePips (không có nền H4). | EP LP khung nhỏ mà không biết khung nào dẫn dắt = không an toàn (27/10/2024). | ✅ | LOẠI — setup M15 bắt buộc nằm ở LP H4. |

## J. Thời gian

Phiên, giờ, ngày trong tuần (giờ Hà Nội).

| ID | Loại | Tình huống | Điều kiện máy đo | Gợi ý Discord | Máy | Đề xuất (sửa nếu không đúng ý) |
|---|---|---|---|---|---|---|
| J1 | Bộ lọc | Phiên Á (6h–13h) | Giờ Hà Nội của nến tín hiệu M15. |  | ✅ | BỎ QUA — TEST so sánh theo phiên. |
| J2 | Bộ lọc | Phiên London (13h–19h) |  | Phiên F test cầu, LO đạp (23/3/2026). | ✅ | BỎ QUA. |
| J3 | Bộ lọc | Phiên New York (19h–24h) |  | NY bay (23/3/2026). | ✅ | BỎ QUA. |
| J4 | Bộ lọc | Khuya (0h–6h) |  | Khuya ngân hàng nghỉ; BE qua đêm hay bị cắn (15/4/2025). | ✅ | LOẠI. |
| J5 | Bộ lọc | Thứ 2 trước 14h |  | Trap đầu tuần (25/6/2025). | ✅ | BỎ QUA (bản linh động). Bản chặt: LOẠI. |
| J6 | Bộ lọc | Thứ 6 sau 20h |  | Trở mặt cuối tuần (25/6/2025). | ✅ | BỎ QUA (bản linh động). Vẫn đóng lệnh thứ 6 sau 22h (K6). |
| J7 | Bộ lọc | ±30 phút quanh tin đỏ | Cần lịch tin (chưa có dữ liệu). | Những lúc tin không vào lệnh nào là an tâm nhất (26/9/2024). | 🟡 | LOẠI (khi có lịch tin). |

## K. Quản lý lệnh đang mở

Sau khi đã vào lệnh M15.

| ID | Loại | Tình huống | Điều kiện máy đo | Gợi ý Discord | Máy | Đề xuất (sửa nếu không đúng ý) |
|---|---|---|---|---|---|---|
| K1 | Quản lý | M15 tạo LP bảo vệ mới cùng chiều lệnh | LP M15 mới cùng chiều lệnh break, nằm giữa EP và giá. | Dời BE dưới mép LP đó 1 pip (21/4/2025). | ✅ | Sau khi đã BE (K8): DỜI SL ra sau mép LP M15 mới 1–2 pip. Chưa tới BE thì giữ nguyên SL. |
| K2 | Quản lý | Lệnh tới gần LP ngược (M15 hoặc H4) | Giá cách LP ngược ≤ confluencePips. | Kéo BE ngay; vượt được thì giữ (21/4/2025). | ✅ | LP M15 ngược trên đường: chưa tới 1R thì GIỮ (không BE sớm); tới LP H4 ngược: CHỐT HẾT (đó là TP). |
| K3 | Quản lý | Gần TP mà M15 tạo LP ngược | Giá đã đi ≥ 70% tới TP, M15 sinh LP ngược chiều lệnh. | Gần TP mà vi phạm LP cũng phải cắt (28/8/2025). | ✅ | CHỐT HẾT. |
| K4 | Quản lý | Lệnh chờ chưa khớp, giá đã đi ≥ 70% tới TP |  |  | ✅ | HUỶ LỆNH CHỜ. |
| K5 | Quản lý | Lệnh chờ quá N giờ chưa khớp |  |  | ✅ | HUỶ LỆNH CHỜ sau 12h. |
| K6 | Quản lý | Lệnh còn mở lúc khuya / cuối tuần | Tới 0h HN, hoặc thứ 6 sau 22h. | Khuya thứ 6 mua mà thứ 2 gap thì toang (21/4/2025). | ✅ | Thứ 6 sau 22h: CHỐT HẾT. Khuya ngày thường: GIỮ (SL vẫn đặt). |
| K8 | Quản lý | Giá đã đi được ≥ beAtR | Lãi chạy tối đa của lệnh ≥ beAtR × khoảng SL ban đầu. | Vào được điểm tốt xong BE là risk = 0 (3/4/2025); nhưng BE quá sớm khi đang theo sóng thì 80% bị BE (23/4/2025). | ✅ | BE — dời SL về giá vào khi giá đạt 1.5R (backtest 4 tuần: BE 1R bị quét nhiều, 1.5R tốt hơn). Tiếp tục TEST 1R / 1.5R / không BE khi có thêm dữ liệu. |
| K7 | Quản lý | LP H4 nền của lệnh bị thủng / clear | LP H4 dùng làm bối cảnh chết trong lúc lệnh đang mở. |  | ✅ | CẮT — nền H4 đã mất. |
