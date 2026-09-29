# Công cụ MT4 — cài đặt (ghi chú kỹ thuật)

> Hướng dẫn sử dụng đầy đủ cho người dùng: `notes/03-huong-dan-su-dung-tool.md`.

| File | Loại | Công dụng |
|---|---|---|
| `MQL4/Scripts/ZOS_Probe.mq4` | script | Xuất các buffer của ZOS ra CSV (xem `zos-buffers.md`) |
| `MQL4/Indicators/ZO_LP.mq4` | indicator | Tìm LP từ nến Build của ZOS, theo dõi trạng thái, cảnh báo |
| `MQL4/Experts/ZO_Notifier.mq4` | EA | Gửi cảnh báo của ZO_LP tới Telegram / Discord |

Không file nào đặt lệnh.

## Compile (Linux, Wine)

MT4 nằm trong Wine prefix `~/.mt4`. Copy source vào thư mục dữ liệu của terminal rồi compile:

```sh
D=~/.mt4/drive_c/users/$USER/AppData/Roaming/MetaQuotes/Terminal/50CA3DFB510CC5A8F28B48D1BF2A5702
W='C:\users\'$USER'\AppData\Roaming\MetaQuotes\Terminal\50CA3DFB510CC5A8F28B48D1BF2A5702\MQL4'
cp mt4/MQL4/Indicators/ZO_LP.mq4 "$D/MQL4/Indicators/"
cd ~/.mt4/drive_c/Program\ Files\ \(x86\)/MetaTrader\ 4
WINEPREFIX=~/.mt4 wine metaeditor.exe /compile:"$W\Indicators\ZO_LP.mq4" /log:"C:\users\\$USER\compile.log" /inc:"$W"
```

Trên Windows: copy các file `.ex4` đã compile vào đúng các thư mục `MQL4/...` của terminal bên đó.

Source được lưu dạng **UTF-8 có BOM** để MetaEditor giữ nguyên các chuỗi cảnh báo tiếng Việt. Khi sửa file
phải giữ BOM, nếu mất BOM chữ có dấu sẽ bị lỗi.

## ZO_LP

Gắn vào chart đã có ZOS. LP của khung chart được vẽ thành hình chữ nhật; LP của các khung cao hơn (trong
`InpTimeframes`) vẽ thành hai đường `H-<loại>-<khung> <ngày>` và `L-<loại>-<khung> <ngày>`, với loại là
`LP` (chưa break), `GLP`, `RLP`, `MGLP` hoặc `MRLP` (Main).

Kiểu đường: liền = đang chờ retest / đang retest, gạch = đã retest và chạy đi (RUN), chấm = chưa break.

Ở mỗi khung, các LP cùng chiều chồng lên nhau được rút lại còn vùng quan trọng nhất
(Main > tựa lưng vào LP khung lớn > cụm nhiều nến Build > trạng thái > ít lần retest > mới hơn), sau đó hiện
`InpMaxZonesPerTf` vùng gần giá nhất; Main hiện tại của mỗi chiều luôn được hiện.

Bảng thông tin hiện, cho từng khung, màu ZOS của nến vừa đóng và xu thế theo cấu trúc LP (phe đã làm chết LP
gần nhất: RLP bị clear → UP, GLP bị clear → DOWN).

Cảnh báo (tiếng Việt):

- giá đi vào LP đã break, nến đóng trong vùng (RETEST), có Main mới;
- SETUP BUY/SELL (LP khung nhỏ break bên trong LP khung lớn đang retest) kèm plan: EP ở 50% LP nhỏ, SL cách
  mép `InpSlBufferPips`, TP ở LP ngược chiều gần nhất, RR, và cảnh báo khi RR < `InpMinRR` hoặc ngược xu thế
  LP của `InpTrendTf`;
- gợi ý dời BE: khi có LP `InpBeTf` mới cùng chiều với lệnh đang mở, dời SL ra ngoài mép của nó
  `InpBeBufferPips`;
- kiểm tra lệnh: lệnh mới mở được đối chiếu với các lỗi Zerd hay nhắc (vào trong LP chưa break, sai nửa vùng,
  không có LP, ngược xu thế LP, SL chưa đặt hoặc nằm trong LP).

Indicator chỉ đọc lệnh, không bao giờ mở, sửa hay đóng lệnh.

## ZO_Notifier (Telegram / Discord)

Indicator không được gửi request HTTP, nên ZO_LP ghi mỗi cảnh báo thành một file trong
`Common\Files\zo_alerts\` (UTF-16) và EA này đọc rồi gửi đi. Chỉ gắn vào **một** chart.

1. Tools → Options → Expert Advisors → tick "Allow WebRequest for listed URL" và thêm
   `https://api.telegram.org` và/hoặc `https://discord.com`.
2. Telegram: tạo bot bằng @BotFather (lấy token), bấm Start với bot, lấy chat id (@userinfobot hoặc
   `https://api.telegram.org/bot<token>/getUpdates`).
3. Discord: cài đặt kênh → Tích hợp → Webhook → Webhook mới → sao chép URL.
4. Gắn `ZO_Notifier` vào một chart bất kỳ, điền inputs (hoặc Load file preset `.set`). EA gửi tin thử khi khởi động.
