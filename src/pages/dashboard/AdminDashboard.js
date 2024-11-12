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
import logo from '../../assets/logo.png';
import '@fontsource/poppins'; // Poppins font import

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
              {Object.entries(statistics).map(([key, value], index) => (
                <Grid item xs={12} sm={6} md={3} key={key}>
                  <Paper
                    elevation={3}
                    sx={{
                      padding: 2,
                      textAlign: 'center',
                      transition: 'transform 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'scale(1.05)',
                        boxShadow: 6,
                      },
                    }}
                  >
                    <Typography variant="h6">
                      {key.replace(/([A-Z])/g, ' $1')}
                    </Typography>
                    <Typography variant="h4">{key === 'totalSales' || key === 'totalInventoryValue' ? `$${value}` : value}</Typography>
                  </Paper>
                </Grid>
              ))}
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
            backgroundColor: '#3f51b5',
            color: '#ffffff',
          },
        }}
      >
        <Toolbar />
        <List>
          {[
            { text: 'Dashboard Overview', icon: <Dashboard />, section: 'overview' },
            { text: 'Reports', icon: <Assessment />, section: 'reports' },
            { text: 'Profile Management', icon: <AccountCircle />, section: 'profile' },
            { text: 'Logout', icon: <ExitToApp />, section: 'logout' },
          ].map((item, index) => (
            <ListItem
              button
              key={item.text}
              onClick={() => setSelectedSection(item.section)}
              sx={{
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                },
              }}
            >
              <ListItemIcon sx={{ color: '#ffffff' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

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


        <Toolbar />
        {renderContent()}
      </Container>
    </div>
  );
}
