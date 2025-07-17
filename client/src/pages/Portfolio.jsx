// src/components/Portfolio.jsx
import { Link } from 'react-router-dom';
import port from '../assets/portrait.png';
import prewed from '../assets/prewed.png';
import wed from '../assets/wedding.png';
import baby from '../assets/baby.png';
import birthday from '../assets/birth.jpg';

const portfolioItems = [
  { name: 'Portrait', image: port, slug: 'portrait' },
  { name: 'Pre-Wedding', image: prewed, slug: 'pre-wedding' },
  { name: 'Wedding', image: wed, slug: 'wedding' },
  { name: 'Birthday Party', image: birthday, slug: 'birthday' },
  { name: 'Baby Shoot', image: baby, slug: 'baby-shoot' },
];

export default function Portfolio() {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-4xl text-center mb-10 font-classic text-white">
        Album
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolioItems.map((item) => (
          <Link to={`/albums/${item.slug}`} key={item.slug}>
            <div className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-60 p-4">
                <h2 className="text-xl text-white text-center font-classic tracking-wide">
                  {item.name}
                </h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
