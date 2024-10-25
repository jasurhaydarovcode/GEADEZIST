import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { message, Spin, List } from 'antd';
import Layout from '@/components/Dashboard/Layout';
import { config } from '@/helpers/functions/token';
import { baseUrl } from '@/helpers/api/baseUrl';

const Archive = () => {
  const { resultId } = useParams<{ resultId: string }>();
  console.log("resultId:", resultId); // resultId ni tekshirish

  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!resultId) {
      message.error('Natija ID topilmadi');
      setLoading(false);
      return; // resultId yo'q bo'lsa, funksiyani to'xtating
    }

    const fetchResult = async () => {
      try {
        const response = await axios.get(baseUrl+`result/resultByArchive/${resultId}`, config);
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
    <div>
      <div className="px-[80px] py-[50px] w-full bg-gray-50 min-h-screen">
        <h2 className="font-extrabold text-[30px] text-gray-800 border-b-2 border-gray-300 pb-4 mb-8">Foydalanuvchi Natijalari</h2>

        {loading ? (
          <div className="flex justify-center items-center h-full">
            <Spin size="large" />
          </div>
        ) : result && result.length ? (
          <List
            dataSource={result}
            renderItem={(item) => (
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
    </div>
  );
};

export default Archive;
