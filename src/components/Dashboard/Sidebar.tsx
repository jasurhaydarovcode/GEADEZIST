import { Logo } from '@/helpers/imports/images';
import { useState } from 'react';
import { IoCloseOutline, IoMenu } from 'react-icons/io5';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const role = localStorage.getItem('role');
  const sidebarItems = [
    role === 'ROLE_SUPER_ADMIN' && {
      name: 'Boshqaruv paneli',
      pathName: 'dashboard',
    },
    (role === 'ROLE_SUPER_ADMIN' && {
      name: 'Kategoriya',
      pathName: 'category',
    }) ||
    (role === 'ROLE_TESTER' && {
      name: 'Kategoriya',
      pathName: 'category',
    }),
    (role === 'ROLE_SUPER_ADMIN' && {
      name: 'Test',
      pathName: 'test',
    }) ||
    (role === 'ROLE_TESTER' && {
      name: 'Test',
      pathName: 'test',
    }),
    role === 'ROLE_SUPER_ADMIN' && {
      name: 'Foydalanuvchilar',
      pathName: 'all-user',
    },
    role === 'ROLE_SUPER_ADMIN' && {
      name: 'Foydalanuvchilar natijasi',
      pathName: 'user',
    },
    role === 'ROLE_SUPER_ADMIN' && {
      name: 'Hodimlar',
      pathName: 'employees',
    },
    role === 'ROLE_SUPER_ADMIN' && {
      name: 'Manzil',
      pathName: 'address',
    },
  ].filter(Boolean);

  const { pathname } = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


  return (
    <div className=''>
      {/* Burger Menu Button for mobile view */}
      <button
        className="md:hidden bg-gray-100 rounded-xl m-3 p-3 fixed top-0 left-0 z-40"
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
        className={`fixed top-0 left-0 w-80 h-full bg-gray-100 px-4 py-8 transition-transform duration-300 ease-in-out max-md:z-40
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static`}
      >
        <button
          className="absolute top-4 right-4 text-3xl md:hidden"
          onClick={toggleSidebar}
        >
          <IoCloseOutline />
        </button>

        <Link to={'/dashboard'}>
          <img src={Logo} className="w-52" alt="Geodeziya Logo" />
        </Link>

        <ul className="mt-20 ">
          {sidebarItems.map((item, index) => (
            item && (
              <Link to={`/${item.pathName}`} key={index}>
                <li
                  className={
                    pathname === `/${item.pathName}`
                      ? 'shadow-xl bg-gray-300 text-white transition duration-150 py-5 mb-5'
                      : 'border shadow-xl transition duration-150 py-5 mb-5 hover:bg-gray-200 '
                  }
                >
                  <span className="p-4 text-xl text-gray-500">{item.name}</span>
                </li>
              </Link>
            )
          ))}
        </ul>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
