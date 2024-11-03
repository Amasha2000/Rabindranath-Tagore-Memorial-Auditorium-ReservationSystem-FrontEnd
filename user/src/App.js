import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';


import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import BookingOverview from './pages/BookingOverview';
import CheckAvailability from './pages/CheckAvailability';
import Terms from './pages/Terms';
import ApplicationForm from './pages/ApplicationForm';
import PaymentWorkflow from './pages/PaymentWorkflow';
import Notifications from './pages/Notifications';
import Payment from './components/PaymentWorkFlow/Payment';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import UserProfilePage from './pages/UserProfilePage';
import HomePage from './pages/HomePage';

const stripePromise = loadStripe('pk_test_51NTgKRAaWvD0FBmzmVquePz9uFILsjLUYey7pNiY4zIiKVyuzhYAPMdWg7USuiUujmsRvNUC1H14x666RiZKa53g00xLyoEIOj');

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/booking-overview" element={<BookingOverview />} />
        <Route path="/availability" element={<CheckAvailability />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/form" element={<ApplicationForm />} /> 
        <Route path="/payment" element={<PaymentWorkflow />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/user-profile" element={<UserProfilePage />} />
        <Route path="/" element={<HomePage />} />

        <Route
          path="/payment/:reservationId/:amount/:paymentType"
          element={
            <Elements stripe={stripePromise}>
              <Payment />
            </Elements>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
