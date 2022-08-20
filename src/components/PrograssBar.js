import * as React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgress variant="determinate" {...props} />
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

export default function PrograssBar({ exit }) {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    if (progress === 100) {
      exit();
    }
    const timer = setInterval(() => {
      setProgress((prevProgress) => prevProgress + 1);
    }, 100);
    return () => {
      clearInterval(timer);
    };
  }, [progress, exit]);

  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgressWithLabel value={progress} />
    </Box>
  );
}
