import { Modal, Form, Input, Button, Select } from 'antd';
import { CategoryFormValues } from '@/helpers/types/CategoryFormValues';
import { useEffect } from 'react';

const { Option } = Select;

interface CategoryEditModalProps {
  visible: boolean;
  onClose: () => void;
  onEditCategory: (values: CategoryFormValues) => void;
  category: CategoryFormValues | null;
}

const CategoryEditModal: React.FC<CategoryEditModalProps> = ({
  visible,
  onClose,
  onEditCategory,
  category,
}) => {
  const [form] = Form.useForm();

  // Modal ochilganda, kategoriyaga oid ma'lumotlarni formaga yuklash
  useEffect(() => {
    if (category) {
      form.setFieldsValue({
        categoryName: category.categoryName,
        categoryType: category.categoryType,
        description: category.description,
        totalQuestions: category.totalQuestions,
        additionalQuestions: category.additionalQuestions,
        duration: category.duration,
        retryDate: category.retryDate,
      });
    } else {
      form.resetFields();
    }
  }, [category, form]);

  return (
    <Modal
      title="Kategoriyani tahrirlash"
      centered
      visible={visible}
      onCancel={onClose}
      width={600}
      okText="Saqlash"
      cancelText="Yopish"
      maskClosable={false}
      footer={null} // Form tugmalarini form ichida joylash
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={(values: CategoryFormValues) => {
          onEditCategory(values);
          onClose();
        }}
      >
        <Form.Item label="Kategoriya turi" name="categoryType">
          <Select>
            <Option value="asosiy">Asosiy kategoriya</Option>
            <Option value="asosiy-bolmagan">Asosiy bo'lmagan kategoriya</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Kategoriya nomi" name="categoryName">
          <Input placeholder="Kategoriya nomini kiriting" />
        </Form.Item>

        <Form.Item label="Tavsif" name="description">
          <Input.TextArea placeholder="Tavsifni kiriting" />
        </Form.Item>

        {form.getFieldValue('categoryType') === 'asosiy-bolmagan' && (
          <>
            <Form.Item label="Umumiy Savollar" name="totalQuestions">
              <Input
                type="number"
                placeholder="Umumiy savollar sonini kiriting"
              />
            </Form.Item>

            <Form.Item label="Qo'shimcha Savollar" name="additionalQuestions">
              <Input
                type="number"
                placeholder="Qo'shimcha savollar sonini kiriting"
              />
            </Form.Item>

            <Form.Item label="Davomiylik (daqiqa)" name="duration">
              <Input type="number" placeholder="Davomiylik (daqiqa)" />
            </Form.Item>

            <Form.Item label="Qayta qabul qilish sanasi" name="retryDate">
              <Input type="number" placeholder="Qayta qabul qilish sanasi" />
            </Form.Item>
          </>
        )}

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Saqlash
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CategoryEditModal;
