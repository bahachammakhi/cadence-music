import { basePath } from "@/lib/site";
export default function NotFound() {
  return (
    <main className="not-found">
      <p className="eyebrow">Cadence · 404</p>
      <h1 className="heading-1">A little off track.</h1>
      <p className="body-3">
        This page isn’t here. Let’s get you back to the music.
      </p>
      <a className="button button-primary button-md" href={`${basePath}/`}>
        Back to Cadence
      </a>
    </main>
  );
}
