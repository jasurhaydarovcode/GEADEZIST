import { useState } from 'react';
import { Button, Modal, Input, Select } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

const { Option } = Select;

const CategoryAddModal: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [categoryType, setCategoryType] = useState<string>('asosiy-bolmagan');
    const [categoryName, setCategoryName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [totalQuestions, setTotalQuestions] = useState<string>('');
    const [additionalQuestions, setAdditionalQuestions] = useState<string>('');
    const [duration, setDuration] = useState<string>('');

    // Inputlarni tozalovchi funksiya
    const resetForm = () => {
        setCategoryType('asosiy-bolmagan'); // Default qiymat
        setCategoryName('');
        setDescription('');
        setTotalQuestions('');
        setAdditionalQuestions('');
        setDuration('');
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
                        value={categoryType}
                        onChange={(value) => setCategoryType(value)}
                        className="w-full"
                    >
                        <Option value="asosiy">Asosiy kategoriya</Option>
                        <Option value="asosiy-bolmagan">Asosiy bo'lmagan kategoriya</Option>
                    </Select>

                    {/* Agar 'asosiy' kategoriya tanlansa */}
                    {categoryType === 'asosiy' && (
                        <>
                            {/* Kategoriya nomi */}
                            <Input
                                placeholder="Kategoriya nomini kiriting"
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                            />

                            {/* Tavsifi */}
                            <Input
                                placeholder="Tavsifni kiriting"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </>
                    )}

                    {/* Agar 'asosiy bo'lmagan' kategoriya tanlansa */}
                    {categoryType === 'asosiy-bolmagan' && (
                        <>
                            {/* Kategoriya nomi */}
                            <Input
                                placeholder="Kategoriya nomini kiriting"
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                            />

                            {/* Tavsifi */}
                            <Input
                                placeholder="Tavsifni kiriting"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />

                            {/* Umumiy savollar soni */}
                            <Input
                                type="number" // Faqat raqam kiritish mumkin
                                placeholder="Umumiy savollar sonini kiriting"
                                value={totalQuestions}
                                onChange={(e) => setTotalQuestions(e.target.value)}
                                min="0" // Manfiy qiymat kiritishni oldini olish
                            />

                            {/* Qo'shimcha savollar soni */}
                            <Input
                                type="number" // Faqat raqam kiritish mumkin
                                placeholder="Qo'shimcha savollar sonini kiriting"
                                value={additionalQuestions}
                                onChange={(e) => setAdditionalQuestions(e.target.value)}
                                min="0" // Manfiy qiymat kiritishni oldini olish
                            />

                            {/* Davomiylik vaqti */}
                            <Input
                                type="number" // Faqat raqam kiritish mumkin
                                placeholder="Davomiylik vaqtini kiriting (daqiqa)"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
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
