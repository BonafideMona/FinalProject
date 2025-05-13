import React, { useState } from "react";

function Signup() {
  const [accName, setAccName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://127.0.0.1:8801/signup", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ accName, password }),
    });
    const data = await res.json();
    setMessage(data.message || data.error);
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <input
        type="text"
        placeholder="Username"
        value={accName}
        onChange={e => setAccName(e.target.value)}
        required
      /><br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      /><br />
      <button type="submit">Sign Up</button>
      <div>{message}</div>
    </form>
  );
}

export default Signup;