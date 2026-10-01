# Hướng dẫn sử dụng bộ tool ZO (ZO_LP · ZO_View · ZO_DrawLP · ZO_Analyst)

> Bộ tool **không tự trade**. Nó vẽ vùng thanh khoản (LP) từ ZOS, theo dõi trạng thái vùng, báo cho bạn
> đúng lúc cần nhìn chart, và nhắc khi bạn làm trái luật ZO. Quyết định vào lệnh vẫn là của bạn.
>
> Luôn chạy trên **tài khoản demo** ít nhất 2–4 tuần trước khi dùng tiền thật.

---

## 1. Bộ tool gồm những gì

| File | Loại | Làm gì |
|---|---|---|
| `ZO_LP` | Indicator | Tìm nến Build → vẽ LP → theo dõi GLP/RLP/Retest → cảnh báo → gợi ý SL/BE → kiểm tra lệnh |
| `ZO_Notifier` | Expert Advisor (EA) | Gửi cảnh báo của ZO_LP về Telegram / Discord |
| `ZOS_Probe` | Script | Chỉ dùng để dò dữ liệu ZOS (không cần dùng hằng ngày) |
| `ZO_View` | Indicator | **Mới (29/9)**: hộp LP khung đang mở (G xanh, R đỏ), đánh dấu nến đáng chú ý + Main, bảng phân tích không nhấp nháy — xem mục 11 |
| `ZO_DrawLP` | Script | **Mới**: vẽ 1 lần các LP quan trọng W/D/H4 bằng cặp đường có nhãn, đánh dấu Main — mục 11 |
| `ZO_Analyst` | Expert Advisor | **Mới**: viết phân tích chart khi gắn + khi cấu trúc đổi, gửi Telegram; **thay luôn ZO_Notifier** — mục 11 |

**Yêu cầu:** MT4 đã cài **ZOS** và ZOS đang chạy được trên tài khoản (demo hoặc thật).

---

## 2. Cài đặt

### 2.1. Trên máy Linux này (MT4 chạy bằng Wine)
Mình đã copy và compile sẵn. Bạn chỉ cần mở MT4 → cửa sổ **Navigator** → chuột phải **Indicators** → **Refresh**.

### 2.2. Trên máy Windows
1. Copy 2 file đã compile từ máy này:
   - `~/.mt4/drive_c/users/tuannd/AppData/Roaming/MetaQuotes/Terminal/50CA3DFB510CC5A8F28B48D1BF2A5702/MQL4/Indicators/ZO_LP.ex4`
   - `.../MQL4/Experts/ZO_Notifier.ex4`
2. Trên Windows mở MT4 → **File → Open Data Folder** → dán `ZO_LP.ex4` vào `MQL4\Indicators`,
   `ZO_Notifier.ex4` vào `MQL4\Experts`.
3. Trong MT4: Navigator → chuột phải → **Refresh**.

---

## 3. Gắn ZO_LP lên chart (5 chart)

> **Vì sao phải 5 chart?** ZOS chỉ tính đúng một khung khi được gắn trên chart của chính khung đó. Nếu đọc
> "từ xa" (vd đứng ở chart M15 đọc ZOS khung D1) thì số liệu **khác** chart D1 thật: đã gặp trường hợp chart D1
> thấy GLP D1 26/6 đang retest nhưng từ M15 lại thành "dưới trống". Vì vậy mỗi khung được tính trên chart của nó
> rồi chia sẻ qua file cho các chart khác.

1. Mở **5 chart EURUSD**: **W1, D1, H4, H1, M15** (trên demo XM tên là `EURUSD`, tài khoản thật có thể là `EURUSD#`).
2. Mỗi chart: chuột phải → **Template → ZOTheme** (để có ZOS), rồi kéo **ZO_LP** vào → OK (giữ mặc định).
3. Chart **M15** là **trạm chính**: vẽ đủ các khung (khung cao dạng đường), viết bản tin, gửi Telegram.
   Các chart W1/D1/H4/H1 chỉ tính + vẽ khung của mình, **không gửi tin** (không bị trùng).
4. Gắn **ZO_Notifier** vào 1 chart bất kỳ.
5. Lưu bộ 5 chart lại: **File → Profiles → Save As…** (vd `ZO`) để lần sau mở lại 1 cú.

Thiếu chart của khung nào thì trạm chính vẫn tự tính khung đó "từ xa" nhưng tin nhắn ghi
**[ƯỚC TÍNH - có thể sai: mở chart … có ZOS + ZO_LP]** và **không gửi cảnh báo sự kiện** cho khung đó.

## 4. Đọc chart

### 4.1. Hai cách vẽ
| Khung của LP | Cách vẽ | Ví dụ trên chart M15 |
|---|---|---|
| **Cùng khung với chart** | **Hình chữ nhật** | LP của M15 |
| **Khung cao hơn** | **Hai đường ngang** có nhãn | LP của H1, H4, D1, W1 |

### 4.2. Đọc nhãn
`H-GLP-H4 25/9 RETEST` và `L-GLP-H4 25/9`

| Phần | Nghĩa |
|---|---|
| `H-` / `L-` | Đường **High** / **Low** của vùng |
| `GLP` | Loại vùng (bảng dưới) |
| `H4` | Khung thời gian của vùng |
| `25/9` | Ngày của nến Build đầu tiên (giống cách nhóm gọi "Low H4 25/9") |
| `RETEST` | Trạng thái (chỉ ghi trên đường High) |

**Loại vùng:**

| Nhãn | Nghĩa |
|---|---|
| `LP` | Vùng thanh khoản **chưa break** — chưa biết là G hay R |
| `GLP` | Đã break **lên** → vùng hỗ trợ, thiên hướng **mua** |
| `RLP` | Đã break **xuống** → vùng kháng cự, thiên hướng **bán** |
| `MGLP` / `MRLP` | **Main** — vùng đã clear được vùng ngược chiều, là vị trí phòng thủ chính (chỉ gắn cho H1 trở xuống) |
| `(shield)` | Vùng cùng chiều sinh ra sau Main — lớp giáp phụ, kém quan trọng hơn Main |

**Trạng thái:**

| Trạng thái | Nghĩa | Bạn nên |
|---|---|---|
| `NEW` | Vùng mới, chưa break | Chờ breakout, **không vào lệnh trong vùng này** |
| `WAIT RETEST` | Đã thành GLP/RLP, giá chưa quay lại | Chờ, **không đuổi giá** |
| `RETEST` | Giá đang ở trong vùng sau khi break | **Hạ khung tìm tín hiệu kích** |
| `RETEST #3` | Đây là lần retest thứ 3 | Vùng đã bị test nhiều → yếu dần, cẩn thận hơn |
| `RUN` | Đã retest xong, giá chạy đi rồi | Lỡ tàu — tìm cơ hội khác |

