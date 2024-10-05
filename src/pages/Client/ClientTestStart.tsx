// ClientTestStart.tsx
import Layout from "@/components/clientDashboard/laytout";
import { Logo } from "@/helpers/imports/images";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd";
import { useState } from "react";
import { MdOutlineNotStarted } from "react-icons/md";

const ClientTestStart: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const navigate = useNavigate()

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    navigate('/client/quiz/:id')
    // Add any logic you want to execute when "OK" is clicked
  };

  // Function to handle modal close
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const geodesyData = [
    { title: "Йўналиш:", value: "Умумий Геодезия" },
    { title: "Тест ишлашга ажратилган вақт:", value: "60 (дақ.)" },
    { title: "Саволлар сони:", value: "20 та" },
    { title: "Қайта топшириш вақти:", value: "3 кундан кейин" },
  ];


  const testData = [
    {
      title: "Umumiy Geodeziya",
      time: "60 (daq.)",
      questions: "20 ta",
      retry: "3 kundan keyin",
      imgSrc: "https://via.placeholder.com/382x192",
    },
    {
      title: "Tepografiya",
      time: "60 (daq.)",
      questions: "20 ta",
      retry: "3 kundan keyin",
      imgSrc: "https://via.placeholder.com/382x192",
    },
  ];

  return (
    <Layout>
      <div className="py-8">
        <h2 className="text-red-600 text-4xl text-center">Yo'nalishlar</h2>
      </div>
      <div className="border-[1px] items-center relative border-black rounded-md py-6 px-4 w-full">
        <div className="flex">
          <div>
            <img className="w-40 h-40 mr-4" src={Logo} alt="Orientation Illustration" />
          </div>
          <div className="flex-1 mb-4">
            {geodesyData.map((item, index) => (
              <div key={index} className="flex justify-between mb-2">
                <span className="text-gray-600 font-semibold">{item.title}</span>
                <span className="text-gray-800">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Ant Design Modal */}
        <Modal
          title={
            <div>
              <span>
                <MdOutlineNotStarted size={90} color="red" className="mx-auto" />
              </span>
              <span>Haqiqatdan ham </span>
              <span className="text-red-600">{geodesyData[0].value}</span>
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
            top: "36`%",
            left: "1%",
            width: "300px"
          }}
          maskStyle={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
        </Modal>
        <button onClick={showModal} className="bg-gray-600 cursor-pointer absolute top-[78%] right-3 text-white p-1 px-4 rounded">
          Бошлаш
        </button>
      </div>
      <div className="text-center text-red-600 text-4xl font-extrabold mb-8">Yo'nalishlar</div>

      <div className="flex flex-col space-y-8">
        {testData.map((test, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row border rounded-lg shadow-xl p-6 bg-white hover:bg-gray-50 transition-colors duration-300"
          >
            {/* Image and Overlay Section */}
            <div className="relative group w-full md:w-1/3 h-48 md:h-auto">
              <img
                src={test.imgSrc}
                alt={test.title}
                className="w-full h-full rounded-lg object-cover"
              />
            </div>

            {/* Details Section */}
            <div className="mt-6 md:mt-0 md:ml-8 w-full md:w-2/3 flex flex-col justify-between">
              {/* Labels and Values Container */}
              <div className="flex flex-col md:flex-row">
                {/* Labels */}
                <div className="md:w-1/2">
                  <h2 className="text-xl text-gray-700 font-extrabold mb-4">Yo'nalish:</h2>
                  <p className="text-lg mb-2">Test ishlashga ajratilgan vaqt:</p>
                  <p className="text-lg mb-2">Savollar soni:</p>
                  <p className="text-lg">Qayta topshirish vaqti:</p>
                </div>

                {/* Values */}
                <div className="md:w-1/2">
                  <h2 className="text-xl text-gray-700 font-extrabold mb-4">{test.title}</h2>
                  <p className="text-lg mb-2">
                    <span className="font-semibold">{test.time}</span>
                  </p>
                  <p className="text-lg mb-2">
                    <span className="font-semibold">{test.questions}</span>
                  </p>
                  <p className="text-lg">
                    <span className="font-semibold">{test.retry}</span>
                  </p>
                  {/* Start Button */}
                  <div className="mt-6">
                    <button className="bg-gray-700 text-white text-lg py-2 px-6 rounded-lg hover:bg-gray-800 transition-colors duration-300">
                      Boshlash
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default ClientTestStart;
