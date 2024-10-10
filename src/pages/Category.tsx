import Layout from "@/components/Dashboard/Layout";
import { baseUrl, getImage } from "@/helpers/api/baseUrl";
import { config } from "@/helpers/functions/token";
import axios from "axios";
import { Button, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { useQuery } from "react-query";
import defaultImage from '../assets/images/default.png';
import { PlusCircleOutlined } from '@ant-design/icons';

function Category() {
  const data = useQuery(['getAddress'], async () => {
    const res = await axios.get(`${baseUrl}category/page?page=0&size=10`, config)
    return (res.data as { body: { body: string }}).body.body;
  })
  return (
    <div>
      <Layout>
      <div className="flex justify-between">
          <h1 className="text-3xl font-bold font-sans">Hodimlar</h1>
          <p className="font-sans text-gray-700">
            Boshqaruv paneli / <span className="text-blue-700">Hodimlar</span>
          </p>
        </div>
        <div>
          <Button color="default" variant="solid" className="text-xl px-5 py-6 my-5">
            <PlusCircleOutlined className="text-xl" /> Qo'shish
          </Button>
        </div>
        <Table hoverable>
              <TableHead>
                <TableHeadCell>T/P</TableHeadCell>
                <TableHeadCell>Kategoriya rasmi</TableHeadCell>
                <TableHeadCell>Tavsifi</TableHeadCell>
                <TableHeadCell>Savollar soni</TableHeadCell>
                <TableHeadCell>Testlar soni</TableHeadCell>
                <TableHeadCell>Qo'shimcha savollar</TableHeadCell>
                <TableHeadCell>Davomiylik vaqti(m)</TableHeadCell>
                <TableHeadCell>Qayta qabul qilish sanasi</TableHeadCell>
                <TableHeadCell>Yaratgan</TableHeadCell>
                <TableHeadCell>Kategoriya holati</TableHeadCell>
                <TableHeadCell>O'chirgan</TableHeadCell>
                <TableHeadCell>Xarakat</TableHeadCell>
              </TableHead>
              <TableBody className="divide-y">
                {Array.isArray(data.data) && data.data.map((item, index) => (
                  <TableRow key={item.id} className="bg-white text-gray-900 dark:border-gray-700 dark:bg-gray-800">
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <img 
                        alt={item.name}
                        src={item.fileId ? `${getImage}${item.fileId}` : defaultImage}
                        className={'border-[1px] border-gray-300 w-[43px] h-[43px] rounded-full object-cover hover:cursor-pointer'}
                      />
                    </TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>{item.questionCount}</TableCell>
                    <TableCell>{item.extraQuestionCoun}</TableCell>
                    <TableCell>{item.retakeDate}</TableCell>
                    <TableCell>{item.createdBy}</TableCell>
                    <TableCell>{item.deleted && 'Uchirilgan'}</TableCell>
                    <TableCell>{item.deletedBy}</TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
      </Layout>

    </div>
  )
}

export default Category
