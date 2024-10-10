import Layout from "@/components/Dashboard/Layout";
import { baseUrl } from "@/helpers/api/baseUrl";
import { config } from "@/helpers/functions/token";
import axios from "axios";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { useQuery } from "react-query";

function Category() {
  const data = useQuery(['getAddress'], async () => {
    const res = await axios.get(`${baseUrl}category/page?page=0&size=10`, config)
    return (res.data as { body: { body: string }}).body.body;
  })
  return (
    <Layout>
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
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{item.questionCount}</TableCell>
                  <TableCell>{item.extraQuestionCoun}</TableCell>
                  <TableCell>{item.durationTime}</TableCell>
                  <TableCell>{item.retakeDat}</TableCell>
                  <TableCell>{item.fileId}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
    </Layout>
  )
}

export default Category
