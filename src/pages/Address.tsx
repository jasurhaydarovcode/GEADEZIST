import Layout from '@/components/Dashboard/Layout';
import TableLoading from '@/components/spinner/TableLoading';
import axios from 'axios';
import { addRegion, deleteRegion, getDistrict, getRegion, updateRegion } from '@/helpers/api/baseUrl';
import { config } from '@/helpers/functions/token';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Modal, Pagination } from 'antd';
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { MdDelete, MdEdit } from 'react-icons/md';
import { QueryClient, useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Address() {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false); // O'chirish modalini ko'rsatish uchun 
  const [selectedAddress, setSelectedAddress] = useState(null); // O'chiriladigan manzilni saqlash 
  const [putOpen, setPutOpen] = useState(false);
  // Pagination holati 
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0); // Umumiy ma'lumotlar soni 
  // Pagination tuman uchun
  const [currentPages, setCurrentPages] = useState(1);
  const [pageSizes, setPageSizes] = useState(10);
  const [totalItemss, setTotalItemss] = useState(0);

  const showModal = () => {
    setOpen(true);
  };

  const navigate = useNavigate();

  function checkRoleClient() {
    const role = localStorage.getItem('role');
    if (role == 'ROLE_CLIENT') {
      navigate('/client/dashboard');
    }
  }

  useEffect(() => {
    checkRoleClient();
  }, [checkRoleClient]);

  const handleOk = () => {
    postAddressData.mutate();
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
      resetForm();
    }, 2000);
  };

  const handleCancel = () => {
    setOpen(false);
    resetForm();
  };

  const handleDelete = () => {
    if (selectedAddress !== null) {
      deleteAddress.mutate(selectedAddress);
      setDeleteModalVisible(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModalVisible(false); // O'chirishni bekor qilish 
  };

  const handlePutOk = () => {
    if (selectedAddress !== null) {
      updateAddress.mutate(selectedAddress);
      setPutOpen(false);
    }
  };

  const handlePutOpen = (item: any) => {
    setSelectedAddress(item.id);
    setName(item.name); // Viloyat nomini oling va setName ga qo'ying
    setPutOpen(true);
  };

  const handlePutCancel = () => {
    setPutOpen(false);
    resetForm();
  };

  // Viloyatlarni get qilish
  const { data: addresses, isLoading } = useQuery(
    ['getAddress', currentPage],
    async () => {
      const res = await axios.get(
        `${getRegion}getAllRegionPage?page=${currentPage - 1}&size=${pageSize}`,
        config,
      );
      const responseData = (
        res.data as {
          body: { body: string; totalElements: number; totalPage: number };
        }
      ).body;
      setTotalItems(responseData.totalElements); // Umumiy ma'lumotlar sonini saqlaymiz 
      return responseData.body;
    },
    {
      keepPreviousData: true, // Sahifa o'zgarganda eski ma'lumotlarni saqlab qoladi 
    },
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page); // Hozirgi sahifani yangilash
    setPageSize(pageSize);
  };

  // Manzillarni post qilish

  const resetForm = () => {
    setName('');
  };

  const queryClient = new QueryClient();

  const [name, setName] = useState('');

  const postAddressData = useMutation({
    mutationFn: async () => {
      const res = await axios.post(`${addRegion}`, { name }, config);
      return (res.data as { body: { body: string } }).body.body;
    },
    onSuccess: () => {
      toast.success("Manzil qo'shildi");
      queryClient.invalidateQueries('getAddress');
    },
    onError: (error) => {
      console.log('Xatolik:', error);
    },
  });

  // Manzillarni o'chirish
  const deleteAddress = useMutation({
    mutationFn: async (addressId) => {
      await axios.delete(`${deleteRegion}${addressId}`, config);
    },
    onSuccess: () => {
      toast.success("Manzil o'chirildi");
      queryClient.invalidateQueries('getAddress');
    },
    onError: (error) => {
      toast.error('Xatolik yuz berdi');
      console.log('Xatolik:', error);
    },
  });

  // Manzillarni put qilish
  const updateAddress = useMutation({
    mutationFn: async (addressId) => {
      await axios.put(`${updateRegion}${addressId}`, { name }, config);
    },
    onSuccess: () => {
      toast.success('Manzil yangilandi');
      queryClient.invalidateQueries('getAddress');
    },
    onError: (error) => {
      toast.error('Xatolik yuz berdi');
      console.log('Xatolik:', error);
    },
  });

  // Tumanlarni get qilish
  const { data: districts } = useQuery(
    ['getDistrict', currentPage],
    async () => {
      const res = await axios.get(
        `${getDistrict}getAllDistrictPage?page=${currentPages - 1}&size=${pageSizes}`,
        config,
      );
      //   return (res.data as { body: { body: string; }}).body.body;
      // },
      const responseData = (
        res.data as {
          body: { body: string; totalElements: number; totalPage: number };
        }
      ).body;
      setTotalItemss(responseData.totalElements); // Umumiy ma'lumotlar sonini saqlaymiz
      return responseData.body;
    },
    {
      keepPreviousData: true, // Sahifa o'zgarganda eski ma'lumotlarni saqlab qoladi
    },
  );

  const handlePageChanges = (page: number) => {
    setCurrentPages(page); // Hozirgi sahifani yangilash
    setPageSizes(pageSizes);
  };

  return (
    <div>
      
      <Helmet>
        <title>Address</title>
      </Helmet>

      <Layout>
        {isLoading ? (
          <div className="flex justify-center items-center h-[80vh]">
            <TableLoading />
          </div>
        ) : (
          <div className="p-5">
            <div className="flex justify-between">
              <h1 className="text-3xl font-bold font-sans">Manzillar</h1>
              <p className="font-sans text-gray-700">
                Boshqaruv paneli / <span className="text-blue-700">Manzil</span>
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="font-sans text-2xl text-gray-700">Viloyatlar</p>
              <Button
                onClick={showModal}
                color="default"
                variant="solid"
                className="text-xl px-5 py-6 my-5"
              >
                <PlusCircleOutlined className="text-xl" />
                Qo'shish
              </Button>
              {/* Viloyat qo'shish uchun modal */}
              <Modal
                title="Viloyat qo'shish"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                maskClosable={false}
                okText="Saqlash"
                cancelText="Bekor qilish"
                okButtonProps={{ style: { backgroundColor: 'black', color: 'white', } }}
                cancelButtonProps={{ style: { backgroundColor: 'black', color: 'white', } }}
              >
                <div className="mb-4">
                  <input
                    type="text"
                    value={name}
                    placeholder="Viloyat nomini kiriting"
                    className="border w-full p-2 rounded"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </Modal>
            </div>
            <div>
              {/* Viloyatlarni chiqarish uchun table */}
              <Table hoverable>
                <TableHead>
                  <TableHeadCell>T/P</TableHeadCell>
                  <TableHeadCell>Viloyat nomi</TableHeadCell>
                  <TableHeadCell>Harakat</TableHeadCell>
                </TableHead>
                <TableBody className="divide-y">
                  {Array.isArray(addresses) &&
                    addresses.map((item, index) => (
                      <TableRow
                        className="bg-white text-gray-700 dark:border-gray-700 dark:bg-gray-800"
                        key={item.id}
                      >
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell className="flex gap-1 text-xl cursor-pointer">
                          <MdEdit
                            // onClick={() => {
                            //   setSelectedAddress(item.id);
                            //   setPutOpen(true);
                            // }}
                            onClick={() => handlePutOpen(item)}
                          />
                          <MdDelete
                            onClick={() => {
                              setSelectedAddress(item.id);
                              setDeleteModalVisible(true);
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
              {/* pagination */}
              <Pagination
                className="mt-5"
                current={currentPage}
                total={totalItems}
                pageSize={pageSize}
                onChange={handlePageChange}
              />
            </div>

            {/* O'chirish modalini qo'shish */}
            <Modal
              // title="Viloyatni o'chirmoqchimisiz?"
              open={deleteModalVisible}
              onOk={handleDelete}
              onCancel={handleDeleteCancel}
              okText="O'chirish"
              cancelText="Bekor qilish"
              okButtonProps={{ style: { backgroundColor: 'black', color: 'white', } }}
              cancelButtonProps={{ style: { backgroundColor: 'black', color: 'white', } }}
            >
              <p className="text-center text-xl my-5 font-semibold">
                Viloyatni o'chirmoqchimisiz?
              </p>
            </Modal>

            {/* Put qilish uchun modal */}
            <Modal
              title="Viloyatni o'zgartirmoqchimisiz?"
              open={putOpen}
              onOk={handlePutOk}
              onCancel={handlePutCancel}
              okText="O'zgartirish"
              cancelText="Bekor qilish"
              okButtonProps={{ style: { backgroundColor: 'black', color: 'white', } }}
              cancelButtonProps={{ style: { backgroundColor: 'black', color: 'white', } }}
            >
              <div className="mb-4">
                <input
                  type="text"
                  value={name}
                  placeholder="Viloyat nomini O'zgartiring"
                  className="border w-full p-2 rounded"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </Modal>
            <div className="flex justify-between items-center">
              <p className="font-sans text-2xl text-gray-700">Tumanlar</p>
              <Button
                color="default"
                variant="solid"
                className="text-xl px-5 py-6 my-5"
                // onClick={showModal}
              >
                <PlusCircleOutlined className="text-xl" />
                Qo'shish
              </Button>
            </div>
            <div>
              {/* Tumanlarni chiqarish uchun table */}
              <Table hoverable>
                <TableHead>
                  <TableHeadCell>T/P</TableHeadCell>
                  <TableHeadCell>Tuman nomi</TableHeadCell>
                  <TableHeadCell>Viloyat nomi</TableHeadCell>
                  <TableHeadCell>Harakat</TableHeadCell>
                </TableHead>
                <TableBody className="divide-y">
                  {Array.isArray(districts) &&
                    districts.map((item, index) => (
                      <TableRow className="bg-white text-gray-700 dark:border-gray-700 dark:bg-gray-800">
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.regionName}</TableCell>
                        <TableCell className="flex gap-1 text-xl cursor-pointer">
                          <MdEdit />
                          <MdDelete />
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
              {/* pagination */}
              <Pagination
                className="mt-5"
                current={currentPages}
                total={totalItemss}
                pageSize={pageSizes}
                onChange={handlePageChanges}
              />
            </div>
            <div>
              <Modal
                title="Tuman qo'shish"
                // open={putOpen}
                // onOk={handlePutOk}
                // onCancel={handlePutCancel}
                okText="O'zgartirish"
                cancelText="Bekor qilish"
                okButtonProps={{ style: { backgroundColor: 'black', color: 'white', } }}
                cancelButtonProps={{ style: { backgroundColor: 'black', color: 'white', } }}
              >
                
              </Modal>
            </div>
          </div>
        )}
      </Layout>
    </div>
  );
}

export default Address;
