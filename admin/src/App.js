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
          <Route path="/notifications" element={<Notification />} />
          <Route path="/login" element={<SignInPage />} />
        </Routes>
      </Router>
  );
}

export default App;
