import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function PharmacyProfile() {
  const [pharmacy, setPharmacy] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    const fetchPharmacyProfile = async () => {
      try {
        const pharmacyId = sessionStorage.getItem('pharmacyId');
        if (pharmacyId) {
          const response = await axios.get(`http://localhost:8091/api/v1/getPharmacyById/${pharmacyId}`);
          console.log("Pharmacy data:", response.data);
          setPharmacy(response.data);
        } else {
          setErrorMessage("No pharmacy data found.");
        }
      } catch (error) {
        console.error("Error fetching pharmacy profile:", error);
        setErrorMessage("Failed to fetch pharmacy profile. Please try again.");
      }
    };

    fetchPharmacyProfile();
  }, []);

  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  return (
    <div className='container-fluid mt-5'>
      <div className='row'>
        <div className={`col-3 ${showProfile ? 'd-block' : 'd-none'}`}>
          <br /><br />
          <div className='card shadow p-3 mb-5 bg-white rounded' style={{ width: '400px' }}>
            <h3 className='text-center'>Pharmacy Profile</h3>
            <div className='card-body'>
              {errorMessage && <p className="text-danger">{errorMessage}</p>}
              <div className='text-center mb-4'>
                {pharmacy.pharmacyImage ? (
                  <img
                    className='img-fluid rounded border shadow'
                    src={`http://localhost:8091/uploads/${pharmacy.pharmacyImage}`}
                    alt='Pharmacy'
                    style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'cover' }}
                  />
                ) : (
                  <p>No pharmacy image available</p>
                )}
              </div>
              <div>
                <label><strong>Name:</strong> {pharmacy.pharmacyName || 'N/A'}</label>
              </div>
              <div>
                <label><strong>Mobile:</strong> {pharmacy.mobile || 'N/A'}</label>
              </div>
              <div>
                <label><strong>Address:</strong> {pharmacy.location || 'N/A'}</label>
              </div>
              <div>
                <label><strong>Shop Registration Number:</strong> {pharmacy.shopRegNo || 'N/A'}</label>
              </div>
              <div>
                <label><strong>Password:</strong> {pharmacy.password || 'N/A'}</label>
              </div>
            </div>
          </div>
        </div>
        <div className='col-9'>
          <div className='content'>
            <button className="btn btn-primary" onClick={toggleProfile}>
              {showProfile ? 'Hide Profile' : 'Show Profile'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
