import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import HolidayPlanForm from './HolidayPlanForm';

test('renders form with all input fields', () => {
    render(<HolidayPlanForm />);

    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/location/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/participants/i)).toBeInTheDocument();
});

test('submits the form with valid data', () => {
    const handleSubmit = jest.fn();
    render(<HolidayPlanForm onSubmit={handleSubmit} />);

    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'Test Title' } });
    fireEvent.change(screen.getByLabelText(/description/i), { target: { value: 'Test Description' } });
    fireEvent.change(screen.getByLabelText(/date/i), { target: { value: '2024-12-25' } });
    fireEvent.change(screen.getByLabelText(/location/i), { target: { value: 'Test Location' } });
    fireEvent.change(screen.getByLabelText(/participants/i), { target: { value: 'Participant 1, Participant 2' } });

    fireEvent.click(screen.getByText(/submit/i));

    expect(handleSubmit).toHaveBeenCalledWith({
        title: 'Test Title',
        description: 'Test Description',
        date: '2024-12-25',
        location: 'Test Location',
        participants: 'Participant 1, Participant 2'
    });
});

test('displays error messages for required fields', () => {
    render(<HolidayPlanForm />);

    fireEvent.click(screen.getByText(/submit/i));

    expect(screen.getByText(/Title is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Description is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Date is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Location is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Participants are required/i)).toBeInTheDocument();
});
