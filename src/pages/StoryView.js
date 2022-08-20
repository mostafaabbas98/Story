import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PrograssBar from '../components/PrograssBar';
import { useStory } from '../contexts/StoryContext';

function StoryView() {
  const [loading, setLoading] = useState(true);
  const { previewStory, resetStoryPreview } = useStory();
  let nav = useNavigate();

  const exit = useCallback(() => {
    resetStoryPreview();
    nav('/', { replace: true });
  }, [resetStoryPreview, nav]);

  useEffect(() => {
    if (!previewStory) {
      exit();
    }
    setLoading(false);
  }, [previewStory, exit]);

  return (
    !loading && (
      <div className="storyView" onClick={exit}>
        <PrograssBar exit={exit} />
        <img src={previewStory} alt="" />
      </div>
    )
  );
}

export default StoryView;
