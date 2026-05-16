
"use client"
import { usePathname } from "next/navigation";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Whatsapp from "@/Component/Whatsapp";
import Stickyfooter from "@/Component/Stickyfooter";

const Layoutwrapper = ({children}) => {
  const pathname = usePathname();

  const shouldHideHeader =
    pathname === "/login" ||
    pathname === "/register" ||
    pathname.startsWith("/admin");
   

  return <>
  
  {!shouldHideHeader && <Navbar />}
     
{!shouldHideHeader &&  <Whatsapp/>}
{!shouldHideHeader &&  <Stickyfooter/>}
  {children}

  
  {!shouldHideHeader && <Footer/>}

  
  </>;
};

export default Layoutwrapper;
