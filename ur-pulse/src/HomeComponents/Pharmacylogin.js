import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const LoginForm = ({ loginState, setLoginState }) => {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Use useNavigate hook to get the navigate function

  const handleUsernameChange = (e) => {
    setMobile(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8091/api/v1/pharmacyLogin', {
        mobile: mobile,
        password: password
      });

      if (response.data) { // Check if response.data exists
        sessionStorage.setItem('pharmacyId', response.data.pharmacyId); // Corrected storage setting
        setLoginState("Pharmacy");
        navigate('/pharmacy/pharmacyhome'); // Use navigate function to navigate to admin home
        alert('Login successful');
      } else {
        alert('Incorrect username or password. Please try again.');
      }
    } catch (error) {
      console.error('Login validation error:', error);
      alert('An error occurred while logging in. Please try again.');
    }
  };
  
  return (
    <div className="login-form-container">
      <h2>Pharmacy</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="mobile">Mobile:</label>
          <input
            type="text"
            id="mobile"
            name="mobile"
            value={mobile}
            onChange={handleUsernameChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div className="button-group">
          <button type="submit" className="login-button">Login</button>
          <Link to="/pharmacy-register">
            <button className="register-button">New Register</button>
          </Link>
        </div>
      </form>
      <style>
  {`
    .login-form-container {
      width: 400px;
      margin: 100px auto; /* Adjust margin to decrease the height from the top */
      padding: 50px;
      border: 3px solid #ccc;
      border-radius: 5px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    
    .login-form-container h2 {
      margin-bottom: 20px;
    }
    
    .form-group {
      margin-bottom: 20px;
      width: 100%;
    }
    
    .form-group label {
      margin-bottom: 5px;
    }
    
    .form-group input {
      width: 100%;
      padding: 15px;
      border: 1px solid #ccc;
      border-radius: 3px;
    }
    
    .button-group {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }

    button[type="submit"] {
      background-color: green; /* Set login button color to green */
      color: #fff;
      border: none;
      border-radius: 30px;
      padding: 10px 20px;
      cursor: pointer;
    }
    
    .register-button {
      background-color: #007bff; /* Set register button color to blue */
      color: #fff;
      border: none;
      border-radius: 30px;
      padding: 10px 20px;
      cursor: pointer;
    }
    
    button[type="submit"]:hover {
      background-color: darkgreen; /* Darken login button color on hover */
    }
    
    .register-button:hover {
      background-color: #0056b3; /* Darken register button color on hover */
    }
  `}
</style>
    </div>
  );
}

export default LoginForm;
