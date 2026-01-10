import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import MainNav from "@/components/MainNav";
import { siteMeta } from "@/lib/seo";
import Script from "next/script";

const meta = siteMeta();

export const metadata: Metadata = {
  title: { default: meta.name, template: `%s | ${meta.name}` },
  description: meta.description,
  metadataBase: new URL(meta.url),
};

const ADSENSE_CLIENT = "ca-pub-7517436157328119";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv">
      <head>
        <meta name="google-adsense-account" content={ADSENSE_CLIENT} />

        <Script
          id="adsense-script"
          async
          strategy="afterInteractive"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          crossOrigin="anonymous"
        />
      </head>

      <body className="min-h-screen bg-[#070A12] text-white antialiased">
        {/* ...resten exakt som du har... */}
        <header className="sticky top-0 z-50 border-b border-white/10 bg-[#070A12]/70 backdrop-blur">
          <div className="mx-auto max-w-6xl px-4">
            <div className="flex items-center justify-between py-4">
              <Link href="/" className="group inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_24px_rgba(52,211,153,0.65)]" />
                <span className="text-sm font-semibold tracking-wide text-white/90 group-hover:text-white">
                  Skolverktyg
                </span>
              </Link>
            </div>

            <MainNav />
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-4 py-10">{children}</main>

        <footer className="mt-16 border-t border-white/10">
          <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-white/60">
            © {new Date().getFullYear()} Skolverktyg
          </div>
        </footer>
      </body>
    </html>
  );
}