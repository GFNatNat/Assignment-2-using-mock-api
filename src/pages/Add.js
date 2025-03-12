import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button } from '@mui/material';

const Add = () => {
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
    <form onSubmit={handleSubmit}>
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <TextField
        label="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
      />
      <TextField
        label="Age"
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        required
      />
      <TextField
        label="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        required
      />
      <Button type="submit">Add Staff</Button>
    </form>
  );
}

export default Add;
