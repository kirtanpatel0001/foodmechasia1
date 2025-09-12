"use client";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

interface Contact {
  _id: string;
  name: string;
  mobile: string;
  email: string;
  message: string;
  createdAt: string;
}

const API_BASE = "https://foodmechasia1.onrender.com";

export default function ContactAdmin() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(`${API_BASE}/api/contact`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch contacts");
        return res.json();
      })
      .then((data) => {
        setContacts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filteredContacts = contacts.filter((contact) => {
    const q = search.toLowerCase();
    return (
      contact.name.toLowerCase().includes(q) ||
      contact.mobile.toLowerCase().includes(q) ||
      contact.email.toLowerCase().includes(q) ||
      contact.message.toLowerCase().includes(q) ||
      new Date(contact.createdAt).toLocaleString().toLowerCase().includes(q)
    );
  });

  const handleDownload = () => {
    const data = filteredContacts.map(({ _id, ...rest }) => rest);
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Contacts");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "contacts.xlsx");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <h2 className="text-3xl font-extrabold text-green-700">Contact Requests</h2>
          <span className="text-gray-500">Total: {filteredContacts.length}</span>
          <div className="flex gap-2 items-center">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-green-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button
              onClick={handleDownload}
              className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-green-700 transition"
            >
              Download Excel
            </button>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <p className="text-gray-700 mb-6 text-lg">View and manage contact requests from visitors.</p>
          {loading ? (
            <div className="text-gray-500 text-center py-12 text-xl">Loading...</div>
          ) : error ? (
            <div className="text-red-500 text-center py-12 text-xl">{error}</div>
          ) : filteredContacts.length === 0 ? (
            <div className="text-gray-400 text-center py-12 text-xl">No contact requests found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border-separate border-spacing-y-2">
                <thead>
                  <tr className="bg-green-100 sticky top-0 z-10">
                    <th className="p-3 rounded-l-xl">Name</th>
                    <th className="p-3">Mobile</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Message</th>
                    <th className="p-3 rounded-r-xl">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredContacts.map((contact) => (
                    <tr key={contact._id} className="bg-green-50 hover:bg-green-200 transition rounded-xl shadow-sm">
                      <td className="p-3 font-semibold text-green-900 rounded-l-xl">{contact.name}</td>
                      <td className="p-3">{contact.mobile}</td>
                      <td className="p-3">{contact.email}</td>
                      <td className="p-3 max-w-xs truncate" title={contact.message}>{contact.message}</td>
                      <td className="p-3 rounded-r-xl">{new Date(contact.createdAt).toLocaleString()}</td>
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
