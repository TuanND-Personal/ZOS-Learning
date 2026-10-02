// Page registry. Public pages are bundled as Markdown; private pages ship only encrypted
// (src/generated/private.enc.json) and are decrypted in the browser after unlocking.

export type Section = 'hoc' | 'cong-cu' | 'discord';

export interface DocMeta {
  section: Section;
  slug: string;
  title: string;
  summary: string;
  /** Source file name, used to resolve links written between the Markdown files. */
  sourceName: string;
  isPrivate?: boolean;
}

const publicFiles = import.meta.glob('../content/public/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

export const SECTIONS: { id: Section; title: string }[] = [
  { id: 'hoc', title: 'Bài đọc' },
  { id: 'cong-cu', title: 'Công cụ MT4' },
  { id: 'discord', title: 'Discord (riêng tư)' },
];

export const DOCS: DocMeta[] = [
  { section: 'hoc', slug: 'lo-trinh', sourceName: 'README.md', title: 'Lộ trình học', summary: 'Đọc theo thứ tự nào, ký hiệu dùng trong tài liệu' },
  { section: 'hoc', slug: '00-zo-system-tong-quan', sourceName: '01-zo-system-tong-quan.md', title: 'Tổng quan ZO System', summary: 'Bức tranh chung cho người mới' },
  { section: 'hoc', slug: '01-nen-tang-trading', sourceName: '01-nen-tang-trading.md', title: '01 · Nền tảng trading', summary: 'Pip, lot, SL/TP/RR, cấu trúc giá, phiên, tin, MM và thanh khoản' },
  { section: 'hoc', slug: '02-pvsra-cot-loi', sourceName: '02-pvsra-cot-loi.md', title: '02 · PVSRA cốt lõi', summary: 'Gốc của ZO: đọc MM qua giá, khối lượng, S&R' },
  { section: 'hoc', slug: '03-zos-khai-niem', sourceName: '03-zos-khai-niem.md', title: '03 · Khái niệm ZOS', summary: 'LP, G/R, BBR, Main/Shield, xu thế, nội chiến, SHs, tích luỹ/phân phối' },
  { section: 'hoc', slug: '05-bo-quy-tac', sourceName: '05-bo-quy-tac.md', title: '05 · Bộ quy tắc', summary: '20 quy tắc kèm bản chất và dẫn chứng, quy trình 1 phiên' },
  { section: 'hoc', slug: '06-danh-sach-case-lp', sourceName: '06-danh-sach-case-lp.md', title: '06 · Danh sách tình huống LP', summary: 'Mọi case LP để tự điền cách xử lý, dùng cho backtest' },
  { section: 'hoc', slug: '07-tam-ly-quan-ly-von', sourceName: '07-tam-ly-quan-ly-von.md', title: '07 · Tâm lý & quản lý vốn', summary: 'FOMO, không chờ retest, plan T, lot, mục tiêu thực tế' },
  { section: 'hoc', slug: '08-danh-muc-case-vao-lenh', sourceName: '08-danh-muc-case-vao-lenh.md', title: '08 · Case vào lệnh H4 → M15', summary: '101 tình huống giá vs LP kèm đề xuất xử lý, setup chính và biến thể để backtest' },
  { section: 'hoc', slug: '09-ban-chat-nen-zo', sourceName: '09-ban-chat-nen-zo.md', title: '09 · Bản chất nến ZO', summary: 'Nến ZOS được tính thế nào; râu = lực kéo, thân = áp lực, màu = trạng thái' },
  { section: 'hoc', slug: '10-bo-quy-tac-zear2', sourceName: '10-bo-quy-tac-zear2.md', title: '10 · Bộ quy tắc vào lệnh (hệ chính ZO-FLEX)', summary: 'Bộ quy tắc đang dùng thật: bias, LP, ba kiểu vào lệnh, khi nào không vào, SL / TP, quản lý — kèm cơ sở backtest' },
  { section: 'hoc', slug: '11-ket-qua-nghien-cuu-backtest', sourceName: '11-ket-qua-nghien-cuu-backtest.md', title: '11 · Tổng kết nghiên cứu backtest', summary: 'Hơn 30 vòng backtest: cái gì có tác dụng, cái gì không, vốn và rủi ro' },
  { section: 'cong-cu', slug: 'huong-dan-su-dung', sourceName: 'HUONG-DAN-SU-DUNG.md', title: 'Hướng dẫn sử dụng (bản mới)', summary: 'Cài trên Windows, thiết lập lần đầu, dùng hằng ngày, từng tool, đọc tin nhắn EA, tự đặt lệnh' },
  { section: 'cong-cu', slug: 'giai-thich-thuat-toan', sourceName: 'GIAI-THICH-THUAT-TOAN.md', title: 'Giải thích thuật toán', summary: 'Tool tìm LP, Main / Shield, tín hiệu, SL / TP, giữ lệnh và backtest như thế nào' },
  { section: 'cong-cu', slug: '03-huong-dan-su-dung-tool', sourceName: '03-huong-dan-su-dung-tool.md', title: 'Hướng dẫn dùng tool (bản cũ, chi tiết ZO_LP)', summary: 'ZO_LP, ZO_View: đọc chart, nhãn, cảnh báo, thông số; lịch sử các hệ' },
  { section: 'cong-cu', slug: '02-huong-dan-telegram-discord', sourceName: '02-huong-dan-telegram-discord.md', title: 'Tạo bot Telegram / webhook Discord', summary: 'Làm trên điện thoại, lấy token và chat id' },
  { section: 'cong-cu', slug: 'ky-thuat-setup', sourceName: 'setup.md', title: 'Ghi chú kỹ thuật', summary: 'Compile, thư mục MT4, Wine' },
  { section: 'cong-cu', slug: 'zos-buffers', sourceName: 'zos-buffers.md', title: 'Bảng buffer ZOS', summary: 'Dữ liệu ZOS đọc qua iCustom' },
  { section: 'discord', slug: 'bai-hoc-thuc-te', sourceName: '04-bai-hoc-thuc-te.md', title: '04 · Bài học thực chiến', summary: 'Trích Discord có ngày + sách PVSRA, xếp theo tình huống', isPrivate: true },
  { section: 'discord', slug: 'minh-hoa-case', sourceName: 'minh-hoa-case.md', title: 'Minh hoạ case (ảnh Discord)', summary: 'Chart của Zerd / ZZZ / Zonal ghép với các case vào lệnh H4 → M15', isPrivate: true },
  { section: 'discord', slug: 'tong-ket-tool', sourceName: '04-tong-ket-tool.md', title: 'Cơ sở logic của tool', summary: 'Vì sao tool vẽ / cảnh báo như vậy, kèm trích dẫn Discord', isPrivate: true },
  { section: 'discord', slug: 'ghi-chep-goc', sourceName: 'notes_quotes.md', title: 'Ghi chép nghiên cứu gốc', summary: 'Toàn bộ trích dẫn theo thời gian 11/2023 → 09/2026', isPrivate: true },
];

const publicBySlug: Record<string, string> = {};
for (const [path, text] of Object.entries(publicFiles)) {
  const name = path.split('/').pop()!.replace(/\.md$/, '');
  publicBySlug[name === 'README' ? 'lo-trinh' : name] = text;
}

export function publicText(slug: string): string | undefined {
  return publicBySlug[slug];
}

export function findDoc(section: string | undefined, slug: string | undefined): DocMeta | undefined {
  return DOCS.find((d) => d.section === section && d.slug === slug);
}

export function docPath(d: DocMeta): string {
  return `/${d.section}/${d.slug}`;
}

/** Route for a link like "05-bo-quy-tac.md#muc" written inside a Markdown file, or undefined. */
export function resolveMdLink(href: string): string | undefined {
  const [file, hash] = href.split('#');
  if (!file.endsWith('.md')) return undefined;
  const base = file.split('/').pop()!;
  const doc = DOCS.find((d) => d.sourceName === base);
  if (!doc) return undefined;
  return docPath(doc) + (hash ? `?h=${encodeURIComponent(hash)}` : '');
}
