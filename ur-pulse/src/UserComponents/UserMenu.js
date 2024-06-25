import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function UserMenu({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-end align-items-center">
        <div className="d-flex">
          <Link className="btn btn-dark mx-2" to="/user/addmedicalhistory">Add Medical history</Link>
          <Link className="btn btn-dark mx-2" to="/user/addbankaccount">Add BankAccount</Link>
          <Link className="btn btn-dark mx-2" to="/user/viewallDoctors">View Doctors</Link>
        </div>

        <div className="ml-auto">
          <Link className="btn btn-dark mx-2" to="/user/userprofile">Profile</Link>
          <Link className="btn btn-dark mx-2" to="/user/userappointments/:userId">Appointments</Link>
          <Link className="btn btn-dark" to="/user/logout">Logout</Link>
        </div>
      </div>
    </div>
  );
}
