import React, { useEffect, useState } from 'react';
import { Container, Typography, CircularProgress, Paper } from '@mui/material';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab';
import { useShipments } from '../../contexts/ShipmentContext';
import { useOrders } from '../../contexts/OrderContext';

export default function TrackShipmentPage() {
  const { shipments } = useShipments();
  const { getOrderById } = useOrders();
  const [loading, setLoading] = useState(true);
  const [shipmentDetails, setShipmentDetails] = useState([]);

  useEffect(() => {
    const fetchShipmentDetails = () => {
      const details = shipments.map((shipment) => {
        const orderDetails = getOrderById(shipment.orderId);
        return {
          ...shipment,
          drugName: orderDetails?.drugName || 'Unknown Drug',
          vendorName: orderDetails?.vendorName || 'Unknown Vendor',
        };
      });
      setShipmentDetails(details);
      setLoading(false);
    };

    if (shipments && shipments.length > 0) {
      fetchShipmentDetails();
    }
  }, [shipments, getOrderById]);

  if (loading) {
    return (
      <Container>
        <CircularProgress />
        <Typography>Loading shipment details...</Typography>
      </Container>
    );
  }

  const getStatusSteps = (status) => {
    const allStatuses = ["Order Placed", "Shipped", "In Transit", "Out for Delivery", "Delivered"];
    return allStatuses.slice(0, allStatuses.indexOf(status) + 1);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, marginBottom: 2 }}>
        Shipment Tracking
      </Typography>
      {shipmentDetails.map((shipment) => (
        <Paper
          key={shipment.id}
          sx={{
            marginBottom: '2rem',
            padding: '1rem',
            border: '1px solid #ddd',
            borderRadius: '8px',
            transition: 'all 0.3s ease',
            '&:hover': {
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',  // Hover shadow
              backgroundColor: '#f9f9f9',  // Hover background color
            },
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 500 }}>Shipment ID: {shipment.id}</Typography>
          <Typography variant="body1" sx={{ marginBottom: 1 }}>Order ID: {shipment.orderId}</Typography>
          <Typography variant="body1" sx={{ marginBottom: 1 }}>Drug Name: {shipment.drugName}</Typography>
          <Typography variant="body1" sx={{ marginBottom: 1 }}>Vendor Name: {shipment.vendorName}</Typography>
          <Typography variant="body2" color="textSecondary">Estimated Delivery: {shipment.estimatedDelivery || "Not Available"}</Typography>
          
          <Timeline align="left" sx={{ marginTop: '1rem' }}>
            {getStatusSteps(shipment.status).map((statusStep, index) => (
              <TimelineItem key={index}>
                <TimelineSeparator>
                  <TimelineDot
                    color={index === getStatusSteps(shipment.status).length - 1 ? "success" : "primary"}
                    sx={{
                      '&:hover': {
                        backgroundColor: '#1976d2',  // Hover color change for timeline dot
                        transform: 'scale(1.2)',  // Hover scale effect
                      },
                      transition: 'all 0.3s ease',  // Smooth transition for hover effects
                    }}
                  />
                  {index < getStatusSteps(shipment.status).length - 1 && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent>
                  <Typography variant="body1" sx={{ fontWeight: 400 }}>{statusStep}</Typography>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </Paper>
      ))}
    </Container>
  );
}
