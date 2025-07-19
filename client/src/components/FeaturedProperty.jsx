import React from "react";
import properties from "../property.jsx";
import { FaRuler, FaBed, FaBath, FaHeart } from "react-icons/fa";

const FeaturedProperty = ({ setSelectedProperty }) => {
  return (
    <section className="max-w-7xl mx-auto py-16 px-4">
      <h2 className="text-3xl font-bold mb-8">Featured Properties</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((property) => {
          return (
            <div
              key={property.id}
              onClick={() => setSelectedProperty(property)}
              className="bg-white rounded-2xl drop-shadow-lg overflow-hidden hover:drop-shadow-xl hover:scale-105 transition-all duration-300 relative group cursor-pointer"
            >
              <div className="relative">
                <img
                  src={property.image}
                  className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <button
                  className="absolute top-4 right-4 p-2 rounded-full
               bg-white/70 hover:bg-white 
               transition-colors duration-200"
                >
                  <FaHeart />
                </button>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                  <span>{property.location}</span>
                </div>
                <div className="text-2xl font-bold text-blue-600 mb-2">
                  {property.price}
                </div>

                <h1 className="text-xl font-semibold mb-4 text-gray-800">
                  {property.title}
                </h1>

                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <FaBed className="text-blue-600" />
                    <span className="text-gray-600">{property.beds}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <FaBath className="text-blue-600" />
                    <span className="text-gray-600">{property.baths}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <FaRuler className="text-blue-600" />
                    <span className="text-gray-600">{property.sqft}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturedProperty;
