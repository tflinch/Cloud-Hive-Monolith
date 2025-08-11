import React from 'react';
import Hives from './Hives';

function Dashboard() {
  return (
    <main className='main__dashboard'>
      <h1>Dashboard</h1>
      <p>Welcome to the dashboard!</p>
      {/* Add more dashboard content here */}
      {/* For example, you can add charts, tables, or other components */}
      <p>This is where you can manage your application.</p>
      {/* You can also add links to other pages or features */}
      <Hives />
    </main>
  );
}

export default Dashboard;
