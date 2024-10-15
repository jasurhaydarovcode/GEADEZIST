import { Route, Routes } from 'react-router-dom';

// Font Family "Lato"
import '@fontsource/lato';
import '@fontsource/lato/400.css';
import '@fontsource/lato/400-italic.css';

import Home from '@/pages/Home';
import NotFound from '@/pages/NotFound';
import SignIn from '@/pages/Auth/SignIn';
import SignUp from '@/pages/Auth/SignUp';
import Offer from './pages/Auth/Offer';
import Confirm from './pages/Auth/Confirm';
import ResetPassword from './pages/Auth/ResetPassword';
import ClientDashboard from './pages/Client/ClientDashboard';
import ClientProfile from './pages/Client/ClientProfile';
import ClientTestStart from './pages/Client/ClientTestStart';
import ClientQuiz from './pages/Client/ClientQuiz';
import Dashboard from './pages/Dashboard';
import Test from './pages/Test';
import AllUser from './pages/AllUser';
import User from './pages/User';
import Archive from './pages/Archive';
import Employees from './pages/Employees';
import Address from './pages/Address';
import InspectorAdmin from './pages/InspectorAdmin';
import Category from './pages/Category';
import Profile from './pages/Profile';
import ConfirmSignUp from './pages/Auth/ConfirmSignUp';
// import { useEffect } from 'react';

function App() {
  // const navigate = useNavigate();
  // function LocalgaSaqlash(){
  //   if(!localStorage.getItem('token')){
  //    navigate('/auth/SignIn')
  //   }
  // }
  // useEffect(() => {
  //   LocalgaSaqlash()
  // })
  
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />

      {/* START Authentication Routes */}
      <Route path="/auth/SignIn" element={<SignIn />} />
      <Route path="/auth/SignUp" element={<SignUp />} />
      <Route path="/auth/confirm" element={<Confirm />} />
      <Route path="/auth/confirm-signup" element={<ConfirmSignUp />} />
      <Route path="/auth/reset-password" element={<ResetPassword />} />
      <Route path="/auth/offer" element={<Offer />} />
      {/* END Authentication Routes */}

      {/* START Client Routes */}
      <Route path="/client/dashboard" element={<ClientDashboard />} />
      <Route path="/client/profile" element={<ClientProfile />} />
      <Route path="/client/test/start" element={<ClientTestStart />} />
      <Route path="/client/quiz/:id" element={<ClientQuiz />} />
      {/* END Client Routes */}

      {/* START Admin Routes */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/category" element={<Category />} />
      <Route path="/test" element={<Test />} />
      <Route path="/all-user" element={<AllUser />} />
      <Route path="/user" element={<User />} />
      <Route path="/archive/:id" element={<Archive />} />
      <Route path="/employees" element={<Employees />} />
      <Route path="/address" element={<Address />} />
      <Route path="/profile" element={<Profile />} />

      <Route path="/inspector-admin" element={<InspectorAdmin />} />
      {/* END Admin Routes */}
    </Routes>
  );
}

export default App;
