import checkLogin from '@/helpers/functions/checkLogin';
import { useEffect } from 'react';
import Helmet from 'react-helmet';
import { useNavigate } from 'react-router-dom';

function Home() {
  checkLogin();
  const navigate = useNavigate();
  function checkRoleClient() {
    const role = localStorage.getItem('role');
    if (role == 'ROLE_CLIENT') {
      navigate('/client/dashboard');
    } else if (role == 'ROLE_SUPER_ADMIN') {
      navigate('/dashboard');
    } else if (role == 'ROLE_TESTER') {
      navigate('/category');
    }
  }
  useEffect(() => {
    checkRoleClient();
  }, [checkRoleClient]);
  return (
    <div>
      <Helmet>
        <title>Homepage</title>
      </Helmet>
      <div>Home</div>
    </div>
  );
}

export default Home;
