import Layout from '@/components/Dashboard/Layout';
import { baseUrl, getImage } from '@/helpers/api/baseUrl';
import { config } from '@/helpers/functions/token';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from 'flowbite-react';
import { useQuery, useQueryClient } from 'react-query';
import defaultImage from '../assets/images/default.png';
import { MdEdit } from 'react-icons/md';
import CategoryAddModal from '@/components/Modal/CategoryAddModal';
import CategoryDeleteModal from '@/components/Modal/CategoryDeleteModal';
import TableLoading from '@/components/spinner/TableLoading';
import { Pagination } from 'antd'; // Pagination komponentini import qilamiz
import { useState } from 'react';
import { Helmet } from 'react-helmet';

function Category() {
  const queryClient = useQueryClient();

  const [currentPage, setCurrentPage] = useState(1); // Hozirgi sahifa holati
  const [pageSize, setPageSize] = useState(10); // Har bir sahifadagi ma'lumotlar soni
  const [totalItems, setTotalItems] = useState(0); // Jami ma'lumotlar soni

  // Kategoriyalarni olish uchun so'rov
  const { data, refetch, isLoading } = useQuery(
    ['getCategories', currentPage], // Sahifa o'zgarganda qayta so'rov
    async () => {
      const res = await axios.get<{ body: { body: any[]; totalElements: number } }>(
        `${baseUrl}category/page?page=${currentPage - 1}&size=${pageSize}`, // Sahifa va hajm bo'yicha so'rov
        config,
      );
      setTotalItems(res.data.body.totalElements); // Jami ma'lumotlar sonini yangilash
      return res.data.body.body;
    },
    {
      keepPreviousData: true, // Eski ma'lumotlarni saqlash
    }
  );

  // Yangi kategoriya qo'shilgandan keyin ma'lumotlarni yangilaydi
  const handleAddCategory = () => {
    queryClient.invalidateQueries(['getCategories']); // Keshni yangilaydi
    refetch(); // Yangi ma'lumotlarni olish
  };

  // Kategoriyani o'chirish funksiyasi
  const handleDeleteCategory = async (categoryId: string) => {
    try {
      await axios.delete(`${baseUrl}category/${categoryId}`, config);
      queryClient.invalidateQueries(['getCategories']);
      refetch();
    } catch (error) {
      console.error("Kategoriya o'chirishda xatolik yuz berdi", error);
    }
  };

  // Sahifa o'zgarganda ishlaydigan funksiya
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>

      <Helmet>
        <title>Kategoriyalar</title>
      </Helmet>

      <Layout>
        {isLoading ? (
          <div>{<TableLoading />}</div>
        ) : (
          <>
            <div className="flex justify-between px-[20px]">
              <h1 className="text-3xl font-bold font-sans">Kategoriya</h1>
              <p className="font-sans text-gray-700">
                Boshqaruv paneli /{' '}
                <span className="text-blue-700">Kategoriya</span>
              </p>
            </div>

            {/* Kategoriya qo'shish modali */}
            <CategoryAddModal onAddCategory={handleAddCategory} /> 

            <div className="px-[20px] overflow-x-scroll w-[1170px] rounded-lg">
              <Table hoverable className="border-collapse">
                <TableHead>
                  <TableHeadCell>T/P</TableHeadCell>
                  <TableHeadCell>Kategoriya rasmi</TableHeadCell>
                  <TableHeadCell>Kategoriya nomi</TableHeadCell>
                  <TableHeadCell>Tavsifi</TableHeadCell>
                  <TableHeadCell>Umumiy savollar</TableHeadCell>
                  <TableHeadCell>Qo'shimcha savollar</TableHeadCell>
                  <TableHeadCell>Davomiylik vaqti(m)</TableHeadCell>
                  <TableHeadCell>Qayta qabul qilish sanasi</TableHeadCell>
                  <TableHeadCell>Yaratgan</TableHeadCell>
                  <TableHeadCell>Kategoriya holati</TableHeadCell>
                  <TableHeadCell>O'chirgan</TableHeadCell>
                  <TableHeadCell>Xarakat</TableHeadCell>
                </TableHead>
                <TableBody className="divide-y">
                  {Array.isArray(data) &&
                    data.map((item, index) => (
                      <TableRow
                        key={item.id}
                        className="bg-white text-gray-900 dark:border-gray-700 dark:bg-gray-800"
                      >
                        <TableCell>{(currentPage - 1) * pageSize + index + 1}</TableCell>
                        <TableCell>
                          <img
                            alt={item.name}
                            src={
                              item.fileId
                                ? `${getImage}${item.fileId}`
                                : defaultImage
                            }
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
                        <TableCell>{item.deleted && "O'chirilgan"}</TableCell>
                        <TableCell>{item.deletedBy}</TableCell> 
                        <TableCell className="flex gap-4 text-xl">
                          <div className="cursor-pointer">
                            <MdEdit />
                          </div>
                          {/* Delete modal */}
                          <CategoryDeleteModal
                            categoryId={item.id}
                            onDelete={handleDeleteCategory}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination qo'shildi */}
            <div className="flex mt-4">
              <Pagination
                current={currentPage} // Hozirgi sahifa
                pageSize={pageSize} // Har bir sahifadagi elementlar soni
                total={totalItems} // Jami elementlar soni
                onChange={handlePageChange} // Sahifa o'zgarganda
                showSizeChanger={false} // Sahifa hajmini o'zgartirishni o'chirish
              />
            </div>
          </>
        )}
      </Layout>
    </div>
  );
}

export default Category;
