// Direction: a cream record sleeve, a lime vinyl disc and real native product views.
// Audience: people with their own music server. Primary action: download the Mac app.
// Manrope, restrained motion, roomy editorial layout, ink/cream/lime brand tokens.
import Image from "next/image";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowUpRight,
  GithubLogo,
  Headphones,
  MusicNotes,
  ShieldCheck,
  Watch,
} from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";
import { MobileMenu, ScrollEffects } from "@/components/interactions";
import { asset, basePath, docs, download, faqs, repo } from "@/lib/site";

function DownloadButton({ secondary = false }: { secondary?: boolean }) {
  return (
    <Button asChild variant={secondary ? "secondary" : "default"}>
      <a href={download}>
        <ArrowDown size={20} weight="bold" aria-hidden="true" />
        Download for Mac
        <ArrowUpRight size={18} aria-hidden="true" />
      </a>
    </Button>
  );
}
export default function Home() {
  return (
    <>
      <header id="top" className="header">
        <a className="brand" href="#top" aria-label="Cadence home">
          <Image src={asset("mark.svg")} width={36} height={36} alt="" />
          <span>cadence</span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#experience">The experience</a>
          <a href="#compatibility">Compatibility</a>
          <a href="#questions">Questions</a>
        </nav>
        <a className="github-link" href={repo}>
          <GithubLogo size={20} aria-hidden="true" />
          <span>Open source</span>
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>
        <MobileMenu />
      </header>
      <main id="main">
        <section className="hero section-wrap" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="status-dot" />A little more room for your music
            </p>
            <h1 id="hero-title" className="heading-1">
              Your music.
              <br />
              Your own rhythm.
            </h1>
            <p className="hero-description body-3">
              A native home for your music on Mac, iPhone and Apple Watch.
              Connect your Aurral library. Find a favorite. Take it with you.
            </p>
            <div className="hero-action">
              <DownloadButton />
              <p className="caption-2">macOS 14+ · Apple Silicon & Intel</p>
            </div>
            <div className="hero-proof caption-1">
              <ShieldCheck size={18} aria-hidden="true" />
              Signed & notarized<span>·</span>Free & open source
            </div>
          </div>
          <div
            className="hero-art"
            aria-label="Cadence on iPhone and Apple Watch"
          >
            <div className="record" aria-hidden="true">
              <div className="record-ring" />
              <div className="record-label">
                <Image src={asset("mark.svg")} width={80} height={80} alt="" />
                <span>
                  GOOD MUSIC.
                  <br />A LITTLE ROOM TO MOVE.
                </span>
              </div>
            </div>
            <div className="phone">
              <Image
                src={asset("phone.png")}
                width={1206}
                height={2622}
                alt="Cadence iPhone demo library with the original Easy Miles album"
                priority
                sizes="(max-width: 700px) 210px, 240px"
              />
              <div className="phone-island" aria-hidden="true" />
            </div>
            <div className="watch">
              <Image
                src={asset("watch.png")}
                width={416}
                height={496}
                alt="Cadence Watch simulator with offline playback controls"
                priority
                sizes="160px"
              />
            </div>
            <div className="art-note caption-1">
              <span className="note-line" />
              From your desk
              <br />
              to your next easy mile.
            </div>
            <span className="disc-caption eyebrow" aria-hidden="true">
              SIDE A / YOUR EVERYDAY SOUNDTRACK
            </span>
          </div>
        </section>
        <div className="platform-strip section-wrap">
          <p className="caption-1">Made for the devices you already love.</p>
          <div className="platform-names">
            <span>Mac</span>
            <span>iPhone</span>
            <span>Apple Watch</span>
          </div>
          <a className="text-link caption-1" href="#experience">
            Find your rhythm
            <ArrowDownRight size={18} aria-hidden="true" />
          </a>
        </div>
        <section
          id="experience"
          className="experience section-wrap"
          aria-labelledby="experience-title"
        >
          <div className="section-heading reveal">
            <div>
              <p className="eyebrow">One library. More places to listen.</p>
              <h2 id="experience-title" className="heading-2">
                Feels right at home.
                <br />
                Goes where you do.
              </h2>
            </div>
            <p className="body-3">
              Built in SwiftUI for each device.
              <br />
              Because listening should feel natural.
            </p>
          </div>
          <article className="mac-feature reveal">
            <div className="feature-copy">
              <span className="device-label caption-1">
                <MusicNotes size={18} aria-hidden="true" />
                On your Mac
              </span>
              <h3 className="heading-3">
                Make a little <br />
                listening room.
              </h3>
              <p className="body-3">
                Your albums, favorites and playlists, with room to browse. A
                real Mac app with queue controls, downloads and system Now
                Playing.
              </p>
              <a className="text-link" href={`${docs}/SETUP.md`}>
                Meet your library
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            </div>
            <div className="mac-image">
              <Image
                src={asset("mac.png")}
                width={1200}
                height={800}
                alt="Cadence Mac demo showing the Listen library and Easy Miles album"
                sizes="(max-width: 700px) 90vw, 700px"
              />
            </div>
          </article>
          <div className="feature-pair">
            <article className="watch-feature reveal">
              <div>
                <span className="device-label caption-1">
                  <Watch size={18} aria-hidden="true" />
                  On your Apple Watch
                </span>
                <h3 className="heading-3">
                  A lighter way
                  <br />
                  to find your pace.
                </h3>
                <p className="body-3">
                  Prepare playlists on iPhone. Transfer verified audio to your
                  Watch. Keep your saved favorites close, with queue and Crown
                  volume controls.
                </p>
                <p className="caption-2">
                  Offline design implemented. Physical run acceptance pending.
                </p>
              </div>
              <div className="watch-pair">
                <Image
                  src={asset("watch-library.png")}
                  width={416}
                  height={496}
                  alt="Watch simulator showing saved playlists"
                  sizes="180px"
                />
                <Image
                  src={asset("watch.png")}
                  width={416}
                  height={496}
                  alt="Watch simulator showing the local player"
                  sizes="180px"
                />
              </div>
            </article>
            <article className="library-feature reveal">
              <Headphones size={40} weight="light" aria-hidden="true" />
              <h3 className="heading-3">
                Less searching.
                <br />
                More second listens.
              </h3>
              <p className="body-3">
                Browse your library, follow artists and bring Spotify playlists
                into Aurral. Missing audio has visible preparation progress, so
                you know what’s ready.
              </p>
              <div className="library-detail">
                <span className="album-mark">
                  <Image
                    src={asset("mark-lime.svg")}
                    width={52}
                    height={52}
                    alt=""
                  />
                </span>
                <span>
                  <strong className="title-3">Easy Miles</strong>
                  <small className="caption-2">
                    Cadence Sessions · Demo library
                  </small>
                </span>
                <span className="sample-label caption-2">Original audio</span>
              </div>
              <a className="text-link" href={`${docs}/LISTENING-AND-WATCH.md`}>
                A closer listen
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            </article>
          </div>
          <p className="image-note caption-2">
            Real app previews with original demo music. Mac and iPhone show
            earlier builds; Watch images show the 0.7.4 simulator. Images do not
            establish physical device acceptance.
          </p>
        </section>
        <section
          className="tagline-section section-wrap reveal"
          aria-label="Your library, your pace"
        >
          <p className="eyebrow">The good part is yours.</p>
          <p className="heading-1 tagline">
            {"Your library.".split(" ").map((word, i) => (
              <span className="tagline-word" key={i}>
                {word}{" "}
              </span>
            ))}
            <br />
            {"Your pace. Your Cadence.".split(" ").map((word, i) => (
              <span className="tagline-word" key={i}>
                {word}{" "}
              </span>
            ))}
          </p>
          <p className="body-3">
            No hosted account. No Cadence subscription.
            <br />
            Just a thoughtful player for the music you bring.
          </p>
        </section>
        <section
          id="setup"
          className="setup section-wrap"
          aria-labelledby="setup-title"
        >
          <div className="section-heading reveal">
            <div>
              <p className="eyebrow">From first open to first listen</p>
              <h2 id="setup-title" className="heading-2">
                Three steps.
                <br />
                Then press play.
              </h2>
            </div>
            <a className="text-link" href={`${docs}/SETUP.md`}>
              Read the setup guide
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
          <ol className="steps">
            <li className="reveal">
              <span className="step-number caption-1">01</span>
              <h3 className="heading-5">Make yourself at home.</h3>
              <p className="body-3">
                Download the Mac app and choose Explore demo. Three original
                clips let you try the library before connecting anything.
              </p>
            </li>
            <li className="reveal">
              <span className="step-number caption-1">02</span>
              <h3 className="heading-5">Bring your library.</h3>
              <p className="body-3">
                Enter your HTTPS Aurral address and account. Your server and
                sources supply the music; Cadence is your player.
              </p>
            </li>
            <li className="reveal">
              <span className="step-number caption-1">03</span>
              <h3 className="heading-5">Find your next favorite.</h3>
              <p className="body-3">
                Browse albums, make a queue or save downloads. With the paired
                iPhone app, prepare playlists for Apple Watch.
              </p>
            </li>
          </ol>
        </section>
        <section
          id="compatibility"
          className="compatibility section-wrap reveal"
          aria-labelledby="compatibility-title"
        >
          <div className="compatibility-intro">
            <p className="eyebrow">A good fit starts here</p>
            <h2 id="compatibility-title" className="heading-2">
              Your server.
              <br />
              Clear expectations.
            </h2>
            <p className="body-3">
              Cadence is built for Aurral, with partial Subsonic compatibility.
              It’s a music client for your own sources.
            </p>
            <a className="text-link" href={`${docs}/COMPATIBILITY.md`}>
              See verified compatibility
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
          <dl className="compatibility-list">
            {[
              [
                "Aurral",
                "The tested path",
                "Library playback, Discover, imports and preparation. Native API v1 and consumed v2 routes are covered.",
              ],
              [
                "Other Subsonic servers",
                "Partial · unverified",
                "Basic browsing and playback may work. Aurral’s native features require its own API.",
              ],
              [
                "Spotify",
                "Playlist import",
                "Import playlist metadata through Aurral. No direct Spotify audio streaming.",
              ],
              [
                "Apple catalog",
                "Metadata search",
                "Find songs, artists and albums. No Apple Music subscription playback.",
              ],
            ].map(([title, status, description]) => (
              <div key={title}>
                <dt className="title-2">
                  {title}
                  <span className="caption-1">{status}</span>
                </dt>
                <dd className="body-3">{description}</dd>
              </div>
            ))}
          </dl>
        </section>
        <section className="open-source section-wrap reveal">
          <div className="source-mark">
            <GithubLogo size={40} weight="light" aria-hidden="true" />
          </div>
          <div>
            <p className="eyebrow">Open by design</p>
            <h2 className="heading-3">
              Good music deserves
              <br />
              good company.
            </h2>
            <p className="body-3">
              Read the code. Report a rough edge. Make it your own.
              <br />
              Cadence is an early, independent project, licensed under MIT.
            </p>
          </div>
          <a className="text-link" href={repo}>
            Join us on GitHub
            <ArrowUpRight size={20} aria-hidden="true" />
          </a>
        </section>
        <section
          id="questions"
          className="faq section-wrap"
          aria-labelledby="faq-title"
        >
          <div className="section-heading reveal">
            <div>
              <p className="eyebrow">Before you press play</p>
              <h2 id="faq-title" className="heading-2">
                A few good questions.
              </h2>
            </div>
          </div>
          <div className="faq-list">
            {faqs.map(([question, answer]) => (
              <details key={question}>
                <summary className="title-2">
                  {question}
                  <span aria-hidden="true">+</span>
                </summary>
                <p className="body-3">{answer}</p>
              </details>
            ))}
          </div>
        </section>
        <section className="final-cta section-wrap reveal">
          <Image src={asset("mark.svg")} width={64} height={64} alt="" />
          <p className="eyebrow">A little room for your next favorite</p>
          <h2 className="heading-1">Find your rhythm.</h2>
          <p className="body-3">
            Start with the demo. Stay for the music you bring.
          </p>
          <DownloadButton />
          <p className="caption-2">
            Mac 0.7.2 (18) · Signed & notarized · macOS 14+
          </p>
          <p className="source-note caption-2">
            Latest source: 0.7.5 (21). iPhone and Watch: source builds or
            private beta.
            <br />
            No public TestFlight link.{" "}
            <a href={`${repo}/blob/main/CHANGELOG.md`}>
              See what’s new
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </p>
        </section>
      </main>
      <footer className="footer section-wrap">
        <a className="brand" href="#top" aria-label="Cadence home">
          <Image src={asset("mark.svg")} width={32} height={32} alt="" />
          <span>cadence</span>
        </a>
        <p className="caption-2">
          Your music. Your pace.
          <br />
          An independent, open source project.
        </p>
        <nav aria-label="Footer navigation">
          <a href={`${docs}/BUILDING.md`}>Build from source</a>
          <a href={`${basePath}/privacy/`}>Privacy</a>
          <a href={`${repo}/blob/main/LICENSE`}>License & terms</a>
          <a href={`${repo}/issues/new/choose`}>Get in touch</a>
        </nav>
        <p className="legal caption-2">
          Cadence is not affiliated with Apple, Spotify or Aurral. Bring your
          own server and authorized music sources.
        </p>
      </footer>
      <ScrollEffects />
    </>
  );
}
