import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { getCurrentUser, toSessionUser } from "@/lib/auth";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LanguageProvider } from "@/components/language-provider";
import { getLang } from "@/lib/i18n-server";

export const metadata: Metadata = {
  title: {
    default: "LocalFix — Report. Track. Resolve.",
    template: "%s · LocalFix",
  },
  description:
    "LocalFix is a public civic issue reporting and transparency platform. Report problems, gather public support and track official responses.",
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const user = await getCurrentUser();
  const lang = await getLang();
  return (
    <html lang={lang}>
      <body className="flex min-h-screen flex-col">
        <LanguageProvider initialLang={lang}>
          <SiteHeader user={user ? toSessionUser(user) : null} />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </LanguageProvider>
      </body>
    </html>
  );
}