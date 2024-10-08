import checkLogin from '@/helpers/functions/checkLogin';
import Helmet from 'react-helmet';

function Home() {
  checkLogin()
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
