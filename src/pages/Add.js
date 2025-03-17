import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  formContainer: {
    maxWidth: '400px',
    margin: 'auto',
    padding: '20px',
    textAlign: 'center',
    boxShadow: '0px 4px 6px rgba(0,0,0,0.1)',
    borderRadius: '10px',
  },
  textField: {
    marginBottom: '15px',
    width: '100%',
  },
  button: {
    backgroundColor: '#1976d2',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#115293',
    },
    width: '100%',
    marginTop: '10px',
  },
});

const Add = () => {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [age, setAge] = useState('');
  const [image, setImage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.split(' ').length < 2) {
      alert('Name must be more than 2 words');
      return;
    }

    axios.post('https://667cb41f3c30891b865d557f.mockapi.io/staff/', {
      name, address, age, image, createdAt: new Date().toISOString()
    })
      .then(() => navigate('/dashboard'))
      .catch(error => console.error(error));
  };

  return (
    <Paper className={classes.formContainer} elevation={3}>
      <Typography variant="h5" gutterBottom>
        Add New Staff
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className={classes.textField}
        />
        <TextField
          label="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          className={classes.textField}
        />
        <TextField
          label="Age"
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
          className={classes.textField}
        />
        <TextField
          label="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
          className={classes.textField}
        />
        <Button type="submit" className={classes.button} variant="contained">
          Add Staff
        </Button>
      </form>
    </Paper>
  );
}

export default Add;
