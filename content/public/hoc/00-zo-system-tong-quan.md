# ZO System — Tài liệu tự học (bản cho người mới)

> Tổng hợp từ toàn bộ 15 trang của https://docs.kythuatforex.com (đọc ngày 2026-09-28), cộng thêm phần
> nền tảng PVSRA và quản lý vốn mà docs không nói tới.
> Các đoạn đánh dấu **[ngoài docs]** là kiến thức bổ sung/diễn giải của mình, KHÔNG phải lời của tác giả ZO.

---

## 0. Đọc cái này trước

- Docs ZO ghi rõ: *"dành cho trader có hơn 2 năm kinh nghiệm"*. Bạn mới biết price action cơ bản → hệ thống
  này **có học được**, nhưng phải chấp nhận giai đoạn đầu chỉ quan sát + demo, chưa nên vào tiền thật.
- Docs khá ngắn (~15 trang), nhiều chỗ ghi *"hãy dùng trí tưởng tượng"*. Nghĩa là phần lớn kỹ năng nằm ở
  **luyện mắt đọc chart**, không phải thuộc lòng luật. Mục 9 liệt kê các chỗ docs còn mơ hồ để bạn hỏi cộng đồng.

---

## 1. Nguồn gốc: PVSRA là gì? [ngoài docs]

**PVSRA** = **P**rice, **V**olume, **S**upport & **R**esistance **A**nalysis — phương pháp của nhóm *Traderathome*.

Ý tưởng cốt lõi:
1. Thị trường bị chi phối bởi các "tay to" — **Market Maker (MM)** (ngân hàng, quỹ, nhà tạo lập).
2. MM không thể giấu hoàn toàn dấu vết: khi họ vào/ra lệnh lớn, **volume và biên độ nến tăng bất thường**.
3. PVSRA tô màu những nến bất thường đó (gọi là *vector candle*) — nến có volume ≥ 200% trung bình
   (xanh lá/đỏ) hoặc ≥ 150% (xanh dương/tím), còn lại là nến xám bình thường.
4. Vùng giá của các vector candle là vùng MM "quan tâm" → giá hay quay lại đó, và đó là vùng S/R có ý nghĩa.

**ZO System kế thừa ý tưởng số 2–4** nhưng đổi cách hiển thị:
- Không tô màu theo volume thuần như PVSRA, mà dùng nến tính toán lại (giống Heiken Ashi) tô màu **theo xu hướng**.
- Dấu vết MM được gom vào **một màu duy nhất: nến vàng = nến Build**.

> Liên hệ với price action bạn đã biết: *vùng thanh khoản* của ZO ≈ vùng cung/cầu (supply/demand) hay
> order block trong PA/SMC, nhưng được **indicator chọn ra một cách khách quan** thay vì tự vẽ theo cảm giác.

---

## 2. Tư duy nền: "Thị trường là kẻ lừa đảo chuyên nghiệp"

Từ docs:
- Coi thị trường (MM) là **"tên lừa đảo chuyên nghiệp"** muốn lấy hết tiền của bạn.
- Đừng đi tìm "chén thánh" để trả thù thị trường sau khi thua — đó là con đường thua lần hai.
- Không áp dụng mô hình máy móc; mỗi chuyển động trên chart cần có **lời giải thích logic** ("MM làm vậy để làm gì?").
- Luôn vẽ **nhiều kịch bản** (tăng thì sao, giảm thì sao, quét râu thì sao).
- **Đa khung thời gian**: *khung nhỏ tạo nên hành động ở khung lớn; khung lớn chỉ đường cho khung nhỏ.*
- Yêu cầu: logic, tập trung, **kỷ luật nghiêm ngặt**, quản lý vốn chuyên nghiệp.

---

## 3. Công cụ: indicator ZOS (ZO Signal) trên MT4

80% thời gian của ZO trader là **đọc nến ZOS**.

**Cài đặt** (trang "Tải về"): tải file → giải nén → copy thư mục `MQL4` và `templates` vào
*MT4 → File → Open Data Folder* → chuột phải chart → *Template → ZOTheme*. (Indicator miễn phí, gắn với dự án ZO Token.)

### 3.1 Nến ZOS
- Nến được **tính toán lại**, giống Heiken Ashi nhưng **râu dài hơn, thân dốc hơn** → dễ thấy chỗ nào biến động mạnh,
  lực đang mạnh lên hay yếu đi.
