import React, { useState } from 'react';
import axios from 'axios';

export default function AddBankAccount() {
    const [formData, setFormData] = useState({
        accNo: '',
        balAmount: '',
        cardNo: '',
        cardType: '',
        name: '',
        cvvNo: '',
        expiryDate: '',
    });

    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userId = sessionStorage.getItem('userId'); // Retrieve userId from session
            const dataWithUserId = { ...formData, userId }; // Include userId in form data
            const response = await axios.post('http://localhost:8091/api/v1/addBankaccount', dataWithUserId);
    
            if (response.status === 200) {
                setSuccessMessage('Bank account added successfully!');
                setTimeout(() => {
                    setSuccessMessage('');
                }, 3000);
            } else {
                console.error('Error adding bank account:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding bank account:', error.message);
        }
    };
    
    return (
        
        <div className="container mt-5">
             <h1 className="card-title text-center mb-4"><b>BANK ACCOUNT FORM</b></h1>
            {successMessage && (
                <div className="alert alert-success" role="alert">
                    {successMessage}
                </div>
            )}
           
            <div className="card mx-auto" style={{ maxWidth: '800px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="accNo" className="form-label"><b>Account Number</b></label>
                            <input
                                type="text"
                                className="form-control"
                                id="accNo"
                                name="accNo"
                                value={formData.accNo}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="balAmount" className="form-label"><b>Balance Amount</b></label>
                            <input
                                type="number"
                                className="form-control"
                                id="balAmount"
                                name="balAmount"
                                value={formData.balAmount}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="cardNo" className="form-label"><b>Card Number</b></label>
                            <input
                                type="text"
                                className="form-control"
                                id="cardNo"
                                name="cardNo"
                                value={formData.cardNo}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="cardType" className="form-label"><b>Card Type</b></label>
                            <input
                                type="text"
                                className="form-control"
                                id="cardType"
                                name="cardType"
                                value={formData.cardType}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label"><b>Name</b></label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="cvvNo" className="form-label"><b>CVV Number</b></label>
                            <input
                                type="number"
                                className="form-control"
                                id="cvvNo"
                                name="cvvNo"
                                value={formData.cvvNo}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="expiryDate" className="form-label"><b>Expiry Date</b></label>
                            <input
                                type="text"
                                className="form-control"
                                id="expiryDate"
                                name="expiryDate"
                                value={formData.expiryDate}
                                onChange={handleChange}
                                required
                                placeholder="MM/YY"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">Add Account</button>
                    </form>
                </div>
            </div>
            <style>
                {`
                .container {
                    background-color: #cb9ff5;
                }
                `}
            </style>
        </div>
    );
}
