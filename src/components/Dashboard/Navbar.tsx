import { getMeUser } from '@/helpers/api/baseUrl';
import { config } from '@/helpers/functions/token';
import { geodeziyaLogo } from '@/helpers/imports/images';
import { GetMeResponse } from '@/helpers/types/GetMetype';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaRegUser } from 'react-icons/fa';
import { IoCloseOutline, IoExitOutline } from 'react-icons/io5';
import { useQuery } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false);
  const role = localStorage.getItem('role');

  // ======= START Log out uchun button
  const navigate = useNavigate();
  function logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/auth/SignIn');
  }
  // ======= END Log out uchun button

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    if (!getMe.isLoading) {
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  // Open Logout Modal
  const openLogoutModal = () => {
    setIsLogoutModalOpen(true);
  };

  // Close Logout Modal
  const closeLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

  const getMe = useQuery({
    queryKey: ['getMe', config],
    queryFn: async (): Promise<any> => {
      const res = await axios.get(getMeUser, config);
      return res.data;
    },
  });

  const getMeData: GetMeResponse = getMe.data?.body;

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

  return (
    <nav className="bg-white border-b shadow p-6 flex justify-end items-center">
      <div className="flex justify-between items-center">
        {/* User section */}
        <div
          className={`relative ${
            getMe.isLoading ? 'pointer-events-none opacity-50' : ''
          }`} // Disable dropdown trigger while loading
          onClick={toggleDropdown}
        >
          <div className="flex gap-4 items-center cursor-pointer">
            <div>
              <h1 className="text-gray-500 mr-2 text-md font-semibold">
                {getMeData?.fullName}
              </h1>
              <span>
                {getMe.isLoading
                  ? 'Loading...'
                  : (role == 'ROLE_SUPER_ADMIN' && 'super admin') ||
                    (role == 'ROLE_TESTER' && 'tester') ||
                    (role == 'ROLE_USER' && 'client')}
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

          {/* Dropdown Modal */}
          {isDropdownOpen && (
            <div className="absolute z-50 right-0 mt-2 w-56 bg-white border rounded-lg shadow-lg">
              <div className="absolute z-10 right-0 mt-2 w-56 bg-white border rounded-lg shadow-lg">
                <div className="p-4">
                  <div className="font-bold">{getMeData.fullName}</div>
                  <div className="text-gray-500 text-sm">{getMeData.email}</div>
                </div>
                <hr />
                <div>
                  <Link to={'/profile'}>
                    <button
                      className={`flex items-center gap-2 w-full text-left hover:bg-gray-100 px-3 py-5 rounded ${
                        getMe.isLoading ? 'pointer-events-none opacity-50' : ''
                      }`}
                      disabled={getMe.isLoading}
                    >
                      <FaRegUser />
                      Profil
                    </button>
                  </Link>
                  <button
                    className={`flex items-center gap-2 w-full text-left hover:bg-gray-100 px-3 py-5 rounded ${
                      getMe.isLoading ? 'pointer-events-none opacity-50' : ''
                    }`}
                    onClick={openLogoutModal}
                    disabled={getMe.isLoading}
                  >
                    <IoExitOutline />
                    Chiqish
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Logout Confirmation Modal */}
        {isLogoutModalOpen && (
          <div className="fixed z-[11] inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-6 w-[450px]">
              <div className="flex justify-end items-center">
                <button onClick={closeLogoutModal}>
                  <IoCloseOutline className="text-2xl" />
                </button>
              </div>
              <div className="flex justify-center my-6">
                <IoExitOutline className="text-red-500 text-7xl" />
              </div>
              <h2 className="text-xl py-4 font-bold text-center">
                Siz aniq tizimdan chiqmoqchimisiz?
              </h2>
              <div className="flex justify-around">
                <button
                  className="bg-gray-400 text-white px-4 py-2 rounded-md"
                  onClick={closeLogoutModal}
                >
                  Yopish
                </button>
                <button
                  onClick={logOut}
                  className="bg-gray-400 text-white px-4 py-2 rounded-md"
                >
                  Ha
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
