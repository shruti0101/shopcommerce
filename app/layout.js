import {

  Poppins,
  Bebas_Neue,
} from "next/font/google";

import "./globals.css";

import { Toaster } from "react-hot-toast";

import Layoutwrapper from "@/Component/Layout/Layoutwrapper";

import CartDrawer from "@/Component/CartDrawer";



const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

/* ✅ ADD THIS */
const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas",
});

export const metadata = {
  title: "JL Industries Hub | Premium Industrial Products Importer & Wholesale Supplier India",
  description: "JL Industries Hub is a trusted importer and wholesale supplier of premium industrial products, safety equipment, tools, and bulk supply solutions across India.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`
       
        ${poppins.variable}
        ${bebasNeue.variable}
        h-full
        antialiased
      `}
    >
      <body className="min-h-full flex flex-col">

        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#111827",
              color: "#fff",
              borderRadius: "10px",
              zIndex: 99999999,
            },
          }}
        />

        <Layoutwrapper>
          {children}
        </Layoutwrapper>

        <CartDrawer />

      </body>
    </html>
  );
}