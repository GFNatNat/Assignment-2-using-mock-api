import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Grid } from '@mui/material';

const Home = () => {
  const [staffs, setStaffs] = useState([]);

  useEffect(() => {
    axios.get('https://667cb41f3c30891b865d557f.mockapi.io/staff/')
      .then(response => {
        const sortedData = response.data.sort((a, b) => b.age - a.age);
        setStaffs(sortedData);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <Grid container spacing={2}>
      {staffs.map(staff => (
        <Grid item xs={12} sm={6} md={4} key={staff.id}>
          <Card>
            <CardContent>
              <Typography variant="h5" component={Link} to={`/detail/${staff.id}`}>
                {staff.name}
              </Typography>
              <Typography>{staff.address}</Typography>
              <Typography>{staff.age}</Typography>
              <img src={staff.image} alt={staff.name} width="100" />
              <Button component={Link} to={`/detail/${staff.id}`}>Detail</Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default Home;
