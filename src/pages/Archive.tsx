import { useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';

function Archive() {
  const navigate = useNavigate();
  const checkRoleClient = useCallback(() => {
    const role = localStorage.getItem('role');
    if (role == 'ROLE_CLIENT') {
      navigate('/client/dashboard');
    }
  }, [navigate]);

  useEffect(() => {
    checkRoleClient();
  }, [checkRoleClient]);

  return (
    <div>
      <Helmet>
        <title>Arxiv</title>
      </Helmet>

      <div>
        Archive
      </div>
    </div>
  );
}

export default Archive;
