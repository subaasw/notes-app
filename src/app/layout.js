import React from "react";
import AuthContext from "@/context/AuthContext";
import { FolderProvider } from "@/context/FolderContext";
import { OverlayProvider } from "@/context/OverlayContext";
import NextThemeProvider from "@/context/NextThemeProvider";

import "./globals.css";

export const metadata = {
  title: "Notes List",
  description: "A Fully functional notes app",
  metadataBase: new URL('https://acme.com'),
  openGraph: {
    images: "/webp/opengraph-image.webp",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/webp/Favicon.webp" sizes="any" />
      </head>
      <body className="text-18 bg-Brand-White">
        <AuthContext>
          <FolderProvider>
            <OverlayProvider>
              <NextThemeProvider>{children}</NextThemeProvider>
            </OverlayProvider>
          </FolderProvider>
        </AuthContext>
      </body>
    </html>
  );
}
