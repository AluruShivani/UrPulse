import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const AddPrescription = () => {
  const { appointmentId } = useParams();
  const [prescriptions, setPrescriptions] = useState([]);
  const [medicineNames, setMedicineNames] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isVoiceInput, setIsVoiceInput] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const recognitionRef = useRef(null);

  useEffect(() => {
    fetchMedicineNames();
  }, [searchTerm]);

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window)) {
      alert("Your browser does not support voice input.");
    } else {
      recognitionRef.current = new window.webkitSpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';
      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setSearchTerm(transcript);
      };
      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
      };
    }
  }, []);

  const fetchMedicineNames = async () => {
    try {
      const response = await axios.get(`http://localhost:8091/api/v1/getAllMedicines?search=${searchTerm}`);
      setMedicineNames(response.data);
    } catch (error) {
      console.error("Error fetching medicine names:", error);
      setErrorMessage('Failed to fetch medicine names. Please try again.');
    }
  };

  const handleChange = (index, field, value) => {
    const updatedPrescriptions = [...prescriptions];
    updatedPrescriptions[index][field] = value;
    setPrescriptions(updatedPrescriptions);
  };

  const handleTextChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    const suggestions = medicineNames.filter(medicine => 
      medicine.medicineName.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(suggestions.map(medicine => medicine.medicineName));
  };

  const handleSelectSuggestion = (value) => {
    setSearchTerm(value);
    setSuggestions([]);
  };

  const handleDosageChange = (index, option) => {
    const updatedPrescriptions = [...prescriptions];
    const dosageIndex = updatedPrescriptions[index].dosage.indexOf(option);
    if (dosageIndex === -1) {
      updatedPrescriptions[index].dosage.push(option);
    } else {
      updatedPrescriptions[index].dosage.splice(dosageIndex, 1);
    }
    setPrescriptions(updatedPrescriptions);
  };

  const handleAddMedicine = () => {
    setPrescriptions([...prescriptions, { medicineName: "", dosage: [], days: "" }]);
  };

  const handleRemoveMedicine = (index) => {
    const updatedPrescriptions = [...prescriptions];
    updatedPrescriptions.splice(index, 1);
    setPrescriptions(updatedPrescriptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const currentDate = new Date().toISOString().split('T')[0];
      const formattedPrescriptions = prescriptions.map(prescription => ({
        prescriptionDate: currentDate,
        appointmentId: appointmentId,
        prescription: `${prescription.medicineName}(${prescription.dosage.join(', ')}, ${prescription.days})`,
      }));

      const response = await axios.post('http://localhost:8091/api/v1/addPrescriptions', formattedPrescriptions, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log(response.data);
      alert('Prescriptions added successfully!');
    } catch (error) {
      console.error("Prescription submission error:", error);
      setErrorMessage(`Prescription submission failed: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleVoiceInput = (index) => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.start();

    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      handleChange(index, 'medicineName', speechResult);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
    };
  };

  

  return (
    <div className="container-fluid mt-4 custom-container">
      <style>
        {`
          .custom-card {
            border-width: 2px;
            border-style: solid;
            border-color:black;
          }

          .btn-position {
            position: absolute;
            top: 10px;
          }

          .btn-add {
            right: 50px;
          }

          .btn-remove {
            right: 10px;
          }
        `}
      </style>
      <div className="row justify-content-center ">
        <div className="card custom-card" style={{ maxWidth: '800px', position: 'relative' }}>
          <button onClick={handleAddMedicine} className="btn btn-success btn-position btn-add custom-card">+</button>
          <button onClick={() => handleRemoveMedicine(prescriptions.length - 1)} className="btn btn-danger btn-position btn-remove custom-card">-</button>
          <div className="card-body">
            <h2 className="card-title text-center">ADD PRESCRIPTION</h2>
            <form onSubmit={handleSubmit}>
              {prescriptions.map((prescription, index) => (
                <div className="mb-3" key={index}>
                  <label className="form-label "><strong>Medicine Name:</strong></label>
                  {isVoiceInput ? (
                    <div>Listening...</div>
                  ) : (
                    <div>
                      <input
                        className="form-control custom-card"
                        type="text"
                        value={prescription.medicineName}
                        onChange={(e) => handleChange(index, 'medicineName', e.target.value)}
                        onInput={handleTextChange}
                        placeholder="Type medicine name..."
                      />
                      <button type="button" className="mic-button" onClick={() => handleVoiceInput(index)}>
                      🎤
                    </button>
                      <ul className="list-group suggestions-list">
                        {suggestions.map((suggestion, idx) => (
                          <li className="list-group-item" key={idx} onClick={() => handleSelectSuggestion(suggestion)}>{suggestion}</li>
                        ))}
                      </ul>
                    </div>
                  )}<br/>
                   
                  <div className="row">
                    <div className="col">
                      <div className="card custom-card">
                        <div className="card-body">
                          <h5 className="card-title">Morning</h5>
                          <div className="form-check">
                            <input
                              className="form-check-input custom-card"
                              type="checkbox"
                              value="Before breakfast"
                              checked={prescription.dosage.includes('Before breakfast')}
                              onChange={() => handleDosageChange(index, 'Before breakfast')}
                            />
                            <label className="form-check-label">Before breakfast</label>
                          </div>
                          <div className="form-check">
                            <input
                              className="form-check-input custom-card"
                              type="checkbox"
                              value="After breakfast"
                              checked={prescription.dosage.includes('After breakfast')}
                              onChange={() => handleDosageChange(index, 'After breakfast')}
                            />
                            <label className="form-check-label">After breakfast</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col">
                      <div className="card custom-card">
                        <div className="card-body">
                          <h5 className="card-title">Afternoon</h5>
                          <div className="form-check">
                            <input
                              className="form-check-input custom-card"
                              type="checkbox"
                              value="Before meals"
                              checked={prescription.dosage.includes('Before meals')}
                              onChange={() => handleDosageChange(index, 'Before meals')}
                            />
                            <label className="form-check-label">Before meals</label>
                          </div>
                          <div className="form-check ">
                            <input
                              className="form-check-input custom-card"
                              type="checkbox"
                              value="After meals"
                              checked={prescription.dosage.includes('After meals')}
                              onChange={() => handleDosageChange(index, 'After meals')}
                            />
                            <label className="form-check-label">After meals</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col">
                      <div className="card custom-card">
                        <div className="card-body">
                          <h5 className="card-title">Night</h5>
                          <div className="form-check">
                            <input
                              className="form-check-input custom-card"
                              type="checkbox"
                              value="Before dinner"
                              checked={prescription.dosage.includes('Before dinner')}
                              onChange={() => handleDosageChange(index, 'Before dinner')}
                            />
                            <label className="form-check-label">Before dinner</label>
                          </div>
                          <div className="form-check ">
                            <input
                              className="form-check-input custom-card"
                              type="checkbox"
                              value="After dinner"
                              checked={prescription.dosage.includes('After dinner')}
                              onChange={() => handleDosageChange(index, 'After dinner')}
                            />
                            <label className="form-check-label">After dinner</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <label className="form-label mt-3 "><strong>Days:</strong></label>
                  <input
                    className="form-control custom-card"
                    type="number"
                    value={prescription.days}
                    onChange={(e) => handleChange(index, 'days', e.target.value)}
                  />
                 
                </div>
              ))}
              <button type="submit" className="btn btn-primary mt-3 custom-card">Submit</button>
            </form>
            {errorMessage && <div className="error mt-3">{errorMessage}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPrescription;
