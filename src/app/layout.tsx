import "./globals.css";
import Header from "../_components/header";
import Footer from "../_components/footer";
import { Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata = {
  title: "HaaS - Honeypot-as-a-Service",
  description: "Deceive. Detect. Defend. Honeypot-as-a-Service landing page",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={spaceGrotesk.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
