import Layout from '@/components/Dashboard/Layout';
<<<<<<< HEAD
import { Pagination, Modal } from 'antd';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { getEmployee } from '@/helpers/api/baseUrl';
import { config } from '@/helpers/functions/token';
import { Link, useNavigate } from 'react-router-dom';
import TableLoading from '@/components/spinner/TableLoading';
=======
import { getUser } from '@/helpers/api/baseUrl';
import { config } from '@/helpers/functions/token';
import { UserNatijasi } from '@/helpers/types/UserNatijasi';
import axios from 'axios';
import { useEffect, useState } from 'react';
>>>>>>> 08f4ee9130b221f299f668a594f030d58a67e63c
import { Helmet } from 'react-helmet';
import { AiOutlineEye } from 'react-icons/ai';
import { FcSearch } from 'react-icons/fc';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Modal from 'react-modal'; // For the modal

// Accessibility setup
Modal.setAppElement('#root'); 

<<<<<<< HEAD
interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  region?: string;
  district?: string;
  street?: string;
}

function AllUser() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const checkRoleClient = () => {
    const role = localStorage.getItem('role');
    if (role === 'ROLE_CLIENT') {
      navigate('/client/dashboard');
    }
  };

  useEffect(() => {
    checkRoleClient();
  }, []);

  const { data: admins, isLoading } = useQuery<User[]>(
    ['getADmin', currentPage],
    async () => {
      const res = await axios.get(
        `${getEmployee}?page=${currentPage - 1}&size=${pageSize}`,
        config,
      );
      const responseData = res.data.body;
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

  const showModal = (user: User) => {
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

=======
function AllUser() {
  const [searchQuery, setSearchQuery] = useState(''); 
  const [selectedUser, setSelectedUser] = useState<UserNatijasi | null>(null); // Track selected user
  const [isModalOpen, setIsModalOpen] = useState(false); // Track modal open state

  const { data: usersData, refetch } = useQuery({
    queryKey: ['User', config],
    queryFn: async () => {
      const res = await axios.get(getUser, config);
      const data = res.data as { body: UserNatijasi[] };
      return data.body?.body || [] ;
    },
    onError: (error) => {
      console.log(error);
      toast.error('Xatolik yuz berdi');
    },
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  const GetUser: UserNatijasi[] = usersData ?? [];

  const filteredUsers = GetUser.filter((user) =>
    `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUserClick = (user: UserNatijasi) => {
    setSelectedUser(user); // Set the selected user
    setIsModalOpen(true);  // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
    setSelectedUser(null); // Clear the selected user
  };

>>>>>>> 08f4ee9130b221f299f668a594f030d58a67e63c
  return (
    <div>
      <Helmet>
        <title>Foydalanuvchilar Natijasi</title>
      </Helmet>

      <Layout>
<<<<<<< HEAD
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
                className="pl-10 w-[375px] border-gray-300 placeholder:text-gray-400 rounded-md h-[50px]"
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
                <TableLoading />
              </div>
            ) : (
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
            )}
            <Pagination
              className="mt-5"
              current={currentPage}
              total={totalItems}
              pageSize={pageSize}
              onChange={handlePageChange}
            />
          </div>
        </div>
        <div>
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
                <p>Email: {selectedUser.email}</p>
              </div>
=======
        <div>
          <div className="flex justify-center pt-7">
            <div className="px-8">
              <div className="w-max">
                <header className="flex items-center justify-between">
                  <h3 className="font-bold text-[27px]">Foydalanuvchilar natijasi</h3>
                  <div className="flex gap-2 text-[18px]">
                    <Link to={'/dashboard'}>
                      <h4>Boshqaruv paneli </h4>
                    </Link>
                    <h4> / </h4>
                    <h4 className="text-blue-600"> Foydalanuvchilar</h4>
                  </div>
                </header>

                <div className="flex justify-end pt-5 gap-5">
                  <div className="flex relative">
                    <FcSearch className="absolute mt-4 ml-3 text-[20px]" />
                    <input
                      type="text"
                      id="inp1"
                      className="pl-10 w-[375px] border-gray-300 rounded-md h-[50px]"
                      placeholder="Ism yoki familya bo'yicha qidirish"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  <select className="max-w-[350px] w-[375px] text-gray-400 rounded-md h-[50px] border-gray-400">
                    <option value="">Tumanni tanlang</option>
                    <option value="">example 1</option>
                    <option value="">example 2</option>
                  </select>
                  <select className="max-w-[350px] w-[375px] text-gray-400 rounded-md h-[50px] border-gray-400">
                    <option value="">Viloyatni tanlang</option>
                    <option value="">example 1</option>
                    <option value="">example 2</option>
                  </select> 
                </div>

                <div className="py-5">
                  <table className="mx-3 ml-[0px] w-full bg-white border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="text-left px-4 py-7">T/P</th>
                        <th className="text-left px-4 py-2">Ism</th>
                        <th className="text-left px-4 py-2">Familya</th>
                        <th className="text-left px-4 py-2">Email</th>
                        <th className="text-left px-10 py-4">Harakat</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((item, index) => (
                        <tr key={index} className="border-b border-gray-300">
                          <td className="px-4 py-2">{index + 1}</td>
                          <td className="px-4 py-2">{item.firstName}</td>
                          <td className="px-4 py-2">{item.lastName}</td>
                          <td className="px-4 py-2">{item.email}</td>
                          <td className="px-14 py-2">
                            <AiOutlineEye
                              className="cursor-pointer"
                              onClick={() => handleUserClick(item)}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Modal for displaying user details */}
          <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel="User Details"
            className="relative mx-auto my-10 bg-white rounded-lg shadow-lg max-w-lg w-full p-6"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          >
            {selectedUser && (
              <div className="text-center pt-3">
                <h2 className="text-2xl font-bold mb-4">User Details</h2>
                <p><strong>First Name:</strong> {selectedUser.firstName}</p>
                <p><strong>Last Name:</strong> {selectedUser.lastName}</p>
                <p><strong>Email:</strong> {selectedUser.email}</p>
                <button
                  onClick={closeModal}
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Close
                </button>
              </div>
>>>>>>> 08f4ee9130b221f299f668a594f030d58a67e63c
            )}
          </Modal>
        </div>
      </Layout>
    </div>
  );
}

export default AllUser;