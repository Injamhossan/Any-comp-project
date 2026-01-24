import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/style/globals.css";

const proxima = localFont({
  src: "./assets/fonts/Proxima_Nova.ttf",
  variable: "--font-proxima",
  weight: "100 900",
});

const redhat = localFont({
  src: "./assets/fonts/RedHatDisplay.ttf",
  variable: "--font-redhat",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "ST Comp Holdings Sdn Bhd",
  description: "ST Comp Holdings Sdn Bhd",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${proxima.variable} ${redhat.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
