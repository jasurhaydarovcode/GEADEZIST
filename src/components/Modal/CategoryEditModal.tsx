import { Modal, Form, Input, Button, Select } from 'antd';
import { CategoryFormValues } from '../../helpers/types/CategoryFormValues';
import { useEffect, useState } from 'react';

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
  const [isMainCategory, setIsMainCategory] = useState<boolean>(false);

  // Load category data into form when the modal opens
  useEffect(() => {
    if (category) {
      form.setFieldsValue({
        categoryType: category.categoryType || 'asosiy',
        name: category.name,
        description: category.description,
        questionCount: category.questionCount || 0,
        extraQuestionCount: category.extraQuestionCount || 0,
        durationTime: category.durationTime || 0,
        retakeDate: category.retakeDate || 0,
      });
      setIsMainCategory(category.categoryType === 'asosiy');
    } else {
      form.resetFields();
      setIsMainCategory(false);
    }
  }, [category, form]);

  // Handle category type change
  const handleCategoryTypeChange = (value: string) => {
    setIsMainCategory(value === 'asosiy');
    form.setFieldsValue({
      questionCount: 0,
      extraQuestionCount: 0,
      durationTime: 0,
      retakeDate: 0,
    });
  };

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
      footer={null}
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
          <Select onChange={handleCategoryTypeChange} className="w-full">
            <Option value="asosiy">Asosiy kategoriya</Option>
            <Option value="asosiy-bolmagan">Asosiy bo'lmagan kategoriya</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Kategoriya nomi"
          name="name"
          rules={[{ required: true, message: 'Kategoriya nomini kiriting!' }]}
        >
          <Input placeholder="Kategoriya nomini kiriting" />
        </Form.Item>

        <Form.Item
          label="Tavsif"
          name="description"
          rules={[{ required: true, message: 'Tavsifni kiriting!' }]}
        >
          <Input.TextArea placeholder="Tavsifni kiriting" />
        </Form.Item>

        {/* Additional fields visible only for 'asosiy' category */}
        {isMainCategory && (
          <>
            <Form.Item
              label="Umumiy Savollar"
              name="questionCount"
              rules={[{ required: true, message: 'Savollar sonini kiriting!' }]}
            >
              <Input
                type="number"
                placeholder="Umumiy savollar sonini kiriting"
                min={0}
              />
            </Form.Item>

            <Form.Item
              label="Qo'shimcha Savollar"
              name="extraQuestionCount"
              rules={[
                {
                  required: true,
                  message: "Qo'shimcha savollar sonini kiriting!",
                },
              ]}
            >
              <Input
                type="number"
                placeholder="Qo'shimcha savollar sonini kiriting"
                min={0}
              />
            </Form.Item>

            <Form.Item
              label="Davomiylik (daqiqa)"
              name="durationTime"
              rules={[{ required: true, message: 'Davomiylikni kiriting!' }]}
            >
              <Input type="number" placeholder="Davomiylik (daqiqa)" min={0} />
            </Form.Item>

            <Form.Item
              label="Qayta qabul qilish sanasi"
              name="retakeDate"
              rules={[
                {
                  required: true,
                  message: 'Qayta qabul qilish sanasini kiriting!',
                },
              ]}
            >
              <Input
                type="number"
                placeholder="Qayta qabul qilish sanasi"
                min={0}
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
