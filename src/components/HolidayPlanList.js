import React, { useState } from 'react';
import { FaPrint } from 'react-icons/fa';
import styles from './HolidayPlanList.module.css';
import EditHolidayPlan from '../pages/EditHolidayPlan';

const HolidayPlanList = ({ holidayPlans, handleEdit, handleDelete, setHolidayPlans }) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [planToDelete, setPlanToDelete] = useState(null);
    const [planToEdit, setPlanToEdit] = useState(null);

    const onDeleteClick = (id) => {
        setPlanToDelete(id);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = () => {
        handleDelete(planToDelete);
        setShowDeleteModal(false);
    };

    const handleCancelDelete = () => {
        setPlanToDelete(null);
        setShowDeleteModal(false);
    };

    const handleEditClick = (id) => {
        setPlanToEdit(id);
        setShowEditModal(true);
    };    

    const handleCancelEdit = () => {
        setPlanToEdit(null);
        setShowEditModal(false);
    };

    const updateHolidayPlan = (updatedPlan) => {
        const updatedPlans = holidayPlans.map(plan => {
            if (plan.id === updatedPlan.id) {
                return updatedPlan;
            }
            return plan;
        });
        setHolidayPlans(updatedPlans);
    };

    const handlePrint = (plan) => {
        const printContent = `
            <div class="${styles.printContent}">
                <h3>${plan.title}</h3>
                <p><strong>Description:</strong> ${plan.description}</p>
                <p><strong>Date:</strong> ${plan.date}</p>
                <p><strong>Location:</strong> ${plan.location}</p>
                <p><strong>Participants:</strong> ${plan.participants}</p>
            </div>
        `;
        const printWindow = window.open('', '_blank');
        printWindow.document.open();
        printWindow.document.write(`
            <html>
                <head>
                    <title>Holiday Plan Details</title>
                    <style>
                        body { font-family: Arial, sans-serif; }
                        .${styles.printContent} {
                            padding: 20px;
                            border: 1px solid #ccc;
                            border-radius: 5px;
                            margin-bottom: 20px;
                            background-color: #f8f9fa;
                        }
                        h3 { color: #333; margin-bottom: 10px; }
                        p { margin-bottom: 5px; }
                        strong { font-weight: bold; }
                    </style>
                </head>
                <body>
                    ${printContent}
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    };

    const sortedHolidayPlans = holidayPlans.slice().sort((a, b) => a.id - b.id);

    return (
        <div className={styles.containerStyle}>
            {sortedHolidayPlans.map((plan) => (
                <div key={plan.id} className={styles.planStyle}>
                    <h3>{plan.title}</h3>
                    <p>{plan.description}</p>
                    <div className={styles.actionContainerStyle}>
                        <button className={styles.editButtonStyle} onClick={() => handleEditClick(plan.id)}>Edit</button>
                        <button className={styles.printButtonStyle} onClick={() => handlePrint(plan)}><FaPrint /></button>
                        <button className={styles.deleteButtonStyle} onClick={() => onDeleteClick(plan.id)}>Delete</button>
                    </div>
                </div>
            ))}
            {showDeleteModal && (
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
            {showEditModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <EditHolidayPlan planId={planToEdit} onCancel={handleCancelEdit} updateHolidayPlan={updateHolidayPlan} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default HolidayPlanList;
