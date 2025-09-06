import { useState } from "react";
import axios from "axios";

function Register() {
  const [name, setName] = useState("");   // ✅ added
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name,      // ✅ send name also
        email,
        password,
      });
      alert("Registration successful! Please login.");
      setName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      alert(err.response?.data?.msg || "Error registering");
    }
  };

  return (
    <div className="container" style={{ maxWidth: "400px", marginTop: "40px" }}>
      <h2>Register</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button style={{ background: "#4caf50", color: "white" }}>
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
