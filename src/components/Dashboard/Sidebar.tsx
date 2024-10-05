import { Logo } from '@/helpers/imports/images';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const sidebarItems = [
    'Boshqaruv paneli',
    'Kategoriya',
    'Test',
    'Foydalanuvchilar',
    'Foydalanuvchilar natijasi',
    'Hodimlar',
    'Manzil',
  ];

  const { pathname } = useLocation();

  return (
    <aside className="bg-gray-100 w-72 p-4 h-screen">
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
            to={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
            className={`${pathname === `/${item.toLowerCase().replace(/\s+/g, '-')}` ? 'bg-gray-300' : ''} block px-4 py-5 bg-gray-100 text-gray-700 rounded shadow-xl border hover:bg-gray-400`}
            // className="block px-4 py-5 bg-gray-100 text-gray-700 rounded shadow-xl border hover:bg-gray-300"
          >
            {item}
          </Link>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
