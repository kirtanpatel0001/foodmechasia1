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
      <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-black mb-4">Information of Event Schedules</h1>
      {/* ribbons: use wrapping layout so items fit and no horizontal scroll is needed; md+ keeps original size */}
      <div className="w-full max-w-4xl pb-8">
  <div className="grid grid-cols-2 gap-3 md:flex md:flex-nowrap md:justify-center">
          {ribbons.map((ribbon, idx) => (
            <div
              key={idx}
              className="relative"
              // responsive sizes: mobile smaller, md+ original
              style={{ width: '180px', height: '80px' }}
            >
              <Image
                src={ribbon.img}
                alt={ribbon.title}
                fill
                className="w-full h-full object-cover select-none"
                draggable={false}
                style={{ display: 'block' }}
                priority={idx === 0}
              />
              <div
                className={`absolute inset-0 flex flex-col items-center justify-center ${ribbon.textColor}`}
                style={{ pointerEvents: 'none', fontFamily: 'inherit' }}
              >
                <span className="font-bold text-base sm:text-lg leading-6" style={{textShadow: '0 1px 2px rgba(0,0,0,0.10)'}}>{ribbon.title}</span>
                <span className="text-xs sm:text-sm mt-1" style={{textShadow: '0 1px 2px rgba(0,0,0,0.10)'}}>{ribbon.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Event Info Box */}
      <div className="relative w-full max-w-4xl mt-8" style={{ minHeight: '50px' }}>
        <Image
          src="/INFORMATION/Rectangle 38.png"
          alt="event border"
          fill
          className="absolute left-0 bottom-0 w-full h-[70px] md:h-[90px] object-cover pointer-events-none select-none drop-shadow-md"
          draggable={false}
          style={{ objectFit: "cover" }}
          priority
        />
       
        {/* Content overlay - left-aligned, compact, vertically centered */}
  <div className="absolute left-0 top-1/2 -translate-y-1/2 pl-4 sm:pl-6 flex flex-col md:flex-row z-10" style={{minHeight: '56px', minWidth: '220px'}}>

          <div className="flex flex-row flex-wrap items-center text-sm md:text-sm text-gray-800 mt-1 gap-4">
            <span className="flex items-center gap-2">
              <Image
                src="/icons/location.png"
                alt="location"
                width={20}
                height={20}
                className="w-4 h-4 md:w-5 md:h-5 inline-block"
                style={{marginLeft: '12px', marginRight: '8px'}}
                draggable={false}
                priority={false}
              />
              <span className="whitespace-nowrap">Vanita Vishram Ground</span>
              <span className="hidden sm:inline">, Surat, Gujrat</span>
            </span>
            <span className="flex items-center gap-2">
              <Image
                src="/icons/clock.png"
                alt="clock"
                width={20}
                height={20}
                className="w-4 h-4 md:w-5 md:h-5 inline-block"
                style={{marginRight: '8px'}}
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
