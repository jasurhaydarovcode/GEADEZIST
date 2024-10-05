import { Logo } from '@/helpers/imports/images';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const sidebarItems = [
    {
      name: 'Boshqaruv paneli',
      pathName: 'dashboard'
    },
    {
      name: 'Kategoriya',
      pathName: 'category'
    },
    {
      name: 'Test',
      pathName: 'test'
    },
    {
      name: 'Foydalanuvchilar',
      pathName: 'all-user'
    },
    {
      name: 'Foydalanuvchilar natijasi',
      pathName: 'user'
    },
    {
      name: 'Hodimlar',
      pathName: 'employees'
    },
    {
      name: 'Manzil',
      pathName: 'address'
    }
  ];

  const { pathname } = useLocation();

  return (
    <aside className="bg-gray-100 w-72 p-4">
      {/* Logo */}
      <div className="pt-5 pb-8">
        <Link to="/dashboard">
          <img src={Logo} alt="GEADEZIST LOGO" />
        </Link>
      </div>

      <ul className="space-y-4">
        {sidebarItems.map((item, index) => (
          <Link
            key={index}
            to={`/${item.pathName}`}
            className={`${pathname === `/${item.pathName}` ? 'bg-gray-300' : ''} block px-4 py-5 bg-gray-100 text-gray-700 rounded shadow-xl border hover:bg-gray-400`}
          // className="block px-4 py-5 bg-gray-100 text-gray-700 rounded shadow-xl border hover:bg-gray-300"
          >
            {item.name}
          </Link>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
