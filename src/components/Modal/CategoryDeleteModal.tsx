import { useState } from 'react';
import { Modal, Button } from 'antd';
import { MdDelete } from 'react-icons/md';

function CategoryDeleteModal({
  categoryId,
  onDelete,
}: {
  categoryId: string;
  onDelete: (id: string) => void;
}) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    onDelete(categoryId); // Kategoriya o'chirish funksiyasi
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button className="cursor-pointer" onClick={showModal}>
        <MdDelete />
      </Button>
      <Modal
        title="Kategoriya o'chirish"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="O'chirish"
        cancelText="Yopish"
        centered
      >
        <p>Kategoriyani o'chirib tashlamoqchimisiz?</p>
      </Modal>
    </>
  );
}

export default CategoryDeleteModal;
