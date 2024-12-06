import { Inter } from "next/font/google";
import "@/app/globals.scss";
import "@/assets/styles/main.scss";
import "@/assets/styles/partials/_theming.scss";
import "react-loading-skeleton/dist/skeleton.css";
import Footer from "@/common/footer";
import Header from "@/common/header";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "File Title",
  description: "file discription",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="./favicon.ico" />
      </head>
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
