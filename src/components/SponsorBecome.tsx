// app/components/SponsorBecome.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const SponsorBecome: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    businessName: '',
    city: '',
    contactNumber: '',
    email: '',
    message: ''
  });
  const [wordCount, setWordCount] = useState(0);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare payload
    const payload = {
      name: formData.fullName,
      businessName: formData.businessName,
      city: formData.city,
      contactNumber: formData.contactNumber,
      email: formData.email,
      message: formData.message,
    };

    fetch("http://localhost:5000/api/sponsor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then(async (res) => {
        if (res.ok) {
          setSuccess(true);
          setFormData({
            fullName: '', businessName: '', city: '', contactNumber: '', email: '', message: ''
          });
          setWordCount(0);
          setTimeout(() => setSuccess(false), 3000);
        }
      })
      .catch(() => {
        // handle error
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === 'message') {
      const words = value.trim().split(/\s+/);
      if (words.length <= 100) {
        setFormData(prev => ({ ...prev, [name]: value }));
        setWordCount(words.length);
      } else {
        setFormData(prev => ({ ...prev, [name]: words.slice(0, 100).join(' ') }));
        setWordCount(100);
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 sm:px-6 md:px-8">
      {/* Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
          src="/background/sponserbecome .svg"
          alt="background pattern"
          fill
          className="object-cover opacity-90"
        />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row w-full max-w-[1280px] mx-auto py-12 gap-8">
        {/* Form Section */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="w-full max-w-xl mx-auto">
            <div className="text-center mb-4">
              <h2 className="text-2xl sm:text-3xl font-bold">Connect with us</h2>
              <h3 className="text-xl sm:text-2xl font-semibold">Become Our Sponsor</h3>
            </div>

            {/* Contact Info */}
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-8">
              {['+91 98981 23103', '+91 98980 36959', '+91 98980 72103'].map((phone, idx) => (
                <a key={idx} href={`tel:${phone}`} className="flex items-center gap-2 text-sm sm:text-lg">
                  <span>📞</span>{phone}
                </a>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {success && <div className="text-green-600 text-center font-semibold">Thank you! Your submission has been received.</div>}

              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full p-3 bg-white border border-gray-300 rounded-md"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="businessName"
                  placeholder="Business Name"
                  value={formData.businessName}
                  onChange={handleChange}
                  className="w-full p-3 bg-white border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full p-3 bg-white border border-gray-300 rounded-md"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="tel"
                  name="contactNumber"
                  placeholder="Contact Number"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  className="w-full p-3 bg-white border border-gray-300 rounded-md"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 bg-white border border-gray-300 rounded-md"
                />
              </div>

              <textarea
                name="message"
                placeholder="Write Message (max 100 words)"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full p-3 bg-white border border-gray-300 rounded-md"
              />
              <div className="text-right text-xs text-gray-500">{wordCount}/100 words</div>

              <button
                type="submit"
                className="w-full bg-green-300 text-black py-3 px-6 rounded-md hover:bg-green-400 transition-colors font-semibold"
              >
                Submit
              </button>
            </form>
          </div>
        </div>

        {/* Poster Section */}
        <div className="hidden md:flex flex-1 items-center justify-center">
          <Image
            src="/background/poster.png"
            alt="Food Mech Poster"
            width={400}
            height={600}
            className="w-full max-w-xs sm:max-w-sm md:max-w-md rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default SponsorBecome;
