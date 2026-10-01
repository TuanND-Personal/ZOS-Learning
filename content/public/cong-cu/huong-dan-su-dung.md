# Hướng dẫn sử dụng bộ tool ZO (hệ ZEAR2, H4 → M15)

Bản 1/10/2026, cho EURUSD trên MT4. Bộ tool vẽ vùng thanh khoản, phân tích, báo tín hiệu qua Telegram và giúp bạn xem lại backtest. EA **tự đặt lệnh trên tài khoản demo**; trên tài khoản thật nó chỉ báo tín hiệu, trừ khi bạn bật thêm (mục 5.2b).

> Chạy trên **tài khoản demo** ít nhất 4 tuần trước khi dùng tiền thật. Kết quả backtest dựa trên 41 tuần dữ liệu của một cặp tiền.

Cách các tool tính toán: xem file `GIAI-THICH-THUAT-TOAN.md`.

---

## 1. Bộ tool gồm những gì

| Tên | Loại | Dùng để | Gắn ở đâu |
|---|---|---|---|
| **ZO_LP** | Indicator | Tính vùng thanh khoản (LP) từ nến ZOS, theo dõi trạng thái, ghi dữ liệu cho các tool khác | Chart của **từng khung**: W1, D1, H4, H1, M15 |
| **ZO_Analyst** | EA | Phân tích thị trường, báo Potential EP và tín hiệu vào lệnh, nhắc quản lý lệnh, cảnh báo tin — tất cả qua Telegram | 1 chart M15 |
| **ZO_View** | Indicator | Hộp LP của khung đang xem, nến đáng chú ý, bảng tóm tắt | Chart bạn hay nhìn |
| **ZO_DrawLP** | Script | Vẽ một lần các LP W1 / D1 / H4 dạng đường có nhãn | Kéo vào chart khi cần |
| **ZO_BTView** | Indicator | Xem lại lệnh backtest, bấm vào lệnh để biết vì sao vào | Chart M15 riêng |
| **ZO_Review** | Indicator | Chart sạch để tự đánh dấu điểm vào | Chart M15 riêng |
| **ZO_Wick** | Indicator | Kiểm tra máy nhận diện "nến râu dài" có đúng ý bạn không | Chart M15 có ZOS |
| **ZO_ExportMarks** | Script | Xuất các mũi tên bạn tự đánh dấu ra file | Chạy trên chart đã đánh dấu |
| **ZOS_Probe** | Script | Xuất dữ liệu nến ZOS ra CSV cho backtest | Chart của từng khung |
| **ZO_Notifier** | EA | Bản cũ, chỉ chuyển cảnh báo ZO_LP sang Telegram | **Không cần** nếu dùng ZO_Analyst |

Khi kéo bất kỳ tool nào vào chart, tab **About / Common** hiện mô tả ngắn: nó làm gì và cần gì.

**Yêu cầu:** MT4 đã cài indicator **ZOS** và ZOS chạy được trên tài khoản.

---

## 2. Cài đặt trên Windows

Làm một lần. Cần MT4 đã đăng nhập tài khoản và đã có indicator **ZOS**.

### 2.1. Chép file vào MT4

1. Giải nén file zip (hoặc tải cả thư mục từ Drive về). Bạn sẽ có thư mục `ZO-tools-…` chứa thư mục con **`MQL4`**.
2. Mở MT4 → menu **File → Open Data Folder**. Windows Explorer mở ra một thư mục, trong đó cũng có thư mục **`MQL4`**.
3. Kéo thư mục `MQL4` của gói thả vào cửa sổ vừa mở (hoặc Ctrl+C rồi Ctrl+V). Windows hỏi có gộp / ghi đè không → chọn **Yes** / **Replace**. Sau bước này các file nằm ở:

| File trong gói | Nằm ở đâu trong Data Folder |
|---|---|
| `ZO_LP`, `ZO_View`, `ZO_BTView`, `ZO_Review`, `ZO_Wick` (`.ex4` và `.mq4`) | `MQL4\Indicators` |
| `ZO_Analyst`, `ZO_Notifier` | `MQL4\Experts` |
| `ZO_DrawLP`, `ZO_ExportMarks`, `ZOS_Probe` | `MQL4\Scripts` |
| `ZoCore.mqh` | `MQL4\Include\ZO` |
| `zo_bt_overlay_EURUSD.csv` | `MQL4\Files` |

