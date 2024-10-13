import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import PaymentWorkflow from './components/PaymentWorkFlow/PaymentWorkflow'
import Payment from './components/PaymentWorkFlow/Payment'; 
import SignIn from './components/Auth/SignIn'
import SignUp from './components/Auth/SignUp'
import Form from './components/Form/SubmissionForm'     
import Notification from './components/Notification/Notification'  
import AvailabilityCalendar from './components/Calendar/AvailabilityCalendar';  
import Navbar from './components/Nav/Navbar';
import Footer from './components/Footer/Footer';
import TermsAndConditions from './components/T&C/TermsAndConditions';

const stripePromise = loadStripe('pk_test_51NTgKRAaWvD0FBmzmVquePz9uFILsjLUYey7pNiY4zIiKVyuzhYAPMdWg7USuiUujmsRvNUC1H14x666RiZKa53g00xLyoEIOj');

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/cal" element={<AvailabilityCalendar />} />
        <Route path="/form" element={<Form />} />
        <Route path="/payment-dashboard" element={<PaymentWorkflow />} />
        <Route path="/notifications" element={<Notification />} /> 
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/nav" element={<Navbar />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/terms" element={<TermsAndConditions />} />

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
