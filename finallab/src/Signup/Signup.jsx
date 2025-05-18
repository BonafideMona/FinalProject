import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

function Signup({ onSwitchToLogin }) {
  const [accName, setAccName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!accName.trim()) newErrors.accName = "Account name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords don't match";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    try {
      const res = await fetch("http://127.0.0.1:8801/signup", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ accName, email, password }),
      });
      const data = await res.json();
      setMessage(data.message || data.error);
    } catch (error) {
      console.error("Signup error:", error);
      setMessage("Network error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
        Sign Up
      </h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
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
          UserName
        </label>
        <input
          type="text"
          className={`w-full px-4 py-2 border ${
            errors.accName ? "border-red-500" : "border-gray-300"
          } rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          placeholder="Enter username"
          value={accName}
          onChange={(e) => setAccName(e.target.value)}
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Create password
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

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Confirm password
        </label>
        <input
          type="password"
          className={`w-full px-4 py-2 border ${
            errors.confirmPassword ? "border-red-500" : "border-gray-300"
          } rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium transition duration-200 mt-4"
      >
        Sign Up
      </button>

      <div className="text-center text-sm text-gray-600 mt-4">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Login
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
            body: JSON.stringify({ fName, lName, accName, email, password: "" }),
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

export default Signup;
