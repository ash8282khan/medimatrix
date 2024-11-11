import React, { useEffect, useState } from 'react';
import { Container, Typography, CircularProgress } from '@mui/material';
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
      <Typography variant="h4" gutterBottom>Shipment Tracking</Typography>
      {shipmentDetails.map((shipment) => (
        <Container key={shipment.id} sx={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ddd', borderRadius: '8px' }}>
          <Typography variant="h6">Shipment ID: {shipment.id}</Typography>
          <Typography variant="body1">Order ID: {shipment.orderId}</Typography>
          <Typography variant="body1">Drug Name: {shipment.drugName}</Typography>
          <Typography variant="body1">Vendor Name: {shipment.vendorName}</Typography>
          <Typography variant="body2" color="textSecondary">Estimated Delivery: {shipment.estimatedDelivery || "Not Available"}</Typography>
          
          <Timeline align="left" sx={{ marginTop: '1rem' }}>
            {getStatusSteps(shipment.status).map((statusStep, index) => (
              <TimelineItem key={index}>
                <TimelineSeparator>
                  <TimelineDot color={index === getStatusSteps(shipment.status).length - 1 ? "success" : "primary"} />
                  {index < getStatusSteps(shipment.status).length - 1 && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent>
                  <Typography>{statusStep}</Typography>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </Container>
      ))}
    </Container>
  );
}
