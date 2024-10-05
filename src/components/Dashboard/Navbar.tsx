import { geodeziyaLogo } from '@/helpers/imports/images';
import { useEffect, useState } from 'react';
import { FaRegUser } from 'react-icons/fa';
import { IoCloseOutline, IoExitOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Open Logout Modal
  const openLogoutModal = () => {
    setIsLogoutModalOpen(true);
  };

  // Close Logout Modal
  const closeLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

  useEffect(() => {
    // Klaviatura tugmasi bosilganda ishlovchi funksiya
    const handleKeyPress = (event: KeyboardEvent) => {
      if(event.key){
        setIsDropdownOpen(false)
      }
    };

    // Window elementiga klaviatura hodisasini ulaymiz
    window.addEventListener('keydown', handleKeyPress);

    // Cleanup function: komponent o'chirilganda hodisani olib tashlaymiz
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <nav className="bg-white border-b shadow p-6 flex justify-end items-center">
      <div className="flex justify-between items-center">

        {/* User section */}
        <div className="relative" onClick={toggleDropdown}>
          <div className="flex gap-4 items-center cursor-pointer">
            <div>
              <h1 className='text-gray-500 mr-2 text-md font-semibold'>admin admin</h1>
              <span>super admin</span>
            </div>
            <div>
              <img src={geodeziyaLogo} alt="Admin logo" className="rounded-full w-10" />
            </div>
          </div>

          {/* Dropdown Modal */}
          {isDropdownOpen &&
            <div className="absolute z-50 right-0 mt-2 w-56 bg-white border rounded-lg shadow-lg">
              <div className="absolute z-10 right-0 mt-2 w-56 bg-white border rounded-lg shadow-lg">
                <div className="p-4">
                  <div className="font-bold">Admin Admin</div>
                  <div className="text-gray-500 text-sm">example@gmail.com</div>
                </div>
                <hr />
                <div>
                  <Link to={"/profile"}>
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
            </div>
          }
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
              <h2 className="text-xl py-4 font-bold text-center">Siz aniq tizimdan chiqmoqchimisiz?</h2>
              <div className="flex justify-around">
                <button
                  className="bg-gray-400 text-white px-4 py-2 rounded-md"
                  onClick={closeLogoutModal}
                >
                  Yopish
                </button>
                <button className="bg-gray-400 text-white px-4 py-2 rounded-md">
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
