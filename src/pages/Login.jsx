import React,{useState, useContext} from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Login() {

    const [form, setfFrm] = useState({email: "", pasword: ""});
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
    try {
        const response = await API.post("/auth/login", {
            email: form.email,
            password: form.password
        });

        // Store token and user data
        localStorage.setItem("token", response.data.token);
        
        // Update auth context
        login(response.data); // Your AuthContext login function
        
        // Redirect
        navigate("/");

    } catch (error) {
        console.error("Login failed:", error);
        
        // Handle different error cases
        if (error.response) {
            // Server responded with error status
            alert(error.response.data.message || "Login failed");
        } else if (error.request) {
            // Request was made but no response
            alert("Network error. Please try again.");
        } else {
            // Other errors
            alert("Login failed. Please try again.");
        }
    }
    }

    
  return (
    <div className="container my-5">
    <h1>Login to continue to Video Streaming</h1>
    <form onSubmit={handleSubmit}>
        <div className="mb-3 mt-5">
            <label htmlFor="email" className="form-label  fs-4 ">Email address</label>
            <input type="email" className="form-control"  name="email" id="email" aria-describedby="emailHelp" onChange={(e) => setfFrm({...form, email: e.target.value})} />
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label fs-4">Password</label>
            <input type="password" className="form-control"  name="password" id="password" onChange={(e) => setfFrm({...form, password: e.target.value})}/>
        </div>
        
        <button type="submit" className="btn btn-primary" >Login</button>
    </form>
</div>
);
}

export default Login;