4. Quay lại MT4. Mở cửa sổ **Navigator** (Ctrl+N) → chuột phải vào vùng trống → **Refresh**. Các tool hiện dưới mục *Indicators*, *Expert Advisors*, *Scripts*. Không thấy thì đóng MT4 rồi mở lại.

Chỉ cần file `.ex4` là chạy được. File `.mq4` là mã nguồn, để đó cũng không sao.

### 2.2. Cho phép EA chạy và gửi Telegram

1. Menu **Tools → Options → tab Expert Advisors**:
   - tick **Allow automated trading**;
   - tick **Allow WebRequest for listed URL**, bấm đúp vào dòng trống bên dưới và thêm lần lượt hai địa chỉ:
     - `https://api.telegram.org`
     - `https://nfs.faireconomy.media`
   - bấm **OK**.
2. Trên thanh công cụ, bấm nút **AutoTrading** cho nó chuyển sang màu xanh.

### 2.3. Kéo tool vào chart

- **Indicator / EA:** trong Navigator, giữ chuột trái vào tên tool rồi **kéo thả vào chart** (hoặc bấm đúp khi chart đang được chọn). Cửa sổ thiết lập hiện ra: tab **Inputs** để chỉnh thông số, bấm **OK**.
- **EA (ZO_Analyst):** ở tab **Common** tick thêm **Allow live trading**. Gắn xong, góc trên phải chart có mặt cười 🙂 là EA đang chạy; mặt buồn ☹ là nút AutoTrading đang tắt.
- **Script (ZO_DrawLP, ZO_ExportMarks, ZOS_Probe):** kéo thả vào chart, nó chạy một lần rồi tự thoát.
- **Gỡ indicator:** chuột phải chart → **Indicators List** → chọn → **Delete**. **Gỡ EA:** chuột phải chart → **Expert Advisors → Remove**.
- **Đổi thông số sau khi đã gắn:** indicator: chuột phải chart → Indicators List → Edit. EA: bấm **F7**.
- Một chart chỉ gắn được **một EA**; indicator thì gắn bao nhiêu cũng được.

### 2.4. Khi cập nhật bản mới

1. Chép đè thư mục `MQL4` như bước 2.1.
2. Navigator → Refresh (hoặc khởi động lại MT4).
3. Tool đang gắn trên chart vẫn giữ **thông số cũ**. Muốn nhận mặc định mới: gỡ ra rồi kéo vào lại, hoặc mở Inputs và bấm **Reset**.

File `MQL4/Files/zo_bt_overlay_EURUSD.csv` là dữ liệu backtest để ZO_BTView, ZO_Review, ZO_Wick dùng.

---

## 3. Thiết lập lần đầu (làm một lần, khoảng 10 phút)

### Bước 1: tạo template dữ liệu `ZO_DATA`

ZOS chỉ tính đúng trên chart của chính khung đó. Vì vậy mỗi khung cần một chart riêng có ZOS + ZO_LP.

1. Mở một chart **EURUSD** bất kỳ.
2. Gắn **ZOS** (hoặc áp template ZOTheme có sẵn ZOS).
3. Kéo **ZO_LP** vào, giữ mặc định, OK.
4. Chuột phải chart → **Template → Save Template…** → đặt tên **`ZO_DATA`**.

### Bước 2: gắn EA

Bản tải từ website **để trống** token Telegram: tạo bot theo [hướng dẫn Telegram / Discord](02-huong-dan-telegram-discord.md), rồi điền `InpTelegramToken` và `InpTelegramChatId` ở tab Inputs khi gắn EA.

1. Mở chart **EURUSD M15**, áp template `ZO_DATA` (để chart này cũng có ZOS + ZO_LP).
2. Kéo **ZO_Analyst** vào chart đó → OK. Bật nút **AutoTrading** trên thanh công cụ (EA cần nút này để chạy, dù không đặt lệnh).
3. EA tự mở các chart còn thiếu (W1, D1, H4, H1) và áp template `ZO_DATA`.
4. Chờ 10–30 giây. EA gửi bản phân tích đầu tiên về Telegram.

Nếu EA báo "thiếu dữ liệu": kiểm tra các chart vừa mở đã có cả ZOS và ZO_LP chưa; xem tab **Experts** phía dưới MT4 có dòng lỗi nào không.

### Bước 3: chart để nhìn