Vùng **FAILED** (đóng xuyên qua mép đối diện) và **CLEARED** (thân nến cắt qua cả 2 mép) bị ẩn — coi như đã chết.

### 4.3. Màu và kiểu đường
| | Ý nghĩa |
|---|---|
| **Xanh lá** | GLP |
| **Đỏ** | RLP |
| **Vàng** | LP chưa break |
| Đường **liền** / hộp **tô đặc** | WAIT RETEST hoặc RETEST — vùng đang "sống", cần canh |
| Đường **gạch** / hộp **xám** | RUN — đã chạy |
| Đường **chấm** / hộp **viền vàng** | NEW — chưa break |
| Đường **dày** | Main hoặc vùng D1/W1 |

### 4.4. Vì sao không thấy hết các vùng?
Để chart gọn, mỗi khung tool chỉ giữ:
1. Trong các vùng **chồng lên nhau cùng chiều**, giữ **vùng quan trọng nhất**
   (ưu tiên: Main → vùng tựa lưng vào LP khung lớn → cụm nhiều nến Build → đang retest → ít lần retest → mới hơn).
2. Sau đó chỉ hiện **2 vùng gần giá nhất** (+ Main hiện tại luôn hiện).

Muốn thấy nhiều hơn: tăng `InpMaxZonesPerTf`.

### 4.5. Bảng thông tin (góc trái trên)
```
H4  ZOS: GREEN   LP trend: UP since 24/9
   GLP   24/9   RETEST             1.13581-1.13904  PRICE INSIDE
   RLP   21/9   WAIT RETEST        1.14328-1.14858  47.4 pips
```
| Mục | Nghĩa |
|---|---|
| `ZOS: GREEN` | Màu nến ZOS vừa đóng của khung đó (GREEN / BLUE / RED / PINK / YELLOW) |
| `LP trend: UP since 24/9` | Xu thế theo **cấu trúc LP**: vùng chết gần nhất là RLP → phe mua thắng → **UP** (và ngược lại) |
| Các dòng vùng | Loại, ngày, trạng thái, giá Low–High, khoảng cách tới giá hiện tại |

---

## 5. Bản tin sáng và các cảnh báo

### 5.A. Hai bộ khung giao dịch
| Bộ khung | Khung cao (bối cảnh) | Khung vào lệnh | Dùng khi |
|---|---|---|---|
| **KHUNG DÀI** | W1 + D1 | H4 | Swing, giữ lệnh vài ngày |
| **KHUNG NGẮN** | H4 + H1 | M15 | Intraday / scalp |

H4 thuộc cả hai: là khung vào lệnh của khung dài và khung cao của khung ngắn. Mọi tin nhắn đều ghi rõ thuộc khung nào.
SETUP khung dài = LP H4 break trong LP D1/W1 đang retest; SETUP khung ngắn = LP M15 break trong LP H4/H1 đang retest.

### 5.B. Nhịp gửi tin (chống spam)
| Loại tin | Khi nào gửi | Lý do chọn |
|---|---|---|
| **Bản tin sáng** (cả 2 khung) | 7h15, thứ 2–6 | Trước phiên Á/Âu, đủ thời gian lên kịch bản |
| **Tóm tắt khung dài** | 14h15 (mở phiên London), 20h15 (mở phiên New York) — **chỉ khi** LP khung dài thay đổi hoặc giá cách LP W1/D1 ≤ 20 pip | Khung dài đổi chậm; gửi theo giờ cố định 8h/lần sẽ lặp nội dung. Bám giờ mở phiên là lúc giá hay phản ứng với vùng lớn |
| **Tóm tắt khung ngắn** | Mỗi lần đóng nến H1 **khi đang có tình huống** (giá trong / cách LP H4-H1 ≤ 10 pip); lúc thị trường yên: **4 tiếng/lần** | Có tình huống thì cần cập nhật từng giờ; không có thì 1h/lần chỉ là spam |
| **Tin sự kiện** (LP mới, mở rộng, break, bắt đầu retest, RETEST, RUN, bị tấn công, clear, Main, giá tới gần) | Ngay khi xảy ra, **gom nhiều sự kiện vào 1 tin**, 2 tin cách nhau **≥ 10 phút**; cùng một vùng không nhắc lại trong **1h (H1)** / **6h (H4-D1-W1)** | Tránh 1 cây nến sinh ra nhiều tin, tránh vùng "nhấp nháy" RETEST ↔ RUN |
| **Tin khẩn**: SETUP, LỰC RETEST YẾU DẦN, KIỂM TRA LỆNH, dời BE | **Luôn gửi ngay** | Đây là thời điểm hành động — không được trễ |
| **Giờ yên lặng 0h–7h** | Chỉ gửi tin khẩn (lực retest yếu của khung ngắn cũng bỏ). Các sự kiện ban đêm được tóm lại trong mục "24H QUA" của bản tin sáng | Bạn ngủ; khung ngắn ban đêm ít thanh khoản |

Các con số đều chỉnh được trong Inputs (mục 8).

### 5.0. Bản tin "PHÂN TÍCH ĐẦU NGÀY" (7h15 giờ Hà Nội, thứ 2 – thứ 6)
Tự gửi về Telegram mỗi sáng (một lần/ngày, kể cả khi gắn ZO_LP trên nhiều chart). Nếu MT4 bật muộn, vẫn gửi
bù trong vòng 4 tiếng. Cấu trúc bắt chước cách Zerd phân tích:

```
PHÂN TÍCH ĐẦU NGÀY EURUSD - Thứ 3 29/09
[W1] ZOS XANH LÁ (áp lực tăng mạnh), nến thứ 3.
  Xu thế LP: TĂNG từ 12/9. Main mua: ...
  Giá đang ở trong W1 GLP 12/9 (...) [RETEST] (35% vùng).
  Kẹp giữa: ... dưới 40 pip | ... trên 120 pip → không gian 160 pip
[D1] ... [H4] ... [H1] ... [M15] ...          (đi từ khung lớn xuống khung nhỏ)

KEY
- Key tuần H4 RLP 9/9 (...): Clear = xoá đà giảm, mở đường lên ... Giữ được = nối đà giảm về ...
- Key H1 ... / Key ngày M15 ...

24H QUA
- H1 RLP 28/9 bị clear ngay sau khi tạo (dấu hiệu SHs)
- H4 GLP 28/9 mới xác nhận (break lên)

KẾT LUẬN
D1 và H4 cùng TĂNG → ưu tiên BUY, chỉ vào ở Low các GLP khi có retest + kích. Không SELL ngược.
Vùng canh gần nhất: ...
```

