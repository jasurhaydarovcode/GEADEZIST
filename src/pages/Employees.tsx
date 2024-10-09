import Layout from "@/components/Dashboard/Layout";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Space, Switch, Pagination, Modal } from "antd";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import {  useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import axios from 'axios';
import { baseUrl } from "@/helpers/api/baseUrl";
import { config } from "@/helpers/functions/token";
import { useNavigate } from "react-router-dom";

function Employees() {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const queryClient = useQueryClient();

  const { data: admins,} = useQuery(['getADmin'], async () => {
    const res = await axios.get(`${baseUrl}user/get/admin/list?page=0&size=10`, config);
    return (res.data as { body: { body: string }}).body.body;
  });
  const navigate = useNavigate()
  function checkRoleClient() {
    const role = localStorage.getItem('role')
    if (role == 'ROLE_CLIENT') {
      navigate('/client/dashboard')
    } 
  }
  useEffect(() => {
    checkRoleClient()
  }, [checkRoleClient])

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

    // Hodim holatini yangilash uchun mutatsiya yaratish
    const updateEmployeeStatus = useMutation(
      async ({ id, enabled }: { id: string, enabled: boolean }) => {
        return axios.put(`${baseUrl}user/active/${id}`, { enabled }, config);
      },
      {
        // Mutatsiya muvaffaqiyatli bo'lganda, hodimlar ro'yxatini qayta so'rash
        onSuccess: () => {
          queryClient.invalidateQueries('getADmin'); // Adminlar ma'lumotini qayta yuklash
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
              <select className="border w-full p-2 rounded">
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
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Telfon raqam</label>
              <input
              type="text"
              placeholder="Telfon raqamni kiriting"
              className="border w-full p-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Email kiriting</label>
              <input
              type="email"
              placeholder="Email kiriting"
              className="border w-full p-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Parolni kiriting</label>
              <input
              type="text"
              placeholder="Parolni kiriting"
              className="border w-full p-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Parolni takrorlang</label>
              <input
              type="text"
              placeholder="Takroriy parolni kiriting"
              className="border w-full p-2 rounded"
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
          <Pagination className="mt-5" defaultCurrent={1} total={10} />
        </div>
      </div>
    </Layout>
  );
}

export default Employees;
