import { getMeUser } from '@/helpers/api/baseUrl';
import { config } from '@/helpers/functions/token';
import { geodeziyaLogo } from '@/helpers/imports/images';
import { GetMeResponse } from '@/helpers/types/GetMetype';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaRegUser } from 'react-icons/fa';
import { IoExitOutline } from 'react-icons/io5';
import { useQuery, useQueryClient } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import LogoutModal from '@/components/Modal/LogoutModal';
import AOS from 'aos';
import EmailTooltip from '../Tooltip/EmailTooltip';
const Navbar: React.FC = () => {
  const queryClient = useQueryClient();
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false);
  const role = localStorage.getItem('role');

  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [getUser, setGetUser] = useState<GetMeResponse | null>(null);
  
  const getMe = useQuery({
    queryKey: ['getMe', config],
    queryFn: async () => {
      interface GetMeResponse {
        body: {
          fullName: string;
          email: string;
        };
      }
      const res = await axios.get<GetMeResponse>(getMeUser, config);
      return res.data?.body;
    },
    staleTime: 0, // Doim yangi ma'lumotni olish
    cacheTime: 0, // Cache-ni saqlamaslik
    onSuccess: (data) => {
      setGetUser(data);
    },
  });
  useEffect(() => {
    if (token) {
      queryClient.invalidateQueries('getMe');
    }
  }, [token]);

  const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/auth/SignIn');
    queryClient.invalidateQueries('getMe');
  };

  const toggleDropdown = () => {
    if (!getMe.isLoading) {
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  const openLogoutModal = () => {
    setIsLogoutModalOpen(true);
  };

  const closeLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };


  // async function getMe() {
  //   interface GetMeResponse {
  //     body: {
  //       // 'body' ichidagi xususiyatlar
  //       fullName: string;
  //       email: string;
  //       // boshqa kerakli xususiyatlar
  //     };
  //   }

  //   try {
  //     const res = await axios.get<GetMeResponse>(getMeUser, config);
  //     // Agar `body` `res.data` ichida bo'lsa, to'g'ri kiriting
  //     const data = res.data.body;  // GetMeResponse turini tekshirish shart emas
  //     setGetUser(data); // `setGetUser` funksiyasida noto'g'ri ma'lumot berilmasligini tekshiring
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
  

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key) {
        setIsDropdownOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);

  return (
    <nav className="bg-white  border-b shadow p-6 flex justify-end items-center">
      <div className="flex justify-between items-center">
        <div
          className={`relative ${getMe.isLoading ? 'pointer-events-none opacity-50' : ''
            }`}
          onClick={toggleDropdown}
        >
          <div className="flex gap-4 items-center cursor-pointer">
            <div>
              <h1 className="text-gray-500 mr-2 text-md font-semibold">
                {getUser?.fullName}
              </h1>
              <span>
                {getMe.isLoading
                  ? 'Loading...'
                  : (role === 'ROLE_SUPER_ADMIN' && 'super admin') ||
                  (role === 'ROLE_TESTER' && 'tester') ||
                  (role === 'ROLE_USER' && 'client') ||
                  (role === 'ROLE_ADMIN' && 'admin (tekshiruvchi)')}
              </span>
            </div>
            <div>
              <img
                src={geodeziyaLogo}
                alt="Admin logo"
                className="rounded-full w-10"
              />
            </div>
          </div>

          {isDropdownOpen && (
            <div className="absolute z-50 right-0 mt-2 w-56 bg-white border rounded-lg shadow-lg">
              <div className="p-4">
                <div className="font-bold">{getUser?.fullName}</div>

                {/* START TOOLTIP */}
                <EmailTooltip email={getUser?.email || ''} />
                {/* END TOOLTIP */}

              </div>
              <hr />
              <div>
                <Link to={'/profile'}>
                  <button
                    className={`flex items-center gap-2 w-full text-left hover:bg-gray-100 px-3 py-5 rounded ${getMe.isLoading ? 'pointer-events-none opacity-50' : ''
                      }`}
                    disabled={getMe.isLoading}
                  >
                    <FaRegUser />
                    Profil
                  </button>
                </Link>
                <button
                  className={`flex items-center gap-2 w-full text-left hover:bg-gray-100 px-3 py-5 rounded ${getMe.isLoading ? 'pointer-events-none opacity-50' : ''
                    }`}
                  onClick={openLogoutModal}
                  disabled={getMe.isLoading}
                >
                  <IoExitOutline />
                  Chiqish
                </button>
              </div>
            </div>
          )}
        </div>

        <LogoutModal
          isOpen={isLogoutModalOpen}
          onClose={closeLogoutModal}
          onLogout={logOut}
        />
      </div>
    </nav>
  );
};

export default Navbar;