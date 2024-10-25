import { getMeUser } from '@/helpers/api/baseUrl';
import { geodeziyaLogo, noImageClientDefaultImage, testerLogo } from '@/helpers/imports/images';
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

async function getToken() {
  const token = await localStorage.getItem('token');
  return token || '';
}

async function getConfig() {
  const token = await getToken();
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

const Navbar: React.FC = () => {
  const queryGet = useQueryClient();
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false);
  const role = localStorage.getItem('role');

  const navigate = useNavigate();
  const [getUser, setGetUser] = useState<GetMeResponse | null>(null);

  const getMe = useQuery({
    queryKey: ['getMe'],
    queryFn: async () => {
      const config = await getConfig();
      const res = await axios.get<GetMeResponse>(getMeUser, config);
      return res.data;
    },
    staleTime: 0,
    cacheTime: 0,
    enabled: !!localStorage.getItem('token'),
    onSuccess: (data) => {
      setGetUser(data);
    },
    onError: (error) => {
      if (error.response?.status === 403) {
        logOut();
      }
    },
  });

  useEffect(() => {
    queryGet.refetchQueries('getMe');
  }, [role, queryGet]);

  const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/auth/SignIn');
    queryGet.invalidateQueries('getMe');
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
    <nav className="bg-white border-b shadow p-6 flex justify-end items-center">
      <div className="flex justify-between items-center">
        <div
          className={`relative ${getMe.isLoading ? 'pointer-events-none opacity-50' : ''}`}
          onClick={toggleDropdown}
        >
          <div className="flex gap-4 items-center cursor-pointer">
            <div>
              <h1 className="text-gray-500 mr-2 text-md font-semibold">
                {getUser?.fullName && getUser.fullName.length > 20 ? getUser.fullName.substring(0, 15) + "..." : getUser?.fullName || 'Loading Name'}
              </h1>
              <span>
                {getMe.isLoading
                  ? 'Loading...'
                  : (role === 'ROLE_SUPER_ADMIN' && 'super admin') ||
                  (role === 'ROLE_TESTER' && 'tester') ||
                  (role === 'ROLE_CLIENT' && 'Foydalanuvchi') ||
                  (role === 'ROLE_ADMIN' && 'admin (tekshiruvchi)')}
              </span>
            </div>
            <div>
              <img
                src={(role === 'ROLE_TESTER' && testerLogo) || (role === 'ROLE_ADMIN' && testerLogo) || (role === 'ROLE_SUPER_ADMIN' && geodeziyaLogo) || (role === 'ROLE_CLIENT' && noImageClientDefaultImage)}
                alt="Admin logo"
                className="rounded-full w-10"
              />
            </div>
          </div>

          {isDropdownOpen && (
            <div className="absolute z-50 right-0 mt-2 w-56 bg-white border rounded-lg shadow-lg">
              <div className="px-4 ">
                <div className="font-bold">
                  {/* <Tooltip content={getUser?.fullName} style="light">
                    {getUser?.fullName && getUser.fullName.length > 20 ? getUser.fullName.substring(0, 20) + "..." : getUser?.fullName || 'Noma'}
                  </Tooltip> */}
                  <EmailTooltip email={getUser?.fullName || ''} />
                </div>

                <div className='pb-2'>
                  {/* START TOOLTIP */}
                  <EmailTooltip email={getUser?.email || ''} />
                  {/* END TOOLTIP */}
                </div>
              </div>
              <hr />
              <div>
                <Link to={role === 'ROLE_CLIENT' ? '/client/profile' : '/profile'}>
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
