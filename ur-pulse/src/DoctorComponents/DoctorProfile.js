import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function DoctorProfile() {
    const [doctor, setDoctor] = useState({});
    const [errorMessage, setErrorMessage] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        doctorName: '',
        gender: '',
        specialization: '',
        email: '',
        mobile: '',
        experience: '',
        status: '',
        consultationFee: '',
        password: '',
        doctorAccount: ''
    });

    useEffect(() => {
        const fetchDoctorProfile = async () => {
            try {
                const doctorId = sessionStorage.getItem('doctorId');
                if (doctorId) {
                    const response = await axios.get(`http://localhost:8091/api/v1/getDoctorById/${doctorId}`);
                    setDoctor(response.data);
                    setFormData(response.data);
                } else {
                    setErrorMessage("No doctor data found.");
                }
            } catch (error) {
                console.error("Error fetching doctor profile:", error);
                setErrorMessage("Failed to fetch doctor profile. Please try again.");
            }
        };

        fetchDoctorProfile();
    }, []);

    const handleEditProfile = () => {
        setIsEditing(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const doctorId = sessionStorage.getItem('doctorId');
            console.log(formData); // Log formData to check its structure
    
            // Prepare data for profile update
            const { doctorPic, certificate, ...restFormData } = formData;
    
            // Update doctor profile
            await axios.put(`http://localhost:8091/api/v1/updateDoctors/${doctorId}`, restFormData);
    
            // Handle doctor picture upload
            if (doctorPic) {
                const formDataPic = new FormData();
                formDataPic.append('file', doctorPic);
                formDataPic.append('filename', doctorPic.name);
                await axios.post('http://localhost:8091/api/files/upload', formDataPic, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            }
    
            // Handle certificate upload
            if (certificate) {
                const formDataCert = new FormData();
                formDataCert.append('file', certificate);
                formDataCert.append('filename', certificate.name);
                await axios.post('http://localhost:8091/api/files/upload', formDataCert, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            }
    
            // Fetch the updated doctor profile
            const updatedDoctorResponse = await axios.get(`http://localhost:8091/api/v1/getDoctorById/${doctorId}`);
            setDoctor(updatedDoctorResponse.data);
    
            // Update state and UI
            setIsEditing(false);
            setErrorMessage("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data.message || "Failed to update profile. Please try again.");
            } else {
                setErrorMessage("Failed to update profile. Please try again.");
            }
        }
    };
    

    const renderCertificate = (certificate) => {
        const fileExtension = certificate.split('.').pop().toLowerCase();
        const certificateUrl = `http://localhost:8091/uploads/${certificate}`;

        if (fileExtension === 'pdf') {
            const googleViewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(certificateUrl)}&embedded=true`;
            return (
                <iframe
                    src={googleViewerUrl}
                    width="100%"
                    height="300px"
                    style={{ border: 'none' }}
                    title="Certificate"
                />
            );
        } else if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)) {
            return (
                <img
                    className='img-fluid rounded'
                    src={certificateUrl}
                    alt='Certificate'
                    style={{ maxWidth: '100%', height: 'auto' }}
                />
            );
        } else {
            return <p>Unsupported file format</p>;
        }
    };

    return (
        <div className='container mt-5'>
            <div className='row mt-5'>
                <div className='col-sm-8 mx-auto'>
                    <div className='card shadow p-3 mb-5 bg-white rounded'>
                        <h1 className='text-center'>Profile</h1>
                        <div className='card-body'>
                            {isEditing ? (
                                <form onSubmit={handleFormSubmit}>
                                    <div className='row'>
                                        <div className='col-sm-12 text-center mb-4'>
                                            <input
                                                type="file"
                                                name="doctorPic"
                                                onChange={handleFileChange}
                                            />
                                        </div>
                                        <div className='col-sm-6'>
                                            {errorMessage && <p className="text-danger">{errorMessage}</p>}
                                            <div>
                                                <label><strong>Name:</strong></label>
                                                <input
                                                    type="text"
                                                    name="doctorName"
                                                    value={formData.doctorName}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div>
                                                <label><strong>Gender:</strong></label>
                                                <input
                                                    type="text"
                                                    name="gender"
                                                    value={formData.gender}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div>
                                                <label><strong>Specialization:</strong></label>
                                                <input
                                                    type="text"
                                                    name="specialization"
                                                    value={formData.specialization}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div>
                                                <label><strong>Email:</strong></label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div>
                                                <label><strong>Mobile:</strong></label>
                                                <input
                                                    type="text"
                                                    name="mobile"
                                                    value={formData.mobile}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div>
                                                <label><strong>Experience:</strong></label>
                                                <input
                                                    type="text"
                                                    name="experience"
                                                    value={formData.experience}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div>
                                                <label><strong>Status:</strong></label>
                                                <input
                                                    type="text"
                                                    name="status"
                                                    value={formData.status}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div>
                                                <label><strong>Consultation Fee:</strong></label>
                                                <input
                                                    type="text"
                                                    name="consultationFee"
                                                    value={formData.consultationFee}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div>
                                                <label><strong>Password:</strong></label>
                                                <input
                                                    type="password"
                                                    name="password"
                                                    value={formData.password}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div>
                                                <label><strong>Doctor Account Number:</strong></label>
                                                <input
                                                    type="text"
                                                    name="doctorAccount"
                                                    value={formData.doctorAccount}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                        <div className='col-sm-6 text-right'>
                                            <label><strong>Certificate:</strong></label>
                                            <input
                                                type="file"
                                                name="certificate"
                                                onChange={handleFileChange}
                                            />
                                        </div>
                                    </div>
                                    <button
                                        className='btn btn-primary mt-3'
                                        type="submit"
                                    >
                                        Save
                                    </button>
                                    <button
                                        className='btn btn-secondary mt-3 ml-3'
                                        onClick={() => setIsEditing(false)}
                                    >
                                        Cancel
                                    </button>
                                </form>
                            ) : (
                                <div className='row'>
                                    <div className='col-sm-12 text-center mb-4'>
                                        {doctor.doctorPic ? (
                                            <img
                                                className='img-fluid rounded border shadow'
                                                src={`http://localhost:8091/uploads/${doctor.doctorPic}`}
                                                alt='Doctor profile'
                                                style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                                            />
                                        ) : (
                                            <p>No profile picture available</p>
                                        )}
                                    </div>
                                    <div className='col-sm-6'>
                                        {errorMessage && <p className="text-danger">{errorMessage}</p>}
                                        <div>
                                            <label><strong>Name:</strong> {doctor.doctorName || 'N/A'}</label>
                                        </div>
                                        <div>
                                            <label><strong>Gender:</strong> {doctor.gender || 'N/A'}</label>
                                        </div>
                                        <div>
                                            <label><strong>Specialization:</strong> {doctor.specialization || 'N/A'}</label>
                                        </div>
                                        <div>
                                            <label><strong>Email:</strong> {doctor.email || 'N/A'}</label>
                                        </div>
                                        <div>
                                            <label><strong>Mobile:</strong> {doctor.mobile || 'N/A'}</label>
                                        </div>
                                        <div>
                                            <label><strong>Experience:</strong> {doctor.experience || 'N/A'}</label>
                                        </div>
                                        <div>
                                            <label><strong>Status:</strong> {doctor.status || 'N/A'}</label>
                                        </div>
                                        <div>
                                            <label><strong>Consultation Fee:</strong> {doctor.consultationFee || 'N/A'}</label>
                                        </div>
                                        <div>
                                            <label><strong>Password:</strong> {doctor.password || 'N/A'}</label>
                                        </div>
                                        <div>
                                            <label><strong>Doctor Account Number:</strong> {doctor.drAcc || 'N/A'}</label>
                                        </div>
                                        <button
                                            className='btn btn-primary mt-3'
                                            onClick={handleEditProfile}
                                        >
                                            Edit Profile
                                        </button>
                                    </div>
                                    <div className='col-sm-6 text-right'>
                                        <label><strong>Certificate:</strong></label>
                                        {doctor.certificate ? (
                                            <div>
                                                {renderCertificate(doctor.certificate)}
                                            </div>
                                        ) : (
                                            <p>No certificate available</p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
