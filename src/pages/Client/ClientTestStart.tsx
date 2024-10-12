// ClientTestStart.tsx
import Layout from "@/components/clientDashboard/laytout";
import { Logo } from "@/helpers/imports/images";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd";
import { useEffect, useState } from "react";
import { MdOutlineNotStarted } from "react-icons/md";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { baseUrl } from "@/helpers/api/baseUrl";
import { ClientCategory } from "@/helpers/types/getClientCategory";
import { toast } from "react-toastify";
import axios from "axios";
import { config } from "@/helpers/functions/token";

interface AxiosError {
  message: string;
}

const ClientTestStart: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const navigate = useNavigate()

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    navigate('/client/quiz/:id')
  };

  function checkRoleClient() {
    const role = localStorage.getItem('role')
    const token = localStorage.getItem('token')
    if (role == 'ROLE_SUPER_ADMIN') {
      navigate('/dashboard')
    } else if (role == 'ROLE_TESTER') {
      navigate('/category')
    }

    if (token == null) {
      navigate('/auth/Signin')
    }
  }

  useEffect(() => {
    checkRoleClient()
  }, [checkRoleClient])

  // Function to handle modal close
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ["getClientCategory"],
    queryFn: async () => {
      const res = await axios.get(`${baseUrl}category`, config);
      return res.data?.body?.body as ClientCategory[];
    },
    onError: (error: AxiosError) => {
      toast.error(error.message);
    },
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return toast.error(error.message)

  return (
    <Layout className="p-8 space-y-6">
      <Helmet>
        <title>Geodeziya</title>
      </Helmet>
      <div className="py-8">
        <h2 className="text-red-600 text-4xl text-center">Yo'nalishlar</h2>
      </div>
      {Array.isArray(data) && data.map((item: ClientCategory, index: number) => (
        <div className="border-[0.5px] items-center shadow-xl relative border-black bg-white rounded-md py-6 px-4 w-full">
          <div className="flex">
            <div>
              <img className="w-40 h-40 mr-4" src={item.fileId} alt="Category Image" />
            </div>
            <div className="flex-1 mb-4">
              <div key={index} className="flex justify-between mb-2">
                <span className="text-gray-600 font-semibold">Yo'nalish</span>
                <span className="text-gray-700 font-medium">{item.name}</span>
              </div>

              <div key={index} className="flex justify-between mb-2">
                <span className="text-gray-600 font-semibold">Test ishlashga ajratilgan vaqt</span>
                <span className="text-gray-700 font-medium">{item.duration} (дақ.)</span>
              </div>

              <div key={index} className="flex justify-between mb-2">
                <span className="text-gray-600 font-semibold">Savollar soni</span>
                <span className="text-gray-700 font-medium">{item.questionCount} ta</span>
              </div>

              <div key={index} className="flex justify-between mb-2">
                <span className="text-gray-600 font-semibold">Qayta topshirish vaqti</span>
                <span className="text-gray-700 font-medium">{item.retakeDate} ta</span>
              </div>

              <button onClick={showModal} className="bg-gray-600 cursor-pointer absolute top-[78%] right-3 text-white p-1 px-4 rounded">
                Бошлаш
              </button>
            </div>

            <Modal
              title={
                <div>
                  <span>
                    <MdOutlineNotStarted size={90} color="red" className="mx-auto" />
                  </span>
                  <span>Haqiqatdan ham </span>
                  <span className="text-red-600">{data[index].name}</span>
                  <span> yo'nalishi bo'yicha test boshlamoqchimisiz?</span>
                </div>
              }
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
              okText="Boshlash"
              cancelText="Orqaga"
              maskClosable={false}
              style={{
                top: "34%",
                left: "1%",
                width: "300px"
              }}
              maskStyle={{
                backgroundColor: "rgba(0, 0, 0, 0.1)",
              }}
            >
            </Modal>
          </div>
        </div>
      ))}
    </Layout>
  );
}
export default ClientTestStart;
