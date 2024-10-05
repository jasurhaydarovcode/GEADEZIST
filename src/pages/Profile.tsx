import Layout from "@/components/Dashboard/Layout";
import { geodeziyaLogo } from "@/helpers/imports/images";
import { BiSolidPencil } from "react-icons/bi";

function Profile() {
  return (
    <Layout>
      <div className="flex flex-col items-center p-4">
        <div className="w-full max-w-7xl bg-white shadow-md rounded-lg p-6">
          {/* Profile Picture Section */}
          <div className="flex flex-col items-center mb-6">
            <h4 className="text-2xl text-red-600 font-semibold pb-4">Admin rasmi</h4>
            <img className="w-40 relative h-40 rounded-full object-cover" src={geodeziyaLogo} alt="User Image" />
            <button className="absolute ml-28 mt-40 bg-red-500 text-white p-2 rounded-full">
              <BiSolidPencil />
            </button>
          </div>

          {/* Profile Info Section */}
          <div className="text-center text-red-500 text-xl mb-4">
            Sizning Ma'lumotlaringiz
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label className="block text-sm text-gray-600">Ism</label>
              <input
                type="text"
                value="Admin"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3"
                readOnly
              />
            </div>

            {/* Surname */}
            <div>
              <label className="block text-sm text-gray-600">Familiya</label>
              <input
                type="text"
                value="Admin"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3"
                readOnly
              />
            </div>

            {/* Region */}
            <div>
              <label className="block text-sm text-gray-600">Viloyat</label>
              <input
                type="text"
                value="Qashqadaryo Viloyati"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3"
                readOnly
              />
            </div>

            {/* District */}
            <div>
              <label className="block text-sm text-gray-600">Tuman</label>
              <input
                type="text"
                value="Qarshi Shaxri"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3"
                readOnly
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm text-gray-600">E-pochta manzili</label>
              <input
                type="email"
                value="example@gmail.com"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3"
                readOnly
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm text-gray-600">Ko'cha (To'liq)</label>
              <input
                type="text"
                value="Admin MFY Exam Ko'chasi 21-uy"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3"
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Profile;
