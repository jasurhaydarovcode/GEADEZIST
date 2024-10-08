import Layout from "@/components/Dashboard/Layout";
import { PlusCircleOutlined, EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Modal, Table } from "antd";
import { useState } from "react";
import { FcSearch } from "react-icons/fc";

function Test() {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const dataSource = [
    { key: "1", numer: 1, testRasm: ".", savol: "asd/∛(a + 52)", catygoria: "Markaziyderlik", savolTuri: "Bir to'g'ri javobli test", qiyinligi: "O'rta", yaratganOdam: "admin" },
    { key: "2", numer: 2, testRasm: ".", savol: "asd/∛(a + 52)", catygoria: "Markaziyderlik", savolTuri: "Bir to'g'ri javobli test", qiyinligi: "Yurta", yaratganOdam: "admin" },
    { key: "3", numer: 3, testRasm: ".", savol: "asd/∛(a + 52)", catygoria: "Markaziyderlik", savolTuri: "Bir to'g'ri javobli test", qiyinligi: "Yurta", yaratganOdam: "admin" },
    { key: "4", numer: 4, testRasm: ".", savol: "asd/∛(a + 52)", catygoria: "Markaziyderlik", savolTuri: "Bir to'g'ri javobli test", qiyinligi: "Yurta", yaratganOdam: "admin" },
    { key: "5", numer: 5, testRasm: ".", savol: "asd/∛(a + 52)", catygoria: "Markaziyderlik", savolTuri: "Bir to'g'ri javobli test", qiyinligi: "Yurta", yaratganOdam: "admin" },
    { key: "6", numer: 6, testRasm: ".", savol: "asd/∛(a + 52)", catygoria: "Markaziyderlik", savolTuri: "Bir to'g'ri javobli test", qiyinligi: "Yurta", yaratganOdam: "admin" },
    { key: "7", numer: 7, testRasm: ".", savol: "asd/∛(a + 52)", catygoria: "Markaziyderlik", savolTuri: "Bir to'g'ri javobli test", qiyinligi: "Yurta", yaratganOdam: "admin" },
    { key: "8", numer: 8, testRasm: ".", savol: "asd/∛(a + 52)", catygoria: "Markaziyderlik", savolTuri: "Bir to'g'ri javobli test", qiyinligi: "Yurta", yaratganOdam: "admin" },
    { key: "9", numer: 9, testRasm: ".", savol: "asd/∛(a + 52)", catygoria: "Markaziyderlik", savolTuri: "Bir to'g'ri javobli test", qiyinligi: "Yurta", yaratganOdam: "admin" }
  ];

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
          <EditOutlined className="text-black cursor-pointer" />
          <DeleteOutlined className="text-black cursor-pointer" />
          <ExclamationCircleOutlined className="text-black cursor-pointer" />
        </div>
      )
    }
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
    <Layout>
      <div className="p-5">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold font-sans">Test</h1>
          <p className="font-sans text-gray-700">
            Boshqaruv paneli / <span className="text-blue-700">Test</span>
          </p>
        </div>

        <div className="flex justify-between">
          <Button onClick={showModal} className="bg-black hover:bg-black text-xl px-5 py-6 my-5 text-white">
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
                <option disabled selected value="">Kategoriyani tanlang</option>
                <option value="" className="text text-black">Umumiy savollar</option>
                <option value="" className="text text-black">Umumiy geodeziya</option>
                <option value="" className="text text-black">Topografiya</option>
                <option value="" className="text text-black">Oliy geodeziya</option>
                <option value="" className="text text-black">Har qanday to'g'ri</option>
              </select>
            </div>

            <div className="mb-4">
              <select className="w-full text-gray-400 bg-white rounded-md h-[50px] placeholder:font-extralight placeholder-gray-400 border-gray-400 placeholder:text-[14px]">
                <option disabled selected>Qiyinchilik darajasini tanlang</option>
                <option value="" className="text text-black">Qiyin</option>
                <option value="" className="text text-black">Oson</option>
                <option value="" className="text text-black">O'rta</option>
              </select>
            </div>

            <div className="mb-4">
              <select className="w-full text-gray-400 bg-white rounded-md h-[50px] placeholder:font-extralight placeholder-gray-400 border-gray-400 placeholder:text-[14px]">
                <option disabled selected>Turlarni tanlang</option>
                <option value="" className="text text-black">Hisoblangan natija</option>
                <option value="" className="text text-black">Bir to'g'ri javobli test</option>
                <option value="" className="text text-black">Ko'p to'g'ri javobli test</option>
              </select>
            </div>

            <div className="mb-4 ml-[180px] mt-5">
              <Button className="w-[90px] h-[90px] rounded border-dashed border-2 border-gray-400 flex flex-col items-center justify-center">
                <img src="https://example.com/your-icon.png" alt="Rasm yuklash" className="w-6 h-6" /> {/* Ikonka rasm manzilingiz bilan almashtiring */}
                Rasm yuklash
              </Button>
              <h2 className="mt-2 mr-2">Rasm yuklash ixtiyoriy</h2> {/* Markazdan chapga joylashtirildi */}
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
                <option disabled selected>Kategoriyani tanlang</option>
                <option value="" className="text text-black">Umumiy savollar</option>
                <option value="" className="text text-black">Umumiy geodeziya</option>
                <option value="" className="text text-black">Topografiya</option>
                <option value="" className="text text-black">Oliy geodeziya</option>
                <option value="" className="text text-black">Har qanday to'g'ri</option>
              </select>
            </div>

            <div className="flex">
              <select className="w-[200px] text-gray-400 bg-white rounded-md h-[50px]">
                <option disabled selected>Turlarni tanlang</option>
                <option value="calculated" className="text text-black">Hisoblangan natija</option>
                <option value="single-choice" className="text text-black">Bir to'g'ri javobli test</option>
                <option value="multiple-choice" className="text text-black">Ko'p to'g'ri javobli test</option>
                <option value="" className="text text-black">Har qanday to'g'ri</option>
              </select>
            </div>
          </div>
        </div>

        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={{ pageSize: 5 }} // Pagination added here
        />
      </div>
    </Layout>
  );
}

export default Test;
