import "./globals.css";
import type { Metadata } from "next";
import ConditionalLayout from "@/components/ConditionalLayout";


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
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  );
}
