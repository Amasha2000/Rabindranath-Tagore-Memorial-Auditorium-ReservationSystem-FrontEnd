import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AvailabilityCalendar from './components/EventCalendar/Calendar';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/event-calendar" element={<AvailabilityCalendar />} />
        </Routes>
      </Router>
  );
}

export default App;
