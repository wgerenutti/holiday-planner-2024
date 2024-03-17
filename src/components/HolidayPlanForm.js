import React, { useState } from 'react';

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

    const inputStyle = {
        width: 'calc(100% - 2px)',
        padding: '8px',
        fontSize: '16px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        boxSizing: 'border-box',
    };

    const errorInputStyle = {
        ...inputStyle,
        borderColor: 'red',
    };

    return (
        <div style={formBoxStyle}>
            <form onSubmit={handleSubmit} style={formStyle}>
                <div style={formGroupStyle}>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        style={formErrors.title ? errorInputStyle : inputStyle}
                    />
                    {formErrors.title && <div style={errorStyle}>{formErrors.title}</div>}
                </div>

                <div style={formGroupStyle}>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        style={formErrors.description ? errorInputStyle : inputStyle}
                    />
                    {formErrors.description && <div style={errorStyle}>{formErrors.description}</div>}
                </div>

                <div style={formGroupStyle}>
                    <label htmlFor="date">Date:</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        style={formErrors.date ? errorInputStyle : inputStyle}
                    />
                    {formErrors.date && <div style={errorStyle}>{formErrors.date}</div>}
                </div>

                <div style={formGroupStyle}>
                    <label htmlFor="location">Location:</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        style={formErrors.location ? errorInputStyle : inputStyle}
                    />
                    {formErrors.location && <div style={errorStyle}>{formErrors.location}</div>}
                </div>

                <div style={formGroupStyle}>
                    <label htmlFor="participants">Participants:</label>
                    <input
                        type="text"
                        id="participants"
                        name="participants"
                        value={formData.participants}
                        onChange={handleChange}
                        style={formErrors.participants ? errorInputStyle : inputStyle}
                    />
                    {formErrors.participants && <div style={errorStyle}>{formErrors.participants}</div>}
                    <small>Separate multiple participants with commas (,)</small>
                </div>

                <button type="submit" style={submitButtonStyle}>
                    Submit
                </button>

                <button type="button" onClick={handleBack} style={backButtonStyle}>
                    Back
                </button>
            </form>
        </div>
    );
};

const formBoxStyle = {
    maxWidth: '420px',
    margin: 'auto',
    padding: '25px',
    borderRadius: '4px',
    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 8px',
};

const formGroupStyle = {
    marginBottom: '15px',
};

const errorStyle = {
    color: 'red',
    fontSize: '14px',
    marginTop: '5px',
};

const formStyle = {
};

const submitButtonStyle = {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px 15px',
    fontSize: '16px',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '10px',
};

const backButtonStyle = {
    backgroundColor: 'red',
    color: 'white',
    padding: '10px 15px',
    fontSize: '16px',
    borderRadius: '4px',
    cursor: 'pointer',
};

export default HolidayPlanForm;
