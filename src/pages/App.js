import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WebcamCapture from './WebcamCapture';
import StoryPreview from './StoryPreview';
import Stories from './Stories';
import StoryView from './StoryView';
import SignUpPage from './SignUpPage';
import LogInPage from './LogInPage';
import UserProfile from './UserPofile';
import Layout from '../components/Layout';
import PrivateRoute from '../components/PrivateRoute';
import { AuthProvider } from '../contexts/AuthContext';
import { StoryProvide } from '../contexts/StoryContext';

function App() {
  return (
    <AuthProvider>
      <StoryProvide>
        <Router>
          <Layout>
            <Routes>
              <Route path="signup" element={<SignUpPage />} />
              <Route path="login" element={<LogInPage />} />
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Stories />
                  </PrivateRoute>
                }
              />
              <Route
                path="story-capture"
                element={
                  <PrivateRoute>
                    <WebcamCapture />
                  </PrivateRoute>
                }
              />
              <Route path="story-preview" element={<StoryPreview />} />
              <Route path="story-view" element={<StoryView />} />
              <Route
                path="user-profile"
                element={
                  <PrivateRoute>
                    <UserProfile />
                  </PrivateRoute>
                }
              />
            </Routes>
          </Layout>
        </Router>
      </StoryProvide>
    </AuthProvider>
  );
}

export default App;
