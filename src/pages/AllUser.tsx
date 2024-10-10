import { MdOutlineRemoveRedEye } from "react-icons/md";
import { SlArrowDown } from 'react-icons/sl';
import { FcSearch } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/Dashboard/Layout';
import { useEffect, useState } from 'react';
<<<<<<< HEAD
import checkLogin from "@/helpers/functions/checkLogin";
import axios from "axios";
import { baseUrl } from "@/helpers/api/baseUrl";
import { AxiosResponse } from "axios";
=======
>>>>>>> 37c8c21535cba2dcf9341342efe486737d8f7746

const AllUser: React.FC = (): JSX.Element => {
  // interface users {
  //   name: string;
  //   lastname: string;
  //   gmail: string;
  // }

  // const [data, setData] = useState<users[] | null>(null)

  // useEffect(() => {
  //   axios.get(baseUrl + `/user`)
  //     .then((res) => {
  //       setData(res.data?)
  //     })
  // })







  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
<<<<<<< HEAD
  // checkLogin()
=======
  

  const navigate = useNavigate()
  function checkRoleClient() {
    const role = localStorage.getItem('role')
    if (role == 'ROLE_CLIENT') {
      navigate('/client/dashboard')
    } 
  }
  useEffect(() => {
    checkRoleClient()
  }, [checkRoleClient])
>>>>>>> 37c8c21535cba2dcf9341342efe486737d8f7746
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <>
      <Layout>
        <div>
          <div className="flex justify-center pt-7">
            <div className="px-8">
              <div className="w-max">
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


                <div className="flex justify-end pt-5 gap-5">
                  <div className="flex">
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
                  <div className="flex">
                    <input type="text" className="min-w-[260px] w-[360px] rounded-md h-[50px] placeholder:font-extralight placeholder-gray-400 border-gray-400  placeholder:text-[14px] " placeholder="Tumanni tanlang" />
                    <SlArrowDown className="absolute ml-[320px] mt-4" />
                  </div>
                  <select className="max-w-[350px] w-[375px] text-gray-40 rounded-md h-[50px] placeholder:font-extralight placeholder-gray-400 border-gray-400  placeholder:text-[14px] ">
                    <option value="">hello</option>
                    <option value="">example 1</option>
                    <option value="">example 2</option>
                  </select>
                </div>
                {/* sort */}





                <div className="py-5">
                  <table className="mx-3 ml-[0px] w-[100%] bg-white border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="text-left px-4 py-7">T/P</th>
                        <th className="text-left px-4 py-2">Ism</th>
                        <th className="text-left px-4 py-2">familya</th>
                        <th className="text-left px-4 py-2">elektron pochta</th>
                        <th className="text-left px-4 py-2">xarakat</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="px-4 py-7">1</td>
                        <td className="px-4 py-2">Asilbek</td>
                        <td className="px-4 py-2">Normuhammadov</td>
                        <td className="px-4 py-2">nimadir@gmail.com</td>
                        <td className="px-4 py-2">
                          <span className="px-2 py-1 rounded cursor-pointer">
                            <MdOutlineRemoveRedEye />
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div>
          </div>
        </div>
      </Layout>
    </>
  );

};


export default AllUser;
