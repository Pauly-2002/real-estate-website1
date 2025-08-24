import React, { useEffect, useState } from "react";
import { FaRuler, FaBed, FaBath, FaHeart } from "react-icons/fa";

const optimizeCloudinaryUrl = (url) => {
  if (!url || !url.includes("res.cloudinary.com")) return url;
  return url.replace("/upload/", "/upload/f_auto,q_auto,w_800/");
};

const FeaturedProperty = ({ setSelectedProperty, properties }) => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (properties) {
      setListings(properties); // ✅ use filtered results from Home
    } else {
      // fallback: fetch all listings
      fetch("/api/displaylistings")
        .then((res) => res.json())
        .then((data) => setListings(data))
        .catch((err) => console.error(err));
    }
  }, [properties]);

  return (
    <section className="max-w-7xl mx-auto py-16 px-4">
      <h2 className="text-3xl font-bold mb-8">Featured Properties</h2>

      {loading ? (
        <p>Loading...</p>
      ) : listings.length === 0 ? (
        <p className="text-center text-gray-500">No properties found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {listings.map((property) => (
            <div
              key={property.id}
              onClick={() => setSelectedProperty(property)}
              className="bg-white rounded-2xl shadow-lg p-4 cursor-pointer"
            >
              <img
                src={property.image_urls?.[0]}
                alt={property.title}
                className="w-full h-72 object-cover"
              />
              <h1 className="text-xl font-semibold">{property.title}</h1>
              <p>{property.location}</p>
              <p>${property.price}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};


export default FeaturedProperty;
