# 06 — Danh sách tình huống LP (để bạn điền cách xử lý)

**Mục đích:** liệt kê mọi tình huống LP có thể gặp trong ZOS. Bạn điền cột **"Cách xử lý của bạn"** → mình mã hoá thành luật
backtest (khi đã có đủ dữ liệu dài hơn) để đo từng case có lãi hay không.

## Cách đọc bảng

| Cột | Ý nghĩa |
|---|---|
| **ID** | Mã case — dùng khi trao đổi / backtest (vd "C7") |
| **Tình huống** | Mô tả nhận diện trên chart |
| **Gợi ý từ Discord** | Cách Zerd/ZZZ xử lý tình huống tương tự (tham khảo, không bắt buộc) |
| **Máy** | Bot/backtest nhận diện được không: ✅ được · 🟡 một phần (cần tham số) · ❌ không (cần mắt người) |
| **Cách xử lý của bạn** | **Bạn điền.** Gợi ý mẫu bên dưới |

### Mẫu điền (càng cụ thể càng backtest được)

```
Hành động: VÀO / KHÔNG VÀO / CHỜ <điều kiện>
Hướng:     BUY / SELL
EP:        mép gần | 50% | điểm cuối (Low G / High R) | đóng nến trong vùng | LP nhỏ retest
Xác nhận:  không | thu nến khung <x> | LP <x> cùng chiều | nến 2 đầu | RN
SL:        ngoài mép <LP nào> + <n> pip
TP:        mép LP ngược gần nhất khung <x> | <n>R | không TP, dời BE theo LP
BE:        khi <điều kiện>
Hết hạn:   <n> giờ / khi <điều kiện>
```

Ví dụ điền cho C7: *"VÀO, cùng chiều LP lớn. EP = đóng nến M15 trong LP M15 mới. SL ngoài mép xa LP M15 + 2 pip. TP = mép LP
ngược gần nhất H4, cap 3R. BE khi M15 tạo LP bảo vệ mới. Hết hạn 12h."*

Ký hiệu: **khung lớn (HTF)** = khung ngữ cảnh (W/D cho bộ dài, H4/H1 cho bộ ngắn); **khung nhỏ (LTF)** = khung vào lệnh
(H4 cho bộ dài, M15 cho bộ ngắn). "Điểm cuối" = Low của G, High của R.

---

## A. Hình thành LP

| ID | Tình huống | Gợi ý từ Discord | Máy | Cách xử lý của bạn |
|---|---|---|---|---|
| A1 | 1 nến build **2 đầu** đứng riêng → LP | Nến 2 đầu = phạm vi MM kiểm soát (2025-09-10). Chưa màu → chưa vào (EP trong LP là không an toàn — 2024-10-27) | ✅ | |
| A2 | Chuỗi ≥ 2 nến build liền nhau → LP | Như A1 | ✅ | |
| A3 | Nến build **1 đầu** đứng riêng (không thành LP) | Không phải LP nhưng có giá trị: build cuối sóng thường kết thúc sóng (2025-04-17); build ở đỉnh khi giá tăng = build short | ✅ | |
| A4 | LP được **mở rộng** (build mới chạm & đóng trong LP) | *"LP còn mở rộng nên khó đoán"* (2025-03-04); mở rộng High D = chỉ là thử nghiệm (2025-09-08) | ✅ | |
| A5 | LP mới **bao trùm 100%** LP cũ cùng chiều | *"RLP H1 mới bao trùm 100% MRLP H1 cũ → thay thế Main cũ"*; LP chồng = dồn nén lực về 1 điểm bật (2024-09-26) | ✅ | |
| A6 | LP mới tạo **chồng/kề** LP cùng khung khác (khe < 20 pip) | *"LP chồng LP: kẽ hở giao dịch rất thấp, 5–20 pips"* (2024-09-19); lấy High của LP cao nhất (2025-03-05) | ✅ | |
| A7 | LP mới tạo **ngay mép LP khung lớn** (≤ 10 pip) | LP nhỏ gia cố/xác nhận High/Low khung lớn (2024-09-12); MLP tại SS khung lớn = MLP chính cho giai đoạn (2024-02-16) | ✅ | |
| A8 | LP mới tạo **giữa khoảng trống** (xa mọi LP khung ≥ nó) | Không có dựa lưng → yếu hơn | ✅ | |
| A9 | **Nhiều lớp**: cùng vùng giá có LP cùng chiều sinh ra ở các ngày/tuần khác nhau | Nhiều lớp → càng quan trọng với MM → nơi quyết định động thái lớn (2025-06-05) | 🟡 | |
| A10 | LP mới tạo **sát một GLP** sau một đoạn chạy xa (hoặc nhiều LP liên tiếp tại nơi trước đó là G) | *"Rất cao khả năng là R để đục xuyên GLP"* (2025-02-27) | 🟡 | |
| A11 | LP khung lớn (D/W) **mới hình thành**, chưa màu | *"D ra LP là xác nhận MM có tham gia; G hay R để sau tính"* (2025-03-13) | ✅ | |