Muốn xem thử ngay: trong Inputs của ZO_LP đặt `InpReportOnStart = true` → OK → vài giây sau bản tin về Telegram
(nhớ đổi lại `false` sau khi thử).

### 5.1. Cảnh báo

| Cảnh báo | Khi nào | Việc cần làm |
|---|---|---|
| **... vừa xuất hiện LP mới** | Nến Build (H1 trở lên) vừa tạo LP | Ghi nhận, chờ nến ZOS đóng ra ngoài để biết G hay R |
| **... MỞ RỘNG** | LP chưa break bị nến Build mới mở rộng | MM vẫn đang xây vị trí — chưa làm gì |
| **... vừa break LÊN/XUỐNG → thành GLP/RLP** | LP (H1+) vừa có hướng | Chờ retest, **không đuổi giá** |
| **Giá còn X pip tới ... (H4/D1/W1)** | Giá tiến sát LP khung lớn | Mở chart, chú ý phản ứng |
| **Giá bắt đầu vào ... (retest)** | Giá chạm một GLP/RLP đang chờ retest | Mở chart, chuẩn bị theo dõi khung nhỏ |
| **... đang RETEST** | Nến đóng cửa trong vùng | Hạ khung (vd H4 → M15), tìm tín hiệu kích |
| **LỰC RETEST YẾU DẦN** | Trong lúc retest, M15 thu nến / có nến 2 đầu / đổi màu về phía vùng (≥ 2 dấu hiệu) | **Thời điểm canh vào lệnh**: chờ M15 tạo G trong vùng hoặc limit ở nửa dưới (mua) |
| **... ĐANG BỊ TẤN CÔNG** | Nến đóng vượt 50% của LP ngược chiều | Có thể sắp clear → sắp có Main mới, xu thế có thể đảo |
| **... bị CLEAR / phá thủng** | LP chết | Phe thắng, xu thế LP mới, mục tiêu tiếp theo |
| **DẤU HIỆU SHs** | LP vừa tạo đã bị xoá trong ≤ 3 nến | Bẫy quét SL — đừng vào theo breakout |
| **SETUP BUY / SELL** | Khung nhỏ vừa tạo GLP **nằm trong** GLP khung lớn đang retest (hoặc RLP trong RLP) | Đọc plan kèm theo, **tự kiểm tra lại bằng mắt**, nếu đồng ý thì đặt lệnh limit |
| **... trở thành MAIN** | Một LP vừa clear được LP ngược chiều | Ghi nhận vị trí phòng thủ chính của phe đó |
| **Lệnh #... : Dời SL/BE về ...** | Đang có lệnh, vừa có LP M15 mới cùng chiều | Dời SL về mức gợi ý (cách mép LP 1,5 pip) |
| **Lệnh #... đúng luật ZO** | Lệnh vừa vào không phạm lỗi nào | Nhớ dời BE khi có LP mới |
| **KIỂM TRA LỆNH #...** | Lệnh vừa vào phạm luật | Đọc từng lỗi, cân nhắc đóng lệnh. Ghi vào nhật ký |

### 5.2. Đọc cảnh báo SETUP
```
EURUSD | SETUP BUY: M15 GLP 28/9 (1.13678-1.13746) nằm trong H4 GLP 24/9 (1.13581-1.13904) đang retest.
Xu thế LP: H4 TĂNG.
Gợi ý: EP limit 1.13712 (50% LP), SL 1.13658 (5.4 pip), TP 1.13813 tại M15 RLP 28/9 (...), RR 1:1.9
CẢNH BÁO: RR < 1:2.0, LP ngược chiều quá gần (không trống) - cân nhắc bỏ kèo.
```
- **EP**: giữa vùng LP khung nhỏ (luật: vào ít nhất ở 50% vùng, càng gần mép càng tốt).
- **SL**: ngoài mép LP 2 pip — nếu bị chạm nghĩa là thị trường đã đổi chiều (tư duy SL của ZO).
- **TP**: mép gần nhất của LP ngược chiều phía trước (giá hay "tìm về LP gần nhất").
- **Cảnh báo RR / ngược xu thế**: dấu hiệu kèo xấu → nên bỏ.

### 5.3. Các lỗi trong "KIỂM TRA LỆNH" (theo danh sách lỗi của Zerd)
| Lỗi | Ý nghĩa |
|---|---|
| Vào lệnh bên trong LP chưa break | Chưa biết vùng là G hay R mà đã vào |
| BUY ở nửa trên GLP / SELL ở nửa dưới RLP | Vào sai mép, SL xa, RR kém |
| Không nằm trong GLP/RLP cùng chiều nào | Rất có thể đang **đuổi giá (FOMO)** |
| Vào ngược chiều một LP | Mua trong RLP / bán trong GLP |
| Ngược xu thế LP H4 | Đi ngược khung đang dẫn dắt |
| SL chưa đặt / SL nằm trong LP | SL dễ bị quét — phải đặt ngoài mép vùng |

> Lệnh đang mở **trước khi** gắn ZO_LP sẽ không bị kiểm tra.

---

## 6. Nhận cảnh báo trên điện thoại

Có 2 cách, dùng được cùng lúc:

| Cách | Cài đặt |
|---|---|
| **Telegram** (khuyên dùng) | Tạo bot theo [hướng dẫn Telegram/Discord](02-huong-dan-telegram-discord.md), thêm `https://api.telegram.org` vào Allow WebRequest, rồi gắn **ZO_Analyst** (hoặc ZO_Notifier) vào 1 chart và điền `InpTelegramToken` + `InpTelegramChatId` trong tab Inputs → OK. Bản tải từ website để trống 2 ô này. |
| **App MT4 trên điện thoại** | MT4 máy tính: **Tools → Options → Notifications** → nhập **MetaQuotes ID** (app MT4 điện thoại: Cài đặt → Tin nhắn/Chat) → tick Enable. Trong ZO_LP đặt `InpAlertPush = true` |

> Mẹo chống FOMO: đăng nhập app MT4 trên điện thoại bằng **mật khẩu Investor (chỉ xem)** — vẫn xem chart,
> nhận cảnh báo, nhưng **không đặt lệnh được**. Chỉ vào lệnh trên máy tính có ZO_LP.

Cảnh báo chỉ gửi khi **MT4 đang mở và có mạng**. Tắt máy = không có cảnh báo.

