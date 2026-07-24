import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { StyledComponentsRegistry } from "@/theme/StyledComponentsRegistry";
import { ThemeProvider } from "@/theme/ThemeProvider";
import { AppToaster } from "@/presentation/atoms/AppToaster";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-header",
  subsets: ["latin"],
  weight: ["500", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Landing pages que se entienden, convencen y convierten",
  description: "RESTART by Dekids — una charla para transformar buenas ideas en landing pages poderosas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body>
        <StyledComponentsRegistry>
          <ThemeProvider>
            {children}
            <AppToaster />
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
