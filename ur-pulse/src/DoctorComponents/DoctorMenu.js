import React from 'react';
import { Link } from 'react-router-dom';
import react10 from '../images/react10.jpg';

export default function DoctorMenu() {
    return (
        <div>
            <nav className="navbar navbar-expand-sm bg-success">
                <div className="container-fluid">
                    <img src={react10} alt="Example" className={styles["second-image"]} style={{ width: '80px', height: '80px' }} /> {/* Add style to adjust image size */}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="collapsibleNavbar">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/doctor/doctorschedule">Schedule</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/doctor/viewschedule">View Schedule</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/appointments/:doctorId">Appointments</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/doctor/profile">Profile</Link>
                            </li>
                            
                           
                            <li className="nav-item">
                                <Link className="nav-link" to="/doctor/logout">Logout</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

// CSS styles embedded directly
const styles = `
.navbar-brand {
    font-size: 24px;
    font-weight: bold;
    color: #ffffff;
}

.navbar-nav .nav-item .nav-link {
    color: #ffffff; /* White text color */
    font-size: 18px;
    transition: color 0.3s ease; /* Smooth color transition */
}

.navbar-nav .nav-item .nav-link:hover {
    color: #ffc107; /* Yellow color on hover */
}
`;

// Apply the CSS styles using a <style> tag
const styleElement = document.createElement('style');
styleElement.appendChild(document.createTextNode(styles));
document.head.appendChild(styleElement);
