import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Logout({ loginState, setLoginState }) {
  const navigate = useNavigate();

  useEffect(() => {
    // Update login state after component has been rendered
    setLoginState(false);
    // Navigate to the home page
    navigate('/');
  }, [setLoginState, navigate]);

  // This component doesn't render anything, so you can remove the empty div
  return null;
}