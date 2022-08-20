import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { useStory } from '../contexts/StoryContext';
import styles from '../styles/StoryPreview.module.css';

function StoryPreview() {
  const { captureStory, uploadImageToStorage, previewCaptureStory } =
    useStory();
  let navigator = useNavigate();

  useEffect(() => {
    if (!captureStory) {
      navigator('/');
    }
  }, [captureStory, navigator]);

  const closePreview = () => {
    previewCaptureStory(null);
  };

  const sendImage = () => {
    uploadImageToStorage(captureStory);
    navigator('/');
  };

  return (
    <div className={styles.preview}>
      <CloseIcon className={styles.preview__close} onClick={closePreview} />
      <img src={captureStory} alt="preview capture story" />
      <div className={styles.preview__send} onClick={sendImage}>
        <p>Send Now</p>
        <SendIcon fontSize="small" className="preview__sendIcon" />
      </div>
    </div>
  );
}

export default StoryPreview;
