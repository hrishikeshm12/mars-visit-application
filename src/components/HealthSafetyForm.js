import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const HealthSafetyForm = ({ formData, setFormData, prevStage, handleSubmit }) => {
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.healthDeclaration) newErrors.healthDeclaration = "Health Declaration is required";
    if (!formData.emergencyContact) {
      newErrors.emergencyContact = "Emergency Contact Information is required";
    } else {
      const phonePattern = /^[0-9]{10}$/;  // Example pattern, can be adjusted as needed
      if (!phonePattern.test(formData.emergencyContact)) {
        newErrors.emergencyContact = "Invalid format. It should be a 10-digit number.";
      }
    }
    if (!formData.medicalConditions) {
      newErrors.medicalConditions = "Medical Conditions are required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      handleSubmit(e);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Health and Safety
      </Typography>
      <form onSubmit={handleFormSubmit}>
        <TextField
          label="Health Declaration (Yes/No)"
          name="healthDeclaration"
          select
          SelectProps={{
            native: true,
          }}
          value={formData.healthDeclaration}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          error={!!errors.healthDeclaration}
          helperText={errors.healthDeclaration}
        >
          <option value="">Select</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </TextField>
        <TextField
          label="Emergency Contact Information"
          name="emergencyContact"
          value={formData.emergencyContact}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          error={!!errors.emergencyContact}
          helperText={errors.emergencyContact}
        />
        <TextField
          label="Any Medical Conditions (if applicable)"
          name="medicalConditions"
          value={formData.medicalConditions}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={4}
          required
          error={!!errors.medicalConditions}
          helperText={errors.medicalConditions}
        />
        <Button variant="contained" color="secondary" onClick={prevStage} fullWidth style={{ marginBottom: '10px' }}>
          Previous
        </Button>
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default HealthSafetyForm;
