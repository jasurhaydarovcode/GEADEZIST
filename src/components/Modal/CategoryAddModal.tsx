import { useState } from 'react';
import { Button, Modal, Input, Select, message } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { baseUrl } from '@/helpers/api/baseUrl';
import {
  CategoryAddModalProps,
  CategoryModalTypes,
} from '@/helpers/types/CategoryModalTypes';

const { Option } = Select;

const CategoryAddModal: React.FC<CategoryAddModalProps> = ({ onAddCategory }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    questionCount: 0,
    extraQuestionCount: 0,
    durationTime: 0,
    retakeDate: 0,
    fileId: 0,
    main: false,
  });

  const [inputErrors, setInputErrors] = useState({
    name: false,
    description: false,
  });

  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  // Yangi kategoriya qo'shish uchun mutatsiya
  const mutation = useMutation(
    async (newCategory: CategoryModalTypes) => {
      const response = await axios.post(`${baseUrl}category`, newCategory, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    },
    {
      onSuccess: (data) => {
        // Kategoriyalarni qayta olish va ID bo'yicha saralash
        queryClient.invalidateQueries('categories'); // Eski keshni yangilash
        queryClient.setQueryData<CategoryModalTypes[]>('categories', (oldData = []) => {
          // Eski ma'lumotlar va yangi kategoriya qo'shildi
          const newData: CategoryModalTypes[] = [...oldData, data as CategoryModalTypes];

          // ID bo'yicha o'sish tartibida saralash
          return newData.sort((a, b) => a.id - b.id);
        });

        message.success("Kategoriya muvaffaqiyatli qo'shildi!");
        onAddCategory(data as CategoryModalTypes);
        setOpen(false);
        resetForm();
      },
      onError: (error: any) => {
        if (error.response?.status === 409) {
          message.error('Bunday nomdagi kategoriya allaqachon mavjud!');
        } else {
          message.error('Xatolik yuz berdi, iltimos qaytadan urinib ko‘ring.');
        }
      },
    }
  );

  // Formani reset qilish
  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      questionCount: 0,
      extraQuestionCount: 0,
      durationTime: 0,
      retakeDate: 0,
      fileId: 0,
      main: false,
    });
    setInputErrors({
      name: false,
      description: false,
    });
  };

  // Formani to'g'ri to'ldirilganligini tekshirish
  const isFormValid = () => {
    let valid = true;
    let errors = {
      name: false,
      description: false,
    };

    if (!formData.name.trim()) {
      errors.name = true;
      valid = false;
    }
    if (!formData.description.trim()) {
      errors.description = true;
      valid = false;
    }

    if (
      formData.main &&
      (formData.questionCount <= 0 ||
        formData.extraQuestionCount <= 0 ||
        formData.durationTime <= 0 ||
        formData.retakeDate <= 0)
    ) {
      message.error("Asosiy kategoriya uchun barcha qiymatlar to'g'ri bo'lishi kerak!");
      valid = false;
    }

    setInputErrors(errors);
    if (!valid) {
      message.error("Barcha maydonlarni to'ldiring!");
    }
    return valid;
  };

  // Saqlash tugmasi bosilganda
  const handleSave = () => {
    if (isFormValid()) {
      // Kategoriya ma'lumotlarini tayyorlash
      const categoryData: CategoryModalTypes = {
        ...formData,
        id: 0 // Vaqtinchalik ID
      };
      mutation.mutate(categoryData);
    }
  };

  // Modalni yopish
  const handleCancel = () => {
    resetForm();
    setOpen(false);
  };

  // Input uchun stil
  const InputStyles = {
    input: 'w-full rounded-lg border',
    error: 'border-red-500', 
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="text-xl bg-black text-white py-6 my-5 rounded-lg hover:bg-gray-800 px-[40px] ml-[20px]"
      >
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
        confirmLoading={mutation.isLoading}
        maskClosable={false}
        okButtonProps={{ className: 'bg-black text-white hover:bg-gray-800' }}
        cancelButtonProps={{ className: 'bg-black text-white hover:bg-gray-800' }}
      >
        <div className="space-y-4">
          <div>
            <label className="block mb-2">Asosiy Turini Tanlang</label>
            <Select
              value={formData.main ? 'asosiy-bolmagan' : 'asosiy'}
              onChange={(value) =>
                setFormData({ ...formData, main: value === 'asosiy-bolmagan' })
              }
              className="w-full"
            >
              <Option value="asosiy">Asosiy</Option>
              <Option value="asosiy-bolmagan">Asosiy bo'lmagan</Option>
            </Select>
          </div>

          <div>
            <label className="block mb-2">Kategoriya Nomi</label>
            <Input
              className={`${InputStyles.input} ${inputErrors.name ? InputStyles.error : ''}`}
              placeholder="Kategoriya nomini kiriting"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            {inputErrors.name && (
              <span className="text-red-500 text-sm">Kategoriya nomini kiriting</span>
            )}
          </div>

          <div>
            <label className="block mb-2">Tavsif</label>
            <Input
              className={`${InputStyles.input} ${inputErrors.description ? InputStyles.error : ''}`}
              placeholder="Tavsifni kiriting"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
            {inputErrors.description && (
              <span className="text-red-500 text-sm">Tavsifni kiriting</span>
            )}
          </div>

          {formData.main && (
            <>
              <div>
                <label className="block mb-2">Umumiy Savollar</label>
                <Input
                  className={InputStyles.input}
                  type="number"
                  placeholder="Umumiy savollar sonini kiriting"
                  value={formData.questionCount}
                  onChange={(e) =>
                    setFormData({ ...formData, questionCount: Number(e.target.value) })
                  }
                  min="0"
                />
                {inputErrors.description && (
              <span className="text-red-500 text-sm">Umumiy savollar sonini kiriting</span>
            )}
              </div>
              <div>
                <label className="block mb-2">Qo'shimcha savollar</label>
                <Input
                  className={InputStyles.input}
                  type="number"
                  placeholder="Qo'shimcha savollar sonini kiriting"
                  value={formData.extraQuestionCount}
                  onChange={(e) =>
                    setFormData({ ...formData, extraQuestionCount: Number(e.target.value) })
                  }
                  min="0"
                />
              {inputErrors.description && (
              <span className="text-red-500 text-sm">Qo'shimcha savollar sonini kiriting</span>
            )}
              </div>
              <div>
                <label className="block mb-2">Davomiylik (daqiqa)</label>
                <Input
                  className={InputStyles.input}
                  type="number"
                  placeholder="Davomiylik (daqiqa)"
                  value={formData.durationTime}
                  onChange={(e) =>
                    setFormData({ ...formData, durationTime: Number(e.target.value) })
                  }
                  min="0"
                />
                {inputErrors.description && (
              <span className="text-red-500 text-sm">Davomiylik (daqiqa)ni kiriting</span>
            )}
              </div>
              <div>
                <label className="block mb-2">Qayta qabul qilish sanasi</label>
                <Input
                  className={InputStyles.input}
                  type="number"
                  placeholder="Qayta qabul qilish sanasi"
                  value={formData.retakeDate}
                  onChange={(e) =>
                    setFormData({ ...formData, retakeDate: Number(e.target.value) })
                  }
                  min="0"
                />
                {inputErrors.description && (
              <span className="text-red-500 text-sm">Qayta qabul qilish sanasini kiriting</span>
            )}
            </div>
            </>
          )}
        </div>
      </Modal>
    </>
  );
};

export default CategoryAddModal;
