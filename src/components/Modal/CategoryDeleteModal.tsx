import { useState } from 'react';
import { Modal, message } from 'antd';
import { MdDelete } from 'react-icons/md';
import { showErrorMessage } from '@/helpers/functions/message';

interface DeleteButtonProps {
  item: {
    id: number;
    deleted: boolean;
  };
  handleDeleteCategory: (id: number) => void;
}

const DeleteButton = ({ item, handleDeleteCategory }: DeleteButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showDeleteModal = () => {
    if (!item.deleted) {
      setIsModalOpen(true);
    } else {
      showErrorMessage("Bu kategoriya o'chirilgan, uni o'chirish mumkin emas.");
    }
  };

  const handleOk = () => {
    handleDeleteCategory(item.id);
    setIsModalOpen(false);
    message.success("Kategoriya muvaffaqiyatli o'chirildi!");
  };

  const handleCancel = () => setIsModalOpen(false);

  return (
    <>
      <button className="hover:text-red-600" onClick={showDeleteModal}>
        <MdDelete className="text-[24px] duration-300" />
      </button>

      <Modal
        title="Kategoriya o'chirish"
        open={isModalOpen} 
        onOk={handleOk}
        onCancel={handleCancel} 
        okText="O'chirish"
        cancelText="Bekor qilish"
        centered
        okButtonProps={{ danger: true }}
      >
        <p>Kategoriyani o'chirish nima foyda beradi senga ?</p>
      </Modal>
    </>
  );
};

export default DeleteButton;
