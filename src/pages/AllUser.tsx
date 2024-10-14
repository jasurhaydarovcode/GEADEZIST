import Layout from '@/components/Dashboard/Layout';
import { getMe } from '@/helpers/api/baseUrl';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { FcSearch } from 'react-icons/fc';

interface User {
  id: number;
  name: string;
  email: string;
}

function AllUser() {
  const [users, setUsers] = useState<User[] | null>(null);

  useEffect(() => {
    axios
      .get<User[]>(getMe)
      .then((response) => {
        console.log("lorem30kgasdkfljSDFjkbdKAJDBlorem30kgasdkfljSDSFjkbdKAJDBloreS  m30kgasdkfljSDFjkbdKAJDBlorem30kgasdkfljSDFjkbdKAJDBlorem30kgasdkfljSDFjkbdKAJDBlorem30kgasdkfljSDFjkbdKAJDB" + response.data); // Ma'lumotni konsolda tekshirish
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  return (
    <>
      <Layout>
        <Helmet>
          <title>Foydalanuvchilar</title>
        </Helmet>
        <div className="container grid justify-center py-3">
          <h1 className="text-2xl font-bold py-5">Foydalanuvchilar</h1>
          <div className="flex gap-5 max-xl:w-[800px] max-2xl:w-[1000px]">
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
              <option selected disabled>
                Viloyatni tanlang
              </option>
              <option value="">example 1</option>
              <option value="">example 2</option>
            </select>
            <select className="max-w-[350px] w-[375px] text-gray-40 rounded-md h-[50px] placeholder:font-extralight placeholder-gray-400 border-gray-400  placeholder:text-[14px] ">
              <option selected disabled>
                Tumanni tanlang
              </option>
              <option value="">example 1</option>
              <option value="">example 2</option>
            </select>
          </div>
          <div>
            <h1>User Profiles</h1>
            {users ? (
              users.map((user) => (
                <div key={user.id}>
                  <p>Name: {user.name}</p>
                  <p>Email: {user.email}</p>
                </div>
              ))
            ) : (
              <p>Loading...</p> // Ma'lumot yuklanayotganida ko'rsatiladi
            )}
          </div>
        </div>
      </Layout>
    </>
  );
}

export default AllUser;