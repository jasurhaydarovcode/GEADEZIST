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

const TOTAL_TIME = 60 * 60; // 60 minutes (in seconds)
const STORAGE_KEY = 'savedRemainingTime';

// Define AxiosError interface
interface AxiosError extends Error {
  message: string;
}

interface QuestionDto {
  id: number;
  name: string;
  categoryName: string;
  type: string;
  optionDtos: OptionDto[];
  finiteError: number;
  attachmentIds: number[];
}

interface OptionDto {
  id: number;
  answer: string;
  isCorrect: boolean;
  file: string | null;
}

interface QuizData {
  questionDtolist: QuestionDto[];
  success: boolean;
  message: string;
  status: string;
  body: {
    countAnswers: number;
    durations: number[];
  };
}

const QuestionPage: React.FC = () => {
  CheckLogin; // Checking login status
  const navigate = useNavigate();
  const param = useParams<{ id: string }>();

  // State management for remaining time (timer)
  const [remainingTime, setRemainingTime] = useState(TOTAL_TIME); // In seconds

  // Helper function to format time in "MM:SS" format
  const formatTime = useCallback((timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }, []);

  // Helper function to calculate progress percentage for the timer bar
  const progressPercentage = useMemo(() => (remainingTime / TOTAL_TIME) * 100, [remainingTime]);

  // Fetch quiz questions using React Query
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

  // Fetch categories using React Query
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

  // Function to handle role-based navigation
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

  // useEffect for role check
  useEffect(() => {
    checkRoleClient();
  }, [checkRoleClient]);

  // Timer initialization from session storage
  useEffect(() => {
    const savedTime = sessionStorage.getItem(STORAGE_KEY);
    if (savedTime) {
      setRemainingTime(parseInt(savedTime, 10));
    }
  }, []);

  // Timer countdown logic
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

  if (quizLoading || categoryLoading) return <p>Loading...</p>;
  if (quizError || categoryError) return <p>Error: {quizError?.message || categoryError?.message}</p>;

  // Joriy savolning indeksini boshqarish
  const [currentIndex, setCurrentIndex] = useState<number>(0);

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

  // Select o'zgarishini boshqarish
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = parseInt(e.target.value, 10);
    setCurrentIndex(selectedIndex);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="px-9 space-y-12">
      {/* Timer Bar */}
      <div className="mt-11 bg-white p-6 rounded-2xl">
        <div className="w-full bg-gray-200 h-3 rounded-2xl overflow-hidden">
          <div className="bg-blue-500 h-full" style={{ width: `${progressPercentage}%` }}></div>
        </div>
      </div>

      {/* Quiz and Categories */}
      <div className="bg-white p-6 mx-auto shadow-lg rounded-2xl">
        <div className="text-center">
          <h1 className="text-3xl text-red-500 font-semibold">Savollar</h1>
        </div>

        {/* Savolni birma-bir chiqarish */}
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

        {/* Savolni birma-bir chiqarish */}

        {/* Select orqali savollarni tanlash */}


        {/* Timer Display and Navigation Buttons */}
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
    </div>
  );
};

export default QuestionPage;
