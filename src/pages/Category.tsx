import Navbar from "@/components/Dashboard/Navbar";
import Sidebar from "@/components/Dashboard/Sidebar";

function Category() {
  return (
    <div>
      <Navbar/>
      <div className="flex">
        <Sidebar/>
        <p className="text-2xl p-5 font-bold">category</p>
        {/* <td className="border-b border-[#eee] min-w-[200px] p-5">
          <p className="text-black">
            savollar soni
          </p>
        </td> */}
      </div>
    </div>
  );
}

export default Category;
