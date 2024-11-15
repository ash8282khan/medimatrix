import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Paper,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
} from '@mui/material';
import {
  Dashboard,
  Inventory,
  Receipt,
  Assessment,
  AccountCircle,
  ExitToApp,
} from '@mui/icons-material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import InventoryOverview from '../inventory/InventoryOverview';
import OrderListPage from '../orders/OrderListPage';
import NewOrderPage from '../orders/NewOrderPage';
import TrackShipmentPage from '../shipments/TrackShipmentPage';
import logo from '../../assets/logo.png';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function HospitalDashboard() {
  const [selectedSection, setSelectedSection] = useState('overview');

  const statistics = {
    totalPatients: 300,
    totalInventoryValue: 50000,
    totalOrders: 100,
  };
  
  const profitLossData = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Income',
        data: [8000, 9000, 7000, 10000, 12000],
        fill: false,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(75,192,192,1)',
      },
      {
        label: 'Expenses',
        data: [5000, 6000, 4000, 8000, 6000],
        fill: false,
        backgroundColor: 'rgba(255,0,0,1)',
        borderColor: 'rgba(255,0,0,1)',
      },
    ],
  };

  const renderContent = () => {
    switch (selectedSection) {
      case 'inventory':
        return (
          <Box>
            <Typography variant="h5">Inventory Management</Typography>
            <InventoryOverview />
          </Box>
        );
      case 'orders':
        return (
          <Box>
            <Typography variant="h5">Order Management</Typography>
            <NewOrderPage />
            <OrderListPage />
          </Box>
        );
      case 'shipments':
        return (
          <Box>
            <Typography variant="h5">Track Shipments</Typography>
            <TrackShipmentPage />
          </Box>
        );
      case 'reports':
        return (
          <Box>
            <Typography variant="h5">Reports</Typography>
            <p>View reports related to patient management and inventory.</p>
          </Box>
        );
      default:
        return (
          <Box>
            <Typography variant="h4" sx={{ marginBottom: 2 }}>Overview</Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4}>
                <Paper elevation={3} sx={{ padding: 2, textAlign: 'center', transition: '0.3s', '&:hover': { boxShadow: '0 8px 16px rgba(0,0,0,0.3)' } }}>
                  <Typography variant="h6">Total Patients</Typography>
                  <Typography variant="h4">{statistics.totalPatients}</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Paper elevation={3} sx={{ padding: 2, textAlign: 'center', transition: '0.3s', '&:hover': { boxShadow: '0 8px 16px rgba(0,0,0,0.3)' } }}>
                  <Typography variant="h6">Inventory Value</Typography>
                  <Typography variant="h4">${statistics.totalInventoryValue}</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Paper elevation={3} sx={{ padding: 2, textAlign: 'center', transition: '0.3s', '&:hover': { boxShadow: '0 8px 16px rgba(0,0,0,0.3)' } }}>
                  <Typography variant="h6">Total Orders</Typography>
                  <Typography variant="h4">{statistics.totalOrders}</Typography>
                </Paper>
              </Grid>
            </Grid>
            <Box sx={{ marginTop: 4 }}>
              <Typography variant="h5">Income & Expenses Summary</Typography>
              <Line data={profitLossData} />
            </Box>
          </Box>
        );
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            backgroundColor: '#3f51b5',
            color: '#ffffff',
          },
        }}
      >
        <Toolbar />
        <List>
          <ListItem button onClick={() => setSelectedSection('overview')} sx={{ transition: '0.3s', '&:hover': { backgroundColor: '#5c6bc0' } }}>
            <ListItemIcon sx={{ color: '#ffffff' }}><Dashboard /></ListItemIcon>
            <ListItemText primary="Dashboard Overview" />
          </ListItem>
          <ListItem button onClick={() => setSelectedSection('inventory')} sx={{ transition: '0.3s', '&:hover': { backgroundColor: '#5c6bc0' } }}>
            <ListItemIcon sx={{ color: '#ffffff' }}><Inventory /></ListItemIcon>
            <ListItemText primary="Inventory Management" />
          </ListItem>
          <ListItem button onClick={() => setSelectedSection('orders')} sx={{ transition: '0.3s', '&:hover': { backgroundColor: '#5c6bc0' } }}>
            <ListItemIcon sx={{ color: '#ffffff' }}><Receipt /></ListItemIcon>
            <ListItemText primary="Order Management" />
          </ListItem>
          <ListItem button onClick={() => setSelectedSection('shipments')} sx={{ transition: '0.3s', '&:hover': { backgroundColor: '#5c6bc0' } }}>
            <ListItemIcon sx={{ color: '#ffffff' }}><Assessment /></ListItemIcon>
            <ListItemText primary="Track Shipments" />
          </ListItem>
          <ListItem button onClick={() => setSelectedSection('reports')} sx={{ transition: '0.3s', '&:hover': { backgroundColor: '#5c6bc0' } }}>
            <ListItemIcon sx={{ color: '#ffffff' }}><AccountCircle /></ListItemIcon>
            <ListItemText primary="Reports" />
          </ListItem>
          <ListItem button onClick={() => console.log('Logout')} sx={{ transition: '0.3s', '&:hover': { backgroundColor: '#5c6bc0' } }}>
            <ListItemIcon sx={{ color: '#ffffff' }}><ExitToApp /></ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content Area */}
      <Container sx={{ flexGrow: 1, padding: 4 }}>
        {/* Top Bar */}
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: '#3f51b5' }}>
          <Toolbar>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <img
                src={logo}
                alt="Medimatrix Logo"
                style={{ height: 40, marginRight: 10 }}
              />
              <Typography variant="h5" noWrap sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, letterSpacing: '1px' }}>
                Medimatrix
              </Typography>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Dashboard Content */}
        <Toolbar />
        {renderContent()}
      </Container>
    </div>
  );
}
