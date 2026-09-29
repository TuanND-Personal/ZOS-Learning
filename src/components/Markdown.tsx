import ReactMarkdown, { defaultUrlTransform } from 'react-markdown';
import { useEffect, useState } from 'react';
import { useVault } from '../lib/vault';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import GithubSlugger from 'github-slugger';
import { Link } from 'react-router-dom';
import { resolveMdLink } from '../content';

export function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/** Plain text of a Markdown heading, close enough to what rehype-slug sees. */
function headingText(md: string): string {
  return md
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[*_`]/g, '')
    .trim();
}

export interface TocItem {
  id: string;
  text: string;
}

/** Level-2 headings with the same ids rehype-slug gives them (it slugs every heading in order). */
export function toc(markdown: string): TocItem[] {
  const slugger = new GithubSlugger();
  const items: TocItem[] = [];
  let inFence = false;
  for (const line of markdown.split('\n')) {
    if (line.startsWith('```')) inFence = !inFence;
    if (inFence) continue;
    const m = line.match(/^(#{1,6})\s+(.*)$/);
    if (!m) continue;
    const text = headingText(m[2]);
    const id = slugger.slug(text);
    if (m[1].length === 2) items.push({ id, text });
  }
  return items;
}

const MEDIA = 'zos-media:';

function PrivateImage({ name, alt }: { name: string; alt: string }) {
  const vault = useVault();
  const [src, setSrc] = useState<string>();
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    let alive = true;
    vault
      .media(name)
      .then((url) => alive && setSrc(url))
      .catch(() => alive && setFailed(true));
    return () => {
      alive = false;
    };
  }, [vault, name]);
  if (failed) return <span className="img-missing">Không tải được ảnh ({alt}).</span>;
  if (!src) return <span className="img-loading">Đang giải mã ảnh…</span>;
  return (
    <a href={src} target="_blank" rel="noreferrer" className="zoom">
      <img src={src} alt={alt} loading="lazy" />
    </a>
  );
}

export default function Markdown({ text }: { text: string }) {
  return (
    <div className="md">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug]}
        urlTransform={(url) => (url.startsWith(MEDIA) ? url : defaultUrlTransform(url))}
        components={{
          a({ href = '', children }) {
            if (href.startsWith('#')) {
              return (
                <a href={href} onClick={(e) => (e.preventDefault(), scrollToId(decodeURIComponent(href.slice(1))))}>
                  {children}
                </a>
              );
            }
            const route = resolveMdLink(href);
            if (route) return <Link to={route}>{children}</Link>;
            return (
              <a href={href} target="_blank" rel="noreferrer">
                {children}
              </a>
            );
          },
          img({ src = '', alt = '' }) {
            if (src.startsWith(MEDIA)) return <PrivateImage name={src.slice(MEDIA.length)} alt={alt} />;
            return <img src={src} alt={alt} loading="lazy" />;
          },
          table({ children }) {
            return (
              <div className="table-wrap">
                <table>{children}</table>
              </div>
            );
          },
        }}
      >
        {text}
      </ReactMarkdown>
    </div>
  );
}
