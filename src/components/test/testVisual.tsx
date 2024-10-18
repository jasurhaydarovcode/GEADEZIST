import { Layout } from "lucide-react";
import { Helmet } from "react-helmet";
import TableLoading from "../spinner/TableLoading";
import { Button } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";

function TestVisual() {
let isLoading = true
    return (
        <div>
            <Helmet>
                <title>Testlar</title>
            </Helmet>

            <Layout>
                {isLoading ? (<div className='flex justify-center items-center h-screen'><TableLoading /></div>) : (<div className="p-5">
                    <div className="flex justify-between">
                        <h1 className="text-3xl font-bold font-sans">Test</h1>
                        <p className="font-sans text-gray-700">
                            Boshqaruv paneli / <span className="text-blue-700">Test</span>
                        </p>
                    </div>
                </div>
                )}

                < div className="flex justify-between">
                </div>
            </Layout>
        </div>

    )
}
export default TestVisual