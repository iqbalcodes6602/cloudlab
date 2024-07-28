// frontend/src/App.js

import React, { useState, useEffect } from 'react';
import Landing from './components/Landing';
import Dashboard from './components/Dashboard';
import { Toaster } from './components/ui/toaster';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setUser(token)
  }, [])

  return (
    <div>
        {user ? (
          <Dashboard user={user} setUser={setUser} />
        ) : (
          <Landing user={user} setUser={setUser} />
        )}
        <Toaster />
    </div>
  );
};

export default App;
