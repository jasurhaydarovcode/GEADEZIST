import Layout from '@/components/Dashboard/Layout';
import { config } from '@/helpers/functions/token';
import { geodeziyaLogo } from '@/helpers/imports/images';
import { BiSolidPencil } from 'react-icons/bi';
import { getProfile } from '@/helpers/api/baseUrl';
import { useQuery } from 'react-query';
import { GetProfileType } from '@/helpers/types/GetProfileType';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useCallback } from 'react';

function Profile() {
  const getUserProfile = useQuery({
    queryKey: ['getUserProfile', config],
    queryFn: async () => {
      const res = await axios.get(`${getProfile}`, config);
      return res.data;
    },
  });
  const navigate = useNavigate();

  const checkRoleClient = useCallback(() => {
    const role = localStorage.getItem('role');
    if (role == 'ROLE_CLIENT') {
      navigate('/client/dashboard');
    }
  }, [navigate]);

  useEffect(() => {
    checkRoleClient();
  }, [checkRoleClient]);

  interface UserProfileData {
    body: GetProfileType;
  }

  const getProfileData: GetProfileType | undefined = (
    getUserProfile.data as UserProfileData
  )?.body;

  return (
    <Layout>
      {getUserProfile.isLoading ? (
        <div
          role="status"
          className="flex justify-center items-center h-screen"
        >
          <svg
            aria-hidden="true"
            className="inline w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <div className="flex flex-col items-center p-4">
          <div className="w-full max-w-7xl bg-white shadow-md rounded-lg p-6">
            {/* Profile Picture Section */}
            <div className="flex flex-col items-center mb-6">
              <h4 className="text-2xl text-red-600 font-semibold pb-4">
                Admin rasmi
              </h4>
              <img
                className="w-40 relative h-40 rounded-full object-cover"
                src={geodeziyaLogo}
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
                <label className="block text-sm text-gray-600">Ism</label>
                <input
                  type="text"
                  value={
                    getProfileData?.firstName == null
                      ? 'No first name'
                      : getProfileData?.firstName || ''
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3"
                  readOnly
                />
              </div>

              {/* Surname */}
              <div>
                <label className="block text-sm text-gray-600">Familiya</label>
                <input
                  type="text"
                  value={getProfileData?.lastName || 'Admin'}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3"
                  readOnly
                />
              </div>

              {/* Region */}
              <div>
                <label className="block text-sm text-gray-600">Viloyat</label>
                <input
                  type="text"
                  value={
                    getProfileData?.regionName == null
                      ? 'No region'
                      : getProfileData?.regionName || 'Qashqadaryo Viloyati'
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3"
                  readOnly
                />
              </div>

              {/* District */}
              <div>
                <label className="block text-sm text-gray-600">Tuman</label>
                <input
                  type="text"
                  value={
                    getProfileData?.districtName == null
                      ? 'No district'
                      : getProfileData?.districtName || 'Qarshi Shaxri'
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3"
                  readOnly
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm text-gray-600">
                  E-pochta manzili
                </label>
                <input
                  type="email"
                  value={getProfileData?.email || 'example@gmail.com'}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3"
                  readOnly
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm text-gray-600">
                  Ko'cha (To'liq)
                </label>
                <input
                  type="text"
                  value={
                    getProfileData?.street == null
                      ? 'No data'
                      : getProfileData?.street ||
                        "Admin MFY Exam Ko'chasi 21-uy"
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3"
                  readOnly
                />
              </div>
            </div>
            <button
              disabled={true}
              className="cursor-not-allowed p-2 rounded-lg text-md mt-4 bg-gray-600 hover:bg-gray-800 transition duration-200 ease-in-out w-max font-semibold text-white"
            >
              O'zgartirishlarni saqlang
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default Profile;
