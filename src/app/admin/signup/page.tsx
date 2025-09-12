import React from "react";

export default function AdminSignupPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-8 sm:px-8 sm:py-16">
      <h1 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-8 text-center">Admin Signup</h1>
      <form className="flex flex-col gap-4 w-full max-w-full sm:max-w-sm">
        <input type="email" placeholder="Email" className="border p-2 rounded w-full" required />
        <input type="password" placeholder="Password" className="border p-2 rounded w-full" required />
        <input type="text" placeholder="Full Name" className="border p-2 rounded w-full" required />
        <button type="submit" className="bg-green-600 text-white py-2 rounded w-full">Sign Up</button>
      </form>
    </main>
  );
}
