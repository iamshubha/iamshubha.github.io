import { ArrowUpRight, Download, Github, Linkedin, Mail } from "lucide-react";

function ctaIcon(url = "") {
  if (url.startsWith("mailto:")) {
    return Mail;
  }

  if (/\.pdf($|\?)/i.test(url)) {
    return Download;
  }

  return ArrowUpRight;
}

function SocialLinks({ settings }) {
  const links = [
    settings.githubUrl && { href: settings.githubUrl, label: "GitHub", Icon: Github },
    settings.linkedinUrl && {
      href: settings.linkedinUrl,
      label: "LinkedIn",
      Icon: Linkedin
    },
    settings.email && {
      href: `mailto:${settings.email}`,
      label: "Email",
      Icon: Mail
    }
  ].filter(Boolean);

  if (!links.length) {
    return null;
  }

  return (
    <ul className="hero__social" aria-label="Social links">
      {links.map(({ href, label, Icon }) => (
        <li key={label}>
          <a href={href} aria-label={label}>
            <Icon size={18} aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  );
}

function ProfileCard({ profile }) {
  const years = profile?.years;
  const companies = profile?.companies || [];

  if (!years && !companies.length) {
    return null;
  }

  return (
    <aside className="hero__card" aria-label="Experience at a glance">
      <div className="hero__instrument" aria-hidden="true">
        <span className="hero__instrument-node hero__instrument-node--one" />
        <span className="hero__instrument-node hero__instrument-node--two" />
        <span className="hero__instrument-node hero__instrument-node--three" />
        <span className="hero__instrument-line hero__instrument-line--one" />
        <span className="hero__instrument-line hero__instrument-line--two" />
        <span className="hero__instrument-line hero__instrument-line--three" />
      </div>
      {years ? (
        <div className="hero__card-highlight">
          <span className="hero__card-number">{years}+</span>
          <span className="hero__card-number-label">
            years building production backend &amp; cloud systems
          </span>
        </div>
      ) : null}

      {companies.length ? (
        <div className="hero__card-block">
          <p className="hero__card-label">Production environments</p>
          <ul className="hero__card-companies">
            {companies.map((company) => (
              <li key={company}>{company}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </aside>
  );
}

export default function Hero({ settings, profile }) {
  const primaryCta = settings.primaryCta;
  const secondaryCtas = settings.secondaryCtas || [];

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__content">
        <p className="hero__status">
          <span className="hero__status-dot" aria-hidden="true" />
          AI systems / backend / robotics-ready infrastructure
        </p>
        <p className="hero__role">{settings.roleSummary}</p>
        <h1 id="hero-title" className="hero__name">
          {settings.name}
        </h1>
        <h2 className="hero__headline">{settings.heroHeadline}</h2>
        <p className="hero__summary">{settings.heroSubheadline}</p>
        <div className="hero__ctas" aria-label="Primary actions">
          {primaryCta?.label && primaryCta?.url && (
            <a className="hero__cta hero__cta--primary" href={primaryCta.url}>
              {primaryCta.label}
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          )}
          {secondaryCtas
            .filter((cta) => cta.label && cta.url)
            .map((cta) => {
              const Icon = ctaIcon(cta.url);

              return (
                <a className="hero__cta hero__cta--secondary" href={cta.url} key={cta.url}>
                  {cta.label}
                  <Icon size={18} aria-hidden="true" />
                </a>
              );
            })}
        </div>
        <SocialLinks settings={settings} />
      </div>
      <ProfileCard profile={profile} />
    </section>
  );
}
