import { useEffect } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";

import ArticlePage from "./pages/ArticlePage.jsx";
import HomePage from "./pages/HomePage.jsx";
import LabPage from "./pages/LabPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import ProjectPage from "./pages/ProjectPage.jsx";
import { getPortfolioContent } from "./lib/content.js";

function upsertMeta(name, content) {
  if (!content) {
    return;
  }

  let meta = document.querySelector(`meta[name="${name}"]`);

  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("name", name);
    document.head.appendChild(meta);
  }

  meta.setAttribute("content", content);
}

export default function App() {
  const { settings } = getPortfolioContent();

  useEffect(() => {
    if (settings.seoTitle) {
      document.title = settings.seoTitle;
    }

    upsertMeta("description", settings.seoDescription);
    upsertMeta("theme-color", settings.themeColor);
  }, [settings.seoDescription, settings.seoTitle, settings.themeColor]);

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects/:slug" element={<ProjectPage />} />
        <Route path="/articles/:slug" element={<ArticlePage />} />
        <Route path="/labs/:slug" element={<LabPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </HashRouter>
  );
}
