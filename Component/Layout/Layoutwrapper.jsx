
"use client"
import { usePathname } from "next/navigation";

import Navbar from "./Navbar";

const Layoutwrapper = ({children}) => {
  const pathname = usePathname();

  const shouldHideHeader =
    pathname === "/login" ||
    pathname === "/register" ||
    pathname.startsWith("/admin/");

  return <>
  
  {!shouldHideHeader && <Navbar />}

  {children}

  
  </>;
};

export default Layoutwrapper;
