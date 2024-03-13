import React from 'react';
import HolidayPlanForm from '../components/HolidayPlanForm';

const AddHolidayPlan = () => {
    const handleSubmit = (data) => {
    };

    return (
        <div>
            <h2>Add Holiday Plan</h2>
            <HolidayPlanForm onSubmit={handleSubmit} />
        </div>
    );
};

export default AddHolidayPlan;
