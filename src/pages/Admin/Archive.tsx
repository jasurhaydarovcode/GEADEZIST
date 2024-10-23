import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { message, List, Spin } from 'antd';
import { config } from '@/helpers/functions/token';
import Layout from '@/components/Dashboard/Layout';

const Archive = () => {
  const { userId } = useParams<{ userId: string }>(); // URLdan userIdni olish
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState<string>(''); // Foydalanuvchi ismini saqlash uchun

  useEffect(() => {
    const fetchUserArchive = async () => {
      try {
        // Foydalanuvchi ma'lumotlarini olish
        const userResponse = await axios.get(`/user/${userId}`, config);
        setUserName(`${userResponse.item.fullName} ${userResponse.data.lastName}`);

        // Arxiv natijalarini olish
        const archiveResponse = await axios.get(`/result/resultByArchive/${userId}`, config);
        setQuestions(archiveResponse.data.body.questions); // Savollarni state ga o‘rnatish
      } catch (error) {
        console.error('Xatolik:', error);
        message.error('Ma\'lumotlarni olishda xatolik yuz berdi');
      } finally {
        setLoading(false);
      }
    };

    fetchUserArchive();
  }, [userId]);

  // To'g'ri javob asosida ranglarni belgilash funksiyasi
  const getColorClass = (isCorrect: boolean) => {
    return isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white';
  };



  return (
    <div>
      <div className="px-[100px] py-[60px] w-full ">
        <span className="float-right py-5">
          <p className="font-sans text-gray-700 font-medium text-[24px]">
            <Link to="/dashboard">Boshqaruv paneli / </Link>
            <span className="text-blue-700">Arxiv</span>
          </p>
        </span>

        <h2 className="font-bold text-[24px] py-[20px]">
          Foydalanuvchi Arxiv:
        </h2>
       
        <Link to="/user">
          <svg
            className="w-[40px] h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 5H1m0 0 4 4M1 5l4-4"
            />
          </svg>
        </Link>

        {loading ? (
          <Spin />
        ) : (
          <List
            dataSource={questions}
            renderItem={(question) => (
              <List.Item>
                <div className={`p-4 rounded ${getColorClass(question.isCorrect)}`}>
                  <strong>Savol:</strong> {question.text}
                  <br />
                  <strong>Javob:</strong> {question.answer}
                </div>
              </List.Item>
            )}
          />
        )}
      </div>
    </div>
  );
};

export default Archive;