## B. Thoát ra khỏi LP (Break → thành G/R)

| ID | Tình huống | Gợi ý từ Discord | Máy | Cách xử lý của bạn |
|---|---|---|---|---|
| B1 | Đóng ra **xa** mép (thân dài, ≥ 30% chiều cao LP) | *"Close càng xa càng cho thấy khả năng thành công cao"* (2025-02-25) | ✅ | |
| B2 | Đóng ra **sát** mép (< 10% chiều cao LP) | *"Close sát thì chỉ cần quay lại là không làm G; những tuần như vậy không vào cho lành"* (2025-02-25) | ✅ | |
| B3 | **Râu** vượt mép nhưng **đóng lại trong** LP (head fake) | Quét râu qua High LP rồi sập = kích run ngược (2025-04-03) | ✅ | |
| B4 | Break **cùng** xu thế khung lớn | Nối xu thế (confirm R H1 → nối xu thế — 2025-06-19) | ✅ | |
| B5 | Break **ngược** xu thế khung lớn | RLP sinh ra trong xu thế tăng là để đi săn hoặc chuẩn bị đảo, xác nhận sau (2024-09-04) | ✅ | |
| B6 | Break bằng **gap** / sáng thứ 2 phiên Á | *"Clear sáng thứ 2 phiên Á thanh khoản thấp → cần LO và NY confirm"* (2025-01-27) | ✅ | |
| B7 | Break **trong tin đỏ** (± 30 phút) | *"Tin để hợp thức hoá hoặc SHs"* (2025-03-26); chờ phản ứng sau tin | 🟡 (cần lịch tin) | |
| B8 | Break mà **không có LP khung nhỏ nào** đi kèm (chạy vội, 1 mạch) | Chạy vội không xây rào → sập bất ngờ (2024-09-18); cần cấu trúc (2025-04-10) | 🟡 | |

## C. Retest (G/R quay lại vùng)

| ID | Tình huống | Gợi ý từ Discord | Máy | Cách xử lý của bạn |
|---|---|---|---|---|
| C1 | Retest **lần đầu**, chỉ chạm **mép gần** (nông) | *"LP lên rồi làm R thì retest hay nông, khó về vùng High"* (2025-04-24) | ✅ | |
| C2 | Retest tới **50%** LP | ZZZ: *"cố bắt khi retest được hơn 50%"* (2023-11-22) | ✅ | |
| C3 | Retest tới **điểm cuối** (Low G / High R) | Điểm vào chuẩn ZO — *"nhè điểm cuối mà đập"* (2025-02-12) | ✅ | |
| C4 | Retest **xuyên râu qua điểm cuối** rồi đóng lại vào trong | Quét SL trước khi chạy; *"test lần 2 có thể thọc sâu hơn"* (2024-08-23) | ✅ | |
| C5 | Retest **lần 2** | Không còn full sức như lần đầu (2025-01-03) | ✅ | |
| C6 | Retest **lần ≥ 3** | *"Lần 3 là lần quyết định; quá 3 lần không được thì hay xoay"* (2025-04-17); đục nhiều = yếu (2024-11-21) | ✅ | |
| C7 | Trong lúc retest, khung nhỏ tạo **LP cùng chiều** LP lớn | LP đồng BBR ở cực hạn = retest xong (2023-12-12) — setup "kích" | ✅ | |
| C8 | Trong lúc retest, khung nhỏ tạo **LP ngược chiều** LP lớn | LP nghịch BBR = MM còn ép giá; tới cực hạn vẫn nghịch → gãy (2023-12-12) | ✅ | |
| C9 | Retest + khung nhỏ **thu nến / nến 2 đầu** tại mép | *"Đợi thu nến là nả"* (2025-03-20) | 🟡 | |
| C10 | Retest **lao ầm ầm** (thân dài, không chậm lại) | *"Lao ầm ầm mà vào là bị quét"* (ZZZ 2025-11-05) | ✅ | |
| C11 | Retest tại mép **trùng RN** hoặc trùng **mép LP khung khác** (≤ 5 pip) | Điểm hội tụ (2025-03-29) | ✅ | |
| C12 | **Không retest**, chạy thẳng tới target | *"Các vị trí retest rồi run thì hiếm khi quay lại"* (2025-02-28); lỡ thì bỏ (ZZZ) | ✅ | |
| C13 | Retest nhưng giá **lì trong vùng** nhiều nến không ra (chuyển thành nội chiến) | Xem nhóm F | ✅ | |
| C14 | Retest mép và mép **không cản** — giá đi xuyên qua dễ (vào sâu tới mép đối diện) | *"High không ngăn, cho đi qua dễ → Retest Run; bị giữ lại → khả năng Clear"* (2024-09-12) | 🟡 | |

