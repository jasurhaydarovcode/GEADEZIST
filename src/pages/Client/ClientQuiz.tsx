import React, { useEffect, useState, useCallback, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Select } from 'antd';
import { config } from '@/helpers/functions/token';
import { useQuery } from 'react-query';
import { baseUrl } from '@/helpers/api/baseUrl';
import { ClientQuizType } from '@/helpers/types/clientQuizType';
import { toast } from 'react-toastify';
import axios from 'axios';

const TOTAL_TIME = 60 * 60; // 60 minutes (in seconds)
const STORAGE_KEY = 'savedRemainingTime';

interface AxiosError extends Error {
  message: string;
}

const QuestionPage: React.FC = () => {
  const [remainingTime, setRemainingTime] = useState(TOTAL_TIME); // In seconds


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

  const navigate = useNavigate();

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


  // useStates




  // useQuery to fetch data from server

  

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
          <h2 className="text-2xl font-semibold text-red-500">
            Умумий саволлар
          </h2>
        </div>
        <div className="mt-4">


          {/* Progress Bar */}

          {/* Timer */}
          <div className="mt-4 text-left text-gray-700 text-lg font-semibold">
            Қолган вақт: {formatTime(remainingTime)}
          </div>

          {/* Navigation Buttons */}
          <div className="mt-6 flex justify-between items-center">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
              Кейингиси
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sample answers data (you can change it to be dynamic)
const answers = [
  'Ҳа биламан. Топография ва қурилиш маҳоратили фойдалана оламан.',
  'Ҳа биламан. Ўқув жараёнида яхши фойдаланганман.',
  'Дастурни ишлата олмайман.',
  'Дастурни ишлай оламан лекин ўқув ёки иш жараёнида аниқ бир иш битирмаганман.',
];

export default QuestionPage;
