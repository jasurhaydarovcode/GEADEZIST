import React, { useEffect, useCallback, useState } from 'react';
import Layout from '@/components/Dashboard/Layout';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { getResultsClient, getMeUser } from '@/helpers/api/baseUrl';
import { useQuery } from 'react-query';
import { config } from '@/helpers/functions/token';
import axios from 'axios';
import { ClientRezType } from '@/helpers/types/ClientRezultType';
import { defaultImageDash } from '@/helpers/imports/images';
import { GetMeResponse } from '@/helpers/types/GetMetype';

async function getConfig() {
  const token = await localStorage.getItem('token');
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
      console.error('Failed to fetch user data:', error.message);
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
      return res.data.body.body;
    },
    onSuccess: (data) => {
      setCards(data);
    },
    onError: (error) => {
      console.error(error.message);
    },
  });

  useEffect(() => {
    fetchCards.refetch();
  }, []);

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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
              {cards && cards.length > 0 && cards.map((card: ClientRezType, index) => (
                <div key={index} className="card bg-white glass w-96 mx-auto">
                  <figure>
                    <img
                      src={card.categoryImage || defaultImageDash}
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

                      <h2 className="card-title text-red-500 pt-5 text-lg font-bold text-center flex justify-center">
                        Qo'shimcha yo'nalishlardan ishlanganlar
                      </h2>
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
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default ClientDashboard;
