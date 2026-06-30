import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import AboutSection from "../components/AboutSection.jsx";
import ExperienceTimeline from "../components/ExperienceTimeline.jsx";
import FeaturedProjects from "../components/FeaturedProjects.jsx";
import FinalCta from "../components/FinalCta.jsx";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import Hero from "../components/Hero.jsx";
import PreviewRail from "../components/PreviewRail.jsx";
import ProofStrip from "../components/ProofStrip.jsx";
import PublicProof from "../components/PublicProof.jsx";
import RoleFit from "../components/RoleFit.jsx";
import Services from "../components/Services.jsx";
import SkillMatrix from "../components/SkillMatrix.jsx";
import Testimonials from "../components/Testimonials.jsx";
import { getPortfolioContent } from "../lib/content.js";
import { prefersReducedMotion } from "../lib/hooks.js";
import { personSchema, useSeo, websiteSchema } from "../lib/seo.js";

export function getHomeNavItems({ articles, labs, projects, services, settings }) {
  return [
    settings?.roleFit?.title && settings?.roleFit?.signals?.length
      ? { id: "fit", label: "Fit" }
      : null,
    services?.length ? { id: "services", label: "Services" } : null,
    projects?.some((project) => project.featured) ? { id: "work", label: "Work" } : null,
    labs?.length ? { id: "labs", label: "Labs" } : null,
    articles?.length ? { id: "writing", label: "Writing" } : null,
    settings?.finalCta?.title && settings?.finalCta?.body
      ? { id: "contact", label: "Contact" }
      : null
  ].filter(Boolean);
}

export default function HomePage() {
  const location = useLocation();
  const content = getPortfolioContent();
  const {
    articles,
    certifications,
    experience,
    labs,
    projects,
    services,
    settings,
    skills,
    speaking,
    testimonials
  } = content;
  const navItems = getHomeNavItems({ articles, labs, projects, services, settings });

  const companies = experience.map((role) => role.company).filter(Boolean);
  const startYears = experience
    .map((role) => Number.parseInt(String(role.startDate).slice(0, 4), 10))
    .filter((year) => Number.isFinite(year));
  const earliestYear = startYears.length ? Math.min(...startYears) : null;
  const years = earliestYear ? new Date().getFullYear() - earliestYear : null;
  const profile = { years, companies };

  useSeo({
    title: settings.seoTitle,
    description: settings.seoDescription,
    path: "/",
    type: "website",
    jsonLd: [personSchema({ skills }), websiteSchema()]
  });

  useEffect(() => {
    if (!location.hash) {
      return;
    }

    const target = document.getElementById(location.hash.slice(1));

    if (target && typeof target.scrollIntoView === "function") {
      target.scrollIntoView();
    }
  }, [location.hash]);

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll(".home-page > section:not(.hero)")
    );

    if (!sections.length) {
      return undefined;
    }

    if (prefersReducedMotion() || typeof IntersectionObserver === "undefined") {
      sections.forEach((section) => section.classList.add("is-visible"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Header navItems={navItems} settings={settings} />
      <main id="main" className="home-page site-shell">
        <Hero settings={settings} profile={profile} />
        <ProofStrip metrics={settings.featuredMetrics} />
        <RoleFit roleFit={settings.roleFit} />
        <Services services={services} />
        <FeaturedProjects projects={projects} />
        <ExperienceTimeline experience={experience} />
        <SkillMatrix skills={skills} />
        <PreviewRail
          id="labs"
          eyebrow="Labs"
          title="Labs"
          summary="Implementation notes from operations-heavy backend systems, event platforms, and delivery work."
          items={labs}
          hrefForItem={(item) => `/labs/${item.slug}/`}
        />
        <PreviewRail
          id="writing"
          eyebrow="Writing"
          title="Writing"
          summary="Practical writing on forward deployed backend work, production systems, and operational tradeoffs."
          items={articles}
          hrefForItem={(item) => `/articles/${item.slug}/`}
        />
        <Testimonials testimonials={testimonials} />
        <PublicProof certifications={certifications} speaking={speaking} />
        <AboutSection about={settings.about} />
        <FinalCta settings={settings} />
      </main>
      <Footer settings={settings} />
    </>
  );
}
