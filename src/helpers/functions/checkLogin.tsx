import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CheckLogin: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    
    if (!token) {
      navigate('/auth/SignIn');
    }
  }, [navigate,token]); // Faqat navigate dependencyda

  return null; // Agar bu komponentdan hech narsa render qilmasangiz
}

export default CheckLogin;
