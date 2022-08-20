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
  const confirmPasswordRef = useRef();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();

  const { signup, signWithGoogle } = useAuth();

  const handelSubmit = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setError('Password do not match');
    }

    try {
      setError('');
      setLoading(true);
      signup(emailRef.current.value, passwordRef.current.value);
      navigate('/');
    } catch {
      setError('Faild to create account');
    }
    setLoading(false);
  };

  const signInWithGoogle = () => {
    try {
      setError('');
      setLoading(true);
      signWithGoogle();
      navigate('/');
    } catch (error) {
      setError('Faild to Signin with Google');
    }
    setLoading(false);
  };
  return (
    <Box component="form" className={styles.loginForm} onSubmit={handelSubmit}>
      <h1>Sign Up</h1>
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
      <label htmlFor="confirm-password">Confirm Password</label>
      <input
        id="confirm-password"
        label="Confirm Password"
        variant="outlined"
        type="password"
        autoComplete="new-password"
        ref={confirmPasswordRef}
        required
      />
      <Button type="submit" variant="contained" disabled={loading}>
        Sign Up
      </Button>
      <Button
        type="button"
        variant="contained"
        disabled={loading}
        onClick={signInWithGoogle}
      >
        Sign Up with Google
      </Button>
      <Link to="/login">
        <Button href="#">Log In</Button>
      </Link>
    </Box>
  );
}

export default SignUpPage;
