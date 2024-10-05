import Sidebar from "@/components/Dashboard/Sidebar";
import { Button } from "antd";
import { Navbar } from "flowbite-react";
import { useState } from "react";
import { MdOutlineAddCircle } from 'react-icons/md';
import Modal from 'react-modal';

// Custom styles for the modal
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '400px', // Adjust width as needed
    padding: '20px',
    borderRadius: '10px'
  },
};

const Category = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryType, setCategoryType] = useState("");
  const [description, setDescription] = useState("");
  const [generalQuestions, setGeneralQuestions] = useState("");
  const [additionalQuestions, setAdditionalQuestions] = useState("");
  const [duration, setDuration] = useState("");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className={`ml-5`}>
          <p className={`text-2xl font-bold my-5`}>Kategoryalar</p>
          <div className={`mb-5`}>
            <Button
              onClick={openModal}
              children={
                <div className={`flex justify-center items-center`}>
                  <MdOutlineAddCircle className={`text-4xl mr-5`} />
                  <p className={`text-lg font-bold`}>Qo'shish</p>
                </div>
              }
            />
          </div>

          {/* Modal category */}
          {isModalOpen && (
            <Modal
              onRequestClose={closeModal}
              isOpen={isModalOpen}
              style={customStyles}
              contentLabel="Qo'shish Modal"
            >
              <h2 className="text-xl font-bold mb-4">Rasm Yuklash</h2>

              <div className="mb-4">
                <label className="block mb-2">Kategoriya turini tanlang</label>
                <select
                  value={categoryType}
                  onChange={(e) => setCategoryType(e.target.value)}
                  className="border w-full p-2 rounded"
                >
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
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="border w-full p-2 rounded"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2">Umumiy savollar soni</label>
                <input
                  type="number"
                  placeholder="Umumiy savollar sonini kiriting"
                  value={generalQuestions}
                  onChange={(e) => setGeneralQuestions(e.target.value)}
                  className="border w-full p-2 rounded"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2">Qo'shimcha savollar soni</label>
                <input
                  type="number"
                  placeholder="Qo'shimcha savollar sonini kiriting"
                  value={additionalQuestions}
                  onChange={(e) => setAdditionalQuestions(e.target.value)}
                  className="border w-full p-2 rounded"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2">Davomiylik vaqti (m)</label>
                <input
                  type="number"
                  placeholder="Davomiylik vaqti (minutlarda)"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="border w-full p-2 rounded"
                />
              </div>

              <div className="flex justify-end">
                <Button onClick={closeModal} className="mr-3">Bekor qilish</Button>
                <Button type="primary">Saqlash</Button>
              </div>
            </Modal>
          )}
        </div>
      </div>
    </>
  );
};

export default Category;
