// import { Helmet } from 'react-helmet';
// import { Link } from 'react-router-dom'; // Import Link from react-router-dom

// function NotFound() {
//   return (
//     <div>
//       <Helmet>
//         <title>404 - Page Not Found</title>
//       </Helmet>

//       <main className="h-screen w-full flex flex-col justify-center items-center bg-[#a8a9ac]">
//         <h1 className="text-9xl font-extrabold text-white tracking-widest">
//           404
//         </h1>
//         <div className="mt-8">
//           <Link to="/">
//             <button className="relative inline-block text-sm font-medium text-[#a8a9ac] group focus:outline-none rounded">
//               <span className="relative my-[100px] block px-[200px] py-3 bg-[#ffff] border border-current">
//                 Go Home
//               </span>
//             </button>
//           </Link>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default NotFound;

import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronsLeft } from "lucide-react"
import { Button } from "antd";


const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  }

  return (
    <div className="w-[100%] h-[100vh] flex justify-center items-center bg-[#848485]" >
      <div className="text-6xl font-mono font-bold">
        <h1 className="text-white">404</h1>
        <h2 className="text-white">Not Found</h2>
        <Button onClick={goBack} className="flex space-x-1 items-center mt-7">
          <ChevronsLeft className="h-4 w-4" />
          <h1 className="text-xl">Go Back</h1>
        </Button>
      </div>
    </div >
  )

}

export default NotFound
