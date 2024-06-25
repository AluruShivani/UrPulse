// Card.jsx

import React from 'react';
import react3 from '../images/react3.jpg';
import image1 from '../images/image1.jpg'; // Import the second image
import styles from '../card.module.css'; // Adjust the import statement to match the filename

export default function Card() {
  return (
    <div className={styles.card}>
      <img src={react3} alt="Example" className={styles["full-screen-image"]} />
      <img src={image1} alt="Example" className={styles["second-image"]} /> {/* Add the second image */}
    </div>
  );
}
