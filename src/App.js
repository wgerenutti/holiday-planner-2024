import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AddHolidayPlan from './pages/AddHolidayPlan';
import EditHolidayPlan from './pages/EditHolidayPlan';
import HolidayPlanList from './components/HolidayPlanList';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddHolidayPlan />} />
        <Route path="/edit/:id" element={<EditHolidayPlan />} />
        <Route path="/list" element={<HolidayPlanList />} /> 
      </Routes>
    </Router>
  );
};

export default App;