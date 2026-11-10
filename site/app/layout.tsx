import type { Metadata } from "next";
import "@fontsource-variable/manrope";
import "./globals.css";
import { asset, siteUrl } from "@/lib/site";
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Cadence — Your music. Your own rhythm.",
  description:
    "A native Aurral music client for Mac, iPhone and Apple Watch. Browse your library, prepare Watch playlists and listen at your own pace. Free and open source.",
  alternates: { canonical: siteUrl },
  icons: { icon: asset("mark.svg"), apple: asset("icon.png") },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Cadence — Your music. Your own rhythm.",
    description:
      "Your library, a little closer. Native music apps for Mac, iPhone and Apple Watch. Bring your own server.",
    images: [
      {
        url: new URL("images/social.png", siteUrl).href,
        width: 1200,
        height: 630,
        alt: "Cadence — native music for Mac, iPhone and Apple Watch",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