- **[ngoài docs]** Vì giống Heiken Ashi nên giá open/close của nến ZOS **không phải giá thật** (là giá làm mượt) và
  hơi trễ. Khi đặt lệnh, SL, TP → luôn đối chiếu với giá thật.

### 3.2 Bảng 5 màu (thuộc lòng cái này)

| Màu | Ý nghĩa | Nến tăng / nến giảm trong chuỗi |
|---|---|---|
| 🟩 **Xanh lá** | Xu hướng **tăng mạnh** ("tăng tuyệt đối") | xanh lá sáng / xanh lá đậm |
| 🟦 **Xanh dương** | **Hồi phục** trong xu hướng tăng, *hoặc* **bắt đầu** xu hướng tăng | xanh dương sáng / xanh dương đậm |
| 🟥 **Đỏ** | Xu hướng **giảm mạnh** ("giảm tuyệt đối") | đỏ nhạt / đỏ đậm |
| 🟪 **Hồng / Tím** | **Hồi phục** trong xu hướng giảm, *hoặc* **bắt đầu** xu hướng giảm | hồng phấn / tím |
| 🟨 **Vàng** | **Nến Build** — MM hoạt động mạnh. Thường đứng lẻ, hiếm khi thành chuỗi | — |

Mẹo nhớ: **xanh lá/đỏ = xu hướng đã chạy; xanh dương/hồng-tím = đang hồi hoặc mới chớm; vàng = dấu chân MM.**

### 3.3 Matrix
Bảng số ở góc chart: mỗi khung thời gian (M1 → MN) được quy thành một con số.
- **0 là trung tâm**. **> 0 → tăng**, **< 0 → giảm**. Màu của số cũng cho biết xu hướng.
- Dùng để liếc nhanh: các khung có **đồng thuận** không (vd. H4, D1, W1 cùng dương → bối cảnh tăng).

### 3.4 HM – CM – LM (phạm vi biến động)
Tính lại mỗi khi mở nến mới:
- **HM (High Max)**: mức cao nhất hệ thống dự đoán có thể đạt. Giá **trên HM** → khả năng tăng mạnh.
- **CM (Center Max)**: điểm giữa HM và LM.
- **LM (Low Max)**: mức thấp nhất dự đoán. Giá **dưới LM** → khả năng giảm mạnh.

Các thông số khác của ZOS cộng đồng đã tắt đi để tập trung đọc MM.

---

## 4. Từ điển thuật ngữ

| Thuật ngữ | Nghĩa |
|---|---|
| **MM** (Market Maker) | "Tay to" tạo lập thị trường — đối tượng bạn cần đọc ý đồ |
| **Nến Build** | Nến vàng của ZOS — nến có biến động bất thường, dấu hiệu MM tham gia |
| **Vùng thanh khoản** | Vùng từ High đến Low của nến Build (đạt chuẩn). Nơi MM có thể bảo vệ giá |
| **Breakout** | Nến ZOS **đóng cửa** ra ngoài vùng thanh khoản |
| **Retest** | Giá quay lại chạm/kiểm tra vùng sau khi đã breakout |
| **GLP** (Green Liquidity Pool*) | Vùng thanh khoản đã bị **breakout lên** → vùng hỗ trợ tăng giá (trên chart tô xanh) |
| **RLP** (Red Liquidity Pool*) | Vùng thanh khoản đã bị **breakout xuống** → vùng kháng cự giảm giá (tô đỏ) |
| **Tích luỹ** | Giá đi chậm, biên độ hẹp, nhiều nến 2 râu — MM đang gom hàng |
| **Chạy lợi nhuận** | Giá chạy trend, thân nến dài, râu về một phía — MM đẩy giá tới mục tiêu |
| **Săn dừng lỗ** | Cú chạy ngắn giả để quét SL rồi quay đầu |
| **RR** | Tỷ lệ Rủi ro : Lợi nhuận (vd 1:3 = rủi ro 1 đồng, kỳ vọng lãi 3 đồng) |

\* Docs chỉ ghi "GLP = vùng thanh khoản tăng giá", "RLP = vùng thanh khoản giảm giá"; tên đầy đủ là mình suy đoán.

