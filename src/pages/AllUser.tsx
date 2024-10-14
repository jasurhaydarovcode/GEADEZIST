import Layout from '@/components/Dashboard/Layout';
import { Button, Space, Switch, Pagination, Modal } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from 'flowbite-react';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { useEffect, useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import axios from 'axios';
import {
  activeEmployee,
  addEmployee,
  getEmployee,
} from '@/helpers/api/baseUrl';
import { config } from '@/helpers/functions/token';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import TableLoading from '@/components/spinner/TableLoading';
import { Helmet } from 'react-helmet';

function AllUser() {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  const navigate = useNavigate();

  function checkRoleClient() {
    const role = localStorage.getItem('role');
    if (role === 'ROLE_CLIENT') {
      navigate('/client/dashboard');
    }
  }

  useEffect(() => {
    checkRoleClient();
  }, [checkRoleClient]);

  // Adminlarni get qilib olish
  const { data: admins, isLoading } = useQuery(
    ['getADmin', currentPage],
    async () => {
      const res = await axios.get(
        `${getEmployee}?page=${currentPage - 1}&size=${pageSize}`,
        config,
      );
      const responseData = (
        res.data as {
          body: { body: string; totalElements: number; totalPage: number }; // Type berish
        }
      ).body;
      setTotalItems(responseData.totalElements); // Umumiy ma'lumotlar sonini saqlaymiz
      return responseData.body; // Umumiy ma'lumotlarni saqlaymiz
    },
    {
      keepPreviousData: true, // Sahifa o'zgarganda eski ma'lumotlarni saqlab qoladi
    },
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page); // Hozirgi sahifani yangilash
    setPageSize(pageSize);
  };

  // Modal ochilishi
  const showModal = () => {
    setOpen(true);
  };

  // Modal yopilishi
  const handleCancel = () => {
    resetForm();
    setOpen(false);
  };

  const handleOk = () => {
    if (
      firstname.current!.value &&
      lastname.current!.value &&
      email.current!.value &&
      phoneNumber.current!.value &&
      password.current!.value &&
      confirmPassword.current!.value &&
      role.current!.value
    ) {
      if (password.current!.value === confirmPassword.current!.value) {
        postAdmin.mutate(); // POST so'rovini yuborish
        setConfirmLoading(true);
        setTimeout(() => {
          setOpen(false);
          setConfirmLoading(false);
          resetForm(); // Forma maydonlarini tozalash
        }, 2000);
      } else {
        toast.error('Parollar mos kelmadi');
      }
    } else {
      toast.error("Barcha maydonlarni to'ldiring");
    }
  };

  // input maydonlarini tozalash
  const resetForm = () => {
    firstname.current!.value = '';
    lastname.current!.value = '';
    email.current!.value = '';
    phoneNumber.current!.value = '';
    password.current!.value = '';
    confirmPassword.current!.value = '';
    role.current!.value = '';
  };

  // Hodim holatini yangilash uchun mutatsiya yaratish
  const updateEmployeeStatus = useMutation(
    async ({ id, enabled }: { id: string; enabled: boolean }) => {
      return axios.put(`${activeEmployee}${id}`, { enabled }, config);
    },
    {
      onSuccess: (data, variables) => {
        const { enabled } = variables;
        console.log('Yangilandi:', data);
        if (enabled === true) {
          toast.success('Hodim muvaffaqiyatli ishga tushirildi');
        } else {
          toast.success("Hodim muvaffaqiyatli o'chirildi");
        }
      },
      onError: (error) => {
        console.error('Xatolik:', error);
      },
    },
  );

  // Switch o'zgarganda ishlaydigan funksiya
  const handleSwitchChange = (checked: boolean, id: string) => {
    updateEmployeeStatus.mutate({ id, enabled: checked });
  };

  // yangi hodim qo'shish funksiyasi
  const firstname = useRef<HTMLInputElement>(null);
  const lastname = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const phoneNumber = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const confirmPassword = useRef<HTMLInputElement>(null);
  const role = useRef<HTMLSelectElement>(null);

  const queryClient = useQueryClient();

  const postAdmin = useMutation(
    async () => {
      return axios.post(
        `${addEmployee}`,
        {
          firstname: firstname.current?.value, // Ref'dan qiymat olish
          lastname: lastname.current?.value,
          email: email.current?.value,
          phoneNumber: phoneNumber.current?.value,
          password: password.current?.value,
          confirmPassword: confirmPassword.current?.value,
          role: role.current?.value,
        },
        config,
      );
    },
    {
      onSuccess: () => {
        toast.success("Hodim muvaffaqiyatli qo'shildi");
        setOpen(false);
        queryClient.invalidateQueries('getADmin');
        resetForm(); // Forma maydonlarini tozalash
      },
      onError: (error) => {
        console.error('Xatolik:', error);
        toast.error("Hodim qo'shishda xatolik yuz berdi");
      },
    },
  );

  return (
    <>
      <Layout>
        <Helmet>
          <title>Foydalanuvchilar</title>
        </Helmet>
        <div className="container grid justify-center py-3">
          <div className='flex justify-between items-center'>
            <h1 className="text-2xl font-bold py-5">Foydalanuvchilar</h1>
            <div className='flex gap-2'>
              <Link to={"/dashboard"}><h4>Boshqaruv paneli</h4></Link>
              <h4>/</h4>
              <h4 className='text-blue-600'>Foydalanuvchilar</h4>
            </div>
          </div>
          <div className="flex gap-5 max-xl:w-[800px] max-2xl:w-[1000px]">
            <div className="flex pb-5">
              <input
                type="text"
                id="inp1"
                className="pl-10 w-[375px] border-gray-300 rounded-md h-[50px] "
                placeholder="Foydalanuvchini qidirish"
              />
            </div>
            <select className="max-w-[350px] w-[375px] text-gray-40 rounded-md h-[50px] placeholder:font-extralight placeholder-gray-400 border-gray-400  placeholder:text-[14px] ">
              <option selected disabled>
                Viloyatni tanlang
              </option>
              <option value="">example 1</option>
              <option value="">example 2</option>
            </select>
            <select className="max-w-[350px] w-[375px] text-gray-40 rounded-md h-[50px] placeholder:font-extralight placeholder-gray-400 border-gray-400  placeholder:text-[14px] ">
              <option selected disabled>
                Tumanni tanlang
              </option>
              <option value="">example 1</option>
              <option value="">example 2</option>
            </select>
          </div>
          <div>
            {isLoading ? (
              <div className="flex justify-center items-center h-[80vh]">
                {<TableLoading />}
              </div>
            ) : (
              <div>
                {/* <div>
                  <Modal
                    title="Hodim qo'shish"
                    centered
                    open={open}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    okText="Saqlash"
                    cancelText="Bekor qilish"
                    confirmLoading={confirmLoading}
                    maskClosable={false}
                    okButtonProps={{
                      style: { backgroundColor: 'black', color: 'white' },
                    }}
                    cancelButtonProps={{
                      style: { backgroundColor: 'black', color: 'white' },
                    }}
                  >
                    <div className="mb-4">
                      <select className="border w-full p-2 rounded" ref={role}>
                        <option value="">Admin toifasini tanlang</option>
                        <option value="ROLE_TESTER">Tester admin</option>
                        <option value="ROLE_ADMIN">Tekshiruvchi admin</option>
                      </select>
                    </div>
                    <div className="mb-4">
                      <label className="block mb-2">Ism</label>
                      <input
                        type="text"
                        placeholder="Ismni kiriting"
                        className="border w-full p-2 rounded"
                        ref={firstname}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-2">Familiya</label>
                      <input
                        type="text"
                        placeholder="Familiyani kiriting"
                        className="border w-full p-2 rounded"
                        ref={lastname}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-2">Telfon raqam</label>
                      <input
                        type="text"
                        placeholder="Telfon raqamni kiriting"
                        className="border w-full p-2 rounded"
                        ref={phoneNumber}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-2">Email kiriting</label>
                      <input
                        type="email"
                        placeholder="Email kiriting"
                        className="border w-full p-2 rounded"
                        ref={email}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-2">Parolni kiriting</label>
                      <input
                        type="password"
                        placeholder="Parolni kiriting"
                        className="border w-full p-2 rounded"
                        ref={password}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-2">Parolni takrorlang</label>
                      <input
                        type="password"
                        placeholder="Parolni tasdiqlang"
                        className="border w-full p-2 rounded"
                        ref={confirmPassword}
                      />
                    </div>
                  </Modal>
                </div> */}
                <div>
                  <Table hoverable>
                    <TableHead>
                      <TableHeadCell>T/P</TableHeadCell>
                      <TableHeadCell>Ism</TableHeadCell>
                      <TableHeadCell>Familya</TableHeadCell>
                      <TableHeadCell>Email</TableHeadCell>
                      {/* Action ustuni olib tashlandi */}
                    </TableHead>
                    <TableBody className="divide-y">
                      {Array.isArray(admins) &&
                        admins.map((item, index) => (
                          <TableRow
                            key={item.id}
                            className="  text-gray-900 dark:border-gray-700 dark:bg-gray-800"
                          >
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{item.firstName}</TableCell>
                            <TableCell>{item.lastName}</TableCell>
                            <TableCell>{item.email}</TableCell>
                            {/* Action ustuni olib tashlandi */}
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                  <Pagination
                    className="mt-5"
                    current={currentPage}
                    total={totalItems}
                    pageSize={pageSize}
                    onChange={handlePageChange}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
}

export default AllUser;