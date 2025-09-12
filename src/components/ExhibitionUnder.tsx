// app/components/ExhibitionUnder.tsx
'use client';

import React, { useEffect } from "react";
import Image from "next/image";

// Card component
interface CardProps {
  className?: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ className = "", children }) => (
  <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}>
    {children}
  </div>
);

interface CardContentProps {
  className?: string;
  children: React.ReactNode;
}

const CardContent: React.FC<CardContentProps> = ({ className = "", children }) => (
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
);

const exhibitionFeatures = [
  "Learn about Services in Industry",
  "Less Time High Promotion",
  "Market Research Opportunity",
  "Customer Integration",
  "Data Collection",
  "Boost your Sales",
  "Product Showcase",
  "Target Audience",
  "Press and media coverage",
  "On-site product sales",
  "Product Testing",
  "Product Samples Demo",
  "Lead Generation",
  "Workshops"
];

export const ExhibitionUnder: React.FC = () => {
  return (
    <main className="bg-transparent w-screen h-screen min-h-screen flex items-center justify-center overflow-hidden">
      <div className="relative w-full h-full flex items-center justify-center">

        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/background/bg.png"
            alt="Background"
            className="w-full h-full object-cover opacity-20"
            fill
            priority
          />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(134deg,rgba(185,238,221,0.2)_0%,rgba(185,238,221,0.44)_100%)] z-10" />

        {/* Content */}
        <section className="absolute inset-0 z-20 flex flex-col items-center justify-start overflow-y-hidden px-4 sm:px-6 lg:px-12 py-6 sm:py-10">
          <header className="[font-family:'Kantumruy_Pro',Helvetica] font-semibold text-black text-2xl sm:text-3xl md:text-4xl lg:text-[43px] text-center mb-6 sm:mb-8">
            Why Sponsorship?
          </header>

          {/* Responsive grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-x-6 sm:gap-y-6 md:gap-x-8 md:gap-y-[35px]">
            {exhibitionFeatures.map((feature, index) => (
              <Card key={`benefit-${index}`} className="w-full max-w-md mx-auto shadow-none">
                <CardContent className="flex items-center justify-center bg-white rounded-[20px] min-h-[60px] px-4 py-2">
                  <div className="relative w-fit [font-family:'Kantumruy_Pro',Helvetica] font-medium text-black text-base sm:text-lg md:text-xl text-center">
                    {feature}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

// CSS styles
export const exhibitionStyles = `
@import url("https://fonts.googleapis.com/css?family=Kantumruy+Pro:500,600");

:root {
  --background: 0 0% 100%;
  --foreground: 222.2 47.4% 11.2%;
  --card: transparent;
  --card-foreground: 222.2 47.4% 11.2%;
  --border: 214.3 31.8% 91.4%;
  --radius: 0.5rem;
}

.bg-card {
  background-color: hsl(var(--card));
}

.text-card-foreground {
  color: hsl(var(--card-foreground));
}

.border {
  border-width: 1px;
  border-color: hsl(var(--border));
}

.rounded-lg {
  border-radius: calc(var(--radius) + 2px);
}

.shadow-sm {
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
}
`;

// Wrapper component to inject styles
export const CompleteExhibitionApp: React.FC = () => {
  useEffect(() => {
    const styleElement = document.createElement("style");
    styleElement.textContent = exhibitionStyles;
    document.head.appendChild(styleElement);
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  return <ExhibitionUnder />;
};

export default CompleteExhibitionApp;
