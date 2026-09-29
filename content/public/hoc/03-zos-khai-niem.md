# 03 — ZOS: toàn bộ khái niệm, giải thích theo bản chất

Mỗi khái niệm có 3 phần: **Định nghĩa** (nhận diện trên chart) → **Bản chất** (vì sao nó tồn tại, MM đang làm gì)
→ **Dẫn chứng** (trích Discord có ngày).

> Zerd (2025-04-08): *"Cấu trúc là lịch sử nến. MM xây theo thói quen, thói quen tạo lịch sử nến; khai thác lịch sử là
> khai thác thói quen MM, không phải học kỹ thuật. ZO để đọc MM, không phải đọc kỹ thuật."*

---

## 0. Bức tranh tổng: thị trường là một vòng lặp

```
Tích luỹ ──► Chạy (run) ──► Phân phối ──► Chạy ──► Tích luỹ ──► …
     ▲                                                   │
     └──────────── (có thể: Tích luỹ → SHs → Run) ◄──────┘
```

- Zerd (2025-04-09): *"Quy luật ZO đơn giản: tích → run → tích → run. Tích cho cái gì, run xong tích ở đâu."*
- Zerd (2025-06-26): *"Quy trình: run → chốt → SHs → run."*
- Zerd (2026-02-25): *"Trạng thái cơ bản nhất: chạy lợi nhuận + tích luỹ. Tích luỹ chia 2 nhóm: tích luỹ để **tiếp
  tục** và tích luỹ để **đảo chiều**."*
- Phân bổ phân tích của Zerd (2025-04-09): **30–40% trạng thái thị trường** (tích luỹ / run / săn SL), **30–40% LP**,
  còn lại là **hành vi** (tin, khung giờ, giá đang cao hay thấp, gần kháng hay hỗ trợ).

→ **LP chỉ là một phần.** Mọi khái niệm bên dưới là công cụ để trả lời: *MM đang ở pha nào của vòng lặp, và pha kế tiếp đi đâu?*

---

## 1. Nến ZOS và màu

**Định nghĩa.** ZOS vẽ nến riêng (không phải nến Nhật của MT4) với dữ liệu riêng của ZO (on-chain/API). Màu thể hiện
**áp lực**:

| Màu | Ý nghĩa |
|---|---|
| Xanh lá (sáng/đậm) | Áp lực tăng |
| Xanh dương | Tăng nhưng áp lực giảm dần (vẫn trong xu hướng tăng) |
| Đỏ | Áp lực giảm |
| Tím / hồng | Giảm nhưng áp lực giảm dần |
| **Vàng (Build)** | Khối lượng đặc biệt — nơi MM đẩy lệnh lớn |

**Bản chất.** Màu là cách ZOS nén "volume + hướng" thành một tín hiệu nhìn được. Chuyển từ xanh lá → xanh dương = phe
mua vẫn thắng nhưng mệt dần.

**Dẫn chứng.**
- 2024-02-20: *"M1 xanh lá → xanh dương = giảm dần nhưng vẫn trong xu hướng tăng → phục hồi nhẹ; lan sang M5 thì di
  chuyển to hơn; M15 thì chính thức phục hồi ngắn hạn."*
- 2025-01-30: *"Đồng màu xanh từ M1 tới H4 là đang chạy trend (đồng luồng)."*
- 2024-02-20: *"Xanh từ M1 tới H1 nhưng H4 tím → khung nhỏ đang đánh lên H4, H4 vẫn giảm, chỉ đang kiểm tra lại H4
  cho đến khi H4 xanh."*