---

## 5. Quy trình giao dịch cơ bản (4 bước)

```
 KHUNG LỚN (H4 / D1 / W1)                          KHUNG NHỎ (vd M15)
 ┌──────────────────────────────┐                  ┌─────────────────────────────┐
 │ B1. Tìm nến Build (vàng)     │                  │ B4. Giá đang ở TRONG vùng   │
 │     có râu 2 đầu → vẽ vùng   │                  │     lớn → hạ khung, tìm     │
 │ B2. Chờ nến ZOS đóng ra      │                  │     GLP nhỏ trong GLP lớn   │
 │     ngoài → GLP hoặc RLP     │                  │     (hoặc RLP trong RLP)    │
 │ B3. Chờ giá quay lại Retest  │ ───────────────▶ │     → vào lệnh, SL, TP      │
 └──────────────────────────────┘                  └─────────────────────────────┘
```

### Bước 1 — Xác định vùng thanh khoản
1. Tìm **nến Build (vàng)**. Ưu tiên khung **H4 trở lên** (khung càng lớn, biến động trong nến càng lớn → vùng càng chắc).
2. **Lọc**: không phải nến Build nào cũng dùng được. Chỉ lấy nến **có râu ở CẢ HAI đầu** ("miễn 2 đầu có râu là được").
3. Vẽ hình chữ nhật (hoặc 2 đường ngang) từ **High đến Low** của nến đó (tính cả râu).

*Tại sao?* Nến Build = trong một khoảng thời gian ngắn giá biến động nhiều hơn hẳn bình thường (docs ví dụ: M1 bình thường
~120 lần biến động/60 giây, đột nhiên nhiều hơn hẳn) → MM đã vào. **Nơi MM vào lệnh, MM thường sẽ bảo vệ giá.**

### Bước 2 — Chờ breakout (để MM "nói" hướng)
- **Không đoán trước.** Chờ **nến ZOS đóng cửa ra ngoài** vùng.
  - Đóng **trên** → vùng trở thành **GLP** (thiên hướng MUA).
  - Đóng **dưới** → vùng trở thành **RLP** (thiên hướng BÁN).

### Bước 3 — Chờ Retest
Bảng quyết định (lấy từ docs):

| Tình trạng vùng | Làm gì |
|---|---|
| Chưa bị breakout | Lấy **vùng gần nhất chưa breakout**, ngồi chờ breakout |
| Đã breakout, giá chưa quay lại | Chờ giá **retest** |
| Đang retest, giá **vẫn nằm trong vùng** | ✅ Sang Bước 4 — tìm tín hiệu vào lệnh |
| Đã retest xong và giá đã chạy đi | ❌ Lỡ tàu — **chuyển cặp khác**, đừng đuổi theo |

Retest dùng để kiểm tra vùng đó **có được MM bảo vệ thật không**.

### Bước 4 — Tìm điểm vào ở khung nhỏ
Khi giá khung lớn đang nằm trong vùng retest → **hạ khung** (vd M15) và áp dụng lại đúng quy trình bước 1–2 ở khung nhỏ:

- **MUA**: khung nhỏ tạo ra **GLP** nằm **trong GLP của khung lớn**. Điểm vào **càng gần Low càng tốt**.
- **BÁN**: khung nhỏ tạo ra **RLP** nằm **trong RLP của khung lớn**. Điểm vào **càng gần High càng tốt**.

⚠️ Docs nhấn mạnh (chữ đỏ): các quy tắc vào lệnh **áp dụng ở khung dùng để vào lệnh**. Vd vùng ở H4/D1/W1, retest,
bạn hạ xuống M15 thì luật GLP/RLP phải thoả **ở M15**.

### Stop Loss & Take Profit
- **SL an toàn nhất**: một khoảng vừa đủ **dưới Low của vùng** (lệnh mua) / **trên High của vùng** (lệnh bán).
  SL có thể linh động nếu vùng bị phá.
- **TP**: docs không cho công thức. Phụ thuộc khoảng cách tới **vùng thanh khoản kế tiếp** và việc có vùng mới hình thành
  trên đường chạy. **[ngoài docs]** Cách thực tế cho người mới: TP tại vùng thanh khoản ngược chiều gần nhất ở khung lớn,
  chỉ vào lệnh nếu RR ≥ 1:2.
