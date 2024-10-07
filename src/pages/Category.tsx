import CategoryAddModal from "@/components/Modal/CategoryAddModal";
import Layout from "@/components/Dashboard/Layout";
import { geodeziyaLogo } from "@/helpers/imports/images";
import { CategoryTableData } from '@/types/CategoryTableData'; // Yangi interfeys importi
import { CategoryFormValues } from '@/types/CategoryFormValues'; // Form interfeysini import qiling
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Category: React.FC = () => {
    const [categories, setCategories] = useState<CategoryTableData[]>([
        {
            id: uuidv4(), // UUID ni to'g'ri belgilash
            image: geodeziyaLogo,
            categoryType: 'asosiy', // or 'asosiy-bolmagan'
            name: 'Geodeziya',
            description: 'Geodeziya testlar',           
            totalQuestions: 3,
            additionalQuestions: 1,
            duration: 1,
            reAdmissionDate: new Date().toISOString(), // Qayta qabul sanasini to'g'ri formatda
            createdBy: 'admin',
            situation: '',
            deletedBy: 'admin',
        },
    ]);

    

    const handleAddCategory = (formValues: CategoryFormValues) => {
        const newCategory: CategoryTableData = {
            id: uuidv4(), // UUID ni to'g'ri belgilash
            image: '', // Tasvirni kiritish kerak
            name: formValues.categoryName, // Kategoriya nomi
            categoryType: formValues.categoryType, // Kategoriya turini olish
            description: formValues.description, // Tavsif
            totalQuestions: parseInt(formValues.totalQuestions, 10), // Umumiy savollar
            additionalQuestions: parseInt(formValues.additionalQuestions, 10), // Qo'shimcha savollar
            duration: parseInt(formValues.duration, 10), // Davomiylik
            reAdmissionDate: new Date().toISOString(), // Qayta qabul sanasini to'g'ri formatda
            createdBy: 'admin', // Yaratuvchini belgilang
            situation: '', // Ixtiyoriy holat
            deletedBy: '', // Ixtiyoriy o'chiruvchi
        };
        setCategories([...categories, newCategory]); // Yangi kategoriya qo'shish
    };

    return (
        <Layout>
            <div className="p-5 space-y-5">
                <div className="pagename">
                    <h1 className="font-semibold text-3xl">Category</h1>
                </div>
                <CategoryAddModal onAddCategory={handleAddCategory} />
                <div className="addBtn"></div>
                <div className="bg-white shadow rounded-lg p-4 overflow-x-auto">
                    <table className="min-w-full bg-white border">
                        <thead>
                            <tr>
                                <th className="py-2 border">T/P</th>
                                <th className="py-2 border">Category image</th>
                                <th className="py-2 border">Category name</th>
                                <th className="py-2 border">Category Description</th>
                                <th className="py-2 border">Questions</th>
                                <th className="py-2 border">Additional Questions</th>
                                <th className="py-2 border">Duration time</th>
                                <th className="py-2 border">Re-admission date</th>
                                <th className="py-2 border">Created by</th>
                                <th className="py-2 border">Category situation</th>
                                <th className="py-2 border">Deleted by</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((category) => (
                                <tr key={category.id}>
                                    <td className="py-2 border text-center">{category.id}</td>
                                    <td className="py-2 border text-center pl-4">
                                        <img src={category.image} className="w-14 h-14 rounded-full" alt="logo" />
                                    </td>
                                    <td className="py-2 border text-center">{category.name}</td>
                                    <td className="py-2 border text-center">{category.description}</td>
                                    <td className="py-2 border text-center">{category.totalQuestions}</td>
                                    <td className="py-2 border text-center">{category.additionalQuestions}</td>
                                    <td className="py-2 border text-center">{category.duration}</td>
                                    <td className="py-2 border text-center">
                                        {new Date(category.reAdmissionDate as string).toLocaleDateString()}
                                    </td>
                                    <td className="py-2 border text-center">{category.createdBy}</td>
                                    <td className="py-2 border text-center">{category.situation}</td>
                                    <td className="py-2 border text-center">{category.deletedBy}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
};

export default Category;
