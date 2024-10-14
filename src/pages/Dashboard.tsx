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
import {  MdOutlineCategory } from 'react-icons/md';
import checkLogin from '@/helpers/functions/checkLogin';
import { useQuery } from 'react-query';
import { getClientAll, getStaticAll, } from '@/helpers/api/baseUrl';
import { config } from '@/helpers/functions/token';
import { toast } from 'react-toastify';
import axios from 'axios';
import { GetClientAllResponse } from '@/helpers/types/GetClientType';
import { GetStaticsAllResponse } from '@/helpers/types/GetStaticsAllResponse';
import { useNavigate } from 'react-router-dom';
import Spinner from '@/components/spinner/Spinner';
import { Helmet } from 'react-helmet';
import TableLoading from '@/components/spinner/TableLoading';
import { Pagination } from 'antd';
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
);

const Dashboard = () => {
  // states
  const categories = ['Топография', 'Маркшейдерлик', 'Умумий Геодезия'];
  const regions = ['Toshkent', 'Samarqand', "Farg'ona"];
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  checkLogin();
  // dashboard statiastic
  const dashboardStatic = useQuery({
    queryKey: ['dashboardStatic', config],
    queryFn: async () => {
      const res = await axios.get(`${getStaticAll}`, config);
      const data = res.data as { body: any }; // Type assertion added
      return data.body;
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  // dashboard static data
  const staticData: GetStaticsAllResponse =
    dashboardStatic.data as GetStaticsAllResponse;
  console.log(staticData);

  // dashboard category filter
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };
  // dashboard region filter
  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRegion(e.target.value);
  };

  // pagination
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // card data
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
      const res = await axios.get<GetClientAllResponse[]>(`${getClientAll}page=${currentPage-1}&size=${pageSize}`, config);
      const data = res.data.body.body as GetClientAllResponse[];
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
        {getClient.isLoading ? (
          <div className="flex justify-center items-center h-screen">
            <TableLoading />
          </div>
        ) : (
          (<div className="container mx-auto px-4">
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
              <Table hoverable className="border-collapse">
                <TableHead>
                  <TableRow>
                    <TableHeadCell>T/P</TableHeadCell>
                    <TableHeadCell>Ism</TableHeadCell>
                    <TableHeadCell>Familiya</TableHeadCell>
                    <TableHeadCell>Email</TableHeadCell>
                  </TableRow>
                </TableHead>
                <TableBody className="divide-y">
                  {clientData && clientData.length > 0 &&
                    clientData.map((item, index) => (
                      <TableRow
                        key={item.id}
                        className="bg-white text-gray-900 dark:border-gray-700 dark:bg-gray-800"
                      >
                        <TableCell>{(currentPage - 1) * pageSize + index + 1}</TableCell>
                        <TableCell>{item.firstName}</TableCell>
                        <TableCell>{item.lastName}</TableCell>
                        <TableCell>{item.email}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>

            <div className="flex justify-end mt-4 px-[20px]">
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={totalItems}
                onChange={handlePageChange}
                showSizeChanger={false}
              />
            </div>
          </div>

          )
        )}
      </Layout>
    </div>
  );
};

export default Dashboard;