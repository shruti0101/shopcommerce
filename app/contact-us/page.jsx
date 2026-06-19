"use client";

import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="bg-white">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#071B31] via-[#0d2d52] to-[#071B31]">
        <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-5" />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-2 rounded-full bg-white/10 text-white text-sm border border-white/10">
              Contact With JL Industries
            </span>

            <h1 className="mt-2 text-5xl lg:text-6xl font-bold text-white leading-tight">
              Let's Build
              <span className="text-[#d6b98c]"> Better Business </span>
              Connections
            </h1>

            <p className="mt-6 text-lg text-white/80 leading-relaxed">
              Connect with our team for supplier enquiries, bulk purchases,
              business partnerships, product sourcing, and marketplace support.
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT CARDS */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 -mt-14 relative z-20">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg border">
            <div className="h-14 w-14 rounded-xl bg-[#071B31] text-white flex items-center justify-center">
              <Phone size={24} />
            </div>

            <h3 className="font-semibold text-lg mt-4">Call Us</h3>

            <p className="text-black mt-2">+91 9891000561</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border">
            <div className="h-14 w-14 rounded-xl bg-[#071B31] text-white flex items-center justify-center">
              <Mail size={24} />
            </div>

            <h3 className="font-semibold text-lg mt-4">Email Us</h3>

            <p className="text-black mt-2">jairamchy@gmail.com</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border">
            <div className="h-14 w-14 rounded-xl bg-[#071B31] text-white flex items-center justify-center">
              <Clock size={24} />
            </div>

            <h3 className="font-semibold text-lg mt-4">Working Hours</h3>

            <p className="text-black mt-2">Mon - Sat : 9 AM - 6 PM</p>
          </div>
        </div>
      </section>

      {/* FORM SECTION */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* LEFT */}
            <div>
              <span className="text-[#c59d5f] font-semibold uppercase tracking-widest">
                Get In Touch
              </span>

              <h2 className="text-4xl font-bold mt-4 text-[#071B31]">
                We'd Love To Hear From You
              </h2>

              <p className="mt-5 text-black leading-relaxed">
                Whether you're looking for suppliers, sourcing products,
                partnership opportunities, or marketplace support, our team is
                ready to help.
              </p>

              <div className="mt-10 space-y-6">
                <div className="flex gap-4">
                  <Phone className="text-[#c59d5f]" />
                  <div>
                    <h4 className="font-semibold">Phone</h4>
                    <p className="text-black">+91 9891000561</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Mail className="text-[#c59d5f]" />
                  <div>
                    <h4 className="font-semibold">Email</h4>
                    <p className="text-black">jairamchy@gmail.com</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <MapPin className="text-[#c59d5f]" />
                  <div>
                    <h4 className="font-semibold">Address</h4>
                    <p className="text-black">
                      J L Industries Hub Private Limited 253, BLOCK E-2 ICICI
                      BANK,2ND FLOOR, SHASTRI NAGAR, NEW DELHI, NORTH WEST
                      DELHI, <br /> NEW DELHI, INDIA, 110052
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT FORM */}
            <div className="bg-white rounded-3xl border shadow-xl p-8">
              <h3 className="text-2xl font-bold text-[#071B31] mb-6">
                Send Us A Message
              </h3>

              <form className="space-y-5">
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="h-14 border rounded-xl px-4 outline-none focus:border-[#c59d5f]"
                  />

                  <input
                    type="email"
                    placeholder="Email Address"
                    className="h-14 border rounded-xl px-4 outline-none focus:border-[#c59d5f]"
                  />
                </div>

                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="h-14 border rounded-xl px-4 w-full outline-none focus:border-[#c59d5f]"
                />

                <input
                  type="text"
                  placeholder="Subject"
                  className="h-14 border rounded-xl px-4 w-full outline-none focus:border-[#c59d5f]"
                />

                <textarea
                  rows={6}
                  placeholder="Write your message..."
                  className="border rounded-xl p-4 w-full outline-none focus:border-[#c59d5f]"
                />

                <button
                  type="submit"
                  className="w-full h-14 bg-[#071B31] hover:bg-[#0d2d52] text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition"
                >
                  <Send size={18} />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* MAP */}
      <section className="pb-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto overflow-hidden rounded-3xl shadow-xl border">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.6406788227628!2d77.1806798!3d28.670475699999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d0396745f7607%3A0x1c0e46d5c674745b!2sJ%20L%20Industries%20Hub%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1780136077902!5m2!1sen!2sin"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-500 h-100 "
          ></iframe>
        </div>
      </section>
    </main>
  );
}
