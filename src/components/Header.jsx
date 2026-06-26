import { useEffect } from "react";

import { useScrollSpy } from "../lib/hooks.js";

function initials(name = "") {
  const parts = name.trim().split(/\s+/).filter(Boolean);

  if (!parts.length) {
    return "·";
  }

  return (parts[0][0] + (parts[1]?.[0] || "")).toUpperCase();
}

function ScrollProgress() {
  useEffect(() => {
    const bar = document.getElementById("scroll-progress");

    if (!bar) {
      return undefined;
    }

    const update = () => {
      const root = document.documentElement;
      const max = root.scrollHeight - root.clientHeight;
      const ratio = max > 0 ? Math.min(root.scrollTop / max, 1) : 0;
      bar.style.transform = `scaleX(${ratio})`;
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return <div id="scroll-progress" className="scroll-progress" aria-hidden="true" />;
}

export default function Header({ navItems = [], settings }) {
  const activeId = useScrollSpy(navItems.map((item) => item.id));
  const cta = settings?.primaryCta;

  return (
    <>
      <ScrollProgress />
      <header className="site-header">
        <a className="site-header__brand" href="#/">
          <span className="site-header__mark" aria-hidden="true">
            {initials(settings?.name)}
          </span>
          <span className="site-header__name">{settings?.name || "Home"}</span>
        </a>

        <nav className="site-header__nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a
              href={`#/#${item.id}`}
              key={item.id}
              className={activeId === item.id ? "is-active" : undefined}
              aria-current={activeId === item.id ? "true" : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {cta?.url && cta?.label && (
          <a className="site-header__cta" href={cta.url}>
            Book a Call
          </a>
        )}
      </header>
    </>
  );
}
