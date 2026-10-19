import localFont from "next/font/local";
import type { Metadata, Viewport } from "next";
import { Footer } from "./components";
import { art } from "./ascii";
import Eggs from "./eggs";
import { Header } from "./header";
import { DESCRIPTION, GH_USER, REPO, SITE_URL, TAGLINE } from "./site";
import "./globals.css";

const fira = localFont({
  src: [
  { path: "../node_modules/@fontsource/fira-code/files/fira-code-latin-300-normal.woff2", weight: "300" },
  { path: "../node_modules/@fontsource/fira-code/files/fira-code-latin-400-normal.woff2", weight: "400" },
  { path: "../node_modules/@fontsource/fira-code/files/fira-code-latin-600-normal.woff2", weight: "600" },
  { path: "../node_modules/@fontsource/fira-code/files/fira-code-latin-700-normal.woff2", weight: "700" },
  ],
  display: "swap",
});

const og = `${SITE_URL}/og.png?v=1`;
const alt = `Ash: ${TAGLINE}`;
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Ash: a Java-like language in C",
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  manifest: "/site.webmanifest",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }, { url: "/favicon.ico", sizes: "32x32" }, { url: "/icon-192.png", sizes: "192x192", type: "image/png" }],
    apple: "/apple-touch-icon.png",
  },
  openGraph: { type: "website", siteName: "Ash", title: `Ash: ${TAGLINE}`, description: DESCRIPTION, url: SITE_URL, locale: "en_US", images: [{ url: og, width: 1200, height: 630, alt }] },
  twitter: { card: "summary_large_image", title: `Ash: ${TAGLINE}`, description: DESCRIPTION, images: [{ url: og, alt }] },
};
export const viewport: Viewport = { themeColor: "#A22822", colorScheme: "light" };

const jsonLd = { "@context": "https://schema.org", "@type": "SoftwareSourceCode", name: "Ash", description: DESCRIPTION, codeRepository: REPO, programmingLanguage: "C", url: SITE_URL, author: { "@type": "Person", name: "lennoxrose", url: GH_USER } };

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={fira.className}>
        <a className="skip" href="#main">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <Eggs art={art()} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
