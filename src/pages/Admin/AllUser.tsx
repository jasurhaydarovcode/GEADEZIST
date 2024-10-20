import Layout from '@/components/Dashboard/Layout';
import { getUser } from '@/helpers/api/baseUrl';
import { config } from '@/helpers/functions/token';
import { UserNatijasi } from '@/helpers/types/UserNatijasi';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { AiOutlineEye } from 'react-icons/ai';
import { FcSearch } from 'react-icons/fc';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import checkLogin from '@/helpers/functions/checkLogin';


import type { PaginationProps } from 'antd';
import { Pagination } from 'antd';



// Accessibility setup
Modal.setAppElement('#root');
checkLogin
function AllUser() {

  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (current, pageSize) => {
    console.log(current, pageSize);
  };


  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<UserNatijasi | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 8; // ! pagedagi datalar soni

  const { data: usersData, refetch } = useQuery({
    queryKey: ['User', config],
    queryFn: async () => {
      const res = await axios.get(getUser, config);
      const data = res.data as { body: { body: UserNatijasi[] } };
      return data.body.body || [];
    }
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  const GetUser: UserNatijasi[] = usersData ?? [];

  const filteredUsers = GetUser.filter((user) =>
    `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  console.log(totalPages);
  

  const handlePageChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
    console.log(`Current page: ${page}, Page size: ${pageSize}`);
  };


  const handleUserClick = (user: UserNatijasi) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className='overflow-x-hidden'>
      <Helmet>
        <title>Foydalanuvchilar</title>
      </Helmet>

      <Layout>
        <div >
          <div className="flex justify-center pt-7">
            <div className="px-8">
              <div className="w-max">
                <header className="flex items-center justify-between">
                  <h3 className="font-bold text-[27px]">Foydalanuvchilar</h3>
                  <div className="flex gap-2 text-[18px]">
                    <Link to={'/dashboard'}>
                      <h4>Boshqaruv paneli </h4>
                    </Link>
                    <h4> / </h4>
                    <h4 className="text-blue-600">Foydalanuvchilar</h4>
                  </div>
                </header>

                <div className="flex max-lg:grid max-lg:mx-auto justify-center max-xl:w-[400px] pt-5 gap-5">
                  <div className="flex max-xl:mr-7 max-lg:ml-0 max-lg:w-[350px] max-xl:ml-72 max-xl:w-[240px]">
                    <FcSearch className="absolute mt-4 ml-3  text-[20px]" />
                    <input
                      type="text"
                      id="inp1"
                      className="pl-10 w-[375px] border-gray-300 placeholder:max-xl:text-[12px] rounded-md h-[50px]"
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
                  <table className="mx-3 ml-0 w-full bg-white border border-gray-300">
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
                      {currentUsers.map((item, index) => (
                        <tr key={index} className="border-b border-gray-300">
                          <td className="px-4 py-2">{index + 1 + indexOfFirstUser}</td>
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

                <div>
                  <Pagination
                    onShowSizeChange={onShowSizeChange}
                    defaultCurrent={1}
                    total={20}
                    onChange={handlePageChange}
                  />
                </div>
              </div>
            </div>
          </div>

          <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel="User Details"
            className="relative mx-auto my-10 bg-white rounded-lg shadow-lg max-w-lg w-full p-6"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          >
            <div className='flex justify-end text-3xl'>
              <button onClick={closeModal} className='cursor-pointer hover:text-red-500'>
                <IoMdCloseCircleOutline />
              </button>
            </div>
            {selectedUser && (
              <div className="text-center pt-3 mb-7">
                <h2 className="text-3xl font-extrabold mb-8 text-[#727788] mt-[-20px]">User Details</h2>
                <p className='flex my-2 justify-between text-lg text-[#727788]'><strong>First Name:</strong><p className='text-blue-400 font-thin'> {selectedUser.firstName}</p></p>
                <p className='flex my-2 justify-between text-lg text-[#727788]'><strong>Last Name:</strong><p className='text-blue-400 font-thin'> {selectedUser.lastName}</p></p>
                <p className='flex my-2 justify-between text-lg text-[#727788]'><strong>Email:</strong><p className='text-blue-400 font-thin'> {selectedUser.email}</p></p>
              </div>
            )}
          </Modal>
        </div>
      </Layout>
    </div>
  );
}

export default AllUser;