- Điểm mạnh của ZO: vì vào lệnh ở vùng khung nhỏ nằm trong vùng khung lớn → **SL rất ngắn** so với quãng chạy → **RR cao**.

### Ví dụ đọc chart (mô tả hình trong docs)
- *Hình GLP*: một vùng xanh lá rộng. Giá đi ngang bên trong một thời gian (nến xanh dương + xanh lá xen kẽ, vài nến vàng),
  rồi đóng lên trên vùng → GLP. Sau đó giá hồi về gần mép trên, rồi bùng lên thành chuỗi nến xanh lá thân dài.
- *Hình SL lệnh bán*: vùng đỏ (RLP) ở khung nhỏ, nến hồng/tím hồi lên trong vùng, rồi chuỗi nến đỏ đẩy xuống.
  SL đặt trên High vùng một khoảng.

---

## 6. Nâng cao: các biến thể vùng thanh khoản

### 6.1 Chuỗi nến Build (phổ biến 3/5 · khó xác định 1/5 · **hiệu quả 5/5**)
- 2–3 nến Build **liên tiếp** → MM đang xây một vùng **cực mạnh**, sắp có cú chạy lớn.
- Vẽ vùng: **High cao nhất** và **Low thấp nhất** của cả chuỗi.
- 👉 Dễ nhận, hiệu quả cao → **setup ưu tiên cho người mới**.

### 6.2 Cụm Build mở rộng (phổ biến 2/5 · khó xác định 5/5 · hiệu quả 2/5)
- Điều kiện: đã có vùng, **giá chưa breakout**, rồi xuất hiện **nến Build mới có râu chọc vào High hoặc Low** của vùng.
- Ý nghĩa: MM đang xác định vị trí + săn SL (hay đi kèm tin tức), có thể đâm xuyên S/R rồi quay về.
- Cách xử lý: **vẽ lại** vùng, dùng râu của nến Build mở rộng làm High/Low mới.
- 👉 Khó và hiệu quả thấp → người mới **chỉ cần nhận ra để không bị lừa**, chưa cần trade.

---

## 7. Trạng thái thị trường (đọc "nhịp thở" của MM)

Chu kỳ lặp lại: **Tích luỹ → Chạy lợi nhuận → Tích luỹ → …**, xen kẽ là **Săn dừng lỗ**.

| Trạng thái | MM đang làm gì | Nhận biết trên ZOS |
|---|---|---|
| **Tích luỹ** | Dừng giá lại, tạo các nhịp ngược xu hướng, đi chậm dần để dụ trader nhỏ lẻ vào ngược hướng chính | Nhiều nến **râu 2 đầu**, biên độ hẹp, nhưng **thường không màu vàng** |
| **Chạy lợi nhuận** | Đẩy giá về mục tiêu (= cái trader thường gọi là trend) | **Thân nến dài**, râu **chỉ về một phía**. Thân càng dài lực càng mạnh; **thân ngắn dần → sắp tích luỹ** |
| **Săn dừng lỗ** | Tạo cú chạy ngắn giả để quét SL, rồi quay lại hướng ban đầu | Sau tích luỹ xuất hiện nến "chạy lợi nhuận" **tiếp diễn xu hướng cũ** → cẩn thận, có thể là bẫy |

Ví dụ trong docs: *tăng mạnh → tích luỹ → một cú tăng giả → tích luỹ lần cuối → giảm mạnh.*

**[ngoài docs]** Liên hệ PA: tích luỹ ≈ range/accumulation (Wyckoff); săn dừng lỗ ≈ liquidity sweep / stop hunt / fake breakout.

---

## 8. Checklist trước mỗi lệnh (tự tổng hợp)

