import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { config } from '@/helpers/functions/token';
import { useQuery } from 'react-query';
import { baseUrl } from '@/helpers/api/baseUrl';
import { ClientQuizType } from '@/helpers/types/clientQuizType';
import { toast } from 'react-toastify';
import CheckLogin from '@/helpers/functions/checkLogin';
import axios from 'axios';
import { ClientCategory } from '@/helpers/types/getClientCategory';

const TOTAL_TIME = 60 * 60; // 60 minutes (in seconds)
const STORAGE_KEY = 'savedRemainingTime';

interface AxiosError extends Error {
  message: string;
}


const QuestionPage: React.FC = () => {
  CheckLogin
  const [remainingTime, setRemainingTime] = useState(TOTAL_TIME); // In seconds
  const navigate = useNavigate();
  const param = useParams<{ id: string }>();

  // API to get quiz data
  const getQuestion = async (): Promise<ClientQuizType[]> => {
    const res = await axios.get(`${baseUrl}quiz/start/${param.id}`, config);
    return res.data?.body.questionDtoList;
  };

  const { data: quizData, isLoading: quizLoading, error: quizError } = useQuery({
    queryKey: ['getQuestion', param.id],
    queryFn: getQuestion,
    onError: (error: AxiosError) => {
      toast.error(error.message);
    },
  });

  // API to get categories
  const getCategories = async () => {
    const res = await axios.get(`${baseUrl}category`, config);
    return res.data.body?.body || [];
  };

  const { data: categories, isLoading: categoryLoading, error: categoryError } = useQuery({
    queryKey: ['getClientCategory'],
    queryFn: getCategories,
    onError: (error: AxiosError) => {
      toast.error(error.message);
    },
  });

  const checkRoleClient = useCallback(() => {
    const role = localStorage.getItem('role');
    const token = localStorage.getItem('token');
    if (role == 'ROLE_SUPER_ADMIN') {
      navigate('/dashboard');
    } else if (role == 'ROLE_TESTER') {
      navigate('/category');
    }
    if (token == null) {
      navigate('/auth/Signin');
    }
  }, [navigate]);

  useEffect(() => {
    checkRoleClient();
  }, [checkRoleClient]);

  // Timer logic
  useEffect(() => {
    const savedTime = sessionStorage.getItem(STORAGE_KEY);
    if (savedTime) {
      setRemainingTime(parseInt(savedTime, 10));
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime > 0) {
          const newTime = prevTime - 1;
          sessionStorage.setItem(STORAGE_KEY, newTime.toString());
          return newTime;
        }
        return 0;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const progressPercentage = (remainingTime / TOTAL_TIME) * 100;

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  if (quizLoading || categoryLoading) return <p>Loading...</p>;
  if (quizError || categoryError) return <p>Error: {quizError?.message || categoryError?.message}</p>;

  return (
    <div className="px-9 space-y-12">
      <div className="mt-11 bg-white p-6 rounded-2xl">
        <div className="w-full bg-gray-200 h-3 rounded-2xl overflow-hidden">
          <div
            className="bg-blue-500 h-full"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
      <div className="bg-white p-6 mx-auto shadow-lg rounded-2xl">
        <div className="text-center">
          {categories && categories.map((item: ClientCategory) => (
            <div key={item.id}>
              <h2 className="text-2xl font-semibold text-red-500">
                {item.name}
              </h2>
            </div>
          ))}
        </div>
        {quizData && quizData.map((item: ClientQuizType) => (
          <div key={item.id}>
            {/* <div>{item.id}</div> */}
            <div>{item.name}</div>
          </div>
        ))}
        <div className="mt-4 justify-between flex items-center">
          <div className="mt-4 text-left text-gray-700 text-lg font-semibold">
            Қолган вақт: {formatTime(remainingTime)}
          </div>
          <div className="mt-6 flex space-x-4  justify-between items-center">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md">Orqaga</button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md">Keyingisi</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionPage;


