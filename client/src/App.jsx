// frontend/src/App.js

import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import Landing from './components/Landing';
import Dashboard from './components/Dashboard';
import { Toaster } from './components/ui/toaster';
import AdminDashboard from './components/AdminDashboard';

const App = () => {
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setUser(token);
      // console.log(decodedToken);
      setUserDetails(decodedToken);
    }
  }, []);

  return (
    <div>
      {userDetails?.role === 'user' ? (
        <>
          <header style={{ padding: '20px' }} className="header flex justify-center" data-header="">
            <h3 className="h1 hero-title" style={{ fontSize: '2rem', marginBottom: '0' }}>CloudLab</h3>
          </header>
          <Dashboard user={user} setUser={setUser} userDetails={userDetails} setUserDetails={setUserDetails} />
        </>
      ) : userDetails?.role === 'admin' ? (
        <>
          <header style={{ padding: '20px' }} className="header flex justify-center" data-header="">
            <h3 className="h1 hero-title" style={{ fontSize: '2rem', marginBottom: '0' }}>CloudLab</h3>
          </header>
          <AdminDashboard user={user} setUser={setUser} userDetails={userDetails} setUserDetails={setUserDetails} />
        </>
      ) : (
        <Landing user={user} setUser={setUser} userDetails={userDetails} setUserDetails={setUserDetails} />
      )}
      <Toaster />
    </div>
  );
};

export default App;