import Layout from "@/components/Dashboard/Layout";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Space, Switch, Pagination, Modal } from "antd";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import {  useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import axios from 'axios';
import { baseUrl } from "@/helpers/api/baseUrl";
import { config } from "@/helpers/functions/token";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Employees() {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
     // Pagination holati
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  
  function checkRoleClient() {
    const role = localStorage.getItem('role')
    if (role == 'ROLE_CLIENT') {
      navigate('/client/dashboard')
    } 
  }

  const { data: admins,} = useQuery(['getADmin', currentPage], async () => {
    const res = await axios.get(`${baseUrl}user/get/admin/list?page=${currentPage - 1}&size=${pageSize}`, config);
    const responseData = (res.data as { body: { body: string, totalElements: number, totalPage: number }}).body;
    setTotalItems(responseData.totalElements); // Umumiy ma'lumotlar sonini saqlaymiz
    return responseData.body;
  }, {
    keepPreviousData: true, // Sahifa o'zgarganda eski ma'lumotlarni saqlab qoladi
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page); // Hozirgi sahifani yangilash
    setPageSize(pageSize);
  };

  const navigate = useNavigate()
  useEffect(() => {
    checkRoleClient()
  }, [checkRoleClient])

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    postAdmin.mutate();
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  // const handleOk = () => {
  //   if (firstname && lastname && email && phoneNumber && password && confirmPassword && role) {
  //     if (password === confirmPassword) {
  //       postAdmin.mutate();
  //       setConfirmLoading(true);
  //       setTimeout(() => {
  //         setOpen(false);
  //         setConfirmLoading(false);
  //       }, 2000);
  //     } else {
  //       toast.error("Parollar mos kelmadi");
  //     }
  //   } else {
  //     toast.error("Barcha maydonlarni to'ldiring");
  //   }
  // };

  const handleCancel = () => {
    setOpen(false);
  };

    // Hodim holatini yangilash uchun mutatsiya yaratish
    const updateEmployeeStatus = useMutation(
      async ({ id, enabled }: { id: string, enabled: boolean }) => {
        return axios.put(`${baseUrl}user/active/${id}`, { enabled }, config);
      },
      {
        // Mutatsiya muvaffaqiyatli bo'lganda, hodimlar ro'yxatini toastga chiqarish
        onSuccess: ( data, variables ) => {
          const { enabled } = variables;
          console.log('Yangilandi:', data);
          // queryClient.invalidateQueries('getADmin'); // Adminlar ma'lumotini qayta yuklash
          if (enabled === true) {
            toast.success('Hodim muvaffaqiyatli ishga tushirildi');
          } else {
            toast.success("Hodim muvaffaqiyatli o'chirildi");
            
          }
        },
        onError: (error) => {
          console.error('Xatolik:', error);
        }
      }
    );

    // Switch o'zgarganda ishlaydigan funksiya
    const handleSwitchChange = (checked: boolean, id: string) => {
      updateEmployeeStatus.mutate({ id, enabled: checked });
    };

    // yangi hodim qo'shish funksiyasi
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('');

    const postAdmin = useMutation(async () => {
      return axios.post(`${baseUrl}auth/save/admin`, { firstname, lastname, email, phoneNumber, password, confirmPassword, role }, config);
    });

  return (
    <Layout>
      <div className="p-5">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold font-sans">Hodimlar</h1>
          <p className="font-sans text-gray-700">
            Boshqaruv paneli / <span className="text-blue-700">Hodimlar</span>
          </p>
        </div>
        <div>
          <Button onClick={showModal} color="default" variant="solid" className="text-xl px-5 py-6 my-5">
            <PlusCircleOutlined className="text-xl" /> Qo'shish
          </Button>
          <Modal
            title="Hodim qo'shish"
            open={open}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            maskClosable={false}
          >
            {/* Modal mazmuni */}
            <div className="mb-4">
              {/* <label className="block mb-2">Admin toifasini tanlang</label> */}
              <select className="border w-full p-2 rounded" value={role} onChange={(e) => setRole(e.target.value)}>
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
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Ism</label>
              <input
              type="text"
              placeholder="Ismni kiriting"
              className="border w-full p-2 rounded"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Telfon raqam</label>
              <input
              type="text"
              placeholder="Telfon raqamni kiriting"
              className="border w-full p-2 rounded"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Email kiriting</label>
              <input
              type="email"
              placeholder="Email kiriting"
              className="border w-full p-2 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Parolni kiriting</label>
              <input
              type="text"
              placeholder="Parolni kiriting"
              className="border w-full p-2 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Parolni takrorlang</label>
              <input
              type="text"
              placeholder="Takroriy parolni kiriting"
              className="border w-full p-2 rounded"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              />
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
              {Array.isArray(admins) && admins.map((item, index) => (
                <TableRow key={item.id} className="bg-white text-gray-900 dark:border-gray-700 dark:bg-gray-800">
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.firstName}</TableCell>
                  <TableCell>{item.lastName}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.role === 'ROLE_ADMIN' ? 'Tekshiruvchi admin' : 'Tester admin'}</TableCell>
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
    </Layout>
  );
}

export default Employees;
