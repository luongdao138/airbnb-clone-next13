import { Nunito } from "next/font/google";
import getMe from "./api/user/me";
import LoginModal from "./components/layout/LoginModal";
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getMe();

  return (
    <html lang="en">
      <body className={font.className}>
        <Provider user={user}>
          <Navbar />
          <RegisterModal />
          <LoginModal />
          {children}
        </Provider>
      </body>
    </html>
  );
}
