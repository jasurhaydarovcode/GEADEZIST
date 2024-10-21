import { getMeUser } from '@/helpers/api/baseUrl';
import { noImageClientDefaultImage } from '@/helpers/imports/images';
import { GetMeResponse } from '@/helpers/types/GetMetype';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaRegUser } from 'react-icons/fa';
import { IoExitOutline } from 'react-icons/io5';
import { useQuery, useQueryClient } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import LogoutModal from '@/components/Modal/LogoutModal';
import EmailTooltip from '../Tooltip/EmailTooltip';

// Tokenni asinxron tarzda olish funksiyasi
async function getToken() {
  const token = await localStorage.getItem('token');
  return token ? token : '';
}

// Tokenni config ichiga joylash funksiyasi
async function getConfig() {
  const token = await getToken();
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

const Navbar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const role = localStorage.getItem('role');

  // Log out function
  const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/auth/SignIn');
    queryClient.invalidateQueries('getMe'); // Keshlangan ma'lumotlarni o'chirish
  };

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

  // GetMe ma'lumotlarini olish
  const getMe = useQuery({
    queryKey: ['getMe'], // configni queryKey-dan olib tashladik, token dinamik ishlatiladi
    queryFn: async () => {
      const config = await getConfig(); // Yangilangan config bilan so'rov yuborish
      const res = await axios.get(getMeUser, config);
      return res.data.body;
    },
    staleTime: 0, // Ma'lumotni doim yangilash
    cacheTime: 0, // Cache-ni saqlamaslik
    enabled: !!localStorage.getItem('token'), // Token mavjud bo'lganda faqat so'rovni ishga tushiradi
  });

  const getMeData: GetMeResponse = getMe.data;
  console.log(getMeData);

  // Keyboard hodisasi bilan dropdownni yopish
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
            <div
              className="flex justify-end gap-4 items-center cursor-pointer"
              onClick={toggleDropdown}
            >
              <div>
                <h1 className="text-gray-500 mr-2 text-md font-semibold">
                  {getMe.isLoading
                    ? 'Loading...'
                    : `${getMeData?.fullName} ${role === 'ROLE_SUPER_ADMIN'
                      ? '(super admin)'
                      : role === 'ROLE_TESTER'
                        ? '(tester)'
                        : role === 'ROLE_USER'
                          ? '(client)'
                          : ''
                    }`}
                </h1>
                <p>Foydalanuvchi</p>
              </div>
              <div>
                <img
                  src={noImageClientDefaultImage}
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

                  {/* START TOOLTIP */}
                  <EmailTooltip email={getMeData?.email || ''} />
                  {/* END TOOLTIP */}

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
          <LogoutModal
            isOpen={isLogoutModalOpen}
            onClose={closeLogoutModal}
            onLogout={logOut}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
