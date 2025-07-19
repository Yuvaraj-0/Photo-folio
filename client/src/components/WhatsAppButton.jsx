
import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  return (
    <a
    href="https://wa.me/9087132194" // Replace with your number
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-50 bg-green-500 p-3 md:p-4 rounded-full shadow-lg animate-vibrate"

    // className="fixed bottom-4 right-4 z-50 bg-green-500 p-3 md:p-4 rounded-full shadow-lg animate-vibrate"
  >
    <FaWhatsapp className="text-white text-xl md:text-2xl" />
  </a>
  );
};

export default WhatsAppButton;
