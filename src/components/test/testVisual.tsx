import Layout from "@/components/Dashboard/Layout";
import "react-toastify/dist/ReactToastify.css";
import CheckLogin from "@/helpers/functions/checkLogin";
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { IoArrowBackOutline } from "react-icons/io5";

function Category() {
    CheckLogin

    const location = useLocation();
    const { element } = location.state || {};
    const navigite = useNavigate()
    function getOut() {
        navigite('/test')
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
                        <div className="text-3xl mt-5"><IoArrowBackOutline className="cursor-pointer" onClick={getOut} /></div>
                        <p className="text-2xl mt-2">
                            Admin savolni mijozlarga qanday kurinishi bilib olish uchun namuna
                        </p>
                        <p className="text-lg mt-7">
                            <span className="text-3xl font-bold">{element?.catygoria || 'kategoriya nomalum'}</span>
                        </p>
                        <h2 className="text-xl font-semibold mt-7">{element?.savol || 'savol topilmadi'}</h2>
                        <div className="mt-6">
                            {element ? (
                                <div className="mt-6">
                                    <p className="text-red-600 font-bold mt-4 text-left">Faqat bitta tugri javobni belgilang</p>
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
                    </div>
                </>
            </Layout>
        </div>
    );
}

export default Category;
