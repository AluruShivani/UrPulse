import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserMd } from '@fortawesome/free-solid-svg-icons';

const LoginForm = ({ setLoginState }) => {
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
      const response = await axios.post('http://localhost:8091/api/v1/doctorLogin', {
        mobile: mobile,
        password: password
      });

      if (response.status === 200) {
        sessionStorage.setItem('doctorId', response.data.doctorId);
        setLoginState('Doctor');
        navigate('/doctor/doctorhome');
        alert('Login successful');
      } else {
        alert('Incorrect username or password. Please try again.');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert('Incorrect username or password. Please try again.');
      } else {
        console.error('Login validation error:', error);
        alert('An error occurred while logging in. Please try again.');
      }
    }
  };

  return (
    <div className="login-form-container">
      <h2 className="falling-icons-header">
        <FontAwesomeIcon icon={faUserMd} className="falling-icon left-icon" />
        <span className="stroke-text">DOCTOR</span>
        <FontAwesomeIcon icon={faUserMd} className="falling-icon right-icon" />
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
          <Link to="/doctor-register">
            <button type="button" className="register-button">New Register</button>
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
            box-shadow: 0 0 20px rgba(0, 0, 255, 0.5);
            display: flex;
            flex-direction: column;
            align-items: center;
            background: url('${process.env.PUBLIC_URL}/images/react10.jpg') no-repeat center center/cover;
            backdrop-filter: blur(10px);
            background-blend-mode: lighten;
          }

          .falling-icons-header {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 20px;
          }

          .falling-icons-header .falling-icon {
            animation: fall 2s ease-in-out infinite;
            font-size: 2.5rem;
            margin: 0 10px;
          }

          .falling-icons-header .left-icon {
            margin-right: 10px;
          }

          .falling-icons-header .right-icon {
            margin-left: 10px;
          }

          .stroke-text {
            -webkit-text-stroke: 1px black;
            color: white;
            font-weight: bold;
            font-size: 2.5rem;
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
            width: 100%;
          }

          .login-button, .register-button {
            border: none;
            border-radius: 30px;
            padding: 10px 20px;
            cursor: pointer;
          }

          .login-button {
            background-color: green;
            color: #fff;
          }

          .register-button {
            background-color: #007bff;
            color: #fff;
          }

          .register-button:hover {
            background-color: blue;
          }

          @keyframes fall {
            0% {
              transform: translateY(-100%);
              opacity: 0;
            }
            50% {
              opacity: 1;
            }
            100% {
              transform: translateY(0);
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
};

export default LoginForm;
