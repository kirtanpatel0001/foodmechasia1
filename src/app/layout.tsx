import "./globals.css";
import type { Metadata } from "next";
import ConditionalLayout from "@/components/ConditionalLayout";
import BrochureModal from "@/components/BrochureModal";


export const metadata: Metadata = {
  title: "Food Mech",
  description: "The Largest Food Industry Exhibition",
};

import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
  <html lang="en">
      {/* suppressHydrationWarning is added to reduce false-positive hydration mismatch
          errors that can occur when external tools or browser extensions modify
          attributes on <body> between server and client. If you still see real
          mismatches, check for code that uses random/Date.now()/window during render. */}
      <body suppressHydrationWarning>
        {/* Google Tag Manager (noscript) */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KSM33WS5" height="0" width="0" style="display:none;visibility:hidden"></iframe>`
          }}
        />
        {/* End Google Tag Manager (noscript) */}
        <ConditionalLayout>
          <BrochureModal />
          {children}
        </ConditionalLayout>
      </body>
    </html>
  );
}
