import React from "react";
import Image from "next/image";

const Information = () => {
  const ribbons = [
    {
      img: '/background/img_rectangle_37.svg',
      title: 'First Day',
      date: '6 February 2025',
      textColor: 'text-white'
    },
    {
      img: '/background/img_rectangle_37_amber_a400.svg',
      title: 'Second Day',
      date: '7 February 2025',
      textColor: 'text-white'
    },
    {
      img: '/background/img_rectangle_37_red_a400.svg',
      title: 'Third Day',
      date: '8 February 2025',
      textColor: 'text-white'
    },
    {
      img: '/background/img_rectangle_37.svg',
      title: 'Fourth Day',
      date: '9 February 2025',
      textColor: 'text-white'
    }
  ];

  return (
    <div className="flex flex-col items-center justify-start bg-white py-4 px-2 min-h-0">
      <h1 className="text-lg sm:text-2xl md:text-3xl font-semibold text-black mb-4">Information of Event Schedules</h1>
      {/* Responsive ribbons */}
      <div className="w-full max-w-4xl pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 justify-center">
          {ribbons.map((ribbon, idx) => (
            <div
              key={idx}
              className="relative w-full h-20 sm:h-24 md:h-20 lg:h-24 flex items-center justify-center"
            >
              <Image
                src={ribbon.img}
                alt={ribbon.title}
                fill
                className="w-full h-full object-cover select-none"
                draggable={false}
                priority={idx === 0}
              />
              <div
                className={`absolute inset-0 flex flex-col items-center justify-center ${ribbon.textColor}`}
                style={{ pointerEvents: 'none', fontFamily: 'inherit' }}
              >
                <span className="font-bold text-xs sm:text-base md:text-lg leading-6" style={{textShadow: '0 1px 2px rgba(0,0,0,0.10)'}}>{ribbon.title}</span>
                <span className="text-[10px] sm:text-xs md:text-sm mt-1" style={{textShadow: '0 1px 2px rgba(0,0,0,0.10)'}}>{ribbon.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Event Info Box */}
      <div className="relative w-full max-w-4xl mt-8 min-h-[50px]">
        <Image
          src="/INFORMATION/Rectangle 38.png"
          alt="event border"
          fill
          className="absolute left-0 bottom-0 w-full h-14 sm:h-20 md:h-[90px] object-cover pointer-events-none select-none drop-shadow-md"
          draggable={false}
          priority
        />
        {/* Content overlay - left-aligned, compact, vertically centered */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 pl-2 sm:pl-4 flex flex-col md:flex-row z-10 min-h-[40px] min-w-[120px]">
          <div className="flex flex-row flex-wrap items-center text-xs sm:text-sm md:text-base text-gray-800 mt-1 gap-2 sm:gap-4">
            <span className="flex items-center gap-1 sm:gap-2">
              <Image
                src="/icons/location.png"
                alt="location"
                width={20}
                height={20}
                className="w-4 h-4 md:w-5 md:h-5 inline-block ml-2 mr-2"
                draggable={false}
                priority={false}
              />
              <span className="whitespace-nowrap">Vanita Vishram Ground</span>
              <span className="hidden sm:inline">, Surat, Gujrat</span>
            </span>
            <span className="flex items-center gap-1 sm:gap-2">
              <Image
                src="/icons/clock.png"
                alt="clock"
                width={20}
                height={20}
                className="w-4 h-4 md:w-5 md:h-5 inline-block mr-2"
                draggable={false}
                priority={false}
              />
              <span className="whitespace-nowrap">10:00 - 6:00</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Information;
