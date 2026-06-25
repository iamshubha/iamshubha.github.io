import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <main id="main" aria-labelledby="not-found-heading">
      <p>404</p>
      <h1 id="not-found-heading">Page not found</h1>
      <p>The page you requested could not be found.</p>
      <Link to="/">Back home</Link>
    </main>
  );
}
