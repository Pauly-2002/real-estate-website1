import React from "react";

const Upload = () => {
  return (
    <div className="flex h-screen bg-blue-500 w-full justify-center items-center ">
      <div className="bg-white p-5 shadow-md rounded-md">
        <form action="" className="flex flex-col space-y-7">
          <div className="grid grid-cols-3 items-center gap-4 ">
            <label>Property Name:</label>
            <input
              type="text"
              placeholder="Property name..."
              className=" px-12 rounded-lg py-3 bg-gray-300"
            />
          </div>
          <div className="grid grid-cols-3 items-center gap-4 ">
            <label>Price:</label>
            <input
              type="number"
              placeholder="Property location..."
              className=" px-12 rounded-lg py-3 bg-gray-300"
            />
          </div>
          <div className="grid grid-cols-3 items-center gap-4 relative ">
            <label>Images:</label>
            <input
              type="file"
              multiple
              className=" absolute px-12 rounded-lg py-3 bg-gray-300 
             cursor-pointer inset-0 opacity-0 "
            />
            <button className="py-9 px-3 rounded-md bg-gray-300">
              Upload Images
            </button>
          </div>
          <div className="grid grid-cols-3 items-center gap-4 ">
            <label>Description:</label>
            <textarea
              placeholder="Property details..."
              className="px-12 rounded-lg py-3 bg-gray-300"
            ></textarea>
          </div>
          <div className="grid grid-cols-3 items-center gap-4 ">
            <label>Location:</label>
            <input
              type="text"
              placeholder="Property location..."
              className=" px-12 rounded-lg py-3 bg-gray-300"
            />
          </div>
          <div className="grid grid-cols-3 items-center gap-4 ">
            <label>Property Types:</label>
            <select className=" px-12 rounded-lg py-3 bg-gray-300">
              <option value="Condo">Condo</option>
              <option value="Condo">Condo</option>
              <option value="Condo">Condo</option>
              <option value="Condo">Condo</option>
            </select>
          </div>
          <div className="grid grid-cols-3 items-center gap-4 ">
            <label>Agent Email:</label>
            <input
              placeholder="Agent email address..."
              type="email"
              className=" px-12 rounded-lg py-3 bg-gray-300"
            />
          </div>
          <button className="place-self-start py-3 px-6 bg-blue-600 rounded-lg text-white hover:bg-blue-700 hover:text-black transition-colors duration-200ms">
            Upload Listing
          </button>
        </form>
      </div>
    </div>
  );
};

export default Upload;
