import { ReactNode } from "react";
import Navbar from "../components/Navigations/Navbar";
import { Footer } from "../components/Navigations/Footer";
import { TopBar } from "../components/Navigations/TopBar";
import { Toaster } from "sonner";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <TopBar />
      <Navbar />
      <Toaster />
      {children}
      <Footer />
    </div>
  );
};

export default layout;
