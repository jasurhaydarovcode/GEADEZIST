import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function NotFound() {
  return (
    <div>
      <Helmet>
        <title>404 - Page Not Found</title>
      </Helmet>

      <main className="h-screen w-full flex flex-col justify-center items-center bg-[#a8a9ac]">
        <h1 className="text-9xl font-extrabold text-white tracking-widest">
          404
        </h1>
        <p className="bg-[#ffff] text-[#a8a9ac] px-2 text-sm rounded rotate-12 absolute">
          Page Not Found
        </p>
        <div className="mt-8">
          <Link to="/">
            <button className="relative inline-block text-sm font-medium text-[#a8a9ac] group focus:outline-none rounded">
              <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#ffffff] "></span>
              <span className="relative my-[100px] block px-[200px] py-3 bg-[#ffff] border border-current">
                Go Home
              </span>
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default NotFound;
