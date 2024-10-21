import Layout from "@/components/Dashboard/Layout";
// import { baseUrl } from "@/helpers/api/baseUrl";
// import { config } from "@/helpers/functions/token";
// import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
// import { useQuery } from "react-query";
// import TableLoading from "@/components/spinner/TableLoading";
// import { Helmet } from "react-helmet";
import CheckLogin from "@/helpers/functions/checkLogin";
import { useLocation } from 'react-router-dom';
import { Helmet } from "react-helmet";

function Category() {
    CheckLogin

    const location = useLocation();
    const { element } = location.state || {};

    // // Kategoriyalarni olish
    // const { data, isLoading } = useQuery(
    //     ["getCategories", 1],
    //     async () => {
    //         const res = await axios.get<{
    //             body: { body: any[]; totalElements: number };
    //         }>(
    //             `${baseUrl}category/page?page=${1 - 1}&size=${10}`,
    //             config
    //         );
    //         return res.data.body.body;
    //     },
    //     { keepPreviousData: true }
    // );
    // console.log(data);


    return (
        <div>
            <Helmet>
                <title>Testlar</title>
            </Helmet>

            <Layout>
                {/* {isLoading ? (
                    <div className="flex justify-center items-center h-[80vh]">
                        {<TableLoading />}
                    </div>
                ) : ( */}
                <>
                    <div className="p-6 font-sans text-center">
                        <h1 className="text-2xl font-bold">Битта савол</h1>
                        <p className="italic mt-2">
                            Admin savolni mijozlarga qanday kurinishi bilib olish uchun namuna
                        </p>
                        <p className="text-lg mt-4">
                            <span className="text-3xl">{element?.catygoria || 'kategoriya nomalum'}</span>
                        </p>
                        <h2 className="text-xl font-semibold mt-4">{element?.savol || 'Категория номаълум'}</h2>
                        <p className="text-red-600 font-bold mt-4">Faqat bitta tugri javobni belgilang</p>
                        <div className="mt-6">
                            {element ? (
                                <div className="mt-6">
                                    <label className="flex items-center mb-4 border border-gray-300 rounded-lg p-2 bg-gray-100">
                                        <input type="radio" name="answer" value="javob" className="mr-2" />
                                        <span className="text-lg">
                                            <span className="">javob</span>
                                        </span>
                                    </label>
                                    <label className="flex items-center border border-gray-300 rounded-lg p-2 bg-gray-100">
                                        <input type="radio" name="answer" value="javob" className="mr-2" />
                                        <span className="text-lg">
                                            <span className="">javob</span>
                                        </span>
                                    </label>
                                </div>
                            ) : (
                                <p>Ma'lumotlar mavjud emas.</p>
                            )
                            }
                        </div>
<<<<<<< HEAD
                    </>
                
=======
                    </div>
                </>
                {/* )
                } */}
>>>>>>> 375feca098957ca2e56a915d30446f9bd70ddd50

            </Layout>
        </div>
    );
}

export default Category;
