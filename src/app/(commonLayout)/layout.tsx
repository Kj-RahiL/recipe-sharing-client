import type { Metadata } from "next";
import Footer from "./components/shared/Footer";
import NavigationPage from "./components/shared/Navbar";

export const metadata: Metadata = {
  title: "Chef's Circle",
  description: "Recipe Sharing Community",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mx-auto container">
      <NavigationPage />
      <div className="min-h-screen">{children}</div>

      <Footer />
    </div>
  );
}
