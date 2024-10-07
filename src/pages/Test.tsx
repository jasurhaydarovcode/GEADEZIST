import Layout from "@/components/Dashboard/Layout";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Modal, Table } from "antd";
import { useState } from "react";
import { FcSearch } from "react-icons/fc";

function Test() {
  const dataSource = [
    {
      key: "1",
      numer: 1,
      testRasm: "",
      savol: "asd/∛(a + 52)",
      catygoria: "Марказийдерлик",
      savolTuri: "Бир тўғри жавобли тест",
      qiyinligi: "Ўрта",
    },
    {
      key: "2",
      numer: 2,
      testRasm: "",
      savol: "z/s e^a sz w^qs √aasass ∛√sas √f casd sin(zxc)",
      catygoria: "Марказийдерлик",
      savolTuri: "Ҳисобланган натижа",
      qiyinligi: "Ўрта",
    },
  ];

  const columns = [
    {
      title: "T/P",
      dataIndex: "numer",
      key: "numer",
    },
    {
      title: "Тест расми",
      dataIndex: "testRasm",
      key: "testRasm",

    },
    {
      title: "Савол",
      dataIndex: "savol",
      key: "savol",
    },
    {
      title: "Категория номи",
      dataIndex: "catygoria",
      key: "catygoria",
    },
    {
      title: "Савол тури",
      dataIndex: "savolTuri",
      key: "savolTuri",
    },
    {
      title: "Қийинлик даражаси",
      dataIndex: "qiyinligi",
      key: "qiyinligi",
    },

  ];

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

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
            Boshqaruv paneli  / <span className="text-blue-700 ">Test</span>
          </p>
        </div>

        <div className="flex justify-between">
          <Button onClick={showModal} color="default" variant="solid" className=" text-xl px-5 py-6 my-5">
            <PlusCircleOutlined className="text-xl" /> Qo'shish
          </Button>

          <Modal
            title="Hodim qo'shish"
            open={open}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            maskClosable={false}
          >
            <div className="mb-4">
              <label className="block mb-2">Kategoriya turini tanlang</label>
              <select className="border w-full p-2 rounded">
                <option value="">Asosiy boʻlmagan kategoriya</option>
                <option value="main">Asosiy kategoriya</option>
                <option value="secondary">Asosiy boʻlmagan kategoriya</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block mb-2">Tavsif</label>
              <input
                type="text"
                placeholder="Tavsifni kiriting"
                className="border w-full p-2 rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2">Umumiy savollar soni</label>
              <input
                type="number"
                placeholder="Umumiy savollar sonini kiriting"
                className="border w-full p-2 rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2">Qo'shimcha savollar soni</label>
              <input
                type="number"
                placeholder="Qo'shimcha savollar sonini kiriting"
                className="border w-full p-2 rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2">Davomiylik vaqti (m)</label>
              <input
                type="number"
                placeholder="Davomiylik vaqti (minutlarda)"
                className="border w-full p-2 rounded"
              />
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
                className="w-[200px] pl-10  bg-[] border-gray-300 rounded-md h-[50px] "
                placeholder="Foydalanuvchini qidirish"
              />
            </div>

            <div className="flex">
              {/* <input type="text" className="w-[350px] bg-[] rounded-md h-[50px] placeholder:font-extralight placeholder-gray-400 border-gray-400  placeholder:text-[14px] " placeholder="Tumanni tanlang" /> */}
              <select className="w-[200px] text-gray-400 bg-white rounded-md h-[50px] placeholder:font-extralight placeholder-gray-400 border-gray-400 placeholder:text-[14px]">
                <option disabled>catygoriani tanlang</option>
                <option value="">Umumiy savollar</option>
                <option value="">Umumiy geodeziya</option>
                <option value="">Tapografiya</option>
                <option value="">Oliy geodeziya</option>
                <option value="">xarqanday tug'ri</option>
              </select>

              {/* <SlArrowDown className="absolute ml-[320px] mt-4" /> */}
            </div>
            <div className="flex">
              {/* <input type="text" className="w-[350px] bg-[] rounded-md h-[50px] placeholder:font-extralight placeholder-gray-400 border-gray-400  placeholder:text-[14px] " placeholder="Tumanni tanlang" /> */}
              <select className="w-[200px] text-gray-400 bg-white rounded-md h-[50px] placeholder:font-extralight placeholder-gray-400 border-gray-400 placeholder:text-[14px]">
                <option disabled>turini tanlang</option>
                <option value="calculated">xisoblangan natija</option>
                <option value="single-choice">bir tug'ri javobli test</option>
                <option value="multiple-choice">ko'p tug'ri javobli test</option>
                <option value="any-correct">xarqanday tug'ri</option>
              </select>

              {/* <SlArrowDown className="absolute ml-[320px] mt-4" /> */}
            </div>
          </div>
        </div>

        <Table dataSource={dataSource} columns={columns} />
      </div>
    </Layout>
  );
}

export default Test;
