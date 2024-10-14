import Layout from '@/components/Dashboard/Layout';
import { Pagination, Modal } from 'antd';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from 'flowbite-react';
import { useEffect, useRef, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import axios from 'axios';
import {
  addEmployee,
  getEmployee,
} from '@/helpers/api/baseUrl';
import { config } from '@/helpers/functions/token';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import TableLoading from '@/components/spinner/TableLoading';
import { Helmet } from 'react-helmet';

function AllUser() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  function checkRoleClient() {
    const role = localStorage.getItem('role');
    if (role === 'ROLE_CLIENT') {
      navigate('/client/dashboard');
    }
  }

  useEffect(() => {
    checkRoleClient();
  }, [checkRoleClient]);

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

  const showModal = (user) => {
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Layout>
        <Helmet>
          <title>Foydalanuvchilar</title>
        </Helmet>
        <div className="container grid justify-center py-3">
          <div className='flex justify-between items-center'>
            <h1 className="text-2xl font-bold py-5">Foydalanuvchilar</h1>
            <div className='flex gap-2 text-[17px]'>
              <Link to={"/dashboard"}><h4>Boshqaruv paneli</h4></Link>
              <h4>/</h4>
              <h4 className='text-blue-600'>Foydalanuvchilar</h4>
            </div>
          </div>
          <div className="flex gap-5 max-xl:w-[800px] max-2xl:w-[1000px]">
            <div className="flex pb-5">
              <input
                type="text"
                id="inp1"
                className="pl-10 w-[375px] border-gray-300 placeholder:text-gray-400 rounded-md h-[50px] "
                placeholder="Foydalanuvchini qidirish"
              />
            </div>
            <select className="max-w-[350px] w-[375px] text-gray-400 rounded-md h-[50px] placeholder:text-gray-400 border-gray-400">
              <option selected disabled>
                Viloyatni tanlang
              </option>
              <option value="">example 1</option>
              <option value="">example 2</option>
            </select>
            <select className="max-w-[350px] w-[375px] text-gray-400 rounded-md h-[50px] border-gray-400">
              <option selected disabled>
                Tumanni tanlang
              </option>
              <option value="">example 1</option>
              <option value="">example 2</option>
            </select>
          </div>
          <div>
            {isLoading ? (
              <div className="flex justify-center items-center h-[80vh]">
                {<TableLoading />}
              </div>
            ) : (
              <div>
                <Table hoverable>
                  <TableHead>
                    <TableHeadCell>T/P</TableHeadCell>
                    <TableHeadCell>Ism</TableHeadCell>
                    <TableHeadCell>Familya</TableHeadCell>
                    <TableHeadCell>Email</TableHeadCell>
                    <TableHeadCell>Action</TableHeadCell>
                  </TableHead>
                  <TableBody className="divide-y">
                    {Array.isArray(admins) &&
                      admins.map((item, index) => (
                        <TableRow
                          key={item.id}
                          className="text-gray-900 dark:border-gray-700 dark:bg-gray-800"
                        >
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{item.firstName}</TableCell>
                          <TableCell>{item.lastName}</TableCell>
                          <TableCell>{item.email}</TableCell>
                          <TableCell>
                            <button onClick={() => showModal(item)} className="text-blue-600">...</button>
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
            )}
          </div>
        </div>
        <Modal
          title="Foydalanuvchi ma'lumotlari"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
          style={{ textAlign: 'left', backgroundColor: 'white' }}
        >
          {selectedUser && (
            <div>
              <p>Ismi: {selectedUser.firstName}</p>
              <p>Familyasi: {selectedUser.lastName}</p>
              <p>Электрон почтаси: {selectedUser.email}</p>
            </div>
          )}
        </Modal>
      </Layout>
    </>
  );
}

export default AllUser;