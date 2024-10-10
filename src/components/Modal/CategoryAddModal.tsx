import { useState } from 'react';
import { Button, Modal, Input, Select, notification } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { CategoryFormValues } from '@/helpers/types/CategoryFormValues';
import axios from 'axios';

const { Option } = Select;

interface CategoryAddModalProps {
  onAddCategory: (newCategory: CategoryFormValues) => void;
}

const CategoryAddModal: React.FC<CategoryAddModalProps> = ({ onAddCategory }) => {
  const [formValues, setFormValues] = useState<CategoryFormValues>({
    categoryType: 'asosiy-bolmagan',
    categoryName: '',
    description: '',
    totalQuestions: 0, 
    additionalQuestions: 0,
    duration: 0,
    retryDate: undefined,
  });

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setFormValues({
      categoryType: 'asosiy-bolmagan',
      categoryName: '',
      description: '',
      totalQuestions: 0,
      additionalQuestions: 0,
      duration: 0,
      retryDate: undefined,
    });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await axios.post<CategoryFormValues>(
        'http://164.92.165.18:8090/api/category',
        formValues,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE3Mjg0NjY4MjMsImV4cCI6MTcyODU1MzIyM30.FetUXyrF7k3hBq4GtSHGc4tprIdt4QF-VMnh6PYY7dZrt3efwctRhCTCCOsSZMim7V-jO0UaPVfmZdxZAPpA1A`,
          },
        }
      );
      onAddCategory(response.data);
      notification.success({
        message: "Kategoriya muvaffaqiyatli qo'shildi",
      });
      resetForm();
      setOpen(false);
    } catch (error) {
      console.error('Xatolik:', error);
      notification.error({
        message: 'Xatolik yuz berdi',
        description: "Kategoriya qo'shishda xatolik yuz berdi, iltimos qayta urinib ko'ring",
      });
    } finally {
      setLoading(false);
    }
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
          <Select
            value={formValues.categoryType}
            onChange={(value) => setFormValues({ ...formValues, categoryType: value })}
            className="w-full"
          >
            <Option value="asosiy">Asosiy kategoriya</Option>
            <Option value="asosiy-bolmagan">Asosiy bo'lmagan kategoriya</Option>
          </Select>

          <div>
            <label className="block mb-2">Kategoriya Nomi</label>
            <Input
              className={InputStyles.input}
              placeholder="Kategoriya nomini kiriting"
              value={formValues.categoryName}
              onChange={(e) => setFormValues({ ...formValues, categoryName: e.target.value })}
            />
          </div>
          <div>
            <label className="block mb-2">Tavsif</label>
            <Input
              className={InputStyles.input}
              placeholder="Tavsifni kiriting"
              value={formValues.description}
              onChange={(e) => setFormValues({ ...formValues, description: e.target.value })}
            />
          </div>

          {formValues.categoryType === 'asosiy-bolmagan' && (
            <>
              <div>
                <label className="block mb-2">Umumiy Savollar</label>
                <Input
                  className={InputStyles.input}
                  type="number"
                  placeholder="Umumiy savollar sonini kiriting"
                  value={formValues.totalQuestions}
                  onChange={(e) => setFormValues({ ...formValues, totalQuestions: Number(e.target.value) })}
                  min="0"
                />
              </div>
              <div>
                <label className="block mb-2">Qo'shimcha savollar</label>
                <Input
                  className={InputStyles.input}
                  type="number"
                  placeholder="Qo'shimcha savollar sonini kiriting"
                  value={formValues.additionalQuestions}
                  onChange={(e) => setFormValues({ ...formValues, additionalQuestions: Number(e.target.value) })}
                  min="0"
                />
              </div>
              <div>
                <label className="block mb-2">Davomiylik</label>
                <Input
                  className={InputStyles.input}
                  type="number"
                  placeholder="Davomiylik (daqiqa)"
                  value={formValues.duration}
                  onChange={(e) => setFormValues({ ...formValues, duration: Number(e.target.value) })}
                  min="0"
                />
              </div>
              <div>
                <label className="block mb-2">Qayta qabul qilish</label>
                <Input
                  className={InputStyles.input}
                  type="number"
                  placeholder="Qayta qabul qilish sanasi"
                  value={formValues.retryDate}
                  onChange={(e) => setFormValues({ ...formValues, retryDate: Number(e.target.value) })}
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