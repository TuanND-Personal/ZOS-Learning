import { useEffect, useMemo } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { DOCS, docPath, findDoc, publicText, type Section } from '../content';
import { useVault } from '../lib/vault';
import Markdown, { scrollToId, toc } from '../components/Markdown';
import UnlockPanel from '../components/UnlockPanel';

export default function DocPage(props: { section?: Section; slug?: string }) {
  const params = useParams();
  const [search] = useSearchParams();
  const doc = findDoc(props.section ?? params.section, props.slug ?? params.slug);
  const vault = useVault();
  const text = doc ? (doc.isPrivate ? vault.docs[doc.slug] : publicText(doc.slug)) : undefined;
  const items = useMemo(() => (text ? toc(text) : []), [text]);

  const target = search.get('h');
  useEffect(() => {
    if (text && target) setTimeout(() => scrollToId(target), 50);
  }, [text, target]);

  if (!doc) return <p>Không tìm thấy trang.</p>;
  if (doc.isPrivate && !vault.unlocked) return <UnlockPanel />;
  if (!text) return <p>Chưa có nội dung.</p>;

  const siblings = DOCS.filter((d) => d.section === doc.section);
  const idx = siblings.indexOf(doc);
  const prev = siblings[idx - 1];
  const next = siblings[idx + 1];

  return (
    <div className="doc">
      <article>
        <Markdown text={text} />
        <div className="pager">
          {prev ? <Link to={docPath(prev)}>← {prev.title}</Link> : <span />}
          {next ? <Link to={docPath(next)}>{next.title} →</Link> : <span />}
        </div>
      </article>
      {items.length > 2 && (
        <aside className="toc">
          <div className="toc-title">Trong trang</div>
          {items.map((i) => (
            <a key={i.id} href={`#${i.id}`} onClick={(e) => (e.preventDefault(), scrollToId(i.id))}>
              {i.text}
            </a>
          ))}
        </aside>
      )}
    </div>
  );
}
