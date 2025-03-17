import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  card: {
    padding: '10px',
    textAlign: 'center',
    boxShadow: '0px 4px 6px rgba(0,0,0,0.1)',
    borderRadius: '10px',
  },
  title: {
    fontWeight: 'bold',
    color: '#1976d2',
    textDecoration: 'none',
  },
  image: {
    width: '100px',
    height: '100px',
    objectFit: 'cover',
    borderRadius: '50%',
    margin: '10px auto',
  },
  button: {
    marginTop: '10px',
    backgroundColor: '#1976d2',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#115293',
    },
  },
});

const Home = () => {
  const classes = useStyles();
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
    <Grid container spacing={4} justifyContent="left">
      {staffs.map(staff => (
        <Grid item xs={12} sm={6} md={4} key={staff.id}>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h5" component={Link} to={`/detail/${staff.id}`} className={classes.title}>
                {staff.name}
              </Typography>
              <Typography>{staff.address}</Typography>
              <Typography>{staff.age} years old</Typography>
              <img src={staff.image} alt={staff.name} className={classes.image} />
              <Button component={Link} to={`/detail/${staff.id}`} className={classes.button} variant="contained">
                Detail
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default Home;
