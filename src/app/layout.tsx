import AIChatbot from "@/components/ai-chatbot";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { Suspense } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import VantaBirds from "@/components/vanta-birds";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { SiteLoader } from "@/components/site-loader";
import { Header } from "@/components/header";
import { LoadingProvider } from "@/hooks/use-loading";
import { AuthProvider } from "@/hooks/use-auth";
import { GlobalAuthModal } from "@/components/global-auth-modal";
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(DATA.url),
  title: {
    default: DATA.name,
    template: `%s | ${DATA.name}`,
  },
  description: DATA.description,
  openGraph: {
    title: `${DATA.name}`,
    description: DATA.description,
    url: DATA.url,
    siteName: `${DATA.name}`,
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: `${DATA.name}`,
    card: "summary_large_image",
  },
  verification: {
    google: "",
    yandex: "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased max-w-screen-xl mx-auto pt-2 pb-12 sm:pt-8 sm:pb-24 px-0 sm:px-6",
          fontSans.variable
        )}
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <LoadingProvider>
            <AuthProvider>
              <TooltipProvider delayDuration={0}>
                <SiteLoader />
                <Suspense fallback={null}>
                  <Header />
                </Suspense>
                <Toaster 
                  position="top-center" 
                  reverseOrder={false}
                  toastOptions={{
                    style: {
                      background: 'transparent',
                      zIndex: 9999,
                    },
                  }}
                />
                <VantaBirds />
                <GlobalAuthModal />
                {children}
                <Suspense fallback={null}>
                  <Navbar />
                </Suspense>
                <Suspense fallback={null}>
                  <AIChatbot />
                </Suspense>
              </TooltipProvider>
            </AuthProvider>
          </LoadingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
