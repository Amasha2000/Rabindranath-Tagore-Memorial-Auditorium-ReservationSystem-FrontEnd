import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EventCalendar from './pages/EventCalendar';
import SignIn from './pages/SignIn'
import Notifications from './pages/Notification';
import Dashboard from './pages/Dashboard';
import Form from './pages/Form';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/event-calendar" element={<EventCalendar />} />
          <Route path="/vc-login" element={<SignIn />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/vc-dashboard" element={<Dashboard />} />
          <Route path="/application-form" element={<Form />} />
        </Routes>
      </Router>
  );
}

export default App;
