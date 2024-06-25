import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function UserProfile() {
    const [user, setUser] = useState({});
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const userId = sessionStorage.getItem('userId');
                if (userId) {
                    const response = await axios.get(`http://localhost:8091/api/v1/getUserById/${userId}`);
                    console.log("User data:", response.data); // Log the response data
                    setUser(response.data);
                } else {
                    setErrorMessage("No  data found.");
                }
            } catch (error) {
                console.error("Error fetching  profile:", error);
                setErrorMessage("Failed to fetch  profile. Please try again.");
            }
        };

        fetchUserProfile();
    }, []);

    const handleEditProfile = () => {
        // Logic to handle profile editing
        console.log('Edit profile clicked');
    };

   
                    

    return (
        <div className='container mt-5'>
            
            <div className='row mt-5'>
              
                <div className='col-sm-8 mx-auto'>
                    <div className='card shadow p-3 mb-5 bg-white rounded'>
                    <h1 className='text-center'>Profile</h1>
                        <div className='card-body'>
                        
                            <div className='row'>
                                
                                <div className='col-sm-6'>
                                    {errorMessage && <p className="text-danger">{errorMessage}</p>}
                                    <div>
                                        <label><strong>Name:</strong> {user.name || 'N/A'}</label>
                                    </div>
                                    <div>
                                        <label><strong>Gender:</strong> {user.gender || 'N/A'}</label>
                                    </div>
                                    <div>
                                        <label><strong>address:</strong> {user.address || 'N/A'}</label>
                                    </div>
                                    <div>
                                        <label><strong>Email:</strong> {user.email || 'N/A'}</label>
                                    </div>
                                    <div>
                                        <label><strong>Mobile:</strong> {user.mobile || 'N/A'}</label>
                                    </div>
                                    <div>
                                        <label><strong>EmergrncyContact:</strong> {user.emergencyContact || 'N/A'}</label>
                                    </div>
                                    
                                    {user.password && (
                                        <div>
                                            <label><strong>Password:</strong>{user.password || 'N/A'}</label>
                                        </div>
                                    )}
                                   
                                    <button 
                                        className='btn btn-primary mt-3' 
                                        onClick={handleEditProfile}>
                                        Edit Profile
                                    </button>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
