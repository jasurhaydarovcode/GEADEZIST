import { Helmet } from "react-helmet";

function NotFound() {
  return (
    <div>
      <Helmet>
        <title>404 - Page Not Found</title>
      </Helmet>

      <main className="h-screen w-full flex flex-col justify-center items-center bg-[#a8a9ac]">
        <h1 className="text-9xl font-extrabold text-white tracking-widest">404</h1>
      </main>
    </div>
  );
}

export default NotFound;
