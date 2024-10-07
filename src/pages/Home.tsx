import Helmet from 'react-helmet';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  if(!token){
    navigate('/auth/SignIn')
  }
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
