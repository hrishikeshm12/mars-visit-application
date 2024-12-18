import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import '../form.css';

const PersonalInfoForm = ({ formData, setFormData, nextStage }) => {
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleNext = () => {
    const newErrors = {};

    if (!formData.fullName) newErrors.fullName = "Full Name is required";
    if (!formData.dob) newErrors.dob = "Date of Birth is required";
    if (!formData.nationality) newErrors.nationality = "Nationality is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(formData.email)) {
        newErrors.email = "Invalid email format";
      }
    }
    if (!formData.phone) {
      newErrors.phone = "Phone is required";
    } else {
      const phonePattern = /^[0-9]{10}$/;
      if (!phonePattern.test(formData.phone)) {
        newErrors.phone = "Invalid phone format. It should be 10 digits.";
      }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      nextStage();
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Personal Information
      </Typography>
      <form>
        <TextField
          label="Full Name"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          error={!!errors.fullName}
          helperText={errors.fullName}
        />
        <TextField
          label="Date of Birth"
          name="dob"
          type="date"
          value={formData.dob}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          InputLabelProps={{ shrink: true }}
          error={!!errors.dob}
          helperText={errors.dob}
        />
        <TextField
          label="Nationality"
          name="nationality"
          value={formData.nationality}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          error={!!errors.nationality}
          helperText={errors.nationality}
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          label="Phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          error={!!errors.phone}
          helperText={errors.phone}
        />
        <Button variant="contained" color="primary" onClick={handleNext} fullWidth>
          Next
        </Button>
      </form>
    </Container>
  );
};

export default PersonalInfoForm;
