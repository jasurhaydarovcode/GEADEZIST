import { useState } from 'react';
import { Button, Modal, Input, Select } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { CategoryFormValues } from '@/types/Category';
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
    });

    const [open, setOpen] = useState(false);

    const resetForm = () => {
        setFormValues({
            categoryType: 'asosiy-bolmagan',
            categoryName: '',
            description: '',
            totalQuestions: '',
            additionalQuestions: '',
            duration: '',
        });
    };

    const handleSave = async () => {
        try {
            const response = await axios.post<CategoryFormValues>('http://164.92.165.18:8090/api/category', formValues);
            onAddCategory(response.data); // Yangi kategoriya qo'shish uchun callback chaqiramiz
            resetForm();
            setOpen(false);
        } catch (error) {
            console.error('Xatolik:', error);
        }
    };

    const handleCancel = () => {
        resetForm();
        setOpen(false);
    };

    const InputStyles = {
        input: 'w-full rounded-lg border'
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
                onCancel={handleCancel}
                width={600}
                okText="Saqlash"
                cancelText="Yopish"
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

                    {formValues.categoryType === 'asosiy' && (
                        <>
                            <div>
                                <label className="block mb-2">Kategoriya nomi</label>
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
                        </>
                    )}

                    {formValues.categoryType === 'asosiy-bolmagan' && (
                        <>
                            <div>
                                <label className='block mb-2'>Kategoriya Nomi</label>
                                <Input className={InputStyles.input}
                                    placeholder="Kategoriya nomini kiriting"
                                    value={formValues.categoryName}
                                    onChange={(e) => setFormValues({ ...formValues, categoryName: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className='block mb-2'>Tavsif</label>
                                <Input className={InputStyles.input}
                                    placeholder="Tavsifni kiriting"
                                    value={formValues.description}
                                    onChange={(e) => setFormValues({ ...formValues, description: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className='block mb-2'>Ummumiy Savollar</label>
                                <Input className={InputStyles.input}
                                    type="number"
                                    placeholder="Umumiy savollar sonini kiriting"
                                    value={formValues.totalQuestions}
                                    onChange={(e) => setFormValues({ ...formValues, totalQuestions: e.target.value })}
                                    min="0"
                                />
                            </div>
                            <div>
                                <label className='block mb-2'>Qo'shimcha savollar</label>
                                <Input className={InputStyles.input}
                                    type="number"
                                    placeholder="Qo'shimcha savollar sonini kiriting"
                                    value={formValues.additionalQuestions}
                                    onChange={(e) => setFormValues({ ...formValues, additionalQuestions: e.target.value })}
                                    min="0"
                                />
                            </div>
                            <div>
                                <label className='block mb-2'>Davomiylik vaqtini</label>
                                <Input className={InputStyles.input}
                                    type="number"
                                    placeholder="Davomiylik vaqtini kiriting (daqiqa)"
                                    value={formValues.duration}
                                    onChange={(e) => setFormValues({ ...formValues, duration: e.target.value })}
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
