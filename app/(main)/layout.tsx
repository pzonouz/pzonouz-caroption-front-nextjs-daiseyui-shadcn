import { ReactNode } from "react";
import Navbar from "../components/Navigations/Navbar";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default layout;
