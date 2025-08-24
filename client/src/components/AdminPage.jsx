import React from "react";
import ListingDashboard from "./ListingDashboard";
import NavBar from "./NavBar";

const AdminPage = () => {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  return (
    <div className="no-szzzzz">
      {isAdmin && <NavBar />}
      <div className="flex flex-col h-screen w-full bg-blue-500 overflow-hidden">
        <div className="flex flex-1 py-10 px-10 h-20 overflow-auto rounded-md m-5 shadow-md">
          <ListingDashboard />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
