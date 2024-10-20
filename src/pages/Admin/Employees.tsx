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
import CheckLogin from '@/helpers/functions/checkLogin';
import { showErrorMessage } from '@/helpers/functions/message';

function Employees() {
  CheckLogin

  const formatPhoneNumber = (value: string) => {
    let digits = value.replace(/\D/g, '');

    if (!digits.startsWith('998')) {
      digits = '998' + digits;
    }

    if (digits.length <= 3) {
      return '+' + digits;
    } else if (digits.length <= 5) {
      return `+${digits.slice(0, 3)} ${digits.slice(3, 5)}`;
    } else if (digits.length <= 8) {
      return `+${digits.slice(0, 3)} ${digits.slice(3, 5)} ${digits.slice(5, 8)}`;
    } else if (digits.length <= 10) {
      return `+${digits.slice(0, 3)} ${digits.slice(3, 5)} ${digits.slice(5, 8)} ${digits.slice(8, 10)}`;
    } else {
      return `+${digits.slice(0, 3)} ${digits.slice(3, 5)} ${digits.slice(5, 8)} ${digits.slice(8, 10)} ${digits.slice(10, 12)}`;
    }
  };

  const formatForSwagger = (value: string) => {
    return value.replace(/\s/g, ''); 
};

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    phoneNumber.current!.value = formattedPhoneNumber;
  };

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
          body: { body: string; totalElements: number; totalPage: number }; 
        }
      ).body;
      setTotalItems(responseData.totalElements); 
      return responseData.body; 
    },
    {
      keepPreviousData: true, 
    },
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page); 
    setPageSize(pageSize);
  };

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    resetForm();
    setOpen(false);
  };

  const handleOk = () => {
    const formattedPhoneNumber = formatForSwagger(phoneNumber.current!.value);
    phoneNumber.current!.value = formattedPhoneNumber;
    if ( firstname.current!.value && lastname.current!.value && email.current!.value && phoneNumber.current!.value && password.current!.value && confirmPassword.current!.value &&  role.current!.value) {
      if (phoneNumber.current!.value.length > 12) {
        if (password.current!.value === confirmPassword.current!.value) {
          postAdmin.mutate(); 
          setConfirmLoading(true);
          setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
            resetForm(); 
          }, 1000);
        } else {
          showErrorMessage('Parollar mos kelmadi');
        }
      } else {
        showErrorMessage('Telefon raqamini toliq kiriting');
      }
    } else {
      showErrorMessage("Barcha maydonlarni to'ldiring");
    }
  };


  // input maydonlarini tozalash
  const resetForm = () => {
    firstname.current!.value = '';
    lastname.current!.value = '';
    email.current!.value = '';
    phoneNumber.current!.value = '+998';
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
        // console.log(data);
        // queryClient.invalidateQueries('getADmin'); 
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
      const formattedPhoneNumber = formatForSwagger(phoneNumber.current!.value);
      return axios.post(
        `${addEmployee}`,
        {
          firstname: firstname.current?.value, 
          lastname: lastname.current?.value,
          email: email.current?.value,
          phoneNumber: formattedPhoneNumber.replace('+', ''),
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
        resetForm(); 
      },
      onError: (error) => {
        console.error('Xatolik:', error);
        showErrorMessage("Hodim qo'shishda xatolik yuz berdi");
      },
    },
  );

  
  // Parol ko'rsatish/yashirish funksiyasi
  const [showPassword, setShowPassword] = useState(false); 
  const [showPasswords, setShowPasswords] = useState(false); 
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
                    defaultValue={"+998"}
                    ref={phoneNumber}
                    onChange={handlePhoneNumberChange}
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
                    type={showPassword ? 'text' : 'password'} 
                    placeholder="Parolni kiriting"
                    className="border w-full p-2 rounded"
                    ref={password}
                  />
                   {/* Iconka qo'shish */}
                    <span
                      className="absolute cursor-pointer right-10 top-[495px] text-lg" 
                      onClick={togglePasswordVisibility} 
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
                      className="absolute cursor-pointer right-10 top-[585px] text-lg" 
                      onClick={togglePasswordVisibilitys} 
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