import { useEffect, useCallback, useState, useMemo } from 'react';
import Layout from '@/components/Dashboard/Layout';
import { BiSolidPencil } from 'react-icons/bi';
import axios from 'axios';
import { noImageClientDefaultImage } from '@/helpers/imports/images';
import { getProfile } from '@/helpers/api/baseUrl';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { config } from '@/helpers/functions/token';
import { GetMetype } from '../../helpers/types/GetMetype.ts';
import { Helmet } from 'react-helmet';
// import CheckLogin from '@/helpers/functions/checkLogin.tsx';

function ClientProfile() {
  // CheckLogin
  const navigate = useNavigate();

  const checkRoleClient = useCallback(() => {
    const role = localStorage.getItem('role');
    const token = localStorage.getItem('token');
    if (role === 'ROLE_SUPER_ADMIN') {
      navigate('/dashboard');
    } else if (role === 'ROLE_TESTER') {
      navigate('/category');
    }

    if (!token) {
      navigate('/auth/Signin');
    }
  }, [navigate]);

  // Fetch data using React Query
  const { data: getMeUserData } = useQuery({
    queryKey: ['getMeUser'],
    queryFn: async () => {
      const response = await axios.get(getProfile, config);
      return response.data;
    },
    onError: (error: unknown) => {
      console.error('Error fetching profile data:', error);
    },
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 15,
  });

  const profileData: GetMetype = useMemo(() =>
    (getMeUserData as { body?: GetMetype })?.body || ({} as GetMetype),
    [getMeUserData]);

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [region, setRegion] = useState<string>('');
  const [district, setDistrict] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [dateOfBirth, setDateOfBirth] = useState<string>('');
  // const [profileImage, setProfileImage] = useState<string>('');

  useEffect(() => {
    if (profileData) {
      setFirstName(profileData.firstName || '');
      setLastName(profileData.lastName || '');
      setRegion(profileData.region || '');
      setDistrict(profileData.district || '');
      setEmail(profileData.email || '');
      setAddress(profileData.address || '');
      setPhoneNumber(profileData.phoneNumber || '');
      setDateOfBirth(profileData.dateOfBirth || '');
      // setProfileImage(profileData.profileImage || '');
    }
  }, [profileData]);

  useEffect(() => {
    checkRoleClient();
  }, [checkRoleClient]);

  return (
    <div>
      <Helmet>
        <title>{lastName}</title>
      </Helmet>
      <Layout>
        <div className="flex flex-col items-center md:p-4 p-0">
          <div className="w-full max-w-7xl bg-white shadow-md rounded-lg p-6">
            {/* Profile Picture Section */}
            <div className="flex flex-col items-center mb-6">
              <h4 className="text-2xl text-red-600 font-semibold pb-4">
                Foydalanuvchi rasmi
              </h4>
              <img
                className="w-40 relative h-40 rounded-full object-cover"
                src={
                  profileData?.profileImage
                    ? profileData?.profileImage
                    : noImageClientDefaultImage
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
                  value={firstName}
                  placeholder="Namuma: Kimdir"
                  onChange={(e) => setFirstName(e.target.value)}
                  className="clientProfileDatasStyles"
                />
              </div>

              {/* Surname */}
              <div>
                <label className="block text-lg text-gray-600">Familiya</label>
                <input
                  type="text"
                  value={lastName}
                  placeholder="Namuma: Kimdirov"
                  onChange={(e) => setLastName(e.target.value)}
                  className="clientProfileDatasStyles"
                />
              </div>

              {/* Region */}
              <div>
                <label className="block text-lg text-gray-600">Viloyat</label>
                <input
                  type="text"
                  value={region}
                  placeholder="Namuma: Uzbekistan"
                  onChange={(e) => setRegion(e.target.value)}
                  className="clientProfileDatasStyles"
                />
              </div>

              {/* District */}
              <div>
                <label className="block text-lg text-gray-600">Tuman</label>
                <input
                  type="text"
                  value={district}
                  placeholder="Namuma: Toshkent, Angor, Angor"
                  className="clientProfileDatasStyles"

                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-lg text-gray-600">
                  E-pochta manzili
                </label>
                <input
                  type="email"
                  value={email}
                  placeholder="Namuma: example@gmail.com"
                  onChange={(e) => setEmail(e.target.value)}
                  className="clientProfileDatasStyles"
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-lg text-gray-600">
                  Ko'cha (To'liq)
                </label>
                <input
                  type="text"
                  value={address}
                  placeholder="Namuma: 1-uy, 2-uy, 3-uy"
                  onChange={(e) => setAddress(e.target.value)}
                  className="clientProfileDatasStyles"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-lg text-gray-600">
                  Telefon raqamingiz{' '}
                  <span className="text-red-500">(namuna: 998912345678)</span>
                </label>
                <input
                  type="text"
                  value={phoneNumber}
                  placeholder="Namuma: 998901111111"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="clientProfileDatasStyles"
                />
              </div>

              {/* User Birthday */}
              <div>
                <label className="block text-lg text-gray-600">
                  Tug'ilgan kuningiz <span>(namuna: yil-oy-kun: 2003-02-09)</span>
                </label>
                <input
                  type="text"
                  value={dateOfBirth}
                  placeholder="Namuna: 2003-02-09"
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  className="clientProfileDatasStyles"
                />
              </div>

              <button className="p-2 rounded-lg text-md mt-9 bg-gray-600 hover:bg-gray-800 transition duration-200 ease-in-out w-max font-semibold text-white">
                O'zgartirishlarni saqlang
              </button>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default ClientProfile;
