import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const role = localStorage.getItem('role');
   return (
    <div className="flex">
      {role !== 'ROLE_ADMIN' && <Sidebar />}
      <div className="flex-1">
        <Navbar />
        {/* <main>{children}</main> */}
        <main className="py-4">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
