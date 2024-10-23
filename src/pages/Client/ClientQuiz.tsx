import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import axios from 'axios';
import CheckLogin from '@/helpers/functions/checkLogin';
import { config } from '@/helpers/functions/token';
import { baseUrl } from '@/helpers/api/baseUrl';
import { ClientQuizType, optionDtos } from '@/helpers/types/clientQuizType';
import { ClientCategory } from '@/helpers/types/getClientCategory';
import { useMutation } from 'react-query';
import { Spin } from 'antd';

const TOTAL_TIME = 60 * 60;
const STORAGE_KEY = 'savedRemainingTime';

interface AxiosError extends Error {
  message: string;
}

interface SubmitQuizAnswersParams {
  categoryId: string;
  duration: number;
  countAnswers: number;
  answers: {
    questionId: string;
    optionIds: number[];
    answer: string;
  }[];
}

interface SubmitQuizResponse {
  message: string;
  statusCode: number;
}

const QuestionPage: React.FC = () => {
  CheckLogin();
  const navigate = useNavigate();
  const param = useParams<{ id: string }>();

  const [remainingTime, setRemainingTime] = useState(TOTAL_TIME);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

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


  // =======
  // function navigateBack() {
  //   const confirmExit = window.confirm(
  //     "Siz testdan chiqsangiz natijalaringiz saqlab qolinmaydi. Chiqish uchun 'Exit'ni bosing, davom etish uchun 'Cancel'."
  //   );
  //   if (confirmExit) {
  //     navigate(-1);
  //   }
  // }

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
  // =======



  const submitQuizAnswers = async ({
    categoryId,
    duration,
    countAnswers,
    answers,
  }: SubmitQuizAnswersParams): Promise<SubmitQuizResponse> => {
    const res = await axios.post<SubmitQuizResponse>(
      `${baseUrl}quiz/pass/${categoryId}`,
      answers,
      {
        params: {
          duration,
          countAnswers,
        },
        ...config,
      }
    );
    return res.data;
  };

  const useSubmitQuiz = () => {
    return useMutation<SubmitQuizResponse, AxiosError, SubmitQuizAnswersParams>(submitQuizAnswers, {
      onSuccess: () => {
        toast.success('Quiz submitted successfully!');
        navigate('/client/quiz/result');
      },
      onError: (error: AxiosError) => {
        toast.error(`Submission failed: ${error.message}`);
      },
    });
  };

  // function navigateBack() {
  //   navigate(-1);
  // }

  const getQuestion = async (): Promise<ClientQuizType[]> => {
    const res = await axios.get<ClientQuizType[]>(`${baseUrl}quiz/start/${param.id}`, config);
    return res.data?.body.questionDtoList;
  };

  const { data: quizData, isLoading: quizLoading, error: quizError } = useQuery({
    queryKey: ['getQuestion', param.id],
    queryFn: getQuestion,
    // onError: (error: AxiosError) => {
    //   // toast.error(error.message);
    // },
  });

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

  console.log(categories, 'categories');


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

  // Use the mutation hook
  const { mutate: submitQuiz } = useSubmitQuiz();

  const handleAnswerChange = (answer: string) => {
    if (quizData && quizData[currentIndex].type === "ANY_CORRECT") {
      setSelectedAnswers((prevAnswers) =>
        prevAnswers.includes(answer)
          ? prevAnswers.filter((a) => a !== answer)
          : [...prevAnswers, answer]
      );
    } else if (quizData && quizData[currentIndex].type === "ONE_CHOICE") {
      setSelectedAnswers([answer]);
    }
  };

  const handleNextOrSubmit = useCallback(() => {
    const categoryId = param.id as string;
    const duration = TOTAL_TIME - remainingTime;
    const countAnswers = quizData ? quizData.length : 0;

    let answers: { questionId: string; optionIds: number[]; answer: string }[] = [];

    if (quizData && Array.isArray(quizData)) {
<<<<<<< HEAD
      answers = quizData.map((question) => {
        let optionIds: number[] = [];
        let answer = '';

        if (question.type === "ANY_CORRECT") {
          optionIds = question.optionDtos
            .filter((opt) => selectedAnswers.includes(opt.answer))
            .map((opt) => opt.id);
        } else if (question.type === "ONE_CHOICE") {
          const selectedOption = question.optionDtos.find(
            (opt) => selectedAnswers[0] === opt.answer
          );
          optionIds = selectedOption ? [selectedOption.id] : [];
        } else if (question.type === "SUM") {
          answer = inputRef.current?.value || '';
        }

        return {
          questionId: question.id,
          optionIds: optionIds,
          answer: answer,
        };
      });
    }

    if (quizData && currentIndex < quizData.length - 1) {
      // Go to next question
=======
      answers = quizData.map((question, index) => ({
        questionId: String(question.id),
        optionIds: selectedAnswers.includes(String(question.name)) ? [index] : [],
        answer: selectedAnswers[index] || '',
      }));
    }

    if (quizData && currentIndex < quizData.length - 1) {
      submitQuiz({ categoryId, duration, countAnswers, answers });
>>>>>>> 04cf091892fc4e181a7fcb60ce56e62dd3629313
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else {
      submitQuiz({ categoryId, duration, countAnswers, answers });
    }
  }, [quizData, currentIndex, remainingTime, selectedAnswers, submitQuiz, param.id]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  }, [currentIndex]);


  const unReload = () => {
    document.addEventListener('keydown', function (e) {
      if ((e.ctrlKey && (
        e.keyCode === 84 ||
        e.keyCode === 87
      ))) {
        alert('Саҳифани тарк этмоқчимисиз, узгаришлар сақланмаслиги мумкин');
        e.preventDefault();
      }
    });

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      const confirmationMessage = 'Сиз киритган ўзгаришлар сақланмаслиги мумкин';
      e.preventDefault();
      e.returnValue = confirmationMessage;
      return confirmationMessage;
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  };

  useEffect(() => {
    unReload();
  }, []);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = parseInt(e.target.value, 10);
    setCurrentIndex(selectedIndex);
  };

  return (
    <div className="px-9 space-y-12">
      {quizLoading || categoryLoading ? (
        // <p className='text-center'>Loading...</p>
        <Spin className='absolute top-[44%] left-[46%]' size='large' />
      ) : quizError || categoryError ? (
        // <p>Error: {quizError?.message || categoryError?.message}</p>
        <div>
          <div className='text-center text-2xl'>Bu kategoriyadagi testlarni <span className='text-red-500'>{categories?.[currentIndex]?.retakeDate} </span>
             kundan so'ng keyin ishlashingiz mumkin.</div>
        </div>
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
              <div className='flex items-center space-x-2 mb-4'>
                <div className='text-lg text-gray-400'>{currentIndex + 1}.</div>
                <div className="text-lg text-gray-500">{quizData[currentIndex].name}</div>
              </div>
            )}

            {quizData && quizData[currentIndex].type === "SUM" && (
              <div>
                <label
                  htmlFor={`input[${currentIndex}]`}
                  className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Xisoblab tog'ri javobni yozing (Chekli Xato: <span className={`text-red-600`}>±{quizData[currentIndex].finiteError}</span>)
                </label>
                <input ref={inputRef}
                  placeholder='Enter your answer'
                  className='w-full mt-3 rounded-xl text-medium' type="number" />
              </div>
            )}

            {quizData && quizData[currentIndex].type === "ONE_CHOICE" && (
              <div className="space-y-2">
                <label className='' htmlFor="answer">
                  Faqat bitta tug'ri javobni belgilang
                </label>
                {quizData[currentIndex].optionDtos.map((answer: optionDtos, index: number) => (
                  <div key={index} className="flex items-center w-full border-[1px] rounded-xl mb-2 px-2 p-1 border-black space-x-2">
                    <input
                      type="radio"
                      id={`answer-${index}`}
                      name="answer"
                      value={answer.answer}
                      checked={selectedAnswers.includes(answer.answer)}
                      onChange={() => handleAnswerChange(answer.answer)}
                    />
                    <label htmlFor={`answer-${index}`} className="text-lg text-gray-500">{answer.answer}</label>
                  </div>
                ))}
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
                  className={currentIndex === 0 ? 'bg-blue-700 px-4 py-2 text-white rounded-md' : `px-4 py-2 bg-blue-500 text-white rounded-md`}
                >
                  Orqaga
                </button>
                <button
                  onClick={handleNextOrSubmit}
                  className="px-4 py-2 hover:bg-blue-700 bg-blue-500 text-white rounded-md"
                >
                  {quizData && currentIndex === quizData.length - 1 ? 'Submit' : 'Keyingisi'}
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
