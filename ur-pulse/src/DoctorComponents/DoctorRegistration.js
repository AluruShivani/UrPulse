import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function DoctorRegistration() {
    const [doctorName, setDoctorName] = useState("");
    const [specialization, setSpecialization] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [certificate, setCertificate] = useState("");
    const [doctorPic, setDoctorPic] = useState("");
    const [hospitalName, setHospitalName] = useState("");
    const [hospitalLocation, setHospitalLocation] = useState("");
    const [experience, setExperience] = useState(0);
    const [status, setStatus] = useState("");
    const [consultationFee, setConsultationFee] = useState(0);
    const [password, setPassword] = useState("");
    const [gender, setGender] = useState("");
    const [drAcc, setDrAcc] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [file1, setFile1] = useState(null);
    const [file2, setFile2] = useState(null);
    const [successModalOpen, setSuccessModalOpen] = useState(false);
    const navigate = useNavigate();

    const previewImage = (event) => {
        const input = event.target;
        const output = document.getElementById("doctorPic");
        output.src = URL.createObjectURL(input.files[0]);
    }

    const uploadImage = async (filename1) => {
        const formData = new FormData();
        formData.append("file", file1);
        formData.append("filename", filename1);

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

    const uploadDoc = async (filename2) => {
        const formData = new FormData();
        formData.append("file", file2);
        formData.append("filename", filename2);

        try {
            const response = await axios.post("http://localhost:8091/api/files/upload", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 200) {
                console.log("Certificates uploaded successfully...");
            } else {
                console.log("Failed to upload the certificates");
            }
        } catch (error) {
            console.log("Error uploading the certificate", error);
        }
    };

    const openSuccessModal = () => {
        setSuccessModalOpen(true);
    };

    const closeSuccessModal = () => {
        setSuccessModalOpen(false);
        navigate('/Doctorlogin');
    };

    const registerDoctor = async () => {
        console.log("In register doc method.");
        let filename1 = Date.now() + doctorPic;
        let filename2 = Date.now() + certificate;

        try {
            let response = await axios.post('http://localhost:8091/api/v1/addDoctor',
                {
                    doctorName: doctorName,
                    specialization: specialization,
                    email: email,
                    mobile: mobile,
                    certificate: filename2,
                    doctorPic: filename1,
                    hospitalName: hospitalName,
                    hospitalLocation: hospitalLocation,
                    experience: experience,
                    status: status,
                    consultationFee: consultationFee,
                    password: password,
                    gender: gender,
                    drAcc: drAcc
                }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log(response.data);
            if (response.data) {
                uploadImage(filename1);
                uploadDoc(filename2);
                openSuccessModal(); // Open success modal upon successful registration
            }
        } catch (error) {
            console.error("Registration error:", error);
            setErrorMessage("Registration failed. Please try again.");
        }
    };

    const handleRegister = (e) => {
        e.preventDefault();
        registerDoctor();
    };

    return (
        <div>
            <div className="container mt-5">
            <h2 className="card-title text-center mb-5">Registration Form</h2>
                
                <div className="card shadow-sm" style={{ maxWidth: '900px', margin: '0 auto' }}>
                    <div className="card-body">
                        <div className="row mb-3">
                        </div>
                      
                        {errorMessage && (
                            <div style={{ marginBottom: "20px", color: "red", textAlign: "center" }}>
                                {errorMessage}
                            </div>
                        )}
                        <form>
                            <div className='row mt-3'>
                                <div className='col-12'>
                                    <label><b>Doctor Name</b></label><br />
                                    <input type='text' placeholder='Enter doctor name' value={doctorName} onChange={(e) => setDoctorName(e.target.value)} className='form-control' />
                                </div>
                            </div>
                            <div className='row mt-3'>
                                <div className='col-12'>
                                    <label><b>Gender:</b></label><br />
                                    <input type='radio' id='male' name='gender' value='Male' checked={gender === 'Male'} onChange={() => setGender('Male')} />
                                    <label htmlFor='male' style={{ marginRight: '10px', marginLeft: '5px' }}>Male</label>
                                    <input type='radio' id='female' name='gender' value='Female' checked={gender === 'Female'} onChange={() => setGender('Female')} />
                                    <label htmlFor='female' style={{ marginRight: '10px', marginLeft: '5px' }}>Female</label>
                                </div>
                            </div>
                            
                            <div className='row mt-3'>
                                <div className='col-12'>
                                    <label><b>Specialization</b></label><br />
                                    <input type='text' placeholder='Enter specialization' value={specialization} onChange={(e) => setSpecialization(e.target.value)} className='form-control' />
                                </div>
                            </div>
                            <div className='row mt-3'>
                                <div className='col-12'>
                                    <label><b>Email</b></label><br />
                                    <input type='email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)} className='form-control' />
                                </div>
                            </div>
                            <div className='row mt-3'>
                                <div className='col-12'>
                                    <label><b>Mobile</b></label><br />
                                    <input type='text' placeholder='Enter mobile number' value={mobile} onChange={(e) => setMobile(e.target.value)} className='form-control' />
                                </div>
                            </div>
                            <div className='row mt-3'>
                                <div className='col-12'>
                                    <label><b>Certificates (PDF)</b></label><br />
                                    <input type='file' id='file2' onChange={(e) => {
                                        setFile2(e.target.files[0]);
                                        setCertificate(e.target.files[0].name);
                                    }}
                                        className='form-control' />
                                </div>
                            </div>
                            <div className='row mt-3'>
                                <div className='col-12'>
                                    <label><b>Hospital Name</b></label><br />
                                    <input type='text' placeholder='Enter hospital name' value={hospitalName} onChange={(e) => setHospitalName(e.target.value)} className='form-control' />
                                </div>
                            </div>
                            <div className='row mt-3'>
                                <div className='col-12'>
                                    <label><b>Hospital Location</b></label><br />
                                    <input type='text' placeholder='Enter hospital location' value={hospitalLocation} onChange={(e) => setHospitalLocation(e.target.value)} className='form-control' />
                                </div>
                            </div>
                            <div className='row mt-3'>
                                <div className='col-12'>
                                    <label><b>Experience</b></label><br />
                                    <input type='number' placeholder='Enter experience' value={experience} onChange={(e) => setExperience(parseInt(e.target.value))} className='form-control' />
                                </div>
                            </div>
                            <div className='row mt-3'>
                                <div className='col-12'>
                                    <label><b>Status</b></label><br />
                                    <input type='text' placeholder='Enter status' value={status} onChange={(e) => setStatus(e.target.value)} className='form-control' />
                                </div>
                            </div>
                            <div className='row mt-3'>
                                <div className='col-12'>
                                    <label><b>Consultation Fee</b></label><br />
                                    <input type='number' placeholder='Enter consultation fee' value={consultationFee} onChange={(e) => setConsultationFee(parseInt(e.target.value))} className='form-control' />
                                </div>
                            </div>
                            <div className='row mt-3'>
                                <div className='col-12'>
                                    <label><b>Password</b></label><br />
                                    <input type='password' placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)} className='form-control' />
                                </div>
                            </div>
                            <div className='row mt-3'>
                                <div className='col-12'>
                                    <label><b>Dr Acc</b></label><br />
                                    <input type='text' placeholder='Enter doctor account' value={drAcc} onChange={(e) => setDrAcc(e.target.value)} className='form-control' />
                                </div>
                            </div>
                            <div className='row mt-3'>
                                <div className='col-12'>
                                    <label><b>Doctor Picture (Image)</b></label><br />
                                    <input type='file' id='file1' onChange={(e) => {
                                        setFile1(e.target.files[0]);
                                        setDoctorPic(e.target.files[0].name);
                                        previewImage(e);
                                    }}
                                        className='form-control' />
                                    <br></br>
                                    <img
                                        id="doctorPic"
                                        className='img-fluid rounded-circle'
                                        width="100px"
                                        height="100px"
                                        alt='Preview image' />
                                </div>
                            </div>
                           
                            <center>
                                <div className='row mt-3'>
                                    <div className='col-12'>
                                        <button type='submit' className='btn btn-primary' style={{ maxWidth: '200px' }} onClick={handleRegister}>Register Now</button>
                                    </div>
                                </div>
                            </center>
                        </form>
                    </div>
                </div>
            </div>

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
    );
}
