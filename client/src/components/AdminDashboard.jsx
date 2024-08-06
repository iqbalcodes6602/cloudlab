import React from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import Dashboard from './Dashboard';
import AllServices from './AllServices';
import AllUsers from './AllUsers';

function AdminDashboard({user, setUser, userDetails, setUserDetails}) {

  return (
    <div className='p-10 mt-20'>

      <div>
        <Tabs defaultValue="services" className="w-full">
          <TabsList style={{display:'flex', justifyContent:'space-between', padding:'30px 10px'}} className='mt-10 w-full flex'>
            <div>
              <h2 className="h2 section-title" style={{ marginBottom: '0' }}>
                Welcome to Admin Dashboard
              </h2>
            </div>
            <div>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            </div>
          </TabsList>
          <TabsContent value="users">
            <AllUsers />
          </TabsContent>
          <TabsContent value="services">
            <AllServices />
          </TabsContent>
          <TabsContent value="dashboard">
            <Dashboard user={user} setUser={setUser} userDetails={userDetails} setUserDetails={setUserDetails} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default AdminDashboard;