import React from 'react';
import styles from './HolidayPlanList.module.css';

const HolidayPlanList = ({ holidayPlans, handleEdit, handleDelete }) => {
    return (
        <div className={styles.containerStyle}>
            {holidayPlans.map((plan) => (
                <div key={plan.id} className={styles.planStyle}>
                    <h3>{plan.title}</h3>
                    <p>{plan.description}</p>
                    <div className={styles.actionContainerStyle}>
                        <button className={styles.editButtonStyle} onClick={() => handleEdit(plan.id)}>Edit</button>
                        <button className={styles.deleteButtonStyle} onClick={() => handleDelete(plan.id)}>Delete</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default HolidayPlanList;
