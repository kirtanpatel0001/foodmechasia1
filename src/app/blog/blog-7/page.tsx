import Image from "next/image";
export default function Blog7() {
  return (
      <main className="min-h-screen bg-white py-10 px-2 flex flex-col items-center">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-green-700">Behind the Scenes</h1>
        <div className="relative w-full h-64 sm:h-80 rounded-xl overflow-hidden shadow-lg mb-8 max-w-3xl">
          <Image src="/highlights/DSC00994.jpg" alt="Behind the Scenes" fill className="object-cover" />
        </div>
        <div className="relative w-full h-64 sm:h-80 rounded-xl overflow-hidden shadow-lg mb-8 max-w-3xl">
          <Image src="/highlights/DSC01023.jpg" alt="Behind the Scenes 2" fill className="object-cover" />
        </div>
        <p className="max-w-2xl text-lg text-gray-700 text-center">Go backstage and see how the expo comes together. The untold stories and hard work behind the scenes!</p>
    </main>
  );
}