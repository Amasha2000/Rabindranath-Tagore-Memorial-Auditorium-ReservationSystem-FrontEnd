import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EventCalendar from './pages/EventCalendar';
import SignIn from './pages/SignIn'
import Notifications from './pages/Notification';
import Dashboard from './pages/Dashboard';
import Form from './pages/Form';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/event-calendar" element={<EventCalendar />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/vc-dashboard" element={<Dashboard />} />
          <Route path="/application-form" element={<Form />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Routes>
      </Router>
  );
}

export default App;
