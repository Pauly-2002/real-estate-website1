import React, { useState } from "react";
import NavBar from "./NavBar";

const Upload = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    agent_name: "",
    agent_contact: "",
    price: "",
    location: "",
    types: "",
    beds: "",
    sqft: "",
    baths: "",
    images: [],
  });

  const handleUpload = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key === "images") {
        if (!value || value.length === 0) {
          return alert("Please select at least one image.");
        }
        value.forEach((img) => formDataObj.append("images", img));
      } else {
        formDataObj.append(key, value);
      }
    });

    const res = await fetch("/api/admin/listings", {
      method: "POST",
      body: formDataObj,
    });

    if (res.ok) {
      alert("Listings Uploaded Successfully");
      setForm({
        title: "",
        description: "",
        agent_name: "",
        agent_contact: "",
        price: "",
        beds: "",
        baths: "",
        sqft: "",
        location: "",
        types: "",
        images: [],
      });
    } else {
      alert("Failed to upload");
    }
  };

  return (
    <>
      <NavBar />
      <div className="flex min-h-screen flex-col bg-blue-500 w-full justify-center items-center px-2">
        <div className="overflow-auto w-full h-full">
          <div className="bg-blue-500 text-gray-800 my-10 p-5 mx-4 sm:mx-8 lg:mx-32 shadow-md rounded-md">
            <form
              onSubmit={handleUpload}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {[
                { label: "Property Name", name: "title", type: "text" },
                { label: "Price", name: "price", type: "number" },
                { label: "Location", name: "location", type: "text" },
                { label: "Agent Email", name: "agent_contact", type: "email" },
                { label: "Beds", name: "beds", type: "number" },
                { label: "Baths", name: "baths", type: "number" },
                { label: "Sqft", name: "sqft", type: "number" },
              ].map(({ label, name, type }) => (
                <div key={name} className="flex flex-col space-y-2">
                  <label>{label}:</label>
                  <input
                    type={type}
                    value={form[name]}
                    placeholder={label}
                    className="rounded-lg py-3 px-4 bg-gray-300"
                    onChange={(e) =>
                      setForm({ ...form, [name]: e.target.value })
                    }
                  />
                </div>
              ))}

              {/* Property Type Dropdown */}
              <div className="flex flex-col space-y-2">
                <label>Property Types:</label>
                <select
                  className="rounded-lg py-3 px-4 text-[#9CA3AF] bg-gray-300"
                  value={form.types}
                  onChange={(e) => setForm({ ...form, types: e.target.value })}
                >
                  <option value="">All Property Types</option>
                  <option value="family house">Family House</option>
                  <option value="apartment">Apartment</option>
                  <option value="villa">Villa</option>
                  <option value="duplex">Duplex</option>
                  <option value="bungalow">Bungalow</option>
                  <option value="condo">Condominium (Condo)</option>
                  <option value="townhouse">Townhouse</option>
                  <option value="penthouse">Penthouse</option>
                  <option value="studio">Studio Apartment</option>
                  <option value="mansion">Mansion</option>
                  <option value="farmhouse">Farmhouse</option>
                  <option value="land">Land / Plot</option>
                  <option value="commercial">Commercial Property</option>
                  <option value="industrial">Industrial Property</option>
                  <option value="warehouse">Warehouse</option>
                  <option value="retail">Retail Space / Shop</option>
                  <option value="office">Office Space</option>
                </select>
              </div>

              {/* Description */}
              <div className="sm:col-span-2 lg:col-span-3 flex flex-col space-y-2">
                <label>Description:</label>
                <textarea
                  value={form.description}
                  placeholder="Property details..."
                  className="rounded-lg py-3 px-4 bg-gray-300 w-full"
                  rows={4}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                ></textarea>
              </div>

              {/* File Upload */}
              <div className="sm:col-span-2 lg:col-span-3 flex flex-col space-y-2 relative">
                <label>Upload Images:</label>
                <input
                  type="file"
                  multiple
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(e) =>
                    setForm({ ...form, images: Array.from(e.target.files) })
                  }
                />
                <div className="py-4 px-6 bg-gray-300 text-[#9CA3AF] rounded-md text-center cursor-pointer">
                  Select Images
                </div>
                {form.images.length > 0 && (
                  <span className="text-sm text-white">
                    {form.images.length} image
                    {form.images.length > 1 ? "s" : ""} selected
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <div className="sm:col-span-2 lg:col-span-3">
                <button className="py-3 px-6 bg-blue-600 rounded-lg text-white hover:bg-blue-700 hover:text-black transition duration-200">
                  Upload Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Upload;
