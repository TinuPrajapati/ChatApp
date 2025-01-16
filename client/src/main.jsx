import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SettingPage from './pages/SettingPage.jsx';
import Profilepage from './pages/Profilepage.jsx';
import { useAuthStore } from './store/useAuthStore.js';

// Router logic wrapped in a functional component
function Router() {
  const { authUser } = useAuthStore(); // Use the hook inside a React component

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route
          path=""
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route path="/signup" element={!authUser ? <SignupPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/settings" element={<SettingPage/>} />
        <Route path="/profile" element={authUser ? <Profilepage /> : <Navigate to="/login" />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router />
  </StrictMode>
);
