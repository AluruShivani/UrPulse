import React, { useState } from 'react';
import ViewDoctors from './ViewDoctors';
import ViewUsers from './ViewUsers';
import ViewAppointments from './ViewAppointments';
import ViewPharmacies from './ViewPharmacies';

export default function AdminHome() {
    const [view, setView] = useState('doctors');

    const handleButtonClick = (viewName) => {
        setView(viewName);
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-2 text-stroke" >WELCOME TO URPULSE&#128151;</h1>
            <div className="d-flex justify-content-center mb-4" role="group" aria-label="Basic example">
                <button
                    type="button"
                    className="btn btn-outline-primary mr-2"
                    onClick={() => handleButtonClick('doctors')}
                >
                    View Doctors
                </button>
                <button
                    type="button"
                    className="btn btn-outline-secondary mr-2"
                    onClick={() => handleButtonClick('users')}
                >
                    View Users
                </button>
                <button
                    type="button"
                    className="btn btn-outline-success mr-2"
                    onClick={() => handleButtonClick('appointments')}
                >
                    View Bookings
                </button>
                <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => handleButtonClick('pharmacies')}
                >
                    View Pharmacies
                </button>
            </div>
            <div className="mt-4">
                {view === 'doctors' && <ViewDoctors />}
                {view === 'users' && <ViewUsers />}
                {view === 'appointments' && <ViewAppointments />}
                {view === 'pharmacies' && <ViewPharmacies />}
            </div>
            <style>
                {`
                .text-stroke {
                    font-weight: bold;
                    color: white;
                    text-shadow: 
                        -3px -3px 0 #000,  
                        3px -3px 0 #000,
                        -3px 3px 0 #000,
                        3px 3px 0 #000;
                }
                `}
            </style>
        </div>
    );
}
