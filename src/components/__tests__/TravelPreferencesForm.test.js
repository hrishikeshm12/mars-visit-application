import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TravelPreferencesForm from '../TravelPreferencesForm';

describe('TravelPreferencesForm', () => {
  const initialFormData = {
    departureDate: '',
    returnDate: '',
    accommodation: '',
    specialRequests: ''
  };

  const setFormData = jest.fn();
  const nextStage = jest.fn();
  const prevStage = jest.fn();

  it('displays error messages for empty required fields', () => {
    const { getByText, getByRole } = render(
      <TravelPreferencesForm formData={initialFormData} setFormData={setFormData} nextStage={nextStage} prevStage={prevStage} />
    );

    fireEvent.click(getByRole('button', { name: /next/i }));

    expect(getByText(/Departure Date is required/i)).toBeInTheDocument();
    expect(getByText(/Return Date is required/i)).toBeInTheDocument();
    expect(getByText(/Accommodation Preference is required/i)).toBeInTheDocument();
  });
});
