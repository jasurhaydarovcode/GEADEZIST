import CategoryAddModal from "@/components/Modal/CategoryAddModal"
import Layout from "@/components/Dashboard/Layout"
import { geodeziyaLogo } from "@/helpers/imports/images"
import { CategoryTableData } from '@/types/Category'; // import type from types.ts

const Category: React.FC = () => {
    // Ma'lumotlar turlari aniqlangan
    const categories: CategoryTableData[] = [
        {
            id: 1,
            image: geodeziyaLogo,
            name: 'Geodeziya',
            description: 'Geadeziya testlar',
            totalQuestions: 3,
            additionalQuestions: 1,
            duration: 1,
            reAdmissionDate: '2',
            createdBy: 'admin',
            situation: '',
            deletedBy: 'admin',
        },
    ];

    return (
        <Layout>
            <div className="p-5 space-y-5">
                <div className="pagename">
                    <h1 className="font-semibold text-3xl">Category</h1>
                </div>
                <CategoryAddModal />
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
                                    <td className="py-2 border text-center">{category.reAdmissionDate}</td>
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