1. Mở thêm một chart M15 (hoặc dùng luôn chart có EA), gắn **ZO_View**.
2. Kéo script **ZO_DrawLP** vào để có các đường LP W1 / D1 / H4.

### Bước 4: lưu bộ chart

**File → Profiles → Save As…** → đặt tên (ví dụ `ZO`). Lần sau mở MT4 chỉ cần chọn profile này.

---

## 4. Dùng hằng ngày

```
Đầu ngày (10 phút)
  1. Đọc bản "ZOS MARKET ANALYSIS" mới nhất trên Telegram.
  2. Ghi lại: thiên hướng (BUY hay SELL), vùng Main / Shield H4 mà kịch bản chính chờ, giờ có tin đỏ.
  3. Không có kịch bản rõ (Confidence LOW, giá không gần vùng nào) → hôm nay chỉ quan sát.

Trong ngày
  4. Tắt chart, làm việc khác. Chờ Telegram.
  5. Nhận "🔔 POTENTIAL EP" → mở chart M15, xem nến ZO. CHƯA vào lệnh.
  6. Nhận "✅ ENTRY" hoặc "🎯 TÍN HIỆU ZOU" → kiểm tra giá chưa chạy xa quá 3 pip so với giá vào
     → đặt lệnh market với SL và các TP trong tin. Đã chạy xa thì bỏ.
  7. Nhận "🛡" → dời SL về hoà vốn. Nhận "✋" → chốt phần đang giữ.
  8. Nhận "📰" → không vào lệnh mới trong ±30 phút quanh tin.
  9. Nhận "⏸" → hệ đang tạm dừng một hướng sau 2 lệnh thua, không tự vào hướng đó.

Cuối tuần
 10. Mở ZO_BTView xem lại các lệnh hệ đã vào, bấm vào lệnh thua để đọc bối cảnh.
 11. Ghi nhật ký: lệnh nào theo tín hiệu, lệnh nào tự vào, kết quả.
```

**Quản lý vốn:** rủi ro **2% mỗi lệnh** (`InpRiskPct`). Với mức này backtest sụt vốn tối đa khoảng 14–16%. Chuỗi thua 5 lệnh là bình thường.

**Giờ không vào lệnh** (giờ Việt Nam): 0h–6h cho mọi tín hiệu; thêm 19h–24h (phiên New York) cho tín hiệu EPA.

---

## 5. Từng tool

### 5.1. ZO_LP (bắt buộc, chạy nền)

