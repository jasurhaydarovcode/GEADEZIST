import Layout from "@/components/Dashboard/Layout";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Pagination } from "antd";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { MdDelete, MdEdit } from "react-icons/md";

function Address() {
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
          <Button color="default" variant="solid" className=" text-xl px-5 py-6 my-5">
            <PlusCircleOutlined className="text-xl"/>Qo'shish 
          </Button>
        </div>
        <div>
        <Table hoverable>
            <TableHead>
              <TableHeadCell>T/P</TableHeadCell>
              <TableHeadCell>Viloyat nomi</TableHeadCell>
              <TableHeadCell>Harakat</TableHeadCell>
            </TableHead>
            <TableBody className="divide-y">
              <TableRow className="bg-white text-gray-700 dark:border-gray-700 dark:bg-gray-800">
                <TableCell>1</TableCell>
                <TableCell>Toshkent</TableCell>
                <TableCell className="flex gap-1 text-xl cursor-pointer">
                  <MdEdit />
                  <MdDelete />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Pagination className="mt-5" defaultCurrent={1} total={20} />
        </div>
      </div>
    </Layout>
  )
}

export default Address;
