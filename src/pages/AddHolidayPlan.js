import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HolidayPlanForm from '../components/HolidayPlanForm';
import { createClient } from '@supabase/supabase-js';

const AddHolidayPlans = () => {
    const navigate = useNavigate();
    const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
    const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const [message, setMessage] = useState('');

    const handleSubmit = async (formData) => {
        const processedData = {
            ...formData,
        };

        try {
            const { data, error } = await supabase
                .from('holidayplan')
                .insert(processedData);

            if (error) {
                setMessage('Failed to add holiday plan. Please try again.');
            } else {
                setMessage('Holiday plan added successfully!');
            }
        } catch (error) {
            setMessage('An unexpected error occurred. Please try again later.');
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
        <div>
            <div style={titleContainerStyle}>
                <h2>Add holiday plan</h2>
            </div>
            <p>{message}</p>
            <HolidayPlanForm onSubmit={handleSubmit} onBack={handleBack} />
        </div>
    );
};

const titleContainerStyle = {
    maxWidth: '600px',
    margin: 'auto',
    textAlign: 'center',
};

export default AddHolidayPlans;
