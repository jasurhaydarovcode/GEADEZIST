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
    <div className="fixed z-[60] inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[450px]">
        <div className="flex justify-end items-center">
          <button onClick={onClose}>
            <IoCloseOutline className="text-3xl hover:bg-gray-300 rounded-md hover:text-gray-50 animatsiyaHover" />
          </button>
        </div>
        <div className="flex justify-center my-6">
          <IoExitOutline className="text-red-500 text-7xl" />
        </div>
        <h2 className="text-xl py-4 font-bold text-center">
          Siz aniq tizimdan chiqmoqchimisiz?
        </h2>
        <div className="flex justify-around">
          <button
            className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 animatsiyaHover"
            onClick={onClose}
          >
            Yopish
          </button>
          <button
            onClick={onLogout}
            className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 animatsiyaHover"
          >
            Chiqish
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
