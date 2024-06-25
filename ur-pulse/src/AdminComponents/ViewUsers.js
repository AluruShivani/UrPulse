import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ViewUsers() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8091/api/v1/getAllUser');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Users</h2>
            <div className="row">
                {users.map((user, index) => (
                    <div className="col-md-4 mb-4" key={index}>
                        <div className="card h-100">
                            <div className="card-body">
                                <h5 className="card-title text-center">{user.name.toUpperCase()}</h5>
                                <p className="card-text"><strong>Gender:</strong> {user.gender}</p>
                                <p className="card-text"><strong>Email:</strong> {user.email}</p>
                                <p className="card-text"><strong>Mobile:</strong> {user.mobile}</p>
                                <p className="card-text"><strong>Address:</strong> {user.address}</p>
                                <p className="card-text"><strong>Emergency Contact:</strong> {user.emergencyContact}</p>
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
