import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import Sidebar from "@/app/components/Sidebar";
import "@/app/globals.css";
import ScrollToTop from "@/app/components/ScrollToTop";

export default function Appearance({ children }) {

  return (
    <>
      <Navbar />
      <div className="main-layout">
        <div className="main-content">
          <ScrollToTop/>
          {children}
          </div>
      </div>
      <Footer />
    </>
  );
}
