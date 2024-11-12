import React, { useEffect, useState } from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';
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
    <Container maxWidth="md" sx={{ padding: 4, fontFamily: '"Poppins", sans-serif' }}>
      <Paper elevation={3} sx={{ padding: 3, borderRadius: 3, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: '#f8f8f8' }}>
        <Typography variant="h4" sx={{ marginBottom: 3, fontWeight: 'bold', textAlign: 'center', color: '#333' }}>
          Order List
        </Typography>
        
        {orders.length > 0 ? (
          orders.map(order => (
            <Paper key={order.id} sx={{ marginBottom: 3, padding: 3, borderRadius: 2, backgroundColor: '#fff', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' }}>
              <Typography variant="h6" sx={{ fontWeight: '600', color: '#2c6bed' }}>Order ID: {order.id}</Typography>
              <Box sx={{ marginTop: 1 }}>
                <Typography variant="body1">Drug Name: <span style={{ fontWeight: '500', color: '#555' }}>{order.drugName}</span></Typography>
                <Typography variant="body1">Quantity: <span style={{ fontWeight: '500', color: '#555' }}>{order.quantity}</span></Typography>
                <Typography variant="body1">Vendor Name: <span style={{ fontWeight: '500', color: '#555' }}>{order.vendorName}</span></Typography>
                <Typography variant="body1">Status: <span style={{ fontWeight: '500', color: '#555' }}>{order.status}</span></Typography>
                <Typography variant="body1">
                  Created At: <span style={{ fontWeight: '500', color: '#555' }}>
                    {order.createdAt ? order.createdAt.toLocaleString() : "N/A"}
                  </span>
                </Typography>
              </Box>
            </Paper>
          ))
        ) : (
          <Typography variant="body1" sx={{ textAlign: 'center', fontStyle: 'italic' }}>No orders found.</Typography>
        )}
      </Paper>
    </Container>
  );
};

export default OrderListPage;
