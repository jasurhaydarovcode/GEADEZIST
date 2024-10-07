import { getMe } from '@/helpers/api/baseUrl';
import axios from 'axios';
import { AxiosResponse } from 'node_modules/axios/index.d.cts';
import Helmet from 'react-helmet';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate()
  function getUser():void {
    axios.get(getMe).then((res: AxiosResponse) => {
        
    })
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
