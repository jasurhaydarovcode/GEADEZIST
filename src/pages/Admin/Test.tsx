import Layout from "@/components/Dashboard/Layout";
import { baseUrl, PostQuestion } from "@/helpers/api/baseUrl";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, } from 'flowbite-react';
import { config } from "@/helpers/functions/token";
import { PlusCircleOutlined, EditOutlined, DeleteOutlined, EyeOutlined, } from "@ant-design/icons";
import { Button, message, Modal, } from "antd";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { FcSearch } from "react-icons/fc";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ApiResponse, FetchedTest } from "@/helpers/types/test";
import TableLoading from "@/components/spinner/TableLoading";
import { Answer } from "@/helpers/types/AddQuizType";
import { Link, useNavigate } from "react-router-dom";
import CheckLogin from "@/helpers/functions/checkLogin";
import defaultImage from "../../assets/images/default.png";
import { Category } from "@/helpers/types/Category";
function Test() {
  const queryClient = useQueryClient()
  CheckLogin
  const [saveCates, setSaveCates] = useState<Category[]>([]);
  const getCategory = useQuery({
    queryKey: ["getCategory", config],
    queryFn: async () => {
      const res = await axios.get(`${baseUrl}category/page`, config)
      const response: Category = res.data?.body.body
      return response
    },
    onSuccess: (data) => {
      setSaveCates(data)
    }
  })
  useEffect(() => {
    getCategory.refetch()
  }, [])

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [testType, setTestType] = useState<string | null>(null);
  const quiz = useRef<HTMLInputElement | null>(null);
  const category = useRef<HTMLSelectElement | null>(null);
  const navigate = useNavigate();
  // bu kod qoshish btn uchun + -funck
  const [answers, setAnswers] = useState<Answer[]>([
    { id: Date.now(), value: "" },
  ]); // Start with one input
  // test get
  const [datas, useDatas] = useState<FetchedTest[]>([]);

  // search
  const [turi, setTuri] = useState<string | null>(null);
  const [kategoriya, setKategoriya] = useState<string | null>(null);
  const [nameSearch, setnameSearch] = useState<string | null>(null);
  const [testlar, setTestlar] = useState(null)
  const searchTest2 = () => {
    if (nameSearch && nameSearch.trim() !== "") {
      const newData = datas.filter((item) => item.savol.includes(nameSearch));
      useDatas(newData);
    } else if (nameSearch === "") {
      useDatas(datas);
    }
  }
  const searchTest = async (): Promise<void> => {
    if (nameSearch) {
      try {
        const response = await axios.get<ApiResponse>(
          `${baseUrl}question/filter?questionName=${nameSearch}&page=0&size=10`,
          config
        );

        // Map the data to your table format
        const fetchedQuestions = response.data.body.body.map((item, index) => ({
          key: item.id.toString(),
          numer: index + 1,
          testRasm: item.optionDtos[0]?.file ? item.optionDtos[0]?.file : defaultImage, // Replace with actual image if available
          savol: item.optionDtos[0]?.answer || "",
          catygoria: item.categoryName || "No category",
          savolTuri: item.type,
          qiyinligi: item.difficulty,
          yaratganOdam: item.createdByName,
        }));

        useDatas(fetchedQuestions); // Update your state
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    } else {
      // Reset data if no search term is provided
      useDatas([]);
    }
  };
  // search

  // delete
  const [testID, setTestID] = useState<number | string>('')
  function isdelete(testID: number | string) {
    axios.delete(baseUrl + 'question/' + testID, config)
      .then(res => {
        console.log(res);
      }).catch(err => {
        console.error(err);

      })
  }
  // delete

  const handleAddAnswer = () => {
    setAnswers([...answers, { id: Date.now(), value: "" }]); // Add a new input
  };
  const handleRemoveAnswer = () => {
    if (answers.length > 1) {
      // Ensure there's at least one input
      setAnswers(answers.slice(0, -1));
    }
  };
  function removeInp() {
    if (testType === "Hisoblangan natija") {
      setAnswers(answers.slice(0, 1));
    }
  }
  useEffect(() => {
    removeInp();
    searchTest2();
  }, [testType, turi, kategoriya, nameSearch, datas]);

  const testData = useQuery({
    queryKey: ['testData', config],
    queryFn: async () => {
      const response = await axios.get<ApiResponse>(`${baseUrl}question/filter?page=0&size=100`, config);
      return response.data.body.body;
    },
    onSuccess: (data: any) => {
      setTestlar(data)

    }
  })
  useEffect(() => {
    testData.refetch()
  }, [testData.data])

  // edit 
  const difficulty = useRef<string>('');
  const [editTestID, setEditTestID] = useState<string>('');
  const categore = useRef<string>('');
  const answer = useRef<string | null>(null);
  const type = useRef<string>('');
  const checkbox = useRef<boolean>(false)
  const answerData = useRef<string>('')
  const updatedData = {
    name: answer,
    categoryName: categore,
    type: type,
    difficulty: difficulty,
    optionDtos: [
      {
        id: 1,
        answer: answer,
        isCorrect: true,
      },
    ],
  };

  // updateQuestion(1, updatedData);

  function isEdit(ID: string) {
    const updateQuestion = async (ID: string | number) => {
      try {
        const response = await axios.put(`${baseUrl}question/${ID}`, updatedData, config);
        console.log('Ma\'lumot yangilandi:', response.data);
        return response.data;
      } catch (error) {
        toast.error('edit bolmadi')
      }
    };
    updateQuestion(ID)
    seteditModal(!editMod)
    console.log(updatedData);

  }
  // edit 

  // Use the data in a React component
  const { isLoading } = useQuery<ApiResponse>({
    queryKey: ["tests"],
    queryFn: testData,
    onSuccess: (response) => {
      console.log(response);

      const fetchedTests = response.body.body.map((item, index) => ({
        name: item.name,
        key: item.id.toString(),
        numer: index + 1,
        testRasm: ".", // Haqiqiy rasm mavjud bo'lsa, o'zgartiring
        savol: item.optionDtos[0]?.answer || "",
        catygoria: item.categoryName || "No category",
        savolTuri: item.type,
        qiyinligi: item.difficulty,
        yaratganOdam: item.createdByName,
      }));
      useDatas(fetchedTests); // useDatas o'rniga setDatas ishlatish

    },
  });

  const categoryNames = [
    {
      value: "SUM",
      name: "Hisoblangan natija",
    },
    {
      value: "ONE_CHOICE",
      name: "Bir to'g'ri javobli test",
    },
    {
      value: "ANY_CORECT",
      name: "Ko'p to'g'ri javobli test",
    },
  ];

  // edit modal
  const [editModal, seteditModal] = useState<boolean>(false);
  const [confirmLoad, setConfirmLoad] = useState<boolean>(false);

  const editMod = () => {
    setConfirmLoad(true);
    // Malumotlarni yuborish yoki boshqa amallar
    setTimeout(() => {
      setConfirmLoad(false);
      isEdit(editTestID)
      // ha(false);
    }, 2000);
  };
  const closeditmod = () => seteditModal(!editModal);
  // edit modal

  // delete modal
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const handleDelete = () => {
    setDeleteModalVisible(false);
    isdelete(testID)
  };

  const handleDeleteCancel = () => {
    setDeleteModalVisible(false);
  };

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };


  // Post question mutation
  const postQuestion = useMutation({
    mutationFn: async () => {
      const data = {
        name: quiz.current?.value || "", // Ref orqali olish
        categoryId: Number(categore.current?.value) || "", // Ref orqali olish
        finiteError: 0,
        type: type.current?.value || "", // Ref orqali olish
        difficulty: difficulty.current?.value || "", // Ref orqali olish
        attachmentIds: [0],
        optionDtos: [
          {
            answer: answerData.current?.value || "", // Ref orqali olish
            isCorrect: true,
            file: 0,
          },
        ],
      };

      try {
        const res = await axios.post(PostQuestion, data, config);
        return res.data;
      } catch (err) {
        throw new Error('Error posting question: ' + err.message);
      }
    },
    onSuccess: () => {
      message.success('Added successfully');
      queryClient.invalidateQueries('testData')
    },
    onError: (err) => {
      message.error(err.message);
    },
  });

  // Handle OK button
  const handleOk = () => {
    postQuestion.mutate();
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
        {isLoading ? (
          <div className="flex justify-center items-center h-screen">
            <TableLoading />
          </div>
        ) : (
          <div className="p-5">
            <div className="flex justify-between px-[20px]">
              <h1 className="text-3xl font-bold font-sans">Test</h1>
              <p className="font-sans text-gray-700">
                <Link to="/dashboard">Boshqaruv paneli /</Link>
                <span className="text-blue-700">Test</span>
              </p>
            </div>
            <div className="flex justify-between">
              <Button
                onClick={showModal}
                className="bg-black hover:bg-black text-xl px-5 py-6 my-5 text-white"
              >
                <PlusCircleOutlined className="text-xl" /> Qo'shish
              </Button>
              {/* add modal */}
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
                    ref={quiz}
                    placeholder="Savolni kiriting"
                    className="border bg-white w-full p-2 rounded"
                  />
                </div>

                <div className="mb-4">
                  <select ref={categore} className="w-full text-gray-400 bg-white rounded-md h-[50px] placeholder:font-extralight placeholder-gray-400 border-gray-400 placeholder:text-[14px]">
                    <option disabled selected value="">
                      Kategoriyani tanlang
                    </option>
                    {saveCates && saveCates.length > 0 && saveCates.map((item: Category) => (
                      <option value={item?.id} className="text text-black">
                        {item?.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <select ref={difficulty} className="w-full text-gray-400 bg-white rounded-md h-[50px] placeholder:font-extralight placeholder-gray-400 border-gray-400 placeholder:text-[14px]">
                    <option disabled selected>
                      Qiyinchilik darajasini tanlang
                    </option>
                    <option value="HARD" className="text text-black">
                      Qiyin
                    </option>
                    <option value="EASY" className="text text-black">
                      Oson
                    </option>
                    <option value="NEDIUM" className="text text-black">
                      O'rta
                    </option>
                  </select>
                </div>

                <div className="mb-4">
                  <select ref={type}
                    onChange={(e) => setTestType(e.target.value)}
                    className="w-full text-gray-400 bg-white rounded-md h-[50px] placeholder:font-extralight placeholder-gray-400 border-gray-400 placeholder:text-[14px]"
                  >
                    <option disabled selected>
                      Turlarni tanlang
                    </option>
                    {categoryNames &&
                      categoryNames.length > 0 &&
                      categoryNames.map((category, key) => (
                        <option
                          key={key}
                          value={category.value}
                          className="text text-black"
                        >
                          {category.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  {testType !== null && // Show inputs only when testType is not null
                    (testType === "SUM" ||
                      testType === "ANY_CORRECT") &&
                    answers.map((answer: Answer, index) => (
                      <div
                        key={answer.id}
                        className="flex items-center mb-4 gap-2"
                      >
                        <input
                          ref={checkbox}
                          type="checkbox"
                          checked={
                            testType === "SUM" || answer.checked
                          } // Automatically checked for "Hisoblangan natija", manually for multiple answers
                          onChange={(e) => {
                            if (testType === "ANY_CORRECT") {
                              const updatedAnswers = answers.map((ans, i) =>
                                i === index
                                  ? { ...ans, checked: e.target.checked }
                                  : ans
                              );
                              setAnswers(updatedAnswers);
                            }
                          }}
                          disabled={testType === "SUM"} // Disable for "Hisoblangan natija"
                          className="mr-3 accent-blue-500"
                        />
                        <input
                          ref={answerData}
                          placeholder="Savolning javoblarini kiriting"
                          className="border w-full p-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <label className="cursor-pointer custom-file-upload px-3 w-[160px] py-2 bg-blue-500 text-white text-[13px] rounded-md">
                          <input type="file" className="hidden" />
                          Choose file
                        </label>
                        {testType === "ANY_CORRECT" && (
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
                    ))}
                </div>

                <div>
                  {testType !== null && // Show inputs only when testType is not null
                    testType === "ONE_CHOICE" &&
                    answers.map((answer) => (
                      <div
                        key={answer.id}
                        className="flex items-center mb-4 gap-1"
                      >
                        <input
                          ref={checkbox}
                          type="radio"
                          name="single-choice"
                          className="mr-3 accent-blue-500"
                        />
                        <input
                          ref={answerData}
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
                    ))}
                </div>

                <div className="mb-4 ml-[180px] mt-5 ">
                  <label className="w-[90px] h-[90px] rounded border-dashed border-2 border-gray-400 bg-yellow-100 flex flex-col items-center justify-center">
                    <input type="file" className="hidden" />
                    <img
                      src="https://example.com/your-icon.png"
                      alt="Rasm yuklash"
                      className="w-6 h-6"
                    />
                    Rasm yuklash
                  </label>
                  <h2 className="mt-2 relative right-[20px]">
                    Rasm yuklash ixtiyoriy
                  </h2>{" "}
                </div>
              </Modal>


              {/* search  input*/}
              <div className="flex justify-end pt-5 gap-5">
                <div className="flex">
                  <label htmlFor="inp1">
                    <FcSearch className="absolute mt-4 ml-3 text-[20px]" />
                  </label>
                  <input
                    onChange={(e) => setnameSearch(e.target.value)}
                    type="text"
                    id="inp1"
                    className="w-[200px] pl-10 border-gray-300 rounded-md h-[50px]"
                    placeholder="Testni qidirish"
                  />
                </div>


                {/* kategory input search */}
                <div className="flex">
                  <select
                    onChange={(e) => setKategoriya(e.target.value)}
                    className="w-[200px] text-gray-400 bg-white rounded-md h-[50px]"
                  >
                    <option disabled selected>
                      Kategoriyani tanlang
                    </option>
                    {saveCates && saveCates.length > 0 && saveCates.map((cate) => (
                      <option key={cate.id} value={cate.id} className="text text-black">
                        {cate.name}
                      </option>
                    ))}

                  </select>
                </div>

                {/* turni tanlash input search */}
                <div className="flex">
                  <select
                    onChange={(e) => setTuri(e.target.value)}
                    className="w-[200px] text-gray-400 bg-white rounded-md h-[50px]"
                  >
                    <option disabled selected>
                      Turlarni tanlang
                    </option>
                    <option value="SUM" className="text text-black">
                      Hisoblangan natija
                    </option>
                    <option value="ONE_CHOICE" className="text text-black">
                      Bir to'g'ri javobli test
                    </option>
                    <option value="ANY_CORRECT" className="text text-black">
                      Ko'p to'g'ri javobli test
                    </option>
                  </select>
                </div>
              </div>
            </div>
            {/* table  */}


            <Table hoverable>
              <TableHead>
                <TableHeadCell>T/P</TableHeadCell>
                <TableHeadCell>Test rasm</TableHeadCell>
                <TableHeadCell>Savol</TableHeadCell>
                <TableHeadCell>Kategoriya</TableHeadCell>
                <TableHeadCell>Savol turi</TableHeadCell>
                <TableHeadCell>Qiyinchilik darajasi</TableHeadCell>
                <TableHeadCell>Yaratgan odam</TableHeadCell>
                <TableHeadCell>action</TableHeadCell>
              </TableHead>
              {testlar && testlar.map((item, index) => (
                <TableBody className="divide-y">
                  <TableCell>{index + 1}</TableCell>
                  <TableCell><img src="src/assets/images/default.png" className="w-10 h-10 rounded-full" alt="" /></TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.categoryName}</TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>{item.difficulty}</TableCell>
                  <TableCell>{item.createdByName}</TableCell>
                  <TableCell className="flex items-center gap-3">
                    <EditOutlined />
                    <DeleteOutlined />
                    <EyeOutlined />
                  </TableCell>
                </TableBody>
              ))}
            </Table>
          </div>
        )
        }
      </Layout>

      {/* edit modal */}
      <Modal
        title="edit modal"
        open={editModal}
        onOk={editMod}
        confirmLoading={confirmLoad}
        onCancel={closeditmod}
        maskClosable={false}
      >
        <div className="mb-4">
          <input
            onChange={(e) => setanswer(e.target.value)}
            placeholder="Savolni kiriting"
            className="border w-full p-2 rounded"
          />
        </div>

        <div className="mb-4">
          <select onChange={(e) => setCategory(e.target.value)} className="w-full text-gray-400 bg-white rounded-md h-[50px] placeholder:font-extralight placeholder-gray-400 border-gray-400 placeholder:text-[14px]">
            <option disabled selected value="">
              Kategoriyani tanlang
            </option>
            <option value="SUM" className="text text-black">
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
          <select onChange={(e) => setDifficulty(e.target.value)} className="w-full text-gray-400 bg-white rounded-md h-[50px] placeholder:font-extralight placeholder-gray-400 border-gray-400 placeholder:text-[14px]">
            <option disabled selected>
              Qiyinchilik darajasini tanlang
            </option>
            <option value="HARD" className="text text-black">
              Qiyin
            </option>
            <option value="EASY" className="text text-black">
              Oson
            </option>
            <option value="NEDIUM" className="text text-black">
              O'rta
            </option>
          </select>
        </div>

        <div className="mb-4">
          <select
            onChange={(e) => {
              setTestType(e.target.value)
              setType(e.target.value)
            }}
            className="w-full text-gray-400 bg-white rounded-md h-[50px] placeholder:font-extralight placeholder-gray-400 border-gray-400 placeholder:text-[14px]"
          >
            <option disabled selected>
              Turlarni tanlang
            </option>
            {categoryNames &&
              categoryNames.length > 0 &&
              categoryNames.map((category, key) => (
                <option
                  key={key}
                  value={category.name}
                  className="text text-black"
                >
                  {category.name}
                </option>
              ))}
          </select>
        </div>

        <div>
          {testType !== null && // Show inputs only when testType is not null
            (testType === "Hisoblangan natija" ||
              testType === "Ko'p to'g'ri javobli test") &&
            answers.map((answer: Answer, index) => (
              <div key={answer.id} className="flex items-center mb-4 gap-2">
                <input
                  type="checkbox"
                  checked={testType === "Hisoblangan natija" || answer.checked} // Automatically checked for "Hisoblangan natija", manually for multiple answers
                  onChange={(e) => {
                    if (testType === "Ko'p to'g'ri javobli test") {
                      const updatedAnswers = answers.map((ans, i) =>
                        i === index
                          ? { ...ans, checked: e.target.checked }
                          : ans
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
            ))}
        </div>

        <div>
          {testType !== null && // Show inputs only when testType is not null
            testType === "Bir to'g'ri javobli test" &&
            answers.map((answer) => (
              <div key={answer.id} className="flex items-center mb-4 gap-1">
                <input
                  type="radio"
                  name="single-choice"
                  className="mr-3 accent-blue-500"
                />
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
            ))}
        </div>


        <div className="mb-4 ml-[180px] mt-5 ">
          <label className="w-[90px] h-[90px] rounded border-dashed border-2 border-gray-400 bg-yellow-100 flex flex-col items-center justify-center">
            <input type="file" className="hidden" />
            <img
              src="https://example.com/your-icon.png"
              alt="Rasm yuklash"
              className="w-6 h-6"
            />
            Rasm yuklash
          </label>
          <h2 className="mt-2 relative right-[20px]">Rasm yuklash ixtiyoriy</h2>{" "}
        </div>

        {/* Qolgan kontentni modal ichiga joylang */}
      </Modal>

      <Modal
        open={deleteModalVisible}
        onOk={handleDelete}
        onCancel={handleDeleteCancel}
        okText="O'chirish"
        cancelText="Yopish"
        maskClosable={false}
        okButtonProps={{ style: { backgroundColor: 'black', color: 'white' }, }}
        cancelButtonProps={{ style: { backgroundColor: 'black', color: 'white' }, }}
      >
        <p className="text-center text-xl my-5 font-semibold">
          Tumanni o'chirmoqchimisiz?
        </p>
      </Modal>
    </div>
  );
}

export default Test;
