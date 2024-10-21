import { loginUrl } from '@/helpers/api/baseUrl';
import { registerRasm } from '@/helpers/imports/images';
import { Logo } from '@/helpers/imports/images';
import axios, { AxiosResponse } from 'axios';
import { useEffect, useRef, useCallback } from 'react';
import { useMutation } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import { message } from 'antd';
function SignIn() {
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const checkRoleClient = useCallback(() => {
    const role = localStorage.getItem('role');
    if (
      (role === 'ROLE_SUPER_ADMIN' && localStorage.getItem('token')) ||
      (role === 'ROLE_TESTER' && localStorage.getItem('token'))
    ) {
      // navigate('/dashboard');
    } else if (role === 'ROLE_CLIENT' && localStorage.getItem('token')) {
      navigate('/client/dashboard');
    } else if (role === 'ROLE_ADMIN' && localStorage.getItem('token')) {
      navigate('/all-user');
    } else {
      navigate('/auth/SignIn'); 
    }
  }, [navigate]);

  function handleCheckPassword() {
    if (password.current) {
      password.current.type = password.current.type === 'password' ? 'text' : 'password';
    }
  }

  useEffect(() => {
    checkRoleClient();
  }, [checkRoleClient]);

  const login = useMutation({
    mutationFn: async () => {
      const data = {
        email: email.current?.value,
        password: password.current?.value,
      };
      const res = await axios.post(loginUrl, data);
      return res;
    },
    onSuccess: (res: AxiosResponse) => {
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);
      if (res.data.role === 'ROLE_SUPER_ADMIN' ) {
        navigate('/dashboard');
      }else if(res.data.role === 'ROLE_ADMIN'){
        navigate('/user');
      } else if (res.data.role === 'ROLE_TESTER') {
        navigate('/category');
      } else if (res.data.role === 'ROLE_CLIENT') {
        navigate('/client/dashboard');
      }
      message.success('Tizimga kirish muvaffaqiyatli', 2);
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        if (email.current?.value === '' || password.current?.value === '') {
          message.warning("Email va parolni to'liq kiriting");
        } else {
          message.warning("Email yoki parol noto'g'ri");
        }
      }
    },
  });

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      login.mutate();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="flex flex-col lg:flex-row w-full max-w-6xl bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Rasm qismi */}
        <div className="lg:w-2/5 w-full flex flex-col items-center justify-center bg-gray-50 p-8">
          <img src={Logo} alt="Logo" className="w-32 lg:w-48 mb-6 lg:mb-12" />
          <div className="w-48 lg:w-64">
            <img src={registerRasm} alt="Phone Illustration" className="object-contain" />
          </div>
        </div>
        {/* Form qismi */}
        <div className="flex justify-center items-center w-full lg:w-3/5 p-6 lg:p-12">
          <div className="w-full max-w-md">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-6 text-center">
              Tizimga kirish
            </h2>
            <form>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Elektron pochta
                </label>
                <input
                  ref={email}
                  type="email"
                  onKeyDown={handleEnter}
                  id="email"
                  placeholder="Elektron pochtangizni kiriting"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                  Parol
                </label>
                <input
                  ref={password}
                  type="password"
                  onKeyDown={handleEnter}
                  id="password"
                  placeholder="Parolni kiriting"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200"
                />
                <div className="flex items-center mt-3">
                  <input
                    type="checkbox"
                    onClick={handleCheckPassword}
                    id="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="checkbox" className="ml-2 block text-sm text-gray-700">
                    Parolni ko'rsatish
                  </label>
                </div>
                <small className="text-gray-500 mt-2 block">
                  Parol kamida 5 ta harf yoki raqamdan iborat bo'lishi kerak
                </small>
              </div>
              <button
                onClick={() => login.mutate()}
                type="button"
                className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition duration-200"
              >
                Tizimga kirish
              </button>
            </form>
            <div className="flex justify-between items-center mt-6">
              <Link to="/auth/SignUp" className="text-sm text-blue-500 hover:underline">
                Ro'yhatdan o'tish
              </Link>
              <Link to="/auth/confirm" className="text-sm text-blue-500 hover:underline">
                Parolni unutdingizmi?
              </Link>
            </div>
          </div>
        </div>
      </div>  
    </div>
  );
}

export default SignIn;