---

## 7. Quy trình mỗi ngày với tool

```
Sáng / đầu phiên (15 phút)
  1. Đọc bản tin "PHÂN TÍCH ĐẦU NGÀY" trên Telegram (7h15). Mở chart EURUSD M15 để đối chiếu.
  2. Xác định phe đang thắng ở khung lớn → hôm nay ưu tiên BUY hay SELL (hoặc đứng ngoài).
  3. Ghi các vùng khung lớn đang WAIT RETEST / RETEST → đó là nơi sẽ chờ.
  4. Viết 1–2 kịch bản vào nhật ký. Không có kịch bản rõ → hôm nay không trade.

Trong ngày
  5. Tắt chart, đi làm việc khác. Chờ cảnh báo.
  6. Nhận "Giá bắt đầu vào ..." / "RETEST" → mở chart, quan sát khung nhỏ.
  7. Nhận "SETUP" → đối chiếu kịch bản buổi sáng. Khớp + RR ≥ 1:2 + không ngược xu thế → đặt lệnh limit theo plan.
     Không khớp → bỏ qua, KHÔNG vào vì tiếc.
  8. Nhận "KIỂM TRA LỆNH" có lỗi → dừng lại, xem mình có đang FOMO không.
  9. Nhận "Dời SL/BE" → dời theo gợi ý.

Cuối ngày / cuối tuần
 10. Ghi nhật ký: lệnh nào theo cảnh báo SETUP, lệnh nào tự vào, kết quả, cảnh báo lỗi nào đã nhận.
 11. Gửi nhật ký cho Claude để review.
```

---

## 8. Giải thích thông số (Inputs)

### ZO_LP
| Thông số | Mặc định | Ý nghĩa |
|---|---|---|
| `InpZosName` | `ZOS` | Tên file indicator ZOS |
| `InpTimeframes` | `10080,1440,240,60,15` | Các khung tìm LP (phút): W1, D1, H4, H1, M15 |
| `InpLookback` | 500 | Số nến quét mỗi khung |
| `InpMinWickPoints` | 1 | Râu tối thiểu mỗi đầu để nến Build đơn lẻ được tính là LP |
| `InpMaxZonePips` | 0 (tắt) | Bỏ LP rộng hơn X pip (vd `40` để bỏ vùng Build do tin tức) |
| `InpBreakOnZosClose` | true | Tính breakout theo **giá đóng nến ZOS** (như wiki). `false` = theo giá thật |
| `InpMainMaxTf` | 60 | Chỉ gắn nhãn Main cho khung ≤ H1 (Zerd: "MLP nên áp dụng M1–H1") |
| `InpMaxZonesPerTf` | 2 | Số vùng hiện mỗi khung |
| `InpShowFresh` / `InpShowRun` | true | Hiện vùng chưa break / đã chạy |
| `InpAlertPopup` | true | Hiện popup trong MT4 |
| `InpAlertPush` | false | Gửi thông báo qua app MT4 điện thoại |
| `InpAlertQueue` | true | Chuyển cảnh báo cho ZO_Notifier (Telegram/Discord) |
| `InpAlertNewLp` | true | Báo LP mới xuất hiện / mở rộng |
| `InpAlertBreak` | true | Báo khi LP break thành GLP/RLP |
| `InpAlertDeath` | true | Báo khi LP bị clear / phá thủng (kèm dấu hiệu SHs) |
| `InpAlertWeakRetest` | true | Báo "lực retest yếu dần" |
| `InpAlertAttack` | true | Báo LP ngược chiều đang bị tấn công |
| `InpShsMaxBars` | 3 | LP chết trong ≤ N nến sau khi break = dấu hiệu SHs |
| `InpNearPips` | 5 | Báo khi giá cách LP khung lớn ≤ X pip |
| `InpNearMinTf` | 240 | Khung dùng cho cảnh báo "giá tới gần" (H4 trở lên) |
| `InpMorningReport` | true | Bật bản tin sáng |
| `InpReportHour` / `InpReportMinute` | 7 / 15 | Giờ gửi (giờ Hà Nội) |
| `InpReportTzOffset` | 7 | Múi giờ Hà Nội (GMT+7) |
| `InpReportLateHours` | 4 | MT4 bật muộn bao nhiêu tiếng vẫn gửi bù |
| `InpReportOnStart` | false | Gửi bản tin ngay khi gắn (để thử) |
| `InpLongCtxTfs` / `InpLongEntryTf` | `10080,1440` / 240 | Khung dài: khung cao W1+D1, vào lệnh H4 |
| `InpShortCtxTfs` / `InpShortEntryTf` | `240,60` / 15 | Khung ngắn: khung cao H4+H1, vào lệnh M15 |
| `InpMinGapMin` | 10 | Khoảng cách tối thiểu giữa 2 tin sự kiện (phút) |
| `InpCooldownShortMin` / `InpCooldownLongMin` | 60 / 360 | Không nhắc lại cùng vùng trong N phút (H1 / H4-D1-W1) |
| `InpQuietFrom` / `InpQuietTo` | 0 / 7 | Giờ yên lặng (Hà Nội) |
| `InpDigests` | true | Bật tóm tắt định kỳ |
| `InpLongDigestHours` | `14,20` | Giờ tóm tắt khung dài (phút 15) |
| `InpLongActivePips` / `InpShortActivePips` | 20 / 10 | Ngưỡng "đang có tình huống" của mỗi khung |
| `InpShortIdleHours` | 4 | Tóm tắt khung ngắn khi thị trường yên: N giờ/lần |
| `InpSlBufferPips` | 2 | SL gợi ý cách mép LP bao nhiêu pip |
| `InpMinRR` | 2 | SETUP có RR thấp hơn sẽ bị cảnh báo |
| `InpTrendTf` | 240 | Khung dùng để kiểm tra "ngược xu thế" (H4) |
| `InpBeHints` | true | Bật gợi ý dời SL/BE |
| `InpBeTf` | 15 | Khung LP dùng để gợi ý dời BE (M15) |
| `InpBeBufferPips` | 1,5 | BE cách mép LP mới bao nhiêu pip |
| `InpEntryAudit` | true | Bật kiểm tra lệnh mới |
| `InpUseSharedCharts` | true | Đọc các khung khác từ ZO_LP trên chart của chính khung đó |
| `InpMasterMode` | 0 | Chart nào gửi tin: 0 = chart M15 (tự động), 1 = chart này, 2 = không bao giờ |
| `InpDebugDump` | true | Ghi toàn bộ vùng ra `MQL4\Files\zo_lp_zones_<cặp>.csv` để kiểm tra |
| `InpClr...` | | Màu vùng / đường |