- **Gắn:** trên chart của từng khung W1, D1, H4, H1, M15 (EA tự làm việc này nhờ template `ZO_DATA`).
- **Làm gì:** tìm LP, theo dõi trạng thái, gắn Main / Shield, ghi file dữ liệu vào `Common\Files\zo_lp\`. Mặc định nó không vẽ gì (để ZO_View vẽ).
- **Input đáng chú ý:**
  - `InpLookback` (500): số nến quét mỗi khung. Chart chậm thì giảm xuống 300.
  - `InpMainMaxTf` (240): gắn Main tới khung H4.
  - `InpAlertPopup`: tắt nếu không muốn popup trong MT4.

### 5.2. ZO_Analyst (EA)

- **Gắn:** một chart M15 duy nhất. Không chạy cùng lúc với ZO_Notifier.
- **Input đáng chú ý:**

| Input | Mặc định | Ý nghĩa |
|---|---|---|
| `InpTpProfile` | 1 | 0 = ZEA: chốt ở 1R / giữa / đầu xa LP H4 ngược (tỉ lệ thắng ~62%). 1 = ZEAR: chốt ở mép gần / giữa / đầu xa (nhiều lợi nhuận hơn, tỉ lệ thắng ~45%) |
| `InpRiskPct` | 5 | % vốn rủi ro mỗi lệnh: dùng cho lot gợi ý và lot tự đặt. Vốn nhỏ (dưới ~200$) để 5; vốn lớn hơn nên giảm còn 2–3 |
| `InpH4Veto` | true | Không vào lệnh khi nến ZOS H4 vừa đóng có màu mạnh ngược hướng lệnh (BUY mà nến H4 đỏ, SELL mà nến H4 xanh lá) |
| `InpHoldMode` | 1 | 1 = phần đã chạm đích được giữ tới khi có nến ZO M15 màu ngược rồi mới chốt. 0 = chạm đích là chốt (TP cứng) |
| `InpHoldLockR` | 0.5 | Khi bắt đầu giữ một phần qua đích, kéo SL của cả lệnh lên +0.5R (chỉ với `InpTpProfile = 1`). 0 = tắt |
| `InpSignals` | true | Tín hiệu ZOU (ZM và U1w) |
| `InpEpSignals` | true | Báo Potential EP và tín hiệu EPA |
| `InpEpConfirm` | 2 | Số nến ZO xác nhận trước khi vào lệnh EPA. 2 = hệ ZEA; 3 = hệ ZEA3 (ít lệnh hơn, sụt vốn thấp hơn) |
| `InpEpMinQuality` | 50 | Chỉ báo Potential EP từ mức điểm này |
| `InpNews` | true | Tải lịch tin, cảnh báo, chặn tín hiệu quanh tin |
| `InpNewsBlockMin` | 30 | Số phút chặn trước và sau tin đỏ. Đặt 0 nếu chỉ muốn cảnh báo |
| `InpLossPause` / `InpPauseHours` | 2 / 48 | Thua 2 tín hiệu ZOU liên tiếp cùng hướng thì dừng hướng đó 48h |
| `InpQuietFrom` / `InpQuietTo` | 0 / 7 | Giờ yên lặng: tin nhỏ bị bỏ, tin lớn giữ lại tới sáng |
| `InpAutoOpenCharts` | true | Tự mở chart các khung còn thiếu |
| `InpDataTemplate` | ZO_DATA | Tên template có ZOS + ZO_LP |
| `InpAnalysisStyle` | 0 | 0 = mẫu "ZOS MARKET ANALYSIS", 1 = kiểu cũ |
| `InpDrawSignals` | true | Vẽ mũi tên + SL / TP của tín hiệu lên chart |

- Bản phân tích mới nhất luôn được ghi ra `MQL4\Files\zo_analysis_EURUSD.txt`.

### 5.2b. Tự đặt lệnh (demo: mặc định BẬT, tài khoản thật: mặc định chỉ báo tín hiệu)

- **Tài khoản demo:** EA tự đặt lệnh ngay (`InpAutoTrade = true` là mặc định). Cần tick **Allow live trading** ở tab Common khi gắn EA và bật nút AutoTrading. Muốn chỉ nhận tín hiệu thì đặt `InpAutoTrade = false`.
- **Tài khoản thật:** EA chỉ báo tín hiệu, không đặt lệnh, dù `InpAutoTrade` đang bật. Chỉ khi bật thêm `InpAllowRealAccount = true` EA mới đặt lệnh trên tài khoản thật.

**EA làm gì khi bật:**
- Mỗi tín hiệu vào lệnh (`🎯 TÍN HIỆU ZOU` và `✅ ENTRY`) được đặt thành lệnh market ngay lúc đó.
- Khối lượng tính theo `InpRiskPct` (mặc định 5% vốn) và khoảng cách SL.
- MT4 không chốt từng phần được, nên EA mở **mỗi đích một lệnh** (tối đa 3 lệnh cùng SL, khác đích). Lot quá nhỏ để chia thì mở 1 lệnh với 1 đích.
- **Giữ lệnh qua đích** (`InpHoldMode = 1`): lệnh được giữ **không có TP trên server**, chỉ có SL. Mỗi khi nến M15 đóng, EA kiểm tra: lệnh đã chạm đích mà nến ZO M15 chưa đổi sang màu ngược thì giữ tiếp; nến đổi màu ngược thì đóng ở giá thị trường. Với `InpTpProfile = 1` cả ba lệnh đều giữ kiểu này và SL được kéo lên +0.5R khi bắt đầu giữ; với `InpTpProfile = 0` lệnh đầu có TP cứng ở 1R, hai lệnh sau giữ theo nến.
- Khi giá đi được 1R: EA dời SL của các lệnh đó về giá vào (`InpAutoBE`).
- 22h thứ 6 (giờ VN): EA đóng các lệnh của nó (`InpAutoFridayClose`).
- Mỗi hành động đều có tin Telegram bắt đầu bằng `🤖`.

**Các lớp an toàn:**

| Input | Mặc định | Ý nghĩa |
|---|---|---|
| `InpAutoTrade` | true | Công tắc chính (chỉ có tác dụng trên demo, trừ khi bật dòng dưới) |
| `InpAllowRealAccount` | false | Tắt = chỉ đặt lệnh trên tài khoản **demo**. Trên tài khoản thật EA chỉ báo tin, không đặt |
| `InpMaxOpenTrades` | 2 | Số tín hiệu tối đa mở cùng lúc |
| `InpMaxSpreadPips` | 2.0 | Spread rộng hơn thì bỏ lệnh |
| `InpMaxDriftPips` | 3.0 | Giá đã chạy xa giá tín hiệu hơn mức này thì bỏ lệnh |
| `InpSlippagePoints` | 20 | Trượt giá tối đa |
| `InpMagic` | 20261001 | Số nhận diện lệnh của EA. EA chỉ quản lý lệnh có số này, không đụng lệnh bạn đặt tay |

**Lưu ý khi giữ lệnh qua đích:** vì lệnh không có TP trên server, **MT4 phải luôn mở và có mạng** thì lệnh mới được chốt đúng luật. Nếu tắt máy, lệnh chỉ còn SL bảo vệ. Muốn TP cứng như trước thì đặt `InpHoldMode = 0`.

**Cần biết trước khi bật:**
- Phần tự đặt lệnh mới được kiểm tra bằng compile, **chưa chạy thật lần nào**. Bật trên demo và theo dõi sát ít nhất vài tuần.
- Nếu broker không cho đặt SL / TP cùng lúc mở lệnh, EA mở lệnh trước rồi đặt SL / TP sau. Nếu bước sau lỗi, EA gửi tin `⚠ … CHƯA đặt được SL / TP` — khi đó phải đặt tay ngay.
- MT4 phải mở và có mạng. Tắt máy thì lệnh đang mở vẫn có SL / TP trên server, nhưng không được dời BE.

### 5.3. ZO_View

- **Thấy gì (mặc định, bản gọn):**
  - Hộp LP của khung đang mở: GLP xanh, RLP đỏ, chưa break viền vàng, đã chạy viền xám. Main có viền dày và chữ MAIN. Mỗi phía 2 hộp gần giá nhất.
  - ★ ở nến tạo Main.
  - Bảng ở **góc phải trên** (để không đè lên ô đặt lệnh nhanh của MT4): mỗi khung một dòng (màu ZOS, xu thế Main, giá đang ở đâu), kế hoạch vào lệnh, tin đỏ kế tiếp.
- **Các dấu đang tắt, bật lại nếu cần:**
  - `InpMarkBreak`: mũi tên ở nến làm LP break.
  - `InpMarkDeath`: dấu ✖ kèm chữ `clear` (thân nến phủ cả vùng) hoặc `thung` (đóng qua điểm cuối) ở nến giết LP.
  - `InpMarkBuild1`: chấm vàng ở nến Build 1 đầu đứng riêng.
  - `InpMarkShrink`: chữ `thu nen` khi 3/5 nến là nến 2 đầu tại một LP.
- **Nút `ZO -` / `ZO +`:** thu gọn / mở bảng.
- **Input:** `InpPanelTfs` (khung hiện trong bảng), `InpPanelMode` (1 = bảng đầy đủ), `InpPanelCorner` (dời góc), `InpPanelBox = false` (bỏ nền tối).

### 5.4. ZO_DrawLP (script)

- Kéo vào chart → OK. Vẽ các LP quan trọng: **W1 đỏ, D1 vàng, H4 xanh lam**. GLP nét liền, RLP nét đứt, chưa break nét chấm.
- Mỗi đường có nhãn `High …` hoặc `Low …` kèm giá, đặt ở mép trái màn hình lúc chạy.
- Kéo lại để cập nhật. `InpRemoveOnly = true` để xoá. Thêm `60` vào `InpTimeframes` để vẽ cả H1.

### 5.5. ZO_BTView (xem lại backtest)

- Gắn lên một chart M15 riêng. `InpShow` = tên hệ: `ZEAR2` (mặc định), `ZEA2`, `ZEAR`, `ZEA`, `ZEA3`, `ZOU`, `EPA`.
- Đường nối giá vào → giá thoát: **xanh = lãi, đỏ = lỗ, trắng = hoà**. Mũi tên B / S ở điểm vào, SL / TP là đoạn chấm mờ.
- **Bấm vào một lệnh** → bảng góc trên phải (đổi góc bằng `InpNoteCorner`):
  - dòng vàng: tóm tắt lệnh;
  - lý do vào;
  - `UNG HO` (xanh): yếu tố ủng hộ;
  - `KHONG UNG HO` (đỏ): yếu tố ngược;
  - `BOI CANH`: phase H4, phiên, râu kéo, Main M15, có gần tin đỏ không;
  - `QUAN LY`: SL, các đích, kết quả, giá đi xa nhất.
- Bấm lại vào lệnh hoặc vào bảng để đóng.

### 5.6. ZO_Review + ZO_ExportMarks (tự đánh dấu)

1. Gắn **ZO_Review** lên chart M15. Nó vẽ LP H4 (xanh lam), D1 (vàng), W1 (đỏ) dạng đường, LP M15 dạng hộp ngắn. Không hiện lệnh của hệ.
2. Để không nhìn trước tương lai: tắt Auto scroll, kéo chart về quá khứ, bấm **F12** để đi từng nến.
3. Đánh dấu bằng **Insert → Arrows**:
   - **Arrow Up** = mua, **Arrow Down** = bán, đặt đúng nến mà khi nó đóng bạn sẽ vào;
   - **Stop Sign** = chỗ trông hấp dẫn nhưng bạn không vào.
4. Nháy đúp mũi tên → Common → Description để ghi lý do (gõ **không dấu**).
5. Chạy script **ZO_ExportMarks** → file `MQL4/Files/zo_marks_EURUSD.csv`.
6. Đặt `InpCompare = ZEA` trong ZO_Review để hiện lệnh của hệ (vòng tròn nhỏ) cạnh điểm của bạn.

### 5.7. ZO_Wick

- Gắn lên chart M15 có ZOS.
- **Chấm** ở đầu râu mọi nến ZOS có râu ≥ `InpMinWickPips` (mặc định 10 pip): vàng nếu râu chọc vào High / Low LP hoặc số tròn, trắng nếu không.
- **Mũi tên** ở nến đầu tiên hết râu sau đó. `InpDelay = 1` để mũi tên nằm ở nến kế tiếp.
- **Vòng tím:** chỗ luật U1w của hệ bật.
- Di chuột vào để xem số đo râu / thân.

### 5.8. ZOS_Probe (xuất dữ liệu)

- Chạy trên chart của từng khung cần xuất (M15, H4, D1, W1), chart phải có ZOS.
- `InpBars`: số nến. M15 nên để lớn để lấy đủ lịch sử; nến ZOS chưa tính được sẽ ghi 0.
- File ra: `MQL4/Files/zos_probe_EURUSD_<phút>_chart.csv`.

---

## 6. Đọc tin nhắn của EA

| Tin | Khi nào | Việc cần làm |
|---|---|---|
| `ZOS MARKET ANALYSIS` | Khi gắn EA; khi có Main mới, LP H4 trở lên chết, xu thế đổi | Đọc thiên hướng và kịch bản, ghi vùng cần chờ |
| `🔔 ZOS — POTENTIAL EP` | Nến M15 vừa đóng tạo cặp nến ZO A/B ở vị trí đáng chú ý | Mở chart quan sát, **chưa vào** |
| `✅ ZOS — ENTRY` | Potential EP đủ 2 nến ZO xác nhận và đạt hết luật | Vào lệnh theo plan trong tin nếu giá chưa chạy quá 3 pip |
| `❌ POTENTIAL EP HUỶ` | Nến sau có lực kéo ngược hoặc thân ngược | Bỏ, chờ EP khác |
| `⛔ KHÔNG VÀO` | Đủ 2 nến nhưng vướng luật (phiên, tin, SL quá xa…) | Không vào |
| `🎯 TÍN HIỆU ZOU` | Tín hiệu ZM hoặc U1w | Vào lệnh theo plan trong tin |
| `🛡 … dời SL về BE` | Lệnh đang mở đã đi 1R | Dời SL về giá vào, chốt phần TP1 |
| `🤖 …` | EA vừa tự đặt, bỏ, dời BE hoặc đóng một lệnh (chỉ khi EA đang tự đặt lệnh) | Kiểm tra lại trên tab Trade |
| `✋ … nến ZO hết màu mạnh` | Lệnh đã qua 1R, nến ZO M15 hết mạnh hoặc có râu ngược | Chốt phần đang giữ |
| `⏸ … tạm dừng` | Thua 2 tín hiệu ZOU liên tiếp cùng hướng | Không vào hướng đó trong 48h |
| `📰 … phút nữa có tin` | 30 phút trước tin đỏ USD / EUR | Không vào lệnh mới; cân nhắc dời BE |
| `⚠` / `🔔` ngắn | Sự kiện LP (LP mới, break, chết, giá chạm LP H4+) | Biết để theo dõi |

**Các con số trong tin:**
- **Phase %**, **BUY / SELL %**, **Quality /100** là điểm ước lượng để đọc nhanh tình huống. Chúng **không phải xác suất thắng**.
- Điều kiện vào lệnh thật là bộ luật đã backtest. Khi tin ghi `✅ ENTRY` nghĩa là mọi luật đã đạt.

---

## 7. Luật vào lệnh của hệ ZEA (để tự kiểm tra)

ZEA = ba kiểu vào chạy song song. Tất cả vào **market khi nến M15 đóng**.

| Kiểu | Điều kiện chính |
|---|---|
| **ZM** | Main H4 cùng hướng đã ≥ 48h. Giá chạm nửa sâu LP H4 cùng chiều; LP đó phải là Main hoặc Shield. Nến ZO A có râu ngược ≥ thân và ≥ 1/3 biên độ; nến B hết râu đó |
| **U1w** | Main H4 cùng hướng. Không vào khi 3 nến H4 gần nhất cùng màu mạnh. Giá bị kéo ngược ≥ 15 pip trong 4h vào LP H4 hoặc LP M15 cùng chiều. Một trong 3 nến ZO trước có râu ngược ≥ 5 pip; nến vừa đóng hết râu, thân theo hướng lệnh |
| **EPA** | Cặp nến ZO A/B, rồi 2 nến ZO tiếp theo không râu ngược và thân theo hướng lệnh. Đầu râu kéo nằm ở Main / Shield H4 cùng chiều. Bỏ khi H4 màu yếu phía mình. Bỏ phiên New York |

**Chung:**
- SL: sau đỉnh / đáy gần nhất + 3 pip, trong khoảng 10–15 pip. Xa hơn 15 pip thì không vào.
- TP: chia 3 phần ở 1R, giữa và đầu xa của LP H4 ngược gần nhất. Lot dưới 0.03 thì đặt 1 TP (tin nhắn ghi sẵn).
- Dời BE khi giá đi được 1R.
- Phần đã tới đích được giữ tới khi có nến ZO M15 **màu ngược** (BUY: nến đỏ hoặc hồng) rồi chốt ở giá đóng nến đó. Khi bắt đầu giữ, SL kéo lên +0.5R (hệ ZEAR2). Hệ ZEA2: đích 1R chốt hẳn, phần 2 và 3 mới giữ.
- Không vào lệnh khi nến ZOS H4 vừa đóng có màu mạnh ngược hướng lệnh.
- ZM và U1w: không vào khi giá nằm trong vùng Main W1 / D1 ngược chiều; dừng 48h sau 2 lệnh thua liên tiếp cùng hướng.

**Kết quả backtest** (19/12/2025 → 30/9/2026, vốn 1000$, rủi ro 5%/lệnh):

| Hệ | Lệnh | Thắng / Hoà / Thua | Tỉ lệ thắng (không tính hoà) | Tổng R | Sụt vốn / chuỗi thua | Kiểm tra cuối (8–9/2026) |
|---|---|---|---|---|---|---|
| ZEA (`InpTpProfile = 0`, `InpH4Veto = false`, `InpHoldMode = 0`) | 131 | 82 / 3 / 46 | 64% | +106.9R | 25% / 5 | +25.9R, thắng 64% |
| ZEA3 (EPA chờ 3 nến, `InpEpConfirm = 3`) | 112 | 72 / 2 / 38 | 65% | +116.6R | 17% / 3 | +37.4R, thắng 70% |
| ZEAR (`InpTpProfile = 1`, `InpH4Veto = false`, `InpHoldMode = 0`) | 132 | 44 / 39 / 49 | 47% | +138.4R | 26% / 5 | +38.4R, thắng 48% |
| **ZEAR2 — mặc định của EA** (`InpTpProfile = 1`) | 112 | 41 / 33 / 38 | 52% | +161.5R | 26% / 5 | +50.8R, thắng 55% |
| ZEA2 (`InpTpProfile = 0`) | 111 | 74 / 1 / 36 | 67% | +118.1R | 25% / 5 | +32.7R, thắng 70% |

R = lãi hoặc lỗ chia cho số tiền rủi ro mỗi lệnh. Với rủi ro 2%/lệnh, sụt vốn tối đa khoảng 8–12%.

**Vốn 30$** (ZEAR2, backtest 41 tuần): ở mức 5% lot gần như luôn là 0.01 cho tới khi vốn lên khoảng 60$, và mỗi lệnh chỉ có một đích. Lịch rủi ro đề xuất: 5% khi vốn dưới 200$, 3% từ 200$, 2% từ 500$ — đổi `InpRiskPct` bằng tay khi vốn qua các mốc đó. Nếu số dư xuống dưới 22$ thì dừng lại xem xét (backtest chưa từng xuống dưới 26.9$).

**Số tròn (RN):** theo định nghĩa ZO là các mức cách nhau 25 pip (…00, …25, …50, …75). Tool chỉ hiện RN để tham khảo; nó **không** còn là điều kiện vào lệnh vì backtest cho thấy mốc số tròn chỉ thêm lệnh lỗ.

---

## 8. Chạy lại backtest (máy Linux có Python)

```sh
cd backtest
D=~/.mt4/drive_c/users/$USER/AppData/Roaming/MetaQuotes/Terminal/50CA3DFB510CC5A8F28B48D1BF2A5702/MQL4/Files

