# Giải thích thuật toán của bộ tool ZO

> **Tên gọi (từ 2/10/2026):** hệ chính là **ZO-FLEX** (mã backtest `ZOFLEX`), gồm ba kiểu vào **MAIN-AB**, **PULLBACK**, **LP-AB**. Tên cũ trong các bản thử nghiệm: MAIN-AB = ZM, PULLBACK = U1w, LP-AB = EPA, MAIN-AB + PULLBACK = ZOU, cả hệ = ZEAR2L. Các hệ ZEA, ZEA2, ZEA3, ZEAR, ZEAR2… là **bản thử nghiệm**, giữ lại để so sánh.

Tài liệu này mô tả cách các indicator, script và EA tính toán, đủ chi tiết để bạn tự kiểm tra trên chart. Mọi ngưỡng số ghi ở đây là giá trị đang dùng trong mã nguồn (`MQL4/Include/ZO/ZoCore.mqh`, `ZO_LP.mq4`) và trong backtest (`backtest/bt_h4m15.py`, `bt_lab.py`).

Quy ước: 1 pip = 0.0001 (1.1700 → 1.1710 là 10 pip). "Nến" luôn là **nến ZOS**, trừ khi ghi rõ "nến giá".

---

## 1. Dữ liệu đầu vào: nến ZOS

### 1.1. Đọc ZOS

ZOS là indicator đóng (không có mã nguồn). Tool đọc nó qua 15 buffer:

| Buffer | Nội dung |
|---|---|
| 0, 1, 2, 3 | High, Low, Open, Close của nến ZOS |
| 4–5 | thân xanh lá (tăng mạnh) |
| 6–7 | thân xanh dương (tăng yếu / hồi) |
| 8–9 | thân đỏ (giảm mạnh) |
| 10–11 | thân hồng / tím (giảm yếu / hồi) |
| 12–13 | thân vàng (nến Build) |
| 14 | cờ Build: 1 = nến Build |

Một nến được coi là **hợp lệ** khi `Low > 0` và `Low ≤ min(Open, Close) ≤ max(Open, Close) ≤ High`.

### 1.2. Nến ZOS khác nến giá thế nào

Đo trên 19 000 nến M15:
- **Open** của nến ZOS = trung điểm thân nến ZOS trước (giống Heiken Ashi).
- **Close** là một giá trung bình, lệch giá đóng thật khoảng 2 pip.
- **High / Low** thường đúng bằng đỉnh / đáy thật.

Hệ quả: râu **cùng chiều** nến gần như luôn có (96%), không mang thông tin. Chỉ râu **ngược chiều** mới cho biết có lực kéo ngược. Mọi luật đọc nến trong bộ tool chỉ dùng râu ngược.

### 1.3. Vì sao mỗi khung cần một chart

Đọc ZOS của khung H4 từ chart M15 cho ra nến khác với chart H4 thật. Vì vậy:
- **ZO_LP** chạy trên chart của từng khung, đọc ZOS của chính chart đó, rồi ghi kết quả ra file `Common\Files\zo_lp\<cặp>_<phút>.csv`.
- **ZO_View, ZO_Analyst** đọc các file đó. File gồm: dòng `H` (nến cuối, xu thế), 12 dòng `C` (12 nến ZOS vừa đóng), các dòng `Z` (từng LP).
- Khung không có file thì bị bỏ qua, hoặc ước tính bằng đọc từ xa và gắn nhãn `[ƯỚC TÍNH]`.

---

## 2. Tìm vùng thanh khoản (LP)

Thuật toán quét từ nến cũ tới nến mới (mặc định 500 nến mỗi khung):

1. **Chuỗi Build:** các nến Build liền nhau tạo thành một chuỗi. Chuỗi kết thúc khi gặp nến không phải Build.
2. **Chuỗi thành LP** khi có ít nhất 2 nến Build, hoặc chỉ 1 nến Build nhưng có râu cả hai đầu (mỗi râu ≥ 1 point).
3. **Biên LP:** High = đỉnh râu cao nhất của chuỗi, Low = đáy râu thấp nhất.
4. **Mở rộng:** một nến Build mới chạm vào LP chưa break và đóng bên trong nó thì LP được nới ra theo High / Low của nến đó (không tạo LP mới).

