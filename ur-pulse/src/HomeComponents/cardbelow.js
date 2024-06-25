import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

export default function CardBelow() {
  return (
    <div>
      <style>
        {`
          .emoji {
            font-size: 60px;
          }
        `}
      </style>
      <div className="container">
        <div className="row justify-content-center">
          <h3 className="card-title text-center mb-3">HOW IT WORKS!!</h3>
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <p className="card-text text-center">
                  <strong>1. Register &#9997;</strong><br />
                  Register yourself with our platform to get started.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <p className="card-text text-center">
                  <strong>2. Book Appointment &#128197;</strong><br />
                  Schedule an appointment with your desired specialist.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-center mt-3">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <p className="card-text text-center">
                  <strong>3. Consult Doctor &#128101;</strong><br />
                  Have a virtual consultation with our experienced doctors.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <p className="card-text text-center">
                  <strong>4. Take Prescription &#128138;</strong><br />
                  Receive your prescription and follow the provided instructions.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-center mt-3">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <p className="card-text text-center">
                  &#129300;What are you waiting for???<strong>Login Now&#128071;</strong><br />
                  <hr />
                  {/* Replace <a> tag with <Link> */}
                  <Link to="/user-login" className="btn btn-success btn-block">Login</Link>
                  <span className="emoji" style={{ fontSize: '60px' }}>&#129321;</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
