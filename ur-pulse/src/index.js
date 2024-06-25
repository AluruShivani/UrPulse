import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Card from './HomeComponents/card';
import Navbar from './HomeComponents/navbar';
import Cardbelow from './HomeComponents/cardbelow';
import Doctor from './HomeComponents/Doctor';
import Pharmacy from './HomeComponents/Pharmacy';
import NavbarMenu from './HomeComponents/navbarmenu';
import Adminlogin from './HomeComponents/Adminlogin';
import ViewMedicalHistory from './UserComponents/ViewMedicalHistory';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <NavbarMenu/>
    {/*<Card/>
    <Cardbelow/>
    <Doctor/>
<Pharmacy/>
<Adminlogin/>
<ViewMedicalHistory/>*/}


  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
