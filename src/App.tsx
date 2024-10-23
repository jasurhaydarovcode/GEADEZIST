import { Route, Routes, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';


// lato font family
import '@fontsource/lato';
import '@fontsource/lato/400.css';
import '@fontsource/lato/400-italic.css';

import SiteLoading from './components/SiteLoading';
import PrivateRoute from './components/security/route/PrivateRoute';
import PublicRoute from './components/security/route/PublicRoute';

// Pages
import {
  Home, NotFound, SignIn, SignUp, Offer, Confirm, ResetPassword,
  ClientDashboard, ClientProfile, ClientTestStart, ClientQuiz,
  Dashboard, Test, AllUser, User, Archive, Employees, InspectorAdmin,
  Category, Profile, ConfirmSignUp, TestVisual
} from './pages';
import ClientQuizResult from './pages/Client/ClientResultPage';
import { render } from 'react-dom';   
import Address from './pages/Admin/Address';

function App() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 200);
    return () => clearTimeout(timer);
  }, [location]);

  const renderRoute = (path: string, Component: React.FC, isPrivate: boolean = true) => {
    const RouteWrapper = isPrivate ? PrivateRoute : PublicRoute;
    return (
      <Route
        path={path}
        element={
          <RouteWrapper>
            <Component />
          </RouteWrapper>
        }
      />
    );
  };

  return (
    <>
      {loading && <SiteLoading />}
      <Routes>
        {renderRoute("/", Home)}
        <Route path="*" element={<NotFound />} />

        {/* Authentication Routes */}
        {renderRoute("/auth/SignIn", SignIn, false)}
        {renderRoute("/auth/SignUp", SignUp, false)}
        {renderRoute("/auth/confirm", Confirm, false)}
        {renderRoute("/auth/confirm-signup", ConfirmSignUp, false)}
        {renderRoute("/auth/reset-password", ResetPassword, false)}
        {renderRoute("/auth/offer", Offer, false)}

        {/* Protected Client Routes */}
        {renderRoute("/client/dashboard", ClientDashboard)}
        {renderRoute("/client/quiz/result", ClientQuizResult)}
        {renderRoute("/client/profile", ClientProfile)}
        {renderRoute("/client/test/start", ClientTestStart)}
        {renderRoute("/client/quiz/:id", ClientQuiz)}

        {/* Protected Admin Routes */}
        {renderRoute("/dashboard", Dashboard)}
        {renderRoute("/category", Category)}
        {renderRoute("/test", Test)}
        {renderRoute("/tests", TestVisual)}
        {renderRoute("/all-user", AllUser)}
        {renderRoute("/user", User)}
        {renderRoute("/archive/:resultId", Archive)}
        {renderRoute("/employees", Employees)}
        {renderRoute("/profile", Profile)}
        {renderRoute("/address", Address)}
        {renderRoute("/inspector-admin", InspectorAdmin)}
      </Routes>
    </>
  );
}

export default App;
