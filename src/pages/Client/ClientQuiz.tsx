import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Select } from 'antd';

const TOTAL_TIME = 60 * 60; // 60 minutes (in seconds)
const STORAGE_KEY = "savedRemainingTime";

const QuestionPage: React.FC = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [remainingTime, setRemainingTime] = useState(TOTAL_TIME); // In seconds

  const { Option } = Select;

  const handleChange = (value: string) => {
    console.log(`Selected: ${value}`);
  };

  useEffect(() => {
    // Retrieve saved time from localStorage if available
    const savedTime = localStorage.getItem(STORAGE_KEY);
    if (savedTime) {
      setRemainingTime(parseInt(savedTime, 10));
    }
  }, []);

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Goes to the previous page in the history stack
  };

  useEffect(() => {
    // Timer logic: decrement remaining time every second
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime > 0) {
          const newTime = prevTime - 1;
          localStorage.setItem(STORAGE_KEY, newTime.toString()); // Save the new remaining time
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
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const toggleAnswer = (index: number) => {
    if (selectedAnswers.includes(index)) {
      setSelectedAnswers(selectedAnswers.filter((answer) => answer !== index));
    } else {
      setSelectedAnswers([...selectedAnswers, index]);
    }
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
          <h2 className="text-2xl font-semibold text-red-500">Умумий саволлар</h2>
        </div>
        <div className="mt-4">
          <p className="text-lg font-medium">
            1. AutoCAD дастурида геодезик ўлчаш ишлари билан ишлашни биласизми? Қандай даражада?
          </p>
          <p className="text-red-600 mt-2">Бир неча тўғри жавобларни белгиланг</p>

          <div className="mt-4 space-y-3">
            {answers.map((answer, index) => (
              <label
                key={index}
                className={`block p-4 border rounded-lg cursor-pointer ${selectedAnswers.includes(index)
                  ? "bg-blue-100 border-blue-500"
                  : "border-gray-300"
                  }`}
                onClick={() => toggleAnswer(index)}
              >
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={selectedAnswers.includes(index)}
                  readOnly
                />
                {answer}
              </label>
            ))}
          </div>

          {/* Progress Bar */}


          {/* Timer */}
          <div className="mt-4 text-left text-gray-700 text-lg font-semibold">
            Қолган вақт: {formatTime(remainingTime)}
          </div>

          {/* Navigation Buttons */}
          <div className="mt-6 flex justify-between items-center">
            <button onClick={handleBack} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md">
              Орқага
            </button>
            <Select defaultValue="Savollar" style={{ width: 150 }} onChange={handleChange}>
              {number.map((item: number) =>
                <Option classname="p-3" key={item}>{item}/{number.length}</Option>)
              }
            </Select>
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
  "Ҳа биламан. Топография ва қурилиш маҳоратили фойдалана оламан.",
  "Ҳа биламан. Ўқув жараёнида яхши фойдаланганман.",
  "Дастурни ишлата олмайман.",
  "Дастурни ишлай оламан лекин ўқув ёки иш жараёнида аниқ бир иш битирмаганман."
];

const number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];

export default QuestionPage;