# Báo cáo + ghi lại file cho ZO_BTView
python3 bt_lab.py --data $D --out ket-qua/bao-cao.md --trades-csv ket-qua/lenh.csv

# So các điểm bạn đánh dấu với hệ
python3 bt_marks.py --data $D --system ZEA
```

Cần các file `zos_probe_EURUSD_15_chart.csv`, `…_240_chart.csv`, `…_1440_chart.csv`, `…_10080_chart.csv` do ZOS_Probe xuất.

---

## 9. Sự cố thường gặp

| Hiện tượng | Nguyên nhân và cách xử lý |
|---|---|
| EA báo "thiếu dữ liệu H4 / M15" hoặc "không có dữ liệu" | Khung đó chưa có chart chạy ZOS + ZO_LP. Tạo template `ZO_DATA` (mục 3) rồi gắn lại EA, hoặc tự mở chart và gắn ZO_LP |
| Không nhận tin Telegram | Chưa thêm `https://api.telegram.org` vào Allow WebRequest; nút AutoTrading đang tắt; xem tab Experts |
| Không có cảnh báo tin, dòng "chưa tải được lịch tin" | Chưa thêm `https://nfs.faireconomy.media` vào Allow WebRequest |
| Chữ trên chart hiện "?" | MT4 chạy qua Wine không hiện được dấu tiếng Việt. Các tool đã viết không dấu; nếu còn chỗ nào bị, báo lại |
| ZO_BTView không vẽ gì | Thiếu file `zo_bt_overlay_EURUSD.csv` trong `MQL4\Files`, hoặc `InpShow` gõ sai tên hệ |
| Bấm vào lệnh không hiện bảng | Bấm đúng vào mũi tên B / S hoặc dấu kết quả; file overlay cũ chưa có chú thích thì chạy lại `bt_lab.py` |
| Không thấy vùng LP nào | ZOS chưa chạy trên chart, hoặc chưa đủ lịch sử: kéo chart về quá khứ vài lần rồi đổi khung qua lại |
| Nhận rất nhiều tin lúc vừa gắn EA | Bình thường trong vài phút đầu; tin cũ hơn 15 phút bị bỏ |
| Chart chậm | Giảm `InpLookback` của ZO_LP; ZO_Review và ZO_Wick vẽ nhiều hình, chỉ gắn khi cần |

---

## 10. Giới hạn cần nhớ

- Backtest chỉ có 41 tuần, một cặp tiền, spread cố định 1 pip, chưa tính giãn spread lúc ra tin.
- Trong backtest, các tháng chỉ có lệnh BUY của phần ZOU yếu hơn các tháng SELL; có thể do giai đoạn EURUSD giảm.
- Phần "Main thật hay giả", nội chiến, săn SL vẫn cần mắt người. Tool chỉ áp luật máy móc.
- EA mới được kiểm tra bằng compile, chưa có thời gian chạy thật dài. Báo lại mọi tin nhắn sai hoặc thiếu.
