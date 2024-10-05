import { useState } from 'react';
import { FaRegUser } from 'react-icons/fa';
import { IoExitOutline } from 'react-icons/io5';

const Navbar: React.FC = () => {
  // State to control dropdown visibility
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Function to toggle dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="bg-white shadow p-4 relative">
      {/* Navbar content here */}
      <div className="flex justify-between items-center">
        <div></div>

        {/* User section */}
        <div className="relative">
          <div className="flex gap-4 items-center cursor-pointer" onClick={toggleDropdown}>
            <div>
              <div>Foydalan Foydalaniyev</div>
              <span>foydalanuvchi</span>
            </div>
            <div>
              <img src="path-to-user-image" alt="User" className="rounded-full w-10" />
            </div>
          </div>

          {/* Dropdown Modal */}
          {isDropdownOpen && (
            <div className="absolute z-10 right-0 mt-2 w-56 bg-white border rounded-lg shadow-lg">
              <div className="p-4">
                <div className="font-bold">Foydalan Foydalaniyev</div>
                <div className="text-gray-500 text-sm">foydalanibqol@gmail.com</div>
              </div>
              <hr />
              <div>
                <button className="flex items-center gap-2 w-full text-left hover:bg-gray-100 px-3 py-5 rounded">
                  <FaRegUser />
                  Profil
                </button>
                <button className="flex items-center gap-2 w-full text-left hover:bg-gray-100 px-3 py-5 rounded">
                  <IoExitOutline />
                  Chiqish
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
