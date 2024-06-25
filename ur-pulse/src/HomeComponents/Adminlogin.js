import React, { useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom'; // Import Navigate and useNavigate

const LoginForm = ({ loginState, setLoginState }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Use useNavigate hook to get the navigate function

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8091/api/v1/adminLogin', {
        userName: username,
        password: password
      });

      if (response.data === true) {
        setLoginState("Admin");
        navigate('/admin/adminhome'); // Use navigate function to navigate to admin home
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
      <h2>Admin</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
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
        <button type="submit">Login</button>
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
          
          button[type="submit"] {
            background-color: #007bff;
            color: #fff;
            border: none;
            border-radius: 30px;
            padding: 10px 20px;
            cursor: pointer;
          }
          
          button[type="submit"]:hover {
            background-color: green;
          }
        `}
      </style>
    </div>
  );
}

export default LoginForm;
