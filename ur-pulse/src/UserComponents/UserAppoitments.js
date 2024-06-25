import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const ViewAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [prescriptions, setPrescriptions] = useState([]);
  const [prescriptionError, setPrescriptionError] = useState(null);
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);
  const [isPharmacyModalOpen, setIsPharmacyModalOpen] = useState(false);
  const [pharmacies, setPharmacies] = useState([]);
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const userId = sessionStorage.getItem('userId');
        if (!userId) {
          throw new Error('User ID not found in session');
        }
        const response = await fetch(`http://localhost:8091/api/v1/appointments/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch appointments');
        }
        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchAppointments();
  }, []);

  const handleViewPrescription = async (appointmentId) => {
    try {
      const response = await fetch(`http://localhost:8091/api/v1/prescriptions/appointments/${appointmentId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch prescriptions');
      }
      const data = await response.json();
      setPrescriptions(data);
      setSelectedAppointment(appointmentId);
      setIsPrescriptionModalOpen(true); // Show the prescription modal
    } catch (error) {
      setPrescriptionError(error.message);
    }
  };

  const handleBook = async () => {
    try {
      const response = await fetch('http://localhost:8091/api/v1/getAllPharmacies');
      if (!response.ok) {
        throw new Error('Failed to fetch pharmacies');
      }
      const data = await response.json();
      setPharmacies(data);
      setIsPharmacyModalOpen(true); // Show the pharmacy modal
    } catch (error) {
      console.error(error);
    }
  };

  const handleTransferPrescription = async () => {
    if (!selectedPharmacy || !selectedAppointment) return;

    const requestBody = {
      prescriptions: prescriptions.map(p => p.prescription),
      appointmentId: selectedAppointment
    };

    console.log('Request Body:', JSON.stringify(requestBody));

    try {
      const response = await fetch(`http://localhost:8091/api/v1/prescriptions/transfer/${selectedPharmacy}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error Response:', errorText);
        throw new Error('Failed to transfer prescriptions');
      }

      const message = await response.text();
      alert(message);  // Display the alert message from the backend

      setIsPharmacyModalOpen(false);
      setSelectedPharmacy(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClosePrescriptionModal = () => {
    setIsPrescriptionModalOpen(false);
    setSelectedAppointment(null);
  };

  const handleClosePharmacyModal = () => {
    setIsPharmacyModalOpen(false);
    setSelectedPharmacy(null);
  };

  return (
    <div className="container mt-4 bg-warning">
      <h1 className="text-center">APPOINTMENTS</h1>
      {error ? (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : (
        <ul className="list-group">
          {appointments.map(appointment => (
            <li key={appointment.appointmentId} className="list-group-item custom-border mb-3">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <strong>Appointment:</strong> {appointment.appointmentId} <br />
                  <strong>Doctor:</strong> {appointment.doctorId} <br />
                  <strong>Book Date:</strong> {appointment.bookDate} <br />
                  <strong>Appointment Date:</strong> {appointment.appointmentDate} <br />
                  <strong>Appointment Status:</strong> {appointment.appointmentStatus} <br />
                  <strong>Appointment Time:</strong> {appointment.appointmentTime} <br />
                  <strong>Symptoms:</strong> {appointment.symptoms} <br />
                  <strong>Weight:</strong> {appointment.weight} <br />
                  <strong>Age:</strong> {appointment.age} <br />
                </div>
                <button
                  className="btn btn-success"
                  onClick={() => handleViewPrescription(appointment.appointmentId)}
                >
                  View Prescription
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Prescription Modal */}
      {isPrescriptionModalOpen && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h3 className="modal-title">PRESCRIPTIONS</h3>
              </div>
              <div className="modal-body">
                {prescriptionError ? (
                  <div className="alert alert-danger" role="alert">
                    {prescriptionError}
                  </div>
                ) : (
                  <ul>
                    {prescriptions.map(prescription => (
                      <li key={prescription.prescriptionId}>{prescription.prescription}</li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline-secondary" onClick={handleClosePrescriptionModal}>
                  Close
                </button>
                <button type="button" className="btn btn-outline-success" onClick={handleBook}>
                  Order To Pharmacy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pharmacy Modal */}
      {isPharmacyModalOpen && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Select Pharmacy</h5>
              </div>
              <div className="modal-body">
                <ul className="list-group">
                  {pharmacies.map(pharmacy => (
                    <li
                      key={pharmacy.pharmacyId}
                      className={`list-group-item ${selectedPharmacy === pharmacy.pharmacyId ? 'active' : ''}`}
                      onClick={() => setSelectedPharmacy(pharmacy.pharmacyId)}
                      style={{ cursor: 'pointer' }}
                    >
                      {pharmacy.pharmacyName}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleClosePharmacyModal}>
                  Close
                </button>
                <button type="button" className="btn btn-primary" onClick={handleTransferPrescription}>
                  Transfer Prescription
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <style>
        {`
          .modal-header {
            background-color: #f8d7da;
          }

          .modal-title {
            color: #721c24;
            
          }

          .list-group-item.active {
            background-color: #007bff;
            border-color: #007bff;
          }
        `}
      </style>
    </div>
  );
};

export default ViewAppointments;
