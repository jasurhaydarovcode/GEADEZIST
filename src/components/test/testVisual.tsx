import Layout from "@/components/Dashboard/Layout";
import "react-toastify/dist/ReactToastify.css";
import CheckLogin from "@/helpers/functions/checkLogin";
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { IoArrowBackOutline } from "react-icons/io5";
import { useQuery } from "react-query";
import axios from "axios";
import { baseUrl } from "@/helpers/api/baseUrl";
import { config } from "@/helpers/functions/token";
import { AnswerRes, QuizType } from "@/helpers/types/AnswerType";
import { useState } from "react";
import { BodyRespon } from "@/helpers/types/testvisual";
import { optionDtos } from "@/helpers/types/clientQuizType";

function Category() {
    CheckLogin
    const [options, setOptions] = useState<optionDtos[]>([]);
    const [quizData, setQuizData] = useState<QuizType[]>([]);
    const location = useLocation();
    const { catygoria, savol, id } = location.state || {};

    const getQuizId = useQuery({
        queryKey: ['getQuiz', id],
        queryFn: async () => {
            const res= await axios.get<BodyRespon>(`${baseUrl}question/${id}`, config);
            console.log(res);
            
            return res.data.body;
        },
        onSuccess: (data) => {
            console.log(data);
            setOptions(data.optionDtos);
            setQuizData(data);
        },
    });

    const navigate = useNavigate();
    function getOut() {
        navigate('/test');
    }

    return (
        <div>
            <Helmet>
                <title>Testlar</title>
            </Helmet>

            <Layout>
                <>
                    <div className="p-6 font-sans text-center">
                        <h1 className="text-2xl font-bold text-left">Битта савол</h1>
                        <div className="text-3xl mt-5">
                            <IoArrowBackOutline className="cursor-pointer" onClick={getOut} />
                        </div>
                        <p className="text-2xl mt-2">
                            Admin savolni mijozlarga qanday kurinishi bilib olish uchun namuna
                        </p>
                        <p className="text-lg mt-7">
                            <span className="text-3xl font-bold">{catygoria || 'kategoriya nomalum'}</span>
                        </p>
                        <h2 className="text-xl font-semibold mt-7">{savol || 'savol topilmadi'}</h2>
                        <div className="mt-6">
                            <div className="mt-6">
                                <p className="text-red-600 font-bold mt-4 text-left">
                                    {quizData.type === "SUM" ? "Bu savolda faqat bitta javob bo'ladi" : "Faqat bitta tug'ri javobni belgilang"}
                                </p>
                                {options.map((option: AnswerRes, index: number) => (
                                    <div key={index}>
                                        <label className="flex items-center mb-4 border border-gray-300 rounded-lg p-2 bg-gray-100">
                                            {quizData.type === "ONE_CHOICE" ? (
                                                // Radio input for ONE_CHOICE type
                                                <input
                                                    type="radio"
                                                    name="answer"
                                                    value={option.answer}
                                                    className="mr-2"
                                                />
                                            ) : quizData.type === "SUM" ? (
                                                // Automatically checked and disabled checkbox for SUM type
                                                <input
                                                    type="checkbox"
                                                    name="answer"
                                                    checked={true} // Always checked for SUM
                                                    disabled={true} // Disabled to prevent unchecking
                                                    className="mr-2"
                                                />
                                            ) : (
                                                // Manually checked checkbox for ANY_CORRECT type
                                                <input
                                                    type="checkbox"
                                                    name="answer"
                                                    value={option.answer}
                                                    className="mr-2"
                                                />
                                            )}
                                            {quizData.type === "ONE_CHOICE" ? (
                                                <span className="text-lg">{option.answer || "javob yo'qligi uchun namuma"}</span>
                                            ):
                                            (<input type="text" placeholder={option.answer || 'javob kiriting'} className="text-lg bg-transparent border-none w-full"  />)
                                            }
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            </Layout>
        </div>
    );
}

export default Category;
