"use client";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

interface BookStall {
  _id: string;
  fullName: string;
  businessName: string;
  city: string;
  contactNumber: string;
  email: string;
  message: string;
  createdAt: string;
}

const API_BASE = "https://foodmechasia1.onrender.com";

export default function BookStallAdmin() {
  const [bookstalls, setBookstalls] = useState<BookStall[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(`${API_BASE}/api/bookstall`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch bookstalls");
        return res.json();
      })
      .then((data) => {
        setBookstalls(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filteredBookstalls = bookstalls.filter((stall) => {
    const q = search.toLowerCase();
    return (
      stall.fullName.toLowerCase().includes(q) ||
      stall.businessName.toLowerCase().includes(q) ||
      stall.city.toLowerCase().includes(q) ||
      stall.contactNumber.toLowerCase().includes(q) ||
      stall.email.toLowerCase().includes(q) ||
      stall.message.toLowerCase().includes(q) ||
      new Date(stall.createdAt).toLocaleString().toLowerCase().includes(q)
    );
  });

  const handleDownload = () => {
    const data = filteredBookstalls.map(({ _id, ...rest }) => rest);
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "BookStalls");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "bookstalls.xlsx");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-white flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <h2 className="text-3xl font-extrabold text-yellow-700">Book Stall Requests</h2>
          <span className="text-gray-500">Total: {filteredBookstalls.length}</span>
          <div className="flex gap-2 items-center">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-yellow-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button
              onClick={handleDownload}
              className="bg-yellow-600 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-yellow-700 transition"
            >
              Download Excel
            </button>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <p className="text-gray-700 mb-6 text-lg">Manage stall bookings and approvals.</p>
          {loading ? (
            <div className="text-gray-500 text-center py-12 text-xl">Loading...</div>
          ) : error ? (
            <div className="text-red-500 text-center py-12 text-xl">{error}</div>
          ) : filteredBookstalls.length === 0 ? (
            <div className="text-gray-400 text-center py-12 text-xl">No stall bookings found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border-separate border-spacing-y-2">
                <thead>
                  <tr className="bg-yellow-100 sticky top-0 z-10">
                    <th className="p-3 rounded-l-xl">Full Name</th>
                    <th className="p-3">Business Name</th>
                    <th className="p-3">City</th>
                    <th className="p-3">Contact</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Message</th>
                    <th className="p-3 rounded-r-xl">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookstalls.map((stall) => (
                    <tr key={stall._id} className="bg-yellow-50 hover:bg-yellow-200 transition rounded-xl shadow-sm">
                      <td className="p-3 font-semibold text-yellow-900 rounded-l-xl">{stall.fullName}</td>
                      <td className="p-3">{stall.businessName}</td>
                      <td className="p-3">{stall.city}</td>
                      <td className="p-3">{stall.contactNumber}</td>
                      <td className="p-3">{stall.email}</td>
                      <td className="p-3 max-w-xs truncate" title={stall.message}>{stall.message}</td>
                      <td className="p-3 rounded-r-xl">{new Date(stall.createdAt).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
