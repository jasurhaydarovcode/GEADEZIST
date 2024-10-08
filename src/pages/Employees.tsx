// import Layout from "@/components/Dashboard/Layout"
// import { PlusCircleOutlined } from "@ant-design/icons"
// import { Button } from "antd"
// import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
// import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
// import { Space, Switch } from 'antd';
// import { Pagination } from 'antd';

// import { useState } from 'react';
// import { Modal } from 'antd';
// import { useGlobalRequest } from "@/helpers/functions/globalFunc";
// import { baseUrl } from "@/helpers/api/baseUrl";
// import { config } from "@/helpers/functions/token";
// import { QueryClient, useQuery } from "react-query";
// import axios from "axios";
// const queryClient = new QueryClient()

// function Employees() {
//   const [open, setOpen] = useState(false);
//   const [confirmLoading, setConfirmLoading] = useState(false);

//   // const getADmin = useGlobalRequest(
//   //   `${baseUrl}user/get/admin/list?page=0&size=10`,
//   //   "GET",
//   //   '',
//   //   config

//   // )

//   // console.log(getADmin);


//   const getADmin = useQuery({
//     queryKey: ['getADmin'],
//     queryFn: async () => {
//       const res = await axios.get(`${baseUrl}user/get/admin/list?page=0&size=10`, config);
//       // return res.data?.body?
//       return (res.data as { body: any }).body.body;
//     }
//   })

//   console.log(getADmin.data);
  

  

//   const showModal = () => {
//     setOpen(true);
//   };

//   const handleOk = () => {
//     setConfirmLoading(true);
//     setTimeout(() => {
//       setOpen(false);
//       setConfirmLoading(false);
//     }, 2000);
//   };

//   const handleCancel = () => {
//     setOpen(false);
//   };
//   return (
//     <Layout>
//       <div className="p-5">
//         <div className="flex justify-between">
//           <h1 className="text-3xl font-bold font-sans">Hodimlar</h1>
//           <p className="font-sans text-gray-700">
//             Boshqaruv paneli  /  <span className="text-blue-700 ">Hodimlar</span>
//           </p>
//         </div>
//         <div>
//           <Button onClick={showModal} color="default" variant="solid" className=" text-xl px-5 py-6 my-5">
//             <PlusCircleOutlined className="text-xl"/>Qo'shish 
//           </Button>
//           <Modal
//             title="Hodim qo'shish"
//             open={open}
//             onOk={handleOk}
//             confirmLoading={confirmLoading}
//             onCancel={handleCancel}
//             maskClosable={false}
//           >
//             {/* <h2 className="text-xl font-bold mb-4">Rasm Yuklash</h2> */}
//             <div className="mb-4">
//               <label className="block mb-2">Kategoriya turini tanlang</label>
//               <select className="border w-full p-2 rounded">
//                 <option value="">Asosiy boʻlmagan kategoriya</option>
//                 <option value="main">Asosiy kategoriya</option>
//                 <option value="secondary">Asosiy boʻlmagan kategoriya</option>
//               </select>
//             </div>

//             <div className="mb-4">
//               <label className="block mb-2">Tavsif</label>
//               <input
//                 type="text"
//                 placeholder="Tavsifni kiriting"
//                 className="border w-full p-2 rounded"
//               />
//             </div>

//             <div className="mb-4">
//               <label className="block mb-2">Umumiy savollar soni</label>
//               <input
//                 type="number"
//                 placeholder="Umumiy savollar sonini kiriting"
//                 className="border w-full p-2 rounded"
//               />
//             </div>

//             <div className="mb-4">
//               <label className="block mb-2">Qo'shimcha savollar soni</label>
//               <input
//                 type="number"
//                 placeholder="Qo'shimcha savollar sonini kiriting"
//                 className="border w-full p-2 rounded"
//               />
//             </div>

//             <div className="mb-4">
//               <label className="block mb-2">Davomiylik vaqti (m)</label>
//               <input
//                 type="number"
//                 placeholder="Davomiylik vaqti (minutlarda)"
//                 className="border w-full p-2 rounded"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block mb-2">Davomiylik vaqti (m)</label>
//               <input
//                 type="number"
//                 placeholder="Davomiylik vaqti (minutlarda)"
//                 className="border w-full p-2 rounded"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block mb-2">Davomiylik vaqti (m)</label>
//               <input
//                 type="number"
//                 placeholder="Davomiylik vaqti (minutlarda)"
//                 className="border w-full p-2 rounded"
//               />
//             </div>
//           </Modal>
//         </div>
//         <div>
//           <Table hoverable>
//             <TableHead>
//               <TableHeadCell>T/P</TableHeadCell>
//               <TableHeadCell>Ism</TableHeadCell>
//               <TableHeadCell>Familya</TableHeadCell>
//               <TableHeadCell>Electron pochta</TableHeadCell>
//               <TableHeadCell>Lavozimi</TableHeadCell>
//               <TableHeadCell>Action</TableHeadCell>
//             </TableHead>
//             <TableBody className="divide-y">
//             {
//               Array.isArray(getADmin) && getADmin?.map((item: any, index:number) => (
//                 <TableRow className="bg-white text-gray-900 dark:border-gray-700 dark:bg-gray-800">
//                   <TableCell>{index + 1}</TableCell>
//                   <TableCell>{item.firstName}</TableCell>
//                   <TableCell>{item.lastName}</TableCell>
//                   <TableCell>{item.email}</TableCell>
//                   <TableCell>{item.role}</TableCell>
//                   <TableCell>
//                     <Space direction="vertical">
//                       <Switch
//                         checkedChildren={<CheckOutlined />}
//                         unCheckedChildren={<CloseOutlined />}
//                         defaultChecked
//                       />
//                     </Space>
//                   </TableCell>
//                 </TableRow>
//               ))
//             }
//             </TableBody>
//           </Table>
//           <Pagination className="mt-5" defaultCurrent={1} total={10} />
//         </div>
//       </div>
//     </Layout>
//   )
// }