### ZO_Notifier
| Thông số | Ý nghĩa |
|---|---|
| `InpTelegramToken` | Token bot Telegram (để trống = không dùng) |
| `InpTelegramChatId` | Chat id của bạn |
| `InpDiscordWebhook` | URL webhook Discord (để trống = không dùng) |
| `InpPollSeconds` | Bao nhiêu giây kiểm tra cảnh báo mới một lần (mặc định 3) |
| `InpSendTestOnStart` | Gửi tin thử khi vừa gắn EA |
| `InpMaxAgeMinutes` | Bỏ cảnh báo tồn đọng cũ hơn N phút (mặc định 15) |

---

## 9. Xử lý sự cố

| Hiện tượng | Nguyên nhân / cách xử lý |
|---|---|
| Chart D1 thấy vùng nhưng tin nhắn nói "trống" / có chữ ƯỚC TÍNH | Chưa mở chart khung đó có ZOS + ZO_LP (mục 3). Mở đủ 5 chart |
| Không thấy vùng nào | ZOS chưa chạy trên chart / tài khoản; hoặc chưa đủ lịch sử → kéo chart về quá khứ vài lần để MT4 tải thêm dữ liệu, rồi đổi khung qua lại |
| Vùng H4/D1 ít, chỉ thấy vùng gần đây | ZOS chỉ tính khoảng 500 nến gần nhất — bình thường |
| Popup hiện ô vuông thay chữ tiếng Việt | Máy (Wine) thiếu font tiếng Việt. Tin Telegram/Discord vẫn đúng. Trên Windows không bị |
| Không nhận tin Telegram/Discord | Xem tab **Experts** ở dưới MT4 và mục "Không nhận được tin?" trong `02-huong-dan-telegram-discord.md` |
| Cảnh báo không đến khi tắt máy | MT4 phải mở. Muốn chạy 24/5 → để máy luôn bật hoặc thuê VPS |
| Vừa gắn EA đã nhận nhiều tin một lúc | (Đã sửa) Cảnh báo tồn lại khi ZO_Notifier chưa chạy nay bị bỏ nếu cũ hơn `InpMaxAgeMinutes` (15 phút), chỉ gửi 1 dòng tóm tắt. Gắn lại ZO_LP không còn bắn lại các tình huống cũ. Nên chỉ gắn ZO_LP trên 1 chart mỗi cặp tiền |
| Chart bị chậm | Giảm `InpLookback` (vd 300) hoặc bỏ bớt khung trong `InpTimeframes` |

---

## 10. Giới hạn cần nhớ

- Tool vẽ LP theo **luật máy móc**. Những thứ cần "đọc MM" (nội chiến, săn SL, Main thật hay giả) vẫn phải tự
  phán đoán. Chính Zerd nói: *"cái MLP hay Shield hay bất kể các thứ chúng ta vẽ đều là quá khứ"*.
- Nhãn **Main** là suy luận gần đúng từ định nghĩa trong Discord — nếu thấy lệch với cách nhóm gọi, chụp màn hình gửi lại để chỉnh.
- Plan trong cảnh báo SETUP chỉ là **gợi ý** — luôn tự kiểm tra trước khi đặt lệnh.
- Tool **không chặn** được bạn vào lệnh — nó chỉ nhắc. Kỷ luật vẫn là của bạn.

---

## 11. Bộ công cụ mới (29/9/2026)

### 11.1. Cách bố trí khuyên dùng

| Chart | Gắn gì |
|---|---|
| 5 chart W1, D1, H4, H1, M15 | **ZO_LP** (máy tính LP + chia sẻ dữ liệu + cảnh báo chi tiết). `InpDraw = false` (mặc định mới) → ZO_LP không vẽ nữa |
| Chart bạn hay nhìn (vd M15, H4) | **ZO_View** để xem hộp LP, nến đáng chú ý, bảng phân tích |
| 1 chart bất kỳ | **ZO_Analyst** (EA). **Gỡ ZO_Notifier** ra — ZO_Analyst đã chuyển tiếp các cảnh báo của ZO_LP, chạy cả hai sẽ bị gửi trùng |
| Khi muốn xem LP khung lớn | Kéo script **ZO_DrawLP** vào chart (chạy 1 lần; muốn cập nhật thì kéo lại) |

> Vì sao bảng cũ nhấp nháy: ZO_LP cũ in bảng bằng `Comment()`, mà ZOS cũng ghi đè `Comment()` → bảng hiện 1–2 giây
> rồi mất; ngoài ra cứ 5 giây nó xoá và vẽ lại mọi thứ. ZO_View dùng nhãn riêng trên chart, chỉ cập nhật chữ tại chỗ,
> vẽ lại hộp khi có nến mới → không nhấp nháy.

### 11.2. ZO_View (indicator)

- **Hộp LP** của khung chart đang mở: GLP xanh lá (đậm hơn khi RETEST), RLP đỏ, LP chưa break viền vàng, LP đã chạy viền xám.
  Main: viền dày + chữ `MAIN`; Shield có chữ `shield`. Đổi khung chart → tự vẽ lại theo khung mới.
- **Nến đáng chú ý:**

| Dấu | Nghĩa |
|---|---|
| Mũi tên xanh ↑ / đỏ ↓ | Nến làm LP break thành GLP / RLP |
| `✖ clear G 12/5` / `✖ thủng R …` | Nến giết một LP (clear = thân nến vượt cả 2 mép; thủng = đóng qua mép đối diện) |
| `★ MAIN G 12/5` | Nến khiến LP đó thành Main (vì vừa clear LP ngược chiều) |
| Chấm vàng | Nến build **1 đầu** đứng riêng — hay là nến kết thúc sóng (Zerd 17/4/2025) |
| `thu nến` | 3/5 nến gần nhất là nến 2 đầu thân nhỏ, ngay trong một LP → lực yếu, vùng chờ vào lệnh |

- **Bảng phân tích** (góc trái trên, đổi bằng `InpPanelCorner`): mỗi khung W1/D1/H4/H1/M15 có màu ZOS + số nến cùng màu,
  xu thế LP (từ ngày nào), thu nến, giá đang trong LP nào, LP gần nhất phía trên/dưới, Main mua/bán; cuối bảng là thiên hướng
  **Bộ dài** (W1/D1) và **Bộ ngắn** (H4/H1). Cập nhật mỗi `InpPanelMinutes` (60) phút và mỗi nến mới.
