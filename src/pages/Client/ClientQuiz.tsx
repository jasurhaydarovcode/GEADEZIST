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
  // console.log(param.id); 

  const getQuestion = async () => {
    const res = await axios.get(`${baseUrl}quiz/start/${param.id}`, config);
    return (res.data as { body: { body: ClientQuizType[] } }).body?.body;
  };

  const { data: quizData, isLoading: quizLoading, error: quizError } = useQuery({
    queryKey: ['getQuestion'],
    queryFn: getQuestion,
    onError: (error: AxiosError) => {
      toast.error(error.message);
    },
  })

  if (quizError) {
    return toast.error(quizError.message);
  }

  if (quizLoading) {
    return <div>QuizLoading</div>
  }

  const { isLoading, error, data } = useQuery({
    queryKey: ['getClientCategory'],
    queryFn: async () => {
      const res = await axios.get(`${baseUrl}category`, config);
      return (res.data as { body?: { body: ClientCategory[] } }).body?.body;
    },
    onError: (error: AxiosError) => {
      toast.error(error.message);
    },
  });

  if (error) return toast.error(error.message);

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
  }, []);

  useEffect(() => {
    checkRoleClient();
  }, [checkRoleClient]);

  useEffect(() => {
    // Retrieve saved time from localStorage if available
    const savedTime = sessionStorage.getItem(STORAGE_KEY);
    if (savedTime) {
      setRemainingTime(parseInt(savedTime, 10));
    }
  }, []);

  useEffect(() => {
    // Timer logic: decrement remaining time every second
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime > 0) {
          const newTime = prevTime - 1;
          sessionStorage.setItem(STORAGE_KEY, newTime.toString()); // Save the new remaining time
          return newTime;
        }
        return 0; // Timer reaches zero
      });
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  // Calculate progress based on time
  const progressPercentage = (remainingTime / TOTAL_TIME) * 100;

  // Format time as MM:SS
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

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
          {isLoading ? (
            <div>
              Loading...
            </div>
          ) : (
            <>
              {data && data.map((item, index) => (
                <div key={index}>
                  <h2 className="text-2xl font-semibold text-red-500">
                    {item.name}
                  </h2>
                </div>
              ))}
            </>
          )}
        </div>
        <div className="mt-4 justify-between flex items-center">

          {/* Progress Bar */}

          {/* Timer */}
          <div className="mt-4 text-left text-gray-700 text-lg font-semibold">
            Қолган вақт: {formatTime(remainingTime)}
          </div>

          {/* Navigation Buttons */}
          <div className="mt-6 flex space-x-4  justify-between items-center">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
              Orqaga
            </button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
              Keyingisi
            </button>
          </div>
        </div>
      </div>
    </div >
  );
};

export default QuestionPage;
