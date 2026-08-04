import {
  Poppins,
  Bebas_Neue,
} from "next/font/google";
import Script from "next/script";

import "./globals.css";

import { Toaster } from "react-hot-toast";

import Layoutwrapper from "@/Component/Layout/Layoutwrapper";
import CartDrawer from "@/Component/CartDrawer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas",
});

export const metadata = {
  title:
    "JL Industries Hub | Premium Industrial Products Importer & Wholesale Supplier India",
  description:
    "JL Industries Hub is a trusted importer and wholesale supplier of premium industrial products, safety equipment, tools, and bulk supply solutions across India.",

  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
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
      <head>
        {/* Facebook Meta Pixel */}
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)n=f.fbq;
            n.push=n;
            n.loaded=!0;
            n.version='2.0';
            n.queue=[];
            t=b.createElement(e);
            t.async=!0;
            t.src=v;
            s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s);
            }(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');

            fbq('init', '1382842983912052');
            fbq('track', 'PageView');
          `}
        </Script>
      </head>

      <body className="min-h-full flex flex-col">
        {/* Facebook Pixel Noscript */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1382842983912052&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>

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