import React, { useRef, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button, TextField, Container, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { firestore } from '../../firebase'; // Firebase Firestore for saving user role
import { doc, setDoc } from 'firebase/firestore'; // For adding user role data to Firestore

export default function RegisterPage() {
  const firstNameRef = useRef(); // Reference for first name
  const lastNameRef = useRef(); // Reference for last name
  const emailRef = useRef();
  const passwordRef = useRef();
  const roleRef = useRef(); // Reference for the role selection
  const { signup } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);

      // Sign up the user
      const userCredential = await signup(emailRef.current.value, passwordRef.current.value);
      const user = userCredential.user;

      // Store the user information and role in Firestore
      await setDoc(doc(firestore, 'users', user.uid), {
        firstName: firstNameRef.current.value,
        lastName: lastNameRef.current.value,
        email: user.email,
        role: roleRef.current.value, // Store the selected role
      });

      // Navigate to corresponding dashboard based on selected role
      if (roleRef.current.value === 'admin') {
        navigate('/dashboard/admin');
      } else if (roleRef.current.value === 'vendor') {
        navigate('/dashboard/vendor');
      } else if (roleRef.current.value === 'hospitalStaff') {
        navigate('/dashboard/hospital');
      } else {
        setError('Unknown role, please contact support.');
      }
    } catch (e) {
      setError('Failed to create account: ' + e.message);
    }
    setLoading(false);
  }

  return (
    <Container maxWidth="xs">
      <Typography variant="h5">Register</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit}>
        {/* First Name field */}
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="First Name"
          inputRef={firstNameRef}
        />
        
        {/* Last Name field */}
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Last Name"
          inputRef={lastNameRef}
        />

        {/* Email field */}
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Email Address"
          inputRef={emailRef}
        />
        
        {/* Password field */}
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Password"
          type="password"
          inputRef={passwordRef}
        />

        {/* Role selection dropdown */}
        <FormControl fullWidth margin="normal">
          <InputLabel id="role-label">Select Role</InputLabel>
          <Select
            labelId="role-label"
            inputRef={roleRef}
            defaultValue=""
            required
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="vendor">Vendor</MenuItem>
            <MenuItem value="hospitalStaff">Hospital Staff</MenuItem>
          </Select>
        </FormControl>

        {/* Register button */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={loading}
        >
          Register
        </Button>
      </form>
    </Container>
  );
}
