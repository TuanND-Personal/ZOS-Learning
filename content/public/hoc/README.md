# Nghiên cứu ZOS — hệ thống kiến thức để hiểu bản chất

Thư mục này tổng hợp **toàn bộ** lịch sử kênh Discord ZO (80.928 tin nhắn, 11/2023 → 09/2026, đã đọc hết 964
đoạn giảng của Zerd / ZZZ / Zonal) và sách **PVSRA** (130 trang, đọc hết). Mục tiêu không phải thuộc "setup", mà là
**hiểu vì sao** — để khi thị trường làm khác mẫu, bạn vẫn suy luận được.

> Zerd (2023-12-29): *"ZO là system dùng để đọc MM… dùng máy móc break lên buy, break xuống sell sẽ mất khả năng suy luận."*

## Lộ trình đọc

| # | File | Nội dung | Khi nào đọc |
|---|---|---|---|
| 1 | [01-nen-tang-trading.md](01-nen-tang-trading.md) | Nến, pip/lot, SL/TP/RR, cấu trúc giá, phiên, tin tức, MM vs retail, thanh khoản | Đọc đầu tiên |
| 2 | [02-pvsra-cot-loi.md](02-pvsra-cot-loi.md) | PVSRA — "gốc" của ZO: đọc MM qua giá + khối lượng + S&R | Sau file 1 |
| 3 | [03-zos-khai-niem.md](03-zos-khai-niem.md) | Toàn bộ khái niệm ZOS: nến màu, build, LP, G/R, BBR, Main/Shield, xu thế, nội chiến, SHs, tích luỹ/phân phối, túi thanh khoản… | Trọng tâm — đọc nhiều lần |
| 4 | [04-bai-hoc-thuc-te.md](04-bai-hoc-thuc-te.md) | Bài học thực chiến trích từ Discord (có ngày) + sách PVSRA, xếp theo chủ đề | Đọc song song khi xem chart |
| 5 | [05-bo-quy-tac.md](05-bo-quy-tac.md) | Bộ quy tắc giao dịch — mỗi quy tắc kèm **bản chất** (vì sao đúng) và **dẫn chứng** | Trước mỗi phiên |
| 6 | [06-danh-sach-case-lp.md](06-danh-sach-case-lp.md) | Liệt kê mọi tình huống LP có thể gặp — **bạn điền cách xử lý** → dùng để backtest sau | Để bạn tự quyết |
| 7 | [07-tam-ly-quan-ly-von.md](07-tam-ly-quan-ly-von.md) | Tâm lý, plan T, quản lý lot/BE, lỗi hay gặp (FOMO, cản tàu, không dám vào) | Khi đang thua / đang FOMO |

## Ký hiệu dùng trong tài liệu

| Ký hiệu | Nghĩa |
|---|---|
| **MM** | Market Maker — tổ chức đủ lớn để di chuyển giá |
| **SM** | Smart Money — lớp "lái giá" hằng ngày theo kế hoạch của MM (Zerd: *"MM tạo main, SM tạo shield"*) |
| **LP** | Liquidity Pool — vùng thanh khoản (vùng MM đẩy khối lượng) |
| **GLP / G** | LP xanh — bên mua thắng (ZOS đóng trên LP) |
| **RLP / R** | LP đỏ — bên bán thắng (ZOS đóng dưới LP) |
| **MLP / Main** | LP chính — LP đã *clear* được LP ngược chiều cùng khung |
| **BBR** | Build → Break → Retest |
| **SHs** | Stop-loss Hunts — săn dừng lỗ |
| **SW** | Sideway — đi ngang |
| **RN** | Round Number — số tròn (1.1000, 1.1050…) |
| **EP** | Entry Point — điểm vào lệnh |
| **BE** | Break-even — dời SL về giá vào |
| **HRW / LGD…** | High của R khung W / Low của G khung D … |

## Nguồn

- Discord `zo-doraemon.json`: trích dẫn giữ nguyên ý, rút gọn câu chữ; ngày ghi dạng `YYYY-MM-DD`.
- `PVSRA.pdf` (Traderathome/"TAH", hệ Sonic R).
- Wiki: https://docs.kythuatforex.com (Zerd: *"wiki thì tuyệt đối đúng; hỏi phải chọn lọc"* — 2025-05-30).

> Lưu ý của ZZZ (2025-04-25): *"Các 'kinh nghiệm' của Zerd có thể đúng lâu dài hoặc chỉ đúng gần đây; nhớ rồi áp
> dụng máy móc là toác."* — Tài liệu này ưu tiên **nguyên lý lặp lại nhiều năm**, và đánh dấu rõ cái gì chỉ là
> kinh nghiệm tình huống.
