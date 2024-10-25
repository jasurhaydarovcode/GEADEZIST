import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { message, Spin, List } from 'antd';
import Layout from '@/components/Dashboard/Layout';
import resultId from './User'

const yourToken = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE3Mjk4MzQ2MTYsImV4cCI6MTcyOTkyMTAxNn0.a8017upf5Wh3m2tknJHsuRO973taogy0HFyY52gGLpgh9DSmuaY1VARwMo5EfVB538mgDiMlbMHPRq9MaF5U2w';

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
        const response = await axios.get(`/result/resultByArchive/${resultId}`, {
          headers: {
            Authorization: `Bearer ${yourToken}`
          }
        });
        setResult(response.data.body);
      } catch (error) {
        message.error('Natijalarni olishda xatolik yuz berdi');
      } finally {
        setLoading(false);
      }
    };
    
    fetchResult();
  }, [resultId]);

  return (
    <Layout>
      <div className="px-[100px] py-[60px] w-full">
        <h2 className="font-bold text-[24px] py-[20px]">Foydalanuvchi Natijalari</h2>

        {loading ? (
          <Spin />
        ) : result && result.length ? (
          <List
            dataSource={result}
            renderItem={(item) => (
              <List.Item key={item.id}>
                <div className={`p-4 rounded ${item.correct ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                  <strong>Savol:</strong> {item.question}
                  <br />
                  <strong>Kategoriya:</strong> {item.categoryName}
                  <br />
                  <strong>Foydalanuvchi javobi:</strong> {item.answer.join(', ')}
                  <br />
                  <strong>To'g'ri javob:</strong> {item.correctAnswer ? item.correctAnswer : 'Noma'}
                </div>
              </List.Item>
            )}
          />
        ) : (
          <p>Natijalar topilmadi.</p>
        )}
      </div>
    </Layout>
  );
};

export default Archive;
