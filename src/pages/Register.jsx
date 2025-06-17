import React, { useState, useContext } from "react";
import API from "../api";
import { AuthContext } from "../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

function Register() {

    const [form, setForm] = useState({ username: "", password: "", email: "" });

    const { login } = useContext(AuthContext);
    let navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(errorData.error || `HTTP error! Status: ${response.status}`);
            }

            if (data.token) {
                localStorage.setItem("token", data.token);
                // Optional: Update auth context
                login(data.user);  // Using your AuthContext's login function
                navigate("/");
            } else {
                // If you want to proceed without token
                alert("Registration successful! Please login.");
                navigate("/");
            }
        } catch (error) {
            console.error("Registration failed:", error);
            alert(error.message || "Registration failed. Please try again.");
        }
    };


    return (
        <>
            <form className="container mt-5" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label fs-4">User Name:</label>
                    <input type="text" className="form-control" name="name" id="name" aria-describedby="emailHelp" onChange={(e) => setForm({ ...form, username: e.target.value })} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label fs-4">Email address:</label>
                    <input type="email" className="form-control" name="email" id="email" aria-describedby="emailHelp" onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label fs-4">Password:</label>
                    <input type="password" className="form-control" name="password" id="password" minLength={6} onChange={(e) => setForm({ ...form, password: e.target.value })} />
                </div>

                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </>

    );
}

export default Register;
