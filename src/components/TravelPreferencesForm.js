import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const TravelPreferencesForm = ({ formData, setFormData, nextStage, prevStage }) => {
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleNext = () => {
    const newErrors = {};

    if (!formData.departureDate) newErrors.departureDate = "Departure Date is required";
    if (!formData.returnDate) newErrors.returnDate = "Return Date is required";
    if (!formData.accommodation) newErrors.accommodation = "Accommodation Preference is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      nextStage();
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Travel Preferences
      </Typography>
      <form>
        <TextField
          label="Departure Date"
          name="departureDate"
          type="date"
          value={formData.departureDate}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          InputLabelProps={{ shrink: true }}
          error={!!errors.departureDate}
          helperText={errors.departureDate}
        />
        <TextField
          label="Return Date"
          name="returnDate"
          type="date"
          value={formData.returnDate}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          InputLabelProps={{ shrink: true }}
          error={!!errors.returnDate}
          helperText={errors.returnDate}
        />
        <TextField
          label="Accommodation Preference"
          name="accommodation"
          value={formData.accommodation}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          select
          SelectProps={{
            native: true,
          }}
          error={!!errors.accommodation}
          helperText={errors.accommodation}
        >
          <option value="">Select</option>
          <option value="spaceHotel">Space Hotel</option>
          <option value="martianBase">Martian Base</option>
        </TextField>
        <TextField
          label="Special Requests or Preferences"
          name="specialRequests"
          value={formData.specialRequests}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={4}
          required
          error={!!errors.specialRequests}
          helperText={errors.specialRequests}
        />
        <Button variant="contained" color="secondary" onClick={prevStage} fullWidth style={{ marginBottom: '10px' }}>
          Previous
        </Button>
        <Button variant="contained" color="primary" onClick={handleNext} fullWidth>
          Next
        </Button>
      </form>
    </Container>
  );
};

export default TravelPreferencesForm;
