'use client';

import React from "react";

const Feedback: React.FC = () => {
  const feedbacks = [
    {
      id: "ri1_CK_3PXs",
      title: "Visitor Testimonial — Innovative Stand",
      description:
        "A visitor shares their experience interacting with our interactive display and samples.",
    },
    {
      id: "8iNFYkiLdfU",
      title: "Exhibitor Feedback — Seamless Setup",
      description:
        "An exhibitor talks about how easy it was to set up and demonstrate products at our booth.",
    },
    {
      id: "6oMbOW73VC8",
      title: "Customer Review — Product Demo",
      description:
        "A short clip of a live product demo and customer reaction at the exhibition.",
    },
    {
      id: "xrIW_HNH8dU",
      title: "Organizer Note — Great Response",
      description:
        "Event organizer provides an overview of attendee engagement and feedback.",
    },
  ];

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center py-12"
      style={{
        backgroundImage: "url('/background/worldmap.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#FCC900",
      }}
    >
      <div className="flex flex-col items-center justify-center w-full rounded-xl p-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-black">
          <span>Our Feedback</span>
          <span className="block">Testimonials of Last Exhibition</span>
        </h1>

        <div className="w-full max-w-6xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {feedbacks.map(({ id, title, description }) => (
              <div
                key={id}
                className="w-full rounded-lg overflow-hidden bg-black shadow-md"
              >
                {/* Responsive iframe wrapper */}
                <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
                  <iframe
                    title={`youtube-video-${id}`}
                    src={`https://www.youtube.com/embed/${id}`}
                    style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                    frameBorder={0}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>

                {/* Caption / link */}
                <div className="p-3 bg-white text-black">
                  <h3 className="font-semibold text-lg">{title}</h3>
                  <p className="text-sm text-gray-700 mb-2">{description}</p>
                  <a
                    href={`https://www.youtube.com/watch?v=${id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-sm text-blue-600 hover:underline"
                  >
                    Watch on YouTube
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
