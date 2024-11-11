import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { InventoryProvider } from './contexts/InventoryContext';
import { OrderProvider } from './contexts/OrderContext';
import { ShipmentProvider } from './contexts/ShipmentContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { AuditLogProvider } from './contexts/AuditLogContext';
import { VendorProvider } from './contexts/VendorContext';

// Importing page components from the correct paths
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import AdminDashboard from './pages/dashboard/AdminDashboard'; // Updated path for consistency
import HospitalDashboard from './pages/dashboard/HospitalDashboard';
import VendorDashboard from './pages/dashboard/VendorDashboard';
import InventoryOverview from './pages/inventory/InventoryOverview';
import AddDrugPage from './pages/inventory/AddDrugPage';
import EditDrugPage from './pages/inventory/EditDrugPage';
import DeleteDrugPage from './pages/inventory/DeleteDrugPage';
import OrderListPage from './pages/orders/OrderListPage';
import NewOrderPage from './pages/orders/NewOrderPage';
// import EditOrderPage from './pages/orders/EditOrderPage';  // Make sure this file exists
import OrderTrackingPage from './pages/orders/OrderTrackingPage';
import ShipmentListPage from './pages/shipments/ShipmentListPage';
import TrackShipmentPage from './pages/shipments/TrackShipmentPage';
import UserListPage from './pages/users/UserListPage';
import AddUserPage from './pages/users/AddUserPage';
// import EditUserPage from './pages/users/EditUserPage';  // Make sure this file exists
import VendorListPage from './pages/vendors/VendorListPage';
// import ReportsOverview from './pages/reports/ReportsOverview';  // Make sure this file exists
import NotificationsListPage from './pages/notifications/NotificationsListPage';
import UserProfilePage from './pages/settings/UserProfilePage';
import ChangePasswordPage from './pages/settings/ChangePasswordPage';
import ReportsOverviewPage from './pages/reports/ReportsOverviewPage';
// import NotFound from './pages/NotFound';  // Make sure this file exists

function App() {
  return (
    <AuthProvider>
      <InventoryProvider>
        <OrderProvider>
          <ShipmentProvider>
            <NotificationProvider>
              <AuditLogProvider>
                <VendorProvider>
                  <Router>
                    <Routes>
                      <Route path="/" element={<LoginPage />} />
                      <Route path="/register" element={<RegisterPage />} />
                      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                      <Route path="/dashboard/admin" element={<AdminDashboard />} />
                      <Route path="/dashboard/hospital" element={<HospitalDashboard />} />
                      <Route path="/dashboard/vendor" element={<VendorDashboard />} />
                      <Route path="/inventory" element={<InventoryOverview />} />
                      <Route path="/inventory/add" element={<AddDrugPage />} />
                      <Route path="/inventory/edit" element={<EditDrugPage />} />
                      <Route path="/inventory/delete/:id" element={<DeleteDrugPage />} />
                      <Route path="/orders" element={<OrderListPage />} />
                      <Route path="/orders/new" element={<NewOrderPage />} />
                      {/* <Route path="/orders/edit/:id" element={<EditOrderPage />} />  Ensure this exists */}
                      <Route path="/orders/track/:id" element={<OrderTrackingPage />} />
                      <Route path="/shipments" element={<ShipmentListPage />} />
                      <Route path="/shipments/track/:id" element={<TrackShipmentPage />} />
                      <Route path="/users" element={<UserListPage />} />
                      <Route path="/users/add" element={<AddUserPage />} />
                      {/* <Route path="/users/edit/:id" element={<EditUserPage />} />  Ensure this exists */}
                      <Route path="/vendors" element={<VendorListPage />} />
                      <Route path="/reports" element={<ReportsOverviewPage />} />  {/* Ensure this file exists */}
                      <Route path="/notifications" element={<NotificationsListPage />} />
                      <Route path="/settings/profile" element={<UserProfilePage />} />
                      <Route path="/settings/change-password" element={<ChangePasswordPage />} />
                      {/* <Route path="*" element={<NotFound />} />  Ensure this file exists */}
                    </Routes>
                  </Router>
                </VendorProvider>
              </AuditLogProvider>
            </NotificationProvider>
          </ShipmentProvider>
        </OrderProvider>
      </InventoryProvider>
    </AuthProvider>
  );
}

export default App;
