import React, { useEffect, useCallback, useState } from 'react';
import Layout from '@/components/Dashboard/Layout';
import { CardProps } from '../../helpers/types/CardProp';
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
    <div className="card glass bg-white w-full max-w-[440px] mx-auto">
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
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseUrl}/statistic/user-dashboard/`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json() as CardProps[];
        setCards(data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();
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
