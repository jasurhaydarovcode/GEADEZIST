import { useState } from 'react';
import { Button, Modal, Input, Select } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useMutation, useQueryClient } from 'react-query'; // Ma'lumotlarni jo'natish uchun React Query ishlatyapmiz
import axios from 'axios';
import { baseUrl } from '@/helpers/api/baseUrl';

const { Option } = Select;

interface CategoryAddModalProps {
  onAddCategory: (newCategory: any) => void;
}

const CategoryAddModal: React.FC<CategoryAddModalProps> = ({ onAddCategory }) => {
  // Form qiymatlarini boshqarish uchun useState ishlatyapmiz
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    questionCount: 0,
    extraQuestionCount: 0,
    durationTime: 0,
    retakeDate: 0,
    fileId: 0,
    main: false, // Asosiy kategoriya uchun boshlang'ich qiymat true
  });

  const [open, setOpen] = useState(false);
//   const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();

  // React Query orqali POST so'rovini bajaryapmiz
  const mutation = useMutation(
    async (newCategory: any) => {
      const response = await axios.post(`${baseUrl}category`, newCategory, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data; // To'g'ridan-to'g'ri response ni emas, balki response.data ni qaytaradi
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries('categories'); // Kategoriyalarni yangilash
        console.log('Kategoriya muvaffaqiyatli qo\'shildi:', data);
      },
      onError: (error) => {
        console.error('Xatolik yuz berdi:', error);
      },
    }
  );

  // Formani tozalash funksiyasi
  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      questionCount: 0,
      extraQuestionCount: 0,
      durationTime: 0,
      retakeDate: 0,
      fileId: 0,
      main: true, // Yana asosiy bo'lishi uchun true qiymatga qaytariladi
    });
  };

  // Ma'lumotlarni saqlash uchun so'rov jo'natiladi
  const handleSave = () => {
    mutation.mutate(formData, {
      onSuccess: (data) => {
        onAddCategory(data); // Yangi kategoriyani ota-komponenta uzatish
        setOpen(false); // Modalni yopish
        resetForm(); // Formani tozalash
      }
    });
  };

  const handleCancel = () => {
    resetForm(); // Formani tozalash
    setOpen(false); // Modalni yopish
  };

  // Input uchun CSS class nomlari
  const InputStyles = {
    input: 'w-full rounded-lg border',
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} className="text-xl bg-black text-white py-6 my-5 rounded-lg hover:bg-gray-800 px-[40px] ml-[20px]">
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
        confirmLoading={mutation.isLoading} // Saqlanish jarayonida yuklanish holati
        maskClosable={false}
      >
        <div className="space-y-4">
        <div>
            <label className="block mb-2">Asosiy Kategoriya</label>
            <Select
              value={formData.main ? 'asosiy' : 'asosiy-bolmagan'}
              onChange={(value) => setFormData({ ...formData, main: value === 'asosiy' })}
              className="w-full"
            >
              <Option value="asosiy">Asosiy</Option>
              <Option value="asosiy-bolmagan">Asosiy bo'lmagan</Option>
            </Select>
          </div>

          <div>
            <label className="block mb-2">Kategoriya Nomi</label>
            <Input
              className={InputStyles.input}
              placeholder="Kategoriya nomini kiriting"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div>
            <label className="block mb-2">Tavsif</label>
            <Input
              className={InputStyles.input}
              placeholder="Tavsifni kiriting"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
          <div>
            <label className="block mb-2">Umumiy Savollar</label>
            <Input
              className={InputStyles.input}
              type="number"
              placeholder="Umumiy savollar sonini kiriting"
              value={formData.questionCount}
              onChange={(e) => setFormData({ ...formData, questionCount: Number(e.target.value) })}
              min="0"
            />
          </div>
          <div>
            <label className="block mb-2">Qo'shimcha savollar</label>
            <Input
              className={InputStyles.input}
              type="number"
              placeholder="Qo'shimcha savollar sonini kiriting"
              value={formData.extraQuestionCount}
              onChange={(e) => setFormData({ ...formData, extraQuestionCount: Number(e.target.value) })}
              min="0"
            />
          </div>
          <div>
            <label className="block mb-2">Davomiylik (daqiqa)</label>
            <Input
              className={InputStyles.input}
              type="number"
              placeholder="Davomiylik (daqiqa)"
              value={formData.durationTime}
              onChange={(e) => setFormData({ ...formData, durationTime: Number(e.target.value) })}
              min="0"
            />
          </div>
          <div>
            <label className="block mb-2">Qayta qabul qilish sanasi</label>
            <Input
              className={InputStyles.input}
              type="number"
              placeholder="Qayta qabul qilish sanasi"
              value={formData.retakeDate}
              onChange={(e) => setFormData({ ...formData, retakeDate: Number(e.target.value) })}
              min="0"
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CategoryAddModal;
