import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ApplicationForm from './components/Form/ApplicationForm';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/application-form" element={<ApplicationForm />} />
        </Routes>
      </Router>
  );
}

export default App;