## D. Thất bại / bị clear

| ID | Tình huống | Gợi ý từ Discord | Máy | Cách xử lý của bạn |
|---|---|---|---|---|
| D1 | **FAILED**: đóng xuyên mép đối diện (G đóng dưới Low / R đóng trên High) | MM vỡ trận → SL đáng giá (2024-01-19); *"LP bảo vệ mà gãy thì tiếp tục xu hướng đó"* (2025-01-13) | ✅ | |
| D2 | **CLEARED**: 1 thân nến vượt qua cả 2 mép | *"Break 2 đầu rồi nên nó clean rồi"* (ZZZ 2023-11-20) | ✅ | |
| D3 | Clear xong **tạo ngay LP cùng hướng** phá (làm base) | *"Clear xong tạo LP lại thường là LP đồng hướng và run rất mạnh"* (2025-04-25) | ✅ | |
| D4 | Clear xong **chạy thẳng không LP** nào | *"Clear xong tạo R rồi đi thẳng → clear chỉ là SHs"* (2025-04-16) | ✅ | |
| D5 | Clear LP **quan trọng khung lớn** (D/W) | *"Clear GLP W → rơi vào vùng trống"* (2024-06-26); lộ khoảng trống | ✅ | |
| D6 | Clear vào lúc **thanh khoản mỏng** (khuya, lễ, thứ 2 sáng) | *"Sai do thiếu thanh khoản có thể SL nhanh rồi vào ngược"* (2025-01-13) | ✅ | |

## E. Main / Shield

| ID | Tình huống | Gợi ý từ Discord | Máy | Cách xử lý của bạn |
|---|---|---|---|---|
| E1 | **Main mới** vừa hình thành (LP clear được LP ngược cùng khung) | *"Vừa xác nhận MRLP → khả năng test lại Shield"* (2024-10-17); Main = vua | ✅ | |
| E2 | Main **chưa có Shield** | *"Tướng ra chiến trường không có lính"* (2024-07-26); *"cần ít nhất Main → Shield mới khẳng định xu thế"* (2025-01-27) | ✅ | |
| E3 | **Shield** mới tạo (LP cùng chiều sau Main) | Xu thế chuẩn Main → Shield; EP nằm trong 1 Shield (2024-01-18) | ✅ | |
| E4 | Giá **retest Shield** | *"LP đánh vào Shield → gặp shield là nối xu thế"* (2025-06-19) | ✅ | |
| E5 | **Shield bị clear**, Main còn | Hậu chết, vua còn; 3 kịch bản: đánh thẳng vào Main / hạ xuống build G / sập về G gần nhất (2025-04-03) | ✅ | |
| E6 | Shield bị clear rồi **tạo lại** Shield ngay | Hiếm; thường vừa clear xong hay tạo LP ngược (2025-04-01) | ✅ | |
| E7 | Giá **retest Main** | *"Giá quay lại MGLP sẽ có nhiều lực hỗ trợ hơn"* (2024-01-18); MM EP ở Main (2025-03-25) | ✅ | |
| E8 | **Main bị clear** → mất xu thế | *"1 xu thế bị bẻ cả Main G thì xác nhận mất xu thế"* (2025-01-10) | ✅ | |
| E9 | Main khung nhỏ **cùng chiều** LP khung lớn đang retest ("retest-run") | MGLP M15 sinh ra để xoay xu thế M15 rồi lan lên H1, H4 (2024-01-19) | ✅ | |
| E10 | Main khung nhỏ **ngược** xu thế khung lớn | *"Dưới H1 Main→Shield dễ bị xu thế khung to loại bỏ"* (2025-02-18); *"M1 luôn có main cả 2 phía"* | ✅ | |
| E11 | Tạo R → tạo G → R clear G (chuỗi ngắn) | *"Tạo R rồi tạo G rồi clear G thì không xem là Main"* (2025-01-27) | ✅ | |
| E12 | Main G và Main R **cùng tồn tại** (2 khung khác nhau hoặc cùng khung) | *"2 main đấu đá nhau"* (2025-04-01) → xem khung nào lớn hơn | ✅ | |
| E13 | Main chỉ đúng luật nhưng **vị trí** không ở đầu sóng (vd giữa sóng, chart trống phía dưới) | *"Quy tắc xong + vị trí trong làn sóng = quyết định Main hay không"* (2024-09-19) | ❌ | |

