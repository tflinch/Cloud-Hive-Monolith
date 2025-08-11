import React from 'react';

function Sidebar() {
  return (
    <div className='sidebar'>
      <h2>Sidebar</h2>
      <ul>
        <li>
          <a href='/'>Home</a>
        </li>
        <li>
          <a href='/dashboard'>Dashboard</a>
        </li>
        {/* Add more sidebar items here */}
        <li>
          <a href='/settings'>Settings</a>
        </li>
        <li>
          <a href='/profile'>Profile</a>
        </li>
        <li>
          <a href='/help'>Help</a>
        </li>
        <li>
          <a href='/logout'>Logout</a>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
