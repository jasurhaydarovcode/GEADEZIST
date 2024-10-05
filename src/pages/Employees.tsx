import Layout from "@/components/Dashboard/Layout"
import { PlusCircleOutlined } from "@ant-design/icons"
import { Button } from "antd"

function Employees() {
  return (
    <Layout>
      <div className="p-5">
          <div className="flex justify-between">
            <h1 className="text-3xl font-bold font-sans">Hodimlar</h1>
            <p className="font-sans text-gray-700">
              Boshqaruv paneli  /  <span className="text-blue-700 ">Hodimlar</span>
            </p>
          </div>
          <div>
            <Button color="default" variant="solid" className="text-xl px-5 py-6 my-5">
              <PlusCircleOutlined className="text-xl"/>Qo'shish 
            </Button>
          </div>
        </div>
    </Layout>
  )
}

export default Employees