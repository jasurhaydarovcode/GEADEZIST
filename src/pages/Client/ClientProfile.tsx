import { useEffect } from "react";
import Layout from "@/components/clientDashboard/laytout";
import { BiSolidPencil } from "react-icons/bi";
import axios from "axios";
import { noImageClientDefaultImage } from "@/helpers/imports/images";
import { baseUrl, getProfile } from "@/helpers/api/baseUrl";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { config } from "@/helpers/functions/token";
import GetMetype from "../../helpers/types/GetMetype.ts";

function ClientProfile() {
  const navigate = useNavigate();

  // Tekshirish uchun role va tokenni faqat bir marta ishlatish uchun useCallback qo'llaymiz
  const checkRoleClient = () => {
    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");
    if (role === "ROLE_SUPER_ADMIN") {
      navigate("/dashboard");
    } else if (role === "ROLE_TESTER") {
      navigate("/category");
    }

    if (!token) {
      navigate("/auth/Signin");
    }
  };

  // Ma'lumotni React Query orqali olish
  const { data: getMeUserData, error: queryError } = useQuery({
    queryKey: ["getMeUser"],
    queryFn: async () => {
      const response = await axios.get(getProfile, config);
      return response.data;
    },
    onError: (error: unknown) => {
      console.error("Error fetching profile data:", error);
    },
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 15,
  });

  const profileData: GetMetype =
    (getMeUserData as { body?: GetMetype })?.body || ({} as GetMetype);

  useEffect(() => {
    checkRoleClient();
  }, []);

  return (
    <Layout>
      <div className="flex flex-col items-center md:p-4 p-0">
        <div className="w-full max-w-7xl bg-white shadow-md rounded-lg p-6">
          {/* Profile Picture Section */}
          <div className="flex flex-col items-center mb-6">
            <h4 className="text-2xl text-red-600 font-semibold pb-4">Foydalanuvchi rasmi</h4>
            <img
              className="w-40 relative h-40 rounded-full object-cover"
              src={
                profileData?.profileImage ? profileData?.profileImage : noImageClientDefaultImage
              }
              alt="User Image"
            />
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
              <label className="block text-lg text-gray-600">Ism</label>
              <input
                type="text"
                value={profileData?.firstName || "No First Name"}
                className="clientProfileDatasStyles"
                readOnly
              />
            </div>

            {/* Surname */}
            <div>
              <label className="block text-lg text-gray-600">Familiya</label>
              <input
                type="text"
                value={profileData?.lastName || "No Last Name"}
                className="clientProfileDatasStyles"
                readOnly
              />
            </div>

            {/* Region */}
            <div>
              <label className="block text-lg text-gray-600">Viloyat</label>
              <input
                type="text"
                value={profileData?.region || "No Region"}
                className="clientProfileDatasStyles"
                readOnly
              />
            </div>

            {/* District */}
            <div>
              <label className="block text-lg text-gray-600">Tuman</label>
              <input
                type="text"
                value={profileData?.district || "No District"}
                className="clientProfileDatasStyles"
                readOnly
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-lg text-gray-600">E-pochta manzili</label>
              <input
                type="email"
                value={profileData?.email || "No Email"}
                className="clientProfileDatasStyles"
                readOnly
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-lg text-gray-600">Ko'cha (To'liq)</label>
              <input
                type="text"
                value={profileData?.address || "No Address"}
                className="clientProfileDatasStyles"
                readOnly
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-lg text-gray-600">
                Telefon raqamingiz <span className="text-red-500">(namuna: 998912345678)</span>
              </label>
              <input
                type="text"
                value={profileData?.phoneNumber || "No Phone Number"}
                className="clientProfileDatasStyles"
                readOnly
              />
            </div>

            {/* User Brithday */}
            <div>
              <label className="block text-lg text-gray-600">
                Tug'ilgan kuningiz <span>(namuna: yil-oy-kun: 2003-02-09)</span>
              </label>
              <input
                type="text"
                value={profileData?.dateOfBirth || "No Birthday"}
                className="clientProfileDatasStyles"
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
