import React, { useState } from "react";
import { Container, TextField, Checkbox, FormControlLabel, Button, Grid, Typography } from "@mui/material";
// import "../styles/Contact.css";

const Contact = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    city: "",
    state: "",
    zip: "",
    agree: false
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const validate = () => {
    let newErrors = {};
    if (!form.firstName) newErrors.firstName = "Please provide a first name.";
    if (!form.lastName) newErrors.lastName = "Please provide a last name.";
    if (!form.username) newErrors.username = "Please choose a username.";
    if (!form.city) newErrors.city = "Please provide a valid city.";
    if (!form.state) newErrors.state = "Please provide a valid state.";
    if (!form.zip) newErrors.zip = "Please provide a valid zip.";
    if (!form.agree) newErrors.agree = "You must agree before submitting.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form submitted", form);
    }
  };

  return (
    <Container>
      <Typography variant="h4">Contact</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="First Name"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              fullWidth
              error={!!errors.firstName}
              helperText={errors.firstName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Last Name"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              fullWidth
              error={!!errors.lastName}
              helperText={errors.lastName}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Username"
              name="username"
              value={form.username}
              onChange={handleChange}
              fullWidth
              error={!!errors.username}
              helperText={errors.username}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="City"
              name="city"
              value={form.city}
              onChange={handleChange}
              fullWidth
              error={!!errors.city}
              helperText={errors.city}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="State"
              name="state"
              value={form.state}
              onChange={handleChange}
              fullWidth
              error={!!errors.state}
              helperText={errors.state}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Zip"
              name="zip"
              value={form.zip}
              onChange={handleChange}
              fullWidth
              error={!!errors.zip}
              helperText={errors.zip}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox checked={form.agree} onChange={handleChange} name="agree" />}
              label="Agree to terms and conditions"
            />
            {errors.agree && <Typography color="error">{errors.agree}</Typography>}
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Submit form
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Contact;