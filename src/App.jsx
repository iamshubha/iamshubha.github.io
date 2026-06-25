import { HashRouter, Route, Routes } from "react-router-dom";

import ArticlePage from "./pages/ArticlePage.jsx";
import HomePage from "./pages/HomePage.jsx";
import LabPage from "./pages/LabPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import ProjectPage from "./pages/ProjectPage.jsx";

export default function App() {
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
