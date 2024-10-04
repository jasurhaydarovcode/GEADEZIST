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
        <div>
          <input type="text" />
        </div>
      </div>
    </>
  )
}

export default AllUser
