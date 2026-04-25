import React from "react";

const Footer = () => {
  return (
    <footer className="relative w-full overflow-hidden text-white">
      {/* Background */}
      <div className="absolute inset-0 bg-[url('/footer-bg.webp')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 lg:px-14 py-10">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 border-b border-white/20 pb-10">
          
          {/* Brand */}
          <div>
            <img src="/logo.png" alt="logo" className="h-12 md:h-16 bg-white  rounded-sm" />
            <p className="mt-5 text-sm text-white leading-relaxed">
              A reliable eCommerce platform offering high-quality industrial
              supplies and equipment for businesses and bulk buyers.
            </p>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-5 tracking-wide">
              SUPPORT
            </h3>
            <ul className="space-y-3 text-sm text-white">
              {[
                "Frequently Asked Questions",
                "Return & Refund Policy",
                "Shipping & Cancellations",
                "Bulk Enquiry",
                "Terms & Conditions",
              ].map((item, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="transition-all duration-300 hover:text-[#039c98] hover:pl-1"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-5 tracking-wide">
              COMPANY
            </h3>
            <ul className="space-y-3 text-sm text-white">
              {["Home", "About", "Blogs", "Privacy"].map((item, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="transition-all duration-300 hover:text-[#039c98] hover:pl-1"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact / CTA */}
          <div>
            <h3 className="text-lg font-semibold mb-5 tracking-wide">
              GET IN TOUCH
            </h3>

            <p className="text-sm text-white mb-4">
              Have questions or bulk requirements? Contact our team.
            </p>

            <a
              href="/contact"
              className="inline-block bg-[#039c98] hover:bg-[#02827f] transition px-5 py-2.5 rounded-lg text-sm font-medium shadow-lg"
            >
              Contact Us
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 text-xs md:text-sm text-white">
          <p>© 2026 JL Industries. All Rights Reserved.</p>

          <p>
            Designed by Promozione Branding Pvt. Ltd {" "}
            <a
              href="https://promozionebranding.com/"
              target="_blank"
              className="text-[#039c98] hover:underline"
            >
              Website Designing Company
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;