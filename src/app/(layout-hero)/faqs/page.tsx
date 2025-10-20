"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function FAQsPage() {
  const [openItem, setOpenItem] = useState<number | null>(0);

  const faqItems = [
    {
      id: 1,
      question: "What is Marakbi?",
      answer:
        "Marakbi is an online platform that connects you with trusted boat owners and captains across Egypt. Whether you're looking for a private trip, a shared tour, or a fishing adventure - we make booking easy and secure.",
    },
    {
      id: 2,
      question: "How do I book a boat?",
      answer:
        "Booking is simple! Browse our available boats, select your preferred date and time, and complete the booking process. You'll receive confirmation and all trip details via email.",
    },
    {
      id: 3,
      question: "What types of boats are available?",
      answer:
        "We offer a wide variety of boats including luxury yachts, traditional feluccas, fishing boats, and family-friendly vessels. Each boat is verified for safety and quality.",
    },
    {
      id: 4,
      question: "Are the boats safe and verified?",
      answer:
        "Yes! All boats on our platform are thoroughly verified for safety standards, proper licensing, and quality service. We work only with trusted and experienced captains.",
    },
    {
      id: 5,
      question: "What is your cancellation policy?",
      answer:
        "Cancellation policies vary by boat owner, but we offer flexible options. Most bookings can be cancelled up to 24 hours before departure with full refund.",
    },
    {
      id: 6,
      question: "Do you provide life jackets and safety equipment?",
      answer:
        "Absolutely! All boats are equipped with proper safety equipment including life jackets for all passengers. Safety is our top priority.",
    },
  ];

  const toggleItem = (id: number) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <>
      {/* Hero Section (same style as About Us) */}

      {/* Welcome Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Text */}
            <div>
              <h2 className="text-6xl font-bold text-gray-900 mb-6 font-poppins">
                Welcome, Let&apos;s Talk About{" "}
                <span className="text-blue-600">Marakbi</span>
              </h2>
            </div>

            {/* Right Side - Image positioned from right edge */}
            <div className="relative h-[400px]">
              <img
                src="/images/Layer 16yaght.png"
                alt="Luxury Yacht"
                className="absolute right-0 top-0 h-full w-auto object-contain object-right"
                style={{ transform: "translateX(40%)" }}
              />
            </div>
          </div>
        </div>

        {/* Blue horizontal line separator */}
        <div className="w-full h-px bg-blue-600 mt-8"></div>
      </div>

      {/* FAQs Section */}
      <div className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 font-poppins">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 font-poppins">
              Let&apos;s Dive Into the World of{" "}
              <span className="text-blue-600">Marakbi</span>
            </p>
          </div>

          {/* Blue horizontal line separator */}
          <div className="w-full h-px bg-blue-600 mb-8"></div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {faqItems.map((item) => (
              <div
                key={item.id}
                className={`bg-gray-100 border-l-4 ${
                  openItem === item.id
                    ? "border-blue-600 border-t-2"
                    : "border-gray-300"
                } rounded-lg`}
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-200 transition-colors"
                >
                  <span className="text-lg font-semibold text-gray-900 font-poppins">
                    {item.id}. {item.question}
                  </span>
                  <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
                    {openItem === item.id ? (
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M20 12H4"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                    )}
                  </div>
                </button>

                {openItem === item.id && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-700 leading-relaxed font-poppins">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
