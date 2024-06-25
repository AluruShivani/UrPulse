import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AddMedicalHistory() {
    const [formData, setFormData] = useState({
        allergy: '',
        medicalHistory: '',
        userId: '',
    });

    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        // Retrieve userId from session storage when component mounts
        const userId = sessionStorage.getItem('userId');
        if (userId) {
            setFormData((prevData) => ({
                ...prevData,
                userId: userId,
            }));
        } else {
            console.error('User ID not found in session storage');
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8091/api/v1/addMedicalhistory', formData);

            if (response.status === 200) {
                setSuccessMessage('Medical history added successfully!');
                setTimeout(() => {
                    setSuccessMessage('');
                }, 3000);
            } else {
                console.error('Error adding medical history:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding medical history:', error.message);
        }
    };

    return (
        <div className="container mt-5">
            {successMessage && (
                <div className="alert alert-success" role="alert">
                    {successMessage}
                </div>
            )}
            <h2 className="card-title text-center mb-4"><b>MEDICAL HISTORY FORM</b></h2>
            <div className="card mx-auto" style={{ maxWidth: '800px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="userId" className="form-label"><b>User Id</b></label>
                            <input
                                type="text"
                                className="form-control"
                                id="userId"
                                name="userId"
                                value={formData.userId}
                                readOnly
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="allergy" className="form-label"><b>Allergy</b></label>
                            <input
                                type="text"
                                className="form-control"
                                id="allergy"
                                name="allergy"
                                value={formData.allergy}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="medicalHistory" className="form-label"><b>Medical History</b></label>
                            <input
                                type="text"
                                className="form-control"
                                id="medicalHistory"
                                name="medicalHistory"
                                value={formData.medicalHistory}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">Register</button>
                    </form>
                </div>
            </div>
            <style>
                {`
                .container {
                    background-color: #67f077;
                }
                `}
            </style>
        </div>
    );
}    