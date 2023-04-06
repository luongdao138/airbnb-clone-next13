import { Nunito } from "next/font/google";
import Navbar from "./components/layout/navbar/Navbar";
import Provider from "./components/layout/Provider";
import RegisterModal from "./components/layout/RegisterModal";
import "./globals.css";

const font = Nunito({
  subsets: ["latin"],
});

export const metadata = {
  title: "Airbnb",
  description: "Airbnb clone",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Provider>
          <Navbar />
          <RegisterModal />
          {children}
        </Provider>
      </body>
    </html>
  );
}
