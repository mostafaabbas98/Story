import { useCallback, useRef } from 'react';
import Webcam from 'react-webcam';
import { useNavigate } from 'react-router-dom';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CloseIcon from '@mui/icons-material/Close';
import { useStory } from '../contexts/StoryContext';
import styles from '../styles/Webcam.module.css';

const videoConstraints = {
  width: 270,
  height: 460,
  facingMode: 'user',
};

function WebcamCapture() {
  const webcamRef = useRef(null);
  let navigate = useNavigate();

  const { previewCaptureStory } = useStory();

  const capture = useCallback(() => {
    const imgCapture = webcamRef.current.getScreenshot();
    previewCaptureStory(imgCapture);
    navigate('/story-preview');
  }, [navigate, previewCaptureStory]);

  return (
    <div className={styles.webcam}>
      <CloseIcon
        className={styles.webcam__close}
        onClick={() => navigate('/')}
      />
      <Webcam
        audio={false}
        ref={webcamRef}
        videoConstraints={videoConstraints}
        screenshotFormat="image/jpeg"
      />

      <RadioButtonUncheckedIcon
        className={styles.webcam__button}
        onClick={capture}
        fontSize="large"
      />
    </div>
  );
}

export default WebcamCapture;
