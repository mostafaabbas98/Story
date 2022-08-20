import React, { useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { storage, db } from '../adapters/firebaseConfig';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { v4 as uuid } from 'uuid';

const StoryContext = React.createContext({
  stories: null,
  uploadImageToStorage: (img) => {},
  previewStory: null,
  openstory: (img, read, id) => {},
  resetStoryPreview: () => {},
  captureStory: null,
  previewCaptureStory: (img) => {},
});

export function useStory() {
  return useContext(StoryContext);
}

function isMoreThan24HourAgo(date) {
  // 👇️                    hour  min  sec  milliseconds
  const twentyFourHrInMs = 24 * 60 * 60 * 1000;

  const twentyFourHoursAgo = Date.now() - twentyFourHrInMs;

  return date < twentyFourHoursAgo;
}

export function StoryProvide({ children }) {
  const [stories, setStories] = useState([]);
  const [captureStory, setCaptureStory] = useState([]);
  const [previewStory, setPreviewStory] = useState();
  const { currentUser } = useAuth();

  useEffect(() => {
    const q = query(collection(db, 'images'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setStories(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const q = query(collection(db, 'images'), orderBy('timestamp', 'asc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.docs.forEach((d) => {
        if (isMoreThan24HourAgo(new Date(d.data()?.timestamp?.toDate()))) {
          deleteDoc(doc(db, 'images', d.id))
            .then(() => console.log('deletes'))
            .catch((error) => console.log(error));
        }
      });
    });
    return unsubscribe;
  }, []);

  const uploadImageToStorage = (img) => {
    if (!img) return;
    const id = uuid();
    const storageRef = ref(storage, `images/${id}`);
    uploadString(storageRef, img, 'data_url')
      .then((snapshot) => {
        getDownloadURL(snapshot.ref)
          .then((url) => {
            addDoc(collection(db, 'images'), {
              imageURL: url,
              read: false,
              timestamp: serverTimestamp(),
              username: currentUser?.displayName || 'Anonymous',
              userid: currentUser?.uid,
              profilePic: currentUser?.photoURL,
            });
          })
          .catch((error) =>
            console.log('Faild To Add Image to Firestore', error.message)
          );
      })
      .catch((error) =>
        console.log('Faild To Upload Image to Storage', error.message)
      );
  };

  const previewCaptureStory = (img) => {
    setCaptureStory(img);
  };

  const openstory = async (img, read, id) => {
    setPreviewStory(img);
    if (!read) {
      const imageRef = doc(db, `images/${id}`);
      await updateDoc(imageRef, {
        read: true,
      });
    }
  };

  const resetStoryPreview = () => {
    setPreviewStory(null);
  };

  const value = {
    stories,
    uploadImageToStorage,
    previewStory,
    openstory,
    resetStoryPreview,
    captureStory,
    previewCaptureStory,
  };
  return (
    <StoryContext.Provider value={value}>{children}</StoryContext.Provider>
  );
}
