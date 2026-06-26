import { ArrowUpRight, Download, Github, Linkedin, Mail } from "lucide-react";

import CountUp from "./CountUp.jsx";

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

function TerminalCard({ metrics = [] }) {
  if (!metrics.length) {
    return null;
  }

  return (
    <aside className="hero__terminal" aria-label="Selected impact metrics">
      <div className="hero__terminal-bar" aria-hidden="true">
        <span className="hero__terminal-dot" />
        <span className="hero__terminal-dot" />
        <span className="hero__terminal-dot" />
        <span className="hero__terminal-title">impact.sh</span>
      </div>
      <div className="hero__terminal-body">
        <p className="hero__terminal-cmd" aria-hidden="true">
          <span className="hero__terminal-prompt">$</span> measure --production
        </p>
        <dl>
          {metrics.map((metric) => (
            <div key={`${metric.value}-${metric.label}`}>
              <dd>
                <CountUp value={metric.value} />
              </dd>
              <dt>{metric.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </aside>
  );
}

export default function Hero({ settings }) {
  const primaryCta = settings.primaryCta;
  const secondaryCtas = settings.secondaryCtas || [];

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__content">
        <p className="hero__status">
          <span className="hero__status-dot" aria-hidden="true" />
          Available for new projects
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
      <TerminalCard metrics={settings.featuredMetrics} />
    </section>
  );
}
