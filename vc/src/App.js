import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AvailabilityCalendar from './components/EventCalendar/Calendar';
import SignIn from './components/Auth/SignIn';
import Notifications from './pages/Notification';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/event-calendar" element={<AvailabilityCalendar />} />
          <Route path="/vc-login" element={<SignIn />} />
          <Route path="/notification" element={<Notifications />} />
        </Routes>
      </Router>
  );
}

export default App;
