import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ViewDoctors() {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            const response = await axios.get('http://localhost:8091/api/v1/getAllDoctors');
            setDoctors(response.data);
        } catch (error) {
            console.error('Error fetching doctors:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4"> Doctors</h2>
            <div className="row">
                {doctors.map((doctor, index) => (
                    <div className="col-md-4 mb-4" key={index}>
                        <div className="card h-100">
                            <div className="card-body">
                            <h5 className="card-title text-center">{doctor.doctorName.toUpperCase()}</h5>

                                <p className="card-text"><strong>Gender:</strong> {doctor.gender}</p>
                                <p className="card-text"><strong>Mobile:</strong> {doctor.mobile}</p>
                                <p className="card-text"><strong>Email:</strong> {doctor.email}</p>
                                <p className="card-text"><strong>Specialization:</strong> {doctor.specialization}</p>
                                <p className="card-text"><strong>Experience:</strong> {doctor.experience} years</p>
                                <p className="card-text"><strong>Certificate:</strong> {doctor.certificate}</p>
                                <p className="card-text"><strong>Hospital Name:</strong> {doctor.hospitalName}</p>
                                <p className="card-text"><strong>Hospital Location:</strong> {doctor.hospitalLocation}</p>
                                <p className="card-text"><strong>Consultation Fee:</strong> ${doctor.consultationFee}</p>
                                <p className="card-text"><strong>Doctor Account:</strong> {doctor.drAcc}</p>
                                <p className="card-text"><strong>Status:</strong> {doctor.status}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <style>
                {`
                .card {
                    border: 1px solid #dddddd;
                    border-radius: 5px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    transition: transform 0.2s;
                }
                
                .card:hover {
                    transform: scale(1.05);
                }
                
                .card-body {
                    padding: 20px;
                }
                
                .card-title {
                    font-size: 1.25rem;
                    margin-bottom: 10px;
                }
                
                .card-text {
                    margin-bottom: 10px;
                }
                `}
            </style>
        </div>
    );
}
