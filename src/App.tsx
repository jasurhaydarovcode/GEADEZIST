import { Route, Routes } from 'react-router-dom';
import Home from '@/pages/Home';
import NotFound from '@/pages/NotFound';
import SignIn from '@/pages/Auth/SignIn';
import SignUp from '@/pages/Auth/SignUp';

// Font Family "Lato"
import '@fontsource/lato';
import '@fontsource/lato/400.css';
import '@fontsource/lato/400-italic.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />



      {/* START Authentication Routes */}
      <Route path="/auth/SignIn" element={<SignIn />} />
      <Route path="/auth/SignUp" element={<SignUp />} />
      {/* END Authentication Routes */}



    </Routes>
  );
}

export default App;
