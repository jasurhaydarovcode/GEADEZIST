import Button from "@/components/button"
import Layout from "@/components/Dashboard/Layout"

const Category = () => {
  return (
    <Layout>
      <div className=" p-5 space-y-5">
        <div className="pagename">
          <h1 className="font-semibold text-3xl">Category</h1>
        </div>

        <div>
          <div className="addBtn">
            <i className='bi bi-plus-lg'>plus</i>
            <Button btnText="Qo'shish" btnClass="bg-blue-900 text-white px-8 py-4 rounded-lg"/>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Category