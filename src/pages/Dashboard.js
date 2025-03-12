import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableRow, IconButton, Button } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

const Dashboard = () => {
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
    <>
      <Button component={Link} to="/add">Add Staff</Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {staffs.map(staff => (
            <TableRow key={staff.id}>
              <TableCell>{staff.name}</TableCell>
              <TableCell>{staff.address}</TableCell>
              <TableCell>{staff.age}</TableCell>
              <TableCell>
                <IconButton component={Link} to={`/edit/${staff.id}`}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => handleDelete(staff.id)}>
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default Dashboard;
