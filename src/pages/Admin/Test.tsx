import Layout from "@/components/Dashboard/Layout";
import { baseUrl, PostQuestion } from "@/helpers/api/baseUrl";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, } from 'flowbite-react';
import { config } from "@/helpers/functions/token";
import { PlusCircleOutlined, EditOutlined, DeleteOutlined, EyeOutlined, } from "@ant-design/icons";
import { Button, message, Modal, } from "antd";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { FcSearch } from "react-icons/fc";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ApiResponse, FetchedTest, } from "@/helpers/types/test";
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
  const answerData = useRef<string>('')
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
    if (nameSearch && nameSearch.trim() !== "") {
      // testlar mavjud bo'lsa va testlar massiv bo'lsa, filter qilamiz
      const newData = testlar?.filter((item) =>
        item.name?.toLowerCase().includes(nameSearch.toLowerCase())
      ) ?? []
      setTestlar(newData);
      console.log(newData);

    } else if (nameSearch == '') {
      setTestlar(datas);

    }
    if (kategoriya) {
      const kategoriyaData = testlar?.filter((item) =>
        item.categoryName?.toLowerCase().includes(kategoriya.toLowerCase())
      ) ?? [];
      setTestlar(kategoriyaData);
    }
    if (kategoriya == "All") {
      setTestlar(datas);
    }
    if (turi && turi !== '') {
      const turiData = testlar?.filter((item) =>
        item.type?.toLowerCase().includes(turi.toLowerCase())
      ) ?? [];
      setTestlar(turiData);
    }
  };
  useEffect(() => {
    searchTest2();
  }, [nameSearch, kategoriya, turi])
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
  useEffect(() => {
    testData.refetch()
  }, [testData.data])
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

  useEffect(() => {
    queryGet.refetchQueries('testData')
  }, [queryGet, isDelete, isModalOpen])
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

  // Handle remove inputs
  function removeInp() {
    if (testType === "Hisoblangan natija") {
      setAnswers(answers.slice(0, 1));
    }
  }
  useEffect(() => {
    removeInp();
  }, [testType, turi, kategoriya, nameSearch, testlar]);


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
  console.log(data);



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

  function handleCancel() {
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
      queryGet.invalidateQueries('testData')
    },
    onError: (err: any) => {
      message.error(err.message);
      console.error(err);

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
              {testlar && testlar.map((item, index) => (
                <TableBody className="divide-y bg-white">
                  <TableCell className="bg-white">{index + 1}</TableCell>
                  <TableCell className="bg-white"><img src="src/assets/images/default.png" className="w-10 h-10 rounded-full" alt="" /></TableCell>
                  <TableCell className="bg-white">{item.name}</TableCell>
                  <TableCell className="bg-white">{item.categoryName}</TableCell>
                  <TableCell className="bg-white">{item.type}</TableCell>
                  <TableCell className="bg-white">{item.difficulty}</TableCell>
                  <TableCell className="bg-white">{item.createdByName}</TableCell>
                  <TableCell className="bg-white flex items-center gap-3">
                    <EditOutlined />
                    <DeleteOutlined onClick={() => showDeleteModal(item.id)} />
                    <EyeOutlined onClick={() => {
                      navigate('/tests', { state: { catygoria: item.categoryName, savol: item.name } })
                    }} />
                  </TableCell>
                </TableBody>
              ))}
            </Table>
          </div>
        )
        }
      </Layout>


      {/* Delete modal */}
      <Modal
        title="Delete Confirmation"
        visible={isModalOpen}
        onOk={() => isDelete.mutate()}
        onCancel={() => setIsModalOpen(false)}
      >
        <p>Testni o'chirmoqchimisiz?</p>
      </Modal>
    </div>
  );
}

export default Test;
