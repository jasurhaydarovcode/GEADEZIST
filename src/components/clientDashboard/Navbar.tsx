import { getMeUser } from '@/helpers/api/baseUrl';
import { config } from '@/helpers/functions/token';
import { noImageClientDefaultImage } from '@/helpers/imports/images';
import { GetMeResponse } from '@/helpers/types/GetMetype';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaRegUser } from 'react-icons/fa';
import { IoCloseOutline, IoExitOutline } from 'react-icons/io5';
import { useQuery } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  // Log out function
  function logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/auth/SignIn');
  }

  // Dropdown toggle
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
  console.log(getMeData);
  

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
    <div className="bg-white pr-8 relative">
      <div className="bg-white p-4 relative">
        <div className="flex justify-end items-center">
          {/* User section */}
          <div>
            <div className="flex justify-end gap-4 items-center cursor-pointer" onClick={toggleDropdown}>
              <div>
                <h1 className="text-gray-500 mr-2 text-md font-semibold">
                  {getMe.isLoading
                    ? 'Loading...'
                    : `${getMeData?.fullName} ${role === 'ROLE_SUPER_ADMIN' ? '(super admin)' : role === 'ROLE_TESTER' ? '(tester)' : role === 'ROLE_USER' ? '(client)' : ''}`}
                </h1>
              </div>
              <div>
                <img
                  src={noImageClientDefaultImage}
                  // src={getMeData?.profileImage ? getMeData?.profileImage : noImageClientDefaultImage}
                  alt="Admin logo"
                  className="rounded-full w-10"
                />
              </div>
            </div>


            {/* Dropdown Modal */}
            {isDropdownOpen && (
              <div className="absolute z-50 right-0 mt-2 w-56 bg-white border rounded-lg shadow-lg">
                <div className="p-4">
                  <div className="font-bold">{getMeData?.fullName}</div>
                  <div className="text-gray-500 text-sm">{getMeData?.email}</div>
                </div>
                <hr />
                <div>
                  <Link to="/client/profile">
                    <button className="flex items-center gap-2 w-full text-left hover:bg-gray-100 px-3 py-5 rounded">
                      <FaRegUser />
                      Profil
                    </button>
                  </Link>
                  <button
                    className="flex items-center gap-2 w-full text-left hover:bg-gray-100 px-3 py-5 rounded"
                    onClick={openLogoutModal}
                  >
                    <IoExitOutline />
                    Chiqish
                  </button>
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
                  <button onClick={logOut} className="bg-gray-400 text-white px-4 py-2 rounded-md">
                    Ha
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
