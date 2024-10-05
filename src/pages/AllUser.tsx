import { SlArrowDown } from 'react-icons/sl';
import { FcSearch } from 'react-icons/fc';
// import React from 'react'

import { Link } from 'react-router-dom';
// import Sidebar from "../components/Sidebar";
// import Navbar from "../components/Navbar";

const AllUser = (): JSX.Element => {
  return (
    <>
      <div>

        {/* <Navbar />
        <Sidebar /> */}

        <div className="flex justify-end pt-10 pr-6">
          <div>
            <Link to={'/dashboard'}>
              <button className='relative -left-10'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi w-8 h-8 bi-arrow-left" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                </svg>
              </button>
            </Link>
          </div>
          <div className="p-7 px-8">
            <div className="w-max">
              {/* nav */}
              <header className="flex items-center justify-between">
                <h3 className="font-bold text-[27px]">Foydalanuvchilar</h3>
                <div className="flex gap-2 text-[18px]">
                  <Link to={'/dashboard'}>
                    <h4>Boshqaruv paneli </h4>
                  </Link>
                  <h4> / </h4>
                  <h4 className="text-blue-600"> Foydalanuvchilar</h4>
                </div>
              </header>
              {/* nav */}

              {/* sort */}
              <div className="flex justify-end pt-5 gap-5">
                <div className="flex">
                  <label htmlFor="inp1">
                    <FcSearch className="absolute mt-4 ml-3 text-[20px]" />
                  </label>
                  <input
                    type="text"
                    id="inp1"
                    className="w-[390px] pl-10  bg-[] border-gray-300 rounded-md h-[50px] "
                    placeholder="Foydalanuvchini qidirish"
                  />
                </div>
                <div className="flex">
                  <input
                    type="text"
                    className="w-[390px] bg-[] rounded-md h-[50px] placeholder:font-extralight placeholder-gray-400 border-gray-400  placeholder:text-[14px] "
                    placeholder="Foydalanuvchini qidirish"
                  />
                  <SlArrowDown className="absolute ml-[360px] mt-4" />
                </div>
                <div className="flex">
                  {/* <input type="text" className="w-[350px] bg-[] rounded-md h-[50px] placeholder:font-extralight placeholder-gray-400 border-gray-400  placeholder:text-[14px] " placeholder="Tumanni tanlang" /> */}
                  <select className="w-[350px] text-gray-400 bg-[] rounded-md h-[50px] placeholder:font-extralight placeholder-gray-400 border-gray-400  placeholder:text-[14px] ">
                    <option value="">hello</option>
                    <option value="">byey</option>
                    <option value="">mthf</option>
                  </select>
                  {/* <SlArrowDown className="absolute ml-[320px] mt-4" /> */}
                </div>
              </div>
              {/* sort */}
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllUser;
