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
import Services from "../components/Services.jsx";
import SkillMatrix from "../components/SkillMatrix.jsx";
import Testimonials from "../components/Testimonials.jsx";
import { getPortfolioContent } from "../lib/content.js";

export function getHomeNavItems({ articles, labs, projects, services, settings }) {
  return [
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

  useEffect(() => {
    if (!location.hash) {
      return;
    }

    const target = document.getElementById(location.hash.slice(1));

    if (target && typeof target.scrollIntoView === "function") {
      target.scrollIntoView();
    }
  }, [location.hash]);

  return (
    <>
      <Header navItems={navItems} settings={settings} />
      <main id="main" className="home-page site-shell">
        <Hero settings={settings} />
        <ProofStrip metrics={settings.featuredMetrics} />
        <Services services={services} />
        <FeaturedProjects projects={projects} />
        <ExperienceTimeline experience={experience} />
        <SkillMatrix skills={skills} />
        <PreviewRail
          id="labs"
          eyebrow="Labs"
          title="Labs"
          summary="Current notes and experiments around backend systems, automation, and robotics-ready infrastructure."
          items={labs}
          hrefForItem={(item) => `#/labs/${item.slug}`}
        />
        <PreviewRail
          id="writing"
          eyebrow="Writing"
          title="Writing"
          summary="Practical writing on production backend engineering, AI-aware systems, and operational tradeoffs."
          items={articles}
          hrefForItem={(item) => `#/articles/${item.slug}`}
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
