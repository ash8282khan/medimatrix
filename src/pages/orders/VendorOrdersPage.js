import React, { useEffect, useState } from 'react';
import { Container, Typography, Paper } from '@mui/material';
import { firestore } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';

const VendorOrdersPage = () => {
    const { currentUser } = useAuth(); // get vendor ID from user context
    const vendorId = currentUser?.uid;
    const [vendorOrders, setVendorOrders] = useState([]);
  
    useEffect(() => {
      const fetchVendorOrders = async () => {
        if (!vendorId) return;
        try {
          const ordersCollection = collection(firestore, 'orders');
          const ordersSnapshot = await getDocs(ordersCollection);
          const filteredOrders = ordersSnapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
            .filter(order => order.vendorId === vendorId);
  
          console.log("Filtered orders for vendor:", filteredOrders);
          setVendorOrders(filteredOrders);
        } catch (error) {
          console.error("Error fetching vendor orders: ", error);
        }
      };
  
      fetchVendorOrders();
    }, [vendorId]);
  
    return (
      <Container sx={{ padding: 4 }}>
        <Paper elevation={3} sx={{ padding: 2 }}>
          <Typography variant="h4">Orders Received</Typography>
          {vendorOrders.length > 0 ? (
            vendorOrders.map(order => (
              <Paper key={order.id} sx={{ marginBottom: 2, padding: 2 }}>
                <Typography variant="h6">Order ID: {order.id}</Typography>
                <Typography>Drug Name: {order.drugName || "N/A"}</Typography>
                <Typography>Quantity: {order.quantity || "N/A"}</Typography>
                <Typography>Status: {order.status || 'Pending'}</Typography>
                <Typography>
                  Ordered At:{" "}
                  {order.createdAt ? new Date(order.createdAt.toDate()).toLocaleString() : "N/A"}
                </Typography>
              </Paper>
            ))
          ) : (
            <Typography>No orders received yet.</Typography>
          )}
        </Paper>
      </Container>
    );
  };
  
  export default VendorOrdersPage;
  