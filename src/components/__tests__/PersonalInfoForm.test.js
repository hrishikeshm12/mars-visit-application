import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import PersonalInfoForm from '../PersonalInfoForm';

describe('PersonalInfoForm', () => {
  const initialFormData = {
    fullName: '',
    dob: '',
    nationality: '',
    email: '',
    phone: ''
  };

  const setFormData = jest.fn();
  const nextStage = jest.fn();

  it('displays error messages for empty required fields', () => {
    const { getByText, getByRole } = render(
      <PersonalInfoForm formData={initialFormData} setFormData={setFormData} nextStage={nextStage} />
    );

    fireEvent.click(getByRole('button', { name: /next/i }));

    expect(getByText(/Full Name is required/i)).toBeInTheDocument();
    expect(getByText(/Date of Birth is required/i)).toBeInTheDocument();
    expect(getByText(/Nationality is required/i)).toBeInTheDocument();
    expect(getByText(/Email is required/i)).toBeInTheDocument();
    expect(getByText(/Phone is required/i)).toBeInTheDocument();
  });

  it('displays error messages for invalid email and phone formats', () => {
    const formDataWithInvalidEmailAndPhone = {
      ...initialFormData,
      email: 'invalid-email',
      phone: '123'
    };

    const { getByText, getByRole } = render(
      <PersonalInfoForm formData={formDataWithInvalidEmailAndPhone} setFormData={setFormData} nextStage={nextStage} />
    );

    fireEvent.click(getByRole('button', { name: /next/i }));

    expect(getByText(/Invalid email format/i)).toBeInTheDocument();
    expect(getByText(/Invalid phone format. It should be 10 digits./i)).toBeInTheDocument();
  });
});