## F. Nội chiến / kẹp

| ID | Tình huống | Gợi ý từ Discord | Máy | Cách xử lý của bạn |
|---|---|---|---|---|
| F1 | Giá **trong LP đã G/R** nhiều nến, không phá đầu nào | Nội chiến → *"đóng máy đi ngủ"* (ZZZ 2024-01-19); chỉ scalp (2024-07-26) | ✅ | |
| F2 | LP **G và R áp sát** nhau cùng khung, chưa bên nào bị clear | Giáp lá cà — không có range chạy | ✅ | |
| F3 | Giá **kẹp giữa G dưới và R trên** (có khoảng cách) | *"G + R kẹp = biên SW"*; scalp 2 biên (2025-03-20) | ✅ | |
| F4 | LP **chưa màu**, giá quanh LP (tranh chấp) | *"Khi còn là LP thì tranh chấp để được xác nhận"* (2025-02-27) → EP trong LP không an toàn | ✅ | |
| F5 | Nội chiến **khung lớn**, khung nhỏ tạo LP bên trong | *"Nội chiến W thì phải D tạo LP mới nội chiến được"*; H1 G = nội chiến H4 R, H1 R = từ chối (2025-06-23) | ✅ | |
| F6 | Nội chiến trong LP rồi **về được biên kia** | *"Nội chiến thành công là clear được LP đó hoặc ít nhất về được biên kia"* (2025-04-11) | ✅ | |

## G. Quan hệ đa khung

| ID | Tình huống | Gợi ý từ Discord | Máy | Cách xử lý của bạn |
|---|---|---|---|---|
| G1 | Xu thế **đồng thuận** cả khung lớn và khung nhỏ | Đồng luồng = chạy trend (2025-01-30) | ✅ | |
| G2 | Khung lớn tăng, khung nhỏ **đang hồi giảm** về LP khung lớn | Xác định xu hướng khung lớn rồi về khung nhỏ tìm điểm đồng thuận (ZZZ 2023-11-20) | ✅ | |
| G3 | Khung lớn tăng, khung nhỏ có **Main ngược** nhưng **chưa tới** LP khung lớn | Đi săn: *"khi H1 không kéo được H4 và tăng lại là kết thúc đi săn"* (Zonal 2024-09-18) | ✅ | |
| G4 | Khung nhỏ cùng chiều nhưng giá đang ở **High G / Low R** khung lớn | EP High G / Low R là không an toàn (2024-10-27) | ✅ | |
| G5 | Giá ở **vùng trống** khung lớn (không LP nào gần) | *"Không G không R, H4 H1 D trống → mất phương hướng; không có base thì EP thế nào cũng sai"* (2025-04-16) | ✅ | |
| G6 | **W và D mâu thuẫn** (W giảm, D tăng hoặc ngược) | *"W giảm lại khi D bắt đầu giảm lại = kèo trung hạn"* (2025-05-21); lực ai lớn hơn (2025-05-19) | ✅ | |
| G7 | Khung nhỏ LP **tựa lưng** LP khung lớn cùng chiều (nằm trong / sát mép) | *"Lựa LP M15 tựa lưng vào LP khung to"* (2024-01-19) | ✅ | |
| G8 | LP khung nhỏ **bị LP khung lớn nuốt** (nằm trong LP lớn ngược chiều) | *"LP khung nhỏ thường bị LP khung lớn vùi dập"* (2025-01-03) | ✅ | |
| G9 | Giá **chạm target** (LP khung lớn phía trước theo xu thế) | Chạm High R rồi thì sell dí không sao; chưa chạm mà sell = cờ bạc (2025-03-24) | ✅ | |
| G10 | Áp lực 3 khung **xen kẽ** | Nghỉ (2025-05-07) | 🟡 | |

