"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
// QRCode and html-to-image are only needed when rendering/downloading a pass, so load them dynamically
let QRCodeSVG: unknown = null;

// Small client-only component to dynamically load QRCodeSVG
function LazyQRCode({ value, size }: { value: string; size?: number }) {
  const [Comp, setComp] = React.useState<null | React.ComponentType<Record<string, unknown>>>(null);

  React.useEffect(() => {
    let mounted = true;
    import("qrcode.react").then((m) => {
      if (mounted) setComp(() => (m.QRCodeSVG as unknown) as React.ComponentType<Record<string, unknown>>);
    });
    return () => {
      mounted = false;
    };
  }, []);

  if (!Comp) return <div style={{ width: size || 260, height: size || 260 }} />;
  return <Comp value={value} size={size || 260} level="H" includeMargin={true} />;
}


const Visitor: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    visitorType: "B2B",
    mobile: "",
    businessCategory: "",
    numberOfPerson: "",
    email: "",
  });

  const [showPersons, setShowPersons] = useState(false);
  const [entryPass, setEntryPass] = useState<null | {
    registrationCode: string;
    id: string;
    fullName: string;
    visitorType: string;
    numberOfPerson: string;
    mobile: string;
  }>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [downloading, setDownloading] = useState(false);

  const passRef = useRef<HTMLDivElement | null>(null);

  // --- Generate Random Registration Code ---
  const generateCode = () => {
    return "FM-" + Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  // --- Submit Handler (Frontend Only) ---
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Prepare registration code
    const registrationCode = generateCode();

    // Prepare payload
    const payload = {
      name: formData.fullName,
      b2bOrB2c: formData.visitorType,
      mobile: formData.mobile,
      email: formData.email,
      category: formData.businessCategory,
      numberOfPerson: formData.numberOfPerson || "1",
      registrationCode,
    };

    // Send to backend
  fetch("https://foodmechasia1.onrender.com/api/visitorpass", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then(async (res) => {
        if (res.ok) {
          setEntryPass({
            registrationCode,
            id: Date.now().toString(),
            fullName: formData.fullName,
            visitorType: formData.visitorType,
            numberOfPerson: formData.numberOfPerson || "1",
            mobile: formData.mobile,
          });
        } else {
          setError("Submission failed. Please try again.");
        }
      })
      .catch(() => {
        setError("Network error. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // --- Handle input changes ---
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // --- Handle Visitor Type ---
  const handleVisitorTypeChange = (type: string) => {
    setFormData((prev) => ({ ...prev, visitorType: type }));
    setShowPersons(type === "B2C");
  };

  // --- Download Pass as PNG ---
  const handleDownload = async () => {
    if (!passRef.current) return;
    setDownloading(true);
    try {
      if (!QRCodeSVG) {
        // ensure QRCode library is loaded for client-side rendering (it may already be used above)
        QRCodeSVG = (await import("qrcode.react")).QRCodeSVG;
      }
      const { toPng } = await import("html-to-image");

      const dataUrl = await toPng(passRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: "#ffffff",
      });

      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `${entryPass?.registrationCode || "visitor-pass"}.png`;
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error(err);
      alert("Failed to download pass");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-white overflow-hidden">
      {/* Diagonal Sponsor PNG background - maximize visibility */}
      <div className="absolute inset-0 z-0 select-none">
        <Image
          src="/background/sponserbecome .png"
          alt="Sponsor Become Background"
          fill
          style={{ objectFit: "cover", objectPosition: "center", opacity: 1 }}
          className="w-full h-full"
          priority
        />
      </div>
      {/* Top Hero Section */}
      <div className="w-full relative z-10">
        <div
          className="w-full h-48 md:h-64 lg:h-72 bg-center bg-cover flex items-center justify-center"
          style={{ backgroundImage: `url('/background/visitor pass.png')` }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg">
            Visitor Pass
          </h1>
        </div>
      </div>

      {/* Main Form / Pass */}
      <div className="relative z-10 flex w-full justify-center pt-12 pb-8">
        <div className="relative z-20 w-full max-w-xl mx-auto px-6 py-8 bg-white/90 rounded-xl shadow-xl border border-gray-100">
          {!entryPass ? (
            <>
              <div className="text-center mb-6">
                <h2 className="text-xl md:text-2xl font-semibold">Visitor Pass</h2>
              </div>
              {error && <div className="text-red-600 text-center mb-2">{error}</div>}
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full h-10 md:h-12 px-3 bg-white border border-gray-300 rounded-md placeholder-gray-500 text-center"
                />
                <div className="flex items-center justify-center gap-8">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="visitorType"
                      value="B2B"
                      checked={formData.visitorType === "B2B"}
                      onChange={() => handleVisitorTypeChange("B2B")}
                      className="accent-green-500"
                    />
                    B2B
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="visitorType"
                      value="B2C"
                      checked={formData.visitorType === "B2C"}
                      onChange={() => handleVisitorTypeChange("B2C")}
                      className="accent-green-500"
                    />
                    B2C
                  </label>
                </div>

                {/* Number of Person (only for B2C) */}
                {showPersons && (
                  <input
                    type="number"
                    name="numberOfPerson"
                    min="1"
                    placeholder="Number of Person"
                    value={formData.numberOfPerson}
                    onChange={handleChange}
                    className="w-full h-10 md:h-12 px-3 bg-white border border-gray-300 rounded-md"
                  />
                )}

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

                <input
                  type="text"
                  name="businessCategory"
                  placeholder="Business Category"
                  value={formData.businessCategory}
                  onChange={handleChange}
                  className="w-full h-10 md:h-12 px-3 bg-white border border-gray-300 rounded-md"
                />

                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="w-3/4 md:w-1/2 bg-green-300 text-black py-2 md:py-3 rounded-md hover:bg-green-400 transition-colors font-semibold"
                    disabled={loading}
                  >
                    {loading ? "Generating..." : "Submit"}
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 py-6">
              {/* Pass */}
              <div
                ref={passRef}
                className="bg-[#e6f7ff] rounded-2xl shadow-lg p-8 w-full max-w-2xl border-2 border-yellow-400 relative overflow-hidden"
                style={{ minHeight: 710 }}
              >
                {/* Top images */}
                <Image
                  src="/images/pass/t1.png"
                  alt="top-left"
                  width={112}
                  height={112}
                  className="h-24 md:h-28 absolute left-5 top-0 object-contain"
                  priority
                />
                <Image
                  src="/images/pass/t2.png"
                  alt="top-right"
                  width={112}
                  height={80}
                  className="h-24 md:h-20 absolute right-5 top-0 object-contain"
                  priority
                />

                {/* ENTRY PASS banner */}
                <div className="w-full flex justify-center mt-20 z-10">
                  <div className="bg-[#d0021b] text-white font-extrabold text-3xl md:text-4xl px-12 py-3 rounded-b-lg tracking-widest">
                    ENTRY PASS
                  </div>
                </div>

                {/* QR */}
                <div className="flex flex-col items-center mt-6 px-4 z-10">
                  <div
                    className="bg-white rounded-3xl p-4 shadow-2xl border border-gray-100"
                    style={{ width: 360 }}
                  >
                    <div className="flex items-center justify-center p-1">
                        <LazyQRCode value={entryPass.registrationCode} size={260} />
                    </div>
                    <div className="mt-2 text-center">
                      <div className="font-semibold text-sm text-gray-700">
                        Registration Code
                      </div>
                      <div className="text-base md:text-lg font-bold tracking-widest text-gray-900">
                        {entryPass.registrationCode}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer logos */}
                <div className="absolute left-0 bottom-0 w-full flex flex-col items-center px-6 py-4 z-10 bg-transparent">
                  <div className="w-full flex justify-around items-start mb-2">
                    <div className="text-center w-1/3">
                      <div className="text-xs text-gray-600">ORGANIZED BY</div>
                    </div>
                    <div className="text-center w-1/3">
                      <div className="text-xs text-gray-600">
                        DESIGN & DEVELOP PARTNER
                      </div>
                    </div>
                    <div className="text-center w-1/3">
                      <div className="text-xs text-gray-600">MEDIA PARTNER</div>
                    </div>
                  </div>

                  <div className="w-full flex justify-around items-center">
                    <Image
                      src="/images/pass/logo3.jpg"
                      alt="logo3"
                      width={40}
                      height={40}
                      className="h-10 object-contain"
                    />
                    <Image
                      src="/images/pass/logo2.png"
                      alt="logo2"
                      width={40}
                      height={40}
                      className="h-10 object-contain"
                    />
                    <Image
                      src="/images/pass/logo21.png"
                      alt="logo21"
                      width={40}
                      height={40}
                      className="h-10 object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* Download button */}
              <button
                onClick={handleDownload}
                disabled={downloading}
                className={`px-6 py-3 rounded-md shadow text-white font-semibold ${
                  downloading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                {downloading ? "Downloading…" : "Download Pass"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Visitor;
