import React, { useEffect, useCallback, useState } from 'react';
import Layout from '@/components/Dashboard/Layout';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { getResultsClient, getMeUser } from '@/helpers/api/baseUrl';
import { useQuery } from 'react-query';
import { config } from '@/helpers/functions/token';
import axios from 'axios';
import { ClientRezType } from '@/helpers/types/ClientRezultType';
import { defaultImageDash } from '@/helpers/imports/images';
import { GetMeResponse } from '@/helpers/types/GetMetype';

async function getConfig() {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

const ClientDashboard: React.FC = () => {
  const [cards, setCards] = useState<ClientRezType[]>([]);
  const [getUser, setGetUser] = useState<GetMeResponse | null>(null);
  const navigate = useNavigate();

  const getMe = useQuery({
    queryKey: ['getMe'],
    queryFn: async () => {
      const config = await getConfig();
      const res = await axios.get<GetMeResponse>(getMeUser, config);
      return res.data?.body;
    },
    onSuccess: (data) => {
      setGetUser(data);
    },
    onError: (error) => {
      console.error('Failed to fetch user data:', error);
    },
  });

  const checkRoleClient = useCallback(() => {
    const role = localStorage.getItem('role');
    if (role === 'ROLE_SUPER_ADMIN' || role === 'ROLE_TESTER') {
      navigate('/dashboard');
    }
  }, [navigate]);

  useEffect(() => {
    checkRoleClient();
  }, [checkRoleClient]);

  const fetchCards = useQuery({
    queryKey: ['getResults', config],
    queryFn: async () => {
      const res = await axios.get(getResultsClient, config) as { data: { body: { body: ClientRezType[] } } };
      // console.log(res.data.body.body, "UserResultlar");
      return res.data.body.body;
    },
    onSuccess: (data) => {
      setCards(data);
    },
    onError: (error) => {
      console.error("Error:", error);
    },
  });

  useEffect(() => {
    fetchCards.refetch();
  }, [fetchCards]);

  return (
    <div>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>

      <Layout className="p-8">
        <div>
          <h2 className="text-red-600 text-center text-4xl py-10 font-bold">
            Sizning Natijalaringiz
          </h2>
          <div>
            <div className="px-16">
              <h4 className="font-semibold text-xl text-gray-600">
                {getUser?.fullName || 'Foydalanuvchi nomi yuklanmoqda...'}
              </h4>
            </div>
            <div className="p-4">
              {cards && cards.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 mx-auto justify-center">
                  {cards.map((card: ClientRezType, index) => (
                    <div key={index} className="card bg-white glass mx-auto w-full sm:w-80 md:w-96">
                      <figure>
                        <img
                          src={card.categoryName ? `${card.categoryName}.png` : defaultImageDash}
                          alt="Category Image!"
                          className="w-full h-64 object-cover"
                        />
                      </figure>
                      <div className="card-body flex flex-col leading-6 justify-between">
                        <div>
                          <h2 className="card-title text-red-500 pb-5 font-bold text-center flex justify-center">
                            {card.categoryName || <del className='text-black'>No Title Data</del>}
                          </h2>
                          <p className="text-gray-600">
                            <strong>Tog'ri Javoblar:</strong>
                            <span className="float-right">{card.countAnswers}</span>
                          </p>
                          <p className="text-gray-600">
                            <strong>Vaqt Davomiyligi:</strong>
                            <span className="float-right">{card.durationTime} (daq.)</span>
                          </p>
                          <p className="text-gray-600">
                            <strong>Tuplangan Ball:</strong>
                            <span className="float-right">{card.testScore}</span>
                          </p>
                          <p className="text-gray-600">
                            <strong>Test Topshirilgan vaqt:</strong>
                            <span className="float-right">{card.createdAt}</span>
                          </p>
                        </div>
                        <div className="card-actions mt-4">
                          <button
                            className={`btn text-lg w-full ${card.status === 'APPROVED' ? 'btn-success' : card.status === 'WAITING' ? 'btn-warning' : 'btn-primary'}`}
                          >
                            {card.status === 'APPROVED' ? 'Tasdiqlandi' : card.status === 'WAITING' ? 'Kutilmoqda' : card.status}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex justify-center items-center w-full h-full p-10 bg-gray-100 rounded-md shadow-md">
                  <p className="text-center text-red-600 font-semibold text-2xl">
                    Siz xozircha test ishlamagansiz 😊,
                    <span className='bg-red-500 text-white rounded-lg mx-2 py-1 px-3'>
                      <Link to={"/client/test/start"}>
                        test
                      </Link>
                    </span>
                    ishlash uchun test bo'limiga o'ting
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default ClientDashboard;
