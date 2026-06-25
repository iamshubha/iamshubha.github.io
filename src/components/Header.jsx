export default function Header({ settings }) {
  return (
    <header className="site-header">
      <a className="site-header__brand" href="#/">
        {settings.name}
      </a>
      <nav className="site-header__nav" aria-label="Primary navigation">
        <a href="#services">Services</a>
        <a href="#work">Work</a>
        <a href="#labs">Labs</a>
        <a href="#writing">Writing</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  );
}
