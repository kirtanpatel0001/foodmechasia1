"use client";
import React, { useState } from "react";
import Image from "next/image";

const BookStall: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    businessName: "",
    city: "",
    contactNumber: "",
    email: "",
    message: "",
  });

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
  const response = await fetch("https://foodmechasia1.onrender.com/api/bookstall", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          businessName: formData.businessName,
          city: formData.city,
          contactNumber: formData.contactNumber,
          email: formData.email,
          message: formData.message,
        }),
      });
      if (response.ok) {
        setSuccess(true);
        setFormData({
          fullName: "",
          businessName: "",
          city: "",
          contactNumber: "",
          email: "",
          message: "",
        });
      } else {
        setError("Submission failed. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    }
    setLoading(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#f7fbe7]">
      {/* Diagonal background stripes */}
      <Image
        src="/background/sponserbecome .svg"
        alt="background stripes"
        fill
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ pointerEvents: "none" }}
      />

      <div className="relative z-10 flex flex-col md:flex-row w-full max-w-[1280px] mx-auto py-6 sm:py-12 px-2 sm:px-4 gap-4 sm:gap-8 items-start">
        {/* Left: Form and headings */}
        <div className="flex-1 flex flex-col items-center justify-center px-1 sm:px-2">
          <div className="w-full max-w-xl mx-auto">
            <div className="text-center mb-2 sm:mb-4 pt-2 sm:pt-0">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-1">Contact with us For Book Stall</h2>
            </div>
            <div className="flex flex-col sm:flex-row flex-nowrap justify-center items-center gap-2 sm:gap-8 mb-4 sm:mb-8 w-full">
              <a href="tel:+919898123103" className="flex items-center gap-1 sm:gap-2 text-base sm:text-lg font-bold text-black whitespace-nowrap mb-2 sm:mb-0">
                <span className="text-pink-500 text-xl sm:text-2xl">&#128222;</span>+91 98981 23103
              </a>
              <a href="tel:+919898036959" className="flex items-center gap-1 sm:gap-2 text-base sm:text-lg font-bold text-black whitespace-nowrap mb-2 sm:mb-0">
                <span className="text-pink-500 text-xl sm:text-2xl">&#128222;</span>+91 98980 36959
              </a>
              <a href="tel:+919898072103" className="flex items-center gap-1 sm:gap-2 text-base sm:text-lg font-bold text-black whitespace-nowrap">
                <span className="text-pink-500 text-xl sm:text-2xl">&#128222;</span>+91 98980 72103
              </a>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-3 sm:space-y-4 bg-white/90 rounded-xl shadow-lg p-4 sm:p-8 border border-green-200"
            >
              {success && (
                <div className="text-green-700 text-center font-semibold bg-green-100 border border-green-300 rounded-md py-2 mb-2 animate-fade-in">
                  Thank you! Your submission has been received.
                </div>
              )}
              {error && (
                <div className="text-red-700 text-center font-semibold bg-red-100 border border-red-300 rounded-md py-2 mb-2 animate-fade-in">
                  {error}
                </div>
              )}

              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full p-2 sm:p-3 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-green-300 text-base sm:text-lg font-semibold"
                required
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-4">
                <input
                  type="text"
                  name="businessName"
                  placeholder="Business Name"
                  value={formData.businessName}
                  onChange={handleChange}
                  className="w-full p-2 sm:p-3 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-green-300 text-base sm:text-lg font-semibold"
                  required
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full p-2 sm:p-3 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-green-300 text-base sm:text-lg font-semibold"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-4">
                <input
                  type="tel"
                  name="contactNumber"
                  placeholder="Contact Number"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  className="w-full p-2 sm:p-3 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-green-300 text-base sm:text-lg font-semibold"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 sm:p-3 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-green-300 text-base sm:text-lg font-semibold"
                  required
                />
              </div>

              <textarea
                name="message"
                placeholder="Write Message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full p-2 sm:p-3 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-green-300 text-base sm:text-lg font-semibold"
                required
              />

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-300 via-yellow-200 to-green-400 text-black py-3 px-6 rounded-md hover:scale-105 transition-transform font-semibold disabled:opacity-60 shadow-md text-lg"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        </div>

        {/* Right: Poster image (hidden on mobile) */}
        <div className="hidden md:flex flex-1 items-center justify-center relative px-2">
          <Image
            src="/background/poster.png"
            alt="Food Mech Poster"
            width={400}
            height={600}
            className="w-full max-w-md rounded-lg shadow-lg z-10"
          />
        </div>
      </div>
    </div>
    );
  };

  export default BookStall;
