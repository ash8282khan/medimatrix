import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Button, CircularProgress, Snackbar } from '@mui/material';
import { firestore } from '../../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';
import { useShipments } from '../../contexts/ShipmentContext';
import { format } from 'date-fns'; // You can use date-fns for date formatting

const VendorOrdersPage = () => {
  const { currentUser } = useAuth(); // Get vendor ID from user context
  const vendorId = currentUser?.uid;
  const [vendorOrders, setVendorOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // For error handling
  const [successMessage, setSuccessMessage] = useState(''); // For success notification
  const { handleCreateShipment } = useShipments(); // Shipment creation function

  useEffect(() => {
    const fetchVendorOrders = async () => {
      if (!vendorId) return;
      try {
        const ordersCollection = collection(firestore, 'orders');
        const ordersQuery = query(ordersCollection, where('vendorId', '==', vendorId));
        const ordersSnapshot = await getDocs(ordersQuery);
        const filteredOrders = ordersSnapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }));

        setVendorOrders(filteredOrders);
      } catch (error) {
        console.error("Error fetching vendor orders: ", error);
        setError("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchVendorOrders();
  }, [vendorId]);

  const handleCreateShipmentClick = async (order) => {
    try {
      await handleCreateShipment(order); // Use the context method to create shipment
      setSuccessMessage('Shipment successfully created!');
    } catch (error) {
      setError("Failed to create shipment");
      console.error("Error creating shipment: ", error);
    }
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
        <Typography sx={{ marginLeft: 2 }}>Loading orders...</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ padding: 4 }}>
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 2, backgroundColor: '#f5f5f5' }}>
        <Typography variant="h4" sx={{ fontWeight: 600, marginBottom: 3 }}>Orders Received</Typography>
        {error && <Typography color="error" sx={{ marginBottom: 2 }}>{error}</Typography>}
        {vendorOrders.length > 0 ? (
          vendorOrders.map(order => (
            <Paper
              key={order.id}
              sx={{
                marginBottom: 2,
                padding: 3,
                backgroundColor: '#fff',
                borderRadius: 2,
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.15)',
                  backgroundColor: '#f1f1f1',
                },
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 500 }}>Order ID: {order.id}</Typography>
              <Typography sx={{ fontWeight: 500, color: '#1976d2' }}>Drug Name: {order.drugName || "N/A"}</Typography>
              <Typography>Quantity: {order.quantity || "N/A"}</Typography>
              <Typography>Status: {order.status || 'Pending'}</Typography>
              <Typography sx={{ color: 'textSecondary' }}>
                Ordered At:{" "}
                {order.createdAt ? format(order.createdAt.toDate(), 'MM/dd/yyyy HH:mm') : "N/A"}
              </Typography>
              {/* Add a button to create shipment */}
              {order.status === 'Pending' && (
                <Button
                  variant="contained"
                  sx={{ marginTop: 2 }}
                  onClick={() => handleCreateShipmentClick(order)}
                >
                  Create Shipment
                </Button>
              )}
            </Paper>
          ))
        ) : (
          <Typography sx={{ fontStyle: 'italic', color: '#888' }}>No orders received yet.</Typography>
        )}
      </Paper>

      {/* Success Message */}
      {successMessage && (
        <Snackbar
          open={true}
          autoHideDuration={3000}
          onClose={() => setSuccessMessage('')}
          message={successMessage}
        />
      )}
    </Container>
  );
};

export default VendorOrdersPage;
