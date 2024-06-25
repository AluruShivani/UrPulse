import React from 'react';
import react2 from '../images/react2.jpg';

export default function Doctor() {
  return (
    <div>
      <style>
        {`
          .doctor-card {
            display: flex;
            align-items: center;
            justify-content: space-around;
            margin-top: 20px;
          }
          
          .doctor-image {
            width: 30vw; /* Make the image width 30% of the viewport width */
            height: auto; /* Automatically adjust height while maintaining aspect ratio */
            border: 2px solid #ccc; /* Add a border with 2px width and gray color */
            border-radius: 40px; /* Add border radius for rounded corners */
            box-shadow: 10px 30px 10px rgba(140, 152, 27, 0.2);
          }
          
          .doctor-description {
            width: 50%; /* Set width of description to 50% of the container */
            text-align: left; /* Align text to the left */
          }
        `}
      </style>
      <div className="doctor-card">
        <img src={react2} alt="Example" className="doctor-image"/>
        <div className="doctor-description">
          <h2>Meet Our Doctors&#129309;</h2>
          <p>At our clinic, we have a team of experienced and dedicated doctors who are committed to providing the highest quality healthcare services to our patients. Our doctors specialize in various fields including general medicine, cardiology, pediatrics, orthopedics, and more.</p>
          <p>We understand that visiting the clinic in person may not always be convenient, especially during these challenging times. That's why we also offer online consultation services, allowing you to consult with our doctors from the comfort of your home. Whether you have a medical concern or need professional advice, our doctors are here to help you.</p>
        </div>
      </div>
    </div>
  );
}
