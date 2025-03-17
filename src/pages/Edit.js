import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
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

const Edit = () => {
  const classes = useStyles();
  const { id } = useParams();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [age, setAge] = useState('');
  const [image, setImage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://667cb41f3c30891b865d557f.mockapi.io/staff/${id}`)
      .then(response => {
        setName(response.data.name);
        setAddress(response.data.address);
        setAge(response.data.age);
        setImage(response.data.image);
      })
      .catch(error => console.error(error));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.split(' ').length < 2) {
      alert('Name must be more than 2 words');
      return;
    }

    axios.put(`https://667cb41f3c30891b865d557f.mockapi.io/staff/${id}`, {
      name, address, age, image
    })
      .then(() => navigate('/dashboard'))
      .catch(error => console.error(error));
  };

  return (
    <Paper className={classes.formContainer} elevation={3}>
      <Typography variant="h5" gutterBottom>
        Edit Staff
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
          Update Staff
        </Button>
      </form>
    </Paper>
  );
}

export default Edit;
