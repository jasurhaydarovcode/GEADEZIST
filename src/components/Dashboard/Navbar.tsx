import { geodeziyaLogo } from '@/helpers/imports/images';

const Navbar = () => {
  return (
    <nav className="bg-white border-b shadow p-6 flex justify-between items-center">
      <div className="text-lg font-bold"></div>
      <div className="flex items-center space-x-4">
        <button className="p-2">
          <div className="text-gray-500">
            <div className="mr-2 text-md font-semibold">admin admin</div>
            <div className="mr-2">super admin</div>
          </div>
        </button>
        <img
          src={geodeziyaLogo}
          alt="Profile"
          className="w-12 h-12 rounded-full"
        />
      </div>
    </nav>
  );
};

export default Navbar;
