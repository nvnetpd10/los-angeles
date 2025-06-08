import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Alert,
} from '@mui/material';

const Submit = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    title: '',
    body: '',
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length > 80) {
      newErrors.title = 'Max 80 characters allowed';
    }

    if (!formData.body.trim()) {
      newErrors.body = 'Body is required';
    } else if (formData.body.length < 50) {
      newErrors.body = 'Minimum 50 characters required';
    } else if (formData.body.length > 1000) {
      newErrors.body = 'Maximum 1000 characters allowed';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      // Simulate API delay and mock response
      console.log('Submitted Data:', formData);
      await new Promise((res) => setTimeout(res, 1000));
      const result = { success: true };

      if (result.success) {
        setSuccess(true);
        setFormData({
          name: '',
          email: '',
          title: '',
          body: '',
        });
        setErrors({});
      }
    } catch (error) {
      console.error('Submit error:', error);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 6 }}>
      <Typography variant="h4" fontFamily="Playfair Display" gutterBottom>
        Submit Your Story
      </Typography>

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Thank you—your story is under review.
        </Alert>
      )}

      <Box component="form" noValidate onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={!!errors.name}
          helperText={errors.name}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          error={!!errors.title}
          helperText={errors.title}
          sx={{ mb: 2 }}
          inputProps={{ maxLength: 80 }}
        />
        <TextField
          fullWidth
          multiline
          rows={6}
          label="Body"
          name="body"
          value={formData.body}
          onChange={handleChange}
          error={!!errors.body}
          helperText={errors.body}
          sx={{ mb: 3 }}
          inputProps={{ minLength: 50, maxLength: 1000 }}
        />

        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: '#E91E63',
            '&:hover': { backgroundColor: '#d81b60' },
            color: 'white',
            fontWeight: 'bold',
            px: 4,
            py: 1.5,
          }}
        >
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default Submit;
