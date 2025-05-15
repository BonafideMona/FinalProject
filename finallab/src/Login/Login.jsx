// import React, { useState } from "react";

// export default function Login() {
//   const [accName, setAccName] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const res = await fetch("http://127.0.0.1:8801/login", {
//       method: "POST",
//       headers: { "Content-type": "application/json" },
//       body: JSON.stringify({ accName, password }),
//     });
//     const data = await res.json();
//     setMessage(data.message || data.error);
//   };
//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Login</h2>
//       <input
//         type="text"
//         placeholder="Username"
//         value={accName}
//         onChange={e => setAccName(e.target.value)}
//         required
//       /><br />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={e => setPassword(e.target.value)}
//         required
//       /><br />
//       <button type="submit">Login</button>
//       <div>{message}</div>
//     </form>
//   );
// }
import React, { useState } from "react";

function Login() {
  const [accName, setAccName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await fetch("http://127.0.0.1:8801/login", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ accName, password }),
        });

        // Check if the response is OK
        if (!res.ok) {
            const errorData = await res.json();
            setMessage(errorData.error || "An error occurred");
            return;
        }

        // Parse the JSON response
        const data = await res.json();
        setMessage(data.message);
    } catch (error) {
        setMessage("An error occurred. Please try again.");
        console.error("Error:", error);
    }
};

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={accName}
        onChange={(e) => setAccName(e.target.value)}
        required
      /><br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      /><br />
      <button type="submit">Login</button>
      <div>{message}</div>
    </form>
  );
}

export default Login;