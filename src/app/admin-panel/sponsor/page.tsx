"use client";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

interface Sponsor {
  _id: string;
  name: string;
  businessName: string;
  city: string;
  contactNumber: string;
  email: string;
  message: string;
  createdAt: string;
}

const API_BASE = "https://foodmechasia1.onrender.com";

export default function SponsorAdmin() {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(`${API_BASE}/api/sponsor`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch sponsors");
        return res.json();
      })
      .then((data) => {
        setSponsors(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filteredSponsors = sponsors.filter((sponsor) => {
    const q = search.toLowerCase();
    return (
      sponsor.name.toLowerCase().includes(q) ||
      sponsor.businessName.toLowerCase().includes(q) ||
      sponsor.city.toLowerCase().includes(q) ||
      sponsor.contactNumber.toLowerCase().includes(q) ||
      sponsor.email.toLowerCase().includes(q) ||
      sponsor.message.toLowerCase().includes(q) ||
      new Date(sponsor.createdAt).toLocaleString().toLowerCase().includes(q)
    );
  });

  const handleDownload = () => {
    const data = filteredSponsors.map(({ _id, ...rest }) => rest);
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sponsors");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "sponsors.xlsx");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <h2 className="text-3xl font-extrabold text-blue-700">Sponsor Requests</h2>
          <span className="text-gray-500">Total: {filteredSponsors.length}</span>
          <div className="flex gap-2 items-center">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-blue-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={handleDownload}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition"
            >
              Download Excel
            </button>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <p className="text-gray-700 mb-6 text-lg">Review and update sponsor details.</p>
          {loading ? (
            <div className="text-gray-500 text-center py-12 text-xl">Loading...</div>
          ) : error ? (
            <div className="text-red-500 text-center py-12 text-xl">{error}</div>
          ) : filteredSponsors.length === 0 ? (
            <div className="text-gray-400 text-center py-12 text-xl">No sponsor requests found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border-separate border-spacing-y-2">
                <thead>
                  <tr className="bg-blue-100 sticky top-0 z-10">
                    <th className="p-3 rounded-l-xl">Name</th>
                    <th className="p-3">Business Name</th>
                    <th className="p-3">City</th>
                    <th className="p-3">Contact</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Message</th>
                    <th className="p-3 rounded-r-xl">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSponsors.map((sponsor) => (
                    <tr key={sponsor._id} className="bg-blue-50 hover:bg-blue-200 transition rounded-xl shadow-sm">
                      <td className="p-3 font-semibold text-blue-900 rounded-l-xl">{sponsor.name}</td>
                      <td className="p-3">{sponsor.businessName}</td>
                      <td className="p-3">{sponsor.city}</td>
                      <td className="p-3">{sponsor.contactNumber}</td>
                      <td className="p-3">{sponsor.email}</td>
                      <td className="p-3 max-w-xs truncate" title={sponsor.message}>{sponsor.message}</td>
                      <td className="p-3 rounded-r-xl">{new Date(sponsor.createdAt).toLocaleString()}</td>
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
