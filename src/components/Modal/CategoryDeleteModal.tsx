import { useState } from 'react';
import { Modal, message } from 'antd';
import { MdDelete } from 'react-icons/md';

interface DeleteButtonProps {
  item: {
    id: number;
    deleted: boolean;
  };
  handleDeleteCategory: (id: number) => void;
}

const DeleteButton = ({ item, handleDeleteCategory }: DeleteButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Modalni boshqarish uchun state

  const showDeleteModal = () => {
    if (!item.deleted) {
      setIsModalOpen(true); // Modalni ochish
    } else {
      message.error("Bu kategoriya o'chirilgan, uni o'chirish mumkin emas.");
    }
  };

  const handleOk = () => {
    handleDeleteCategory(item.id); // Kategoriya o'chirish
    setIsModalOpen(false); // Modalni yopish
    message.success("Kategoriya muvaffaqiyatli o'chirildi!"); // Muvaffaqiyatli xabar
  };

  const handleCancel = () => setIsModalOpen(false); // Modalni yopish

  return (
    <>
      <button className="hover:text-red-600" onClick={showDeleteModal}>
        <MdDelete className="text-[24px] duration-300" />
      </button>

      <Modal
        title="Kategoriya o'chirish"
        open={isModalOpen} // Modal holati
        onOk={handleOk} // O'chirish tasdiqlanganda
        onCancel={handleCancel} // Bekor qilinsa
        okText="O'chirish"
        cancelText="Bekor qilish"
        centered
        okButtonProps={{ danger: true }}
      >
        <p>Kategoriyani o'chirib tashlamoqchimisiz?</p>
      </Modal>
    </>
  );
};

export default DeleteButton;
