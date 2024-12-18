import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import HealthSafetyForm from '../HealthSafetyForm';

describe('HealthSafetyForm', () => {
  const initialFormData = {
    healthDeclaration: '',
    emergencyContact: '',
    medicalConditions: ''
  };

  const setFormData = jest.fn();
  const handleSubmit = jest.fn();
  const prevStage = jest.fn();

  it('displays error messages for empty required fields', () => {
    const { getByText, getByRole } = render(
      <HealthSafetyForm formData={initialFormData} setFormData={setFormData} handleSubmit={handleSubmit} prevStage={prevStage} />
    );

    fireEvent.click(getByRole('button', { name: /submit/i }));

    expect(getByText(/Health Declaration is required/i)).toBeInTheDocument();
    expect(getByText(/Emergency Contact Information is required/i)).toBeInTheDocument();
    expect(getByText(/Medical Conditions are required/i)).toBeInTheDocument();
  });

  it('displays error messages for invalid emergency contact format', () => {
    const formDataWithInvalidEmergencyContact = {
      ...initialFormData,
      emergencyContact: '123'
    };

    const { getByText, getByRole } = render(
      <HealthSafetyForm formData={formDataWithInvalidEmergencyContact} setFormData={setFormData} handleSubmit={handleSubmit} prevStage={prevStage} />
    );

    fireEvent.click(getByRole('button', { name: /submit/i }));

    expect(getByText(/Invalid format. It should be a 10-digit number./i)).toBeInTheDocument();
  });
});
