import { useState } from 'react';
import { Button, Modal, Input, Select } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { baseUrl } from '@/helpers/api/baseUrl';
import { CategoryAddModalProps, CategoryModalTypes } from '@/helpers/types/CategoryModalTypes';

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

  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

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
        queryClient.invalidateQueries('categories');
        console.log('Kategoriya muvaffaqiyatli qo\'shildi:', data);
      },
      onError: (error) => {
        console.error('Xatolik yuz berdi:', error);
      },
    }
  );

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      questionCount: 0,
      extraQuestionCount: 0,
      durationTime: 0,
      retakeDate: 0,
      fileId: 0,
      main: true,
    });
  };

  const handleSave = () => {
    mutation.mutate(formData, {
      onSuccess: (data) => {
        onAddCategory(data);
        setOpen(false);
        resetForm();
      },
    });
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
      >
        <div className="space-y-4">
          <div>
            <label className="block mb-2">Asosiy Turini Tanlang</label>
            <Select
              value={formData.main ? 'asosiy' : 'asosiy-bolmagan'}
              onChange={(value) => setFormData({ ...formData, main: value === 'asosiy' })}
              className="w-full"
            >
              <Option value="asosiy">Asosiy</Option>
              <Option value="asosiy-bolmagan">Asosiy bo'lmagan</Option>
            </Select>
          </div>

          {/* Show these inputs for all categories */}
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

          {/* Render additional inputs only if the category is "asosiy" */}
          {formData.main && (
            <>
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
            </>
          )}
        </div>
      </Modal>
    </>
  );
};

export default CategoryAddModal;
