import "./globals.css";
import Header from "@/components/Header";
import { AppProvider } from "@/lib/app";

export const metadata = {
  title: "산울킹",
  description: "산울킹 사진첩, 일정, 공지",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <AppProvider>
          <Header />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
