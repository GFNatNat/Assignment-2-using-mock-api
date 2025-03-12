import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';

const Detail = () => {
  const { id } = useParams();
  const [staff, setStaff] = useState(null);

  useEffect(() => {
    axios.get(`https://667cb41f3c30891b865d557f.mockapi.io/staff/${id}`)
      .then(response => setStaff(response.data))
      .catch(error => console.error(error));
  }, [id]);

  if (!staff) return <Typography>Loading...</Typography>;

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{staff.name}</Typography>
        <Typography>{staff.address}</Typography>
        <Typography>{staff.age}</Typography>
        <Typography>{staff.createdAt}</Typography>
        <img src={staff.image} alt={staff.name} width="100" />
      </CardContent>
    </Card>
  );
}

export default Detail;
