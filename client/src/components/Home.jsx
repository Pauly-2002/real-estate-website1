import React, { useState } from "react";
import FeaturedProperty from "./FeaturedProperty";
import ContactComponent from "./ContactComponent";
import Footer from "./Footer";
import PropertyModel from "./PropertyModel";
import homeImage from "../assets/homeImage.jpg";
import NavBar from "./NavBar";

const Home = () => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [searchLocation, setSearchLocation] = useState("");
  const [searchType, setSearchType] = useState("");
  const [filteredProperties, setFilteredProperties] = useState([]); // ✅ NEW STATE

  const isAdmin = localStorage.getItem("isAdmin") === "true";

  const handleSearch = () => {
    fetch(
      `http://localhost:5000/properties?location=${searchLocation}&type=${searchType}`
    )
      .then((res) => res.json())
      .then((data) => {
        setFilteredProperties(data); // ✅ now this works
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      {isAdmin && <NavBar />}
      <div className="relative h-[100vh]">
        <img
          src={homeImage}
          className="w-full h-full object-cover"
          alt="homeImage"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/30 to-black/50 flex items-center justify-center">
          <div className="text-center text-white max-w-5xl px-4">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-sky-300 via-sky-300 to-indigo-300 bg-clip-text text-transparent tracking-tight p-3">
              Where Luxury Meets Lifestyle
            </h1>
            <p className="text-lg md:text-2xl mb-8 text-gray-200">
              Exclusive estates and architectural masterpieces in Southern
            </p>

            <div className="bg-white/30 p-8 rounded-3xl shadow-2xl backdrop-blur-md max-w-2xl mx-auto">
              <div className="flex flex-col md:flex-row gap-3">
                <input
                  type="text"
                  placeholder="Search by Location"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="flex-1 px-6 py-3 rounded-lg border text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-blue-50 focus:bg-white hover:border-blue-500 transition-colors duration-200"
                />
                <select
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                  className="py-3 px-4 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-blue-50 transition-colors duration-200"
                >
                  <option value="">All Property Types</option>
                  <option value="family house">Family House</option>
                  <option value="apartment">Apartment</option>
                  <option value="villa">Villa</option>
                  <option value="duplex">Duplex</option>
                  <option value="bungalow">Bungalow</option>
                  <option value="condo">Condo</option>
                  <option value="townhouse">Townhouse</option>
                  <option value="penthouse">Penthouse</option>
                  <option value="studio">Studio</option>
                  <option value="mansion">Mansion</option>
                  <option value="farmhouse">Farmhouse</option>
                  <option value="land">Land</option>
                  <option value="commercial">Commercial</option>
                  <option value="industrial">Industrial</option>
                  <option value="warehouse">Warehouse</option>
                  <option value="retail">Retail Space</option>
                  <option value="office">Office Space</option>
                </select>
                <button
                  onClick={handleSearch}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Pass filtered properties if available, otherwise show all */}
      <FeaturedProperty
        setSelectedProperty={setSelectedProperty}
        properties={
          filteredProperties.length > 0 ? filteredProperties : undefined
        }
      />

      {selectedProperty && (
        <PropertyModel
          properties={[selectedProperty]}
          onClose={() => setSelectedProperty(null)}
        />
      )}

      <ContactComponent />
      <Footer />
    </>
  );
};

export default Home;
