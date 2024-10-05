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
            <div className="flex">
                <Sidebar />
                <div className={`mb-5`}>
                    <Button
                    onClick={openModal}
                    children={<div className={`flex justify-center items-center`}>
                        <MdOutlineAddCircle className={`text-4xl mr-5`} />
                        <p className={`text-lg font-bold`}>Qo'shish</p>
                    </div>}
                    />
                </div>
                {isModalOpen && <Modal onRequestClose={closeModal} isOpen={isModalOpen} />}
            </div>
        </>
    )
}

export default Category