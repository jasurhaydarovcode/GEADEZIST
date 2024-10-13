import { Scatter } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { useEffect, useState } from 'react';
import Layout from '@/components/Dashboard/Layout';
import { PiUsersThreeFill } from 'react-icons/pi';
import { FaArrowsAlt } from 'react-icons/fa';
import { FaCircleQuestion } from 'react-icons/fa6';
import { MdOutlineCategory } from 'react-icons/md';
import checkLogin from '@/helpers/functions/checkLogin';
import { useQuery } from 'react-query';
import { getClientAll, getStaticAll } from '@/helpers/api/baseUrl';
import { config } from '@/helpers/functions/token';
import { toast } from 'react-toastify';
import axios from 'axios';
import { GetClientAllResponse } from '@/helpers/types/GetClientType';
import { GetStaticsAllResponse } from '@/helpers/types/GetStaticsAllResponse';
import { useNavigate } from 'react-router-dom';
import Spinner from '@/components/spinner/Spinner';
import { Helmet } from 'react-helmet';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
);

const Dashboard = () => {
  checkLogin();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const dashboardStatic = useQuery({
    queryKey: ['dashboardStatic', config],
    queryFn: async () => {
      const res = await axios.get(getStaticAll, config);
      const data = res.data as { body: any }; // Type assertion added
      return data.body;
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
  const staticData: GetStaticsAllResponse =
    dashboardStatic.data as GetStaticsAllResponse;
  console.log(staticData);
  const categories = ['Топография', 'Маркшейдерлик', 'Умумий Геодезия'];
  const regions = ['Toshkent', 'Samarqand', "Farg'ona"];

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };
  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRegion(e.target.value);
  };

  const cardData = [
    {
      id: 1,
      icon: <MdOutlineCategory />,
      count: dashboardStatic.isLoading ? (
        <div role="status">
          <Spinner />
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        staticData?.categoryCount
      ),
      label: 'Umumiy Kategoriya',
    },
    {
      id: 2,
      icon: <FaCircleQuestion />,
      count: dashboardStatic.isLoading ? (
        <div role="status">
          <Spinner />
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        staticData?.questionCount
      ),
      label: 'Umumiy Savol',
    },
    {
      id: 3,
      icon: <FaArrowsAlt />,
      count: dashboardStatic.isLoading ? (
        <div role="status">
          <Spinner />
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        staticData?.resultCount
      ),
      label: 'Umumiy Natija',
    },
    {
      id: 4,
      icon: <PiUsersThreeFill />,
      count: dashboardStatic.isLoading ? (
        <div role="status">
          <Spinner />
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        staticData?.userCount
      ),
      label: 'Jami Foydalanuvchilar',
    },
  ];
  // Data for the scatter chart
  const data = {
    datasets: [
      {
        label: 'Savdolar soni',
        data: [
          { x: 1, y: 120 },
          { x: 2, y: 150 },
          { x: 3, y: 80 },
          { x: 4, y: 70 },
          { x: 5, y: 200 },
          { x: 6, y: 160 },
          { x: 7, y: 100 },
        ],
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderWidth: 2,
        pointRadius: 5,
        pointBackgroundColor: 'rgba(54, 162, 235, 1)',
      },
    ],
  };
  const getClient = useQuery({
    queryKey: ['getClient', config],
    queryFn: async () => {
      const res = await axios.get<GetClientAllResponse[]>(getClientAll, config);
      const data = res.data as { body?: { body: GetClientAllResponse[] } }; // 'body?.body' ni olib tashlang
      return data;
    },
  });
  useEffect(() => {
    getClient.refetch();
    // dashboardStatic.refetch()
  }, []);
  const clientData: GetClientAllResponse[] =
    getClient.data as GetClientAllResponse[];
  // Options for the scatter chart
  const options: ChartOptions<'scatter'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        title: {
          display: true,
          text: 'Hafta kunlari',
        },
        ticks: {
          stepSize: 1,
          callback: (tickValue: string | number) => {
            const days = [
              'Dushanba',
              'Seshanba',
              'Chorshanba',
              'Payshanba',
              'Juma',
              'Shanba',
              'Yakshanba',
            ];
            return days[Number(tickValue)];
          },
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 20,
        },
        title: {
          display: true,
          text: 'Savdo soni',
        },
      },
    },
  };
  const navigate = useNavigate();
  function checkRoleClient() {
    const role = localStorage.getItem('role');
    if (role == 'ROLE_CLIENT') {
      navigate('/client/dashboard');
    }
  }
  useEffect(() => {
    checkRoleClient();
  }, [checkRoleClient]);

  return (
    <div>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>

      <Layout>
        <div className="container mx-auto px-4">
          {/* Cards */}
          <div className="grid mb-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {cardData.map((item) => (
              <div
                key={item.id}
                className="bg-white p-6 shadow-md flex flex-col items-center text-center"
              >
                <div className="bg-gray-100 text-3xl p-4 rounded-full mb-4">
                  {item.icon}
                </div>
                <h2 className="text-3xl font-bold mb-2">{item.count}</h2>
                <p className="text-gray-600">{item.label}</p>
              </div>
            ))}
          </div>

          {/* Chart Section */}
          <div className="bg-white shadow rounded-lg flex flex-col p-4 mb-6">
            <div className="flex justify-between items-center mt-8 mb-4 px-6">
              <h2 className="text-blue-500 text-xl font-bold">
                Haftalik ma'lumot
              </h2>
              <button className="bg-gray-100 px-4 py-2 text-gray-600 rounded-sm">
                Hafta
              </button>
            </div>
            <div className="w-full h-64 md:h-96 lg:h-[500px]">
              <Scatter data={data} options={options} />
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row justify-between mb-6">
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="border p-2 rounded mb-4 md:mb-0 md:mr-4"
            >
              <option value="">Kategoriyani tanlang</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <select
              value={selectedRegion}
              onChange={handleRegionChange}
              className="border p-2 rounded"
            >
              <option value="">Viloyatni tanlang</option>
              {regions.map((region, index) => (
                <option key={index} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>

          {/* User Table Section */}
          <div className="bg-white shadow rounded-lg p-4 overflow-x-auto">
            <table className="min-w-full bg-white border">
              <thead>
                <tr>
                  <th className="py-2 border">T/P</th>
                  <th className="py-2 border">Ism</th>
                  <th className="py-2 border">Familiya</th>
                  <th className="py-2 border">Email</th>
                </tr>
              </thead>
              <tbody>
                {getClient.isLoading ? (
                  <div
                    role="status"
                    className="flex justify-center items-center"
                  >
                    <svg
                      aria-hidden="true"
                      className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  clientData &&
                  clientData.length > 0 &&
                  clientData.map(
                    (user: GetClientAllResponse, index: number) => (
                      <tr key={index}>
                        <td className="py-2 border text-center">{index + 1}</td>
                        <td className="py-2 border text-center">
                          {user.firstName}
                        </td>
                        <td className="py-2 border text-center">
                          {user.lastName}
                        </td>
                        <td className="py-2 border text-center">
                          {user.email}
                        </td>
                      </tr>
                    ),
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Dashboard;