---

## 3. Vòng đời của một LP

Mỗi nến đóng, từng LP được cập nhật:

| Trạng thái | Điều kiện chuyển |
|---|---|
| **FRESH** (chưa break) | vừa tạo |
| **BROKEN** | giá đóng nến ZOS **trên High** → thành **GLP**; **dưới Low** → thành **RLP** |
| **RETEST** | GLP: Low của nến chạm xuống ≤ High của vùng. RLP: High của nến ≥ Low của vùng. Bộ đếm retest tăng 1 |
| **RUN** | sau khi retest, giá rời hẳn vùng (GLP: Low nến > High vùng) |
| **FAILED** (chết) | GLP: nến đóng dưới Low. RLP: nến đóng trên High |
| **CLEARED** (chết) | thân nến phủ cả hai mép vùng |

**Riêng khung H4 trở lên** (luật bạn đưa 30/9): LP chết ngay khi **thân nến ZOS bị điểm cuối cắt qua** — GLP: mép dưới thân nằm dưới Low; RLP: mép trên thân nằm trên High. Không cần chờ nến đóng hẳn ra ngoài.

"Điểm cuối" của GLP là Low, của RLP là High.

---

## 4. Main, Shield và xu thế

### 4.1. Main

Mỗi khi một LP đã break bị chết (gọi là "nạn nhân"), thuật toán tìm trong các LP **ngược chiều với nạn nhân** của cùng khung một LP thoả cả các điều kiện:
- còn sống, và đã break trước thời điểm đó;
- nằm đúng phía: GLP có Low ≤ Low nạn nhân; RLP có High ≥ High nạn nhân;
- **hình thành sau nạn nhân** (LP chỉ thành Main khi clear được LP ngược có trước nó).

Trong các LP thoả điều kiện, LP **break gần nhất** trở thành **Main**. Mỗi chiều chỉ giữ Main mới nhất.

### 4.2. Shield

LP cùng chiều với Main, còn sống, **sinh ra sau thời điểm Main được xác lập**. Shield đầu tiên là lv1, tiếp theo lv2…

### 4.3. Xu thế

**Xu thế của một khung = hướng của lần xác lập Main gần nhất** trên khung đó (GLP thành Main → tăng; RLP thành Main → giảm). Hệ dùng xu thế Main H4 làm hướng giao dịch chính.

Nhược điểm đã đo được: Main H4 **chậm hơn giá** ở các đoạn đảo chiều (tháng 1/2026 hệ thua 12/15 lệnh vì lý do này). Luật "dừng sau 2 lệnh thua" ở mục 6.4 là để hạn chế.

---

## 5. Đọc lực kéo trên nến ZOS M15

Với một lệnh hướng `d` (mua hoặc bán):
- **Râu ngược** = râu dưới nếu mua, râu trên nếu bán. Đây là lực kéo chống lại lệnh.
- **Râu thuận** = râu còn lại.

### 5.1. Cặp nến A/B ("một phe đã thua")

- **Nến A:** râu ngược ≥ thân của A, ≥ 1/3 biên độ của A, và ≥ 1 pip.
- **Nến B** (nến ngay sau): râu ngược ≤ max(0.5 pip, 10% biên độ của B), **hoặc** râu thuận dài hơn râu ngược.

### 5.2. Hết lực kéo (dùng cho PULLBACK)

- Trong 3 nến trước có ít nhất một nến râu ngược ≥ 5 pip và ≥ 1/3 biên độ của nó.
- Nến vừa đóng: râu ngược ≤ max(0.5 pip, 10% biên độ) và thân đi theo hướng lệnh.

### 5.3. Nến xác nhận (dùng cho LP-AB)

Một nến xác nhận khi râu ngược ≤ max(0.5 pip, 20% biên độ) **và** thân đi theo hướng lệnh.

### 5.4. Râu hết dần (Potential EP kiểu "fade")

