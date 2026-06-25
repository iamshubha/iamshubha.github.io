export default function Footer({ settings }) {
  return (
    <footer className="site-footer">
      <p>
        {settings.name} - {new Date().getFullYear()}
      </p>
      <nav aria-label="Footer links">
        <a href={`mailto:${settings.email}`}>{settings.email}</a>
        {settings.githubUrl && <a href={settings.githubUrl}>GitHub</a>}
        {settings.linkedinUrl && <a href={settings.linkedinUrl}>LinkedIn</a>}
      </nav>
    </footer>
  );
}
