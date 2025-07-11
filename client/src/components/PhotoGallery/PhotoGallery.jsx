import Masonry from 'react-masonry-css';

export default function PhotoGallery({ photos }) {
  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1
  };

  return (
    <section className="px-4 py-16 max-w-6xl mx-auto bg-gradient-to-br from-gray-50 via-white to-gray-100 rounded-2xl shadow-xl mt-8" aria-label="Photography portfolio gallery">
      <h2 className="text-3xl font-extrabold mb-10 text-center tracking-tight animate-fade-in-up">
        Portfolio
      </h2>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {photos.map((photo, index) => (
          <figure key={index} className="mb-8 overflow-hidden rounded-2xl shadow-xl bg-white hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100">
            <img
              src={photo.url}
              alt={photo.title ? photo.title : `Portfolio photo ${index + 1}`}
              className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300 ring-0 hover:ring-4 hover:ring-pink-300"
            />
            {photo.title && (
              <figcaption className="sr-only">{photo.title}</figcaption>
            )}
          </figure>
        ))}
      </Masonry>
    </section>
  );
}

// Add the following CSS to your global styles (e.g., index.css):
// .my-masonry-grid {
//   display: flex;
//   margin-left: -1rem; /* gutter size offset */
//   width: auto;
// }
// .my-masonry-grid_column {
//   padding-left: 1rem; /* gutter size */
//   background-clip: padding-box;
// }
// .my-masonry-grid_column > figure {
//   margin-bottom: 1.5rem;
// }
  