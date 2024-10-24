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

import type { PaginationProps } from 'antd';
import { Pagination } from 'antd';
import { regionType, districtType } from '@/helpers/types/AddressType';

// Accessibility setup
Modal.setAppElement('#root');

function AllUser() {
  // Pagination callback
  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (current, pageSize) => {
    console.log(current, pageSize);
  };

  // State variables
  const [selectedDistrict, setSelectedDistrict] = useState<string | undefined>();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<UserNatijasi | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10; // Number of users per page
  const [selectedRegion, setSelectedRegion] = useState<string>(''); // For storing selected region ID
  const [districts, setDistricts] = useState<districtType[]>([]); // For storing districts


  // Fetching users data
  const { data: usersData, refetch: refetchUsers } = useQuery({
    queryKey: ['User', config],
    queryFn: async () => {
      const res = await axios.get(getUser, config);
      const data = res.data as { body: { body: UserNatijasi[] } };
      return data.body.body || [];
    }
  });

  // Fetching region data
  const { data: usersRegion, refetch: refetchRegions } = useQuery({
    queryKey: ['region', config],
    queryFn: async () => {
      const res = await axios.get('http://164.92.165.18:8090/region/getAllRegionPage?page=0&size=10', config);
      const data = res.data as { body: { body: regionType[] } };
      return data.body.body || [];
    }
  });

  // Fetching districts based on selected region
  const fetchDistricts = async (regionId: string) => {
    try {
      const res = await axios.get(
        `http://164.92.165.18:8090/district/getAllDistrictPage?regionId=${regionId}&page=0&size=10`,
        config
      );
      const data = res.data as { body: { body: districtType[] } };
      setDistricts(data.body.body || []);
    } catch (error) {
      console.error('Failed to fetch districts', error);
    }
  };

  useEffect(() => {
    refetchUsers();
    refetchRegions();
  }, [refetchUsers, refetchRegions]);

  // User list and filtering logic
  const users = usersData ?? [];
  const regions = usersRegion ?? [];

  const filteredUsers = users.filter((user) =>
    `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Page change handler
  const handlePageChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
    console.log(`Current page: ${page}, Page size: ${pageSize}`);
  };

  // User click handler
  const handleUserClick = (user: UserNatijasi) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  // Modal close handler
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className=''>
      <Helmet>
        <title>Foydalanuvchilar</title>
      </Helmet>

      <Layout>
        <div>
          <div className="flex justify-center pt-7">
            <div>
              <div className="w-max">
                <header className="flex items-center max-lg:flex-col justify-between">
                  <h3 className="font-bold text-[27px]">Foydalanuvchilar</h3>
                  <div className="flex gap-2 xl:translate-x-[-10px] text-[18px]">
                    <Link to={'/dashboard'}>
                      <h4>Boshqaruv paneli </h4>
                    </Link>
                    <h4> / </h4>
                    <h4 className="text-blue-600">Foydalanuvchilar</h4>
                  </div>
                </header>

                <div className="flex max-lg:ml-5 xl:ml-[-12px] max-lg:grid max-md:ml-7 max-lg:mx-auto justify-center max-xl:w-[400px] pt-5 gap-5">
                  <div className="flex max-xl:mr-7 max-lg:ml-0 max-lg:w-[350px] max-xl:ml-[340px] max-xl:w-[240px]">
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
                  <select
                    className="max-w-[350px] w-[375px]  rounded-md h-[50px] border-gray-400"
                    onChange={(e) => {
                      const selectedRegionId = e.target.value;
                      setSelectedRegion(selectedRegionId);  // Set selected region
                      fetchDistricts(selectedRegionId);     // Fetch districts based on selected region
                      setSelectedDistrict(''); // Reset selected district when region changes
                    }}
                    value={selectedRegion}
                  >
                    <option value="">Viloyatni tanlash</option>
                    {regions.map((region, index) => (
                      <option key={index} id='regname' value={region.id}>
                        {region.name}
                      </option>
                    ))}
                  </select>
                  <select
                    className="max-w-[350px] w-[375px]  rounded-md h-[50px] border-gray-400"
                    onChange={(e) => {
                      const selectedDistrictId = e.target.value;
                      setSelectedDistrict(selectedDistrictId);
                      const selectedDistrict = districts.find(district => district.id === selectedDistrictId);
                      console.log(selectedDistrict);
                    }}
                    value={selectedDistrict}
                    disabled={!selectedRegion || !districts.length}
                  >
                    <option value="" disabled>Tumanni tanlang</option>
                    {selectedRegion && districts.map((district, index) => (
                      <option key={index} value={district.id}>
                        {district.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="py-5 max-md:ml-7 max-lg:ml-5">
                  <table className="mx-3 xl:w-[1110px] max-lg:ml-2.5 ml-0 bg-white border border-gray-300">
                    <div className='lg:w-[700px] mx-auto pb-5 max-lg:ml-[60px] lg:ml-[50px]'>
                      <thead>
                        <tr>
                          <th className="text-left max-lg:hidden xl:px-12 py-7">T/P</th>
                          <th className="text-left xl:px-12 py-2">Ism</th>
                          <th className="text-left xl:px-12 py-2">Familya</th>
                          <th className="text-left max-lg:hidden xl:px-12 py-2">Email</th>
                          <th className="text-left px-10 bg-transparent py-4">Ko'rish</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentUsers.map((item, index) => (
                          <tr key={index} className="border-b border-gray-300">
                            <td className="max-lg:px-1 max-lg:hidden xl:px-12 py-2">{index + 1 + indexOfFirstUser}</td>
                            <td className="max-lg:px-1 max-lg:border-l xl:px-12  py-2">{item.firstName}</td>
                            <td className="max-lg:px-1 max-lg:border-l xl:px-12 py-2">{item.lastName}</td>
                            <td className="max-lg:hidden xl:px-12 py-2">{item.email}</td>
                            <td className="px-14 py-2">
                              <AiOutlineEye
                                className="cursor-pointer"
                                onClick={() => handleUserClick(item)}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </div>
                  </table>
                </div>

                <div className='max-lg:grid max-lg:justify-center'>
                  <Pagination
                    onShowSizeChange={onShowSizeChange}
                    defaultCurrent={1}
                    total={filteredUsers.length}
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
