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
// import ReportsOverviewPage from '../reports/ReportsOverviewPage';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function AdminDashboard() {
  const [selectedSection, setSelectedSection] = useState('overview');

  const statistics = {
    totalSales: 50000,
    totalOrders: 150,
    totalUsers: 30,
    totalInventoryValue: 20000,
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

  const renderContent = () => {
    switch (selectedSection) {
      case 'reports':
        return (
          <Box>
            <Typography variant="h5">Reports</Typography>
            {/* <ReportsOverviewPage/> */}
            <p>View sales and inventory reports here.</p>
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
            <Typography variant="h4" sx={{ marginBottom: 2 }}>Overview</Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
                  <Typography variant="h6">Total Sales</Typography>
                  <Typography variant="h4">${statistics.totalSales}</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
                  <Typography variant="h6">Total Orders</Typography>
                  <Typography variant="h4">{statistics.totalOrders}</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
                  <Typography variant="h6">Total Users</Typography>
                  <Typography variant="h4">{statistics.totalUsers}</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
                  <Typography variant="h6">Inventory Value</Typography>
                  <Typography variant="h4">${statistics.totalInventoryValue}</Typography>
                </Paper>
              </Grid>
            </Grid>
            <Box sx={{ marginTop: 4 }}>
              <Typography variant="h5">Profit & Loss Summary</Typography>
              <Line data={profitLossData} />
            </Box>
          </Box>
        );
    }
  };

  return (
    <div style={{ display: 'flex' }}>
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

      <Container sx={{ flexGrow: 1, padding: 4 }}>
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <img
                src="src/assets/mm-logo.png" // Replace with your logo path
                alt="Medimatrix Logo"
                style={{ height: 40, marginRight: 10 }} // Adjust size as needed
              />
              <Typography variant="h6" noWrap>
                Medimatrix
              </Typography>
            </Box>
          </Toolbar>
        </AppBar>

        <Toolbar />
        {renderContent()}
      </Container>
    </div>
  );
}
