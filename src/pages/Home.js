import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HolidayPlanList from '../components/HolidayPlanList';
import Pagination from '../components/Pagination';
import { FaSearch } from 'react-icons/fa';
import styles from './Home.module.css';
import supabase from '../config/supabaseClient.js';

const Home = () => {
    const [holidayPlans, setHolidayPlans] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    useEffect(() => {
        const messageFromStorage = localStorage.getItem('holidayPlanMessage');
        if (messageFromStorage) {
            setMessage(messageFromStorage);
            const timer = setTimeout(() => {
                setMessage('');
                setMessageType('');
                localStorage.removeItem('holidayPlanMessage');
                window.location.reload();
            }, 2000);

            return () => clearTimeout(timer);
        }

        const fetchHolidayPlans = async () => {
            try {
                const { data, error } = await supabase
                    .from('holidayplan')
                    .select('*');

                if (error) {
                    console.error('Error', error);
                } else {
                    setHolidayPlans(data);
                }
            } catch (error) {
                console.error('Unexpected error:', error);
            }
        };
        fetchHolidayPlans();
    }, []);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(parseInt(e.target.value, 10));
        setCurrentPage(1);
    };

    const handleEdit = (id) => {
        console.log(`Editing plan id ${id}`);
    };

    const handleDelete = async (id) => {
        try {
            const { error } = await supabase
                .from('holidayplan')
                .delete()
                .eq('id', id);

            if (error) {
                setMessage('Error druging delete holiday plan!');
                setMessageType('error');
            } else {
                setMessage('Sucessfully deleted holiday plan!');
                setMessageType('success');
                const updatedPlans = holidayPlans.filter((plan) => plan.id !== id);
                setHolidayPlans(updatedPlans);
            }
        } catch (error) {
            console.error('Unexpected error:', error);
        }
    };

    const filteredPlans = holidayPlans.filter((plan) =>
        plan.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredPlans.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className={styles.containerStyle}>
            <h2 className={styles.titleStyle}>Explore Holiday Plans</h2>
            {message && <p className={messageType === 'error' ? styles.errorMessage : styles.successMessage}>{message}</p>}
            <div className={styles.searchContainerStyle}>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className={styles.searchStyle}
                />
                <FaSearch className={styles.searchIconStyle} />
            </div>
            <HolidayPlanList
                holidayPlans={currentItems}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
            />
            <div className={styles.buttonsContainer}>
                <Link to="/add" className={styles.addButtonStyle}>
                    Add New Plan
                </Link>
                <div className={styles.itemsPerPageContainer}>
                    <label htmlFor="itemsPerPage" className={styles.itemsPerPageLabel}>Items per page: </label>
                    <select id="itemsPerPage" value={itemsPerPage} onChange={handleItemsPerPageChange} className={styles.itemsPerPageSelect}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                    </select>
                </div>
            </div>
            <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={filteredPlans.length}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default Home;
