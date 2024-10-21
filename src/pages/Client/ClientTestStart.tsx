import Layout from '@/components/clientDashboard/laytout';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'antd';
import { useEffect, useState, useCallback } from 'react';
import { MdOutlineNotStarted } from 'react-icons/md';
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import { baseUrl } from '@/helpers/api/baseUrl';
import { toast } from 'react-toastify';
import { ClientCategory } from '@/helpers/types/getClientCategory';
import axios from 'axios';
import { config } from '@/helpers/functions/token';
import TableLoading from '@/components/spinner/TableLoading';
import defaultImage from '@/assets/images/default.png';
export const getImage = `${baseUrl}api/videos/files`;
import CheckLogin from '@/helpers/functions/checkLogin';

interface AxiosError {
  message: string;
}

const ClientTestStart: React.FC = () => {
  CheckLogin

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const navigate = useNavigate();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const checkRoleClient = useCallback(() => {
    const role = localStorage.getItem('role');
    const token = localStorage.getItem('token');
    if (role == 'ROLE_SUPER_ADMIN') {
      navigate('/dashboard');
    } else if (role == 'ROLE_TESTER') {
      navigate('/category');
    }

    if (token == null) {
      navigate('/auth/Signin');
    }
  }, [navigate]);

  useEffect(() => {
    checkRoleClient();
  }, [checkRoleClient]);

  // Function to handle modal close
  const handleCancel = () => {
    setIsModalVisible(false);
  };


  const { isLoading, error, data } = useQuery({
    queryKey: ['getClientCategory'],
    queryFn: async () => {
      const res = await axios.get(`${baseUrl}category`, config);
      return (res.data as { body?: { body: ClientCategory[] } }).body?.body;
    },
    onError: (error: AxiosError) => {
      toast.error(error.message);
    },
  });

  if (error) return toast.error(error.message);



  const handleStartClick = (category: { name: string, id: number }) => {
    setSelectedCategory(category.name);
    setCategoryId(category.id); // Kategoriyani state'ga o'rnatamiz
    // Boshqa ma'lumotlarni ham ishlash mumkin
  };


  const handleCategorySelect = (categoryId: number) => {
    setSelectedCategoryId(categoryId);
  };

  // const startTest = (categoryId: number) => {
  //   // Navigate to the quiz page and pass the category ID as part of the URL
  //   navigate(`/client/quiz/${categoryId}`);
  // };

  const handleNext = () => {
    if (selectedCategoryId) {
      // Navigate to next page with the selected category ID
      navigate(`/client/quiz/${selectedCategoryId}`);
    }
  };

  return (
    <Layout className="p-8 space-y-6">
      {isLoading ? (
        <div className="flex justify-center absolute top-[42%] left-[57%]">
          <TableLoading />
        </div>
      ) : (
        <>
          <Helmet>
            <title>Geodeziya</title>
          </Helmet>
          <div className="py-8">
            <h2 className="text-red-600 text-4xl text-center">Yo'nalishlar</h2>
          </div>
          {Array.isArray(data) &&
            data.map((item: ClientCategory, index: number) => (
              <div className="border-[0.5px] items-center shadow-xl relative border-black bg-white rounded-md py-6 px-4 w-full">
                <div className="px-3 flex items-center space-x-12">
                  <div>
                    <img
                      alt={item.name}
                      src={
                        item.fileId ? `${getImage}${item.fileId}` : defaultImage
                      }
                      className="border-[1px] border-gray-300 w-[100px] h-[100px] rounded-full object-cover hover:cursor-pointer"
                    />
                  </div>
                  <div className="flex-1 mb-4">
                    <div key={index} className="flex justify-between mb-2">
                      <span className="text-gray-600 font-semibold">
                        Yo'nalish
                      </span>
                      <span className="text-gray-700 font-semibold">
                        {item.name}
                      </span>
                    </div>

                    <div key={index} className="flex justify-between mb-2">
                      <span className="text-gray-600 font-semibold">
                        Test ishlashga ajratilgan vaqt
                      </span>
                      <span className="text-gray-700 font-medium">
                        {item.duration} (дақ.)
                      </span>
                    </div>

                    <div key={index} className="flex justify-between mb-2">
                      <span className="text-gray-600 font-semibold">
                        Savollar soni
                      </span>
                      <span className="text-gray-700 font-medium">
                        {item.questionCount} ta
                      </span>
                    </div>

                    <div key={index} className="flex justify-between mb-2">
                      <span className="text-gray-600 font-semibold">
                        Qayta topshirish vaqti
                      </span>
                      <span className="text-gray-700 font-medium">
                        {item.retakeDate} ta
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        showModal();
                        handleStartClick(item);
                        handleCategorySelect(item.id);
                      }}
                      className="bg-gray-600 cursor-pointer absolute top-[78%] right-5 text-white p-1 px-4 rounded"
                    >
                      Бошлаш
                    </button>
                  </div>

                  {selectedCategory && (
                    <>
                      <Modal
                        title={
                          <div>
                            <span>
                              <MdOutlineNotStarted
                                size={90}
                                color="red"
                                className="mx-auto"
                              />
                            </span>
                            <span>Haqiqatdan ham </span>
                            <span className="text-red-600">
                              {selectedCategory + ' ' + categoryId}
                            </span>
                            <span>
                              {' '}
                              yo'nalishi bo'yicha test boshlamoqchimisiz?
                            </span>
                          </div>
                        }
                        visible={isModalVisible}
                        onOk={handleNext}
                        onCancel={handleCancel}
                        okText="Boshlash"
                        cancelText="Orqaga"
                        maskClosable={false}
                        style={{
                          top: '34%',
                          left: '1%',
                        }}
                        maskStyle={{
                          backgroundColor: 'rgba(0, 0, 0, 0.3)',
                        }}
                      ></Modal>
                    </>
                  )}
                </div>
              </div>
            ))}
        </>
      )
      }
    </Layout >
  );
};

export default ClientTestStart;