- Khung nào chưa có ZO_LP chạy trên chart riêng sẽ ghi `[ƯỚC TÍNH]` (tính từ xa, có thể sai).

### 11.3. ZO_DrawLP (script)

- Kéo vào chart → hộp thông số → OK. Vẽ các LP quan trọng của `InpTimeframes` (mặc định W1, D1, H4; thêm `60` để có H1):
  Main (luôn vẽ) + LP chứa giá + `InpPerSide` LP gần nhất phía trên và dưới mỗi khung (LP trùng nhau chỉ giữ cái mạnh nhất).
- Mỗi LP = 2 đường `H-RLP-W1 12/5` và `L-RLP-W1 12/5`. Màu theo khung: **W1 tím đậm, D1 đỏ, H4 vàng, H1 xanh da trời**
  (đổi được). Đường liền = đã break, chấm = chưa break, gạch = đã chạy xa. W1 dày nhất.
- Main: nhãn có `MAIN`, đường dày hơn, thêm ngôi sao `★ MAIN R-D1 (clear LP ngược)` tại nến đã clear LP ngược chiều.
- Nhãn bắt đầu bằng `~` = khung đó đang ước tính (chưa có ZO_LP trên chart riêng).
- Xoá hình: chạy lại với `InpRemoveOnly = true`.

### 11.4. ZO_Analyst (EA)

- **Khi gắn**: gửi 1 bản phân tích đầy đủ (tối đa 1 lần/10 phút, vì đổi khung chart là MT4 gắn lại EA):
  từng khung (màu ZOS, áp lực thân nến, xu thế LP, Main, giá đang ở đâu, trên/dưới), rồi **Bộ dài** và **Bộ ngắn**:
  thiên hướng + kịch bản MUA/BÁN (vùng, EP 50%, SL sau điểm cuối, TP = LP ngược gần nhất, RR) + cảnh báo "không vào".
- **Khi có thay đổi** (đọc từ dữ liệu ZO_LP, khung ≥ H1):
  - LP mới, LP break, LP bị clear/thủng (kèm "dấu hiệu SHs" nếu chết ngay sau khi tạo), H4+ bắt đầu RETEST,
  - **Main mới**, **xu thế LP đổi**,
  - giá **chạm** LP H4/D1/W1 (kiểm tra mỗi 5 giây, kèm điểm cuối + SL gợi ý + cùng/ngược xu thế).
- Sự kiện **lớn** (Main mới, đổi xu thế H4+, mọi thứ ở D1/W1, LP H4+ chết) → gửi **bản phân tích đầy đủ + danh sách thay đổi**
  (tối đa 1 lần/`InpFullGapMin` = 60 phút; trong 60 phút đó sự kiện lớn vẫn được báo ngay dạng tin ngắn ⚠).
  Sự kiện nhỏ → gom thành tin ngắn 🔔, cách nhau ≥ `InpMinGapMin` (10) phút. Giờ yên lặng 0–7h: bỏ tin nhỏ, giữ tin lớn tới sáng.
- Bản phân tích mới nhất luôn được ghi ra `MQL4\Files\zo_analysis_EURUSD.txt`.
- Cần: **Allow WebRequest** cho `https://api.telegram.org` (như ZO_Notifier). Token/chat id đã cài sẵn.
- `InpEstimate = false` (mặc định): khung không có ZO_LP trên chart riêng sẽ bị bỏ qua thay vì đoán — tránh báo sai.

### 11.5. Tài liệu học đi kèm

Thư mục `nghien-cuu/`: nền tảng trading, PVSRA, khái niệm ZOS, bài học Discord + sách, bộ quy tắc, **danh sách tình huống LP để
bạn điền cách xử lý** (dùng cho backtest sau), tâm lý & quản lý vốn.


---

## 12. Cập nhật 30/9/2026: bộ tool theo hệ ZOU (H4 → M15)

Bộ tool được cập nhật theo kết quả backtest 41 tuần. Các báo cáo nằm trong `backtest/ket-qua/`; bản mới nhất là `2026-09-30-lan19-winrate.md`.

### 12.1. Luật LP và xu thế mới (áp dụng cho mọi tool)

| Luật | Trước | Nay |
|---|---|---|
| LP H4 / D1 / W1 chết khi | Nến ZOS **đóng** qua điểm cuối | **Thân** nến ZOS bị điểm cuối cắt qua (GLP: thân xuống dưới Low; RLP: thân lên trên High) |
| LP thành Main khi | Clear một LP ngược bất kỳ | Clear một LP ngược **hình thành trước nó** |
| Main được gắn cho | Khung ≤ H1 | Khung ≤ H4 (`InpMainMaxTf = 240`) |
| Xu thế của một khung | Phe vừa làm chết LP gần nhất | Hướng của **Main mới nhất** của khung đó |

### 12.2. Hệ ZOU: tín hiệu vào lệnh

Chỉ vào theo hướng **Main H4**. Vào market khi nến M15 đóng. Hệ có hai kiểu vào:

- **ZM**:
  - Main H4 đã giữ hướng ít nhất 48h.
  - Giá chạm nửa sâu của một LP H4 cùng chiều.
  - Nến ZO A có râu ngược ≥ thân và ≥ 1/3 biên độ (lực kéo ngược). Nến B không còn râu đó.
- **U1w**:
  - Giá bị kéo ngược ít nhất 15 pip trong 4h vào LP H4 cùng chiều, LP M15 cùng chiều, hoặc số tròn.
  - Một trong 3 nến ZO trước có râu kéo ngược ≥ 5 pip.
  - Nến vừa đóng không còn râu ngược, thân đi theo hướng lệnh.
- **SL:** sau đỉnh/đáy của 4 nến gần nhất + 3 pip, trong khoảng 10–15 pip. SL xa hơn 15 pip thì bỏ lệnh. Không vào lệnh 0h–6h (giờ Hà Nội).
- **TP:** chốt 3 phần ở **1R**, **giữa** và **đầu xa** của LP H4 ngược gần nhất.
  - Lot dưới 0.03 thì không chia được 3 phần: đặt 1 TP (ZM: 2R, U1w: 3R). Tin tín hiệu ghi sẵn mức giá này.
- **Chặn W1/D1:** không vào khi giá đang nằm trong một vùng Main W1/D1 ngược chiều. Phân tích của EA ghi dòng `⛔`. Cần ZO_LP chạy trên chart D1 và W1.
- **Tạm dừng:** thua 2 tín hiệu liên tiếp cùng hướng thì dừng hướng đó 48h, vì Main H4 có thể đang chậm hơn giá. EA tự theo dõi và báo `⏸`; ZO_View hiện dòng "tạm dừng".
- **Quản lý:**
  - Dời BE khi giá đi được 1R.
  - Phần đã tới mục tiêu mà nến ZO M15 vẫn màu mạnh, không có râu kéo ngược thì giữ tiếp. Nến hết mạnh thì chốt phần đó.

