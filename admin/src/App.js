import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ApplicationForm from './pages/Form.js';
import ReservationManage from './pages/ManageReservation'
import PaymentWorkflow from './components/PaymentDetail/PaymentDetail';
import EventCalendar from './pages/EventCalendar';
import HistoryPage from './pages/History';
import Notification from './pages/Notification';
import SignInPage from './pages/SignIn'
import ManageEvents from './pages/ManageEvents.js';
import MonthlyReservationReport from './components/Report/MonthlyReservationReport.js';
import YearlyReservationReport from './components/Report/YearlyReservationReport.js';
import YearlyEventReservationReport from './components/Report/YearlyEventReservationReport.js';
import Report from './pages/Report.js';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/admin-dashboard" element={<Dashboard />} />
          <Route path="/application-form" element={<ApplicationForm />} />
          <Route path="/manage-reservations" element={<ReservationManage />} />
          <Route path="/payment-detail" element={<PaymentWorkflow />} />
          <Route path="/calendar" element={<EventCalendar />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/manage-events" element={<ManageEvents />} />
          <Route path="/monthly-report" element={<MonthlyReservationReport />} />
          <Route path="/yearly-report" element={<YearlyReservationReport />} />
          <Route path="/event-report" element={<YearlyEventReservationReport />} />
          <Route path="/reports" element={<Report />} />
          <Route path="/notifications" element={<Notification />} />
          <Route path="/login" element={<SignInPage />} />
        </Routes>
      </Router>
  );
}

export default App;