## H. Hành vi / bối cảnh

| ID | Tình huống | Gợi ý từ Discord | Máy | Cách xử lý của bạn |
|---|---|---|---|---|
| H1 | Dấu hiệu **SHs**: build ngược hướng, LP bị phá ngay, nến nhanh, không LP đỡ | *"Điểm build short đầu tiên sẽ là target của run"* (2025-04-22) | 🟡 | |
| H2 | **Tích luỹ ở đáy** sau xu hướng giảm (cụm nến 2 đầu ở đáy) | Kích hoạt đảo trend (2026-02-25) | 🟡 | |
| H3 | **Phân phối giữa sóng** (cụm nến 2 đầu trong vùng nến H4, lên mượt xuống giật) | Nối xu hướng (2026-02-25) | 🟡 | |
| H4 | **Sóng tăng ảo**: Low cao dần, hồi lại nảy lên, không tăng mạnh (túi thanh khoản) | Bẫy, không phải đảo chiều (2026-03-02) | 🟡 | |
| H5 | **3 LP cùng chiều liên tiếp** (vd 3 R H1) | Đà vững chắc (2025-02-19) | ✅ | |
| H6 | Build **cuối sóng** (1 đầu, sau đoạn chạy dài) | Thường là nến kết thúc sóng (2025-04-17) | 🟡 | |
| H7 | Trước tin đỏ / họp Fed-ECB | Không vào; tin rate đừng làm gì (2025-04-17) | 🟡 | |
| H8 | Thứ 2 sáng / thứ 6 chiều / cuối tháng | Trap đầu tuần, trở mặt cuối tuần (2025-06-25) | ✅ | |
| H9 | RN chạm lần 1 / 2 / 3; RN đã bị thân nến đóng qua | RN hết giá trị khi close qua (2023-11-22) | ✅ | |
| H10 | Giá **chững lại** (đắn đo, chậm) ngay trước LP quan trọng | *"Chỉ có đang dụ mới làm giá đắn đo chậm chạp"* (2026-03-03) | ❌ | |
| H11 | Giá **bật rất nhanh** khỏi Low/High quan trọng (không cho nằm lâu) | MM không muốn người khác vào ở giá của nó (2025-02-02) | 🟡 | |

## I. Quản lý lệnh đang mở

| ID | Tình huống | Gợi ý từ Discord | Máy | Cách xử lý của bạn |
|---|---|---|---|---|
| I1 | Lệnh chạy, khung vào lệnh **tạo LP bảo vệ** cùng chiều | Dời BE/SL dưới mép LP 1 pip (2025-04-21) | ✅ | |
| I2 | Lệnh tới gần **LP ngược chiều** (khung ≥ khung vào) | Kéo BE ngay; vượt được → giữ, không → BE (2025-04-21) | ✅ | |
| I3 | **LP bảo vệ** của lệnh bị phá | Cấu trúc sai → cắt | ✅ | |
| I4 | Gần TP mà giá **vi phạm LP** (tạo LP ngược) | *"Có những quả gần tới TP mà vi phạm vào LP cũng phải cắt"* (2025-08-28) | ✅ | |
| I5 | Lệnh chưa tới TP nhưng **hết phiên / tới khuya / cuối tuần** | BE treo qua đêm hay bị cắn (2025-04-15); khuya thứ 6 mua mà thứ 2 gap (2025-04-21) | ✅ | |
| I6 | Lệnh chờ (limit) **chưa khớp**, giá đã chạy gần TP | Huỷ | ✅ | |
| I7 | Lệnh đang lãi, khung lớn **lên build / nến 2 đầu** tại LP lớn | *"Lên build / làm trò thì out ngay"* (2024-01-16) | 🟡 | |

---

## Sau khi bạn điền

1. Mình gom các case có hành động **VÀO** thành luật backtest (mỗi case = 1 chiến thuật con), đo riêng: số lệnh/tuần,
   winrate, RR trung bình, lợi nhuận theo R.
2. Các case **KHÔNG VÀO** thành bộ lọc — đo xem lọc có cải thiện kết quả không.
3. Case ❌ (cần mắt người) sẽ ghi chú là không backtest được; bot có thể cảnh báo để bạn tự quyết.
4. Cần dữ liệu dài: kéo lịch sử M15 ≥ 1 năm, H1 ≥ 2 năm (Home + Max bars trong chart) rồi chạy lại ZOS_Probe.
