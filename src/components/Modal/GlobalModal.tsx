import React, { ReactNode } from 'react';

interface GlobalModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const GlobalModal: React.FC<GlobalModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl">
        <button onClick={onClose} className="float-right text-gray-600 hover:text-gray-800">
          &times;
        </button>
        <div className="clear-both">
          {children}
        </div>
      </div>
    </div>
  );
};

export default GlobalModal;