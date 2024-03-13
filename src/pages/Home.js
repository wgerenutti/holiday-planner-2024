import React from 'react';
import HolidayPlanList from '../components/HolidayPlanList';

const Home = () => {
    const holidayPlans = [];

    return (
        <div>
            <HolidayPlanList holidayPlans={holidayPlans} />
        </div>
    );
};

export default Home;
