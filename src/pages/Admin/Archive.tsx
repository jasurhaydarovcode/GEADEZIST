import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { message, Spin, List } from 'antd';
import { config } from '@/helpers/functions/token';
import { baseUrl } from '@/helpers/api/baseUrl';

// Natija interfeysi
interface ResultItem {
  id: number;
  question: string;
  categoryName: string;
  answer: string[];
  correctAnswer: string | null;
  correct: boolean;
}

const Archive: React.FC = () => {
  const { resultId } = useParams<{ resultId: string }>();
  console.log("resultId:", resultId); // resultId ni tekshirish

  const [result, setResult] = useState<ResultItem[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!resultId) {
      message.error('Natija ID topilmadi');
      setLoading(false);
      return;
    }

    const fetchResult = async () => {
      try {
        const response = await axios.get(`${baseUrl}result/resultByArchive/${resultId}`, config);
        setResult(response.data.body);
        console.log(response);
      } catch (error) {
        message.error('Natijalarni olishda xatolik yuz berdi');
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [resultId]);

  return (
    <div className='px-[80px] py-[50px] w-full bg-gray-50 min-h-screen'>
      <div>
        <div className="float-right font-semibold font-sans text-[25px] mt-[10px]">
          <Link to={'/dashboard'}>
            <span>Boshqaruv paneli / </span>
          </Link>
          <span className="text-blue-600"> Arxiv</span>
        </div>
        <h2 className="font-extrabold text-[30px] text-gray-800 border-b-2 border-gray-300 pb-4 mb-8">Foydalanuvchilar natejasi</h2>
        <Link to={'/user'}>
          <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
          </svg>
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-full mt-[20px]">
          <Spin size="large" />
        </div>
      ) : result && result.length ? (
        <List
          dataSource={result}
          renderItem={(item: ResultItem) => (
            <List.Item key={item.id} className="mb-4">
              <div className={`p-6 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 w-[100%] 
                ${item.correct ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                <h3 className="font-semibold text-lg mb-2">{item.question}</h3>
                <p className="text-md mb-1">
                  <strong>Kategoriya:</strong> {item.categoryName}
                </p>
                <p className="text-md mb-1">
                  <strong>Foydalanuvchi javobi:</strong> {item.answer.join(', ')}
                </p>
                <p className="text-md">
                  <strong>To'g'ri javob:</strong> {item.correctAnswer ? item.correctAnswer : 'Noma'}
                </p>
              </div>
            </List.Item>
          )}
        />
      ) : (
        <p className="text-center text-gray-500 text-xl">Natijalar topilmadi.</p>
      )}
    </div>
  );
};

export default Archive;
