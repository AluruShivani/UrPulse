import React from 'react';
import { Link } from 'react-router-dom';

export default function PharmacyMenu() {
  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-end">
       
        <Link className="btn btn-outline-dark" to="/pharmacy/logout">Logout</Link>
      </div>
    </div>
  );
}
