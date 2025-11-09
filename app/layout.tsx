import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "تحدي التشابه والتقارب | ألعاب تفكير وتحدي",
  description: "خمن الكلمة السرّية من خلال التشابه الدلالي بين الكلمات! كل محاولة تقرّبك من المعنى.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@200;300;400;500;700;800;900&display=swap" rel="stylesheet" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme') ||
                    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
