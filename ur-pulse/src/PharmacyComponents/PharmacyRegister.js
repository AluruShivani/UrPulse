import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function PharmacyRegistration() {
    const [pharmacyName, setPharmacyName] = useState("");
    const [shopRegNo, setShopRegNo] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [location, setLocation] = useState("");
    const [pharmacyImage, setPharmacyImage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [file, setFile] = useState(null);
    const [successModalOpen, setSuccessModalOpen] = useState(false);
    const navigate = useNavigate();

    const previewImage = (event) => {
        const input = event.target;
        const output = document.getElementById("pharmacyImagePreview");
        output.src = URL.createObjectURL(input.files[0]);
    }

    const uploadImage = async (filename) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("filename", filename);

        try {
            const response = await axios.post("http://localhost:8091/api/files/upload", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 200) {
                console.log("Image uploaded successfully...");
            } else {
                console.log("Failed to upload the image");
            }
        } catch (error) {
            console.log("Error uploading the image", error);
        }
    };

    const openSuccessModal = () => {
        setSuccessModalOpen(true);
    };

    const closeSuccessModal = () => {
        setSuccessModalOpen(false);
        navigate('/Pharmacylogin');
    };

    const registerPharmacy = async () => {
        console.log("in register pharmacy method.");
        let filename = Date.now() + pharmacyImage;

        try {
            let response = await axios.post('http://localhost:8091/api/v1/addPharmacy', {
                pharmacyName: pharmacyName,
                shopRegNo: shopRegNo,
                email: email,
                mobile: mobile,
                password: password,
                location: location,
                pharmacyImage: filename
            });

            console.log(response.data);
            if (response.data) {
                uploadImage(filename);
                openSuccessModal(); // Open success modal upon successful registration
            }
        } catch (error) {
            console.error("Registration error:", error);
            setErrorMessage("Registration failed. Please try again.");
        }
    };

    const handleRegister = (e) => {
        e.preventDefault();
        registerPharmacy();
    };

    return (
        <div className="container mt-5">
            <h2 className="card-title text-center mb-5">Registration Form</h2>
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="card shadow-lg">
                        <div className="card-body p-5">
                            <div className="row mb-3">
                                <div className="col text-right">
                                </div>
                            </div>
                            {errorMessage && (
                                <div className="alert alert-danger text-center" role="alert">
                                    {errorMessage}
                                </div>
                            )}
                            <form onSubmit={handleRegister}>
                                <div className="row mb-3">
                                    <div className="col-12">
                                        <label htmlFor="pharmacyName" className="form-label"><b>Pharmacy Name</b></label>
                                        <input type="text" className="form-control" id="pharmacyName" value={pharmacyName} onChange={(e) => setPharmacyName(e.target.value)} required />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-12">
                                        <label htmlFor="shopRegNo" className="form-label"><b>Shop Registered Number</b></label>
                                        <input type="text" className="form-control" id="shopRegNo" value={shopRegNo} onChange={(e) => setShopRegNo(e.target.value)} required />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-12">
                                        <label htmlFor="email" className="form-label"><b>Email</b></label>
                                        <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-12">
                                        <label htmlFor="mobile" className="form-label"><b>Mobile</b></label>
                                        <input type="text" className="form-control" id="mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} required />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-12">
                                        <label htmlFor="password" className="form-label"><b>Password</b></label>
                                        <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-12">
                                        <label htmlFor="location" className="form-label"><b>Location</b></label>
                                        <input type="text" className="form-control" id="location" value={location} onChange={(e) => setLocation(e.target.value)} required />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-12">
                                        <label htmlFor="pharmacyImage" className="form-label"><b>Pharmacy Image</b></label>
                                        <input type="file" className="form-control" id="pharmacyImageInput" onChange={(e) => {
                                            setFile(e.target.files[0]);
                                            setPharmacyImage(e.target.files[0].name);
                                            previewImage(e);
                                        }} required />
                                        <br />
                                        <img
                                            id="pharmacyImagePreview"
                                            className="img-fluid rounded-circle"
                                            width="100px"
                                            height="100px"
                                            alt="Preview image" />
                                    </div>
                                </div>
                                <div className="text-center">
                                    <button type="submit" className="btn btn-primary">Register</button>
                                </div>
                            </form>
                            {successModalOpen && (
                                <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
                                    <div className="modal-dialog modal-dialog-centered" role="document">
                                        <div className="modal-content">
                                            <div className="modal-body text-center">
                                                <div style={{ fontSize: '64px', color: 'green' }}>
                                                    <i className="bi bi-check-circle-fill"></i>
                                                </div>
                                                <h5 className="modal-title mb-3">Registered Successfully!</h5>
                                                <button type="button" className="btn btn-info" onClick={closeSuccessModal}>OK</button>
                                            </div>
                                        </div>
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
