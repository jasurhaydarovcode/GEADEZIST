import { useRef, useState } from 'react';
import { Button, Modal, Input, Select, notification } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import { baseUrl } from '@/helpers/api/baseUrl';

const { Option } = Select;

interface CategoryAddModalProps {
  onAddCategory: (newCategory: any) => void;
}

const CategoryAddModal: React.FC<CategoryAddModalProps> = ({ onAddCategory }) => {
  const formRef = useRef({
    name: '',
    description: '',
    questionCount: 0,
    extraQuestionCount: 0,
    durationTime: 0,
    retakeDate: 0,
    fileId: 0,
    main: true,
  });

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    formRef.current = {
      name: '',
      description: '',
      questionCount: 0,
      extraQuestionCount: 0,
      durationTime: 0,
      retakeDate: 0,
      fileId: 0,
      main: false,
    };
  };

  const handleSave = async () => {
    setLoading(true);
    axios
      .post(`${baseUrl}category`, formRef.current, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        onAddCategory(response.data);
        notification.success({
          message: "Kategoriya muvaffaqiyatli qo'shildi",
        });
        resetForm();
        setOpen(false);
      })
      .catch((error) => {
        console.error('Xatolik:', error);
        notification.error({
          message: 'Xatolik yuz berdi',
          description: "Kategoriya qo'shishda xatolik yuz berdi, iltimos qayta urinib ko'ring",
        });
      })
    //   .finally(() => {
    //     setLoading(false);
    //   }) as Promise<void>;
  };

  const handleCancel = () => {
    resetForm();
    setOpen(false);
  };

  const InputStyles = {
    input: 'w-full rounded-lg border',
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} className="text-xl bg-black text-white px-5 py-6 my-5">
        <PlusCircleOutlined className="text-xl" /> Qo'shish
      </Button>
      <Modal
        title="Kategoriya qo'shish"
        centered
        open={open}
        onOk={handleSave}
        onCancel={handleCancel}
        width={600}
        okText="Saqlash"
        cancelText="Yopish"
        confirmLoading={loading}
        maskClosable={false}
      >
        <div className="space-y-4">
          <div>
            <label className="block mb-2">Kategoriya Nomi</label>
            <Input
              className={InputStyles.input}
              placeholder="Kategoriya nomini kiriting"
              defaultValue={formRef.current.name}
              onChange={(e) => (formRef.current.name = e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-2">Tavsif</label>
            <Input
              className={InputStyles.input}
              placeholder="Tavsifni kiriting"
              defaultValue={formRef.current.description}
              onChange={(e) => (formRef.current.description = e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-2">Umumiy Savollar</label>
            <Input
              className={InputStyles.input}
              type="number"
              placeholder="Umumiy savollar sonini kiriting"
              defaultValue={formRef.current.questionCount}
              onChange={(e) => (formRef.current.questionCount = Number(e.target.value))}
              min="0"
            />
          </div>
          <div>
            <label className="block mb-2">Qo'shimcha savollar</label>
            <Input
              className={InputStyles.input}
              type="number"
              placeholder="Qo'shimcha savollar sonini kiriting"
              defaultValue={formRef.current.extraQuestionCount}
              onChange={(e) => (formRef.current.extraQuestionCount = Number(e.target.value))}
              min="0"
            />
          </div>
          <div>
            <label className="block mb-2">Davomiylik (daqiqa)</label>
            <Input
              className={InputStyles.input}
              type="number"
              placeholder="Davomiylik (daqiqa)"
              defaultValue={formRef.current.durationTime}
              onChange={(e) => (formRef.current.durationTime = Number(e.target.value))}
              min="0"
            />
          </div>
          <div>
            <label className="block mb-2">Qayta qabul qilish sanasi</label>
            <Input
              className={InputStyles.input}
              type="number"
              placeholder="Qayta qabul qilish sanasi"
              defaultValue={formRef.current.retakeDate}
              onChange={(e) => (formRef.current.retakeDate = Number(e.target.value))}
              min="0"
            />
          </div>
          <div>
            <label className="block mb-2">Asosiy Kategoriya</label>
            <Select
              value={formRef.current.main ? 'asosiy' : 'asosiy-bolmagan'}
              onChange={(value) => (formRef.current.main = value === 'asosiy')}
              className="w-full"
            >
              <Option value="asosiy">Asosiy</Option>
              <Option value="asosiy-bolmagan">Asosiy bo'lmagan</Option>
            </Select>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CategoryAddModal;
