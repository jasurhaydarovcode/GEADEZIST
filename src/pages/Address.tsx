import Layout from "@/components/Dashboard/Layout";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";

function Address() {
  return (
    <Layout>
      <div className="p-5">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold font-sans">Manzillar</h1>
          <p className="font-sans text-gray-700">
            Boshqaruv paneli / <span className="text-blue-700">Manzil</span>
          </p>
        </div>
        <div className="flex justify-between items-center">
          <p className="font-sans text-2xl text-gray-700">Viloyatlar</p>
          <Button color="default" variant="solid" className=" text-xl px-5 py-6 my-5">
            <PlusCircleOutlined className="text-xl"/>Qo'shish 
          </Button>
        </div>
      </div>
    </Layout>
  )
}

export default Address;
