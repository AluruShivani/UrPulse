import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import AdminMenu from '../AdminComponents/AdminMenu';
import AdminHome from '../AdminComponents/AdminHome';
import Navbar from './navbar';
import AdminLogin from './Adminlogin';
import DoctorLogin from './Doctorlogin';
import UserHome from '../UserComponents/UserHome';
import UserMenu from '../UserComponents/UserMenu';
import DoctorMenu from '../DoctorComponents/DoctorMenu';
import DoctorHome from '../DoctorComponents/DoctorHome';
import UserLogin from './Userlogin';
import PharmacyLogout from '../PharmacyComponents/logout';
import DoctorLogout from '../DoctorComponents/logout';
import UserLogout from '../UserComponents/logout';
import AdminLogout from '../AdminComponents/logout';
import PharmacyMenu from '../PharmacyComponents/PharmacyMenu';
import PharmacyLogin from './Pharmacylogin';
import PharmacyHome from '../PharmacyComponents/PharmacyHome';
import DoctorRegister from '../DoctorComponents/DoctorRegistration';
import PharmacyRegister from '../PharmacyComponents/PharmacyRegister';
import UserRegister from '../UserComponents/UserRegister';
import ViewDoctors from '../AdminComponents/ViewDoctors';
import ViewUsers from '../AdminComponents/ViewUsers';
import ViewPharmacies from '../AdminComponents/ViewPharmacies';

import AddSchedule from '../DoctorComponents/AddSchedule';
import DoctorViewAppointments from '../DoctorComponents/doctorViewAppointments';
import DoctorProfile from '../DoctorComponents/DoctorProfile';
import ViewSchedule from '../DoctorComponents/ViewSchedule';
import UserProfile from '../UserComponents/UserProfile';
import AddMedicalHistory from '../UserComponents/AddMedicalHistory';
import ViewMedicalHistory from '../UserComponents/ViewMedicalHistory';
import AddBankAccount from '../UserComponents/AddBankAccount';
import ViewDoctorSchedule from '../UserComponents/ViewDoctorSchedule';
import ViewAllDoctors from '../UserComponents/ViewAllDoctors';
import PaymentPage from '../UserComponents/PaymentsPage';
import AddPrescription from '../DoctorComponents/AddPrescription';
import UserAppointments from '../UserComponents/UserAppoitments';
import PharmacyProfile from '../PharmacyComponents/PharmacyProfile';

export default function MainMenu() {
  const [loginState, setLoginState] = useState("");

  return (
    <BrowserRouter>
      <main>
        {loginState === "Admin" ? <AdminHome /> : 
          loginState === "Doctor" ? <DoctorHome /> : 
          loginState === "User" ? <UserHome /> : 
          loginState === "Pharmacy" ? <PharmacyHome /> : 
          <Navbar />
        }
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/Adminlogin' element={<AdminLogin setLoginState={setLoginState} />} />
          <Route path='/Doctorlogin' element={<DoctorLogin setLoginState={setLoginState} />} />
          <Route path='/user-login' element={<UserLogin setLoginState={setLoginState} />} />
          <Route path='/Pharmacylogin' element={<PharmacyLogin setLoginState={setLoginState} />} />

          {loginState === "Admin" && (
            <>
              <Route path="/admin/adminmenu" element={<AdminMenu />} />
              <Route path='/admin/viewdoctors' element={<ViewDoctors />} />
              <Route path='/admin/viewusers' element={<ViewUsers />} />
              <Route path='/admin/viewPharmacies' element={<ViewPharmacies />} />
              
              <Route path='/admin/logout' element={<AdminLogout loginState={loginState} setLoginState={setLoginState} />} />
            </>
          )}

          {loginState === "Doctor" && (
            <>
              <Route path="/addPrescription/:appointmentId" element={<AddPrescription />} />
              <Route path="/doctor/doctormenu" element={<DoctorMenu />} />
              <Route path="/doctor/doctorschedule" element={<AddSchedule />} />
              <Route path="/appointments/:doctorId" element={<DoctorViewAppointments />} />
              <Route path="/doctor/viewschedule" element={<ViewSchedule />} />
              <Route path="/doctor/profile" element={<DoctorProfile />} />
              <Route path="/UserComponents/ViewMedicalHistory/:userId" element={<ViewMedicalHistory />} />
              <Route path='/doctor/logout' element={<DoctorLogout loginState={loginState} setLoginState={setLoginState} />} />
            </>
          )}

          {loginState === "Pharmacy" && (
            <>
              <Route path="/pharmacy/pharmacymenu" element={<PharmacyMenu />} />
              <Route path="/pharmacy/profile" element={<PharmacyProfile />} /> 
              <Route path='/pharmacy/logout' element={<PharmacyLogout loginState={loginState} setLoginState={setLoginState} />} />
            </>
          )}

          {loginState === "User" && (
            <>
              <Route path="/user/usermenu" element={<UserMenu />} />
              <Route path="/user/payment" element={<PaymentPage />} />
              <Route path="/user/userprofile" element={<UserProfile />} />
              <Route path="/user/userappointments/:userId" element={<UserAppointments />} />
              <Route path="/user/addmedicalhistory" element={<AddMedicalHistory />} />
              <Route path="/user/addbankaccount" element={<AddBankAccount />} />
              <Route path="/user/viewalldoctors" element={<ViewAllDoctors />} />
              <Route path="/user/ViewDoctorSchedule/:doctorId" element={<ViewDoctorSchedule />} />
              <Route path='/user/logout' element={<UserLogout loginState={loginState} setLoginState={setLoginState} />} />
            </>
          )}

          <Route path='/doctor-register' element={<DoctorRegister setLoginState={setLoginState} />} />
          <Route path='/pharmacy-register' element={<PharmacyRegister setLoginState={setLoginState} />} />
          <Route path='/user-register' element={<UserRegister setLoginState={setLoginState} />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
