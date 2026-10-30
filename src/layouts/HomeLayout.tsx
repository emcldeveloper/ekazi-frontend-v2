import ScrollToTop from "@/components/scroll-to-top";
import Footer from "@/pages/website/components/Footer";
import Navbar from "@/pages/website/components/Navbar";
import type { ReactNode } from "react";

const HomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <ScrollToTop />
      <Navbar />

      <div>{children}</div>

      <Footer />
    </>
  );
};

export default HomeLayout;
