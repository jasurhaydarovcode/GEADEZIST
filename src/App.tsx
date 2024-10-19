import { Route, Routes, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

import '@fontsource/lato';
import '@fontsource/lato/400.css';
import '@fontsource/lato/400-italic.css';

import SiteLoading from './components/SiteLoading';
import Home from '@/pages/Admin/Home';
import NotFound from '@/pages/Admin/NotFound';
import SignIn from '@/pages/Auth/SignIn';
import SignUp from '@/pages/Auth/SignUp';
import Offer from './pages/Auth/Offer';
import Confirm from './pages/Auth/Confirm';
import ResetPassword from './pages/Auth/ResetPassword';
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
import Address from './pages/Admin/Address';
import InspectorAdmin from './pages/Admin/InspectorAdmin';
import Category from './pages/Admin/Category';
import Profile from './pages/Admin/Profile';
import ConfirmSignUp from './pages/Auth/ConfirmSignUp';
import TestVisual from './components/test/testVisual';

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
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />

        {/* Authentication Routes */}
        <Route path="/auth/SignIn" element={<SignIn />} />
        <Route path="/auth/SignUp" element={<SignUp />} />
        <Route path="/auth/confirm" element={<Confirm />} />
        <Route path="/auth/confirm-signup" element={<ConfirmSignUp />} />
        <Route path="/auth/reset-password" element={<ResetPassword />} />
        <Route path="/auth/offer" element={<Offer />} />

        {/* Client Routes */}
        <Route path="/client/dashboard" element={<ClientDashboard />} />
        <Route path="/client/profile" element={<ClientProfile />} />
        <Route path="/client/test/start" element={<ClientTestStart />} />
        <Route path="/client/quiz/:id" element={<ClientQuiz />} />

        {/* Admin Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/category" element={<Category />} />
        <Route path="/test" element={<Test />} />
        <Route path="/tests" element={<TestVisual />} />
        <Route path="/all-user" element={<AllUser />} />
        <Route path="/user" element={<User />} />
        <Route path="/archive/:id" element={<Archive />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/address" element={<Address />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/inspector-admin" element={<InspectorAdmin />} />
      </Routes>
    </>
  );
}

export default App;
