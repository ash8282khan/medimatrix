import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Paper, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useShipments } from '../../contexts/ShipmentContext';
import { useOrders } from '../../contexts/OrderContext';

export default function ShipmentListPage() {
  const { shipments, createShipmentFromOrder, updateShipmentStatus } = useShipments();
  const { orders } = useOrders();
  const [open, setOpen] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [newStatus, setNewStatus] = useState('');

  useEffect(() => {
    orders.forEach(order => {
      if (!shipments.some(shipment => shipment.orderId === order.id)) {
        createShipmentFromOrder(order);
      }
    });
  }, [orders, shipments, createShipmentFromOrder]);

  const handleClickOpen = (shipment) => {
    setSelectedShipment(shipment);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedShipment(null);
    setNewStatus('');
  };

  const handleUpdateStatus = async () => {
    await updateShipmentStatus(selectedShipment.id, newStatus, selectedShipment.estimatedDelivery);
    handleClose();
  };

  return (
    <Container>
      <Typography variant="h4">Shipments</Typography>
      <Grid container spacing={3}>
        {shipments.map((shipment) => (
          <Grid item xs={12} sm={6} md={4} key={shipment.id}>
            <Paper elevation={3} style={{ padding: '10px', marginBottom: '10px' }}>
              <Typography variant="h6">Shipment ID: {shipment.id}</Typography>
              <Typography>Order ID: {shipment.orderId}</Typography>
              <Typography>Status: {shipment.status}</Typography>
              <Typography>Estimated Delivery: {shipment.estimatedDelivery || "Not Available"}</Typography>
              <Button variant="outlined" onClick={() => handleClickOpen(shipment)}>Update Status</Button>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Shipment Status</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="New Status"
            type="text"
            fullWidth
            variant="outlined"
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Estimated Delivery"
            type="text"
            fullWidth
            variant="outlined"
            value={selectedShipment?.estimatedDelivery || ""}
            onChange={(e) => setSelectedShipment({
              ...selectedShipment, estimatedDelivery: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpdateStatus}>Update</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
