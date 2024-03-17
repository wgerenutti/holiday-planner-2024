import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import HolidayPlanList from '../components/HolidayPlanList';

const Home = () => {
    const [holidayPlans, setHolidayPlans] = useState([]);
    const [message, setMessage] = useState('');
    const location = useLocation();
    useEffect(() => {
        const messageFromStorage = localStorage.getItem('holidayPlanMessage');
        if (messageFromStorage) {
            setMessage(messageFromStorage);
            const timer = setTimeout(() => {
                setMessage('');
                localStorage.removeItem('holidayPlanMessage'); 
            }, 5000);

            return () => clearTimeout(timer);
        }

        const fetchHolidayPlans = async () => {
            try {
                const response = await fetch('https://jcgwdbcdxjcogmgfexok.supabase.co');
                const data = await response.json();

                setHolidayPlans(data);
            } catch (error) {
                console.error('Erro ao buscar planos de férias', error);
            }
        };

        fetchHolidayPlans();
    }, []);

    return (
        <div style={containerStyle}>
            <h2 style={titleStyle}>Explore Holiday Plans</h2>
            {message && <p>{message}</p>}
            <HolidayPlanList holidayPlans={holidayPlans} />
            <Link to="/add" style={{ textDecoration: 'none' }}>
                <button style={addButtonStyle}>Add New Plan</button>
            </Link>
        </div>
    );
};

const containerStyle = {
    maxWidth: '600px',
    margin: 'auto',
    padding: '20px',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    background: '#fff',
};

const titleStyle = {
    color: '#333',
};

const addButtonStyle = {
    margin: '20px 0',
    padding: '10px 20px',
    fontSize: '18px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
};

export default Home;
