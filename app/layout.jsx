import { Bricolage_Grotesque, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

const bricolage_grotesque = Bricolage_Grotesque({
  subsets: ["latin"],
});

export const metadata = {
  title: "FinSync",
  description: "Finance Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={` ${bricolage_grotesque.className} min-h-full flex flex-col antialiased`}
      >
        <ClerkProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <main className="min-h-screen">{children}</main>
            <Toaster/>
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
