import { useState, useEffect, createContext } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import './App.scss';
import Dashboard from './Component/Pages/Dashboard';
import Navbar from './Component/Navbar/Navbar';
import Sidebar from './Component/Sidebar/Sidebar';
import Footer from './Component/Footer/Footer';

function App() {
  return (
    <BrowserRouter>
      <div className='app'>
        <Navbar />
        <Sidebar />
        <Routes>
          <Route path='/' element={<Dashboard />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
