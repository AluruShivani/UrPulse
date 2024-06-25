import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default function ViewAllDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('http://localhost:8091/api/v1/getAllDoctors');
      setDoctors(response.data);
      setFilteredDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    filterDoctors(e.target.value);
  };

  const filterDoctors = (query) => {
    if (query.trim()) {
      const lowerCaseQuery = query.toLowerCase();
      const filtered = doctors.filter(doctor =>
        doctor.doctorName.toLowerCase().includes(lowerCaseQuery) ||
        doctor.specialization.toLowerCase().includes(lowerCaseQuery) ||
        doctor.hospitalLocation.toLowerCase().includes(lowerCaseQuery)
      );
      setFilteredDoctors(filtered);
    } else {
      setFilteredDoctors(doctors);
    }
  };

  return (
    <>
      <div className="container mt-3">
        <h1 className="text-center mb-4">DOCTORS</h1>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form onSubmit={(e) => e.preventDefault()} className="input-group">
              <div className="input-group-prepend">
                
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Search doctors by name, specialization, or location..."
                value={searchQuery}
                onChange={handleSearchChange}
                style={{ width: '200px' }} // Decreased size of the search box
                list="doctorSuggestions"
              />
            </form>
          </div>
        </div>
        <div className="row mt-4">
          {filteredDoctors.map((doctor, index) => (
            <div className="col-md-4 mb-4" key={index}>
               <div className="card h-100">
                  <div className="card-body">
                    <h1 className="card-title text-center">Dr.{doctor.doctorName.toUpperCase()}</h1>
                    <p className="card-text"><strong>Gender:</strong> {doctor.gender}</p>
                    <p className="card-text"><strong>Mobile:</strong> {doctor.mobile}</p>
                    <p className="card-text"><strong>Email:</strong> {doctor.email}</p>
                    <p className="card-text"><strong>Specialization:</strong> {doctor.specialization}</p>
                    <p className="card-text"><strong>Experience:</strong> {doctor.experience} years</p>
                    <p className="card-text"><strong>Certificate:</strong> {doctor.certificate}</p>
                    <p className="card-text"><strong>Hospital Name:</strong> {doctor.hospitalName}</p>
                    <p className="card-text"><strong>Hospital Location:</strong> {doctor.hospitalLocation}</p>
                    <p className="card-text"><strong>Consultation Fee:</strong> ${doctor.consultationFee}</p>
                    <p className="card-text"><strong>Doctor Account:</strong> {doctor.drAcc}</p>
                    <p className={`card-text ${doctor.status.toLowerCase() === 'active' ? 'active-status' : 'inactive-status'}`}>
                      <strong>Status:</strong> {doctor.status}
                    </p>

                    <Link to={`/user/ViewDoctorSchedule/${doctor.doctorId}`} className="btn btn-success schedule-button">
                      View Schedule
                    </Link>
                  </div>
                </div>
            </div>
          ))}
        </div>
        <style>
          {`
          .card {
            border: 1px solid #dddddd;
            border-radius: 15px;
            box-shadow: 0 10px 10px rgba(0,0,0,0.1);
            transition: transform 0.2s;
            position: relative;
          }
          
          .card:hover {
            transform: scale(1.05);
          }
          
          .card-body {
            padding: 20px;
          }
          
          .card-title {
            font-size: 1.25rem;
            margin-bottom: 50px;
          }
          
          .card-text {
            margin-bottom: 10px;
          }

          .schedule-button {
            position: absolute;
            bottom: 10px;
            right: 10px;
          }

          .active-status {
            background-color: #c4f562;
          }
          
          .inactive-status {
            background-color: #f589af;
          }

          .container {
            background-color:#ebb7d0;
          }

          h1.text-center.mb-4 {
            -webkit-text-stroke: 3px ;
            color: white;
            font-weight: bold;
            font-size: 3.5rem;
          }
          `}
        </style>
      </div>
    </>
  );
}
