import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HolidayPlanForm from '../components/HolidayPlanForm';
import supabase from '../config/supabaseClient.js'; 
import './AddHolidayPlans.module.css'

const AddHolidayPlans = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState('');

    const SUCCESS_MESSAGE = 'Holiday plan added successfully!';
    const ERROR_MESSAGES = {
        DEFAULT: 'Failed to add holiday plan. Please try again.',
        UNEXPECTED: 'An unexpected error occurred. Please try again later.',
    };

    const handleSubmit = async (formData) => {
        const processedData = {
            ...formData,
        };

        try {
            const { error } = await supabase
                .from('holidayplan')
                .insert(processedData);

            if (error) {
                setMessage(ERROR_MESSAGES.DEFAULT);
            } else {
                setMessage(SUCCESS_MESSAGE);
            }
        } catch (error) {
            setMessage(ERROR_MESSAGES.UNEXPECTED);
        }
    };

    useEffect(() => {
        if (message) {
            navigate('/', { state: { message: message } });
        }
    }, [message, navigate]);

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="container">
            <div className="title-container">
                <h2>Add holiday plan</h2>
            </div>
            <p>{message}</p>
            <HolidayPlanForm onSubmit={handleSubmit} onBack={handleBack} />
        </div>
    );
};

export default AddHolidayPlans;
