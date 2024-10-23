import Layout from "@/components/Dashboard/Layout";
import { baseUrl, getImage } from "@/helpers/api/baseUrl";
import { config } from "@/helpers/functions/token";
import { Tooltip } from "antd";
import TooltipText from "@/components/TooltipText";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { showErrorMessage } from '@/helpers/functions/message';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { useQuery, useQueryClient } from "react-query";
import defaultImage from "../../assets/images/default.png";
import { MdEdit } from "react-icons/md";
import CategoryAddModal from "@/components/Modal/CategoryAddModal";
import CategoryEditModal from "@/components/Modal/CategoryEditModal";
import CategoryDeleteModal from "@/components/Modal/CategoryDeleteModal";
import TableLoading from "@/components/spinner/TableLoading";
import { Pagination } from "antd";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { Modal } from "antd";
import { Link } from "react-router-dom";
import CheckLogin from "@/helpers/functions/checkLogin";

function Category() {
  CheckLogin
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  const [selectedCategory, setSelectedCategory] = useState(null); 
  const [editModalVisible, setEditModalVisible] = useState(false); 
  const [imageModal, setImageModal] = useState({ open: false, imageUrl: "" }); 

  // Kategoriyalarni olish
  const { data, refetch, isLoading } = useQuery(
    ["getCategories", currentPage],
    async () => {
      const res = await axios.get<{
        body: { body: any[]; totalElements: number };
      }>(
        `${baseUrl}category/page?page=${currentPage - 1}&size=${pageSize}`,
        config
      );
      setTotalItems(res.data.body.totalElements);
      return res.data.body.body;
    },
    { keepPreviousData: true }
  );

  // Kategoriya qo'shish funksiyasi
  const handleAddCategory = () => {
    queryClient.invalidateQueries(["getCategories"]);
    refetch();
  };

  // Rasm modalini ochish
  const handleImageClick = (imageUrl: string) => {
    setImageModal({ open: true, imageUrl }); 
  };

  // Rasm modalini yopish
  const handleImageModalClose = () => {
    setImageModal({ open: false, imageUrl: "" }); 
  };

  // Kategoriya o'chirish funksiyasi
  const handleDeleteCategory = async (categoryId: number) => {
    try {
      await axios.delete(`${baseUrl}category/${categoryId}`, config);
      queryClient.invalidateQueries(["getCategories"]);
      refetch();
    } catch (error) {
      console.error("Kategoriya o'chirishda xatolik yuz berdi", error);
    }
  };

  // Pagination uchun funksiya
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Tahrirlash tugmasi
  const handleEditClick = (category: any) => {
    setSelectedCategory(category);
    setEditModalVisible(true); // Modalni ochish
  };

  // Tahrirlash funksiyasi
  const handleEditCategory = async (updatedCategory: any) => {
    try {
      const response = await axios.put(
        `${baseUrl}category/${updatedCategory.id}`,
        updatedCategory,
        config
      );
      queryClient.invalidateQueries(["getCategories"]);
      setEditModalVisible(false); // Modalni yopish
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
          <div className="flex justify-center items-center h-[80vh]">
            {<TableLoading />}
          </div>
        ) : (
          <>
            <div className="flex justify-between px-[20px] pt-5">
              <h1 className="text-3xl font-bold font-sans">Kategoriya</h1>
              <p className="font-sans text-gray-700">
                <Link to="/dashboard">Boshqaruv paneli /</Link>
                <span className="text-blue-700">Kategoriya</span>
              </p>
            </div>

            <CategoryAddModal onAddCategory={handleAddCategory} />
            <div className="container mx-auto w-full max-w-[1120px] md:px-[12px] md:overflow-x-auto sm:overflow-x-hidden">
              <Table hoverable className="border-collapse table-auto">
                <TableHead className="hidden sm:table-header-group">
                  <TableHeadCell>T/P</TableHeadCell>
                  {[
                    { title: "Kategoriya rasmi", tooltip: "Kategoriya rasmi" },
                    { title: "Kategoriya nomi", tooltip: "Kategoriya nomi" },
                    { title: "Tavsifi", tooltip: "Tavsifi" },
                    { title: "Umumiy savollar", tooltip: "Umumiy savollar" },
                    {
                      title: "Qo'shimcha savollar",
                      tooltip: "Qo'shimcha savollar",
                    },
                    {
                      title: "Davomiylik vaqti (daqiqa)",
                      tooltip: "Davomiylik vaqti(m)",
                    },
                    {
                      title: "Qayta qabul qilish sanasi",
                      tooltip: "Qayta qabul qilish sanasi",
                    },
                    { title: "Yaratgan", tooltip: "Yaratgan" },
                    {
                      title: "Kategoriya holati",
                      tooltip: "Kategoriya holati",
                    },
                    { title: "O'chirgan", tooltip: "O'chirgan" },
                    { title: "Xarakatlar", tooltip: "Xarakatlar" },
                  ].map(({ title, tooltip }) => (
                    <TableHeadCell key={title}>
                      <TooltipText title={tooltip}>{title}</TooltipText>
                    </TableHeadCell>
                  ))}
                </TableHead>
                <TableBody className="block sm:table-row-group divide-y">
                  {Array.isArray(data) &&
                    data.map((item, index) => (
                      <TableRow
                        key={item.id}
                        className="block sm:table-row mb-4 sm:mb-0 bg-white text-gray-900 dark:border-gray-700 dark:bg-gray-800"
                      >
                        <TableCell className="flex justify-between py-2 sm:table-cell">
                          <span className="font-bold sm:hidden">T/P</span>
                          <span>
                            {(currentPage - 1) * pageSize + index + 1}
                          </span>
                        </TableCell>
                        <TableCell className="flex justify-between py-2 sm:table-cell">
                          <span className="font-bold sm:hidden">
                            Kategoriya rasmi
                          </span>
                          <img
                            alt={item.name}
                            src={
                              item.fileId
                                ? `${getImage}${item.fileId}`
                                : defaultImage
                            }
                            onClick={() =>
                              handleImageClick(
                                item.fileId
                                  ? `${getImage}${item.fileId}`
                                  : defaultImage
                              )
                            }
                            className="border-[1px] border-gray-300 w-10 h-10 rounded-full object-cover hover:cursor-pointer sm:w-[43px] sm:h-[43px]"
                          />
                        </TableCell>
                        <TableCell className="flex justify-between py-2 sm:table-cell">
                          <span className="font-bold sm:hidden">
                            Kategoriya nomi
                          </span>
                          <Tooltip title={item.name}>
                            <span className="truncate w-[100px] sm:w-[120px] inline-block">
                              {item.name}
                            </span>
                          </Tooltip>
                        </TableCell>
                        <TableCell className="flex justify-between py-2 sm:table-cell">
                          <span className="font-bold sm:hidden">Tavsifi</span>
                          <Tooltip title={item.description}>
                            <span className="truncate w-[100px] sm:w-[120px] inline-block">
                              {item.description}
                            </span>
                          </Tooltip>
                        </TableCell>
                        <TableCell className="flex justify-between py-2 sm:table-cell">
                          <span className="font-bold sm:hidden">
                            Umumiy savollar
                          </span>
                          <span>{item.questionCount}</span>
                        </TableCell>
                        <TableCell className="flex justify-between py-2 sm:table-cell">
                          <span className="font-bold sm:hidden">
                            Qo'shimcha savollar
                          </span>
                          <span>{item.extraQuestionCount}</span>
                        </TableCell>
                        <TableCell className="flex justify-between py-2 sm:table-cell">
                          <span className="font-bold sm:hidden">
                            Davomiylik vaqti (daqiqa)
                          </span>
                          <span>{item.durationTime}</span>
                        </TableCell>
                        <TableCell className="flex justify-between py-2 sm:table-cell">
                          <span className="font-bold sm:hidden">
                            Qayta qabul qilish sanasi
                          </span>
                          <span>{item.retakeDate}</span>
                        </TableCell>
                        <TableCell className="flex justify-between py-2 sm:table-cell">
                          <span className="font-bold sm:hidden">Yaratgan</span>
                          <Tooltip title={item.createdBy}>
                            <span className="truncate w-[100px] sm:w-[120px] inline-block">
                              {item.createdBy}
                            </span>
                          </Tooltip>
                        </TableCell>
                        <TableCell className="flex justify-between py-2 sm:table-cell">
                          <span className="font-bold sm:hidden">
                            Kategoriya holati
                          </span>
                          <span>{item.deleted ? "O'chirilgan" : "Faol"}</span>
                        </TableCell>
                        <TableCell className="flex justify-between py-2 sm:table-cell">
                          <span className="font-bold sm:hidden">O'chirgan</span>
                          <span>{item.deletedBy}</span>
                        </TableCell>
                        <TableCell className="flex gap-4 text-xl">
                          <button className="hover:text-yellow-500">
                            <MdEdit
                              className="text-[24px] duration-300"
                              onClick={() => {
                                if (!item.deleted) {
                                  handleEditClick(item);
                                } else {
                                  showErrorMessage(
                                    "Bu kategoriya o'chirilgan, uni tahrirlash olmaysiz"
                                  );
                                }
                              }}
                            />
                          </button>
                          <CategoryDeleteModal
                            item={item}
                            handleDeleteCategory={handleDeleteCategory}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination funksiyasi */}
            <div className="flex mt-4 px-[20px]">
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={totalItems}
                onChange={handlePageChange}
                showSizeChanger={false}
              />
            </div>
            {/* Tahrirlash modal */}
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
            style={{ width: "100%" }}
          />
        </Modal>
      </Layout>
    </div>
  );
}

export default Category;
