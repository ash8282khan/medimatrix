import React, { useEffect, useState } from 'react';
import { Container, Typography, Paper } from '@mui/material';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../firebase';

const OrderListPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersCollection = collection(firestore, 'orders');
        const snapshot = await getDocs(ordersCollection);
        const ordersData = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt ? data.createdAt.toDate() : null, // Convert Firestore Timestamp to Date
          };
        });
        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching orders: ", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <Container sx={{ padding: 4 }}>
      <Paper elevation={3} sx={{ padding: 2 }}>
        <Typography variant="h4">Order List</Typography>
        {orders.length > 0 ? (
          orders.map(order => (
            <Paper key={order.id} sx={{ marginBottom: 2, padding: 2 }}>
              <Typography variant="h6">Order ID: {order.id}</Typography>
              <Typography>Drug Name: {order.drugName}</Typography>
              <Typography>Quantity: {order.quantity}</Typography>
              <Typography>Vendor Name: {order.vendorName}</Typography>
              <Typography>Status: {order.status}</Typography>
              <Typography>
                Created At: {order.createdAt ? order.createdAt.toLocaleString() : "N/A"}
              </Typography>
            </Paper>
          ))
        ) : (
          <Typography>No orders found.</Typography>
        )}
      </Paper>
    </Container>
  );
};

export default OrderListPage;