> Kỹ thuật: ZOS chỉ đúng trên **chart của chính khung đó** (đã kiểm chứng; Zerd 2024-12-31: *"hạn chế dùng 1 indi cho
> nhiều TF"*). Vì vậy bộ tool dùng 5 chart riêng.

## 2. Thân nến = áp lực; thu nến = hết áp lực

**Định nghĩa.** Thân nến ZOS dài → áp lực lớn về một phía. Thân nhỏ dần, nhiều nến 2 đầu → **thu nến**.

**Bản chất.** Thân dài = một phe áp đảo, phe kia không đỡ nổi. Thân nhỏ dần = phe đang thắng cạn lực, phe kia bắt đầu
hấp thụ → chuẩn bị đảo hoặc đi ngang.

**Dẫn chứng.**
- 2024-10-07: *"Các chóp đỉnh/đáy của 1 xu hướng sẽ tạo nến 2 đầu, body nhỏ dần — ZOS gọi là thu nến, giảm áp lực;
  body càng to áp lực càng lớn; body càng bé áp lực cân bằng và có thể xoay giá."*
- 2025-04-23: *"Áp lực nhỏ = range nhỏ, scalp kiểu nào cũng BE; áp lực lớn đè giá khiến BE khó bị hơn."*
- 2025-03-05: *"Nến bay ra khỏi High rồi lì không chịu vào → dễ là tăng; ngâm dưới High mãi đến khi thân nến thu ngắn
  dần → dễ đảo."*
- 2025-05-20: *"Phạm vi ảnh hưởng của D phải trong thân nến D"* — D râu dài thân nhỏ thì áp lực không lớn.
- Bài tập Zerd (2025-03-20): *"Dùng 2 khung H1 và H4: giá tới High R H4 thì về H1 đợi **thu nến** là vào; tương tự Low G."*

## 3. Nến Build (vàng) và nến 2 đầu

**Định nghĩa.**
- **Build**: nến vàng — khối lượng bất thường.
- **Build 1 đầu**: chỉ có râu một phía → xác định được một mép (vd râu dưới → biết Low), mép kia chưa chắc.
- **Build 2 đầu**: có râu cả hai phía → xác định được **cả High và Low** → là "phạm vi kiểm soát" của MM.

**Bản chất.** Zerd (2025-09-10): *"Nến vàng tượng trưng cho vùng MM đặt thanh khoản lớn để xả hoặc gom. Nến vàng 2 đầu
là range MM tạo ra để thao tác thanh khoản: phải luôn có buy giữ giá tăng và sell giữ giá giảm = phạm vi kiểm soát của MM."*

Build **không nói hướng**: *"chắc chắn là nơi MM đẩy khối lượng lớn; 2 khả năng: mua breakout hoặc điền để đảo chiều"*
(2025-04-21). Khi không rõ, xuống khung nhỏ (H1 build ≈ 60 nến M1) xem sự đồng bộ.

**Dẫn chứng.**
- 2025-04-17: *"Trong 1 sóng, ở cuối sóng có 1 nến build (không phải 2 đầu) thường là nến **kết thúc sóng**; dạng kia là
  build SHs rồi nối sóng."* — *"Tích luỹ nhiều khi giá giảm = build long; khi giá tăng = build short."*
- 2026-03-23: *"Nến build = hoạt động cao (MM can thiệp); nến 2 đầu = tích luỹ (không biết hướng)."*
- 2024-01-11: ở Low D, M1 xuất hiện build tạm dừng xu hướng — *"cụm 2 build không phải LP"* nhưng báo hiệu dừng.

## 4. LP — Liquidity Pool

**Định nghĩa.**
- Một nến build 2 đầu, hoặc chuỗi ≥ 2 nến build liền nhau → tạo **LP**.
- Vẽ **từ đỉnh râu trên tới đáy râu dưới** của cụm (ZZZ 2023-11-20).
- Nến build mới chạm LP chưa bị phá và đóng bên trong → **mở rộng** LP.
- Khi ZOS **đóng trên** LP → **G (GLP)**; **đóng dưới** → **R (RLP)**. Trước khi thoát ra, LP "còn là LP" (chưa màu).

**Bản chất.** LP là **nơi MM đặt lệnh** — vùng có khối lượng. MM không bỏ vị thế của mình: khi giá quay lại, họ
**bảo vệ** nó (thêm lệnh, đẩy giá ra). Hướng thoát ra (G/R) cho biết **ai thắng** trong trận chiến ở LP đó.

**Dẫn chứng.**
- 2024-09-23: *"MM không dùng ZO nhưng có điểm vào zone… ZO hiển thị các vùng LP gần bằng các điểm MM đưa ra, 60–70%."*
- 2025-03-05: *"H1 chạm Low 13/11 rồi High 13/11, cái nào cũng có phản ứng, tuyệt nhiên ở giữa LP lại không có gì →
  chứng minh High Low LP có tồn tại."*
- 2025-03-13: *"D ra LP là xác nhận MM có tham gia; G hay R để sau tính."*
- 2025-03-20: *"MM không chỉ đặt 1 vùng… ZO chia từng **tầng săn** của MM tương ứng LP đa khung."*
- 2026-03-09 (tư duy mới): *"LP giờ dùng để **track EP**; phân phối hay tích luỹ là tổng hợp của LP, nến ZOC, build.
  LP là chi tiết, kết luận các chi tiết mới là cái quan tâm."*

### 4.1 Điểm quan trọng nhất của LP

| LP | Điểm quan trọng nhất | Vì sao |
|---|---|---|
| **G** | **Low G** | Low là nơi MM mua sâu nhất; thủng Low = MM vỡ trận |
| **R** | **High R** | High là nơi MM bán cao nhất; vượt High = MM vỡ trận |

Zerd (2024-01-19): *"RLP điểm quan trọng nhất là High, GLP là Low; ở đây MM không kiểm soát thì phá LP, MM vỡ trận.
Nhiệm vụ của mình là phụ MM đoạn cuối, có lợi là out; nếu MM vỡ trận thật thì SL đó cũng đáng giá."*

### 4.2 Trạng thái LP (dùng trong bộ tool)

| Trạng thái | Nghĩa |
|---|---|
| **LP (chưa màu)** | Giá còn trong/quanh LP, chưa đóng ra ngoài — tranh chấp |
| **RETEST** | Đã G/R, giá quay lại chạm vùng |
| **RUN** | Đã G/R, giá chạy xa khỏi vùng |
| **FAILED** | Đóng xuyên qua mép đối diện (G thủng Low / R vượt High) |
| **CLEARED** | Một thân nến vượt qua **cả hai mép** — LP bị xoá sạch |

### 4.3 Giá trị của LP

- *"Vùng mới dựng có giá trị cao hơn vùng cũ; high low càng mới càng giá trị, nhất là H4"* (ZZZ 2023-11-27).
- **VLP** (virgin): lần retest đầu mạnh nhất; *"chạm rồi chạm lại thì không còn full sức như lần đầu"* (Zerd 2025-01-03).
- **Nhiều lớp**: *"qua 1 ngày hoặc 1 tuần nó build LP cùng hướng với 1 LP quan trọng trước đó → nhiều lớp → càng quan
  trọng với MM → nơi quyết định động thái lớn"* (2025-06-05).
- **LP chồng**: *"các LP xếp chồng, lấy High của LP cao nhất — đó là điểm thật trong đống đổ nát"* (2025-03-05).
- *"Low D-M15-H1-H4 cùng trong 10 pips → điểm trọng yếu MM thủ"* (2024-09-18).
- *"Không phải LP nào cũng phản ứng"* (2025-04-02) — phải chọn LP quan trọng.

## 5. BBR — Build → Break → Retest

**Định nghĩa.** MM **build** (tạo LP) → giá **break** ra khỏi LP (thành G/R) → quay lại **retest** LP → chạy tiếp.

**Bản chất.** Break là lúc MM thắng. Nhưng lệnh của MM còn nằm trong LP, và đám đông đuổi theo break sẽ là người
"cầm hộ". Retest = MM quay lại **lấy thêm hàng giá tốt** (và quét người đuổi sớm) trước khi chạy thật. Người vào ở
retest đứng **cùng giá với MM**, SL ngắn (ngay ngoài mép).

**Dẫn chứng.**
- 2024-09-12: *"Luôn ghi nhớ BBR: build → break → retest; khi chạy, sóng retest có khả năng đi sâu vào LP."*
- 2024-08-30: *"Trong giai đoạn retest của BBR thì chỉ là sóng hồi, hồi rồi run tiếp trend xác suất cao."*
- 2025-03-19: *"Đã confirm out (close ra ngoài) thì sẽ retest."*
- ZZZ 2023-11-22: *"Sau khi break, retest càng sâu càng tốt, cố bắt khi retest được hơn 50%."*
- 2025-04-14: *"Không cần retest vẫn được nhưng retest mới có kèo ngon."*

### 5.1 Retest → Run hay → Clear?

Zerd (2024-09-12): *"Câu trả lời nằm ở High và Low của LP: giá vào GLP rồi trở lên High GLP mà High không ngăn, cho đi
qua dễ dàng → **Retest Run**; nếu bị giữ lại, khó khăn xuyên qua High → khả năng đánh **Clear** Low GLP."*

Và (2023-12-12): *"Lúc retest, các LP nhỏ là LP **nghịch** BBR vì MM cần ép giá; đến vùng cực hạn thì bắt đầu sinh ra
LP **đồng** BBR; nếu đến cực hạn mà vẫn nghịch BBR thì xác định gãy."* → Đây là cơ sở cho setup "retest LP lớn + LP
nhỏ cùng chiều".

### 5.2 Kích (trigger)

- ZZZ (2023-11-23): *"Với LP H1 thì khung kích là M15: giá về LP H1 hạ xuống M15, chờ LP M15, đợi nó break retest rồi
  vào khi nó retest; tìm LP M15 ở nửa dưới của LP H1 (buy)."*
- Zerd (2024-10-07): *"Kích run thường là tạo LP trong cái G hoặc R đó, sau đó tạo đồng hướng hoặc nội chiến → kích."*
- Zerd (2025-01-31): *"Kích D thực chất là hành vi BBR của khung D."*

## 6. Main (MLP) và Shield — xương sống của xu thế

**Định nghĩa.**
- **Main**: LP **clear được một LP ngược chiều cùng khung** sinh ra trước nó. MGLP = G đã clear R; MRLP = R đã clear G.
- **Shield**: LP **cùng chiều** sinh ra **sau** Main, nằm giữa giá và Main.
- Xu thế chuẩn: **Main → Shield**.

**Bản chất.**
- Để đổi xu thế, MM phải **phá nơi phe kia bảo vệ** (LP ngược chiều). LP đã làm được việc đó chứng minh MM có đủ lực,
  và nó trở thành **nơi MM bảo vệ quan trọng nhất** — vì mất nó là mất xu thế.
- Shield là lớp phòng thủ trước Main: mọi áp lực phải đi qua Shield trước.
- Zerd (2025-03-25): *"**MM tạo Main, SM tạo Shield**; MM EP ở Main, SM EP ở Shield."*
- Ẩn dụ cờ vua (2024-09-19/20): *"Main là **Vua**, Shield là **Hậu**; chết vua là kết thúc ván. Shield gãy = hậu không
  bảo vệ được vua; còn hậu còn chiến."*

**Dẫn chứng.**
- 2024-01-18: *"Đến 1 mốc quan trọng MM bắt đầu mua thì tạo GLP — có thể chỉ tạm bợ… MM dùng GLP này phá RLP gần nhất;
  nếu phá thành công thì GLP này là nơi bảo vệ quan trọng nhất của MM; từ đó tạo thêm GLP để nâng giá."*
- 2024-01-18: *"Xu thế tăng M15 chỉ thay đổi khi Main GLP bị phá"*; *"giá quay lại MGLP sẽ có nhiều lực hỗ trợ hơn."*
- 2024-09-20: *"MRLP được xác định khi RLP đó clear được 1 GLP sinh ra trước nó… sau khi nó sinh ra rồi thì các GLP mới
  chẳng có ý nghĩa gì."*
- 2025-01-27: *"Phá G tạo R → R đánh dấu xu thế mới; tạo R phá được G → R cũng đánh dấu xu thế mới; **tạo R rồi tạo G rồi
  clear G thì không xem là Main**."*
- 2024-09-19: *"Quy tắc xong + **vị trí của nó trong làn sóng** = quyết định Main hay không."* (không phải cứ đúng luật là Main)
- 2025-03-28: *"LP thuận với Main có nhiệm vụ **bảo kê** Main; mọi áp lực phải đi qua nó trước khi chạm Main."*
- 2024-07-26: *"MRLP mà không có shield như tướng ra chiến trường không có lính."*
- 2025-04-03: *"Theo nguyên tắc tạo Main xong tạo Shield, không có vụ main run 1 vòng rồi clear shield tạo lại."*
- 2025-04-25: *"Clear xong tạo LP lại thường là LP đồng hướng và run rất mạnh."*

**Giới hạn khung.**
- 2024-01-19: *"MLP chỉ nên áp dụng M1 → H1; LP quan trọng H4 → W."*
- 2025-02-18: *"Main → Shield khung nào cũng được nhưng wiki min H4 LP; nên xác định cấu trúc này ở **H1** để track nội
  chiến; dưới H1 cấu trúc Main → Shield dễ bị xu thế khung to loại bỏ."*
- 2025-02-18: *"M1 luôn có main cả 2 phía."* → Main khung nhỏ không đáng tin nếu không khớp khung lớn.

## 7. Xu thế (LP) vs Xu hướng (sóng)

**Định nghĩa.**
- **Xu hướng** = sóng giá (đỉnh/đáy) — thấy được khi giá đã đi xa điểm xoay.
- **Xu thế** = bên nào đang kiểm soát LP của khung đó (Main + Shield còn nguyên, LP mới cùng chiều liên tục).

**Bản chất.** Xu thế đi **trước** xu hướng: MM đổi phe âm thầm (clear LP, tạo Main) trước khi sóng giá lộ ra.
Zerd (2025-02-22): *"**Sóng = xu hướng, LP = xu thế**; xu thế âm thầm diễn ra, sớm hơn sóng. Vd giá chạm Low W, sóng còn
giảm nhưng H4 đã có Main G → xu thế tăng trong xu hướng giảm → track nơi xu thế sẽ đánh tới."*

**Dẫn chứng.**
- 2025-01-06: *"MM muốn A → B sẽ đi A → A2 → An → B; xu thế chia ra từng chặng; khung W A→B thì D là A→A2, A2→B;
  H4 là A→a, a→A2…; **LP trong ZOS chính là các điểm A, A2, An, a, B**; việc của ta là kết nối các điểm nối rồi đu theo."*
- 2024-01-18: *"Xu thế tăng tạo các GLP liên tục hỗ trợ giá; xu thế giảm tạo RLP liên tục đè giá; để đổi xu thế nó cố
  clear các RLP đang đè giá và xây GLP hỗ trợ."*
- 2024-01-18: *"Mỗi khung có 1 xu thế; M15-H1-H4 đều giảm → xu hướng giảm; H4, H1 giảm nhưng M15 tăng → M15 xu thế tăng
  trong xu hướng giảm."*
- 2024-01-18: *"Mỗi xu thế trên mỗi khung ứng với 1 đoạn di chuyển: M15 ~50 pips, H1 ~100, H4 300–500."*
- 2024-09-06: *"Chỉ khi nào không còn GLP nào nữa mới khẳng định giá hoàn toàn giảm."*
- 2025-01-10: *"1 xu thế bị bẻ cả Main G thì xác nhận mất xu thế đó."*
- 2024-10-27: *"MMs đạt target và xác nhận chấm dứt xu thế → không bao giờ quay lại xu thế cũ khi chưa đạt target mới."*

### 7.1 Chuỗi domino giữa các khung

- 2025-05-02: *"Muốn triệt tiêu đà tăng của W phải làm D quay lại tăng trước; muốn D quay lại thì H4 phải quay lại trước."*
- 2025-06-27: *"Phá từ M1 lên dần M1 → M5 → M15 → H1 → H4 → D1 → W1 → MN = chuỗi domino; phân biệt khung nào đang đẩy
  lên, khung nào đang ép xuống."*
- 2025-11-05: *"Quá trình tạo G nâng từ khung nhỏ lên khung to, 1 sai sót là gãy."*

## 8. Target và điểm xoay

**Định nghĩa.** **Target** = LP khung lớn phía trước mà xu thế hiện tại đang đánh tới. **Điểm xoay** = nơi xu thế đạt
target và đổi chiều.

**Bản chất.** MM có kế hoạch A → B. Khi giá chưa tới B, mọi cú ngược chiều chỉ là **săn** (SHs) để lấy thêm hàng. Khi
tới B, MM chốt/đổi phe. → Biết target thì biết cú ngược nào là cơ hội vào theo, cú nào là đảo chiều thật.

**Dẫn chứng.**
- 2025-03-24: *"Theo ZO không có điểm bán chuẩn vì giá chưa chạm target; chạm High R rồi thì sell dí sell đuổi không sao;
  chưa confirm target mà thấy chững lại rồi sell = cờ bạc. **Ranh giới giữa trader và mộng mơ là biết mục tiêu là gì, lý do
  vào lệnh.**"*
- 2024-11-04: *"ZO trader có 2 lựa chọn: 1) đi theo xu thế khi giá chưa chạm mục tiêu, 2) đợi ở mục tiêu xây dựng vị thế
  theo MM."*
- 2025-03-05: *"Điểm xoay là điểm target của 1 trend; target là LP khung lớn nên có thể rất rộng → an toàn nhất là đợi nó
  xây cấu trúc xoay chiều rồi thử lệnh SL ngắn."*
- 2024-09-21: *"Xu thế hôm qua bẻ được nhiều High H4, mục tiêu bẻ D → giá không được phép giảm sâu dưới High D → buy được
  ở High D nhưng không sell được ở đâu."*

## 9. Khoảng trống (vùng trống)

**Định nghĩa.** Đoạn giá không có LP nào (của khung đang xét trở lên) giữa giá và LP tiếp theo.

**Bản chất.** Không LP = không có ai bảo vệ → giá đi nhanh qua đó. Ngược lại, LP đứng cạnh một khoảng trống lớn là
"điểm cuối" mà MM phải thủ tới cùng (mất nó là lộ cả khoảng trống).

**Dẫn chứng.**
- 2025-03-20: *"MM thích các điểm cuối cùng; những điểm cuối hay có khoảng trống; không bảo vệ thì thua lỗ rất lớn nên
  tận lực bảo vệ… trống càng lớn càng tốt."*
- 2025-03-21: *"Vùng trống 500 pips, LP gãy thì lộ 500 pips không còn gì bảo vệ."*
- 2024-08-30 (ZZZ): *"Đánh lúc có khoảng trống; lúc lực lượng cân nhau giáp lá cà nhảy vô dễ chết."*
- 2025-03-05: *"Cú lên rất nhanh không xây G phòng thủ thì khi sập đâu là nơi chống lại?"*

## 10. Nội chiến

**Định nghĩa.**
- Giá di chuyển **bên trong** một LP (đã G/R) mà không phá đầu nào; hoặc
- Hai LP đối nghịch áp sát nhau, không bên nào bị clear ("giáp lá cà").

**Bản chất.** Nội chiến là **hành vi ngăn giá thoát khỏi LP để thực hiện ý đồ clear nó** (Zerd 2024-07-26). Phe tấn công
cố lấy lại LP từ bên trong; phe thủ cố đẩy ra. Kết quả nội chiến quyết định xu thế tiếp theo.

**Dẫn chứng.**
- ZZZ 2024-01-19: *"Đoạn nội chiến thì đóng máy đi ngủ; LP lồng nhau không có range để chạy."*
- 2025-03-05: *"Còn là LP thì không có nội chiến, chỉ G hoặc R mới có."*
- 2024-10-07: *"Nội chiến W thì phải D tạo LP mới nội chiến được."*; 2024-09-13: *"Xem nội chiến thì xem H1 thấp nhất."*
- 2024-08-21: *"RLP D: lần đầu đánh vào bị đẩy xuống; lần 2 vào được bên trong, retest lại Low RLP làm bước đệm đánh thẳng lên High."*
- 2025-04-11: *"Nội chiến thành công là clear được LP đó hoặc ít nhất về được biên kia."*
- 2025-02-27: *"GLP D, giá ở High GLP D thì H4 xây RLP bao trùm High GLP D → điểm kháng đánh về Low GLP D."*
- 2024-07-26: *"Kèo nội chiến xác suất không cao, chỉ scalp."*

## 11. SHs — săn dừng lỗ

**Định nghĩa.** Cú chạy **ngược** hướng thật, nhanh, để kích hoạt SL/lệnh chờ của đám đông, rồi quay lại chạy theo kế hoạch.

**Bản chất.** MM cần thanh khoản đối ứng (file 01, mục 9). *"Vốn việc đi săn là để đi giết trader"* (2024-09-04).
Ví dụ Zerd (2024-01-12): *"MM muốn đẩy 5 → 10 thì giảm về 2 trước rồi tăng 1 mạch."*

**Dấu hiệu SHs** (Zerd 2025-04-22):
1. Build liên tục về hướng **ngược lại** (vd SHs lên nhưng toàn build ở đỉnh = đang điền short).
2. LP xây xong **bị phá ngay**.
3. Tốc độ nến nhanh bất thường.
4. **Không xây LP nào** ngăn giá quay lại (chạy lên không có G nào đỡ).

**Dẫn chứng.**
- 2025-04-22: *"SHs xong 100% sẽ run; khó là khi nào kết thúc; **điểm build short đầu tiên sẽ là target của run**."*
- 2025-04-29: *"Clear sạch G rồi run 1 mạch lên High R không G nào hỗ trợ = SHs."*
- 2025-04-16: *"Clear xong tạo R rồi đi thẳng → clear chỉ là SHs; clear xong tạo G làm base thì khác."*
- 2025-04-10: *"Lịch sử từng chứng kiến SHs rất sâu, cả tháng thậm chí nửa năm mới run."*
- 2025-06-19: *"Đã xác định xu thế rồi thì những quả flash sớm ở giai đoạn đầu đa phần là SHs — có mấy quả đó mới run mạnh."*
- 2024-09-23: *"Cú giảm mạnh chỉ xem là SHs, **trừ phi giảm mà không mở rộng mới là run**; SHs sẽ nhanh chóng quay về điểm trung lập."*
- 2025-11-05: *"Trước khi run profit, mục tiêu đầu tiên của MM là quét sạch SL, quét sạch BE."*

## 12. Tích luỹ và phân phối (kiến thức mở rộng 2026)

**Định nghĩa.**
- **Tích luỹ**: MM gom lệnh — giá chậm, nhiều nến 2 đầu, nhiều LP nhỏ, range hẹp.
- **Phân phối**: MM xả lệnh cho đám đông — giá giật, nhiễu, lên rồi bị dập.

**Bản chất.** Zerd (2026-03-04): *"Tăng: tích luỹ mua vào → để retail đẩy lên và xả dần (phân phối). Mua thì muốn đi
nhanh, nến đẩy cực đại; phân phối cần người đối ứng → chậm, giật, nhiễu; xong thì thả rơi tự do."*

**Cách phân biệt** (2026-02-25):
- Trong xu hướng giảm H4: nếu **cụm nến 2 đầu tập trung ở đáy** → tích luỹ → kích hoạt **đảo** trend.
  Nếu cụm 2 đầu tập trung **bên trong vùng nến H4** (giữa sóng) → phân phối lại → **nối** xu hướng.
- *"Phân phối dài hạn: lên rất mượt nhưng xuống gập ghềnh nhiều nến 2 đầu → MM không muốn giá giảm nhanh."*
- *"Tăng không vững, dễ bị dập = tăng để phân phối."*

**Dẫn chứng.**
- 2024-10-03: *"Tích luỹ sẽ tạo ra nhiều LP từ khung tích luỹ trở xuống; tích luỹ mà không tạo LP thì không gọi là tích luỹ."*
- 2025-04-09: *"Tích luỹ là góc nhìn ở 1 khung, SW là tích luỹ ở khung nhỏ hơn; **khung càng to run càng mạnh**."*
- 2025-04-10: *"Khi market tích luỹ ta không trade được, chỉ trade khi nó run; target do LP."*
- 2025-11-05: *"Pha vĩ mô là phân phối → canh đỉnh vùng; tích luỹ → canh đáy vùng; LP lập ra để xác định vùng đó là tích luỹ
  hay phân phối."*
- 2026-02-25: *"ZO mở rộng: cũ là LP, G, R, Main, Shield, Xu thế; mới là **gia tốc, nối xu hướng, tích luỹ, phân phối**;
  core mới là **cân bằng thanh khoản**."*

## 13. Túi thanh khoản và "MM như nam châm"

**Định nghĩa.** Mỗi chân hỗ trợ (G H4, các đáy cao dần) là một **túi lệnh** của phe mua (SL nằm ngay dưới).

**Bản chất.** Zerd (2026-03-02): *"Hành vi đỡ giá bằng G H4 → tạo túi thanh khoản dụ buy; sóng tăng ảo bằng các Low cao
dần, mỗi khi hồi lại nảy lên → buy FOMO nhưng không tăng mạnh → **bẫy**, không phải đảo chiều. **MM muốn đảo chiều không
cần test support nhiều lần, đi mạnh ngay.**"*

- 2026-03-03: *"MM xây túi thanh khoản rồi chạy giả hút thanh khoản; chạy quá xa retail tháo chốt → nên đi **dập dìu**
  trông hỗ trợ tốt để thêm người bu, câu giờ cho bên ngược nản; gom đủ thì rầm."*
- 2026-03-03 — **câu chí mạng**: *"MM muốn chạy thì đã chạy, không cần đắn đo; **chỉ có đang dụ người ta mới làm giá đắn
  đo chậm chạp**."*
- 2026-03-04: *"Market như nam châm: MM build dòng tiền cho retail FOMO; retail fomo buy → MM thả tay không bán → giá tăng."*
- 2026-03-05: *"RN cũng là điểm tạo túi thanh khoản."*

## 14. Vùng trung lập và 50%

- 2024-09-23: *"80% thời gian giá quay về điểm trung lập; giá tiệm cận Low (vùng mua) hoặc High (vùng bán) là vùng tốt tìm EP."*
- 2024-06-26: *"Đẩy về vùng trung tâm tranh chấp (50% của cả 2 cụm R và G)."*
- 2024-09-10: *"Giá luôn tìm về vùng trung lập để đợi — lý do trader hay tạch."*
- 2025-03-07: *"Trên dưới 50% không quan trọng bằng biết **giới hạn** chạy của nó: giới hạn của R là High, G là Low → rủi ro thấp nhất."*

## 15. Áp lực đa khung

- 2025-05-07: *"Luôn có 1 khung mà giá dựa vào để chạy theo áp lực hiện tại, tìm và theo nó. **Áp lực tăng cả 3 khung =
  tìm buy, giảm cả 3 = tìm sell, xen kẽ / không đoán được thì nghỉ**; M1 giải nghĩa đà của 2 khung to."*
- 2025-05-05: *"Nhìn M1 đoán M15, M15 đoán H4, M5 đoán H1."*
- 2025-04-15: *"H1 cấu trúc tăng, M15 cấu trúc giảm → giá quay lên quay xuống = thiên đường scalp."*
- 2025-06-27 (ZOM): *"M5 run up mà M1 chui dưới nến M5 làm áp lực M5 giảm + xoay → dấu hiệu sớm M5 sẽ giảm."*

## 16. Số tròn (RN)

- 2023-11-22: *"RN chỉ tốt trong những lần đánh đầu tiên; tìm RN ít bị đánh đi đánh lại; **nến đã close qua RN → RN hết giá
  trị**; lấy H4 làm gốc check RN."*
- 2025-04-17: *"Lần 3 là lần quyết định; market cho đúng 3 lần, quá 3 lần không được thì hay xoay."*
- 2025-05-06: *"Hồi lên RN rồi retest RN chậm dần, mất đà = điểm vào tối ưu quanh RN cho scalp."*

## 17. Ẩn dụ quân đội (ZZZ) — nhớ vai trò từng khung

| Khung | Đơn vị | Giữ |
|---|---|---|
| M1 | Lính | Vị trí |
| M5 | Tiểu đội | Lô cốt |
| M15 | Trung đội | Chiến hào |
| H1 | Đại đội | Doanh trại |
| H4 | Tiểu đoàn | **Thành trì** |
| D1 | Trung đoàn | Vùng miền |
| W1 | Sư đoàn | Quốc gia |

*"ZO trader = lính đánh thuê: theo bên đang thắng, sắp hết thắng thì chuồn"* (ZZZ 2023-11-20).
*"Chiếm đất đến đâu lập doanh trại đến đó: lều → trại → thành trì"* (ZZZ 2024-08-30) = LP khung nhỏ → khung lớn.

---

## Tóm tắt 1 trang

1. **LP** = nơi MM đặt lệnh. **G/R** = ai thắng. **Low G / High R** = nơi MM phải thủ tới cùng.
2. **BBR**: vào ở retest, không đuổi break.
3. **Main** = LP đã phá LP ngược → vua; **Shield** = hậu. Main còn → xu thế còn.
4. **Xu thế (LP) đi trước xu hướng (sóng).** Đánh theo xu thế, không cản tàu.
5. **Target** = LP khung lớn phía trước. Chưa tới target, cú ngược là SHs; tới target mới tìm đảo.
6. **Thu nến / nến 2 đầu** ở điểm cuối = tín hiệu lực yếu → vùng vào lệnh.
7. **Nội chiến, LP chồng, giữa hai LP, trước tin** = không có kèo.
8. **Tích luỹ ở đáy → đảo; ở giữa sóng → nối xu hướng.** MM đắn đo chậm chạp = đang dụ.
