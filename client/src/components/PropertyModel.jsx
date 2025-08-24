import React, { useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaHeart,
  FaTimes,
  FaBath,
  FaRuler,
  FaBed,
} from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

// ✅ Cloudinary URL optimizer
const optimizeCloudinaryUrl = (url) => {
  if (!url || !url.includes("res.cloudinary.com")) return url;
  return url.replace("/upload/", "/upload/f_auto,q_auto,w_800/");
};

const PropertyModel = ({ onClose, properties }) => {
  const [currentPropertyIndex, setCurrentPropertyIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavourite, setFavourite] = useState(false);

  if (!properties || properties.length === 0) return null;

  const currentProperty = properties[currentPropertyIndex];
  const images = Array.isArray(currentProperty.image_urls)
    ? currentProperty.image_urls.map(optimizeCloudinaryUrl)
    : [];

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
        {/* Image section */}
        <div className="relative h-[300px] md:h-[400px]">
          <img
            loading="lazy"
            src={
              images.length > 0
                ? images[currentImageIndex]
                : "https://via.placeholder.com/800x400?text=No+Image"
            }
            alt="property"
            className="w-full h-full object-cover"
          />

          {/* Navigation */}
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
              {currentImageIndex + 1}/{images.length}
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="p-6">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
            <FaLocationDot className="text-blue-600" />
            <span>{currentProperty.location}</span>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {currentProperty.title}
          </h2>

          <div className="text-3xl font-bold text-blue-600 mb-4">
            ${currentProperty.price}
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

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-gray-600">{currentProperty.description}</p>
          </div>

          <button className="w-full bg-blue-600 text-white py-3 rounded-2xl font-semibold hover:bg-blue-700 transition-colors">
            Contact Agent
          </button>
        </div>
        <div className="flex justify-center items-center flex-col">
          <p className="mb-2">Share</p>
          <span className="border w-20 mb-5 border-solid border-blue-600 b"></span>
        </div>

        <div className="flex  space-x-2 mt-3 mb-5 justify-center">
          <a
            href={`https://wa.me/?text=Check%20out%20this%20property:%20${encodeURIComponent(
              currentProperty.title
            )}%20${encodeURIComponent(
              window.location.origin + "/property/" + currentProperty.id
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 bg-green-500 text-white rounded-lg"
          >
            WhatsApp
          </a>

          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              window.location.origin + "/property/" + currentProperty.id
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 bg-blue-700 text-white rounded-lg"
          >
            Facebook
          </a>

          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              currentProperty.title
            )}&url=${encodeURIComponent(
              window.location.origin + "/property/" + currentProperty.id
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 bg-sky-500 text-white rounded-lg"
          >
            Twitter
          </a>
        </div>
      </div>
    </div>
  );
};

export default PropertyModel;
