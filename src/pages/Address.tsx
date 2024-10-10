import Layout from "@/components/Dashboard/Layout";
import { baseUrl } from "@/helpers/api/baseUrl";
import { config } from "@/helpers/functions/token";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Modal, Pagination } from "antd";
import axios from "axios";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { useEffect, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

function Address() { 
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };
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

  const data = useQuery(['getAddress'], async () => {
    const res = await axios.get(`${baseUrl}region/getAllRegionPage?page=0&size=10`, config)
    return (res.data as { body: { body: string }}).body.body;
  })
  
  return (
    <Layout> 
      <div className="p-5">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold font-sans">Manzillar</h1>
          <p className="font-sans text-gray-700">
            Boshqaruv paneli / <span className="text-blue-700">Manzil</span>
          </p>
        </div>
        <div className="flex justify-between items-center">
          <p className="font-sans text-2xl text-gray-700">Viloyatlar</p>
          <Button onClick={showModal} color="default" variant="solid" className=" text-xl px-5 py-6 my-5">
            <PlusCircleOutlined className="text-xl"/>Qo'shish 
          </Button>
          <Modal
            title="Viloyat qo'shish"
            open={open}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            maskClosable={false}
          >
            <div className="mb-4">
              <input
                type="text"
                placeholder="Viloyat nomini kiriting"
                className="border w-full p-2 rounded"
              />
            </div>
          </Modal>
        </div>
        <div>
          <Table hoverable>
            <TableHead>
              <TableHeadCell>T/P</TableHeadCell>
              <TableHeadCell>Viloyat nomi</TableHeadCell>
              <TableHeadCell>Harakat</TableHeadCell>
            </TableHead>
            <TableBody className="divide-y">
            {Array.isArray(data.data) && data.data.map((item, index) => (
              <TableRow className="bg-white text-gray-700 dark:border-gray-700 dark:bg-gray-800">
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell className="flex gap-1 text-xl cursor-pointer">
                  <MdEdit />
                  <MdDelete />
                </TableCell>
              </TableRow>
            ))}
            </TableBody>
          </Table>
          <Pagination className="mt-5" defaultCurrent={1} total={20} />
        </div>
        <div className="flex justify-between items-center">
          <p className="font-sans text-2xl text-gray-700">Tumanlar</p>
          <Button onClick={showModal} color="default" variant="solid" className=" text-xl px-5 py-6 my-5">
            <PlusCircleOutlined className="text-xl"/>Qo'shish 
          </Button>
          <Modal
            title="Tuman qo'shish"
            open={open}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            maskClosable={false}
          >
            <div className="mb-4">
              <select className="border w-full p-2 rounded">
                <option value="">Viloyatni tanlang</option>
                <option value="main">Toshkent</option>
                <option value="main">Qashqadaryo</option>
              </select>
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Tuman nomini kiriting"
                className="border w-full p-2 rounded"
              />
            </div>
          </Modal>
        </div>
        <div>
        <Table hoverable>
            <TableHead>
              <TableHeadCell>T/P</TableHeadCell>
              <TableHeadCell>Tuman nomi</TableHeadCell>
              <TableHeadCell>Viloyat nomi</TableHeadCell>
              <TableHeadCell>Harakat</TableHeadCell>
            </TableHead>
            <TableBody className="divide-y">
              <TableRow className="bg-white text-gray-700 dark:border-gray-700 dark:bg-gray-800">
                <TableCell>1</TableCell>
                <TableCell>Chilonzor shahar</TableCell>
                <TableCell>Toshkent</TableCell>
                <TableCell className="flex gap-1 text-xl cursor-pointer">
                  <MdEdit />
                  <MdDelete  onClick={showModal}/>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Pagination className="mt-5" defaultCurrent={1} total={30} />
        </div>
      </div>
    </Layout> 
  )
} 
 
export default Address; 
