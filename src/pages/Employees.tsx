import Layout from "@/components/Dashboard/Layout";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Space, Switch, Pagination, Modal,  } from "antd";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import axios from 'axios';
import { baseUrl } from "@/helpers/api/baseUrl";
import { config } from "@/helpers/functions/token";

function Employees() {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  
  const queryClient = useQueryClient();

  const { data: admins } = useQuery(['getADmin'], async () => {
    const res = await axios.get(`${baseUrl}user/get/admin/list?page=0&size=10`, config);
    return (res.data as { body: { body: string }}).body.body;
  });

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  // Switch o'zgarganda ishlaydigan funksiya
  const handleSwitchChange = (checked: boolean, id: string) => {
    // Hodim holatini yangilash uchun PUT so'rov
    axios.put(`${baseUrl}user/active/${id}`, { enabled: checked }, config)
      .then(() => queryClient.invalidateQueries('getADmin'))
      .catch(err => console.error(err));
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
            <div className="mb-4">
              <select name="role"  className="border w-full p-2 rounded">
                <option value="">Admin toifasini tanlang</option>
                <option value="ROLE_TESTER">Tester admin</option>
                <option value="ROLE_ADMIN">Tekshiruvchi admin</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-2">Ism</label>
              <input
                type="text"
                name="firstname"
                placeholder="Ismni kiriting"
                className="border w-full p-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Familiya</label>
              <input
                type="text"
                name="lastname"
                placeholder="Familiyani kiriting"
                className="border w-full p-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Telefon raqam</label>
              <input
                type="text"
                name="phoneNumber"
                placeholder="Telefon raqamni kiriting"
                className="border w-full p-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Emailni kiriting"
                className="border w-full p-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Parol</label>
              <input
                type="password"
                name="password"
                placeholder="Parolni kiriting"
                className="border w-full p-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Parolni takrorlang</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Parolni takror kiriting"
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
                        checked={item.enabled}
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
