import Layout from '@/components/Dashboard/Layout';
import { getResult } from '@/helpers/api/baseUrl';
import { config } from '@/helpers/functions/token';
import { UserNatijasi } from '@/helpers/types/UserNatijasi';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { FcSearch } from 'react-icons/fc';
import { SlArrowDown } from 'react-icons/sl';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { message } from 'antd';

function User() {
  const [searchQuery, setSearchQuery] = useState(''); 

  const { data: usersData, refetch} = useQuery({
    queryKey: ['User', config],
    queryFn: async () => {
      const res = await axios.get(getResult, config);
      const data = res.data as { body: { body: UserNatijasi[] } };
      console.log(data);
      return data.body?.body || [];
    },
    onError: (error) => {
      console.log(error);
      message.error('Xatolik yuz berdi');
    },
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  const GetResult: UserNatijasi[] = usersData ?? [];

  const filteredUsers = GetResult.filter((user) =>
    `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Helmet>
        <title>Foydalanuvchilar Natijasi</title>
      </Helmet>

      <Layout>
        <div>
          <div className="flex justify-center pt-7">
            <div className="px-8">
              <div className="w-max">
                <header className="flex items-center justify-between">
                  <h3 className="font-bold text-[27px]">
                    Foydalanuvchilar natijasi
                  </h3>
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
                      placeholder="Ism yoki familya bo'yicha qidirish"
                      value={searchQuery} // Qidiruv state
                      onChange={(e) => setSearchQuery(e.target.value)} // Qidiruvni yangilash
                    />
                  </div>
                  <div className="flex">
                    <input
                      type="text"
                      className="min-w-[260px] w-[360px] rounded-md h-[50px] placeholder:font-extralight placeholder-gray-400 border-gray-400  placeholder:text-[14px] "
                      placeholder="Tumanni tanlang"
                    />
                    <SlArrowDown className="absolute ml-[320px] mt-4" />
                  </div>
                  <select className="max-w-[350px] w-[375px] text-gray-40 rounded-md h-[50px] placeholder:font-extralight placeholder-gray-400 border-gray-400  placeholder:text-[14px] ">
                    <option value="">hello</option>
                    <option value="">example 1</option>
                    <option value="">example 2</option>
                  </select>
                </div>

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
                      {filteredUsers.map((item, index) => (
                        <tr key={index} className="border-b border-gray-300">
                          <td className="px-4 py-2">{index + 1}</td>
                          <td className="px-4 py-2">{item.lastName}</td>
                          <td className="px-4 py-2">{item.firstName}</td>
                          <td className="px-4 py-2">{item.email}</td>
                          <td className="px-4 py-2">:</td>
                        </tr>
                      ))}
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
    </div>
  );
}

export default User;
