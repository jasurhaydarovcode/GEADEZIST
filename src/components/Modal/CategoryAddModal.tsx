import { useState } from 'react';
import { Button, Modal, Input, Select } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { CategoryFormValues } from '@/types/Category'; // import type from types.ts

const { Option } = Select;

const CategoryAddModal: React.FC = () => {
    // State turlarini `CategoryFormValues` interfeysida aniqlang
    const [formValues, setFormValues] = useState<CategoryFormValues>({
        categoryType: 'asosiy-bolmagan',
        categoryName: '',
        description: '',
        totalQuestions: '',
        additionalQuestions: '',
        duration: '',
    });

    const [open, setOpen] = useState(false);

    // Inputlarni tozalovchi funksiya
    const resetForm = () => {
        setFormValues({
            categoryType: 'asosiy-bolmagan', // Default qiymat
            categoryName: '',
            description: '',
            totalQuestions: '',
            additionalQuestions: '',
            duration: '',
        });
    };

    const handleSave = () => {
        // Saqlash funksiyasi
        resetForm();
        setOpen(false);
    };

    const handleCancel = () => {
        resetForm(); // Tozalash funksiyasini chaqiramiz
        setOpen(false);
    };

    return (
        <>
            <Button onClick={() => setOpen(true)} color="default" variant="solid" className="text-xl px-5 py-6 my-5">
                <PlusCircleOutlined className="text-xl" /> Qo'shish
            </Button>
            <Modal
                title="Kategoriya qo'shish"
                centered
                open={open}
                onOk={handleSave}
                onCancel={handleCancel} // Modal yopilganda tozalash funksiyasi chaqiriladi
                width={500}
                okText="Saqlash"
                cancelText="Yopish"
            >
                <div className="space-y-4">
                    {/* Kategoriya turini tanlash */}
                    <Select
                        value={formValues.categoryType}
                        onChange={(value) => setFormValues({ ...formValues, categoryType: value })}
                        className="w-full"
                    >
                        <Option value="asosiy">Asosiy kategoriya</Option>
                        <Option value="asosiy-bolmagan">Asosiy bo'lmagan kategoriya</Option>
                    </Select>

                    {/* 'asosiy' kategoriya tanlansa */}
                    {formValues.categoryType === 'asosiy' && (
                        <>
                            {/* Kategoriya nomi */}
                            <Input
                                placeholder="Kategoriya nomini kiriting"
                                value={formValues.categoryName}
                                onChange={(e) => setFormValues({ ...formValues, categoryName: e.target.value })}
                            />

                            {/* Tavsifi */}
                            <Input
                                placeholder="Tavsifni kiriting"
                                value={formValues.description}
                                onChange={(e) => setFormValues({ ...formValues, description: e.target.value })}
                            />
                        </>
                    )}

                    {/* 'asosiy-bolmagan' kategoriya tanlansa */}
                    {formValues.categoryType === 'asosiy-bolmagan' && (
                        <>
                            {/* Kategoriya nomi */}
                            <Input
                                placeholder="Kategoriya nomini kiriting"
                                value={formValues.categoryName}
                                onChange={(e) => setFormValues({ ...formValues, categoryName: e.target.value })}
                            />

                            {/* Tavsifi */}
                            <Input
                                placeholder="Tavsifni kiriting"
                                value={formValues.description}
                                onChange={(e) => setFormValues({ ...formValues, description: e.target.value })}
                            />

                            {/* Umumiy savollar soni */}
                            <Input
                                type="number" // Faqat raqam kiritish mumkin
                                placeholder="Umumiy savollar sonini kiriting"
                                value={formValues.totalQuestions}
                                onChange={(e) => setFormValues({ ...formValues, totalQuestions: e.target.value })}
                                min="0" // Manfiy qiymat kiritishni oldini olish
                            />

                            {/* Qo'shimcha savollar soni */}
                            <Input
                                type="number" // Faqat raqam kiritish mumkin
                                placeholder="Qo'shimcha savollar sonini kiriting"
                                value={formValues.additionalQuestions}
                                onChange={(e) => setFormValues({ ...formValues, additionalQuestions: e.target.value })}
                                min="0" // Manfiy qiymat kiritishni oldini olish
                            />

                            {/* Davomiylik vaqti */}
                            <Input
                                type="number" // Faqat raqam kiritish mumkin
                                placeholder="Davomiylik vaqtini kiriting (daqiqa)"
                                value={formValues.duration}
                                onChange={(e) => setFormValues({ ...formValues, duration: e.target.value })}
                                min="0" // Manfiy qiymat kiritishni oldini olish
                            />
                        </>
                    )}
                </div>
            </Modal>
        </>
    );
};

export default CategoryAddModal;