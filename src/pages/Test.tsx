import Layout from '@/components/Dashboard/Layout';
import { baseUrl } from '@/helpers/api/baseUrl';
import { config } from '@/helpers/functions/token';
import {
  PlusCircleOutlined, EditOutlined, DeleteOutlined, EyeOutlined,
} from '@ant-design/icons';
import { Button, Modal, Table } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { FcSearch } from 'react-icons/fc';
import { useQuery } from 'react-query';
import { ApiResponse, FetchedTest } from '@/helpers/types/test';

function Test() {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [datas, useDatas] = useState<FetchedTest[]>([]);
  const dataSource = datas;

  const testData = async (): Promise<ApiResponse> => {
    const response = await axios.get<ApiResponse>(
      `${baseUrl}question/filter?page=0&size=10`,
      config,
    );
    return response.data;
  };

  // Use the data in a React component
  const { data, isLoading, isError, error } = useQuery<ApiResponse>({
    queryKey: ['tests'],
    queryFn: testData,
    onSuccess: (response) => {
      console.log(response);

      // Map the data to your table format
      const fetchedTests = response.body.body.map((item, index) => ({
        key: item.id.toString(),
        numer: index + 1,
        testRasm: '.', // Haqiqiy rasm mavjud bo'lsa, o'zgartiring
        savol: item.name,
        catygoria: item.categoryName || 'No category',
        savolTuri: item.type,
        qiyinligi: item.difficulty,
        yaratganOdam: item.createdByName,
      }));
      useDatas(fetchedTests); // useDatas o'rniga setDatas
    },
  });

  console.log(data);
  console.log(error);

  if (isLoading) return <p>Yuklanmoqda...</p>;
  if (isError) return <p>Xatolik yuz berdi.</p>;

  const columns = [
    { title: '№', dataIndex: 'numer', key: 'numer' },
    { title: 'Test rasm', dataIndex: 'testRasm', key: 'testRasm' },
    { title: 'Savol', dataIndex: 'savol', key: 'savol' },
    { title: 'Kategoriya', dataIndex: 'catygoria', key: 'catygoria' },
    { title: 'Savol turi', dataIndex: 'savolTuri', key: 'savolTuri' },
    { title: 'Qiyinchilik darajasi', dataIndex: 'qiyinligi', key: 'qiyinligi' },
    { title: 'Yaratgan odam', dataIndex: 'yaratganOdam', key: 'yaratganOdam' },
    {
      title: 'Harakat',
      dataIndex: 'harakat',
      key: 'harakat',
      render: () => (
        <div className="flex gap-3">
          <EditOutlined className="text-black cursor-pointer" style={{ fontSize: '18px' }} />
          <DeleteOutlined className="text-black cursor-pointer" style={{ fontSize: '18px' }} />
          <EyeOutlined className="text-black cursor-pointer" style={{ fontSize: '18px' }} />
        </div>

      ),
    },
  ];
  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  return (
    <div>
      <Helmet>
        <title>Testlar</title>
      </Helmet>

      <Layout>
        <div className="p-5">
          <div className="flex justify-between">
            <h1 className="text-3xl font-bold font-sans">Test</h1>
            <p className="font-sans text-gray-700">
              Boshqaruv paneli / <span className="text-blue-700">Test</span>
            </p>
          </div>

          <div className="flex justify-between">
            <Button
              onClick={showModal}
              className="bg-black hover:bg-black text-xl px-5 py-6 my-5 text-white"
            >
              <PlusCircleOutlined className="text-xl" /> Qo'shish
            </Button>




            <Modal
              title="Savol qo'shish"
              open={open}
              onOk={handleOk}
              confirmLoading={confirmLoading}
              onCancel={handleCancel}
              maskClosable={false}
            >
              <div className="mb-4">
                <input
                  placeholder="Savolni kiriting"
                  className="border w-full p-2 rounded"
                />
              </div>

              <div className="mb-4">
                <select className="w-full text-gray-400 bg-white rounded-md h-[50px] placeholder:font-extralight placeholder-gray-400 border-gray-400 placeholder:text-[14px]">
                  <option disabled selected value="">
                    Kategoriyani tanlang
                  </option>
                  <option value="" className="text text-black">
                    Umumiy savollar
                  </option>
                  <option value="" className="text text-black">
                    Umumiy geodeziya
                  </option>
                  <option value="" className="text text-black">
                    Topografiya
                  </option>
                  <option value="" className="text text-black">
                    Oliy geodeziya
                  </option>
                  <option value="" className="text text-black">
                    Har qanday to'g'ri
                  </option>
                </select>
              </div>

              <div className="mb-4">
                <select className="w-full text-gray-400 bg-white rounded-md h-[50px] placeholder:font-extralight placeholder-gray-400 border-gray-400 placeholder:text-[14px]">
                  <option disabled selected>
                    Qiyinchilik darajasini tanlang
                  </option>
                  <option value="" className="text text-black">
                    Qiyin
                  </option>
                  <option value="" className="text text-black">
                    Oson
                  </option>
                  <option value="" className="text text-black">
                    O'rta
                  </option>
                </select>
              </div>

              <div className="mb-4">
                <select className="w-full text-gray-400 bg-white rounded-md h-[50px] placeholder:font-extralight placeholder-gray-400 border-gray-400 placeholder:text-[14px]">
                  <option disabled selected>
                    Turlarni tanlang
                  </option>
                  <option value="" className="text text-black">
                    Hisoblangan natija
                  </option>
                  <option value="" className="text text-black">
                    Bir to'g'ri javobli test
                  </option>
                  <option value="" className="text text-black">
                    Ko'p to'g'ri javobli test
                  </option>
                </select>
              </div>

              <div className="mb-4 ml-[180px] mt-5">
                <Button className="w-[90px] h-[90px] rounded border-dashed border-2 border-gray-400 flex flex-col items-center justify-center">
                  <img
                    src="https://example.com/your-icon.png"
                    alt="Rasm yuklash"
                    className="w-6 h-6"
                  />{' '}

                  Rasm yuklash
                </Button>
                <h2 className="mt-2 relative right-[20px]">Rasm yuklash ixtiyoriy</h2>{' '}

              </div>
            </Modal>





            <div className="flex justify-end pt-5 gap-5">
              <div className="flex">
                <label htmlFor="inp1">
                  <FcSearch className="absolute mt-4 ml-3 text-[20px]" />
                </label>
                <input
                  type="text"
                  id="inp1"
                  className="w-[200px] pl-10 border-gray-300 rounded-md h-[50px]"
                  placeholder="Testni qidirish"
                />
              </div>

              <div className="flex">
                <select className="w-[200px] text-gray-400 bg-white rounded-md h-[50px]">
                  <option disabled selected>
                    Kategoriyani tanlang
                  </option>
                  <option value="" className="text text-black">
                    Umumiy savollar
                  </option>
                  <option value="" className="text text-black">
                    Umumiy geodeziya
                  </option>
                  <option value="" className="text text-black">
                    Topografiya
                  </option>
                  <option value="" className="text text-black">
                    Oliy geodeziya
                  </option>
                  <option value="" className="text text-black">
                    Har qanday to'g'ri
                  </option>
                </select>
              </div>

              <div className="flex">
                <select className="w-[200px] text-gray-400 bg-white rounded-md h-[50px]">
                  <option disabled selected>
                    Turlarni tanlang
                  </option>
                  <option value="calculated" className="text text-black">
                    Hisoblangan natija
                  </option>
                  <option value="single-choice" className="text text-black">
                    Bir to'g'ri javobli test
                  </option>
                  <option value="multiple-choice" className="text text-black">
                    Ko'p to'g'ri javobli test
                  </option>
                  <option value="" className="text text-black">
                    Har qanday to'g'ri
                  </option>
                </select>
              </div>

            </div>
          </div>

          <Table
            dataSource={dataSource}
            columns  ={columns}
            pagination={{ pageSize: 5 }}
            
          
          />

        </div>
      </Layout>
    </div>
  );
}

export default Test;
