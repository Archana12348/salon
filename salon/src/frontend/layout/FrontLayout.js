// 1. Import Outlet from react-router-dom
import { useLocation, Outlet } from "react-router-dom";
import Header from "../layout/navbar/Header";
import Footer from "../layout/navbar/Footer";
import AnnouncementBar from "./navbar/Topbar";
import SparkleCanvas from "../components/common/effect/SparkleCanvas";
import TawkToChat from "../chartbot/TawkToChat";
import ScrollToTop from "../route/ScrollToTop";

// 2. Remove { children } from the function arguments
export default function MainLayout() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <SparkleCanvas />

      <AnnouncementBar />
      <TawkToChat />
      <Header />

      {/* 3. Replace {children} with <Outlet /> */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {isHomePage && <></>}

      <Footer />
    </div>
  );
}
