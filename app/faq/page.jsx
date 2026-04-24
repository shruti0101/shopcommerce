"use client";
import Link from "next/link";
import { useState } from "react";

export default function Page() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What products does JL Industries offer?",
      answer:
        "JL Industries provides a wide range of industrial and safety solutions including fire protection equipment, industrial components, and high-quality products for businesses and bulk buyers.",
    },
    {
      question: "Do you provide bulk orders or wholesale pricing?",
      answer:
        "Yes, we specialize in bulk supply and wholesale pricing. Discounts vary based on quantity and partnerships.",
    },
    {
      question: "How can I place a bulk enquiry?",
      answer:
        "You can place a bulk enquiry through our website form or contact our team directly.",
    },
    {
      question: "Do you offer customized products?",
      answer:
        "Yes, we provide customized solutions based on your industrial requirements.",
    },
    {
      question: "What is your delivery timeline?",
      answer:
        "Delivery timelines depend on product type and order size, but we ensure timely dispatch.",
    },
    {
      question: "Do you ship across India?",
      answer:
        "Yes, we deliver across India with reliable logistics support.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept bank transfers, UPI, and other standard payment options.",
    },
  ];

  return (
    <>
      {/* HERO */}
      <div className="w-full bg-gradient-to-r from-gray-700 to-gray-900 py-12 md:py-16 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-bold mb-2">
            Frequently Asked Questions
          </h1>

          <p className="text-sm md:text-base opacity-90">
            <Link href="/" className="hover:underline">
              Home
            </Link>{" "}
            | FAQ
          </p>
        </div>
      </div>

      {/* FAQ SECTION */}
      <section className="max-w-3xl mx-auto px-4 py-10">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8">
          Looking for answers?
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border rounded-xl p-4 md:p-5 cursor-pointer transition hover:shadow-sm"
              onClick={() =>
                setOpenIndex(openIndex === index ? null : index)
              }
            >
              {/* QUESTION */}
              <div className="flex justify-between items-center gap-4">
                <h3 className="text-base md:text-lg font-medium text-gray-800">
                  {faq.question}
                </h3>

                <span
                  className={`transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </div>

              {/* ANSWER */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index
                    ? "max-h-40 opacity-100 mt-3"
                    : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-sm md:text-base text-gray-600">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}