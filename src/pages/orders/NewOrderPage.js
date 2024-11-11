import React, { useEffect, useState } from 'react';
import { Container, TextField, Button, Typography, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { useOrders } from '../../contexts/OrderContext';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../firebase';

export default function NewOrderPage() {
  const [drugName, setDrugName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [vendorId, setVendorId] = useState('');
  const { addOrder } = useOrders();
  const [loading, setLoading] = useState(false);
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const vendorCollection = collection(firestore, 'users');
        const vendorSnapshot = await getDocs(vendorCollection);
        const vendorList = vendorSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })).filter(vendor => vendor.role === 'vendor'); // Filter vendors by role
        setVendors(vendorList);
      } catch (error) {
        console.error('Error fetching vendors:', error);
      }
    };

    fetchVendors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Retrieve the vendor's name based on the selected vendorId
      const selectedVendor = vendors.find(vendor => vendor.id === vendorId);
      const vendorName = selectedVendor ? `${selectedVendor.firstName} ${selectedVendor.lastName || ''}`.trim() : "Unknown Vendor";

      // Create the order with the additional vendorName field
      await addOrder({
        drugName,
        quantity,
        vendorId,
        vendorName, // Include vendor name for easy access
        createdAt: new Date() // Optional: Add created date if needed
      });
      alert('Order placed successfully');
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Error placing order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5">Place New Order</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          label="Drug Name"
          fullWidth
          required
          margin="normal"
          value={drugName}
          onChange={(e) => setDrugName(e.target.value)}
        />
        <TextField
          variant="outlined"
          label="Quantity"
          fullWidth
          required
          margin="normal"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <FormControl fullWidth required margin="normal">
          <InputLabel>Vendor</InputLabel>
          <Select
            value={vendorId}
            onChange={(e) => setVendorId(e.target.value)}
          >
            {vendors.map(vendor => (
              <MenuItem key={vendor.id} value={vendor.id}>
                {`${vendor.firstName} ${vendor.lastName || ''}`.trim() || "Unnamed Vendor"}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button type="submit" fullWidth variant="contained" color="primary" disabled={loading}>
          Place Order
        </Button>
      </form>
    </Container>
  );
}