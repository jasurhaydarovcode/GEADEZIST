import Layout from "@/components/Dashboard/Layout";
import CategoryAddModal from "@/components/Modal/CategoryAddModal";
import CategoryEditModal from "@/components/Modal/CategoryEditModal"; // Yangi modal importi
import { geodeziyaLogo } from "@/helpers/imports/images";
import { CategoryTableData } from "@/helpers/types/CategoryTableData";
import { CategoryFormValues } from "@/helpers/types/CategoryFormValues";
import { Table, Button, Popconfirm } from "antd";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const Category: React.FC = () => {
  const [categories, setCategories] = useState<CategoryTableData[]>([
    {
      id: uuidv4(),
      image: geodeziyaLogo,
      categoryType: "asosiy",
      name: "Geodeziya",
      description: "Geodeziya testlar",
      totalQuestions: 3,
      additionalQuestions: 1,
      duration: 1,
      reAdmissionDate: new Date().toISOString(),
      createdBy: "admin",
      situation: "",
      deletedBy: "admin",
    },
  ]);

  // Modalni ko'rsatish va holatini boshqarish
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState<CategoryTableData | null>(null);

  // Yangi kategoriya qo'shish funksiyasi
  const handleAddCategory = (newCategory: CategoryTableData) => {
    setCategories([...categories, newCategory]);
  };

  // Kategoriya o'chirish funksiyasi
  const handleDeleteCategory = (id: string) => {
    setCategories(categories.filter((category) => category.id !== id));
  };

  // Tahrirlash modalini ochish
  const handleEditCategory = (id: string) => {
    const category = categories.find((cat) => cat.id === id);
    if (category) {
      setCategoryToEdit(category);
      setEditModalVisible(true);
    }
  };

  // O'zgarishlarni saqlash
  const handleUpdateCategory = (updatedCategory: CategoryFormValues) => {
    if (categoryToEdit) {
      setCategories(categories.map(cat => 
        cat.id === categoryToEdit.id 
          ? { ...cat, ...updatedCategory, image: cat.image, reAdmissionDate: cat.reAdmissionDate, createdBy: cat.createdBy, situation: cat.situation, deletedBy: cat.deletedBy }
          : cat
      ));
      setEditModalVisible(false); // Modalni yopish
    }
  };

  const columns = [
    {
      title: "Kategoriya Nomi",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Tavsif",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Umumiy Savollar",
      dataIndex: "totalQuestions",
      key: "totalQuestions",
    },
    {
      title: "Qo'shimcha Savollar",
      dataIndex: "additionalQuestions",
      key: "additionalQuestions",
    },
    {
      title: "Davomiylik (daqiqa)",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Qayta Qabul",
      dataIndex: "reAdmissionDate",
      key: "reAdmissionDate",
      render: (text: string) => new Date(text).toLocaleDateString(),
    },
    {
      title: "Amallar",
      key: "actions",
      render: (_text: any, record: CategoryTableData) => (
        <div className="space-x-3">
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEditCategory(record.id)}
          />
          <Popconfirm
            title="Haqiqatan ham o'chirmoqchimisiz?"
            onConfirm={() => handleDeleteCategory(record.id)}
            okText="Ha"
            cancelText="Yo'q"
          >
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <div className="p-5 space-y-5">
        <div className="pagename">
          <h1 className="font-semibold text-3xl">Kategoriya</h1>
        </div>
        <CategoryAddModal
          onAddCategory={(formValues: CategoryFormValues) => {
            const newCategory: CategoryTableData = {
              id: uuidv4(),
              name: formValues.categoryName,
              ...formValues,
              image: geodeziyaLogo,
              reAdmissionDate: new Date().toISOString(),
              createdBy: "admin",
              situation: "",
              deletedBy: "",
            };
            handleAddCategory(newCategory);
          }}
        />
        <div className="bg-white shadow rounded-lg p-4 overflow-x-auto">
          <Table
            dataSource={categories}
            columns={columns}
            rowKey={(record) => record.id}
            pagination={false}
          />
        </div>
        <CategoryEditModal
          visible={editModalVisible}
          onClose={() => setEditModalVisible(false)}
          onEditCategory={handleUpdateCategory} // O'zgarishlarni saqlash funksiyasi
          category={categoryToEdit as CategoryFormValues | null} // To'g'ri tipdagi qiymat
        />
      </div>
    </Layout>
  );
};

export default Category;