import React, { useEffect, useState } from 'react';
import Layout from '@/components/Dashboard/Layout';
import { getResult } from '@/helpers/api/baseUrl';
import { config } from '@/helpers/functions/token';
import { UserNatijasi } from '@/helpers/types/UserNatijasi';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { FcSearch } from 'react-icons/fc';
import { SlArrowDown } from 'react-icons/sl';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { Button, Dropdown, Menu, message, Modal, Input, Spin } from 'antd';
import CheckLogin from '@/helpers/functions/checkLogin';
import { EllipsisOutlined } from '@ant-design/icons';

const User: React.FC = () => {
  CheckLogin;

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<UserNatijasi | null>(null); // Tanlangan foydalanuvchi
  const [loadingDetails, setLoadingDetails] = useState<boolean>(false); // Yuklanayotganini ko'rsatish
  const [selectedStatus, setSelectedStatus] = useState<string>(''); // Status uchun state
  const [isRatingModalVisible, setIsRatingModalVisible] = useState<boolean>(false); // Tasdiqlash modalining holati
  const [rating, setRating] = useState<string>(''); // Baholash input qiymati
  const [isRatingValid, setIsRatingValid] = useState<boolean>(false); // Baholash uchun validatsiya

  const { data: usersData, refetch } = useQuery({
    queryKey: ['User', config],
    queryFn: async () => {
      const res = await axios.get(getResult, config);
      const data = res.data as { body: { body: UserNatijasi[] } };
      return data.body?.body || [];
    },
    onError: (error) => {
      message.error('Xatolik yuz berdi');
    },
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  const GetResult: UserNatijasi[] = usersData ?? [];

  // Foydalanuvchilarni searchQuery va selectedStatus bo'yicha filtrlaymiz
  const filteredUsers = GetResult.filter(
    (user) =>
      `${user.fullName} ${user.phoneNumber}`.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedStatus === '' || user.status === selectedStatus) // Status bo'yicha filtr
  );

  // Natijalarni ko'rish uchun modal ochish
  const showUserDetails = async (user: UserNatijasi) => {
    setLoadingDetails(true);
    setSelectedUser(user);
    setIsModalVisible(true);
    try {
      const res = await axios.get(`/result/get-one/${user.resultId}`, config);
      setSelectedUser({ ...user, result: res.data.body });
    } catch (error) {
      message.error('Natijalarni olishda xatolik yuz berdi.');
    } finally {
      setLoadingDetails(false);
    }
  };

  // Tasdiqlash modalini ochish
  const showRatingModal = (user: UserNatijasi) => {
    setSelectedUser(user);
    setIsRatingModalVisible(true);
  };

  // Baho kiritilishi
  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numericValue = parseInt(value);
    setRating(value);

    // 1 dan 10 gacha son kiritishni validatsiya qilish
    if (numericValue >= 1 && numericValue <= 10) {
      setIsRatingValid(true);
    } else {
      setIsRatingValid(false);
      message.error('Iltimos, 1dan 10gacha baho kiriting.');
    }
  };

  // Tasdiqlash funksiyasi (API orqali baholashni jo'natish)
  const handleRatingConfirm = async () => {
    if (!isRatingValid || !selectedUser) return;

    try {
      const response = await axios.put(
        `/result/update-status/${selectedUser.resultId}`,
        {
          status: 'CONFIRMED', // Statusni tasdiqlash
          practicalScore: rating,
        },
        config
      );

      if (response.status === 200) {
        message.success('Natija muvaffaqiyatli tasdiqlandi!');
        setIsRatingModalVisible(false); // Modalni yopish
        setRating(''); // Baho inputini tozalash
        refetch(); // Ma'lumotlarni yangilash
      }
    } catch (error) {
      message.error('Natijani tasdiqlashda xatolik yuz berdi.');
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedUser(null);
  };

  const menu = (user: UserNatijasi) => (
    <Menu>
      <Menu.Item key="1">
        <Link to={`/archive/${user.id}`}>Arxivni ko'rish</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <button onClick={() => showUserDetails(user)}>Natijani ko'rish</button>
      </Menu.Item>
      <Menu.Item key="3">
        <button onClick={() => showRatingModal(user)}>Tasdiqlash</button>
      </Menu.Item>
      <Menu.Item key="4">
        <button>Bekor qilish</button>
      </Menu.Item>
      <Menu.Item key="5">
        <button>Qayta topshirishga ruxsat berish</button>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="overflow-x-hidden">
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
                      <h4>Boshqaruv paneli</h4>
                    </Link>
                    <h4> / </h4>
                    <h4 className="text-blue-600"> Foydalanuvchilar</h4>
                  </div>
                </header>

                <div className="flex justify-end pt-5 gap-5">
                  <div className="flex">
                    <label htmlFor="inp1">
                      <FcSearch className="absolute mt-4 ml-3 text-[20px]" />
                    </label>
                    <input
                      type="text"
                      id="inp1"
                      className="pl-10 w-[375px] border-gray-300 rounded-md h-[50px]"
                      placeholder="Ism yoki familya bo'yicha qidirish"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex">
                    <input
                      type="text"
                      className="min-w-[260px] w-[360px] rounded-md h-[50px] placeholder:font-extralight placeholder-gray-400 border-gray-400 placeholder:text-[14px]"
                      placeholder="Tumanni tanlang"
                    />
                    <SlArrowDown className="absolute ml-[320px] mt-4" />
                  </div>

                  {/* Status Select */}
                  <select
                    className="max-w-[350px] w-[375px] text-gray-40 rounded-md h-[50px] placeholder:font-extralight placeholder-gray-400 border-gray-400 placeholder:text-[14px]"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                  >
                    <option value="">Statusni tanlang</option>
                    <option value="waiting">Kutilmoqda</option>
                    <option value="confirmed">Tekshirilganlar</option>
                    <option value="cancelled">Bekor qilinganlar</option>
                  </select>
                </div>

                <div className="py-5">
                  <table className="mx-3 ml-[0px] w-[100%] bg-white border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="text-left px-4 py-7">T/P</th>
                        <th className="text-left px-4 py-2">Tuliq ismi</th>
                        <th className="text-left px-4 py-2">Category</th>
                        <th className="text-left px-4 py-2">Telefon</th>
                        <th className="text-left px-4 py-2">Qayta test topshirish</th>
                        <th className="text-left px-4 py-2">Status</th>
                        <th className="text-left px-4 py-2">Xarakat</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((item, index) => (
                        <tr key={index} className="border-b border-gray-300">
                          <td className="px-4 py-2">{index + 1}</td>
                          <td className="px-4 py-2">{item.fullName}</td>
                          <td className="px-4 py-2">{item.categoryName}</td>
                          <td className="px-4 py-2">{item.phoneNumber}</td>
                          <td className="px-4 py-2">{item.expiredDate}</td>
                          <td className="px-4 py-2 bg-yellow-400 rounded-[15px]">{item.status}</td>
                          <td className="px-4 py-2">
                            <Dropdown overlay={menu(item)} trigger={['click']} placement="bottomRight">
                              <Button icon={<EllipsisOutlined />} />
                            </Dropdown>
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
          <Modal title="Natijalarni ko'rish" visible={isModalVisible} onCancel={handleCancel} footer={null}>
            {loadingDetails ? (
              <Spin />
            ) : selectedUser ? (
              <div>
                <p><strong>Tuliq ismi:</strong> {selectedUser.fullName}</p>
                <p><strong>Category:</strong> {selectedUser.categoryName}</p>
                <p><strong>Telefon:</strong> {selectedUser.phoneNumber}</p>
                <p><strong>Qayta test topshirish:</strong> {selectedUser.expiredDate}</p>
                <p><strong>Status:</strong> {selectedUser.status}</p>
              </div>
            ) : (
              <p>Natijalar topilmadi</p>
            )}
          </Modal>

          {/* Modal for confirming the rating */}
          <Modal
            title="Natijani tasdiqlash"
            visible={isRatingModalVisible}
            onCancel={() => setIsRatingModalVisible(false)}
            footer={null}
          >
            <div>
              <label htmlFor="rating">Baholash:</label>
              <Input
                type="number"
                id="rating"
                value={rating}
                onChange={handleRatingChange}
                className="border rounded-md w-full p-2"
              />
              <div className="flex justify-end mt-4">
                <Button onClick={() => setIsRatingModalVisible(false)} style={{ marginRight: '8px' }}>
                  Yopish
                </Button>
                <Button type="primary" onClick={handleRatingConfirm} disabled={!isRatingValid}>
                  Tasdiqlash
                </Button>
              </div>
            </div>
          </Modal>
        </div>
      </Layout>
    </div>
  );
};

export default User;
