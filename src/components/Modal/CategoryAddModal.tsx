import { useState } from 'react';
import { Button, Modal, Input, Select, notification } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { CategoryFormValues } from '@/helpers/types/CategoryFormValues'; // To'g'ri interfeys nomini kiriting
import axios from 'axios'; // Axios kutubxonasini import qilamiz

const { Option } = Select;

interface CategoryAddModalProps {
  onAddCategory: (newCategory: CategoryFormValues) => void; // Yangi kategoriya qo'shish funksiyasi
}

const CategoryAddModal: React.FC<CategoryAddModalProps> = ({ onAddCategory }) => {
  const [formValues, setFormValues] = useState<CategoryFormValues>({
    categoryType: 'asosiy-bolmagan',
    categoryName: '',
    description: '',
    totalQuestions: '',
    additionalQuestions: '',
    duration: '',
    retryDate: '',
  });

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false); // Yuklash holati uchun

  const resetForm = () => {
    setFormValues({
      categoryType: 'asosiy-bolmagan',
      categoryName: '',
      description: '',
      totalQuestions: '',
      additionalQuestions: '',
      duration: '',
      retryDate: '',
    });
  };

  const handleSave = async () => {
    setLoading(true); // Saqlash jarayonida yuklashni ko'rsatamiz
    try {
      const response = await axios.post<CategoryFormValues>(
        'http://164.92.165.18:8090/api/category', // To'g'ri API endpointni qo'llang
        formValues
      );
      onAddCategory(response.data); // Yangi kategoriya qo'shish uchun callback chaqiramiz
      notification.success({
        message: 'Kategoriya muvaffaqiyatli qo\'shildi',
      });
      resetForm();
      setOpen(false); // Modalni yopamiz
    } catch (error) {
      console.error('Xatolik:', error);
      notification.error({
        message: 'Xatolik yuz berdi',
        description: 'Kategoriya qo\'shishda xatolik yuz berdi, iltimos qayta urinib ko\'ring',
      });
    } finally {
      setLoading(false); // Yuklashni to'xtatamiz
    }
  };

  const handleCancel = () => {
    resetForm();
    setOpen(false); // Modalni yopamiz
  };

  const InputStyles = {
    input: 'w-full rounded-lg border'
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
        confirmLoading={loading} // Yuklash animatsiyasini ko'rsatish
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

          {/* Kategoriya turi asosiy yoki asosiy bo'lmaganligiga qarab formalarni ko'rsatamiz */}
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
                  onChange={(e) => setFormValues({ ...formValues, totalQuestions: e.target.value })}
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
                  onChange={(e) => setFormValues({ ...formValues, additionalQuestions: e.target.value })}
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
                  onChange={(e) => setFormValues({ ...formValues, duration: e.target.value })}
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
                  onChange={(e) => setFormValues({ ...formValues, retryDate: e.target.value })}
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
