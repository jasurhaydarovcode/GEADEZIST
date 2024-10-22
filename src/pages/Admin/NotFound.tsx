import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronsLeft } from 'lucide-react';
import { Button } from 'antd';
import { Helmet } from 'react-helmet';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-[#848485]">
      <Helmet>
        <title>404 - Page Not Found</title>
      </Helmet>
      <div className="text-center">
        <h1 className="text-white text-5xl md:text-6xl lg:text-8xl font-mono font-bold">
          404
        </h1>
        <h2 className="text-white text-2xl md:text-3xl lg:text-4xl">
          Not Found
        </h2>

        <Button
          onClick={goBack}
          className="flex space-x-2 items-center mt-5 md:mt-7 lg:mt-10"
        >
          <ChevronsLeft className="h-5 w-5 md:h-6 md:w-6" />
          <span className="text-lg md:text-xl">Go Back</span>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;