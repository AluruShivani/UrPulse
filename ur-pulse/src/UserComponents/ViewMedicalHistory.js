import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function ViewMedicalHistory() {
  const [medicalHistory, setMedicalHistory] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const { userId } = useParams();

  useEffect(() => {
    // Fetch medical history data from the API
    const fetchMedicalHistory = async () => {
      try {
        setErrorMessage(''); // Clear any previous error message
        // Modify the URL to include the user ID
        //const userId = sessionStorage.getItem("userId");
        const response = await axios.get(`http://localhost:8091/api/v1/medical-history/${userId}`);
        setMedicalHistory(response.data);
      } catch (error) {
        console.error('Error fetching medical history:', error);
        if (error.response) {
          console.error('Response data:', error.response.data);
          setErrorMessage(error.response.data.message || 'An error occurred while fetching medical history.');
        } else {
          setErrorMessage('An error occurred while fetching medical history.');
        }
      }
    };

    fetchMedicalHistory();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Medical History</h2>
      {errorMessage && <div className="alert alert-danger text-center">{errorMessage}</div>}
      <div className="row">
        {medicalHistory.map((record) => (
          <div className="col-md-6 mb-4" key={record.medicalId}>
            <div className="card">
              <div className="card-header" style={{ backgroundColor: '#C0C0C0' }}>
                <h5 className="card-title">Medical Record</h5>
              </div>
              <div className="card-body" style={{ backgroundColor: '#F7E7CE' }}>
                <p className="card-text"><strong>Allergy:</strong> {record.allergy}</p>
                <p className="card-text"><strong>Medical History:</strong> {record.medicalHistory}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
