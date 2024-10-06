import CategoryAddModal from "@/components/CategoryAddModal"
import Layout from "@/components/Dashboard/Layout"
import { geodeziyaLogo } from "@/helpers/imports/images"

const Category = () => {
  return (
    <Layout>
      <div className=" p-5 space-y-5">
        <div className="pagename">
          <h1 className="font-semibold text-3xl">Category</h1>
        </div>
      <CategoryAddModal/>
        <div className="addBtn">
         
        </div>
        <div className="bg-white shadow rounded-lg p-4 overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="py-2 border">T/P</th>
                <th className="py-2 border">Category image</th>
                <th className="py-2 border">Category name</th>
                <th className="py-2 border">Category Description</th>
                <th className="py-2 border">Questions</th>
                <th className="py-2 border">Additional Questions</th>
                <th className="py-2 border">Duration time</th>
                <th className="py-2 border">Re-admission date</th>
                <th className="py-2 border">Created by</th>
                <th className="py-2 border">Category situation</th>
                <th className="py-2 border">Deleted by</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 border text-center">1</td>
                <td className="py-2 border text-center pl-4"><img src={geodeziyaLogo} className="w-14 h-14 rounded-full" alt="logo" /></td>
                <td className="py-2 border text-center">Geadeziya</td>
                <td className="py-2 border text-center">Geadeziya testlar</td>
                <td className="py-2 border text-center">3</td>
                <td className="py-2 border text-center">1</td>
                <td className="py-2 border text-center">1</td>
                <td className="py-2 border text-center">2</td>
                <td className="py-2 border text-center">admin</td>
                <td className="py-2 border text-center">  </td>
                <td className="py-2 border text-center">admin</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  )
}
export default Category
