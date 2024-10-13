import { useState } from 'react';
import { Logo } from '@/helpers/imports/images';
import { Link, useLocation } from 'react-router-dom';
import { IoMenu, IoCloseOutline } from 'react-icons/io5'; // Icons for burger menu
import path from 'path';

const Sidebar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const clientSidebarItems = [
    {
      label: 'Boshqaruv paneli',
      path: '/client/dashboard',
    },
    {
      label: 'Test',
      path: '/client/test/start',
    },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const { pathname } = useLocation();

  return (
    <>
      {/* Burger Menu Button for mobile view */}
      <button
        className="md:hidden p-4 fixed top-0 left-0 z-50"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? (
          <IoCloseOutline className="text-3xl" />
        ) : (
          <IoMenu className="text-3xl" />
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 w-80 h-full bg-gray-100 px-4 py-8 transition-transform duration-300 ease-in-out z-50 
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static`}
      >
        {/* Close Button (only visible on mobile) */}
        <button
          className="absolute top-4 right-4 text-3xl md:hidden"
          onClick={toggleSidebar}
        >
          <IoCloseOutline />
        </button>

        <Link to={'/client/dashboard'}>
          <img src={Logo} className="w-52" alt="Geodeziya Logo" />
        </Link>

        {/* Client Sidebar content */}
        <ul className="mt-20">
          {clientSidebarItems.map((item, index) => (
            <Link to={item.path} key={index}>
              <li
                className={
                  pathname === item.path
                    ? 'shadow-xl hover:shadow-2xl bg-gray-300 text-white transition duration-150 py-5 mb-5'
                    : 'border shadow-xl hover:shadow-2xl transition duration-150 py-5 mb-5'
                }
              >
                <span className="p-4 text-xl text-gray-500">{item.label}</span>
              </li>
            </Link>
          ))}
        </ul>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
