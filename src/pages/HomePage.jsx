import { getPortfolioContent } from "../lib/content.js";

export default function HomePage() {
  const { settings } = getPortfolioContent();

  return (
    <main id="main">
      <p>{settings.roleSummary}</p>
      <h1>{settings.name}</h1>
      <h2>{settings.heroHeadline}</h2>
      <p>{settings.heroSubheadline}</p>
    </main>
  );
}
