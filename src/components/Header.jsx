export default function Header({ navItems = [], settings }) {
  return (
    <header className="site-header">
      <a className="site-header__brand" href="#/">
        {settings.name || "Home"}
      </a>
      <nav className="site-header__nav" aria-label="Primary navigation">
        {navItems.map((item) => (
          <a href={`#/#${item.id}`} key={item.id}>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
