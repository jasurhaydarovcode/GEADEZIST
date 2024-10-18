import Layout from '@/components/Dashboard/Layout';
import { Button, Space, Switch, Pagination, Modal, message } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, } from 'flowbite-react';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { useEffect, useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { activeEmployee, addEmployee, getEmployee,} from '@/helpers/api/baseUrl';
import { config } from '@/helpers/functions/token';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import TableLoading from '@/components/spinner/TableLoading';
import axios from 'axios';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

function Employees() {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  // Pagination holati
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  function checkRoleClient() {
    const role = localStorage.getItem('role');
    if (role == 'ROLE_CLIENT') {
      navigate('/client/dashboard');
    }
  }

  const navigate = useNavigate();
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
    if ( firstname.current!.value && lastname.current!.value && email.current!.value && phoneNumber.current!.value && password.current!.value && confirmPassword.current!.value &&  role.current!.value) {
      if (password.current!.value === confirmPassword.current!.value) {
        // toast.error('Rolni tanlang');
        postAdmin.mutate(); // POST so'rovini yuborish
        setConfirmLoading(true);
        setTimeout(() => {
          setOpen(false);
          setConfirmLoading(false);
          resetForm(); // Forma maydonlarini tozalash
        }, 2000);
      } else {
        message.error('Parollar mos kelmadi');
      }
    } else {
      message.error("Barcha maydonlarni to'ldiring");
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
      // Mutatsiya muvaffaqiyatli bo'lganda, hodimlar ro'yxatini toastga chiqarish
      onSuccess: (data, variables) => {
        const { enabled } = variables;
        console.log('Yangilandi:', data);
        // queryClient.invalidateQueries('getADmin'); // Adminlar ma'lumotini qayta yuklash
        if (enabled === true) {
          message.success('Hodim muvaffaqiyatli ishga tushirildi');
        } else {
          message.success("Hodim muvaffaqiyatli o'chirildi");
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
        message.success("Hodim muvaffaqiyatli qo'shildi");
        setOpen(false);
        queryClient.invalidateQueries('getADmin');
        resetForm(); // Forma maydonlarini tozalash
      },
      onError: (error) => {
        console.error('Xatolik:', error);
        message.error("Hodim qo'shishda xatolik yuz berdi");
      },
    },
  );

  const [showPassword, setShowPassword] = useState(false); // Parolni ko'rsatish/yashirish holati
  const [showPasswords, setShowPasswords] = useState(false); // Parolni ko'rsatish/yashirish holati

  // Parol ko'rsatish/yashirish funksiyasi
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const togglePasswordVisibilitys = () => {
    setShowPasswords(!showPasswords);
  };

  
  return (
    <div>
      <Helmet>
        <title>Xodimlar</title>
      </Helmet>

      <Layout>
        {isLoading ? (
          <div className="flex justify-center items-center h-[80vh]">
            {<TableLoading />}
          </div>
        ) : (
          <div className="p-5">
            <div className="flex justify-between">
              <h1 className="text-3xl font-bold font-sans">Hodimlar</h1>
              <p className="font-sans text-gray-700">
               <Link to={'/'}>Boshqaruv paneli / </Link> 
                <span className="text-blue-700">Hodimlar</span>
              </p>
            </div>
            <div>
              <Button
                onClick={showModal}
                color="default"
                variant="solid"
                className="text-xl px-5 py-6 my-5"
              >
                <PlusCircleOutlined className="text-xl" /> Qo'shish
              </Button>
              <Modal
                title="Hodim qo'shish"
                centered
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Saqlash"
                cancelText="Yopish"
                confirmLoading={confirmLoading}
                maskClosable={false}
                okButtonProps={{ style: { backgroundColor: 'black', color: 'white' },}}
                cancelButtonProps={{ style: { backgroundColor: 'black', color: 'white' },}}
              >
                {/* Modal mazmuni */}
                <div className="mb-4">
                  {/* <label className="block mb-2">Admin toifasini tanlang</label> */}
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
                    type={showPassword ? 'text' : 'password'} // Parol ko'rsatish/yashirish holatiga qarab o'zgaradi
                    placeholder="Parolni kiriting"
                    className="border w-full p-2 rounded"
                    ref={password}
                  />
                   {/* Iconka qo'shish */}
                    <span
                      className="absolute cursor-pointer right-10 top-[495px] text-lg" // Iconkani input ichiga joylash
                      onClick={togglePasswordVisibility} // Iconkani bosganda parol ko'rinadi/yashirinadi
                    >
                      {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                    </span>
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Parolni takrorlang</label>
                  <input
                    type={showPasswords ? 'text' : 'password'}
                    placeholder="Parolni tasdiqlang"
                    className="border w-full p-2 rounded"
                    ref={confirmPassword}
                  />
                    <span
                      className="absolute cursor-pointer right-10 top-[585px] text-lg" // Iconkani input ichiga joylash
                      onClick={togglePasswordVisibilitys} // Iconkani bosganda parol ko'rinadi/yashirinadi
                    >
                      {showPasswords ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                    </span>
                </div>
              </Modal>
            </div>
            <div>
              <Table hoverable>
                <TableHead>
                  <TableHeadCell>T/P</TableHeadCell>
                  <TableHeadCell>Ism</TableHeadCell>
                  <TableHeadCell>Familya</TableHeadCell>
                  <TableHeadCell>Email</TableHeadCell>
                  <TableHeadCell>Lavozimi</TableHeadCell>
                  <TableHeadCell>Action</TableHeadCell>
                </TableHead>
                <TableBody className="divide-y">
                  {Array.isArray(admins) &&
                    admins.map((item, index) => (
                      <TableRow
                        key={item.id}
                        className="bg-white text-gray-900 dark:border-gray-700 dark:bg-gray-800"
                      >
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{item.firstName}</TableCell>
                        <TableCell>{item.lastName}</TableCell>
                        <TableCell>{item.email}</TableCell>
                        <TableCell>
                          {item.role === 'ROLE_ADMIN' ? 'Tekshiruvchi admin' : 'Tester admin'}
                        </TableCell>
                        <TableCell>
                          <Space direction="vertical">
                            <Switch
                              checkedChildren={<CheckOutlined />}
                              unCheckedChildren={<CloseOutlined />}
                              defaultChecked={item.enabled}
                              onChange={(checked) => handleSwitchChange(checked, item.id)}
                            />
                          </Space>
                        </TableCell>
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
      </Layout>
    </div>
  );
}

export default Employees;
