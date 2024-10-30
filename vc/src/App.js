import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EventCalendar from './pages/EventCalendar';
import SignIn from './pages/SignIn'
import Notifications from './pages/Notification';
import Dashboard from './pages/Dashboard';
import Form from './pages/Form';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import UserProfilePage from './pages/UserProfilePage';
import Report from './pages/Report';
import MonthlyReservationReport from './components/Report/MonthlyReservationReport.js';
import YearlyReservationReport from './components/Report/YearlyReservationReport.js';
import YearlyEventReservationReport from './components/Report/YearlyEventReservationReport.js';

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
          <Route path="/user-profile" element={<UserProfilePage />} />
          <Route path="/reports" element={<Report />} />
          <Route path="/monthly-report" element={<MonthlyReservationReport />} />
          <Route path="/yearly-report" element={<YearlyReservationReport />} />
          <Route path="/event-report" element={<YearlyEventReservationReport />} />
        </Routes>
      </Router>
  );
}

export default App;
