import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight, FaHeart, FaTimes, FaBath, FaRuler, FaBed } from "react-icons/fa";
import properties from "../property";

const PropertyModel = ({ onClose, properties }) => {
  const [currentPropertyIndex, setCurrentPropertyIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavourite, setFavourite] = useState(false);

  if (!properties || properties.length === 0) {
    return null;
  }

  const currentProperty = properties[currentPropertyIndex];
  const images = currentProperty.images || [];

  const nextImage = () =>
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  const prevImage = () =>
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-3xl max-w-xl w-full md:max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-[300px] md:h-[400px]">
          <img
            src={images[currentImageIndex]}
            alt=""
            className="w-full h-full object-cover"
          />

          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white"
            aria-label="Previous Image"
          >
            <FaChevronLeft size={20} />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white"
            aria-label="Next Image"
          >
            <FaChevronRight size={20} />
          </button>

          <button
            onClick={onClose}
            className="absolute text-white top-10 right-5 -translate-y-1/2 bg-red-500 p-2 rounded-full"
            aria-label="Close Modal"
          >
            <FaTimes size={20} />
          </button>

          <div className="absolute bottom-4 right-4 flex items-center gap-4">
            <button
              onClick={() => setFavourite(!isFavourite)}
              className={`bg-white/80 p-2 rounded-full ${
                isFavourite ? "text-red-500" : "text-gray-500"
              }`}
            >
              <FaHeart />
            </button>
            <div className="bg-black/50 text-white px-3 py-1 rounded-full">
              {currentImageIndex * 1}/{images.length}
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
            <faLocationDot className="text-blue-600" />
            <span>{currentProperty.location}</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {currentProperty.title}
          </h2>
          <div className="text-3xl font-bold text-blue-600 mb-4">
            {currentProperty.price}
          </div>

          <div className="flex gap-6 mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              <FaBed className="text-blue-600" />
              <span className="text-gray-600">{currentProperty.beds}</span>
            </div>

            <div className="flex items-center gap-2">
              <FaBath className="text-blue-600" />
              <span className="text-gray-600">{currentProperty.baths}</span>
            </div>

            <div className="flex items-center gap-2">
              <FaRuler className="text-blue-600" />
              <span className="text-gray-600">{currentProperty.sqft}</span>
            </div>
          </div>
          <div className="mb-6" >
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-gray-600 ">{currentProperty.description}</p>
          </div>
          <button className="w-full bg-blue-600  text-white py-3 rounded-2xl
           font-semibold hover:bg-blue-700 transition-colors">Contact Agent</button>
        </div>
      </div>
    </div>
  );
};

export default PropertyModel;
