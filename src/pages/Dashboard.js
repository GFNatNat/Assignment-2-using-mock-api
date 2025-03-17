import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableRow, IconButton, Button, Paper } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: 'auto',
  },
  addButton: {
    marginBottom: '15px',
    backgroundColor: '#1976d2',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#115293',
    },
  },
  table: {
    minWidth: 650,
  },
  actionIcons: {
    display: 'flex',
    gap: '10px',
  },
});

const Dashboard = () => {
  const classes = useStyles();
  const [staffs, setStaffs] = useState([]);

  useEffect(() => {
    axios.get('https://667cb41f3c30891b865d557f.mockapi.io/staff/')
      .then(response => setStaffs(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this staff?')) {
      axios.delete(`https://667cb41f3c30891b865d557f.mockapi.io/staff/${id}`)
        .then(() => {
          setStaffs(staffs.filter(staff => staff.id !== id));
          alert('Staff deleted successfully');
        })
        .catch(error => console.error(error));
    }
  };

  return (
    <Paper className={classes.container} elevation={3}>
      <Button component={Link} to="/add" className={classes.addButton} variant="contained">
        Add Staff
      </Button>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell><strong>Name</strong></TableCell>
            <TableCell><strong>Address</strong></TableCell>
            <TableCell><strong>Age</strong></TableCell>
            <TableCell><strong>Actions</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {staffs.map(staff => (
            <TableRow key={staff.id}>
              <TableCell>{staff.name}</TableCell>
              <TableCell>{staff.address}</TableCell>
              <TableCell>{staff.age}</TableCell>
              <TableCell className={classes.actionIcons}>
                <IconButton component={Link} to={`/edit/${staff.id}`} color="primary">
                  <Edit />
                </IconButton>
                <IconButton onClick={() => handleDelete(staff.id)} color="secondary">
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default Dashboard;
