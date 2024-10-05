<<<<<<< HEAD
import Sidebar from "@/components/Dashboard/Sidebar"
import { Button } from "antd"
import { Navbar } from "flowbite-react"
import { useState } from "react";
import { MdOutlineAddCircle } from 'react-icons/md';
import Modal from 'react-modal';



const Category = () => {
    const [ isModalOpen, setIsModalOpen] = useState(false);
  
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <>
            <Navbar />
            <div>
                <Sidebar />
                <div className={`mb-5`}>
                    <Button
                    onClick={openModal}
                    children={<div className={`flex justify-center items-center`}>
                        <MdOutlineAddCircle className={`text-4xl mr-3`} />
                        <p className={`text-lg font-bold`}>Қўшиш</p>
                    </div>}
                    />
                </div>
                {isModalOpen && <Modal onRequestClose={closeModal} />}
            </div>
        </>
    )
}

=======
function Category() {
  return (
    <div>Category</div>
  );
}

>>>>>>> 688a4d8e867b88fed4759d9978b49c64730c6f6b
export default Category