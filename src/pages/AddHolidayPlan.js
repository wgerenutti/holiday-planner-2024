import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HolidayPlanForm from '../components/HolidayPlanForm';
import supabase from '../config/supabaseClient.js'; 
import styles from './AddHolidayPlans.module.css';

const AddHolidayPlans = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);

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
                setSubmitted(true); 
            }
        } catch (error) {
            setMessage(ERROR_MESSAGES.UNEXPECTED);
        }
    };

    useEffect(() => {
        if (submitted) {
            const timer = setTimeout(() => {
                navigate('/', { state: { message: message } });
            }, 3000); 

            return () => clearTimeout(timer); 
        }
    }, [submitted, message, navigate]);

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className={styles.containerStyle}>
            <div className={styles.titleContainer}>
                <h2 className={styles.titleStyle}>Add holiday plan</h2>
            </div>
            {message && (
                <p className={message.includes('successfully') ? styles.successMessage : styles.errorMessage}>
                    {message}
                </p>
            )}
            <HolidayPlanForm onSubmit={handleSubmit} onBack={handleBack} />
        </div>
    );    
};

export default AddHolidayPlans;
