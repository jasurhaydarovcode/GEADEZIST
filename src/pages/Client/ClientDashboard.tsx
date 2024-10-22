import React, { useEffect, useCallback } from 'react';
import Layout from '@/components/Dashboard/Layout';
import { CardProps } from '../../helpers/types/CardProp';
// import PreviewOverlay from '@/components/PreviewOverlay';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
// import CheckLogin from '@/helpers/functions/checkLogin';

// Updated Card Component
const Card: React.FC<CardProps> = ({
  image,
  title,
  answers,
  time,
  score,
  date,
  sections,
  buttonText,
  status,
}) => {

  return (
    <div className="card glass w-full max-w-[440px] mx-auto">
      <figure>
        <img
          src={image}
          alt={title}
          className="w-full h-64 object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-center text-red-500">{title}</h2>
        <p className="text-gray-600">
          <strong>Tog'ri Javoblar:</strong> {answers}
        </p>
        <p className="text-gray-600">
          <strong>Vaqt Davomiyligi:</strong> {time} (daq.)
        </p>
        <p className="text-gray-600">
          <strong>Tuplangan Ball:</strong> {score}
        </p>
        <p className="text-gray-600">
          <strong>Test Topshirilgan vaqt:</strong> {date}
        </p>
        <h4 className="text-red-500 text-center text-lg font-semibold mt-2">
          Qushimcha Yo'nashlardan Ishlanganlar
        </h4>
        <div className="text-gray-600">
          {sections.map((section, index) => (
            <p key={index}>
              {section.name}:{" "}
              <span className="text-green-500">{section.completed}</span>/
              {section.total}
            </p>
          ))}
        </div>
        <div className="card-actions justify-end mt-4">
          <button
            className={`btn w-full ${status === 'confirmed'
              ? 'btn-success'
              : 'btn-warning'
              }`}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

const ClientDashboard: React.FC = () => {
  const cards: CardProps[] = [
    {
      image: 'https://via.placeholder.com/150',
      title: 'Marksheyderlik',
      answers: '0/3',
      time: '6',
      score: '1.6',
      date: '10.09.2024',
      sections: [
        { name: 'Umumiy Savollar', completed: 5, total: 3 },
        { name: 'Umumiy Geodeziya', completed: 1, total: 3 },
        { name: 'Tepografiya', completed: 1, total: 3 },
        { name: 'Qurulishda injenerlik geodeziyasi', completed: 1, total: 3 },
      ],
      buttonText: 'Tasdiqlandi',
      status: 'confirmed',
    },
    {
      image: 'https://via.placeholder.com/150',
      title: 'test uchun',
      answers: '1/1',
      time: '1',
      score: '0',
      date: '09.09.2024',
      sections: [{ name: 'Umumiy Savollar', completed: 5, total: 0 }],
      buttonText: 'Kutilmoqda',
      status: 'pending',
    },
    {
      image: 'https://via.placeholder.com/150',
      title: 'Tepografiya',
      answers: '5/20',
      time: '2',
      score: '2.3',
      date: '09.09.2024',
      sections: [{ name: 'Umumiy Savollar', completed: 5, total: 3 }],
      buttonText: 'Kutilmoqda',
      status: 'pending',
    },
  ];

  const navigate = useNavigate();
  const checkRoleClient = useCallback(() => {
    const role = localStorage.getItem('role');
    if (role === 'ROLE_SUPER_ADMIN' || role === 'ROLE_TESTER') {
      navigate('/dashboard');
    }
  }, [navigate]);

  useEffect(() => {
    checkRoleClient();
  }, [checkRoleClient]);

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
                Foydalan Foydalaniyev
              </h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
              {cards.map((card, index) => (
                <Card key={index} {...card} />
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default ClientDashboard;


// User test data lari uchun!
/* 
import React, { useEffect, useState, useCallback } from 'react';
import Layout from '../../components/clientDashboard/laytout';
import { CardProps } from '../../helpers/types/CardProp';
import PreviewOverlay from '@/components/PreviewOverlay';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { baseUrl } from '@/helpers/api/baseUrl';

const Card: React.FC<CardProps> = ({
  image,
  title,
  answers,
  time,
  score,
  date,
  sections,
  buttonText,
  status,
}) => {
  return (
    <div className="container bg-white rounded-md max-w-[450px]">
      <div className="border rounded-lg shadow-lg p-4">
        <div className="relative group">
          <img
            src={image}
            alt="Preview"
            className="w-full h-64 object-cover rounded-md"
          />
          <PreviewOverlay />
        </div>
        <h3 className="text-center text-2xl font-bold text-red-500 mt-3">
          {title}
        </h3>
        <div className="text-gray-600 mt-2">
          <p>Tog'ri Javoblar: {answers}</p>
          <p>Vaqt Davomiyligi: {time} (дақ.)</p>
          <p>Tuplangan Ball: {score}</p>
          <p>Test Topshirilgan vaqt: {date}</p>
        </div>
        <h4 className="text-red-500 text-center text-lg font-semibold mt-2">
          Qushimcha Yo'nashlardan Ishlanganlar
        </h4>
        <div className="text-gray-600">
          {sections.map((section, index) => (
            <p key={index}>
              {section.name}:{' '}
              <span className="text-green-500">{section.completed}</span>/
              {section.total}
            </p>
          ))}
        </div>
        <button
          className={`w-full mt-3 py-2 rounded-lg ${status === 'confirmed'
            ? 'bg-green-500 text-white'
            : 'bg-yellow-500 text-white'
            }`}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

const ClientDashboard: React.FC = () => {
  const [cards, setCards] = useState<CardProps[]>([]);
  const navigate = useNavigate();

  const checkRoleClient = useCallback(() => {
    const role = localStorage.getItem('role');
    if (role === 'ROLE_SUPER_ADMIN' || role === 'ROLE_TESTER') {
      navigate('/dashboard');
    }
  }, [navigate]);

  useEffect(() => {
    checkRoleClient();
  }, [checkRoleClient]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch(`${baseUrl}/statistic/user-dashboard?page=0&size=10`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setCards(data.body);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchResults();
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
                Foydalan Foydalaniyev
              </h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
              {cards.map((card, index) => (
                <Card key={index} {...card} />
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default ClientDashboard;

*/