```
[ ] Khung lớn (H4+): có vùng thanh khoản từ nến Build râu 2 đầu (hoặc chuỗi Build)?
[ ] Vùng đã breakout bằng nến ZOS ĐÓNG CỬA ra ngoài? → GLP hay RLP?
[ ] Giá đang retest và VẪN NẰM TRONG vùng? (đã chạy đi rồi → bỏ)
[ ] Matrix các khung lớn có đồng thuận với hướng GLP/RLP không?
[ ] Khung nhỏ: đã hình thành GLP-trong-GLP (mua) / RLP-trong-RLP (bán)?
[ ] Điểm vào gần Low (mua) / gần High (bán) của vùng?
[ ] SL: ngoài mép vùng một khoảng vừa đủ. TP: vùng thanh khoản kế tiếp. RR ≥ 1:2?
[ ] Khối lượng: nếu dính SL chỉ mất ≤ 1% tài khoản?
[ ] Có tin tức mạnh sắp ra không? (dễ gặp săn dừng lỗ / Build mở rộng)
[ ] Trạng thái hiện tại: có dấu hiệu săn dừng lỗ không?
```

---

## 9. Những chỗ docs còn mơ hồ — nên hỏi cộng đồng (Discord ZO)

1. **Breakout tính bằng close của nến ZOS hay close giá thật?** Docs nói "đóng nến ZOS", nhưng nến ZOS là giá làm mượt.
2. Nến Build **râu 2 đầu**: râu dài tối thiểu bao nhiêu mới tính? Râu rất ngắn có được không?
3. Nhiều vùng chồng lên nhau ở nhiều khung → ưu tiên khung nào?
4. Vùng GLP hết hiệu lực khi nào? (giá đóng xuyên ngược qua? retest bao nhiêu lần?)
5. "Săn dừng lỗ" khác "chạy lợi nhuận thật" thế nào **tại thời điểm đang xảy ra** (không phải nhìn lại quá khứ)?
6. Cặp khung lớn–nhỏ thường dùng: H4→M15? D1→H1? W1→H4?
7. Matrix và HM/CM/LM được dùng cụ thể thế nào khi ra quyết định?

---

## 10. Quản lý vốn — docs gần như không nói, nhưng quan trọng nhất [ngoài docs]

- **Rủi ro mỗi lệnh ≤ 1% tài khoản** (người mới nên 0.5%). Tính lot từ khoảng cách SL, không phải ngược lại.
- Không dời SL ra xa khi giá đi ngược. Không nhồi lệnh gỡ.
- Giới hạn thua trong ngày/tuần (vd dừng khi thua 3 lệnh liên tiếp).
- **Nhật ký giao dịch**: chụp chart trước/sau, ghi lý do vào, trạng thái thị trường, kết quả, bài học.
- Hệ thống RR cao thường có **tỷ lệ thắng thấp** (có thể < 40%) → chuỗi thua 5–8 lệnh là bình thường. Chuẩn bị tâm lý.

---

## 11. Lộ trình học đề xuất [ngoài docs]

| Giai đoạn | Mục tiêu | Việc cụ thể |
|---|---|---|
| **Tuần 1** — Làm quen | Cài ZOS, nhớ 5 màu | Mở 3–4 cặp (XAUUSD, EURUSD, GBPUSD…). Mỗi ngày gọi tên màu nến + trạng thái (tích luỹ/chạy/săn SL) |
| **Tuần 2–3** — Vẽ vùng | Nhận diện vùng thanh khoản chuẩn | Backtest trên H4/D1 quá khứ: đánh dấu mọi nến Build râu 2 đầu, vẽ vùng, ghi lại: breakout hướng nào → retest không → giá đi bao xa. Mục tiêu ≥ 50 vùng |
| **Tuần 4–6** — Đa khung | Tìm GLP-trong-GLP / RLP-trong-RLP | Replay chart (hoặc tua tay): tại mỗi retest khung lớn, xuống M15 tìm điểm vào, ghi SL/TP/RR giả định. ≥ 30 setup |
| **Tháng 2–3** — Demo | Kỷ luật + thống kê | Trade demo đúng checklist, ghi nhật ký. Đánh giá: winrate, RR trung bình, lỗi hay mắc |
| **Sau đó** | Tiền thật nhỏ | Chỉ khi demo có lãi ổn định ≥ 2 tháng. Bắt đầu tài khoản nhỏ, rủi ro 0.5%/lệnh |

---

## Tóm tắt 1 câu

> **Tìm nến vàng râu 2 đầu ở khung lớn → vẽ vùng → chờ đóng nến phá ra để biết hướng (GLP/RLP) → chờ giá quay lại →
> xuống khung nhỏ tìm GLP-trong-GLP / RLP-trong-RLP → vào gần mép, SL ngoài vùng, TP vùng kế tiếp.**
