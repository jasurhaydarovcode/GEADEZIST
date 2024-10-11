// components/PreviewOverlay.tsx
import React from 'react';
import { IoEyeOutline } from 'react-icons/io5';

interface PreviewOverlayProps {
  children?: React.ReactNode;
}

const PreviewOverlay: React.FC<PreviewOverlayProps> = ({ children }) => {
  return (
    <div className="gap-2 absolute top-0 left-0 w-full h-full bg-black bg-opacity-25 text-white text-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md">
      <IoEyeOutline className="mr-1" /> Preview
      {children}
    </div>
  );
};

export default PreviewOverlay;
