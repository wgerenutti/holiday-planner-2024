import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders link with "Add New Plan" text', () => {
  render(<App />);
  const linkElement = screen.getByText(/Add New Plan/i);
  expect(linkElement).toBeInTheDocument();
});
