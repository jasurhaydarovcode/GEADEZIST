import Layout from '@/components/Dashboard/Layout';
import { baseUrl, PostQuestion } from '@/helpers/api/baseUrl';
import { config } from '@/helpers/functions/token';
import {
  PlusCircleOutlined, EditOutlined, DeleteOutlined, EyeOutlined,
} from '@ant-design/icons';
import { Button, Modal, Table } from 'antd';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { FcSearch } from 'react-icons/fc';
import { useMutation, useQuery } from 'react-query';
import { ApiResponse, FetchedTest } from '@/helpers/types/test';
import TableLoading from '@/components/spinner/TableLoading';
import { Answer } from '@/helpers/types/AddQuizType';

function Test() {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [datas, useDatas] = useState<FetchedTest[]>([]);
  const [testType, setTestType] = useState<string | null>(null);
  const dataSource = datas;
  const quiz = useRef<HTMLInputElement | null>(null);
  const category = useRef<HTMLSelectElement | null>(null);
  const difficulty = useRef();
  const type = useRef();
  // bu kod qoshish btn uchun + -funck
  const [answers, setAnswers] = useState<Answer[]>([{ id: Date.now(), value: '' }]); // Start with one input
  const handleAddAnswer = () => {
    setAnswers([...answers, { id: Date.now(), value: '' }]); // Add a new input
  };
  const handleRemoveAnswer = () => {
    if (answers.length > 1) { // Ensure there's at least one input
      setAnswers(answers.slice(0, -1));
    }
  }
  function removeInp() {
    if (testType === "Hisoblangan natija") {
      setAnswers(answers.slice(0, 1));
    }
  }
  useEffect(() => {
    removeInp();
  }, [testType]);

  const testData = async (): Promise<ApiResponse> => {
    const response = await axios.get<ApiResponse>(
      `${baseUrl}question/filter?page=0&size=100`,
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

  const categoryNames = [
    {
      name: "Hisoblangan natija"
    },
    {
      name: "Bir to'g'ri javobli test"
    },
    {
      name: "Ko'p to'g'ri javobli test"
    }
  ]
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


  // Post question
  const postQuestion = useMutation({
    mutationFn: async () =>  {
      const data = {
        "name": quiz.current?.value,
        "categoryId": category.current?.value,
        "finiteError": 0,
        "type": "string",
        "difficulty": "string",
        "attachmentIds": [
          0
        ],
        "optionDtos": [
          {
            "answer": "string",
            "isCorrect": true,
            "file": 0
          }
        ]
      }
      const res = await axios.post(PostQuestion, data, config);
      return res.data;
    }
  });
  return (
    <div>
      <Helmet>
        <title>Testlar</title>
      </Helmet>

      <Layout>
        {isLoading ? (<div className='flex justify-center items-center h-screen'><TableLoading /></div>) : (<div className="p-5">
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
                <select onChange={(e) => setTestType(e.target.value)} className="w-full text-gray-400 bg-white rounded-md h-[50px] placeholder:font-extralight placeholder-gray-400 border-gray-400 placeholder:text-[14px]">
                  <option disabled selected>
                    Turlarni tanlang
                  </option>
                  {categoryNames && categoryNames.length > 0 && categoryNames.map((category, key) => (
                    <option key={key} value={category.name} className="text text-black">
                      {category.name}
                    </option>
                  ))
                  }
                </select>
              </div>

              <div>
                {testType !== null && ( // Show inputs only when testType is not null
                  (testType === 'Hisoblangan natija' || testType === 'Ko\'p to\'g\'ri javobli test') &&
                  answers.map((answer: Answer, index) => (
                    <div key={answer.id} className="flex items-center mb-4 gap-2">
                      <input
                        type="checkbox"
                        checked={testType === "Hisoblangan natija" || answer.checked} // Automatically checked for "Hisoblangan natija", manually for multiple answers
                        onChange={(e) => {
                          if (testType === "Ko'p to'g'ri javobli test") {
                            const updatedAnswers = answers.map((ans, i) =>
                              i === index ? { ...ans, checked: e.target.checked } : ans
                            );
                            setAnswers(updatedAnswers);
                          }
                        }}
                        disabled={testType === "Hisoblangan natija"} // Disable for "Hisoblangan natija"
                        className="mr-3 accent-blue-500"
                      />
                      <input
                        placeholder="Savolning javoblarini kiriting"
                        className="border w-full p-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <label className="cursor-pointer custom-file-upload px-3 w-[160px] py-2 bg-blue-500 text-white text-[13px] rounded-md">
                        <input type="file" className="hidden" />
                        Choose file
                      </label>
                      {testType === "Ko'p to'g'ri javobli test" && (
                        <>
                          <button
                            onClick={handleRemoveAnswer}
                            className="bg-gray-300 hover:bg-gray-400 text-lg px-3 rounded-md border border-gray-300 ml-2"
                          >
                            -
                          </button>
                          <button
                            onClick={handleAddAnswer}
                            className="bg-gray-300 hover:bg-gray-400 text-lg px-3 rounded-md border border-gray-300"
                          >
                            +
                          </button>
                        </>
                      )}
                    </div>
                  ))
                )}
              </div>

              <div>
                {testType !== null && ( // Show inputs only when testType is not null
                  (testType === 'Bir to\'g\'ri javobli test') &&
                  answers.map((answer) => (
                    <div key={answer.id} className="flex items-center mb-4 gap-1">
                      <input type="radio" name='single-choice' className="mr-3 accent-blue-500" />
                      <input
                        placeholder="Savolning javoblarini kiriting"
                        className="border w-full p-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <label className="cursor-pointer custom-file-upload px-3 w-[150px] py-2 bg-blue-500 text-white text-[13px] rounded-md">
                        <input type="file" className="hidden" />
                        Choose file
                      </label>
                      <>
                        <button
                          onClick={handleRemoveAnswer}
                          className="bg-gray-300 hover:bg-gray-400 text-lg px-3 rounded-md border border-gray-300 ml-2"
                        >
                          -
                        </button>
                        <button
                          onClick={handleAddAnswer}
                          className="bg-gray-300 hover:bg-gray-400 text-lg px-3 rounded-md border border-gray-300"
                        >
                          +
                        </button>
                      </>
                    </div>
                  ))
                )}
              </div>




              <div className="mb-4 ml-[180px] mt-5 ">
                <label className="w-[90px] h-[90px] rounded border-dashed border-2 border-gray-400 bg-yellow-100 flex flex-col items-center justify-center">
                  <input type="file" className='hidden' />
                  <img src="https://example.com/your-icon.png" alt="Rasm yuklash" className="w-6 h-6" />
                  Rasm yuklash
                </label>
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
            columns={columns}
            pagination={{ pageSize: 10 }}


          />
        </div>)}
      </Layout>
    </div>
  );
}

export default Test;