- Nến A có râu ngược ≥ ngưỡng (Potential EP: 4 pip), dài hơn râu thuận.
- Các nến ở giữa (tối đa 5 nến): râu ngược ngắn hơn râu A và chưa hết.
- Điểm đánh dấu = nến **đầu tiên** có râu ngược ≤ 1/10 râu A, hoặc là nến 2 đầu (râu thuận ≥ râu ngược).

---

## 6. Tín hiệu vào lệnh (hệ ZEA)

Kiểm tra mỗi khi một nến M15 đóng. Vào market ở giá đóng nến đó.

### 6.1. MAIN-AB

1. Xu thế Main H4 = hướng lệnh, và Main đã giữ hướng **≥ 48 giờ**.
2. Có cặp nến A/B (mục 5.1) ở 2 nến vừa đóng.
3. LP H4 dùng làm mốc phải là **Main hoặc Shield** của phe đó (thêm ở lần 29).
4. Một trong hai nến giá trước đó (nến A hoặc nến trước A) có đáy (lệnh mua) nằm trong **nửa sâu** của LP đó: từ Low của vùng (cho phép thấp hơn tới 30 pip) đến 50% vùng. Lệnh bán: tương tự với đỉnh và nửa trên của RLP.
5. Không trong 0h–6h (giờ Việt Nam).

### 6.2. PULLBACK

1. Xu thế Main H4 = hướng lệnh.
1b. H4 **không** ở phase RUN (3 nến H4 gần nhất cùng màu mạnh, bất kể hướng) — thêm ở lần 29.
2. Hết lực kéo (mục 5.2).
3. Trong 17 nến gần nhất (khoảng 4 giờ), giá đã bị kéo ngược **≥ 15 pip** tính tới đáy / đỉnh của 4 nến cuối.
4. Đáy / đỉnh đó nằm ở một mốc: trong hoặc cách ≤ 10 pip một LP H4 cùng chiều, hoặc một LP M15 cùng chiều. (Số tròn từng là một loại mốc; đã bỏ ở lần 28 vì chỉ thêm lệnh lỗ.)
5. Không trong 0h–6h.

### 6.3. LP-AB

1. **Potential EP:** cặp nến A/B.
2. **Xác nhận:** 2 nến tiếp theo đều là nến xác nhận (mục 5.3). Vào khi nến thứ 2 đóng. Hệ ZEA3 chờ 3 nến (`InpEpConfirm = 3`).
3. **Vị trí:** đáy / đỉnh của đoạn từ nến A tới nến vào nằm trong hoặc cách ≤ 10 pip một LP H4 cùng chiều là **Main hoặc Shield** của phe đó.
4. **Phase:** không vào khi 2 nến H4 gần nhất đều màu yếu phía mình (xanh dương với lệnh mua; hồng / tím với lệnh bán).
5. **Giờ:** không vào 0h–6h và 19h–24h (phiên New York).
6. Cùng hướng cách nhau ít nhất 4 giờ.

**Từ 2/10/2026 (lần 52):** vị trí của LP-AB được nới thành *mọi GLP / RLP H4 cùng chiều còn sống* trong phạm vi 10 pip quanh đầu râu (input `InpEpAnyH4Lp`, backtest `ep_loc = "h4any"`, hệ `ZO-FLEX`). Danh mục 3 năm: 439 lệnh, +195R so với 377 lệnh, +125R khi chỉ nhận Main / Shield; sụt lớn nhất 43R so với 33R. MAIN-AB vẫn chỉ vào ở Main / Shield (nới MAIN-AB làm mất R).

LP-AB không yêu cầu thuận xu thế Main H4 hiện tại. Lý do nằm ở nghiên cứu lần 24: vị trí tại Main / Shield là yếu tố ổn định nhất, còn hướng Main H4 thì không.

### 6.4. Các bộ chặn

