import React from 'react';
import { Link } from 'react-router-dom';


export default function AdminMenu() {
    return (
        <div>
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="#">Ur-Pulse</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="collapsibleNavbar">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin/viewdoctors">Doctors</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin/viewusers">User</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin/viewAppointments">Appointments</Link>
                            </li>  
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin/viewPharmacies">Pharmacies</Link>
                            </li>  
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin/logout">Logout</Link>
                            </li>  
                        </ul>
                    </div>
                   
                </div>
            </nav>
        </div>
    );
}
