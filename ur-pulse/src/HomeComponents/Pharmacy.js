import React from 'react';
import react9 from '../images/react9.jpg';

export default function Doctor() {
  return (
    <div>
      <style>
        {`
          .pharmacy-card {
            display: flex;
            align-items: center;
            justify-content: space-around;
            margin-top: 20px;
          }
          
          .pharmacy-image {
            width: 30vw; /* Make the image width 30% of the viewport width */
            height: auto; /* Automatically adjust height while maintaining aspect ratio */
            border: 2px solid #ccc; /* Add a border with 2px width and gray color */
            border-radius: 40px; /* Add border radius for rounded corners */
            box-shadow: 10px 30px 10px rgba(140, 152, 27, 0.2);
          }
          
          .pharmacy-description {
            width: 50%; /* Set width of description to 50% of the container */
            text-align: left; /* Align text to the left */
          }
        `}
      </style>
      <div className="pharmacy-card">
        <div className="pharmacy-description">
          <h2>We Also Provide Pharmacy Facilities&#128138;&#128137;</h2>
          <p>We also offer a comprehensive range of pharmacy services to meet your healthcare needs. Our pharmacy is well-stocked with a wide variety of medications, supplements, and healthcare products.</p>
          <p>Our experienced pharmacists are available to provide you with expert advice and guidance on medication usage, potential side effects, and drug interactions. Whether you need to refill a prescription or purchase over-the-counter medications, our pharmacy team is here to assist you.</p>
        </div>
        <img src={react9} alt="Example" className="pharmacy-image"/>
      </div>
    </div>
  );
}