| Chặn | Áp dụng | Luật |
|---|---|---|
| Vùng Main W1 / D1 ngược | MAIN-AB, PULLBACK | Không vào khi giá vào nằm trong một LP D1 hoặc W1 ngược chiều đã từng là Main và còn sống |
| Dừng sau thua | MAIN-AB, PULLBACK | 2 tín hiệu thua liên tiếp cùng hướng → dừng hướng đó 48 giờ. "Thua" = chạm SL trước khi đi được 1R |
| Tin đỏ | mọi tín hiệu của EA | Không phát tín hiệu trong ±30 phút quanh tin mức cao của USD / EUR (chỉnh được; backtest chưa chứng minh có lợi) |
| SL quá xa | tất cả | SL theo cấu trúc > 15 pip → không vào |
| Nến H4 mạnh ngược (`InpH4Veto`) | tất cả | Nến ZOS H4 vừa đóng có màu mạnh của phe ngược (BUY: đỏ, SELL: xanh lá) → không vào. Backtest lần 32: nhóm này có 23 lệnh, thắng 2, thua 12 |

---

## 7. Kế hoạch lệnh

### 7.1. SL

- MAIN-AB, PULLBACK: sau đáy / đỉnh của **4 nến giá gần nhất** + 3 pip.
- LP-AB: sau đáy / đỉnh của đoạn từ nến A tới nến vào + 3 pip.
- Nếu khoảng cách < 10 pip → nới thành 10 pip. Nếu > 15 pip → bỏ lệnh. (Cấu hình ZEAR: tối thiểu 8 pip.)

Gọi khoảng cách SL là **1R**.

### 7.2. TP

Tìm **LP H4 ngược chiều gần nhất phía trước** (còn sống, kể cả LP chưa break). Lấy 3 mức của nó: mép gần, điểm giữa, đầu xa.

| Cấu hình | Ba đích |
|---|---|
| ZEA (`InpTpProfile = 0`) | 1R, giữa, đầu xa |
| ZEAR (`InpTpProfile = 1`) | mép gần, giữa, đầu xa |

- Không có LP ngược phía trước → dùng 5R thay cho các mức của LP.
- Chỉ giữ các mức cách giá vào ≥ 1R. Khối lượng chia đều cho các mức còn lại.
- Lot < 0.03 (không chia được 3 phần): 1 đích duy nhất — MAIN-AB: 2R hoặc mép gần LP; PULLBACK, LP-AB: 3R, giữa hoặc xa — lấy mức gần nhất cách ≥ 1.5R.

### 7.3. Quản lý

- **BE:** khi giá đi được 1R, dời SL về giá vào.
- **Giữ theo nến ZO (`InpHoldMode = 1`, hệ ZEAR2 / ZEA2):** khi nến M15 chạm một đích mà nến ZOS M15 đó **không phải màu của phe ngược** (BUY: không đỏ, không hồng) thì chưa chốt phần đó. Chốt ở giá đóng của nến ZOS M15 đầu tiên có màu phe ngược. Nếu chính nến chạm đích đã là màu ngược thì chốt ở giá đóng nến đó.
- **Khoá lời khi giữ (`InpHoldLockR`, hệ ZEAR2):** lúc một phần bắt đầu được giữ, SL của cả lệnh kéo lên giá vào + 0.5R.
- **Hệ ZEA2:** đích 1R luôn chốt bằng TP cứng; chỉ phần 2 và 3 giữ theo luật trên, không khoá lời.
- **Luật cũ (`InpHoldMode = 0`):** chỉ giữ khi nến ZOS M15 là màu mạnh phía mình và râu ngược ≤ max(0.5 pip, 20% biên độ); backtest lần 33 cho thấy luật mới thêm 23–32R.
- **Đóng cuối tuần:** lệnh còn mở tới 22h thứ 6 (giờ VN) bị đóng. EA tự đóng lệnh của nó (`InpAutoFridayClose`); lệnh đặt tay thì bạn tự đóng.

### 7.5. Tự đặt lệnh (mặc định bật trên demo; tài khoản thật cần thêm `InpAllowRealAccount`)

