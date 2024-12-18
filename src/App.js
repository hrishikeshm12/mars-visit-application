import React, { useState } from 'react';
import PersonalInfoForm from './components/PersonalInfoForm';
import TravelPreferencesForm from './components/TravelPreferencesForm';
import HealthSafetyForm from './components/HealthSafetyForm';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import './form.css';

const App = () => {
  const [stage, setStage] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    nationality: "",
    email: "",
    phone: "",
    departureDate: "",
    returnDate: "",
    accommodation: "",
    specialRequests: "",
    healthDeclaration: "",
    emergencyContact: "",
    medicalConditions: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleNextStage = () => {
    if (stage < 3) {
      setStage(stage + 1);
    }
  };

  const handlePrevStage = () => {
    if (stage > 1) {
      setStage(stage - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    console.log(formData);
  };

  return (
    <Container maxWidth="md">
      {isSubmitted ? (
        <div className="success-message">
          <Typography variant="h4" component="h1" gutterBottom>
            Form Submitted Successfully
          </Typography>
          <Typography variant="body1">
            Thank you for providing your information. We will review it and get back to you shortly.
          </Typography>
        </div>
      ) : (
        <>
          <div className="form-navigation">
            <Typography variant="h6">Stage {stage} of 3</Typography>
            <LinearProgress variant="determinate" value={(stage / 3) * 100} />
          </div>

          {stage === 1 && (
            <PersonalInfoForm
              formData={formData}
              setFormData={setFormData}
              nextStage={handleNextStage}
            />
          )}
          {stage === 2 && (
            <TravelPreferencesForm
              formData={formData}
              setFormData={setFormData}
              nextStage={handleNextStage}
              prevStage={handlePrevStage}
            />
          )}
          {stage === 3 && (
            <HealthSafetyForm
              formData={formData}
              setFormData={setFormData}
              prevStage={handlePrevStage}
              handleSubmit={handleSubmit}
            />
          )}
        </>
      )}
    </Container>
  );
};

export default App;
