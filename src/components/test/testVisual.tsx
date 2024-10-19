import Layout from "@/components/Dashboard/Layout";
import { baseUrl } from "@/helpers/api/baseUrl";
import { config } from "@/helpers/functions/token";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useQuery } from "react-query";
import TableLoading from "@/components/spinner/TableLoading";
import { Helmet } from "react-helmet";
import CheckLogin from "@/helpers/functions/checkLogin";
import { useLocation } from 'react-router-dom';

function Category() {
    CheckLogin

    const location = useLocation();
    const { element } = location.state || {};

    // Kategoriyalarni olish
    const { data, isLoading } = useQuery(
        ["getCategories", 1],
        async () => {
            const res = await axios.get<{
                body: { body: any[]; totalElements: number };
            }>(
                `${baseUrl}category/page?page=${1 - 1}&size=${10}`,
                config
            );
            return res.data.body.body;
        },
        { keepPreviousData: true }
    );
    console.log(data);


    return (
        <div>
            <Helmet>
                <title>Kategoriyalar</title>
            </Helmet>

            <Layout>
                {isLoading ? (
                    <div className="flex justify-center items-center h-[80vh]">
                        {<TableLoading />}
                    </div>
                ) : (
                    <>
                        <div className="p-6 font-sans text-center">
                            <h1 className="text-2xl font-bold">Битта савол</h1>
                            <p className="italic mt-2">
                                Админ саволни мижозларга қандай кўринишини билиб олиш учун намуна
                            </p>
                            <h2 className="text-xl font-semibold mt-4">{element?.name || 'Категория номаълум'}</h2>
                            <p className="text-lg mt-4">
                                <span className="italic">{element?.categoriya || 'Савол номаълум'}</span>
                                <span className="text-2xl">
                                </span>
                            </p>
                            <p className="text-red-600 font-bold mt-4">Фақат битта тўғри жавобни белгиланг</p>
                            <div className="mt-6">
                                {element ? (
                                    <label className="block mb-4 w-[100%]" >
                                        <input
                                            type="text"
                                            name="answer"
                                            disabled
                                            value="javob"
                                            className="mr-2 "
                                        />
                                        <input
                                            type="radio"
                                            name="answer"
                                            disabled
                                            value="javob"
                                            className="mr-2"
                                        />
                                    </label>
                                ) : (
                                    <p>Ma'lumotlar mavjud emas.</p>
                                )
                                }
                            </div>
                        </div>
                    </>
                )}

            </Layout>
        </div>
    );
}

export default Category;
