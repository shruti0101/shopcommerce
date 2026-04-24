import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="relative px-6 md:px-10 lg:px-14 xl:px-22 w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 bg-[url('/footer-bg.webp')] bg-cover bg-center bg-no-repeat"></div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/60 to-transparent"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col md:flex-row items-start justify-center gap-10 py-10 border-b border-gray-300/30 text-white">
          {/* LEFT */}
          <div className="max-w-96">
            <img src="/logo.png" alt="logo" className="h-[50px] md:h-[58px]" />

            <p className="mt-6 text-sm md:text-base text-gray-200">
              A reliable eCommerce platform offering high-quality industrial
              supplies and equipment for businesses and bulk buyers.
            </p>
          </div>

          {/* RIGHT */}
          <div className="w-full md:w-1/2 flex flex-wrap md:flex-nowrap justify-between">
            <div>
              <h2 className="font-semibold text-lg mb-4">SUPPORT</h2>
              <ul className="text-sm space-y-2">
                <li>
                  <a href="/faq" className="hover:text-[#039c98]">
                    Frequently Asked Questions
                  </a>
                </li>
                <li>
                  <a href="/return-refund" className="hover:text-[#039c98]">
                    Return & Refund Policy
                  </a>
                </li>
                <li>
                  <a href="/shipping-cancellations" className="hover:text-[#039c98]">
                    Shipping & Cancellations
                  </a>
                </li>
                <li>
                  <a href="/bulk-enquiry" className="hover:text-[#039c98]">
                    Bulk Enquiry
                  </a>
                </li>
                
                
                <li>
                  <a href="/terms-conditions" className="hover:text-[#039c98]">
                    Terms
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-semibold text-lg mb-4">COMPANY</h2>
              <ul className="text-sm space-y-2">
                <li>
                  <a href="/" className="hover:text-[#039c98]">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/about" className="hover:text-[#039c98]">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#039c98]">
                    Blogs
                  </a>
                </li>
                <li>
                  <a href="/privacy-policy" className="hover:text-[#039c98]">
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <p className="relative z-10 py-4 text-center text-xs md:text-sm text-gray-300">
          © 2025 JL Industries. All Rights Reserved. <br />
          Website Designed By{" "}
          <a
            href="https://promozionebranding.com/"
            className="text-[#039c98] hover:underline"
            target="_blank"
          >
            Promozione Branding Pvt. Ltd
          </a>
        </p>
      </footer>
    </>
  );
};

export default Footer;
