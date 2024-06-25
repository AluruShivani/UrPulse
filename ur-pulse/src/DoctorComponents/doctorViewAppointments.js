import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function ViewDoctorAppointments() {
  const { doctorId } = useParams();
  const [appointments, setAppointments] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [activeTab, setActiveTab] = useState('active');

  useEffect(() => {
    fetchAppointments();
  }, []);

  useEffect(() => {
    console.log('Appointments:', appointments);
    console.log('Active Tab:', activeTab);
  }, [appointments, activeTab]);

  const fetchAppointments = async () => {
    try {
      setErrorMessage('');
      const doctorIdInt = sessionStorage.getItem('doctorId');
      const url = `http://localhost:8091/api/v1/appointments/doctor/${doctorIdInt}`;
      const response = await axios.get(url);
      const appointmentsWithUserDetails = await Promise.all(
        response.data.map(async (appointment) => {
          const userResponse = await axios.get(`http://localhost:8091/api/v1/getUserById/${appointment.userId}`);
          return { ...appointment, user: userResponse.data, prescriptionAdded: false };
        })
      );
      setAppointments(appointmentsWithUserDetails);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setErrorMessage(error.response?.data?.message || "An error occurred while fetching appointments.");
    }
  };

  const formatMobileNumber = (mobile) => {
    if (!mobile) {
      console.warn('No mobile number provided');
      return '';
    }

    let formattedMobile = mobile.replace(/[^\d+]/g, '');
    
    if (!formattedMobile.startsWith('+')) {
      formattedMobile = '+' + formattedMobile;
    }

    return formattedMobile;
  };

  const handlePhoneCall = (phoneNumber) => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const parseDate = (dateString) => {
    return new Date(dateString);
  };

  const deleteAppointment = async (appointmentId) => {
    try {
      const response = await axios.delete(`http://localhost:8091/api/v1/deleteAppointment/${appointmentId}`);
      if (response.status === 200) {
        setAppointments(appointments.filter(appointment => appointment.appointmentId !== appointmentId));
      }
    } catch (error) {
      console.error('Error deleting appointment:', error);
      setErrorMessage('Failed to delete appointment. Please try again.');
    }
  };

  const addPrescription = (appointmentId) => {
    setAppointments(prevAppointments => 
      prevAppointments.map(appointment => 
        appointment.appointmentId === appointmentId 
          ? { ...appointment, prescriptionAdded: true } 
          : appointment
      )
    );
  };

  const filteredAppointments = () => {
    const today = new Date().toISOString().split('T')[0];
    const todayDate = new Date(today);
  
    return appointments.filter(appointment => {
      const appointmentDate = new Date(appointment.appointmentDate);
      const appointmentStatus = appointment.appointmentStatus.toLowerCase();
  
      // Check if appointment date is in the future
      if (appointmentDate > todayDate) {
        if (appointmentStatus !== 'completed' && appointmentStatus !== 'onprogress') {
          // Automatically set status to 'pending' for future appointments
          appointment.appointmentStatus = 'pending';
        }
      } else if (appointmentDate.toDateString() === todayDate.toDateString()) {
        if (appointmentStatus === 'scheduled') {
          // Automatically switch to 'active' status if appointment is scheduled for today
          appointment.appointmentStatus = 'active';
        }
      } else {
        if (appointmentStatus === 'scheduled' || appointmentStatus === 'pending') {
          // Automatically switch to 'completed' status if appointment date is in the past
          appointment.appointmentStatus = 'completed';
        }
      }
  
      switch (activeTab) {
        case 'active':
          return appointment.appointmentStatus === 'active';
        case 'future':
          return appointment.appointmentStatus === 'pending';
        case 'history':
          return appointment.appointmentStatus === 'completed' || appointment.appointmentStatus === 'onprogress';
        default:
          return false;
      }
    });
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Appointments</h2>
      {errorMessage && <div className="alert alert-danger text-center">{errorMessage}</div>}
      <div className="row mb-3">
        <div className="col-md-12 text-center">
          <div className="btn-group" role="group">
            <button type="button" className={`btn btn-outline-primary ${activeTab === 'active' ? 'active' : ''}`} onClick={() => setActiveTab('active')}>
              Active Appointments
            </button>
            <button type="button" className={`btn btn-outline-primary ${activeTab === 'future' ? 'active' : ''}`} onClick={() => setActiveTab('future')}>
              Future Appointments
            </button>
            <button type="button" className={`btn btn-outline-primary ${activeTab === 'history' ? 'active' : ''}`} onClick={() => setActiveTab('history')}>
              History
            </button>
          </div>
        </div>
      </div>
      <div className="row">
        {filteredAppointments().map(appointment => (
          <div className="col-md-4 mb-4" key={appointment.appointmentId}>
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="card-title m-0">Appointment ID: {appointment.appointmentId}</h5>
                {activeTab === 'active' && (
                 <Link 
                 to={`/addPrescription/${appointment.appointmentId}`}
                 className="btn btn-warning"
               >
                 {appointment.prescriptionAdded ? 'Prescription Added' : 'Add Prescription'}
               </Link>
               
                )}
              </div>
              <div className="card-body">
                <p className="card-text"><strong>User ID:</strong> {appointment.userId}</p>
                <p className="card-text"><strong>Date:</strong> {appointment.appointmentDate}</p>
                <p className="card-text"><strong>Time:</strong> {appointment.appointmentTime}</p>
                <p className="card-text"><strong>Status:</strong> {appointment.appointmentStatus}</p>
                <div className="d-flex justify-content-between">
                  {activeTab !== 'active' && activeTab !== 'future' && (
                    <button className="btn btn-danger" onClick={() => deleteAppointment(appointment.appointmentId)}>Delete</button>
                  )}
                  {activeTab === 'active' && appointment.user?.mobile && (
                    <button className="btn btn-info" onClick={() => handlePhoneCall(appointment.user.mobile)}>Call</button>
                  )}
                  {activeTab !== 'future' && activeTab !== 'history' && (
                    <Link to={`/UserComponents/ViewMedicalHistory/${appointment.userId}`} className="btn btn-success">
                      View Medical History
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
