
"use client";
import React, { useState } from "react";
import Image from "next/image";


const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setFormData({ fullName: "", mobile: "", email: "", message: "" });
    }, 700);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <React.Fragment>
    <div className="relative bg-gray-100 transition-all duration-300 ease-in-out">
      {/* Hero using privacy policy image */}
      <div className="w-full">
        <div
          className="w-full h-48 md:h-64 lg:h-72 bg-center bg-cover flex items-center justify-center"
          style={{ backgroundImage: `url('/background/visitor pass.png')` }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg">Contact Us</h1>
        </div>
      </div>

      <div className="relative z-10 flex w-full justify-center pt-12 pb-8">
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
          <Image
            src="/background/sponserbecome .png"
            alt="background pattern"
            width={1200}
            height={519}
            className="w-[1200px] h-[519px] object-cover opacity-90 left-[-200px] top-[-100px] absolute"
            style={{ left: "105px", top: "0px" }}
          />
        </div>

        <div className="relative z-20 w-full max-w-xl mx-auto px-6 py-8">
          <div className="text-center mb-6">
            <h2 className="text-xl md:text-2xl font-semibold">Get in touch with our team</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full h-10 md:h-12 px-3 bg-white border border-gray-300 rounded-md placeholder-gray-500 text-center"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="tel"
                name="mobile"
                placeholder="Mobile Number"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full h-10 md:h-12 px-3 bg-white border border-gray-300 rounded-md"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full h-10 md:h-12 px-3 bg-white border border-gray-300 rounded-md"
              />
            </div>

            <textarea
              name="message"
              placeholder="Write Message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="w-full p-3 bg-white border border-gray-300 rounded-md"
            />

            <div className="flex justify-center">
              <button
                type="submit"
                className={`w-3/4 md:w-1/2 bg-green-300 text-black py-2 md:py-3 rounded-md transition-colors font-semibold ${loading ? "opacity-60 cursor-not-allowed" : "hover:bg-green-400"}`}
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
            {success && (
              <div className="text-green-600 text-center font-semibold mt-2">Thank you! Your message has been sent.</div>
            )}
          </form>
        </div>
      </div>
  </div>
  </React.Fragment>
  );
};

export default ContactUs;
