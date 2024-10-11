import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronsLeft } from "lucide-react"
import { Button } from "antd";
import { Helmet } from "react-helmet";


const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  }

  return (
    <div className="w-[100%] h-[100vh] flex justify-center items-center bg-[#848485]" >
     <Helmet>
        <title>404 - Page Not Found</title>
      </Helmet>
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
