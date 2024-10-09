import { useState, useEffect } from "react";
import Layout from "@/components/clientDashboard/laytout";
import { BiSolidPencil } from "react-icons/bi";
import axios from "axios";
import { noImageClientDefaultImage } from "@/helpers/imports/images";
import { baseUrl } from "@/helpers/api/baseUrl";
import { useNavigate } from "react-router-dom";

function ClientProfile() {
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    region: "",
    district: "",
    email: "",
    address: "",
    profileImage: "",
  });

  // Fetch profile data from the API
  useEffect(() => {
    axios
      .get(`${baseUrl}user/profile`)
      .then((response) => {
        const data = response.data?.body;
        setProfileData({
          firstName: data.firstName || "Foydalanuvchi",
          lastName: data.lastName || "Foydalaniyev",
          region: data.region || "Shaxarli Viloyati",
          district: data.district || "Shaxarsiz Shaxri",
          email: data.email || "foydalanibqol@gmail.com",
          address: data.address || "Ko'chabu MFY Foyda Ko'chasi 21-uy",
          profileImage: data.profileImage || "",
        });
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
      });
  }, []);

  const navigate = useNavigate()
  function checkRoleClient() {
    const role = localStorage.getItem('role')
    if (role == 'ROLE_SUPER_ADMIN' || role == 'ROLE_TESTER') {
      navigate('/dashboard')
    }
  }

  useEffect(() => {
    checkRoleClient()
  }, [checkRoleClient])
  return (
    <Layout>
      <div className="flex flex-col items-center md:p-4 p-0">
        <div className="w-full max-w-7xl bg-white shadow-md rounded-lg p-6">
          {/* Profile Picture Section */}
          <div className="flex flex-col items-center mb-6">
            <h4 className="text-2xl text-red-600 font-semibold pb-4">Foydalanuvchi rasmi</h4>
            <img
              className="w-40 relative h-40 rounded-full object-cover"
              src={profileData.profileImage || noImageClientDefaultImage} // user agar rasm quymasa shu default rasm quyiladi
              alt="User Image"
              onError={(e) => {
                e.currentTarget.src = noImageClientDefaultImage;
              }}
            />
            <button className="absolute ml-28 mt-40 bg-red-500 text-white p-2 rounded-full">
              <BiSolidPencil />
            </button>
          </div>

          {/* Profile Info Section */}
          <div className="text-center text-red-500 text-xl mb-4">Sizning Ma'lumotlaringiz</div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label className="block text-lg text-gray-600">Ism</label>
              <input
                type="text"
                value={profileData.firstName}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3"
                readOnly
              />
            </div>

            {/* Surname */}
            <div>
              <label className="block text-lg text-gray-600">Familiya</label>
              <input
                type="text"
                value={profileData.lastName}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3"
                readOnly
              />
            </div>

            {/* Region */}
            <div>
              <label className="block text-lg text-gray-600">Viloyat</label>
              <input
                type="text"
                value={profileData.region}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3"
                readOnly
              />
            </div>

            {/* District */}
            <div>
              <label className="block text-lg text-gray-600">Tuman</label>
              <input
                type="text"
                value={profileData.district}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3"
                readOnly
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-lg text-gray-600">E-pochta manzili</label>
              <input
                type="email"
                value={profileData.email}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3"
                readOnly
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-lg text-gray-600">Ko'cha (To'liq)</label>
              <input
                type="text"
                value={profileData.address}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3"
                readOnly
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-lg text-gray-600">Telefon raqamingiz <span className="text-red-500">(namuna: 998912345678)</span></label>
              <input
                type="text"
                value={profileData.address}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3"
                readOnly
              />
            </div>

            {/* User Brithday */}
            <div>
              <label className="block text-lg text-gray-600">Tug'ilgan kuningiz <span>(namuna: yil-oy-kun: 2003-02-09)</span></label>
              <input
                type="text"
                value={profileData.address}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3"
                readOnly
              />
            </div>
            <button className="p-2 rounded-lg text-md mt-9 bg-gray-600 hover:bg-gray-800 transition duration-200 ease-in-out w-max font-semibold text-white">
              O'zgartirishlarni saqlang
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ClientProfile;
