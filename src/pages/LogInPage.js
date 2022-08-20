import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

import styles from '../styles/Login.module.css';

function SignUpPage() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();

  const { login, signWithGoogle } = useAuth();

  const handelSubmit = async (e) => {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate('/');
    } catch {
      setError('Faild to create account');
    }
    setLoading(false);
  };

  const signInWithGoogle = async () => {
    try {
      setError('');
      setLoading(true);
      await signWithGoogle();
      navigate('/');
    } catch (error) {
      setError('Faild to Login with Google');
    }
    setLoading(false);
  };
  return (
    <Box component="form" className={styles.loginForm} onSubmit={handelSubmit}>
      <h1>Log In</h1>
      {error && (
        <Alert severity="error">
          <strong>{error}</strong>
        </Alert>
      )}

      <label htmlFor="email">Email</label>
      <input
        id="email"
        label="Email"
        variant="outlined"
        type="email"
        autoComplete="email"
        ref={emailRef}
        required
      />

      <label htmlFor="password">Password</label>
      <input
        id="password"
        label="Password"
        variant="outlined"
        type="password"
        autoComplete="new-password"
        ref={passwordRef}
        required
      />

      <Button type="submit" variant="contained" disabled={loading}>
        Log In
      </Button>
      <Button
        type="button"
        variant="contained"
        disabled={loading}
        onClick={signInWithGoogle}
      >
        Log In with Google
      </Button>
      <Link to="/signup">
        <Button href="#">Sign Up</Button>
      </Link>
    </Box>
  );
}

export default SignUpPage;
