import { Route, Routes, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '@fontsource/lato';
import '@fontsource/lato/400.css';
import '@fontsource/lato/400-italic.css';

import SiteLoading from './components/SiteLoading';
import Home from '@/pages/Admin/Home';
import NotFound from '@/pages/Admin/NotFound';
import SignIn from '@/pages/Authentication/SignIn';
import SignUp from '@/pages/Authentication/SignUp';
import Offer from './pages/Authentication/Offer';
import Confirm from './pages/Authentication/Confirm';
import ResetPassword from './pages/Authentication/ResetPassword';
import ClientDashboard from './pages/Client/ClientDashboard';
import ClientProfile from './pages/Client/ClientProfile';
import ClientTestStart from './pages/Client/ClientTestStart';
import ClientQuiz from './pages/Client/ClientQuiz';
import Dashboard from './pages/Admin/Dashboard';
import Test from './pages/Admin/Test';
import AllUser from './pages/Admin/AllUser';
import User from './pages/Admin/User';
import Archive from './pages/Admin/Archive';
import Employees from './pages/Admin/Employees';
import InspectorAdmin from './pages/Admin/InspectorAdmin';
import Category from './pages/Admin/Category';
import Profile from './pages/Admin/Profile';
import ConfirmSignUp from './pages/Authentication/ConfirmSignUp';
import TestVisual from './components/test/testVisual';
import PrivateRoute from './components/security/route/PrivateRoute';
import PublicRoute from './components/security/route/PublicRoute'

function App() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <>
      {loading && <SiteLoading />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        } />
        <Route path="*" element={<NotFound />} />

        {/* Authentication Routes */}
        <Route path="/auth/SignIn" element={
          <PublicRoute>
            <SignIn />
          </PublicRoute>
        } />
        <Route path="/auth/SignUp" element={
          <PublicRoute>
            <SignUp />
          </PublicRoute>
        } />
        <Route path="/auth/confirm" element={
          <PublicRoute>
            <Confirm />
          </PublicRoute>
        } />
        <Route path="/auth/confirm-signup" element={
          <PublicRoute>
            <ConfirmSignUp />
          </PublicRoute>
        } />
        <Route path="/auth/reset-password" element={
          <PublicRoute>
            <ResetPassword />
          </PublicRoute>
        } />
        <Route path="/auth/offer" element={
          <PublicRoute>
            <Offer />
          </PublicRoute>
        } />

        {/* Protected Client Routes */}
        <Route
          path="/client/dashboard"
          element={
            <PrivateRoute>
              <ClientDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/client/profile"
          element={
            <PrivateRoute>
              <ClientProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/client/test/start"
          element={
            <PrivateRoute>
              <ClientTestStart />
            </PrivateRoute>
          }
        />
        <Route
          path="/client/quiz/:id"
          element={
            <PrivateRoute>
              <ClientQuiz />
            </PrivateRoute>
          }
        />

        {/* Protected Admin Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/category"
          element={
            <PrivateRoute>
              <Category />
            </PrivateRoute>
          }
        />
        <Route
          path="/test"
          element={
            <PrivateRoute>
              <Test />
            </PrivateRoute>
          }
        />
        <Route
          path="/tests"
          element={
            <PrivateRoute>
              <TestVisual />
            </PrivateRoute>
          }
        />
        <Route
          path="/all-user"
          element={
            <PrivateRoute>
              <AllUser />
            </PrivateRoute>
          }
        />
        <Route
          path="/user"
          element={
            <PrivateRoute>
              <User />
            </PrivateRoute>
          }
        />
        <Route
          path="/archive/:id"
          element={
            <PrivateRoute>
              <Archive />
            </PrivateRoute>
          }
        />
        <Route
          path="/employees"
          element={
            <PrivateRoute>
              <Employees />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/inspector-admin"
          element={
            <PrivateRoute>
              <InspectorAdmin />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
