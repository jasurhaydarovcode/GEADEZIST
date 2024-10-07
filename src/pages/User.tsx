import Layout from "@/components/Dashboard/Layout";
import { useState } from "react";
import { FcSearch } from "react-icons/fc";
import { SlArrowDown } from "react-icons/sl";
import { Link } from "react-router-dom";

function User() {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <Layout>
      <div>
        <div className="flex justify-end pt-10 pr-6">
          <div className="px-8">
            <div className="w-full">
              {/* nav */}
              <header className="flex items-center justify-between">
                <h3 className="font-bold text-[27px]">Foydalanuvchilar natejasi</h3>
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
                      className="pl-10  bg-[] border-gray-300 rounded-md h-[50px] "
                      placeholder="Foydalanuvchini qidirish"
                    />
                  </div>
                  <div className="flex">
                    <input type="text" className="w-[350px] rounded-md h-[50px] placeholder:font-extralight placeholder-gray-400 border-gray-400  placeholder:text-[14px] " placeholder="Tumanni tanlang" />
                    <SlArrowDown className="absolute ml-[320px] mt-4" />
                  </div>
                  <select className="w-[350px] text-gray-400 bg-[] rounded-md h-[50px] placeholder:font-extralight placeholder-gray-400 border-gray-400  placeholder:text-[14px] ">
                    <option value="">hello</option>
                    <option value="">byey</option>
                    <option value="">mthf</option>
                  </select>
                </div>
                {/* sort */}
                <div></div>
              </div>
            </div>
          </div>
        </div>
      

      {/* Table */}

      <div className="p-5">
      <table className="mx-3 w-[96%] bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left px-4 py-7">T/P</th>
            <th className="text-left px-4 py-2">Тўлиқ исм</th>
            <th className="text-left px-4 py-2">Категория</th>
            <th className="text-left px-4 py-2">Телефон</th>
            <th className="text-left px-4 py-2">Қайта тест топш...</th>
            <th className="text-left px-4 py-2">Статус</th>
            <th className="text-left px-4 py-2">Ҳаракат</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="px-4 py-7">1</td>
            <td className="px-4 py-2">Asilbek Normuhammadov</td>
            <td className="px-4 py-2">Топография</td>
            <td className="px-4 py-2">998908740204</td>
            <td className="px-4 py-2">1 кун қолди</td>
            <td className="px-4 py-2">
              <span className="px-2 py-1 bg-green-200 text-green-800 rounded">
                Тасдиқланди
              </span>
            </td>
            <td className="px-4 py-2 relative">
              <button
                className="text-gray-500 hover:text-gray-800"
                onClick={toggleDropdown}
              >
                &#x2026; {/* Uch nuqta belgisi */}
              </button>

              {isDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-56 bg-white border border-gray-300 rounded-lg shadow-lg z-10"
                >
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={closeDropdown}
                  >
                    Архивни кўриш
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={closeDropdown}
                  >
                    Натижани кўриш
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={closeDropdown}
                  >
                    Тасдиқлаш
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={closeDropdown}
                  >
                    Бекор қилиш
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={closeDropdown}
                  >
                    Қайта топширишга рухсат бериш
                  </button>
                </div>
              )}

              {isDropdownOpen && (
                <div
                  className="fixed inset-0"
                  onClick={closeDropdown}
                ></div>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>


{/* Table end */}
          


    </Layout>
  );
}

export default User;
