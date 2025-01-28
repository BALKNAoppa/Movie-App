import type { Metadata } from "next";
import "./globals.css";
import { Header } from "../components/header/Header";
import { Footer } from "../components/footer/Footer";


export const metadata: Metadata = {
  title: "Movie App| Pinecone Academy",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="w-screen h-screen bg-white-500">
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
