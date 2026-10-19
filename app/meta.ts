import type { Metadata } from "next";
import { SITE_URL } from "./site";

// Page-level openGraph replaces the layout's wholesale, so each page restates the shared bits.
export const pageMeta = (path: string, title: string, description: string): Metadata => {
  const img = [{ url: `${SITE_URL}/og.png?v=1`, width: 1200, height: 630, alt: "Ash: A Java-like language, built from scratch in C." }];
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", siteName: "Ash", title, description, url: `${SITE_URL}${path}`, locale: "en_US", images: img },
    twitter: { card: "summary_large_image", title, description, images: img },
  };
};
