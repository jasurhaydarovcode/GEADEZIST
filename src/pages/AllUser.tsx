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
import { toast } from 'react-toastify';
import Modal from 'react-modal'; // For the modal

// Accessibility setup
Modal.setAppElement('#root'); 

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

  return (
    <div>
      <Helmet>
        <title>Foydalanuvchilar Natijasi</title>
      </Helmet>

      <Layout>
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
            )}
          </Modal>
        </div>
      </Layout>
    </div>
  );
}

export default AllUser;
