import { Logo } from '@/helpers/imports/images';
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
  ];

  const { pathname } = useLocation();

  return (
    <aside className="bg-gray-100 w-72 p-4 min-h-screen">
      {/* Logo */}
      <div className="pt-5 pb-8">
        <Link to="/dashboard">
          <img src={Logo} alt="GEADEZIST LOGO" />
        </Link>
      </div>

      <ul className="space-y-4">
        {sidebarItems.map(
          (item, index) =>
            item &&
            typeof item !== 'boolean' && (
              <Link
                key={index}
                to={`/${item.pathName}`}
                className={`${pathname === `/${item.pathName}` ? 'bg-gray-300' : ''} block px-4 py-5 bg-gray-100 text-gray-700 rounded shadow-xl border hover:bg-gray-400`}
              >
                {item.name}
              </Link>
            ),
        )}
      </ul>
    </aside>
  );
};

export default Sidebar;
