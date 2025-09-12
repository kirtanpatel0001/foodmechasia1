"use client";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

interface VisitorPass {
  _id: string;
  name: string;
  b2bOrB2c: string;
  mobile: string;
  email: string;
  category: string;
  numberOfPerson: number;
  registrationCode: string;
  createdAt: string;
}

const API_BASE = "http://localhost:5000";

export default function VisitorPassAdmin() {
  const [visitorpasses, setVisitorpasses] = useState<VisitorPass[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(`${API_BASE}/api/visitorpass`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch visitor passes");
        return res.json();
      })
      .then((data) => {
        setVisitorpasses(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filteredVisitorpasses = visitorpasses.filter((pass) => {
    const q = search.toLowerCase();
    return (
      pass.name.toLowerCase().includes(q) ||
      pass.b2bOrB2c.toLowerCase().includes(q) ||
      pass.mobile.toLowerCase().includes(q) ||
      pass.email.toLowerCase().includes(q) ||
      pass.category.toLowerCase().includes(q) ||
      pass.registrationCode.toLowerCase().includes(q) ||
      pass.numberOfPerson.toString().includes(q) ||
      new Date(pass.createdAt).toLocaleString().toLowerCase().includes(q)
    );
  });

  const handleDownload = () => {
    const data = filteredVisitorpasses.map(({ _id, ...rest }) => rest);
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "VisitorPasses");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "visitorpasses.xlsx");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <h2 className="text-3xl font-extrabold text-purple-700">Visitor Passes</h2>
          <span className="text-gray-500">Total: {filteredVisitorpasses.length}</span>
          <div className="flex gap-2 items-center">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-purple-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <button
              onClick={handleDownload}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-purple-700 transition"
            >
              Download Excel
            </button>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <p className="text-gray-700 mb-6 text-lg">View and manage visitor pass registrations.</p>
          {loading ? (
            <div className="text-gray-500 text-center py-12 text-xl">Loading...</div>
          ) : error ? (
            <div className="text-red-500 text-center py-12 text-xl">{error}</div>
          ) : filteredVisitorpasses.length === 0 ? (
            <div className="text-gray-400 text-center py-12 text-xl">No visitor passes found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border-separate border-spacing-y-2">
                <thead>
                  <tr className="bg-purple-100 sticky top-0 z-10">
                    <th className="p-3 rounded-l-xl">Name</th>
                    <th className="p-3">B2B/B2C</th>
                    <th className="p-3">Mobile</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Persons</th>
                    <th className="p-3">Reg. Code</th>
                    <th className="p-3 rounded-r-xl">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredVisitorpasses.map((pass) => (
                    <tr key={pass._id} className="bg-purple-50 hover:bg-purple-200 transition rounded-xl shadow-sm">
                      <td className="p-3 font-semibold text-purple-900 rounded-l-xl">{pass.name}</td>
                      <td className="p-3">{pass.b2bOrB2c}</td>
                      <td className="p-3">{pass.mobile}</td>
                      <td className="p-3">{pass.email}</td>
                      <td className="p-3">{pass.category}</td>
                      <td className="p-3">{pass.numberOfPerson}</td>
                      <td className="p-3">{pass.registrationCode}</td>
                      <td className="p-3 rounded-r-xl">{new Date(pass.createdAt).toLocaleString()}</td>
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
