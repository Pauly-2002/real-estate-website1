import React, { useState} from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.trim().toLowerCase(), password }),
    });

    if (res.ok) {
      navigate("/admin-page");
    }else{
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex h-screen bg-blue-500 w-full justify-center items-center ">
      <div className="bg-white p-5 shadow-md rounded-md">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-7">
          <div className="grid grid-cols-1 items-center gap-4">
            <label>Email Address:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="px-12 rounded-lg py-3 bg-gray-300"
            />
          </div>

          <div className="grid grid-cols-1 items-center gap-4">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="px-12 rounded-lg py-3 bg-gray-300"
            />
          </div>
          <button className="place-self-start py-3 px-6 bg-blue-600 rounded-lg text-white hover:bg-blue-700 hover:text-black transition-colors duration-200ms">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
