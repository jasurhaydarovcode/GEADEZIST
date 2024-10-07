import Layout from "@/components/Dashboard/Layout"
import { PlusCircleOutlined } from "@ant-design/icons"
import { Button } from "antd"
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Space, Switch } from 'antd';
import { Pagination } from 'antd';

import { useState } from 'react';
import { Modal } from 'antd';

function Employees() {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

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
  return (
    <Layout>
      <div className="p-5">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold font-sans">Hodimlar</h1>
          <p className="font-sans text-gray-700">
            Boshqaruv paneli  /  <span className="text-blue-700 ">Hodimlar</span>
          </p>
        </div>
        <div>
          <Button onClick={showModal} color="default" variant="solid" className=" text-xl px-5 py-6 my-5">
            <PlusCircleOutlined className="text-xl"/>Qo'shish 
          </Button>
          <Modal
            title="Hodim qo'shish"
            open={open}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            maskClosable={false}
          >
            {/* <h2 className="text-xl font-bold mb-4">Rasm Yuklash</h2> */}
            <div className="mb-4">
              <label className="block mb-2">Kategoriya turini tanlang</label>
              <select className="border w-full p-2 rounded">
                <option value="">Asosiy boʻlmagan kategoriya</option>
                <option value="main">Asosiy kategoriya</option>
                <option value="secondary">Asosiy boʻlmagan kategoriya</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block mb-2">Tavsif</label>
              <input
                type="text"
                placeholder="Tavsifni kiriting"
                className="border w-full p-2 rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2">Umumiy savollar soni</label>
              <input
                type="number"
                placeholder="Umumiy savollar sonini kiriting"
                className="border w-full p-2 rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2">Qo'shimcha savollar soni</label>
              <input
                type="number"
                placeholder="Qo'shimcha savollar sonini kiriting"
                className="border w-full p-2 rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2">Davomiylik vaqti (m)</label>
              <input
                type="number"
                placeholder="Davomiylik vaqti (minutlarda)"
                className="border w-full p-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Davomiylik vaqti (m)</label>
              <input
                type="number"
                placeholder="Davomiylik vaqti (minutlarda)"
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
              <TableHeadCell>Electron pochta</TableHeadCell>
              <TableHeadCell>Lavozimi</TableHeadCell>
              <TableHeadCell>Action</TableHeadCell>
            </TableHead>
            <TableBody className="divide-y">
              <TableRow className="bg-white text-gray-900 dark:border-gray-700 dark:bg-gray-800">
                <TableCell>
                  {'Apple MacBook Pro 17"'}
                </TableCell>
                <TableCell>Sliver</TableCell>
                <TableCell>Laptop</TableCell>
                <TableCell>$2999</TableCell>
                <TableCell>$2999</TableCell>
                <TableCell>
                  <Space direction="vertical">
                    <Switch
                      checkedChildren={<CheckOutlined />}
                      unCheckedChildren={<CloseOutlined />}
                      defaultChecked
                    />
                  </Space>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Pagination className="mt-5" defaultCurrent={1} total={10} />
        </div>
      </div>
    </Layout>
  )
}

export default Employees