Kết quả backtest, tính bằng R (lãi/lỗ chia cho số tiền rủi ro mỗi lệnh) trên vốn 1000$:
- Cả kỳ: 64 lệnh, 37 thắng / 2 hoà / 25 thua, **+46.5R**, tỉ lệ thắng 60% (không tính lệnh hoà).
- Kiểm tra cuối (8–9/2026): **+12.6R**, tỉ lệ thắng 64%.
- Vốn 30$: 30$ → 85.6$. Chuỗi thua dài nhất 3 lệnh.
- Sụt vốn tối đa 30% nếu rủi ro 5%/lệnh → **nên để rủi ro 2%** (`InpRiskPct`).
- Chi tiết: `backtest/ket-qua/2026-09-30-lan22-d1-w1.md`.

### 12.3. Thay đổi từng tool

| Tool | Thay đổi |
|---|---|
| **ZO_LP** | LP H4+ chết theo luật cắt thân; gắn Main tới H4 |
| **ZO_Analyst** | Bản phân tích có mục **KẾ HOẠCH ZOU** thay cho "Bộ dài / Bộ ngắn". Mỗi lần nến M15 đóng: kiểm tra tín hiệu ZOU → gửi Telegram `🎯 TÍN HIỆU ZOU` (giá vào, SL, 3 TP, lot gợi ý, lý do) và vẽ mũi tên + SL/TP trên chart. Lệnh đang mở: nhắc dời BE ở 1R (`🛡`) và nhắc chốt phần giữ khi nến ZO hết mạnh (`✋`) |
| **ZO_View** | Bảng: xu thế theo Main. Hai dòng cuối là kế hoạch ZOU và kết quả kiểm tra nến M15 vừa đóng. Bảng **gọn**: mỗi khung 1 dòng, mặc định chỉ D1 / H4 / M15 (`InpPanelTfs`); `InpPanelMode = 1` để xem bản đầy đủ. Nút **ZO -** / **ZO +** ở góc bảng để thu gọn / mở. `InpPanelBox = false` để bỏ nền tối, `InpPanelCorner` để dời bảng sang góc khác |
| **ZO_DrawLP** | Màu theo khung: **W1 đỏ, D1 vàng, H4 xanh lam** (H1 tím). GLP nét liền, RLP nét đứt, chưa break nét chấm. Mỗi đường có nhãn `High …` / `Low …` kèm giá, đặt ở mép trái màn hình lúc chạy script |
| **ZO_BTView** | Mặc định hiện lệnh của hệ **ZOU** trong backtest (`InpShow`) |
| **ZO_Review** | Chart sạch để tự đánh dấu điểm vào (mục 3.6 trong `backtest/HUONG-DAN-BACKTEST-H4-M15.md`) |

Chữ vẽ trên chart (nhãn, tooltip, bảng) **không dấu**, vì MT4 chạy qua Wine hiện chữ có dấu thành "?". Tin Telegram vẫn có dấu.

### 12.4. Kiểm tra và loại lệnh của hệ

1. Gắn **ZO_BTView** lên chart M15 (mặc định hiện lệnh ZOU). Đường nối giá vào → giá thoát: xanh = lãi, đỏ = lỗ, trắng = hoà.
2. Lệnh bạn cho là **không nên vào**: đặt **Stop Sign** (Insert > Arrows) ngay cạnh mũi tên vào lệnh đó.
3. Điểm hệ bỏ lỡ mà bạn sẽ vào: dùng **Arrow Up** (mua) / **Arrow Down** (bán).
4. Chạy script **ZO_ExportMarks**, rồi gửi mình để chạy `bt_marks.py --system ZOU`.

### 12.5. Hệ EPQ (1/10/2026): nhiều lệnh hơn, xem trước trên ZO_BTView

Nghiên cứu "Potential EP" (`backtest/ket-qua/2026-10-01-lan24-potential-ep.md`) cho ra hệ **EPQ**:
- **Luật:** nến ZOS M15 bị kéo về một phía rồi lực kéo không tiếp tục (râu ngắn dần rồi hết, hoặc cặp nến A/B), xảy ra **tại Main / Shield H4 cùng chiều**. Bỏ khi H4 màu yếu phía mình và bỏ phiên New York.
- **Kết quả (đã sửa lỗi làm tròn, xem lần 27):** khoảng 4.7 lệnh/tuần, +74.9R, tỉ lệ thắng 49%, vốn 30$ → 139$. Chuỗi thua tới 8 lệnh → chỉ nên rủi ro 2%/lệnh.
- **ZEP** = ZOU + EPQ chạy song song.
- **Xem lệnh:** ZO_BTView với `InpShow = EPQ` hoặc `ZEP`. EA (ZO_Analyst) **chưa** phát tín hiệu EPQ.

### 12.6. Lịch tin tự động (1/10/2026)

- **ZO_Analyst** tự tải lịch tin tuần này của ForexFactory (`InpNewsUrl`), 4 giờ một lần, rồi:
  - gửi Telegram `📰` trước tin đỏ USD / EUR 30 phút;
  - **không phát tín hiệu vào lệnh** trong ±30 phút quanh tin (báo `📰 bỏ tín hiệu … vì đang trong khung tin`);
  - vẽ đường dọc chấm đỏ tại giờ ra tin trên chart gắn EA;
  - liệt kê tin đỏ 24h tới trong bản phân tích.
- **ZO_View** hiện thêm 1 dòng: tin đỏ kế tiếp (còn bao nhiêu giờ) hoặc `TIN ĐỎ … không vào lệnh`.
- **Cần làm 1 lần:** Tools → Options → Expert Advisors → Allow WebRequest, thêm `https://nfs.faireconomy.media`.
- **Chỉnh trong Inputs của ZO_Analyst:**
  - `InpNewsCurrencies`: đồng tiền theo dõi (mặc định `USD,EUR`).
  - `InpNewsMinImpact`: 3 = chỉ tin đỏ, 2 = thêm tin cam.
  - `InpNewsBlockMin`: số phút chặn trước và sau tin.
  - `InpNewsWarnMin`: báo trước bao nhiêu phút.
  - `InpNewsLines`: bật / tắt đường dọc.