1. **Kiểm tra trước:** tài khoản demo (hoặc đã bật `InpAllowRealAccount`), MT4 cho phép trade, spread ≤ 2 pip, giá chưa chạy quá 3 pip khỏi giá tín hiệu, giá còn cách SL ≥ 5 pip, số tín hiệu đang mở < 2.
2. **Khối lượng:** tổng lot = vốn × rủi ro% / (SL tính bằng pip × giá trị pip). Chia đều cho số đích, làm tròn xuống theo bước lot.
3. **Không chia được** (mỗi phần < lot tối thiểu): mở 1 lệnh với toàn bộ khối lượng và 1 đích (mục 7.2). Nếu cả khối lượng vẫn < lot tối thiểu thì bỏ lệnh, vì đặt lot tối thiểu sẽ vượt mức rủi ro.
4. **Đặt lệnh:** mỗi đích một lệnh market cùng SL. Broker từ chối SL / TP kèm lệnh (lỗi 130) → mở lệnh trước, sửa SL / TP sau.
5. **Quản lý:** mỗi 5 giây, với các lệnh có đúng magic number: giá đi được 1R (khoảng cách SL lúc mở) thì dời SL về giá vào; 22h thứ 6 thì đóng.
6. **Giữ theo nến ZO:** lệnh được giữ mở không có TP; đích lưu trong biến toàn cục của terminal. Mỗi khi nến M15 đóng (và ZO_LP đã ghi nến đó), EA xét từng lệnh: chưa chạm đích → bỏ qua; chạm đích hoặc đang giữ mà nến ZOS M15 màu ngược → đóng ở giá thị trường; chạm đích mà nến chưa đổi màu → đánh dấu đang giữ và kéo SL của các lệnh cùng tín hiệu lên +0.5R (cấu hình ZEAR).

### 7.4. Lot gợi ý

`lot = vốn × rủi ro% / (SL tính bằng pip × giá trị 1 pip của 1 lot)`. Mặc định rủi ro 5% (`InpRiskPct`).

---

## 8. Các con số ước lượng trong tin nhắn

Ba nhóm số dưới đây **không phải xác suất**. Nghiên cứu lần 24 cho thấy điểm cộng dồn kiểu này không dự báo được thắng thua; chúng chỉ giúp đọc nhanh tình huống. Quyết định vào lệnh dựa trên các luật ở mục 6.

### 8.1. Phase

**Phase dùng trong luật** (giống hệt backtest), tính từ các nến ZOS vừa đóng của một khung:

| Mã | Điều kiện |
|---|---|
| ACC (tích luỹ) | ≥ 3 trong 5 nến gần nhất là nến 2 đầu, thân ≤ 40% biên độ |
| RUN (chạy) | 3 nến gần nhất cùng màu mạnh một phía |
| FADE (yếu dần) | 2 nến gần nhất cùng màu yếu một phía |
| UNK | còn lại |

**Phase % trong bản phân tích** (ước lượng): mỗi phase có một điểm thô rồi chia tỉ lệ cho đủ 100%.

| Phase | Điểm thô |
|---|---|
| Accumulation | 8 + 20 × (số nến 2 đầu trong 5 nến) + 8 nếu thân đang ngắn lại |
| Run | 8 + 26 × (số nến màu mạnh cùng phía trong 3 nến) + 10 nếu thân đang dài ra |
| Distribution | 6 + 16 × (số nến màu yếu cùng phía trong 5 nến) + 6 × (số nến Build trong 5 nến) |
| SHS | 5 + 45 nếu vừa có LP chết trong vòng 3 nến sau khi break + 12 nếu thân dài gấp đôi trước đó |
| Unclear | 14 |

### 8.2. Thiên hướng BUY / SELL %

Mỗi phe bắt đầu với 1 điểm, cộng thêm:

| Bằng chứng cho phe đó | Điểm |
|---|---|
| Giá đang ở (hoặc cách ≤ 10 pip) Main / Shield H4 của phe đó | +3 |
| Xu thế Main H4 thuộc phe đó | +2 |
| Nến ZOS H4 vừa đóng cùng màu phe đó | +1 |
| H4 đang RUN theo phe đó | +1 |
| Phe kia đang FADE trên H4 | +1 |
| Main H4 thuộc phe đó và Main M15 đang ngược (pullback) | +1 |
| Giá trong Main D1 / W1 của phe đó | +1 |
| Giá trong Main D1 / W1 của phe kia | −2 |

