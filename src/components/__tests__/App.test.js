import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../../App';

// Mock the child components to isolate App testing
jest.mock('../PersonalInfoForm', () => () => <div>Mock Personal Information Form</div>);
jest.mock('../TravelPreferencesForm', () => () => <div>Mock Travel Preferences Form</div>);
jest.mock('../HealthSafetyForm', () => () => <div>Mock Health Safety Form</div>);

test('renders form navigation and first stage', () => {
  render(<App />);

  // Check if the Stage 1 text is rendered
  const stageText = screen.getByText(/Stage 1 of 3/i);
  expect(stageText).toBeInTheDocument();

  // Check if the mock Personal Information form is rendered
  const personalInfoForm = screen.getByText(/Mock Personal Information Form/i);
  expect(personalInfoForm).toBeInTheDocument();
});
