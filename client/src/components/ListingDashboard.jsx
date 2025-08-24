import React, { useEffect, useState } from "react";

const ListingDashboard = () => {
  const [listings, setListings] = useState([]);
  const [editingId, setEditingId] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    images: "",
    beds: "",
    baths: "",
    sqft: "",
    location: "",
    agent_contact: "",
  });

  const fetchListing = () => {
    fetch("/api/displaylistings")
      .then((res) => res.json())
      .then((data) => setListings(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchListing();
  }, []);

  const handleEdit = (property) => {
    setEditingId(property.id);
    setFormData({
      title: property.title,
      description: property.description,
      price: property.price,
      images: property.images,
      beds: property.beds,
      baths: property.baths,
      sqft: property.sqft,
      location: property.location,
      agent_contact: property.agent_contact,
    });
  };

  const handleUpdate = async (e, id) => {
    e.preventDefault();
    try {
      await fetch(`/api/updatelistings/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      setEditingId(null);
      fetchListing();
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  const handleDelete = async (id) => {
    await fetch(`/api/deletelistings/${id}`, { method: "DELETE" });
    fetchListing();
  };

  return (
    <div className="w-full px-2 sm:px-4 py-4">
      <div className="max-h-[85vh] overflow-y-auto border rounded shadow-md">
        <table className="min-w-[1000px] w-full border-collapse">
          <thead className="bg-blue-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 text-sm border">Title</th>
              <th className="px-4 py-2 text-sm border">Description</th>
              <th className="px-4 py-2 text-sm border">Price</th>
              <th className="px-4 py-2 text-sm border">Images</th>
              <th className="px-4 py-2 text-sm border">Beds</th>
              <th className="px-4 py-2 text-sm border">Baths</th>
              <th className="px-4 py-2 text-sm border">Sqft</th>
              <th className="px-4 py-2 text-sm border">Location</th>
              <th className="px-4 py-2 text-sm border">Agent</th>
              <th className="px-4 py-2 text-sm border">Actions</th>
            </tr>
          </thead>

          <tbody className="text-white">
            {listings.map((property) => (
              <React.Fragment key={property.id}>
                <tr className="text-center border-b ">
                  <td className="px-2 py-2 border">{property.title}</td>
                  <td className="px-2 py-2 border max-w-[200px] truncate">
                    {property.description}
                  </td>
                  <td className="px-2 py-2 border">{property.price}</td>
                  <td className="px-2 py-2 border">
                    <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto">
                      {(property.image_urls || property.images)?.map(
                        (url, i) => (
                          <img
                            key={i}
                            src={url}
                            alt="img"
                            className="w-12 h-12 object-cover"
                          />
                        )
                      )}
                    </div>
                  </td>
                  <td className="px-2 py-2 border">{property.beds}</td>
                  <td className="px-2 py-2 border">{property.baths}</td>
                  <td className="px-2 py-2 border">{property.sqft}</td>
                  <td className="px-2 py-2 border">{property.location}</td>
                  <td className="px-2 py-2 border">{property.agent_contact}</td>
                  <td className="px-2 py-2 border flex flex-col gap-2 items-center">
                    <button
                      onClick={() => handleEdit(property)}
                      className="text-black hover:underline text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(property.id)}
                      className="text-red-500 hover:underline text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>

                {editingId === property.id && (
                  <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="w-full max-w-lg text-gray-700 bg-white rounded p-6 shadow-lg">
                      <h2 className="text-lg text-gray-900 font-semibold mb-4">
                        Edit Listing
                      </h2>
                      <form
                        onSubmit={(e) => handleUpdate(e, property.id)}
                        className="flex flex-col gap-3"
                      >
                        <input
                          value={formData.title}
                          onChange={(e) =>
                            setFormData({ ...formData, title: e.target.value })
                          }
                          placeholder="Title"
                          className="border px-3 py-2 rounded"
                        />
                        <input
                          value={formData.description}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              description: e.target.value,
                            })
                          }
                          placeholder="Description"
                          className="border px-3 py-2 rounded"
                        />
                        <input
                          value={formData.price}
                          onChange={(e) =>
                            setFormData({ ...formData, price: e.target.value })
                          }
                          placeholder="Price"
                          className="border px-3 py-2 rounded"
                        />
                        <input
                          value={formData.beds}
                          onChange={(e) =>
                            setFormData({ ...formData, beds: e.target.value })
                          }
                          placeholder="Beds"
                          className="border px-3 py-2 rounded"
                        />
                        <input
                          value={formData.baths}
                          onChange={(e) =>
                            setFormData({ ...formData, baths: e.target.value })
                          }
                          placeholder="Baths"
                          className="border px-3 py-2 rounded"
                        />
                        <input
                          value={formData.sqft}
                          onChange={(e) =>
                            setFormData({ ...formData, sqft: e.target.value })
                          }
                          placeholder="Sqft"
                          className="border px-3 py-2 rounded"
                        />
                        <input
                          value={formData.location}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              location: e.target.value,
                            })
                          }
                          placeholder="Location"
                          className="border px-3 py-2 rounded"
                        />
                        <input
                          value={formData.agent_contact}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              agent_contact: e.target.value,
                            })
                          }
                          placeholder="Agent Contact"
                          className="border px-3 py-2 rounded"
                        />

                        <div className="flex justify-end gap-3 mt-4">
                          <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded"
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingId(null)}
                            className="bg-gray-300 px-4 py-2 rounded"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListingDashboard;
