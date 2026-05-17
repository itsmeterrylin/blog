import "./globals.css";

import { Newsreader } from "next/font/google";
import { themeEffect } from "./theme-effect";
import { Analytics } from "./analytics";
import { Header } from "./header";
import { Footer } from "./footer";
import { doge } from "./doge";

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata = {
  title: "Terry Lin's blog",
  description:
    "Terry Lin is a senior product manager in NYC writing about product, engineering, and shipping side projects.",
  openGraph: {
    title: "Terry Lin's blog",
    description:
      "Terry Lin is a senior product manager in NYC writing about product, engineering, and shipping side projects.",
    url: "https://terrylin.net",
    siteName: "Terry Lin's blog",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    site: "@itsmeterrylin",
    creator: "@itsmeterrylin"
  },
  metadataBase: new URL("https://terrylin.net"),
};

export const viewport = {
  themeColor: "transparent",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${newsreader.className} antialiased`}
      suppressHydrationWarning={true}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(${themeEffect.toString()})();(${doge.toString()})();`,
          }}
        />
      </head>

      <body className="max-w-[680px] m-auto">
        <main className="p-6 pt-3 md:pt-10 min-h-screen">
          <Header />
          {children}
        </main>

        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
