import React, { useState, useEffect } from 'react';
import axios from 'axios';

const statusMap = {
    true: 'Active',
    false: 'Inactive'
};

const EditScheduleModal = ({ schedule, onSave, onCancel, editFormData, onFormChange }) => {
    return (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit Schedule</h5>
                        <button type="button" className="close" onClick={onCancel}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form onSubmit={onSave}>
                        <div className="modal-body">
                            <div className="form-group">
                                <label>Day:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="day"
                                    value={editFormData.day}
                                    onChange={onFormChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Timings:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="timings"
                                    value={editFormData.timings}
                                    onChange={onFormChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Status:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="status"
                                    value={editFormData.status}
                                    onChange={onFormChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
                            <button type="submit" className="btn btn-primary">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

const ViewSchedule = () => {
    const [doctorId, setDoctorId] = useState('');
    const [schedules, setSchedules] = useState([]);
    const [editScheduleId, setEditScheduleId] = useState(null);
    const [editFormData, setEditFormData] = useState({
        day: '',
        timings: '',
        status: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [showModal, setShowModal] = useState(false); // State to control modal visibility

    useEffect(() => {
        const doctorId = sessionStorage.getItem('doctorId');
        if (doctorId) {
            setDoctorId(doctorId);
            fetchSchedulesByDoctorId(doctorId);
        }
    }, []);

    const fetchSchedulesByDoctorId = async (doctorId) => {
        try {
            const response = await axios.get(`http://localhost:8091/api/v1/doctor/${doctorId}/schedule`);
            setSchedules(response.data);
        } catch (error) {
            console.error('Error fetching schedules:', error);
            setErrorMessage('Failed to fetch schedules. Please try again.');
        }
    };

    const deleteSchedule = async (scheduleId) => {
        try {
            const response = await axios.delete(`http://localhost:8091/api/v1/deleteSchedule/${scheduleId}`);
            if (response.status === 200) {
                setSchedules(schedules.filter(schedule => schedule.scheduleId !== scheduleId));
            }
        } catch (error) {
            console.error('Error deleting schedule:', error);
            setErrorMessage('Failed to delete schedule. Please try again.');
        }
    };

    const handleEditClick = (schedule) => {
        setEditScheduleId(schedule.scheduleId);
        setEditFormData({
            day: schedule.day,
            timings: schedule.timings,
            status: schedule.status ? 'Active' : 'Inactive' // Mapping boolean to status string
        });
        setShowModal(true); // Show the modal when edit is clicked
    };

    const handleEditFormChange = (event) => {
        const { name, value } = event.target;
        setEditFormData({
            ...editFormData,
            [name]: value
        });
    };

    const handleEditFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put(`http://localhost:8091/api/v1/updateSchedule/${editScheduleId}`, editFormData);
            if (response.status === 200) {
                setSchedules(schedules.map(schedule =>
                    schedule.scheduleId === editScheduleId ? { ...schedule, ...editFormData } : schedule
                ));
                setEditScheduleId(null);
                setEditFormData({ day: '', timings: '', status: '' });
                setShowModal(false); // Close the modal after saving
            }
        } catch (error) {
            console.error('Error updating schedule:', error);
            setErrorMessage('Failed to update schedule. Please try again.');
        }
    };

    const handleCancelEdit = () => {
        setEditScheduleId(null);
        setEditFormData({
            day: '',
            timings: '',
            status: ''
        });
        setShowModal(false); // Close the modal on cancel
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
                            <th>Delete</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {schedules.map((schedule, index) => (
                            <tr key={schedule.scheduleId}>
                                <td>{index + 1}</td>
                                <td>{schedule.day}</td>
                                <td>{schedule.timings}</td>
                                <td>{schedule.status ? 'Active' : 'Inactive'}</td> {/* Display mapped status */}
                                <td className="text-center">
                                    <button className="btn btn-danger" onClick={() => deleteSchedule(schedule.scheduleId)}>Delete</button>
                                </td>
                                <td className="text-center">
                                    <button className="btn btn-success" onClick={() => handleEditClick(schedule)}>Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {showModal && (
                <EditScheduleModal
                    schedule={schedules.find(schedule => schedule.scheduleId === editScheduleId)}
                    onSave={handleEditFormSubmit}
                    onCancel={handleCancelEdit}
                    editFormData={editFormData}
                    onFormChange={handleEditFormChange}
                />
            )}
            {errorMessage && (
                <div style={{ marginBottom: "20px", color: "red", textAlign: "center" }}>
                    {errorMessage}
                </div>
            )}
        </div>
    );
};

export default ViewSchedule;
