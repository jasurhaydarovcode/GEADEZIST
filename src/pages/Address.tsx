import Navbar from "@/components/Dashboard/Navbar";
import Sidebar from "@/components/Dashboard/Sidebar";

function Address() {
  return (
    <div className="flex h-screen container">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
      </div>
    </div>
  )
}

export default Address;
