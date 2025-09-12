
import Link from "next/link";
import Image from "next/image";

export default function AdminPanel() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navbar */}
      <nav className="bg-white shadow flex items-center justify-between px-8 py-4">
        <div className="flex items-center gap-3">
          <Image src="/LOGO/LOGO.png" alt="Logo" width={60} height={24} />
          <span className="text-xl font-bold text-green-700">Admin Panel</span>
        </div>
        <div className="flex gap-6">
          <Link href="/admin-panel/contact" className="text-base font-medium text-gray-700 hover:text-green-700 transition">Contact Us</Link>
          <Link href="/admin-panel/bookstall" className="text-base font-medium text-gray-700 hover:text-green-700 transition">Book Stall</Link>
          <Link href="/admin-panel/sponsor" className="text-base font-medium text-gray-700 hover:text-green-700 transition">Sponsor</Link>
          <Link href="/admin-panel/visitor" className="text-base font-medium text-gray-700 hover:text-green-700 transition">Visitor</Link>
        </div>
        <div className="text-gray-500 text-sm">Welcome, Foodmechasia@1060</div>
      </nav>

      {/* Main Content */}
      <div className="flex flex-col items-center py-12">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-8">
          <h2 className="text-2xl font-bold text-green-700 mb-6">Welcome to Admin Panel</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section className="bg-green-100 rounded-lg p-6 shadow">
              <h3 className="text-xl font-semibold text-green-800 mb-2">Contact Us</h3>
              <p className="text-gray-700">View and manage contact requests from visitors.</p>
            </section>
            <section className="bg-yellow-100 rounded-lg p-6 shadow">
              <h3 className="text-xl font-semibold text-yellow-800 mb-2">Book Stall</h3>
              <p className="text-gray-700">Manage stall bookings and approvals.</p>
            </section>
            <section className="bg-blue-100 rounded-lg p-6 shadow">
              <h3 className="text-xl font-semibold text-blue-800 mb-2">Sponsor</h3>
              <p className="text-gray-700">Review and update sponsor details.</p>
            </section>
            <section className="bg-pink-100 rounded-lg p-6 shadow">
              <h3 className="text-xl font-semibold text-pink-800 mb-2">Visitor</h3>
              <p className="text-gray-700">See visitor registrations and passes.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
