import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
    

    useEffect(() => {
        setIsLoggedIn(!!localStorage.getItem("token"));
    }, [location]);

    const handleLogOut = () => {
        localStorage.removeItem('token')
        setIsLoggedIn(false);
        navigate("/login");
    }


    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3">
                <div className="container-fluid">
                    <Link className="navbar-brand fs-2 fw-bold" to="/">Video Streamer </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/upload">Upload</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/profile">Profile</Link>
                            </li>
                        </ul>
                        {!isLoggedIn ? <form className="d-flex" role="search">
                            {/* <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" /> */}
                            <Link className="btn btn-outline-success mr-2" to="/login" type="submit">Login</Link>
                            <Link className="btn btn-outline-success mx-2" to="/register" type="submit">Register</Link>
                        </form> : <button className="btn btn-outline-success" onClick={handleLogOut} type="submit">logOut</button>
                        }

                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
