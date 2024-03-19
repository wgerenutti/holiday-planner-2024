import React, { useState, useEffect } from 'react';
import supabase from '../config/supabaseClient';
import styles from './EditHolidayPlan.module.css';

const EditHolidayPlan = ({ planId, onCancel }) => {
    const [planData, setPlanData] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchHolidayPlan = async () => {
            try {
                const { data, error } = await supabase
                    .from('holidayplan')
                    .select('*')
                    .eq('id', planId)
                    .single();

                if (error) {
                    console.error('Error fetching holiday plan:', error.message);
                } else {
                    setPlanData(data);
                }
            } catch (error) {
                console.error('Unexpected error:', error.message);
            }
        };

        fetchHolidayPlan();
    }, [planId]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const formData = new FormData(e.target);
            const newPlanData = {};
            formData.forEach((value, key) => {
                newPlanData[key] = value;
            });

            const { error } = await supabase
                .from('holidayplan')
                .update(newPlanData)
                .eq('id', planId);

            if (error) {
                console.error('Error updating holiday plan:', error.message);
                setErrorMessage('Failed to update holiday plan');
            } else {
                localStorage.setItem('holidayPlanMessage', 'Holiday plan updated successfully');
                onCancel();
                window.location.reload();
            }
        } catch (error) {
            console.error('Unexpected error:', error.message);
            setErrorMessage('An unexpected error occurred');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleFormCancel = () => {
        onCancel();
    };

    return (
        <div className={styles.formBox}>
            <h2 className={styles.center}>Edit Holiday Plan</h2>
            <form onSubmit={handleFormSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" name="title" defaultValue={planData?.title} className={styles.inputStyle} />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="description">Description:</label>
                    <textarea id="description" name="description" defaultValue={planData?.description} className={styles.inputStyle}></textarea>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="date">Date:</label>
                    <input type="date" id="date" name="date" defaultValue={planData?.date} className={styles.inputStyle} />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="location">Location:</label>
                    <input type="text" id="location" name="location" defaultValue={planData?.location} className={styles.inputStyle} />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="participants">Participants:</label>
                    <input type="text" id="participants" name="participants" defaultValue={planData?.participants} className={styles.inputStyle} />
                </div>
                <button type="submit" className={styles.submitButton}>Submit</button>
                <button type="button" onClick={handleFormCancel} className={styles.backButton}>Cancel</button>
            </form>
            {errorMessage && <div className={styles.error}>{errorMessage}</div>}
        </div>
    );
};

export default EditHolidayPlan;