- **Giới hạn:** nguồn này chỉ có lịch tuần hiện tại, nên **backtest chưa lọc được tin** (không có lịch quá khứ). Luật ±30 phút lấy theo quy tắc Q5, chưa được kiểm chứng bằng số liệu.

### 12.7. Hệ EPA và ZEA (1/10/2026): tỉ lệ thắng trên 50%

- **EPA** = Potential EP kiểu cặp nến A/B tại Main / Shield H4 + **chờ 2 nến ZO xác nhận** (không râu ngược, thân theo hướng lệnh). Bỏ phiên New York và khi H4 màu yếu phía mình.
- **ZEA** = ZOU + EPA: 140 lệnh / 41 tuần, tỉ lệ thắng 62% (không tính lệnh hoà), +98.9R, lãi cả 9/9 tháng, vốn 30$ → 430$.
- **ZEAR** = cùng điểm vào với ZEA, nhưng chốt ở mép gần / giữa / đầu xa LP H4 ngược (không chốt 1R), SL 8–15 pip: tỉ lệ thắng 45%, +128.5R, vốn 30$ → 1044$.
- **Xem lệnh:** ZO_BTView với `InpShow = EPA`, `ZEA` hoặc `ZEAR`. Chi tiết: `backtest/ket-qua/2026-10-01-lan27-sl-tp.md`.
- EA (ZO_Analyst) hiện mới phát tín hiệu ZOU.

### 12.8. Bộ tool theo hệ ZEA (1/10/2026)

**Cách chạy ZO_Analyst (EA phân tích + báo tín hiệu)**

EA không tự đọc được ZOS của khung khác: ZOS chỉ đúng trên chart của chính khung đó. Vì vậy mỗi khung cần một chart có **ZOS + ZO_LP**; ZO_LP ghi dữ liệu ra file, EA đọc lại. Nếu thiếu, EA báo "không có dữ liệu".

1. Mở một chart EURUSD bất kỳ, gắn **ZOS** và **ZO_LP** (giữ mặc định).
2. Chuột phải chart → **Template → Save Template…** → đặt tên **`ZO_DATA`**.
3. Mở chart **EURUSD M15** có ZOS, kéo **ZO_Analyst** vào (bật "Allow live trading" không cần; cần Allow WebRequest cho `https://api.telegram.org` và `https://nfs.faireconomy.media`).
4. EA tự mở các chart còn thiếu (W1, D1, H4, H1) và áp template `ZO_DATA` cho chúng. Chờ khoảng 10–30 giây để ZO_LP trên các chart đó ghi dữ liệu, rồi EA gửi bản phân tích.
5. Lần sau chỉ cần mở lại profile (File → Profiles → Save As… để lưu bộ chart).

Nếu không muốn EA tự mở chart: đặt `InpAutoOpenCharts = false` và tự mở 5 chart W1, D1, H4, H1, M15 có ZOS + ZO_LP.

**Tin nhắn của EA**

| Tin | Khi nào | Nội dung |
|---|---|---|
| `ZOS MARKET ANALYSIS` | Khi gắn EA và khi cấu trúc đổi (Main mới, LP H4+ chết…) | Giá và xu thế từng khung; phase H4 / M15 (% ước lượng); vị trí quan trọng (LP High / Low, RN, Main / Shield, D1 / W1 có kích hoạt không); bối cảnh ZOS; thiên hướng BUY / SELL %; kịch bản chính / phụ / không trade; tin đỏ; STATUS |
| `🔔 ZOS — POTENTIAL EP` | Nến M15 vừa đóng tạo cặp nến ZO A/B | WHY (lực kéo, vị trí), SUPPORT, AGAINST, QUALITY /100, STATUS: WATCH, WAIT FOR |
| `✅ ZOS — ENTRY` | Potential EP đủ 2 nến ZO xác nhận và đạt đủ luật ZEA | Giá vào, SL, 3 TP, lot gợi ý, lý do, cách quản lý |
| `❌ POTENTIAL EP HUỶ` / `⛔ KHÔNG VÀO` | Nến sau không xác nhận / đủ nến nhưng không đạt luật | Lý do |
| `🎯 TÍN HIỆU ZOU` | Tín hiệu ZM / U1w (phần ZOU của hệ ZEA) | Giá vào, SL, TP |
| `🛡` / `✋` | Lệnh đang mở đi được 1R / nến ZO hết mạnh | Nhắc dời BE / chốt phần giữ |
| `📰` | 30 phút trước tin đỏ USD / EUR | Tên tin, giờ |

- **Phase %, BUY / SELL %, Quality /100** là điểm ước lượng từ nến ZOS và vị trí, không phải xác suất đã kiểm chứng. Điều kiện vào lệnh thật là bộ luật ZEA đã backtest.
- `InpTpProfile` (mặc định 1): 0 = ZEA (chốt 1R / giữa / xa), 1 = ZEAR (mép gần / giữa / xa, SL từ 8 pip).
- Từ 1/10/2026 (lần 32–35) EA chạy hệ **ZEAR2**: `InpH4Veto` (bỏ lệnh khi nến ZOS H4 vừa đóng màu mạnh ngược), `InpHoldMode = 1` (giữ phần đã chạm đích tới khi có nến ZO M15 màu ngược), `InpHoldLockR = 0.5` (khoá lời khi bắt đầu giữ), `InpRiskPct = 5`. Chi tiết: `mt4/docs/HUONG-DAN-SU-DUNG.md`.
- `InpEpMinQuality`: chỉ báo Potential EP từ mức điểm này (mặc định 50, tức là phải ở Main / Shield H4).
- `InpAnalysisStyle = 1`: quay lại kiểu bản phân tích cũ.

**ZO_BTView: vì sao vào lệnh**

- Mặc định hiện lệnh hệ **ZEA**. **Bấm vào một lệnh** (mũi tên, đường nối hoặc dấu kết quả) → hiện bảng ở góc dưới trái:
  - dòng vàng: tóm tắt lệnh;
  - lý do vào (kiểu tín hiệu);
  - `UNG HO` (xanh): các yếu tố ủng hộ;
  - `KHONG UNG HO` (đỏ): các yếu tố ngược;
  - `BOI CANH`: phase H4, phiên, độ dài râu kéo, Main M15, có gần tin đỏ không;
  - `QUAN LY`: SL, các đích, kết quả, giá đi xa nhất.
- Bấm lại vào lệnh đó hoặc vào bảng để đóng.

**Mô tả tool:** mỗi indicator / script / EA giờ có phần mô tả (tab **About** hoặc **Common** khi kéo vào chart): nó làm gì, gắn ở đâu, cần gì.
