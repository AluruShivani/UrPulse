import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; 

export default function DoctorRegister() {
    const navigate = useNavigate(); 

    const [formData, setFormData] = useState({
        name: '',
        gender: '',
        mobile: '',
        email: '',
        password: '',
       address: '',
       emergencyContact: ''
       
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8091/api/v1/addUser', formData);
            
            if (response.status === 200) {
                setSuccessMessage('User added successfully!');
                setTimeout(() => {
                    setSuccessMessage('');
                    navigate('/Userlogin'); 
                   
                }, 3000);
            } else {
                console.error('Error adding doctor:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding doctor:', error.message);
        }
    };

    return (
        <div className="container mt-5">
            {successMessage && (
                <div className="alert alert-success" role="alert">
                    {successMessage}
                </div>
            )}
            <h2 className="card-title text-center mb-4"><b>Registration Form</b></h2>
            <div className="card mx-auto" style={{ maxWidth: '800px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            
                <div className="card-body">
                   
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label"><b>Name</b></label>
                            <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} required />
                        </div>

                       

                        <div className="mb-3">
                            <label htmlFor="gender" className="form-label"><b>Gender</b></label><br />
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="gender" id="male" value="Male" onChange={handleChange} required />
                                <label className="form-check-label" htmlFor="male">Male</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="gender" id="female" value="Female" onChange={handleChange} required />
                                <label className="form-check-label" htmlFor="female">Female</label>
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="mobile" className="form-label"><b>Mobile</b></label>
                            <input type="text" className="form-control" id="mobile" name="mobile" value={formData.mobile} onChange={handleChange} required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label"><b>Email</b></label>
                            <input type="text" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label"><b>Password</b></label>
                            <input type="text" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="address" className="form-label"><b>Address</b></label>
                            <input type="text" className="form-control" id="address" name="address" value={formData.address} onChange={handleChange} required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="emergencyContact" className="form-label"><b>Emergency Contact</b></label>
                            <input type="text" className="form-control" id="emergencyContact" name="emergencyContact"  value={formData.emergencyContact} onChange={handleChange} required />
                        </div>
            
                        <button type="submit" className="btn btn-primary btn-block">Register</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
