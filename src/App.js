import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AddHolidayPlan from './pages/AddHolidayPlan';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddHolidayPlan />} />
      </Routes>
    </Router>
  );
};

export default App;