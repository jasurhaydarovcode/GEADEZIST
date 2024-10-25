import React, { useEffect, useRef, useState } from 'react';
import Layout from '@/components/Dashboard/Layout';
import { baseUrl, getResult } from '@/helpers/api/baseUrl';
import { config } from '@/helpers/functions/token';
import { UserNatijasi } from '@/helpers/types/UserNatijasi';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { useMutation, useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { Dropdown, Menu, message, Modal, Input, Spin, Space, InputRef, Pagination } from 'antd';
import CheckLogin from '@/helpers/functions/checkLogin';
import { EllipsisVerticalIcon } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react';
import { showErrorMessage } from '@/helpers/functions/message';
import Navbar from '@/components/Dashboard/Navbar';

const InspectorAdmin: React.FC = () => {
  CheckLogin;

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [loadingDetails, setLoadingDetails] = useState<boolean>(false);
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [isModalVisibled, setIsModalVisibled] = useState(false);
  const [tasdiqlash, setTasdiqlash] = useState(false);
  const refName = useRef<InputRef>(null);
  // const [qaytaTest, setQaytaTest] = useState(false);

  // const qaytaModal = () => {
  //   setQaytaTest(true);
  // };

  // const qaytaTestClose = () => {
  //   setQaytaTest(false);
  // };

  // const qaytaTestOk = () => {
  //   qaytaTopshirish.mutate(selectedUser.id);
  //   setQaytaTest(false);
  // };

  const modalTasdiqlash = () => {
    setTasdiqlash(true);
  };

  const tashdiqlashClose = () => {
    setTasdiqlash(false);
    deleteInput();
  };

  const deleteInput = () => {
    refName.current!.value = '';
  };

  const tasdiqlashMutation = useMutation({
    mutationFn: async (selectedUser: UserNatijasi) => {
      const res = await axios.put(`${baseUrl}result/update-status/${selectedUser}?status=APPROVED&practicalScore=0`, {}, config);
      return res.data;
    },
    onSuccess: () => {
      message.success("Natija muvaffaqiyatli tasdiqlandi");
      refetch();
      setTasdiqlash(false);
      deleteInput();
    },
    onError: (error) => {
      console.error('Xatolik:', error);
      showErrorMessage("Natija qo'shishda xatolik yuz berdi");
    },
  });
  const [selectedUser, setSelectedUser] = useState<UserNatijasi | null>(null); // Tanlangan foydalanuvchi

  const bekorQilish = useMutation({
    mutationFn: async (selectedUser: UserNatijasi) => {
      const res = await axios.put(`${baseUrl}result/update-status/${selectedUser}?status=CANCELLED&practicalScore=0`, {}, config);
      return res.data;
    },
    onSuccess: () => {
      message.success("Natija muvaffaqiyatli bekor qilindi");
      setIsModalVisibled(false);
      refetch();
    },
    onError: (error) => {
      console.error('Xatolik:', error);
      showErrorMessage("Natija qo'shishda xatolik yuz berdi");
    },
  });

  // const qaytaTopshirish = useMutation({
  //   mutationFn: async (selectedUser: UserNatijasi) => {
  //     const res = await axios.put(`${baseUrl}result/update-status/expiredDate?userId=${selectedUser}&categoryId=${selectedUser.categoryId}`, {}, config);
  //     return res.data;
  //   },
  //   onSuccess: () => {
  //     message.success("Natija muvaffaqiyatli qayta topshirildi");
  //     setIsModalVisibled(false);
  //     refetch();
  //   },
  //   onError: (error) => {
  //     console.error('Xatolik:', error);
  //     showErrorMessage("Natija qo'shishda xatolik yuz berdi");
  //   },
  // });

  const tasdiqlashOk = () => {
    tasdiqlashMutation.mutate(selectedUser!.id);
  };

  const showModal = () => {
    setIsModalVisibled(true);
  };

  const handleClose = () => {
    setIsModalVisibled(false);
  };

  const handleOk = () => {
    bekorQilish.mutate(selectedUser?.id);
  };

  const { data: usersData, refetch } = useQuery({
    queryKey: ['User', config],
    queryFn: async () => {
      const res = await axios.get(getResult, config);
      const data = res.data as { body: { body: UserNatijasi[] } };
      return data.body?.body || [];
    },
    onError: (error) => {
      console.log(error);
      message.error('Xatolik yuz berdi');
    },
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  const GetResult: UserNatijasi[] = usersData ?? [];

  // Foydalanuvchilarni searchQuery va selectedStatus bo'yicha filtrlaymiz
  const filteredUsers = GetResult.filter(
    (user) =>
      `${user.fullName} ${user.phoneNumber}`.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedStatus === '' || user.status === selectedStatus) // Status bo'yicha filtr
  );

  // Natijalarni ko'rish uchun modal ochish
  const showUserDetails = async (user: UserNatijasi) => {
    setLoadingDetails(true);
    setSelectedUser(user);
    setIsModalVisible(true);
    try {
      const res = await axios.get(`/result/get-one/${user.resultId}`, config);
      setSelectedUser({ ...user, result: res.data.body });
    } catch (error) {
      message.error('Natijalarni olishda xatolik yuz berdi.');
    } finally {
      setLoadingDetails(false);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedUser(null);
  };

  const categoryGet = useQuery(
    ['category', config],
    async () => {
      const res = await axios.get(`${baseUrl}category/list`, config);
      return (res.data as { body: { body: string; } }).body;
    }
  )

  const [page, setPage] = useState<number>(1); // Hozirgi sahifa
  const [totalUsers, setTotalUsers] = useState<number>(0); // Umumiy foydalanuvchilar soni

  return (
    <div className="overflow-x-hidden">
      <Helmet>
        <title>Foydalanuvchilar Natijasi</title>
      </Helmet>
      <Navbar />
      <div>
        <div className="flex justify-center pt-7">
          <div>
            <div className="w-max">
              <header className="flex items-center justify-between">
                <h3 className="font-bold text-[27px]">Foydalanuvchilar natijasi</h3>
                <div className="flex gap-2 text-[18px]">
                  <Link to={'/dashboard'}>
                    <h4>Boshqaruv paneli / </h4>
                  </Link>
                  <h4 className="text-blue-600"> Foydalanuvchilar</h4>
                </div>
              </header>

              <div className="flex justify-end pt-5 gap-5">
                <div className="flex">
                  <label htmlFor="inp1">

                  </label>
                  <input
                    type="text"
                    id="inp1"
                    className=" w-[375px] border-gray-300 rounded-md h-[50px]"
                    placeholder="🔍Ism yoki familya bo'yicha qidirish"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <select
                  className="max-w-[350px] w-[375px] text-gray-40 rounded-md h-[50px] placeholder:font-extralight placeholder-gray-400 border-gray-400 placeholder:text-[14px]"
                >
                  <option value="">Kategoriyani tanlang</option>
                  {Array.isArray(categoryGet.data) &&
                    categoryGet.data.map((category) => (
                      <option key={category.id} >
                        {category.name}
                      </option>
                    ))}
                </select>

                {/* Status Select */}
                <select
                  className="max-w-[350px] w-[375px] text-gray-40 rounded-md h-[50px] placeholder:font-extralight placeholder-gray-400 border-gray-400 placeholder:text-[14px]"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="">Statusni tanlang</option>
                  <option value="WAITING">Kutilmoqda</option>
                  <option value="APPROVED">Tekshirilganlar</option>
                  <option value="CANCELLED">Bekor qilinganlar</option>
                </select>
              </div>

              <div className="py-5">
                <Table>
                  <TableHead>
                    <TableHeadCell>T/P</TableHeadCell>
                    <TableHeadCell>Tuliq ismi</TableHeadCell>
                    <TableHeadCell>Category</TableHeadCell>
                    <TableHeadCell>Telefon</TableHeadCell>
                    <TableHeadCell>Qayta test topshirish</TableHeadCell>
                    <TableHeadCell>Status</TableHeadCell>
                    <TableHeadCell>Xarakat</TableHeadCell>
                  </TableHead>
                  <TableBody className="divide-y">
                    {Array.isArray(filteredUsers) &&
                      filteredUsers.map((item, index) => (
                        <TableRow
                          key={item.id}
                          className="bg-white text-gray-900 dark:border-gray-700 dark:bg-gray-800"
                        >
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{item.fullName}</TableCell>
                          <TableCell>{item.categoryName}</TableCell>
                          <TableCell>{item.phoneNumber}</TableCell>
                          <TableCell>
                            {item.expiredDate && (
                              <>
                                {new Date(item.expiredDate) <= new Date() ? (
                                  <span className="text-gray-800">
                                    Testni ishlashingiz mumkin
                                  </span>
                                ) : (
                                  <span className="text-sm text-gray-800">
                                    {Math.max(0, Math.floor((new Date(item.expiredDate) - new Date()) / (1000 * 60 * 60 * 24)))} kun qoldi
                                  </span>
                                )}
                              </>
                            )}
                          </TableCell>
                          <TableCell>
                            <button
                              className={`
                                  px-4 py-2 rounded-2xl 
                                  ${item.status === "CANCELLED" ? "bg-red-500" : ""} 
                                  ${item.status === "WAITING" ? "bg-yellow-300" : ""} 
                                  ${item.status === "APPROVED" ? "bg-green-400" : ""}
                                  text-black 
                                `}
                            >
                              {item.status === "CANCELLED" ? "Bekor qilingan" : ""}
                              {item.status === "WAITING" ? "Kutilmoqda..." : ""}
                              {item.status === "APPROVED" ? "Tasdiqlangan" : ""}
                            </button>
                          </TableCell>
                          <TableCell>
                            <Space direction="vertical">
                              <Space wrap>
                                <Dropdown overlay={
                                  <Menu>
                                    <Menu.Item key="1">
                                      <Link to={`/archive/${item.id}`}>Arxivni ko'rish</Link>
                                    </Menu.Item>
                                    <Menu.Item key="2" onClick={() => showUserDetails(item)}>
                                      <button className='w-full flex'>Natijani ko'rish</button>
                                    </Menu.Item>
                                    <Menu.Item key="3" onClick={() => (modalTasdiqlash(), setSelectedUser(item))}>
                                      <button className='w-full flex'>Tasdiqlash</button>
                                    </Menu.Item>
                                    <Menu.Item key="4" onClick={() => (showModal(), setSelectedUser(item))}>
                                      <button className='w-full flex'>Bekor qilish</button>
                                    </Menu.Item>
                                  </Menu>
                                }
                                  placement="bottomRight"
                                  arrow={{ pointAtCenter: true }}
                                >
                                  <EllipsisVerticalIcon className="h-6 w-6 text-gray-500" />
                                </Dropdown>
                              </Space>
                            </Space>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
                {/* Pagination qo'shish */}
                <Pagination
                  current={page} // Hozirgi sahifa
                  pageSize={10} // Har bir sahifada ko'rsatiladigan foydalanuvchilar soni
                  total={totalUsers} // Umumiy foydalanuvchilar soni
                  onChange={(page) => setPage(page)} // Sahifani o'zgartirish
                  showSizeChanger={false} // O'lcham o'zgartirishni ko'rsatmaslik
                  className="mt-4" // Margin qo'shish
                />
              </div>
            </div>
          </div>
        </div>
        {/* Modal info */}
        <Modal visible={isModalVisible} onCancel={handleCancel} footer={null}>
          {loadingDetails ? (
            <Spin />
          ) : selectedUser ? (
            <div>
              <h2 className="text-2xl font-extrabold my-4 text-center text-[#727788]">Foydalanuvchi natijalari</h2>
              <p className='flex my-2 justify-between text-lg text-[#517aff] '><strong className='text-[#727788]'>Tuliq ismi:</strong> {selectedUser.fullName}</p>
              <p className='flex my-2 justify-between text-lg text-[#517aff] '><strong className='text-[#727788]'>Category</strong > {selectedUser.categoryName}</p>
              <p className='flex my-2 justify-between text-lg text-[#517aff] '><strong className='text-[#727788]'>Telefon</strong> {selectedUser.phoneNumber}</p>
              <p className='flex my-2 justify-between text-lg text-[#517aff] '><strong className='text-[#727788]'>Status:</strong> {selectedUser.status}</p>
              <p className='flex my-2 justify-between text-lg text-[#517aff] '><strong className='text-[#727788]'>Qayta test topshirish:</strong> {selectedUser.expiredDate}</p>
            </div>
          ) : (
            <h2 className="text-2xl font-extrabold my-4 text-center text-[#727788]">Natijalar topilmadi</h2>
          )}
        </Modal>
        {/* Tasdiqlash uchun modal */}
        <Modal
          title="Natijani tasdiqlash"
          open={tasdiqlash}
          onOk={tasdiqlashOk}
          onCancel={tashdiqlashClose}
          cancelText="Bekor qilish"
          okText="Tasdiqlash"
        >
          <div>
            <label htmlFor="rating">Baholash:</label>
            <Input
              type="number"
              id="rating"
              ref={refName}
              className="border rounded-md w-full p-2"
            />
          </div>
        </Modal>
        {/* Bekor qilish uchun modal */}
        <Modal open={isModalVisibled} onOk={handleOk} onCancel={handleClose} okText="Tasdiqlash" cancelText="Bekor qilish">
          <p className='text-lg text-center mt-4 font-semibold'>Natijani bekor qilmoqchimisiz</p>
        </Modal>
        {/* Qayta test topshirish */}
        {/* <Modal okText="Ha" cancelText="Yopish" open={qaytaTest} onOk={qaytaTestOk} onCancel={qaytaTestClose}>
            <p className='text-lg text-center mt-8 mb-4 p-[5px] font-semibold'>Rostdan ham bu foydalanuvchiga qayta test topshirishga ruxsat bermoqchimisiz</p>
          </Modal> */}
      </div>
    </div>
  );
};

export default InspectorAdmin;
