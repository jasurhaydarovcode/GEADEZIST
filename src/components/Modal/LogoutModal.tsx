import React from 'react';
import { IoCloseOutline, IoExitOutline } from 'react-icons/io5';

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({
  isOpen,
  onClose,
  onLogout,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed z-[60] inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="flex justify-end">
          <button onClick={onClose} aria-label="Close">
            <IoCloseOutline className="text-3xl text-gray-500 hover:bg-gray-200 p-1 rounded-full transition duration-200" />
          </button>
        </div>
        <div className="flex justify-center my-4">
          <IoExitOutline className="text-red-500 text-6xl" />
        </div>
        <h2 className="text-lg font-semibold text-center text-gray-800 mb-6">
          Siz aniq tizimdan chiqmoqchimisiz?
        </h2>
        <div className="flex justify-around gap-4">
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md font-medium hover:bg-gray-400 transition duration-200"
            onClick={onClose}
          >
            Yopish
          </button>
          <button
            onClick={onLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-md font-medium hover:bg-red-600 transition duration-200"
          >
            Chiqish
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
