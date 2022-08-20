import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import StopRoundedIcon from '@mui/icons-material/StopRounded';
import ReactTimeago from 'react-timeago';
import { useStory } from '../contexts/StoryContext';
import styles from '../styles/Story.module.css';

function Story({ id, read, imageUrl, timestamp, username, profilePic }) {
  const { openstory } = useStory();
  let nav = useNavigate();
  const date = new Date(timestamp?.toDate()).toUTCString();

  const handleOpenStory = () => {
    openstory(imageUrl, read, id);
    nav('story-view');
  };

  return (
    <div className={styles.story} onClick={handleOpenStory}>
      <Avatar
        src={profilePic}
        referrerPolicy="no-referrer"
        className={styles.story__avatar}
      />
      <div className={styles.story__info}>
        <h4>{username}</h4>
        <p>
          {!read && 'Tap to view -'} <ReactTimeago date={date} />
        </p>
      </div>
      {!read && <StopRoundedIcon className="story__readIcon" />}
    </div>
  );
}

export default Story;
