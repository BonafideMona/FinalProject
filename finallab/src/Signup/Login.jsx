import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useContext } from "react";
import { UserContext } from "./UserContext"; // adjust path if needed
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import HomePage from "../Pages/HomePage";

function Login({ onSwitchToSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const { login } = useContext(UserContext);

  const validate = () => {
    const newErrors = {};
    if (!email.trim()) newErrors.email = "Email is required";
    if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    return newErrors;
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    try {
      const res = await fetch("http://localhost:8801/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      setMessage(data.message || data.error);
      if (data.message === "Login successful") {
        login({
          email: data.email,
          accName: data.accName,
          accID: data.accID,
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("Network error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
        Login
      </h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="text"
          className={`w-full px-4 py-2 border ${
            errors.email ? "border-red-500" : "border-gray-300"
          } rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          type="password"
          className={`w-full px-4 py-2 border ${
            errors.password ? "border-red-500" : "border-gray-300"
          } rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">{errors.password}</p>
        )}
      </div>

      <div className="text-right">
        <button type="button" className="text-sm text-blue-600 hover:underline">
          Forgot password?
        </button>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium transition duration-200 mt-2"
      >
        Login
      </button>

      <div className="text-center text-sm text-gray-600 mt-4">
        Don’t have an account?{" "}
        <button
          type="button"
          onClick={onSwitchToSignup}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Signup
        </button>
      </div>

      <div className="relative flex items-center my-6">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="flex-shrink mx-4 text-gray-500">Or</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      <GoogleLogin
        onSuccess={async (credentialResponse) => {
          const decoded = jwtDecode(credentialResponse.credential);
          const fName = decoded.given_name;
          const lName = decoded.family_name;
          const accName = fName;
          const email = decoded.email;

          await fetch("http://localhost:8801/signup", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ accName, email, password: "" }),
          });

          // Store in sessionStorage if needed
          sessionStorage.setItem("email", email);
          sessionStorage.setItem("accName", accName);
          sessionStorage.setItem("fName", fName);
          sessionStorage.setItem("lName", lName);

          if (onClose) onClose();
          navigate("/");
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />

      {message && (
        <div className="text-center text-sm text-gray-800 mt-4 font-medium">
          {message}
        </div>
      )}
    </form>
  );
}

export default Login;
