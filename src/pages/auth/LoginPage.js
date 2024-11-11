import React, { useRef, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button, TextField, Container, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore'; // To fetch user roles
import { firestore } from '../../firebase'; // Firebase Firestore

export default function LoginPage() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);

      // Log the user in
      const userCredential = await login(emailRef.current.value, passwordRef.current.value);
      const user = userCredential.user;

      // Fetch the user role from Firestore
      const userDoc = await getDoc(doc(firestore, 'users', user.uid));
      const userData = userDoc.data();

      // Role-based redirection
      if (userData.role === 'admin') {
        navigate('/dashboard/admin');
      } else if (userData.role === 'vendor') {
        navigate('/dashboard/vendor');
      } else if (userData.role === 'hospitalStaff') {
        navigate('/dashboard/hospital');
      } else {
        setError('Unknown role, please contact admin.');
      }
    } catch (err) {
      setError('Failed to sign in');
    }
    setLoading(false);
  }

  return (
    <Container maxWidth="xs">
      <Typography variant="h5" gutterBottom>Login</Typography>
      {error && <Typography color="error">{error}</Typography>}
      
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Email Address"
          inputRef={emailRef}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Password"
          type="password"
          inputRef={passwordRef}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={loading}
        >
          Log In
        </Button>
      </form>

       {/* Forgot password link */}
       <Typography align="center" variant="body2" marginTop={2}>
        <Link href="/forgot-password" >
          Forgot Password?
        </Link>
      </Typography>
      
      {/* Add the Sign Up link here */}
      <Typography align="center" style={{ marginTop: '16px' }}>
        Don't have an account?{' '}
        <Link href="/register" variant="body2">
          Sign Up
        </Link>
      </Typography>
    </Container>
  );
}