`BUY% = điểm BUY / (điểm BUY + điểm SELL)`. Confidence: chênh lệch hai phe ≥ 40 điểm phần trăm là HIGH, ≥ 20 là MEDIUM, còn lại LOW.

### 8.3. Quality /100 của Potential EP

Là bảng kiểm các luật của LP-AB:

| Điều kiện đạt | Điểm |
|---|---|
| Đầu râu ở Main / Shield H4 cùng chiều | 35 |
| Đầu râu ở GLP / RLP H4 cùng chiều thường (khi `InpEpAnyH4Lp` bật, từ 2/10/2026) | 30 |
| Mỗi case nên tránh: sai phía biên độ 5 ngày, đợt trước < 20 pip, đầu râu trong LP M15 ngược, retest LP H4 vừa bị phá | −10 |
| Kiểu cặp nến A/B | 15 |
| H4 không màu yếu phía mình | 10 |
| Phiên Á hoặc London | 10 |
| Không trong Main D1 / W1 ngược | 5 |
| Không gần tin đỏ | 5 |
| Mỗi nến xác nhận đã có (tối đa 2) | 10 |

100 điểm = đủ mọi luật → `ENTRY`. EA chỉ báo `POTENTIAL EP` khi điểm ≥ `InpEpMinQuality` (mặc định 50, nghĩa là bắt buộc ở một LP H4 cùng chiều: Main, Shield, hoặc GLP / RLP thường khi `InpEpAnyH4Lp` bật).

---

## 8b. Số tròn (RN)

RN = các mức giá cách nhau **25 pip** (bội của 0.0025: …00, …25, …50, …75), theo định nghĩa ZO. RN chỉ dùng để hiển thị: dòng `● RN` trong bản phân tích, dòng "RN … hội tụ" trong tin Potential EP (khi đầu râu cách RN ≤ 3 pip). RN không tham gia điều kiện vào lệnh và không cộng điểm.

---

## 9. Lịch tin

- EA tải `ff_calendar_thisweek.json` (lịch tuần này của ForexFactory) mỗi 4 giờ.
- Mỗi sự kiện có giờ kèm múi giờ; EA đổi về GMT rồi so với đồng hồ GMT của terminal.
- EA ghi `Common\Files\zo_lp\news.csv` (giờ GMT; đồng tiền; mức độ 3 / 2 / 1; tên) để ZO_View đọc.
- Một tin "đang hiệu lực" khi giờ hiện tại nằm trong [giờ tin − 30 phút, giờ tin + 30 phút].
- Backtest dùng lịch quá khứ của FXStreet (`backtest/data/news_2025-12_2026-09.csv`).

---

## 10. Thuật toán hiển thị

### 10.1. Chọn LP để vẽ (ZO_View)

1. Trong các LP cùng chiều chồng lên nhau, chỉ giữ LP có điểm cao nhất. Điểm = 100 nếu là Main + 5 × số nến Build (tối đa 4) + 12 nếu đang retest / 10 nếu vừa break / 6 nếu chưa break / 2 nếu đã chạy − 2 × số lần retest (tối đa 5) + một phần nhỏ ưu tiên LP mới hơn.
2. Sắp theo khoảng cách tới giá. Giữ: mọi Main, LP đang chứa giá, và N LP gần nhất phía trên, N phía dưới (ZO_View: `InpPerSide`, 0 = vẽ hết).

### 10.2. Nhãn không đè nhau

Nhãn đặt ở đầu đường (hoặc mép trái màn hình nếu đường bắt đầu ngoài màn hình). Nếu một nhãn cách nhãn đã đặt < 6 pip theo giá và < 1 bước (14–16 nến) theo thời gian thì dời sang phải một bước, lặp tối đa 12 lần. ZO_Review tính lại mỗi khi bạn cuộn hoặc zoom.

### 10.3. ZO_BTView và file overlay

`zo_bt_overlay_<cặp>.csv` do `bt_lab.py` ghi, mỗi dòng một loại:

