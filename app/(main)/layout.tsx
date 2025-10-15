import { ReactNode } from "react";
import Navbar from "../components/Navigations/Navbar";
import { Footer } from "../components/Navigations/Footer";
import { TopBar } from "../components/Navigations/TopBar";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <TopBar />
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default layout;
