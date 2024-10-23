import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { message, List, Spin } from 'antd';
import { config } from '@/helpers/functions/token';
import Layout from '@/components/Dashboard/Layout';

// Savol va Natija interfeyslar
interface Question {
  text: string;
  answer: string;
  isCorrect: boolean;
}

interface Result {
  categoryName: string;
  correctAnswers: number;
  totalQuestions: number;
  duration: string;
  finishedAt: string;
  status: string;
  questions: Question[];
}

const Archive = () => {
  const { resultId } = useParams<{ resultId: string }>(); // URL'dan resultId olish
  const [results, setResults] = useState<Result | null>(null); // Resultni state ga saqlaymiz
  const [loading, setLoading] = useState(true);

  // resultId orqali API'ga murojaat qilamiz
  useEffect(() => {
    const fetchResult = async () => {
      try {
        console.log("Fetched resultId:", resultId); // resultId ni konsolga chiqarish

        // Natijani API orqali olish
        const response = await axios.get(`/result/resultByArchive/${resultId}`, config);
        console.log("API Response:", response.data); // API javobini konsolga chiqarish

        if (response.data && response.data.body) {
          setResults(response.data.body); // Natijalarni state ga o'rnatish
        } else {
          message.warning('Natijalar topilmadi.');
        }
      } catch (error) {
        console.error('Xatolik:', error);
        message.error('Ma\'lumotlarni olishda xatolik yuz berdi');
      } finally {
        setLoading(false);
      }
    };

    fetchResult(); // API'ga murojaat qilamiz
  }, [resultId]);

  // Natija topilmagan holat
  if (!results && !loading) {
    return <div>Natijalar topilmadi.</div>;
  }

  // To'g'ri va noto'g'ri javoblar rangini ajratish
  const getColorClass = (isCorrect: boolean) => {
    return isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white';
  };

  return (
    <Layout>
      <div className="px-[100px] py-[60px] w-full">
        <div className="flex justify-between items-center py-5">
          <div>
            <p className="font-sans text-gray-700 font-medium text-[24px]">
              <Link to="/dashboard">Boshqaruv paneli / </Link>
              <span className="text-blue-700">Arxiv</span>
            </p>
          </div>
          <Link to="/user" className="text-gray-800">
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m7-7l-7 7 7 7" />
            </svg>
          </Link>
        </div>

        <h2 className="font-bold text-[24px] py-[20px]">
          Foydalanuvchi Arxivi: {results?.categoryName}
        </h2>

        {loading ? (
          <div className="flex justify-center items-center">
            <Spin size="large" />
          </div>
        ) : (
          <div>
            <h3>Testning savollari:</h3>
            <List
              dataSource={results?.questions}
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
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Archive;
