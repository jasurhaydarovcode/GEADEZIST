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
import CategoryEditModal from '@/components/Modal/CategoryEditModal'; // Edit modalini import qilamiz
import CategoryDeleteModal from '@/components/Modal/CategoryDeleteModal';
import TableLoading from '@/components/spinner/TableLoading';
import { Pagination } from 'antd';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Modal } from 'antd';

function Category() {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  const [selectedCategory, setSelectedCategory] = useState(null); // Tanlangan kategoriya
  const [editModalVisible, setEditModalVisible] = useState(false); // Tahrirlash modalining holati
  const [imageModal, setImageModal] = useState({ open: false, imageUrl: '' });

  const { data, refetch, isLoading } = useQuery(
    ['getCategories', currentPage],
    async () => {
      const res = await axios.get<{ body: { body: any[]; totalElements: number } }>(
        `${baseUrl}category/page?page=${currentPage - 1}&size=${pageSize}`,
        config
      );
      setTotalItems(res.data.body.totalElements);
      return res.data.body.body;
    },
    { keepPreviousData: true }
  );

  const handleAddCategory = () => {
    queryClient.invalidateQueries(['getCategories']);
    refetch();
  };

  {/* Rasm modal */}
  const handleImageClick = (imageUrl: string) => {
    setImageModal({ open: true, imageUrl }); // Rasm modalini ochish
  };

  const handleImageModalClose = () => {
    setImageModal({ open: false, imageUrl: '' }); // Modalni yopish
  };

  
  const handleDeleteCategory = async (categoryId: string) => {
    try {
      await axios.delete(`${baseUrl}category/${categoryId}`, config);
      queryClient.invalidateQueries(['getCategories']);
      refetch();
    } catch (error) {
      console.error("Kategoriya o'chirishda xatolik yuz berdi", error);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleEditClick = (category: any) => {
    setSelectedCategory(category); // Tanlangan kategoriyani saqlash
    setEditModalVisible(true); // Tahrirlash modalini ochish
  };

  const handleEditCategory = async (updatedCategory: any) => {
    try {
      await axios.put(
        `${baseUrl}category/${updatedCategory.id}`,
        updatedCategory,
        config
      );
      queryClient.invalidateQueries(['getCategories']);
      setEditModalVisible(false); // Tahrirlash modalini yopish
    } catch (error) {
      console.error("Kategoriyani yangilashda xatolik yuz berdi", error);
    }
  };

  return (
    <div>
      <Helmet>
        <title>Kategoriyalar</title>
      </Helmet>

      <Layout>
        {isLoading ? (
          <div className="flex justify-center items-center h-[80vh]">{<TableLoading />}</div>
        ) : (
          <>
            <div className="flex justify-between px-[20px]">
              <h1 className="text-3xl font-bold font-sans">Kategoriya</h1>
              <p className="font-sans text-gray-700">
                Boshqaruv paneli / <span className="text-blue-700">Kategoriya</span>
              </p>
            </div>

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
                            onClick={() => handleImageClick(item.fileId ? `${getImage}${item.fileId}` : defaultImage)}
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
                          <div className="cursor-pointer" onClick={() => handleEditClick(item)}>
                            <MdEdit />
                          </div>
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

            <div className="flex justify-end mt-4 px-[20px]">
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={totalItems}
                onChange={handlePageChange}
                showSizeChanger={false}
              />
            </div>

            <CategoryEditModal
              visible={editModalVisible}
              onClose={() => setEditModalVisible(false)}
              onEditCategory={handleEditCategory}
              category={selectedCategory}
            />
          </>
        )}

        {/* Rasm modal */}
        <Modal
          open={imageModal.open}
          onCancel={handleImageModalClose}
          footer={null}
          centered
        >
          <img
            src={imageModal.imageUrl}
            alt="Kategoriya rasmi"
            style={{ width: '100%' }}
          />
        </Modal>
      </Layout>
    </div>
  );
}

export default Category;
