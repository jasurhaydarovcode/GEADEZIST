import Layout from "@/components/Dashboard/Layout";
import { baseUrl, PostQuestion } from "@/helpers/api/baseUrl";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, } from 'flowbite-react';
import { config } from "@/helpers/functions/token";
import { PlusCircleOutlined, EditOutlined, DeleteOutlined, EyeOutlined, } from "@ant-design/icons";
import { Button, message, Modal, Pagination } from "antd";
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
import { Category } from "@/helpers/types/Category";
import { toast } from "react-toastify";

function Test() {
  const queryGet = useQueryClient()
  CheckLogin
  const [saveCates, setSaveCates] = useState<Category[]>([]);

  // categoryni get qilish
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
  const difficulty = useRef<string>('');
  const [editTestID, setEditTestID] = useState<string>('');
  const categore = useRef<string>('');
  const answer = useRef<string | null>(null);
  const type = useRef<string>('');
  const checkbox = useRef<boolean>(false)
  const [datas, useDatas] = useState<FetchedTest[]>([]);
  const [turi, setTuri] = useState<string | null>(null);
  const [kategoriya, setKategoriya] = useState<string | null>(null);
  const [nameSearch, setnameSearch] = useState<string | null>(null);
  const [testlar, setTestlar] = useState<any[] | null>(null); // testlar ma'lumotlari massiv ekanini aniqladik
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [testID, setTestID] = useState<number | string>(''); // State to hold the test ID to be deleted
  const navigate = useNavigate();

  // bu kod qoshish btn uchun + -funck
  const [answers, setAnswers] = useState<Answer[]>([
    { id: Date.now(), value: "" },
  ]);
  // test get

  // useEffect(() => {
  // }, [nameSearch])


  // Search
  const searchTest2 = () => {
    let filteredTests = [...datas]; // Start with all tests

    // Filter by name search
    if (nameSearch && nameSearch.trim() !== "") {
      filteredTests = filteredTests.filter((item) =>
        item.name?.toLowerCase().includes(nameSearch.toLowerCase())
      );
    }

    // Filter by category
    if (kategoriya && kategoriya !== "All") {
      filteredTests = filteredTests.filter((item) =>
        item.categoryName?.toLowerCase() === kategoriya.toLowerCase()
      );
    }else{
      setTestlar(datas)
    }

    // Filter by type
    if (turi && turi !== '') {
      filteredTests = filteredTests.filter((item) =>
        item.type?.toLowerCase() === turi.toLowerCase()
      );
    }

    setTestlar(filteredTests);
  };
  useEffect(() => {
    searchTest2();
  }, [nameSearch, kategoriya, turi, datas]);
  // search


  // Bu yo'lda testlarni get qladi 
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
  // Test get qilish tugatildi

  // Bu yo'lda delete qiladi
  const isDelete = useMutation({
    mutationFn: async () => {
      const res = axios.delete(`${baseUrl}question/${testID}`, config)
      return res.data
    },
    onSuccess() {
      toast.success("Test o'chirildi")
      setIsModalOpen(false)
      queryGet.refetchQueries('testData')
    },
    onError(error: any) {
      toast.error(error.response.data.message)
    }
  })

  // useEffect(() => {
  //   if (isDelete) {
  //     queryGet.refetchQueries('testData')
  //   }
  // }, [isDelete])
  // Delete qilish tugatildi

  function showDeleteModal(id: number | string) {
    setTestID(id);
    setIsModalOpen(true);
  }

  // Handle add answer
  const handleAddAnswer = () => {
    setAnswers([...answers, { id: Date.now(), value: "" }]); // Add a new input
  };

  // Handle remove answer
  const handleRemoveAnswer = () => {
    if (answers.length > 1) {
      setAnswers(answers.slice(0, -1));
    }
  };



  // edit 

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
  function isEdit(ID: string) {
    const updateQuestion = async (ID: string | number) => {
      try {
        const response = await axios.put(`${baseUrl}question/${ID}`, updatedData, config);

        return response.data;
      } catch (error) {
        toast.error('edit bolmadi')
      }
    };
    updateQuestion(ID)
    seteditModal(!editMod)
  }
  // edit 

  // Use the data in a React component
  const { data, isLoading } = useQuery<ApiResponse, Error>({
    queryKey: ["tests"],
    queryFn: async () => {
      const response = await axios.get<ApiResponse>(`${baseUrl}question/filter?page=0&size=100`, config);
      return response.data;
    },
    onSuccess: (response) => {
      const fetchedTests = response.body.body.map((item, index) => ({
        id: item.id,
        name: item.name,
        categoryName: item.categoryName || "No category",
        categoryId: item.categoryId || null,
        finiteError: item.finiteError || 0,
        type: item.type,
        difficulty: item.difficulty,
        attachmentIds: item.attachmentIds || null,
        optionDtos: item.optionDtos,
        createdByName: item.createdByName,
        key: item.id.toString(),
        numer: index + 1,
        testRasm: ".",
        savol: item.optionDtos[0]?.answer || "",
        catygoria: item.categoryName || "No category",
        savolTuri: item.type,
        qiyinligi: item.difficulty,
        yaratganOdam: item.createdByName,
      }));

      useDatas(fetchedTests); // `setDatas`ga to'g'ri qiymatlar uzatiladi
    },
    onError: (error) => {
      console.error("Error fetching tests:", error);
      toast.error("malumot kelmadi");
    }
  });




  const categoryNames = [
    { value: "SUM", name: "Hisoblangan natija", },
    { value: "ONE_CHOICE", name: "Bir to'g'ri javobli test", },
    { value: "ANY_CORRECT", name: "Ko'p to'g'ri javobli test", },
  ];

  // edit modal
  const [editModal, seteditModal] = useState<boolean>(false);
  const [confirmLoad, setConfirmLoad] = useState<boolean>(false);

  const editMod = () => {
    setConfirmLoad(true);
    setTimeout(() => {
      setConfirmLoad(false);
      isEdit(editTestID)
    }, 2000);
  };
  const closeditmod = () => seteditModal(!editModal);
  // edit modal

  function showModal() {
    setOpen(true);
  };
  const [editOpen, setEditOpen] = useState<boolean>(false)
  function showEditModal() {
    setEditOpen(!editOpen);
  };

  function handleCancel() {
    setOpen(false);
  };


  function handleEditCancel() {
    setEditOpen(false);
  };


  const [optionDtos, setOptionDtos] = useState([
    {
      answer: '', // Initial empty answer
      isCorrect: true, // Default value for isCorrect
      file: 0,
    },
  ]);

  const [answerDate, setAnswerDate] = useState(''); // State for answer input

  useEffect(() => {
    console.log(answerDate, 'input answer');
    console.log(optionDtos, 'input option');
  }, [answerDate, optionDtos]);

  // Handler for the answer input change
  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswerDate(e.target.value);
  };

  // Handler for checkbox change by index
  const handleCheckboxChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setOptionDtos((prevOptions) =>
      prevOptions.map((option, i) =>
        i === index ? { ...option, isCorrect: isChecked } : option
      )
    );
  };

  // Function to add the new option to the optionDtos array
  const addOption = () => {
    setOptionDtos((prevOptions) => [
      ...prevOptions,
      {
        answer: answerDate, // Use the current value of the answer state
        isCorrect: false, // New option starts with isCorrect as false
        file: 0,
      },
    ]);
    setAnswerDate(''); // Clear the answer input
  };

  // Function to remove an option by index
  const removeOption = (index: number) => {
    setOptionDtos((prevOptions) => prevOptions.filter((_, i) => i !== index));
  };
  // Post question mutation (remains the same)
  const postQuestion = useMutation({
    mutationFn: async () => {
      const data = {
        name: quiz.current?.value || "", // Ref orqali olish
        categoryId: Number(categore.current?.value) || "", // Ref orqali olish
        finiteError: 0,
        type: type.current?.value || "", // Ref orqali olish
        difficulty: difficulty.current?.value || "", // Ref orqali olish
        attachmentIds: [0],
        optionDtos: optionDtos.slice(1), // Skip the first (placeholder) option
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
      queryGet.invalidateQueries('testData');

    },
    onError: (err: any) => {
      message.error(err.message);
      console.error(err);
    },
  });

  const handleRadioChange = (index: number) => {
    // Update the isCorrect value for the selected option only
    setOptionDtos((prevOptions) =>
      prevOptions.map((option, i) => ({
        ...option,
        isCorrect: i === index, // Set isCorrect to true for the selected index, false for others
      }))
    );
  };


  // Handle OK button
  const handleOk = () => {
    postQuestion.mutate();
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };


  // Edit states
  const [testId, setTestId] = useState(null)


  // Edit Quiz function 
  const editQuiz = useMutation({
    mutationFn: async () => {
      const data = {
        name: quiz.current?.value || "", // Ref orqali olish
        categoryId: Number(categore.current?.value) || "", // Ref orqali olish
        finiteError: 0,
        type: type.current?.value || "", // Ref orqali olish
        difficulty: difficulty.current?.value || "", // Ref orqali olish
        attachmentIds: [0],
        optionDtos: optionDtos.slice(1), // Skip the first (placeholder) option
      };

      try {
        const res = await axios.put(`${PostQuestion}/${testId}`, data, config);
        return res.data;
      } catch (err) {
        throw new Error('Error posting question: ' + err.message);
      }
    },
    onSuccess: () => {
      message.success('Edited successfully');
      queryGet.invalidateQueries('testData');
    },
    onError: (err: any) => {
      message.error(err.message);
      console.error(err);
      console.log(testId);
    },
  });

  // Handle remove inputs
  function removeInp() {
    if (testType === "SUM") {
      setAnswers(answers.slice(0, 1));
      setAnswerDate('')
      setOptionDtos((prevOptions) => prevOptions.slice(0, 1));
    }
  }
  useEffect(() => {
    removeInp();
  }, [testType, turi, kategoriya, nameSearch, testlar]);


  const handleEditOk = () => {
    editQuiz.mutate();
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  // Rasm modal
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);


  const showImageModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setImageModalVisible(true);
  };

  const handleImageModalClose = () => {
    setImageModalVisible(false);
    setSelectedImage(null);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;


  const indexOfLastItem = currentPage * itemsPerPage;

  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = testlar?.slice(indexOfFirstItem, indexOfLastItem) || [];


  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Helmet><title>Testlar</title></Helmet>
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
                    <option value="MEDIUM" className="text text-black">
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
                  {testType !== null &&
                    (testType === "SUM" ||
                      testType === "ANY_CORRECT") &&
                    answers.map((answer: Answer, index) => (
                      <div
                        key={answer.id}
                        className="flex items-center mb-4 gap-2"
                      >
                        <input
                          type="checkbox"
                          checked={
                            testType === "SUM" || answer.checked
                          }
                          onChange={(e) => handleCheckboxChange(index, e)}
                          disabled={testType === "SUM"}
                          className="mr-3 accent-blue-500"
                        />
                        <input
                          onChange={(e) => setOptionDtos((prevOptions) =>
                            prevOptions.map((opt, i) =>
                              i === index ? { ...opt, answer: e.target.value } : opt
                            )
                          )}
                          placeholder={`Option ${index + 1}`}
                          className="border bg-white w-full p-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <label className="cursor-pointer custom-file-upload px-3 w-[160px] py-2 bg-blue-500 text-white text-[13px] rounded-md">
                          <input type="file" className="hidden" />
                          Choose file
                        </label>
                        {testType === "ANY_CORRECT" && (
                          <>
                            <button onClick={() => (handleRemoveAnswer(), removeOption(index))} className="bg-gray-300 hover:bg-gray-400 text-lg px-3 rounded-md border border-gray-300 ml-2" > - </button>
                            <button onClick={() => (handleAddAnswer(), addOption())} className="bg-gray-300 hover:bg-gray-400 text-lg px-3 rounded-md border border-gray-300"  >  +</button>
                          </>
                        )}
                      </div>
                    ))}
                </div>

                <div>
                  {testType !== null &&
                    testType === "ONE_CHOICE" &&
                    answers.map((answer, index) => (
                      <div
                        key={answer.id}
                        className="flex items-center mb-4 gap-1"
                      >
                        <input
                          onChange={(e) => handleRadioChange(index)}
                          type="radio"
                          name="single-choice"
                          className="mr-3 accent-blue-500"
                        />
                        <input
                          onChange={(e) => setOptionDtos((prevOptions) =>
                            prevOptions.map((opt, i) =>
                              i === index ? { ...opt, answer: e.target.value } : opt
                            )
                          )}
                          placeholder={`Option ${index + 1}`}
                          className="border w-full bg-white p-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <label className="cursor-pointer custom-file-upload px-3 w-[150px] py-2 bg-blue-500 text-white text-[13px] rounded-md">
                          <input type="file" className="hidden" />
                          Choose file
                        </label>
                        <>
                          <button onClick={() => (handleRemoveAnswer(), removeOption(index))} className="bg-gray-300 hover:bg-gray-400 text-lg px-3 rounded-md border border-gray-300 ml-2" > - </button>
                          <button onClick={() => (handleAddAnswer(), addOption())} className="bg-gray-300 hover:bg-gray-400 text-lg px-3 rounded-md border border-gray-300"  >  +</button>
                        </>
                      </div>
                    ))}
                </div>

                <div className="mb-4 ml-[180px] mt-5 ">
                  {/* <label className="w-[90px] h-[90px] rounded border-dashed border-2 border-gray-400 bg-yellow-100 flex flex-col items-center justify-center">
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
                  </h2>{" "} */}
                </div>
              </Modal>


              {/* Edit modal  */}
              <Modal
                title="Savol qo'shish"
                open={editOpen}
                onOk={handleEditOk}
                confirmLoading={confirmLoading}
                onCancel={handleEditCancel}
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
                    <option value="MEDIUM" className="text text-black">
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
                  {testType !== null &&
                    (testType === "SUM" ||
                      testType === "ANY_CORRECT") &&
                    answers.map((answer: Answer, index) => (
                      <div
                        key={answer.id}
                        className="flex items-center mb-4 gap-2"
                      >
                        <input
                          type="checkbox"
                          checked={
                            testType === "SUM" || answer.checked
                          }
                          onChange={(e) => handleCheckboxChange(e)}
                          disabled={testType === "SUM"}
                          className="mr-3 accent-blue-500"
                        />
                        <input
                          onChange={(e) => handleAnswerChange(e)}
                          placeholder="Savolning javoblarini kiriting"
                          className="border bg-white w-full p-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <label className="cursor-pointer custom-file-upload px-3 w-[160px] py-2 bg-blue-500 text-white text-[13px] rounded-md">
                          <input type="file" className="hidden" />
                          Choose file
                        </label>
                        {testType === "ANY_CORRECT" && (
                          <>
                            <button onClick={() => (handleRemoveAnswer(), removeOption(index))} className="bg-gray-300 hover:bg-gray-400 text-lg px-3 rounded-md border border-gray-300 ml-2" > - </button>
                            <button onClick={() => (handleAddAnswer(), addOption())} className="bg-gray-300 hover:bg-gray-400 text-lg px-3 rounded-md border border-gray-300"  >  +</button>
                          </>
                        )}
                      </div>
                    ))}
                </div>

                <div>
                  {testType !== null &&
                    testType === "ONE_CHOICE" &&
                    answers.map((answer, index) => (
                      <div
                        key={answer.id}
                        className="flex items-center mb-4 gap-1"
                      >
                        <input
                          onChange={(e) => handleRadioChange(index)}
                          type="radio"
                          name="single-choice"
                          className="mr-3 accent-blue-500"
                        />
                        <input
                          onChange={(e) => handleAnswerChange(e)}
                          placeholder="Savolning javoblarini kiriting"
                          className="border w-full bg-white p-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <label className="cursor-pointer custom-file-upload px-3 w-[150px] py-2 bg-blue-500 text-white text-[13px] rounded-md">
                          <input type="file" className="hidden" />
                          Choose file
                        </label>
                        <>
                          <button onClick={() => (handleRemoveAnswer(), removeOption(index))} className="bg-gray-300 hover:bg-gray-400 text-lg px-3 rounded-md border border-gray-300 ml-2" > - </button>
                          <button onClick={() => (handleAddAnswer(), addOption())} className="bg-gray-300 hover:bg-gray-400 text-lg px-3 rounded-md border border-gray-300"  >  +</button>
                        </>
                      </div>
                    ))}
                </div>

                <div className="mb-4 ml-[180px] mt-5 ">
                  {/* <label className="w-[90px] h-[90px] rounded border-dashed border-2 border-gray-400 bg-yellow-100 flex flex-col items-center justify-center">
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
                  </h2>{" "} */}
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
                    <option value="All" selected>
                      Kategoriyani tanlang
                    </option>
                    <option className="text text-black" value="All">All</option>
                    {saveCates && saveCates.length > 0 && saveCates.map((cate) => (
                      <option key={cate.id} value={cate.name} className="text text-black">
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
            <Table hoverable className="bg-white">
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
              {currentItems.map((item, index) => (
                <TableBody className="divide-y bg-white" key={item.id}>
                  <TableCell className="bg-white">{index + 1}</TableCell>
                  <TableCell className="w-[90px]">
                    <img
                      src="src/assets/images/default.png" // Replace with actual image source
                      className="border-[1px] border-gray-300 w-10 h-10 rounded-full object-cover hover:cursor-pointer sm:w-[43px] sm:h-[43px]"
                      alt=""
                      onClick={() => showImageModal("src/assets/images/default.png")} // Replace with actual image URL
                    />
                  </TableCell>
                  <TableCell className="bg-white">{item.name}</TableCell>
                  <TableCell className="bg-white">{item.categoryName}</TableCell>
                  <TableCell className="bg-white">{item.type}</TableCell>
                  <TableCell className="bg-white">{item.difficulty}</TableCell>
                  <TableCell className="bg-white">{item.createdByName}</TableCell>
                  <TableCell className="bg-white flex items-center gap-3">
                    <EditOutlined onClick={() => (setTestId(item.id), showEditModal())} />
                    <DeleteOutlined onClick={() => showDeleteModal(item.id)} />
                    <EyeOutlined onClick={() => {
                      navigate('/tests', { state: { catygoria: item.categoryName, savol: item.name, id: item.id } })
                    }} />
                  </TableCell>
                </TableBody>
              ))}
            </Table>
            {/* Pagination */}
            <Pagination
              current={currentPage}
              pageSize={itemsPerPage}
              total={testlar?.length || 0}
              onChange={onPageChange}
              showSizeChanger={false} // Hide page size changer if not needed
              className="flex mt-4"
            />
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

      {/* Delete modal */}
      <Modal
        title="Delete Confirmation"
        visible={isModalOpen}
        onOk={() => (isDelete.mutate())} // Calls the delete function when confirmed
        onCancel={() => setIsModalOpen(false)} // Close modal on cancel
      >
        <p>Testni o'chirmoqchimisiz?</p>
      </Modal>

      {/* Image Modal */}
      <Modal
        title="Image Preview"
        visible={imageModalVisible}
        onCancel={handleImageModalClose}
        footer={null}
      >
        {selectedImage && (
          <img
            src={selectedImage}
            alt="Preview"
            className="w-full h-auto"
          />
        )}
      </Modal>
    </div>
  );
}

export default Test;
