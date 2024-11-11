// src/pages/dashboard/VendorDashboard.js
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
import VendorOrdersPage from '../orders/VendorOrdersPage';
import ShipmentListPage from '../shipments/ShipmentListPage';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function VendorDashboard() {
  // State to keep track of the selected section
  const [selectedSection, setSelectedSection] = useState('overview');

  // Sample data for vendor statistics and profit/loss chart
  const statistics = {
    totalOrders: 150,
    totalSales: 50000,
  };

  const profitLossData = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Profit',
        data: [4000, 5000, 3000, 7000, 6000],
        fill: false,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(75,192,192,1)',
      },
      {
        label: 'Loss',
        data: [2000, 1000, 3000, 2000, 1500],
        fill: false,
        backgroundColor: 'rgba(255,0,0,1)',
        borderColor: 'rgba(255,0,0,1)',
      },
    ],
  };

  // Function to render content based on the selected section
  const renderContent = () => {
    switch (selectedSection) {
      case 'supplyOrders':
        return (
          <Box>
            <Typography variant="h5">Supply Orders</Typography>
       
              <VendorOrdersPage/>
              <ShipmentListPage/>
              {/* <p>Here you can view and manage your supply orders.</p> */}
           
          </Box>
        );
      case 'performance':
        return (
          <Box>
            <Typography variant="h5">Performance Metrics</Typography>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Line data={profitLossData} />
            </Paper>
          </Box>
        );
      case 'reports':
        return (
          <Box>
            <Typography variant="h5">Reports</Typography>
            <p>View reports on your orders and performance here.</p>
          </Box>
        );
      case 'profile':
        return (
          <Box>
            <Typography variant="h5">Profile Management</Typography>
            <p>Manage your personal profile and settings here.</p>
          </Box>
        );
      default:
        return (
          <Box>
            <Typography variant="h4" sx={{ marginBottom: 2 }}>Vendor Dashboard Overview</Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={6}>
                <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
                  <Typography variant="h6">Total Orders</Typography>
                  <Typography variant="h4">{statistics.totalOrders}</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
                  <Typography variant="h6">Total Sales</Typography>
                  <Typography variant="h4">${statistics.totalSales}</Typography>
                </Paper>
              </Grid>
            </Grid>
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
          },
        }}
      >
        <Toolbar />
        <List>
          <ListItem button onClick={() => setSelectedSection('overview')}>
            <ListItemIcon><Dashboard /></ListItemIcon>
            <ListItemText primary="Dashboard Overview" />
          </ListItem>
          <ListItem button onClick={() => setSelectedSection('supplyOrders')}>
            <ListItemIcon><Receipt /></ListItemIcon>
            <ListItemText primary="Supply Orders" />
          </ListItem>
          <ListItem button onClick={() => setSelectedSection('performance')}>
            <ListItemIcon><Assessment /></ListItemIcon>
            <ListItemText primary="Performance" />
          </ListItem>
          <ListItem button onClick={() => setSelectedSection('reports')}>
            <ListItemIcon><Assessment /></ListItemIcon>
            <ListItemText primary="Reports" />
          </ListItem>
          <ListItem button onClick={() => setSelectedSection('profile')}>
            <ListItemIcon><AccountCircle /></ListItemIcon>
            <ListItemText primary="Profile Management" />
          </ListItem>
          <ListItem button onClick={() => console.log('Logout')}>
            <ListItemIcon><ExitToApp /></ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content Area */}
      <Container sx={{ flexGrow: 1, padding: 4 }}>
        {/* Top Bar */}
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <Typography variant="h6" noWrap>
              Vendor Dashboard
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Dashboard Content */}
        <Toolbar />
        {renderContent()}
      </Container>
    </div>
  );
}
