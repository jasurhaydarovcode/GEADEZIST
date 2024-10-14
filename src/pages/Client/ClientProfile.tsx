import React, { useEffect, useCallback, useState, ChangeEvent } from 'react';
import Layout from '@/components/clientDashboard/laytout.tsx';
import { BiSolidPencil } from 'react-icons/bi';
import axios from 'axios';
import { noImageClientDefaultImage } from '@/helpers/imports/images';
import { getProfile } from '@/helpers/api/baseUrl'; // updateProfile API endpointni qo'shing
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { config } from '@/helpers/functions/token';
import { GetMetype } from '../../helpers/types/GetMetype.ts';
import { Helmet } from 'react-helmet';

function ClientProfile() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<GetMetype>({
    firstName: '',
    lastName: '',
    region: '',
    district: '',
    email: '',
    address: '',
    phoneNumber: '',
    dateOfBirth: '',
    profileImage: '',
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

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

  // Ma'lumotni React Query orqali olish
  const { data: getMeUserData, isLoading } = useQuery({
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

  const profileData: GetMetype =
    (getMeUserData as { body?: GetMetype })?.body || ({} as GetMetype);

  useEffect(() => {
    if (profileData) {
      setFormData(profileData);
    }
  }, [profileData]);

  useEffect(() => {
    checkRoleClient();
  }, [checkRoleClient]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
      setFormData((prev) => ({
        ...prev,
        profileImage: URL.createObjectURL(e.target.files[0]),
      }));
    }
  };

  // Mutatsiya uchun React Query qo'shing
  const mutation = useMutation(
    (updatedData: FormData) => axios.put( updateProfile, updatedData, config),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['getMeUser']);
        setIsEditing(false);
      },
      onError: (error: unknown) => {
        console.error('Error updating profile:', error);
      },
    }
  );

  const handleSave = () => {
    const data = new FormData();
    data.append('firstName', formData.firstName);
    data.append('lastName', formData.lastName);
    data.append('region', formData.region);
    data.append('district', formData.district);
    data.append('email', formData.email);
    data.append('address', formData.address);
    data.append('phoneNumber', formData.phoneNumber);
    data.append('dateOfBirth', formData.dateOfBirth);
    if (selectedImage) {
      data.append('profileImage', selectedImage);
    }

    mutation.mutate(data);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Helmet>
        <title>{profileData?.lastName || 'Profil'}</title>
      </Helmet>
      <Layout>
        <div className="flex flex-col items-center md:p-4 p-0">
          <div className="w-full max-w-7xl bg-white shadow-md rounded-lg p-6">
            {/* Profile Picture Section */}
            <div className="flex flex-col items-center mb-6 relative">
              <h4 className="text-2xl text-red-600 font-semibold pb-4">
                Foydalanuvchi rasmi
              </h4>
              <img
                className="w-40 h-40 rounded-full object-cover"
                src={
                  formData?.profileImage
                    ? formData.profileImage
                    : noImageClientDefaultImage
                }
                alt="User Image"
              />
              {isEditing && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute ml-28 mt-40"
                />
              )}
              <button
                className="absolute ml-28 mt-40 bg-red-500 text-white p-2 rounded-full"
                onClick={() => {
                  if (isEditing) {
                    // Additional functionality if needed when editing
                  } else {
                    setIsEditing(true);
                  }
                }}
              >
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
                  name="firstName"
                  value={formData.firstName || 'No Name'}
                  className="clientProfileDatasStyles"
                  readOnly={!isEditing}
                  onChange={handleInputChange}
                />
              </div>

              {/* Surname */}
              <div>
                <label className="block text-lg text-gray-600">Familiya</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName || 'No Last Name'}
                  className="clientProfileDatasStyles"
                  readOnly={!isEditing}
                  onChange={handleInputChange}
                />
              </div>

              {/* Region */}
              <div>
                <label className="block text-lg text-gray-600">Viloyat</label>
                <input
                  type="text"
                  name="region"
                  value={formData.region || 'No Region'}
                  className="clientProfileDatasStyles"
                  readOnly={!isEditing}
                  onChange={handleInputChange}
                />
              </div>

              {/* District */}
              <div>
                <label className="block text-lg text-gray-600">Tuman</label>
                <input
                  type="text"
                  name="district"
                  value={formData.district || 'No District'}
                  className="clientProfileDatasStyles"
                  readOnly={!isEditing}
                  onChange={handleInputChange}
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-lg text-gray-600">
                  E-pochta manzili
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email || 'No Email'}
                  className="clientProfileDatasStyles"
                  readOnly={!isEditing}
                  onChange={handleInputChange}
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-lg text-gray-600">
                  Ko'cha (To'liq)
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address || 'No Address'}
                  className="clientProfileDatasStyles"
                  readOnly={!isEditing}
                  onChange={handleInputChange}
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
                  name="phoneNumber"
                  value={formData.phoneNumber || 'No Phone Number'}
                  className="clientProfileDatasStyles"
                  readOnly={!isEditing}
                  onChange={handleInputChange}
                />
              </div>

              {/* User Birthday */}
              <div>
                <label className="block text-lg text-gray-600">
                  Tug'ilgan kuningiz{' '}
                  <span>(namuna: yil-oy-kun: 2003-02-09)</span>
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth || ''}
                  className="clientProfileDatasStyles"
                  readOnly={!isEditing}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end mt-6">
              {isEditing ? (
                <>
                  <button
                    className="p-2 mr-4 rounded-lg text-md bg-green-600 hover:bg-green-800 transition duration-200 ease-in-out w-max font-semibold text-white"
                    onClick={handleSave}
                    disabled={mutation.isLoading}
                  >
                    {mutation.isLoading ? 'Saqlanmoqda...' : 'Saqlash'}
                  </button>
                  <button
                    className="p-2 rounded-lg text-md bg-gray-600 hover:bg-gray-800 transition duration-200 ease-in-out w-max font-semibold text-white"
                    onClick={() => {
                      setIsEditing(false);
                      setFormData(profileData); // Original ma'lumotlarga qaytish
                      setSelectedImage(null);
                    }}
                  >
                    Bekor qilish
                  </button>
                </>
              ) : (
                <button
                  className="p-2 rounded-lg text-md bg-gray-600 hover:bg-gray-800 transition duration-200 ease-in-out w-max font-semibold text-white"
                  onClick={() => setIsEditing(true)}
                >
                  Tahrirlash
                </button>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default ClientProfile;
