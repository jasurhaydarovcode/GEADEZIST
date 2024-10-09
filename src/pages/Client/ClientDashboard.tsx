// components/clientDashboard/ClientDashboard.tsx
import React from 'react';
import Layout from '../../components/clientDashboard/laytout';
import { CardProps } from '../../helpers/types/CardProp';
import PreviewOverlay from '@/components/PreviewOverlay';

const Card: React.FC<CardProps> = ({ image, title, answers, time, score, date, sections, buttonText, status }) => {
  return (
    <div className='container bg-white rounded-md max-w-[450px]'>
      <div className="border rounded-lg shadow-lg p-4">
        <div className="relative group">
          <img src={image} alt="Preview" className="w-full h-64 object-cover rounded-md" />
          <PreviewOverlay />
        </div>
        <h3 className="text-center text-2xl font-bold text-red-500 mt-3">{title}</h3>
        <div className="text-gray-600 mt-2">
          <p>Tog'ri Javoblar: {answers}</p>
          <p>Vaqt Davomiyligi: {time} (дақ.)</p>
          <p>Tuplangan Ball: {score}</p>
          <p>Test Topshirilgan vaqt: {date}</p>
        </div>
        <h4 className="text-red-500 text-center text-lg font-semibold mt-2">Qushimcha Yo'nashlardan Ishlanganlar</h4>
        <div className="text-gray-600">
          {sections.map((section, index) => (
            <p key={index}>
              {section.name}: <span className="text-green-500">{section.completed}</span>/{section.total}
            </p>
          ))}
        </div>
        <button
          className={`w-full mt-3 py-2 rounded-lg ${status === "confirmed"
            ? "bg-green-500 text-white"
            : "bg-yellow-500 text-white"
            }`}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

const ClientDashboard: React.FC = () => {
  const cards: CardProps[] = [
    {
      image: "https://via.placeholder.com/150",
      title: "Marksheyderlik",
      answers: "0/3",
      time: "6",
      score: "1.6",
      date: "10.09.2024",
      sections: [
        { name: "Umumiy Savollar", completed: 5, total: 3 },
        { name: "Umumiy Geodeziya", completed: 1, total: 3 },
        { name: "Tepografiya", completed: 1, total: 3 },
        { name: "Qurulishda injenerlik geodeziyasi", completed: 1, total: 3 },
      ],
      buttonText: "Tasdiqlandi",
      status: "confirmed",
    },
    {
      image: "https://via.placeholder.com/150",
      title: "test uchun",
      answers: "1/1",
      time: "1",
      score: "0",
      date: "09.09.2024",
      sections: [{ name: "Umumiy Savollar", completed: 5, total: 0 }],
      buttonText: "Kutilmoqda",
      status: "pending",
    },
    {
      image: "https://via.placeholder.com/150",
      title: "Tepografiya",
      answers: "5/20",
      time: "2",
      score: "2.3",
      date: "09.09.2024",
      sections: [{ name: "Umumiy Savollar", completed: 5, total: 3 }],
      buttonText: "Kutilmoqda",
      status: "pending",
    },
  ];

  return (
    <Layout>
      <div>
        <h2 className='text-red-600 text-center text-4xl py-10 font-bold'>Sizning Natijalaringiz</h2>
        <div>
          <div className='px-16'>
            <h4 className='font-semibold text-xl text-gray-600'>Foydalan Foydalaniyev</h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {cards.map((card, index) => (
              <Card key={index} {...card} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ClientDashboard;
