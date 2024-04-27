import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import { cn } from "@/lib/utils";
import '../styles.css'
import StoreProvider from "../StoreProvider";
import { Toaster } from "@/components/ui/toaster";


const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--noto-sans",
});

export const metadata: Metadata = {
  title: "Super Chat",
  description: "Powered By Abhishek Bhat",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          notoSans.variable
        )}
      >
        <StoreProvider>
          { children }
        </StoreProvider>
        <Toaster/>
      </body>
    </html>
  );
}
