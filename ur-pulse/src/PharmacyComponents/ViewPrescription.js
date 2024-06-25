import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewPrescription = ({ pharmacyId }) => {
  const [prescriptions, setPrescriptions] = useState({});
  const [error, setError] = useState(null);
  const [dispatchedAppointments, setDispatchedAppointments] = useState([]);
  const [isDispatching, setIsDispatching] = useState(false);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const pharmacyIdFromSession = sessionStorage.getItem('pharmacyId');
        const response = await axios.get(`http://localhost:8091/api/v1/prescriptions/${pharmacyIdFromSession}`);
        if (response.data) {
          const groupedPrescriptions = groupByAppointmentId(response.data);
          setPrescriptions(groupedPrescriptions);
        }
      } catch (error) {
        console.error('Error fetching prescriptions:', error);
        setError('Failed to fetch prescriptions');
      }
    };

    fetchPrescriptions();
  }, []);

  const groupByAppointmentId = (prescriptions) => {
    const groupedPrescriptions = {};
    prescriptions.forEach(prescription => {
      const appointmentId = prescription.appointmentId;
      if (!groupedPrescriptions[appointmentId]) {
        groupedPrescriptions[appointmentId] = [];
      }
      groupedPrescriptions[appointmentId].push(prescription);
    });
    return groupedPrescriptions;
  };

  const handleDispatch = async (appointmentId) => {
    // Disable the dispatch button
    setIsDispatching(true);

    // Show confirmation popup
    const confirmed = window.confirm('Are you sure you want to dispatch the prescription?');
    if (!confirmed) {
      setIsDispatching(false); // Re-enable the dispatch button
      return;
    }

    try {
      // Implement dispatch logic here
      console.log('Dispatch prescriptions for Appointment ID:', appointmentId);

      // Add appointment ID to dispatched list to prevent duplicate dispatch buttons
      setDispatchedAppointments([...dispatchedAppointments, appointmentId]);
    } catch (error) {
      console.error('Error dispatching prescription:', error);
    } finally {
      // Re-enable the dispatch button
      setIsDispatching(false);
    }
  };

  return (
    <div className="container">
      <h2 className="text-center">PRESCRIPTIONS</h2>
      {error ? (
        <div>{error}</div>
      ) : (
        <div className="row justify-content-center mt-3">
          {Object.keys(prescriptions).map(appointmentId => (
            <div key={appointmentId} className="card mb-4" style={{ width: '30rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
              <div className="card-body">
                <h5 className="card-title">APPOINTMENT ID: {appointmentId}</h5><hr/>
                {Array.isArray(prescriptions[appointmentId]) && prescriptions[appointmentId].map((prescription, index) => (
                  <div key={index}>
                    <p className="card-text">Prescription: {prescription.prescription}</p>
                  </div>
                ))}
                {/* Render dispatch button only if appointment ID is not in dispatched list */}
                {dispatchedAppointments.includes(appointmentId) ? (
                  <button className="btn btn-secondary" disabled>
                    Dispatched
                  </button>
                ) : (
                  <button className="btn btn-primary" onClick={() => handleDispatch(appointmentId)} disabled={isDispatching}>
                    {isDispatching ? 'Dispatching...' : 'Dispatch'}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewPrescription;
