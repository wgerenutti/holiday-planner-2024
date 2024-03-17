import React, { useState } from 'react';
import styles from './HolidayPlanList.module.css';

const HolidayPlanList = ({ holidayPlans, handleEdit, handleDelete }) => {
    const [showModal, setShowModal] = useState(false);
    const [planToDelete, setPlanToDelete] = useState(null);

    const onDeleteClick = (id) => {
        setPlanToDelete(id);
        setShowModal(true);
    };

    const handleConfirmDelete = () => {
        handleDelete(planToDelete);
        setShowModal(false);
    };

    const handleCancelDelete = () => {
        setPlanToDelete(null);
        setShowModal(false);
    };

    return (
        <div className={styles.containerStyle}>
            {holidayPlans.map((plan) => (
                <div key={plan.id} className={styles.planStyle}>
                    <h3>{plan.title}</h3>
                    <p>{plan.description}</p>
                    <div className={styles.actionContainerStyle}>
                        <button className={styles.editButtonStyle} onClick={() => handleEdit(plan.id)}>Edit</button>
                        <button className={styles.deleteButtonStyle} onClick={() => onDeleteClick(plan.id)}>Delete</button>
                    </div>
                </div>
            ))}
            {showModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <p>Are you sure you want to delete this holiday plan?</p>
                        <div className={styles.modalButtons}>
                            <button className={styles.modalCancelButton} onClick={handleCancelDelete}>Cancel</button>
                            <button className={styles.modalDeleteButton} onClick={handleConfirmDelete}>Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HolidayPlanList;
