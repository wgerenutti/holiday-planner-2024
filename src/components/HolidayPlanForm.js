import React, { useState } from 'react';
import styles from './HolidayPlanForm.module.css';

const HolidayPlanForm = ({ onSubmit, onBack }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        location: '',
        participants: '',
    });

    const [formErrors, setFormErrors] = useState({
        title: '',
        description: '',
        date: '',
        location: '',
        participants: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const validateForm = () => {
        let valid = true;
        const newFormErrors = { ...formErrors };
        
        if (formData.title.trim() === '') {
            newFormErrors.title = 'Title is required';
            valid = false;
        } else {
            newFormErrors.title = '';
        }

        if (formData.description.trim() === '') {
            newFormErrors.description = 'Description is required';
            valid = false;
        } else {
            newFormErrors.description = '';
        }

        if (formData.date.trim() === '') {
            newFormErrors.date = 'Date is required';
            valid = false;
        } else {
            newFormErrors.date = '';
        }

        if (formData.location.trim() === '') {
            newFormErrors.location = 'Location is required';
            valid = false;
        } else {
            newFormErrors.location = '';
        }

        if (formData.participants.trim() === '') {
            newFormErrors.participants = 'Participants are required';
            valid = false;
        } else {
            newFormErrors.participants = '';
        }

        setFormErrors(newFormErrors);
        return valid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            onSubmit(formData);
        }
    };

    const handleBack = () => {
        onBack();
    };

    return (
        <div className={styles.formBox}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className={formErrors.title ? styles.errorInput : styles.inputStyle}
                    />
                    {formErrors.title && <div className={styles.error}>{formErrors.title}</div>}
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className={formErrors.description ? styles.errorInput : styles.inputStyle}
                    />
                    {formErrors.description && <div className={styles.error}>{formErrors.description}</div>}
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="date">Date:</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className={formErrors.date ? styles.errorInput : styles.inputStyle}
                    />
                    {formErrors.date && <div className={styles.error}>{formErrors.date}</div>}
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="location">Location:</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className={formErrors.location ? styles.errorInput : styles.inputStyle}
                    />
                    {formErrors.location && <div className={styles.error}>{formErrors.location}</div>}
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="participants">Participants:</label>
                    <input
                        type="text"
                        id="participants"
                        name="participants"
                        value={formData.participants}
                        onChange={handleChange}
                        className={formErrors.participants ? styles.errorInput : styles.inputStyle}
                    />
                    {formErrors.participants && <div className={styles.error}>{formErrors.participants}</div>}
                    <small>Separate multiple participants with commas (,)</small>
                </div>

                <button type="submit" className={styles.submitButton}>
                    Submit
                </button>

                <button type="button" onClick={handleBack} className={styles.backButton}>
                    Back
                </button>
            </form>
        </div>
    );
};

export default HolidayPlanForm;
