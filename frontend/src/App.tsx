// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';
import PublicOnlyRoute from './routes/PublicOnlyRoute';

import Navbar from './Component/Navbar/Navbar';
import Dashboard from './Component/Pages/Dashboard';
import Hives from './Component/Pages/Hives';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './App.scss';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className='app'>
          <Navbar />
          <Routes>
            {/* Public-only routes */}
            <Route element={<PublicOnlyRoute />}>
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
            </Route>

            {/* Protected app routes */}
            <Route element={<ProtectedRoute />}>
              <Route index element={<Dashboard />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/hives' element={<Hives />} />
            </Route>

            {/* Catch-all */}
            <Route path='*' element={<Navigate to='/' replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
