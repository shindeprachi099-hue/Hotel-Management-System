import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Simple hardcoded login (replace with API later)
    if (email === "admin@hotel.com" && password === "admin9999") {
      alert("Login Successful ✅");
      localStorage.setItem("user", JSON.stringify({ email }));
      navigate("/dashboard"); // React Router navigation
    } else {
      alert("Invalid Credentials ❌");
    }
  };

  return (
    <div className="login-wrapper">
      <form className="login-card" onSubmit={handleLogin}>
        <h3>Welcome to ....</h3>
        <h1>Hotel Management Login.</h1>
        <br/><br/> <br/>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /> <br/>

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /> <br/>
        <br/>

        <button type="submit">Login</button>
        <br/>
      </form>
    </div>
  );
}

export default Login;