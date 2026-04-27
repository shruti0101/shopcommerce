
"use client"
import { usePathname } from "next/navigation";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layoutwrapper = ({children}) => {
  const pathname = usePathname();

  const shouldHideHeader =
    pathname === "/login" ||
    pathname === "/register" ||
    pathname.startsWith("/admin");
   

  return <>
  
  {!shouldHideHeader && <Navbar />}

  {children}

  
  {!shouldHideHeader && <Footer/>}

  
  </>;
};

export default Layoutwrapper;
