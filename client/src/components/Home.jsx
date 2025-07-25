import React from "react";
import homeImage from "../assets/homeImage.jpg";


const Home = () => {
  return (
    <div className="relative h-[100vh]">
      <img
        src={homeImage}
        className="w-full h- object-cover h-full"
        alt="homeImage"
      ></img>

      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/30 to-black/50 flex items-center justify-center">
        <div className="text-center text-white max-w-5xl px-4 ">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-sky-300 via-sky-300 to-indigo-300 bg-clip-text text-transparent tracking-tight p-3">
            Where Luxury Meets Lifestyle
          </h1>

          <p className="text-lg md:text-2xl mb-8 text-gray-200">
            Exclusive estates and architectural masterpieces in Southern
          </p>

          <div className="bg-white/30 p-8 rounded-3xl shadow-2xl backdrop-blur-md max-w-2xl mx-auto ">
            <div className="flex flex-col md:flex-row gap-3 ">
              <input
                type="text"
                placeholder="Search by Location"
                className="flex-1 px-6 py-3 rounded-lg border border-gray-300 focus:outline-none focu:ring-2 focus:ring-blue-500 hover:bg-blue-50 focus:bg-white hover:border-blue-500 transition-colors duration-200"
              />

              <select
                name=""
                id=""
                className="py-3 px-4 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-blue-50 transition-color-200 "
              >
                <option value="">House</option>
                <option value="">Apartment</option>
                <option value="">Villa</option>
              </select>

              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors ">Search</button>
            </div>
            <div className="grid grid-cols-3 gap-3 mt-6">
              <div className="flex flex-col items-center bg-slate-50/20 rounded-lg transition-transforms hover:scale-105 cursor-pointer "></div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;