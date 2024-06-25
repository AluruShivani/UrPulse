import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ViewAppointments() {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const response = await axios.get('http://localhost:8091/api/v1/getAllAppointments');
            setAppointments(response.data);
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Appointments</h2>
            <div className="row">
                {appointments.map((appointment, index) => (
                    <div className="col-md-4 mb-4" key={index}>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title text-center">Appointment ID: {appointment.appointmentId}</h5><br/>
                                <p className="card-text"><strong>User ID:</strong> {appointment.userId}</p>
                                <p className="card-text"><strong>Doctor ID:</strong> {appointment.doctorId}</p>
                                <p className="card-text"><strong>Book Date:</strong> {appointment.bookDate}</p>
                                <p className="card-text"><strong>Appointment Date:</strong> {appointment.appointmentDate}</p>
                                <p className="card-text"><strong>Appointment Status:</strong> {appointment.appointmentStatus}</p>
                                <p className="card-text"><strong>Appointment Time:</strong> {appointment.appointmentTime}</p>
                                <p className="card-text"><strong>Symptoms:</strong> {appointment.symptoms}</p>
                                <p className="card-text"><strong>Weight:</strong> {appointment.weight}</p>
                                <p className="card-text"><strong>Age:</strong> {appointment.age}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
