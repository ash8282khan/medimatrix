import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { firestore } from '../../firebase'; 
import {
  Container,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

export default function InventoryOverview() {
  const [medicines, setMedicines] = useState([]);
  const medicinesCollectionRef = collection(firestore, "medicine_inventory");
  let counter = 1;

  const navigate = useNavigate(); // React Router navigation hook

  // Fetch medicine data from Firestore
  const getTypes = useCallback(async () => {
    const data = await getDocs(medicinesCollectionRef);
    setMedicines(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }, [medicinesCollectionRef]);

  // Handle deletion of medicine
  const handleDeleteButton = async (id) => {
    const medDoc = doc(firestore, "medicine_inventory", id);
    await deleteDoc(medDoc);
    getTypes(); // Refresh the data after deletion
  };

  // Fetch medicines on component mount
  useEffect(() => {
    getTypes();
  }, [getTypes]);

  // Handle edit action by storing the selected medicine in local storage
  const handleEditButton = (medicine) => {
    localStorage.setItem("medicine_obj", JSON.stringify(medicine));
    navigate("/inventory/edit"); // Navigate to the update page
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', padding: '20px' }}>
      <Container>
        <Typography variant="h4" gutterBottom>
          Medicine Inventory
        </Typography>
        <Card>
          <CardContent>
            <Typography variant="h6" component="div" gutterBottom>
              Inventory List
              <Button
                component={Link}
                to="/inventory/add"
                variant="contained"
                color="primary"
                sx={{ float: "right" }}
              >
                Add new Medicine
              </Button>
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>
                      Medicine Name<sup>Power</sup>
                    </TableCell>
                    <TableCell>Medicine Price</TableCell>
                    <TableCell>Stock</TableCell>
                    <TableCell>Expiry Date</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {medicines.map((medicine) => (
                    <TableRow key={medicine.id}>
                      <TableCell>{counter++}</TableCell>
                      <TableCell>
                        {medicine.name} <sup>{medicine.power}</sup>
                      </TableCell>
                      <TableCell>₹{medicine.price}</TableCell>
                      <TableCell>{medicine.stock}</TableCell>
                      <TableCell>{medicine.expiryDate}</TableCell>
                      <TableCell>
                        <IconButton
                          color="success"
                          onClick={() => handleEditButton(medicine)}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => handleDeleteButton(medicine.id)}
                        >
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}
