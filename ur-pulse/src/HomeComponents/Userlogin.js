import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStreetView } from '@fortawesome/free-solid-svg-icons';

const LoginForm = ({ loginState, setLoginState }) => {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setMobile(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Sending login request with:', { mobile, password });
      const response = await axios.post('http://localhost:8091/api/v1/userLogin', {
        mobile: mobile,
        password: password,
      });

      console.log('Login response:', response);

      if (response.status === 200 && response.data) {
        sessionStorage.setItem('userId', response.data.userId);

        setLoginState('User');
        navigate('/user/userhome');
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
      <h2 className="user-heading">
        <FontAwesomeIcon icon={faStreetView} className="animated-icon" /><span className="stroke-text">USER</span> <FontAwesomeIcon icon={faStreetView} className="animated-icon" />
      </h2>
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
          <Link to="/user-register">
            <button className="register-button">New Register</button>
          </Link>
        </div>
      </form>
      <style>
        {`
          .login-form-container {
            width: 400px;
            margin: 100px auto;
            padding: 50px;
            border: 3px solid #ccc;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Added box shadow */
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .user-heading {
            margin-bottom: 20px;
            font-size: 24px;
            position: relative;
          }

          .stroke-text {
            -webkit-text-stroke: 1px black;
            color: white;
            font-weight: bold;
            font-size: 2.5rem;
          }

          .animated-icon {
            animation: fallingAnimation 2s linear infinite;
            font-size: 48px; /* Increased icon size */
            stroke: #000; /* Text stroke */
          }

          @keyframes fallingAnimation {
            0% { transform: translateY(-50px); }
            100% { transform: translateY(10px); }
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
            width: 100%;
            display: flex;
            justify-content: space-between;
          }

          button {
            border: none;
            border-radius: 30px;
            padding: 10px 20px;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }

          .login-button {
            background-color: green;
            color: white;
          }

          .register-button {
            background-color: blue;
            color: white;
          }

          button:hover {
            background-color: #555;
          }
        `}
      </style>
    </div>
  );
};

export default LoginForm;
