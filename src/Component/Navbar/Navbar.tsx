import React from 'react';

function Navbar() {
  return (
    <div className='navbar'>
      <nav
        className='navbar__container'
        style={{
          padding: '10px',
          backgroundColor: '#282c34',
          color: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}
      >
        <h1>My Application</h1>
        <ul>
          <li>
            <a href='/'>Dashboard</a>
          </li>
          {/* Add more navigation items here */}
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
