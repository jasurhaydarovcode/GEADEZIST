import { Modal, Form, Input, Button, message } from 'antd';
import { CategoryFormValues } from '../../helpers/types/CategoryFormValues';
import { useEffect, useState } from 'react';

interface CategoryEditModalProps {
  visible: boolean;
  onClose: () => void;
  onEditCategory: (values: CategoryFormValues & { fileId?: string }) => void;
  category: CategoryFormValues & { main?: boolean; fileId?: string } | null;
}

const CategoryEditModal: React.FC<CategoryEditModalProps> = ({
  visible,
  onClose,
  onEditCategory,
  category,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (category) {
      form.setFieldsValue({
        name: category.name,
        description: category.description,
        questionCount: category.questionCount || 0,
        extraQuestionCount: category.extraQuestionCount || 0,
        durationTime: category.durationTime || 0,
        retakeDate: category.retakeDate || 0,
      });
    } else {
      form.resetFields();
    }
  }, [category, form]);

  const handleFormSubmit = (values: CategoryFormValues) => {
    const updatedCategory = {
      ...category,
      ...values,
      fileId: category?.fileId || '0', // Fayl ID bo'lmasa, 0 qiymat qo‘yiladi
    };
    onEditCategory(updatedCategory);
    message.success('Kategoriya tahrirlandi!');
    onClose();
  };

  const InputStyles = {
    input: 'w-full rounded-lg border',
  };

  return (
    <Modal
      title={`Kategoriyani tahrirlash - ${category?.main ? 'Asosiy' : 'Asosiy bo\'lmagan'}`}
      centered
      visible={visible}
      onCancel={onClose}
      width={600}
      footer={null}
      maskClosable={false}
    >
      <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
        <Form.Item
          label="Kategoriya nomi"
          name="name"
          rules={[{ required: true, message: 'Kategoriya nomini kiriting!' }]}
        >
          <Input className={InputStyles.input} placeholder="Kategoriya nomini kiriting" />
        </Form.Item>

        <Form.Item
          label="Tavsif"
          name="description"
          rules={[{ required: true, message: 'Tavsifni kiriting!' }]}
        >
          <Input.TextArea className={InputStyles.input} placeholder="Tavsifni kiriting" />
        </Form.Item>

        {category?.main && (
          <>
            <Form.Item
              label="Umumiy Savollar"
              name="questionCount"
              rules={[{ required: true, message: 'Savollar sonini kiriting!' }]}
            >
              <Input
                className={InputStyles.input}
                type="number"
                min={0}
                placeholder="Savollar sonini kiriting"
              />
            </Form.Item>

            <Form.Item
              label="Qo'shimcha Savollar"
              name="extraQuestionCount"
              rules={[{ required: true, message: "Qo'shimcha savollar sonini kiriting!" }]}
            >
              <Input
                className={InputStyles.input}
                type="number"
                min={0}
                placeholder="Qo'shimcha savollar sonini kiriting"
              />
            </Form.Item>

            <Form.Item
              label="Davomiylik (daqiqa)"
              name="durationTime"
              rules={[{ required: true, message: 'Davomiylikni kiriting!' }]}
            >
              <Input
                className={InputStyles.input}
                type="number"
                min={0}
                placeholder="Davomiylik (daqiqa)"
              />
            </Form.Item>

            <Form.Item
              label="Qayta qabul qilish sanasi"
              name="retakeDate"
              rules={[{ required: true, message: 'Qayta qabul qilish sanasini kiriting!' }]}
            >
              <Input
                className={InputStyles.input}
                type="number"
                min={0}
                placeholder="Qayta qabul qilish sanasi"
              />
            </Form.Item>
          </>
        )}

        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Saqlash
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CategoryEditModal;
