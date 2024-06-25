import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ViewPharmacies() {
    const [pharmacies, setPharmacies] = useState([]);

    useEffect(() => {
        fetchPharmacies();
    }, []);

    const fetchPharmacies = async () => {
        try {
            const response = await axios.get('http://localhost:8091/api/v1/getAllPharmacies');
            setPharmacies(response.data);
        } catch (error) {
            console.error('Error fetching pharmacies:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Pharmacies</h2>
            <div className="row">
                {pharmacies.map((pharmacy, index) => (
                    <div className="col-md-4 mb-4" key={index}>
                        <div className="card h-100">
                            <div className="card-body">
                                <h5 className="card-title text-center">{pharmacy.pharmacyName.toUpperCase()}</h5>
                                <p className="card-text"><strong>Shop Registration No:</strong> {pharmacy.shopRegNo}</p>
                                <p className="card-text"><strong>Location:</strong> {pharmacy.location}</p>
                                <p className="card-text"><strong>Mobile:</strong> {pharmacy.mobile}</p>
                                {/* Add other pharmacy details here */}
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