| Dòng | Nội dung |
|---|---|
| `Z` | một LP: khung, thời điểm bắt đầu, tạo, break, chết, High, Low, hướng, thời điểm thành Main |
| `M` | một lần đổi xu thế Main H4 |
| `T` | một lệnh: hệ, hướng, giờ vào, giờ thoát, giá vào, SL, TP, kết quả, R, giá thoát |
| `N` | chú thích của một lệnh: lý do, yếu tố ủng hộ, không ủng hộ, bối cảnh, quản lý |
| `X` | tín hiệu bị loại và lý do (các hệ cũ) |

Khi bạn bấm vào một lệnh, ZO_BTView tìm dòng `N` có cùng hệ và cùng giờ vào, cắt thành các dòng ≤ 60 ký tự (nhãn MT4 giới hạn 63 ký tự) và hiện thành bảng.

Chú thích được tính trong `backtest/bt_explain.py`: với mỗi lệnh, đo lại 21 yếu tố bối cảnh tại thời điểm vào (Main H4, màu H4, Main / Shield, nửa sâu LP, nội chiến, LP M15, Main D1 / W1, khoảng trống tới đích, độ dài râu kéo, phase, phiên, tin).

### 10.4. ZO_ExportMarks

Duyệt mọi đối tượng trên chart, bỏ qua đối tượng do tool vẽ (tên bắt đầu bằng `ZOBT_`, `ZOVIEW_`, `ZODRAW_`, `ZOLP_`, `ZOREV_`, `ZOWICK_`, `ZOAN_`). Mũi tên lên / Buy Sign / Thumbs Up = BUY; mũi tên xuống / Sell Sign / Thumbs Down = SELL; Stop Sign = NO_TRADE. Ghi thời gian, giá, mô tả.

---

## 11. Backtest được làm thế nào

- **Dữ liệu:** nến ZOS xuất bằng ZOS_Probe. M15 từ 19/12/2025 đến 30/9/2026 (41 tuần); H4 từ 2018; D1 từ 9/2023; W1 từ 2021.
- **Mô phỏng lệnh:** đi từng nến M15 sau khi vào.
  - Spread cố định 1 pip.
  - Một nến chạm cả SL và TP thì tính là **thua**.
  - Không nhìn trước: mọi điều kiện chỉ dùng dữ liệu đã đóng tại thời điểm vào.
- **Mô phỏng tài khoản:** lãi kép, lot tính theo % rủi ro, tối đa 2 lệnh cùng lúc, lot tối thiểu 0.01.
- **Chia dữ liệu:** giai đoạn nghiên cứu tới 31/7/2026; **kiểm tra cuối** 1/8–30/9/2026 không dùng để chọn luật. Nghiên cứu Potential EP còn tách thêm TRAIN (tới 30/4) và VALID (1/5–31/7).
- **Nguyên tắc chọn luật:** chỉ giữ luật có lãi ở cả các giai đoạn và không nhạy với việc đổi nhẹ ngưỡng.

**Những gì đã thử và bỏ** (kết quả kém hoặc không ổn định):
- Vào ngược xu thế Main H4 không điều kiện; theo xu thế M15.
- Dùng Main W1 / D1 để chọn hướng (dùng làm bộ chặn thì tốt).
- Lọc theo volume PVSRA, LP M15 lồng trong LP H4, số tròn, râu ≥ 10 pip.
- Chấm điểm cộng trọng số; để máy tự học trọng số (khớp quá khứ).
- TP cố định theo số R, trailing stop, BE sớm ở 0.7R.
- Đổi cách thoát theo phase hoặc theo độ mạnh nến vào.
- Luật riêng cho phiên New York; bỏ theo từng giờ.

Chi tiết từng lần thử nằm trong các file `docs/2026-…-lanNN-….md`.

---

## 12. Giới hạn của thuật toán

- **Main chậm hơn giá** ở đoạn đảo chiều.
- **Phase** chỉ dựa trên 3–5 nến gần nhất của một khung; phân phối và săn SL mới ở mức ước lượng thô.
- **Dữ liệu ngắn:** 41 tuần, một cặp tiền, một giai đoạn thị trường.
- **Chưa mô phỏng** giãn spread, trượt giá, khớp lệnh trễ khi ra tin.
- **ZOS là hộp đen:** nếu phiên bản ZOS khác tính nến khác đi, mọi kết quả phải kiểm lại.
