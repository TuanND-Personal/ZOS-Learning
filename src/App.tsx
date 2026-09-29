import { useEffect, useState } from 'react';
import { NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { DOCS, SECTIONS, docPath } from './content';
import { useVault } from './lib/vault';
import Home from './pages/Home';
import DocPage from './pages/DocPage';
import ToolsPage from './pages/ToolsPage';
import DiscordPage from './pages/DiscordPage';

export default function App() {
  const { pathname } = useLocation();
  const { unlocked } = useVault();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="shell">
      <header className="topbar">
        <button className="menu-btn" aria-label="Mở menu" onClick={() => setMenuOpen((o) => !o)}>
          ☰
        </button>
        <NavLink to="/" className="brand">
          <span className="logo">ZO</span> ZOS Learning
        </NavLink>
      </header>
      <nav className={`sidebar ${menuOpen ? 'open' : ''}`}>
        <NavLink to="/" end className="nav-home">
          Trang chủ
        </NavLink>
        {SECTIONS.map((s) => (
          <div key={s.id} className="nav-group">
            <NavLink to={`/${s.id}`} end className="nav-title">
              {s.title}
              {s.id === 'discord' && <span className="lock">{unlocked ? '🔓' : '🔒'}</span>}
            </NavLink>
            {DOCS.filter((d) => d.section === s.id).map((d) => (
              <NavLink key={d.slug} to={docPath(d)} className="nav-item">
                {d.title}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hoc" element={<DocPage section="hoc" slug="lo-trinh" />} />
          <Route path="/cong-cu" element={<ToolsPage />} />
          <Route path="/discord" element={<DiscordPage />} />
          <Route path="/:section/:slug" element={<DocPage />} />
          <Route path="*" element={<p>Không tìm thấy trang.</p>} />
        </Routes>
      </main>
    </div>
  );
}
