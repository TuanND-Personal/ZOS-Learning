# Công cụ MT4 — cài đặt (ghi chú kỹ thuật)

> Hướng dẫn sử dụng đầy đủ cho người dùng: `notes/03-huong-dan-su-dung-tool.md`.

| File | Loại | Công dụng |
|---|---|---|
| `MQL4/Scripts/ZO_Backtest/ZOS_Probe.mq4` | script | Xuất các buffer của ZOS ra CSV (xem `zos-buffers.md`) |
| `MQL4/Indicators/ZO_LP.mq4` | indicator | Ghi dữ liệu LP của khung chart (từ nến ZOS) vào file dùng chung; không vẽ, không cảnh báo |
| `MQL4/Indicators/ZO_View.mq4` | indicator | Hộp LP khung chart, nến đáng chú ý, đường LP H4 / D1 / W1, bảng phân tích |
| `MQL4/Experts/ZO_Analyst.mq4` | EA | Phân tích, tín hiệu hệ ZEAR2, nhắc BE / chốt phần giữ, gửi Telegram; tự đặt lệnh trên tài khoản demo |
| `MQL4/Indicators/ZO_Backtest/ZO_BTView.mq4` | indicator | Hiện lệnh backtest (mặc định hệ chính ZOFLEX) từ `zo_bt_overlay_<cặp>.csv`; bấm vào lệnh để xem lý do |
| `MQL4/Indicators/ZO_Backtest/ZO_Review.mq4` | indicator | Chart sạch (LP H4 / D1 / W1 dạng đường, LP M15 dạng hộp) để tự đánh dấu điểm vào |
| `MQL4/Scripts/ZO_Backtest/ZO_ExportMarks.mq4` | script | Xuất các mũi tên bạn đánh dấu ra `zo_marks_<cặp>.csv` |
| `MQL4/Include/ZO/ZoCore.mqh` | include | Logic LP dùng chung + tín hiệu MAIN-AB / PULLBACK (`ZoCheckTrendEntry`) |

Chỉ `ZO_Analyst` đặt lệnh: mặc định tự đặt trên tài khoản demo, tài khoản thật chỉ báo tín hiệu (`InpAllowRealAccount`). Hướng dẫn sử dụng: `mt4/docs/HUONG-DAN-SU-DUNG.md`.

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

Từ bản 5/10/2026, ZO_LP chỉ làm một việc: tính LP của khung chart nó đang chạy (từ nến ZOS, bằng `ZoCore.mqh`) và ghi vào
`Common\Files\zo_lp\<cặp>_<phút>.csv` mỗi khi có nến mới. Nó không vẽ, không cảnh báo, không đọc lệnh.

- EA `ZO_Analyst` mở và giữ một chart H4 có ZOS + ZO_LP (template `ZO_DATA`); với D1 / W1 nó mở chart vài chục giây khi dữ liệu
  cũ rồi đóng lại.
- ZO_View vẽ LP và tự ghi cùng file đó cho khung nó đang đứng, nên chart để nhìn không cần ZO_LP.
- Các việc trước đây ZO_LP làm (vẽ LP, cảnh báo RETEST / SETUP, gợi ý BE, kiểm tra lệnh, bản tin sáng) nay thuộc về ZO_View và
  ZO_Analyst.

## Telegram

EA `ZO_Analyst` gửi mọi tin qua Telegram (EA cũ `ZO_Notifier` đã bị gỡ). Cách thiết lập: mục 2 và 3 của
`HUONG-DAN-SU-DUNG.md`. Token bot nằm trong `MQL4/Include/ZO/ZoSecrets.mqh` (không đưa lên git).

Compile một file: `mt4/compile.sh Indicators/ZO_Backtest/ZO_BTView.mq4` (đường dẫn tính từ `mt4/MQL4`).
