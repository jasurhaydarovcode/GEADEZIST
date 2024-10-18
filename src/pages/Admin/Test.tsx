import Layout from "@/components/Dashboard/Layout";
import { baseUrl, PostQuestion } from "@/helpers/api/baseUrl";
import { config } from "@/helpers/functions/token";
import {PlusCircleOutlined,EditOutlined,DeleteOutlined, EyeOutlined,} from "@ant-design/icons";
import { Button, Modal, Table } from "antd";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { FcSearch } from "react-icons/fc";
import { useMutation, useQuery } from "react-query";
import { ApiResponse, FetchedTest } from "@/helpers/types/test";
import TableLoading from "@/components/spinner/TableLoading";
import { Answer } from "@/helpers/types/AddQuizType";
import TestVisual from "@/components/test/testVisual";
import { Link } from "react-router-dom";
import CheckLogin from "@/helpers/functions/checkLogin";

function Test() {
  CheckLogin

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [testType, setTestType] = useState<string | null>(null);
  const quiz = useRef<HTMLInputElement | null>(null);
  const category = useRef<HTMLSelectElement | null>(null);

  // bu kod qoshish btn uchun + -funck
  const [answers, setAnswers] = useState<Answer[]>([
    { id: Date.now(), value: "" },
  ]); // Start with one input
  // test get
  const [datas, useDatas] = useState<FetchedTest[]>([]);
  const dataSource = datas;

  // search
  const [turi, setTuri] = useState<string | null>(null);
  const [kategoriya, setKategoriya] = useState<string | null>(null);
  const [nameSearch, setnameSearch] = useState<string | null>(null);
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);
  const [fetchedQuestions, setFetchedQuestions] = useState<any[]>([]);

  // This function will be used to fetch data based on the search term
  const searchTest = async (searchTerm: string | null): Promise<void> => {
    if (searchTerm) {
      try {
        const response = await axios.get<ApiResponse>(
          `${baseUrl}question/filter?questionName=${searchTerm}&page=0&size=10`,
          config
        );

        // Map the data to your table format
        const questions = response.data.body.body.map((item, index) => ({
          key: item.id.toString(),
          numer: index + 1,
          testRasm: ".", // Replace with actual image if available
          savol: item.optionDtos[0]?.answer || "",
          catygoria: item.categoryName || "No category",
          savolTuri: item.type,
          qiyinligi: item.difficulty,
          yaratganOdam: item.createdByName,
        }));

        setFetchedQuestions(questions); // Update your state with the fetched data
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    } else {
      // If no search term is provided, you can reset or show all data
      setFetchedQuestions([]); // Clear data if search term is removed
    }
  };

  // Handle search input change with debounce
  useEffect(() => {
    if (searchTimeout) {
      clearTimeout(searchTimeout); // Clear the previous timeout if the user is still typing
    }

    const newTimeout = setTimeout(() => {
      // Only perform search if input is not empty
      searchTest(nameSearch);
    }, 500); // Adjust the debounce time as needed (e.g., 500ms)

    setSearchTimeout(newTimeout); // Set new timeout for debounce

    // Cleanup function to clear the timeout when the component unmounts or on re-render
    return () => clearTimeout(newTimeout);
  }, [nameSearch]); // Re-run the effect only when nameSearch changes

  // Input change handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setnameSearch(e.target.value || null); // Update state when the input changes
  };

  // search

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
  }, [testType, turi, kategoriya, nameSearch]);

  const testData = async (): Promise<ApiResponse> => {
    const response = await axios.get<ApiResponse>(
      `${baseUrl}question/filter?page=0&size=100`,
      config
    );
    return response.data;
  };

  // Use the data in a React component
  const { data, isLoading } = useQuery<ApiResponse>({
    queryKey: ["tests"],
    queryFn: testData,
    onSuccess: (response) => {

      // Map the data to your table format
      const fetchedTests = response.body.body.map((item, index) => ({
        key: item.id.toString(),
        numer: index + 1,
        testRasm: ".", // Haqiqiy rasm mavjud bo'lsa, o'zgartiring
        savol: item.optionDtos[0]?.answer || "",
        catygoria: item.categoryName || "No category",
        savolTuri: item.type,
        qiyinligi: item.difficulty,
        yaratganOdam: item.createdByName,
      }));
      useDatas(fetchedTests); // useDatas o'rniga setDatas
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
      // ha(false);
    }, 2000);
  };
  const closeditmod = () => seteditModal(!editModal);
  // edit modal
  // delete modal
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const handleDelete = () => {
    // O'chirish amalini bajarish
    setDeleteModalVisible(false);
  };

  const handleDeleteCancel = () => {
    setDeleteModalVisible(false);
  };


  const columns = [
    { title: "№", dataIndex: "numer", key: "numer" },
    { title: "Test rasm", dataIndex: "testRasm", key: "testRasm" },
    { title: "Savol", dataIndex: "savol", key: "savol" },
    { title: "Kategoriya", dataIndex: "catygoria", key: "catygoria" },
    { title: "Savol turi", dataIndex: "savolTuri", key: "savolTuri" },
    { title: "Qiyinchilik darajasi", dataIndex: "qiyinligi", key: "qiyinligi" },
    { title: "Yaratgan odam", dataIndex: "yaratganOdam", key: "yaratganOdam" },
    {
      title: "Harakat",
      dataIndex: "harakat",
      key: "harakat",
      render: () => (
        <div className="flex gap-3">
          <EditOutlined
            onClick={() => {
              seteditModal(true);
            }}
            className="text-black cursor-pointer"
            style={{ fontSize: "18px" }}
          />
          <DeleteOutlined
            onClick={() => {
              setDeleteModalVisible(true);
            }}
            className="text-black cursor-pointer"
            style={{ fontSize: "18px" }}
          />
          <EyeOutlined
            className="text-black cursor-pointer"
            style={{ fontSize: "18px" }}
          />
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
    mutationFn: async () => {
      const data = {
        name: quiz.current?.value,
        categoryId: category.current?.value,
        finiteError: 0,
        type: "string",
        difficulty: "string",
        attachmentIds: [0],
        optionDtos: [
          {
            answer: "string",
            isCorrect: true,
            file: 0,
          },
        ],
      };
      const res = await axios.post(PostQuestion, data, config);
      return res.data;
    },
  });

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
                      <div
                        key={answer.id}
                        className="flex items-center mb-4 gap-2"
                      >
                        <input
                          type="checkbox"
                          checked={
                            testType === "Hisoblangan natija" || answer.checked
                          } // Automatically checked for "Hisoblangan natija", manually for multiple answers
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
                      <div
                        key={answer.id}
                        className="flex items-center mb-4 gap-1"
                      >
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
                    <option value="7" className="text text-black">
                      Umumiy savollar
                    </option>
                    <option value="8" className="text text-black">
                      Umumiy geodeziya
                    </option>
                    <option value="9" className="text text-black">
                      Topografiya
                    </option>
                    <option value="19" className="text text-black">
                      Oliy geodeziya
                    </option>
                    <option value="11" className="text text-black">
                      Har qanday to'g'ri
                    </option>
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
                    <option value="ANY_CORECT" className="text text-black">
                      Ko'p to'g'ri javobli test
                    </option>
                  </select>
                </div>
              </div>
            </div>
                    {/* table  */}
            <Table
              dataSource={dataSource}
              columns={columns}
              pagination={{ pageSize: 10 }}
            />
          </div>
        )}
      </Layout>

      {/* edit modal */}
      <Modal
        title="edit modal"
        open={editModal}
        // onOk={putTest}
        confirmLoading={confirmLoad}
        onCancel={closeditmod}
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
     
    </div>
  );
}

export default Test;
