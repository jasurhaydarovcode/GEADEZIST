import Navbar from "@/components/Dashboard/Navbar"
import { FcSearch } from "react-icons/fc"
import { useNavigate } from "react-router-dom";

function AllUser() {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <div className="p-5 px-10" onClick={() => navigate(-1)}>
        <i className="bi bi-arrow-left text-3xl cursor-pointer"></i>
      </div>
      <div className="container mx-auto py-5">
        <h1 className="text-2xl font-bold py-5">
          Foydalanuvchilar
        </h1>
        <div className="flex gap-5">
          <div className="flex pb-5">
            <label htmlFor="inp1">
              <FcSearch className="absolute mt-4 ml-3 text-[20px]" />
            </label>
            <input
              type="text"
              id="inp1"
              className="pl-10 w-[375px] border-gray-300 rounded-md h-[50px] "
              placeholder="Foydalanuvchini qidirish"
            />
          </div>
          <select className="max-w-[350px] w-[375px] text-gray-40 rounded-md h-[50px] placeholder:font-extralight placeholder-gray-400 border-gray-400  placeholder:text-[14px] ">
            <option selected disabled>Viloyatni tanlang</option>
            <option value="">example 1</option>
            <option value="">example 2</option>
          </select>
          <select className="max-w-[350px] w-[375px] text-gray-40 rounded-md h-[50px] placeholder:font-extralight placeholder-gray-400 border-gray-400  placeholder:text-[14px] ">
            <option selected disabled>Tumanni tanlang</option>
            <option value="">example 1</option>
            <option value="">example 2</option>
          </select>
        </div>
        <div className="table w-full">
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Product name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Color
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Apple MacBook Pro 17"
                  </th>
                  <td className="px-6 py-4">
                    Silver
                  </td>
                  <td className="px-6 py-4">
                    Laptop
                  </td>
                  <td className="px-6 py-4">
                    $2999
                  </td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Microsoft Surface Pro
                  </th>
                  <td className="px-6 py-4">
                    White
                  </td>
                  <td className="px-6 py-4">
                    Laptop PC
                  </td>
                  <td className="px-6 py-4">
                    $1999
                  </td>
                </tr>
                <tr className="bg-white dark:bg-gray-800">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Magic Mouse 2
                  </th>
                  <td className="px-6 py-4">
                    Black
                  </td>
                  <td className="px-6 py-4">
                    Accessories
                  </td>
                  <td className="px-6 py-4">
                    $99
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </div>

    </>

  )
}

export default AllUser
