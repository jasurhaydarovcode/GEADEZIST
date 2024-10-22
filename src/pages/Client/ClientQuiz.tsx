import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import axios from 'axios';
import CheckLogin from '@/helpers/functions/checkLogin';
import { config } from '@/helpers/functions/token';
import { baseUrl } from '@/helpers/api/baseUrl';
import { ClientQuizType } from '@/helpers/types/clientQuizType';
import { ClientCategory } from '@/helpers/types/getClientCategory';

const TOTAL_TIME = 60 * 60;
const STORAGE_KEY = 'savedRemainingTime';

interface AxiosError extends Error {
  message: string;
}

const QuestionPage: React.FC = () => {
  CheckLogin();
  const navigate = useNavigate();
  const param = useParams<{ id: string }>();

  // State Hooks
  const [remainingTime, setRemainingTime] = useState(TOTAL_TIME);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const inputRef = useRef<HTMLInputElement>(null);

  // Time-Related Logic
  const formatTime = useCallback((timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }, []);

  const progressPercentage = useMemo(() => (remainingTime / TOTAL_TIME) * 100, [remainingTime]);

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

  // Quiz Data Fetching
  const getQuestion = async (): Promise<ClientQuizType[]> => {
    const res = await axios.get<ClientQuizType[]>(`${baseUrl}quiz/start/${param.id}`, config);
    return res.data?.body.questionDtoList;
  };

  const { data: quizData, isLoading: quizLoading, error: quizError } = useQuery({
    queryKey: ['getQuestion', param.id],
    queryFn: getQuestion,
    onError: (error: AxiosError) => {
      toast.error(error.message);
    },
  });

  // Categories Data Fetching
  const getCategories = async (): Promise<ClientCategory[]> => {
    const res = await axios.get<ClientCategory[]>(`${baseUrl}category`, config);
    return res.data.body?.body || [];
  };

  const { data: categories, isLoading: categoryLoading, error: categoryError } = useQuery({
    queryKey: ['getClientCategory'],
    queryFn: getCategories,
    onError: (error: AxiosError) => {
      toast.error(error.message);
    },
  });

  // Role-based Navigation
  const checkRoleClient = useCallback(() => {
    const role = localStorage.getItem('role');
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/auth/Signin');
      return;
    }

    if (role === 'ROLE_SUPER_ADMIN') {
      navigate('/dashboard');
    } else if (role === 'ROLE_TESTER') {
      navigate('/category');
    }
  }, [navigate]);

  useEffect(() => {
    checkRoleClient();
  }, [checkRoleClient]);

  // Navigation Between Questions
  const handleNext = useCallback(() => {
    if (quizData && currentIndex < quizData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  }, [quizData, currentIndex]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  }, [currentIndex]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = parseInt(e.target.value, 10);
    setCurrentIndex(selectedIndex);
  };

  return (
    <div className="px-9 space-y-12">
      {quizLoading || categoryLoading ? (
        <p>Loading...</p>
      ) : quizError || categoryError ? (
        <p>Error: {quizError?.message || categoryError?.message}</p>
      ) : (
        <>
          <div className="mt-11 bg-white p-6 rounded-2xl">
            <div className="w-full bg-gray-200 h-3 rounded-2xl overflow-hidden">
              <div className="bg-blue-500 h-full" style={{ width: `${progressPercentage}%` }}></div>
            </div>
          </div>

          <div className="bg-white p-6 mx-auto shadow-lg rounded-2xl">
            <div className="text-center">
              {quizData && quizData[currentIndex].categoryName && (
                <h1 className="text-3xl text-red-500 font-semibold">{quizData[currentIndex].categoryName}</h1>
              )}
            </div>

            {quizData && quizData[currentIndex] && (
              <div className='flex items-center space-x-2 mb-7'>
                <div className='text-lg text-gray-400'>{currentIndex + 1}.</div>
                <div className="text-lg text-gray-500">{quizData[currentIndex].name}</div>
              </div>
            )}

            {quizData && quizData[currentIndex].type === "SUM" && (
              <div>
                <input ref={inputRef}
                  placeholder='Javobni Kiriting'
                  className='w-full rounded-xl text-medium' type="number" />
              </div>
            )}

            <div className="mt-4 justify-between flex items-center">
              <div className="mt-4 text-left text-gray-700 text-lg font-semibold">
                Қолган вақт: {formatTime(remainingTime)}
              </div>
              <div className="mt-4">
                <select
                  id="questionSelect"
                  value={currentIndex}
                  onChange={handleSelectChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  {quizData &&
                    quizData.map((_, index) => (
                      <option key={index} value={index}>
                        Savol {index + 1}
                      </option>
                    ))}
                </select>
              </div>

              <div className="mt-6 flex space-x-4 justify-between items-center">
                <button
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Orqaga
                </button>
                <button
                  onClick={handleNext}
                  disabled={quizData && currentIndex === quizData.length - 1}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Keyingisi
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default QuestionPage;
