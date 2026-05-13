import { useState } from "react";

import { loginUser } from "../services/authService";

import "./Auth.css";

const Login = () => {

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const token = await loginUser(formData);

      localStorage.setItem("token", token);

      alert("Login Successful");

      window.location.href = "/";

    } catch (error) {

      console.log(error);

      alert("Invalid Credentials");
    }
  };

  return (

    <div className="auth-container">

      <form
        className="auth-form"
        onSubmit={handleSubmit}
      >

        <h2>Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">
          Login
        </button>

      </form>

    </div>
  );
};

export default Login;