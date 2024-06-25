import React from "react";
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <>
            <style>
                {`
                    /* Custom CSS for the navbar */
                    .navbar-custom {
                        background-color: #f0bbed; /* Change the color as per your preference */
                        transition: height 0.5s; /* Smooth transition effect */
                        height: 20px; /* Initial height */
                        overflow: hidden;
                        margin-bottom: 0; /* Adjust margin bottom to reduce space */
                    }

                    .navbar-custom:hover {
                        height: 80px; /* Change the height as per your preference */
                        background-color: #b328b5; /* Change the color on hover */
                    }

                    .navbar-custom .navbar-nav {
                        flex-direction: row; /* Display items horizontally */
                        opacity: 0; /* Initially hide the content */
                        transition: opacity 0.5s; /* Smooth transition effect for opacity */
                    }

                    .navbar-custom:hover .navbar-nav {
                        opacity: 1; /* Show the content when navbar is hovered */
                    }

                    .navbar-custom .nav-link {
                        padding: 1rem 0;
                        text-align: center;
                        color: #fff; /* Change the color as per your preference */
                    }

                    .navbar-custom .nav-link:hover {
                        background-color: rgba(255, 255, 255, 0.1); /* Change the background color on hover */
                    }
                `}
            </style>

            <nav className="navbar navbar-expand-sm navbar-custom">
                <div className="container-fluid">

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="collapsibleNavbar">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/Adminlogin">Admin</Link>
                            </li>  
                            <li className="nav-item">
                                <Link className="nav-link" to="/Doctorlogin">Doctor</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/Pharmacylogin">Pharmacy</Link>
                            </li>
                        </ul>
                        
                    </div>

                </div>
            </nav>
        </>
    );
}
