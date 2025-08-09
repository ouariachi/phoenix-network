import { Toaster } from "@/components/ui/sonner"
import type { Metadata } from "next";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "Phoenix Network",
  description: "Página web del servidor de Minecraft de Phoenix Network",
  icons: {
    icon: "/logo.jpeg",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=clash-grotesk@1&display=swap" rel="stylesheet" />
      </head>

      <body
        className="bg-background text-foreground font-glash-grotesk antialiased min-h-[100dvh] overflow-y-hidden"
      >
        <SmoothScroll>
          {children}
        </SmoothScroll>

        <Toaster
          toastOptions={{
            classNames: {
              success: "bg-gradient-to-br from-success/60 to-success/40 text-success/80 border-success/80",
              info: "bg-gradient-to-br from-success/60 to-success/40 text-success/80 border-success/80",
              warning: "bg-gradient-to-br from-success/60 to-success/40 text-success/80 border-success/80",
            },
          }}
        />
      </body>
    </html>
  );
}
