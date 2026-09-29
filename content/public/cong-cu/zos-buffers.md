# Indicator ZOS — bảng buffer

Dò ngược ngày 2026-09-28 bằng script `MQL4/Scripts/ZOS_Probe.mq4` (EURUSD, demo XM, MT4 build 1470).
File `ZOS.ex4` đã bị mã hoá, nên bảng này được suy ra từ dữ liệu `iCustom()` khi indicator chạy, kết hợp với
màu của từng buffer lưu trong `templates/ZOTheme.tpl`.

| Buffer | Ý nghĩa | Ghi chú |
|---|---|---|
| 0 | **High** của nến ZOS | histogram râu nến (cặp 0/1), màu `Color_Wick` |
| 1 | **Low** của nến ZOS | vài nến đầu tiên được tính có giá trị rác (< 0.9) |
| 2 | **Open** của nến ZOS | |
| 3 | **Close** của nến ZOS | |
| 4 / 5 | Thân **xanh lá** — xu hướng tăng mạnh | `Color_Bullish_Strong_Long/Short` |
| 6 / 7 | Thân **xanh dương** — hồi trong xu hướng tăng / bắt đầu tăng | `Color_Bullish_Weak_Long/Short` |
| 8 / 9 | Thân **đỏ** — xu hướng giảm mạnh | `Color_Bearish_Strong_Long/Short` |
| 10 / 11 | Thân **hồng / tím** — hồi trong xu hướng giảm / bắt đầu giảm | `Color_Bearish_Weak_Long/Short` |
| 12 / 13 | Thân **vàng** — nến Build | `Color_ZOCB_Build` |
| 14 | **Cờ Build**: `1.0` với nến Build, `0.0` với nến thường | luôn khớp với cặp 12/13 |

Mỗi cặp thân nến là một histogram 2 buffer của MT4: buffer thứ nhất chứa giá close của ZOS, buffer thứ hai
chứa giá open. Màu "Long" (sáng) hiện khi close > open, màu "Short" (đậm) khi close < open. Trên mỗi nến hợp lệ
chỉ có đúng một cặp có giá trị, các cặp còn lại là `EMPTY_VALUE`.

## Nhận xét

- ZOS chỉ tính một đoạn lịch sử giới hạn: khoảng 500 nến H4 hợp lệ, còn H1/M15 thì đủ 2000 nến đã yêu cầu.
  Các nến nằm ngoài đoạn đó trả về `0.0` ở mọi buffer.
- Một nến là hợp lệ khi `b1 > 0` và `b1 <= min(b2,b3) <= max(b2,b3) <= b0`.
- Râu nến ZOS dài hơn nến thật: trên H4, High của ZOS trung bình cao hơn High thật 36 point, Low của ZOS thấp
  hơn Low thật 82 point.
- Khoảng 70% nến Build có râu ở cả hai đầu (điều kiện trong wiki để thành vùng thanh khoản hợp lệ).
