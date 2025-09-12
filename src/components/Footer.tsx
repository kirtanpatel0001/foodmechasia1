"use client";


import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Footer: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "Foodmechasia@1060" && password === "Foodmech@0278") {
      setError("");
      setShowModal(false);
      router.push("/admin-panel");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <footer
      className="relative w-full bg-white pt-12 pb-6 overflow-hidden"
      style={{
        "--bg-width": "100%",
        "--bg-right": "0",
        "--bg-top": "0",
        "--bg-rotate": "0deg",
        "--content-padding": "4rem",
      } as React.CSSProperties}
    >
      <Image
        src="/background/footer.svg"
        alt="decorative"
        className="absolute z-0 hidden md:block"
        style={{
          width: 'var(--bg-width)',
          height: '100%',
          right: 'var(--bg-right)',
          top: 'var(--bg-top)',
          transform: 'rotate(var(--bg-rotate))',
          objectFit: 'cover'
        }}
        width={1920}
        height={400}
      />
      
      <Image
        src="/background/footerhalf.png"
        alt="ellipse"
        className="absolute left-0 top-0 w-24 h-24 object-cover z-0 hidden sm:block"
        width={96}
        height={96}
      />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start px-6 md:px-16 pb-8 md:pb-28 gap-y-8">
        {/* Left: Logo and description */}
        <div className="flex-1 w-full md:min-w-[300px] mb-0 md:mb-0 pr-0 md:pr-12">
          <Image
            src="/LOGO/LOGO.png"
            alt="Food Mech Logo"
            className="w-40 md:w-48 mb-4 md:mb-6"
            width={192}
            height={72}
            priority
          />
          <p className="text-black text-sm md:text-base mb-6 md:mb-8 w-full md:max-w-xs leading-relaxed">
            These festivals have always been a means of uniting communities through celebrations of harvests and giving thanks for a plentiful growing season.
          </p>
          <div className="flex gap-4">
            <a href="https://www.facebook.com/FoodmechAsia1/" target="_blank" rel="noopener noreferrer">
              <Image src="/icons/facebook.png" alt="Facebook" className="w-8 h-8" width={32} height={32} />
            </a>
            <a href="https://www.instagram.com/food_mech.in?igsh=aHF5NmEzY2ZkbXN5" target="_blank" rel="noopener noreferrer">
              <Image src="/icons/instagram.jpeg" alt="Instagram" className="w-8 h-8 rounded-full object-cover" width={32} height={32} />
            </a>
            <a href="https://www.youtube.com/@FOODMECHASIA" target="_blank" rel="noopener noreferrer">
              <Image src="/icons/yotube.png" alt="YouTube" className="w-8 h-8" width={32} height={32} />
            </a>
          </div>
        </div>

        {/* Center: Explore links */}
        <div className="flex-1 w-full md:min-w-[200px] mb-0 md:mb-0 px-0 md:px-12">
          <h3 className="text-black text-xl md:text-2xl font-semibold mb-4 md:mb-6">Explore</h3>
          <ul className="space-y-3 text-black text-sm md:text-base">
            <li>
              <Link href="/#sponsors-section" className="hover:underline">Our Sponsors</Link>
            </li>
            <li>
              <Link href="/#become-sponsor-section" className="hover:underline">Become Sponsor</Link>
            </li>
            <li><Link href="/bookstall" className="hover:underline">Book Stall</Link></li>
            <li><Link href="/privacypolicy" className="hover:underline">Privacy Policy</Link></li>
            <li><Link href="/contactus" className="hover:underline">Contact Us</Link></li>
          </ul>
        </div>

        {/* Right: Contact info */}
        <div className="flex-1 w-full md:min-w-[300px] pl-0 md:pl-12">
          <h3 className="text-black text-xl md:text-2xl font-semibold mb-4 md:mb-6">Contact</h3>
          <div className="flex items-start gap-3 mb-4">
            <Image src="/icons/location.png" alt="Location" className="w-5 h-5 mt-1" width={20} height={20} />
            <span className="text-black text-sm md:text-base leading-relaxed block">
              1-2 shikhar complex, beside Adajan Police Station, behind Gangeshwar Mahadev Mandir, Adajan, Surat, Gujarat, India
            </span>
          </div>
          <div className="flex items-center gap-2 mb-2 text-sm md:text-base">
            <Image src="/icons/email.jpeg" alt="Email" className="w-4 h-4" width={16} height={16} />
            <a href="mailto:marketing.foodmechasia@gmail.com" className="break-words">marketing.foodmechasia@gmail.com</a>
          </div>

          <div className="flex items-center gap-2 mb-1">
            <Image src="/icons/img_phone.svg" alt="Phone" className="w-5 h-5" width={20} height={20} />
            <span className="text-green-700 font-semibold">+91 98981 23103</span>
          </div>
          <div className="flex items-center gap-2 mb-1">
            <Image src="/icons/img_phone.svg" alt="Phone" className="w-5 h-5" width={20} height={20} />
            <span className="text-green-700 font-semibold">+91 98980 36959</span>
          </div>
          <div className="flex items-center gap-2 mb-1">
            <Image src="/icons/img_phone.svg" alt="Phone" className="w-5 h-5" width={20} height={20} />
            <span className="text-green-700 font-semibold">+91 98980 72103</span>
          </div>
          <div className="mt-3">
            <button onClick={() => setShowModal(true)} className="text-sm px-3 py-1 border rounded bg-green-700 text-white hover:bg-green-800 transition">Admin Login</button>
          </div>
        </div>

      </div>

      {/* Admin Login Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-sm relative">
            <button className="absolute top-2 right-2 text-gray-500 hover:text-black" onClick={() => setShowModal(false)}>&times;</button>
            <div className="flex flex-col items-center mb-6">
              <Image src="/LOGO/LOGO.png" alt="Logo" width={120} height={40} className="mb-4" />
              <h2 className="text-xl font-bold mb-2">Admin Login</h2>
            </div>
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="border rounded px-3 py-2 focus:outline-none focus:ring focus:border-green-700"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="border rounded px-3 py-2 focus:outline-none focus:ring focus:border-green-700"
                required
              />
              {error && <div className="text-red-600 text-sm text-center">{error}</div>}
              <button type="submit" className="bg-green-700 text-white py-2 rounded hover:bg-green-800 transition">Login</button>
            </form>
          </div>
        </div>
      )}

      {/* Bottom copyright bar */}
      <div className="relative z-20 bg-black text-white text-center py-2 w-full text-sm md:text-lg font-medium mt-8 md:mt-auto">
        Copyright © 2025 Food Mech Asia. Developed by  
        <a
          href="tel:+919327940864"
          className="underline hover:text-green-400 transition-colors cursor-pointer"
          style={{ marginLeft: 2 }}
        >
          SKILL CODE.AI
        </a>
      </div>
    </footer>
  );
};

export default Footer;
