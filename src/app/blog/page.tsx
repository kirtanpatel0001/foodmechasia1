import Link from "next/link";
import Image from "next/image";

const blogs = [
  {
    slug: "blog-1",
    title: "Expo Moments: Day 1 Highlights",
    img: "/highlights/DSC_0013.jpg",
    img2: "/highlights/DSC00514.jpg",
    desc: "Discover the best moments from the first day of the Food Mech Expo."
  },
  {
    slug: "blog-2",
    title: "Innovation in Food Tech",
    img: "/highlights/DSC00533.jpg",
    img2: "/highlights/DSC00574.jpg",
    desc: "Explore the latest innovations and tech showcased at the event."
  },
  {
    slug: "blog-3",
    title: "Networking Success Stories",
    img: "/highlights/DSC00592.jpg",
    img2: "/highlights/DSC00600.jpg",
    desc: "Read about the connections and partnerships formed at the expo."
  },
  {
    slug: "blog-4",
    title: "Exhibitor Spotlights",
    img: "/highlights/DSC00602.jpg",
    img2: "/highlights/DSC00783.jpg",
    desc: "Meet the standout exhibitors and their products."
  },
  {
    slug: "blog-5",
    title: "Visitor Experiences",
    img: "/highlights/DSC00788.jpg",
    img2: "/highlights/DSC00910.jpg",
    desc: "Hear from visitors about their favorite expo experiences."
  },
  {
    slug: "blog-6",
    title: "Food Mech Awards Night",
    img: "/highlights/DSC00941.jpg",
    img2: "/highlights/DSC00991.jpg",
    desc: "Relive the excitement of the awards and celebrations."
  },
  {
    slug: "blog-7",
    title: "Behind the Scenes",
    img: "/highlights/DSC00994.jpg",
    img2: "/highlights/DSC01023.jpg",
    desc: "Go backstage and see how the expo comes together."
  }
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-50 via-green-50 to-pink-50 py-10 px-2">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-green-700 drop-shadow-lg">Food Mech Expo Blog</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {blogs.map(blog => (
          <Link key={blog.slug} href={`/blog/${blog.slug}`} className="group rounded-2xl shadow-xl bg-white hover:scale-105 transition-transform duration-300 overflow-hidden border-2 border-green-200">
            <div className="relative w-full h-56">
              <Image src={blog.img} alt={blog.title} fill className="object-cover group-hover:brightness-90 transition duration-300" />
            </div>
            <div className="relative w-full h-32">
              <Image src={blog.img2} alt={blog.title + ' 2'} fill className="object-cover object-center opacity-80" />
            </div>
            <div className="p-5">
              <h2 className="text-2xl font-bold text-green-800 mb-2 group-hover:text-pink-600 transition">{blog.title}</h2>
              <p className="text-gray-600 mb-2">{blog.desc}</p>
              <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full font-semibold text-sm group-hover:bg-pink-100 group-hover:text-pink-700 transition">Read More</span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
