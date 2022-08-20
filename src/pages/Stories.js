import { useNavigate } from 'react-router-dom';
import { Avatar } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import Story from '../components/Story';
import { useAuth } from '../contexts/AuthContext';
import { useStory } from '../contexts/StoryContext';
import styles from '../styles/Stories.module.css';

function Stories() {
  const { currentUser, logout } = useAuth();
  const { stories } = useStory();
  let navigate = useNavigate();

  return (
    <div className={styles.stories}>
      <div className={styles.stories__header}>
        <Avatar
          src={currentUser.photoURL}
          referrerPolicy="no-referrer"
          className={styles.stories__header_avatar}
          alt="User Avatar"
        />
        <h1 className={styles.stories__header__name}>
          {currentUser.displayName || 'Anonymous'}
        </h1>
        <LogoutIcon
          className={styles.stories__header_logout}
          onClick={logout}
        />
      </div>
      <div className={styles.stories__list}>
        {stories.map(
          ({
            id,
            data: { profilePic, username, timestamp, imageURL, read, userid },
          }) => (
            <Story
              key={id}
              id={id}
              profilePic={profilePic}
              username={
                currentUser.displayName === username ? 'Your Story' : username
              }
              timestamp={timestamp}
              imageUrl={imageURL}
              read={currentUser.uid === userid ? read : true}
            />
          )
        )}
      </div>
      <RadioButtonUncheckedIcon
        className={styles.stories_capture}
        onClick={() => navigate('story-capture')}
      />
    </div>
  );
}

export default Stories;
