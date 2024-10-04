import { FcSearch } from "react-icons/fc";
// import React from 'react'

import { Link } from "react-router-dom"

const AllUser = () => {
  return (
    <>
      <div className="p-7 px-8">
        <header className="flex items-center justify-between">
          <h3 className="font-bold text-[27px]">Foydalanuvchilar</h3>

          <div className="flex gap-2 text-[18px]">
            <Link to={'/dashboard'}><h4>Boshqaruv paneli </h4></Link>
            <h4> / </h4>
            <h4 className="text-blue-600"> Foydalanuvchilar</h4>
          </div>
        </header>
        <div className="flex justify-end pt-7 gap-5">
          <div className="flex">
            <label htmlFor="inp1"><FcSearch className="absolute mt-4 ml-3 text-[20px]" /></label>
            <input type="text" id="inp1" className="w-[350px] pl-10  bg-[] border-gray-300 rounded-md h-[50px] " placeholder="Foydalanuvchini qidirish" />
          </div>
          <div className="flex">
            <input type="text" className="w-[350px] bg-[] border-gray-300 rounded-md h-[50px] " placeholder="Foydalanuvchini qidirish" />
          </div>
          <div className="flex">
            <input type="text" className="w-[350px] bg-[] border-gray-300 rounded-md h-[50px] " placeholder="Foydalanuvchini qidirish" />
          </div>
        </div>
      </div>
    </>
  )
}

export default AllUser
