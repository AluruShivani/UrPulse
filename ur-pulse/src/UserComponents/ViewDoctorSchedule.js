import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function ViewDoctorSchedule() {
    const { doctorId } = useParams();
    const navigate = useNavigate();
    const [schedules, setSchedules] = useState([]);
    const [selectedScheduleId, setSelectedScheduleId] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (doctorId) {
            fetchSchedulesByDoctorId(doctorId);
        }
    }, [doctorId]);

    const fetchSchedulesByDoctorId = async (doctorId) => {
        try {
            const response = await axios.get(`http://localhost:8091/api/v1/doctor/${doctorId}/schedule`);
            setSchedules(response.data);
        } catch (error) {
            console.error('Error fetching schedules:', error);
            setErrorMessage('Failed to fetch schedules. Please try again.');
        }
    };

    const handleBookNow = () => {
        if (selectedScheduleId) {
            navigate('/user/payment', { state: { doctorId, scheduleId: selectedScheduleId } });
        } else {
            setErrorMessage('Please select a schedule to book.');
        }
    };

    const handleScheduleSelect = (scheduleId) => {
        setSelectedScheduleId(scheduleId);
        setErrorMessage('');
    };

    return (
        <div className="container mt-4">
            <div>
                <h5>Doctor ID: {doctorId}</h5>
            </div>
            <div className="table-responsive">
                <table className="table table-bordered table-striped">
                    <thead className="purple-bg text-center">
                        <tr>
                            <th>Sl. No.</th>
                            <th>Day</th>
                            <th>Timings</th>
                            <th>Status</th>
                            <th>Select</th>
                        </tr>
                    </thead>
                    <tbody>
                        {schedules.map((schedule, index) => (
                            <tr key={schedule.scheduleId}>
                                <td>{index + 1}</td>
                                <td>{schedule.day}</td>
                                <td>{schedule.timings}</td>
                                <td>{schedule.status}</td>
                                <td className="text-center">
                                    <input
                                        type="radio"
                                        name="selectedSchedule"
                                        value={schedule.scheduleId}
                                        onChange={() => handleScheduleSelect(schedule.scheduleId)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="text-center">
                <button className="btn btn-success mt-3" onClick={handleBookNow}>Book Appointment</button>
            </div>
            {errorMessage && (
                <div style={{ marginTop: "20px", color: "red", textAlign: "center" }}>
                    {errorMessage}
                </div>
            )}
        </div>
    );
}
