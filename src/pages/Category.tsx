import Layout from "@/components/Dashboard/Layout";
import { baseUrl, getImage } from "@/helpers/api/baseUrl";
import { config } from "@/helpers/functions/token";
import axios from "axios";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { useQuery, useQueryClient } from "react-query";
import defaultImage from '../assets/images/default.png';
import { MdDelete, MdEdit } from "react-icons/md";
import CategoryAddModal from '@/components/Modal/CategoryAddModal'; // Import the modal

function Category() {
  const queryClient = useQueryClient();

  const { data, refetch } = useQuery(['getCategories'], async () => {
    const res = await axios.get<{ body: { body: any[] } }>(`${baseUrl}category/page?page=0&size=10`, config);
    return res.data.body.body;
  });

  // Yangi kategoriya qo'shish va kategoriyalar ro'yxatini yangilash uchun ishlov beruvchi
  const handleAddCategory = () => {
    queryClient.invalidateQueries(['getCategories']); // Bu ma'lumotlarni yangilaydi
    refetch(); // Ixtiyoriy ravishda, yangi ma'lumotlar ko'rsatilishini ta'minlash uchun qayta so'rov yuborish
  };

  return (
    <div>
      <Layout>
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold font-sans">Kategoriya</h1>
          <p className="font-sans text-gray-700">
            Boshqaruv paneli / <span className="text-blue-700">Kategoriya</span>
          </p>
        </div>

        {/* Add Modal Component */}
        <CategoryAddModal onAddCategory={handleAddCategory} />

        <div className="overflow-x-scroll w-[1200px] rounded-lg">
          <Table hoverable className="border-collapse">
            <TableHead>
              <TableHeadCell>T/P</TableHeadCell>
              <TableHeadCell>Kategoriya rasmi</TableHeadCell>
              <TableHeadCell>Tavsifi</TableHeadCell>
              <TableHeadCell>Savollar soni</TableHeadCell>
              <TableHeadCell>Testlar soni</TableHeadCell>
              <TableHeadCell>Qo'shimcha savollar</TableHeadCell>
              <TableHeadCell>Davomiylik vaqti(m)</TableHeadCell>
              <TableHeadCell>Qayta qabul qilish sanasi</TableHeadCell>
              <TableHeadCell>Yaratgan</TableHeadCell>
              <TableHeadCell>Kategoriya holati</TableHeadCell>
              <TableHeadCell>O'chirgan</TableHeadCell>
              <TableHeadCell>Xarakat</TableHeadCell>
            </TableHead>
            <TableBody className="divide-y">
              {Array.isArray(data) && data.map((item, index) => (
                <TableRow key={item.id} className="bg-white text-gray-900 dark:border-gray-700 dark:bg-gray-800">
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <img
                      alt={item.name}
                      src={item.fileId ? `${getImage}${item.fileId}` : defaultImage}
                      className="border-[1px] border-gray-300 w-[43px] h-[43px] rounded-full object-cover hover:cursor-pointer"
                    />
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{item.questionCount}</TableCell>
                  <TableCell>{item.extraQuestionCount}</TableCell>
                  <TableCell>{item.durationTime}</TableCell>
                  <TableCell>{item.retakeDate}</TableCell>
                  <TableCell>{item.createdBy}</TableCell>
                  <TableCell>{item.deleted && 'O"chirilgan'}</TableCell>
                  <TableCell>{item.deletedBy}</TableCell>
                  <TableCell className="flex gap-4 text-xl">
                    <div className="cursor-pointer">
                      <MdEdit />
                    </div>
                    <div className="cursor-pointer">
                      <MdDelete />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Layout>
    </div>
  );
}

export default Category;
