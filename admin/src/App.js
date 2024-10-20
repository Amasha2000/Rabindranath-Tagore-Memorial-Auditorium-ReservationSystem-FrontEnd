import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ApplicationForm from './components/Form/ApplicationForm';
import ReservationManage from './components/ManageReservation/ManageReservation';
import PaymentWorkflow from './components/PaymentDetail/PaymentDetail';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/admin-dashboard" element={<Dashboard />} />
          <Route path="/application-form" element={<ApplicationForm />} />
          <Route path="/manage-reservation" element={<ReservationManage />} />
          <Route path="/payment-detail" element={<PaymentWorkflow />} />
        </Routes>
      </Router>
  );
}

export default App;
