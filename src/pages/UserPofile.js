import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { Alert, AlertTitle } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import styles from '../styles/Login.module.css';

function UserPofile() {
  const [error, setError] = useState('');
  const { currentUser, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogOut = () => {
    setError('');
    try {
      logout();
      navigate('/login');
    } catch (error) {
      setError('Faild to log Out', error.message);
    }
  };
  return (
    <div className={styles.loginForm}>
      {error && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          This is an error — <strong>{error}</strong>
        </Alert>
      )}
      <h1>
        Welcome {currentUser.displayName ? currentUser.displayName : 'Anymouse'}
      </h1>
      <Button type="button" variant="contained" onClick={handleLogOut}>
        Log Out
      </Button>
    </div>
  );
}

export default UserPofile;
