import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Worker, Viewer, pdfjs } from '@react-pdf-viewer/core';

const HolidayPlansDisplay = () => {
    const [holidayPlans, setHolidayPlans] = useState([]);
    const [selectedPlan, setSelectedPlan] = useState(null);

    useEffect(() => {
        const fetchHolidayPlans = async () => {
            try {
                const response = await fetch('https://api.example.com/holiday-plans');
                const data = await response.json();

                setHolidayPlans(data);
            } catch (error) {
                console.error('Erro ao buscar planos de férias', error);
            }
        };

        fetchHolidayPlans();
    }, []);

    const handleGeneratePDF = () => {
        setSelectedPlan(holidayPlans[0]);
    };

    return (
        <div>
            <h2>All Holiday Plans</h2>
            {holidayPlans.length === 0 ? (
                <p>No holiday plans available.</p>
            ) : (
                <ul>
                    {holidayPlans.map((plan) => (
                        <li key={plan.id}>
                            <h3>{plan.title}</h3>
                            <p>{plan.description}</p>
                            <p>Date: {plan.date}</p>
                            <p>Location: {plan.location}</p>
                            {plan.participants && (
                                <p>Participants: {plan.participants.join(', ')}</p>
                            )}
                            <Link to={`/edit/${plan.id}`}>Edit</Link>
                            <button onClick={handleGeneratePDF}>Generate PDF</button>
                        </li>
                    ))}
                </ul>
            )}
            {selectedPlan && (
                <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`}>
                    <Viewer fileUrl={selectedPlan.pdfUrl} />
                </Worker>
            )}
        </div>
    );
};

export default HolidayPlansDisplay;
