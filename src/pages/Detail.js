import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  cardContainer: {
    maxWidth: '400px',
    margin: 'auto',
    padding: '20px',
    textAlign: 'center',
    boxShadow: '0px 4px 6px rgba(0,0,0,0.1)',
    borderRadius: '10px',
  },
  image: {
    width: '100%',
    maxHeight: '200px',
    objectFit: 'cover',
    borderRadius: '10px',
    marginTop: '10px',
  },
  typography: {
    marginBottom: '10px',
  }
});

const Detail = () => {
  const classes = useStyles();
  const { id } = useParams();
  const [staff, setStaff] = useState(null);

  useEffect(() => {
    axios.get(`https://667cb41f3c30891b865d557f.mockapi.io/staff/${id}`)
      .then(response => setStaff(response.data))
      .catch(error => console.error(error));
  }, [id]);

  if (!staff) return <Typography>Loading...</Typography>;

  return (
    <Card className={classes.cardContainer}>
      <CardContent>
        <Typography variant="h5" className={classes.typography}>{staff.name}</Typography>
        <Typography className={classes.typography}>{staff.address}</Typography>
        <Typography className={classes.typography}>{staff.age} years old</Typography>
        {/* <Typography className={classes.typography}>Joined: {new Date(staff.createdAt).toDateString()}</Typography> */}
        <img src={staff.image} alt={staff.name} className={classes.image} />
      </CardContent>
    </Card>
  );
}

export default Detail;