// export default Employees

import Layout from "@/components/Dashboard/Layout";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Space, Switch, Pagination, Modal } from "antd";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import axios from 'axios';
import { baseUrl } from "@/helpers/api/baseUrl";
import { config } from "@/helpers/functions/token";

function Employees() {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const queryClient = useQueryClient();

  const { data: admins, isLoading, isError } = useQuery(['getADmin'], async () => {
    const res = await axios.get(`${baseUrl}user/get/admin/list?page=0&size=10`, config);
    return (res.data as { body: { body: string }}).body.body;
  });

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  if (isLoading) return <p>Yuklanmoqda...</p>;
  if (isError) return <p>Xatolik yuz berdi...</p>;

  // const handleSwitchChange = (checked: boolean, id: number) => {
  //   // Bu yerda hodimni enabled/disabled qilishni API orqali amalga oshirishingiz mumkin
  //   console.log(`Hodim ${id} holati:`, checked ? "Faol" : "Nofoal");

  //   // Shu yerda API orqali yangilashingiz mumkin bo'lgan so'rov:
  //   // axios.put(`${baseUrl}/user/active/${id}`, { enabled: checked }, config)
  //   //   .then(res => console.log('Holat yangilandi'))
  //   //   .catch(err => console.log('Xato:', err));
  // };

    // Hodim holatini yangilash uchun mutatsiya yaratish
    const updateEmployeeStatus = useMutation(
      async ({ id, enabled }: { id: string, enabled: boolean }) => {
        return axios.put(`${baseUrl}user/active/${id}`, { enabled }, config);
      },
      {
        // Mutatsiya muvaffaqiyatli bo'lganda, hodimlar ro'yxatini qayta so'rash
        onSuccess: () => {
          queryClient.invalidateQueries('getADmin'); // Adminlar ma'lumotini qayta yuklash
        },
      }
    );

      // Switch o'zgarganda ishlaydigan funksiya
  const handleSwitchChange = (checked: boolean, id: string) => {
    updateEmployeeStatus.mutate({ id, enabled: checked });
  };

  return (
    <Layout>
      <div className="p-5">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold font-sans">Hodimlar</h1>
          <p className="font-sans text-gray-700">
            Boshqaruv paneli / <span className="text-blue-700">Hodimlar</span>
          </p>
        </div>
        <div>
          <Button onClick={showModal} color="default" variant="solid" className="text-xl px-5 py-6 my-5">
            <PlusCircleOutlined className="text-xl" /> Qo'shish
          </Button>
          <Modal
            title="Hodim qo'shish"
            open={open}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            maskClosable={false}
          >
            {/* Modal mazmuni */}
          </Modal>
        </div>
        <div>
          <Table hoverable>
            <TableHead>
              <TableHeadCell>T/P</TableHeadCell>
              <TableHeadCell>Ism</TableHeadCell>
              <TableHeadCell>Familya</TableHeadCell>
              <TableHeadCell>Email</TableHeadCell>
              <TableHeadCell>Lavozimi</TableHeadCell>
              <TableHeadCell>Action</TableHeadCell>
            </TableHead>
            <TableBody className="divide-y">
              {Array.isArray(admins) && admins.map((item, index) => (
                <TableRow key={item.id} className="bg-white text-gray-900 dark:border-gray-700 dark:bg-gray-800">
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.firstName}</TableCell>
                  <TableCell>{item.lastName}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.role}</TableCell>
                  <TableCell>
                    <Space direction="vertical">
                      <Switch
                        checkedChildren={<CheckOutlined />}
                        unCheckedChildren={<CloseOutlined />}
                        defaultChecked={item.enabled}
                        onChange={(checked) => handleSwitchChange(checked, item.id)}
                      />
                    </Space>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Pagination className="mt-5" defaultCurrent={1} total={10} />
        </div>
      </div>
    </Layout>
  );
}

export default Employees;
