import { useEffect } from "react";
import Layout from "@/components/clientDashboard/laytout";
import { BiSolidPencil } from "react-icons/bi";
import axios from "axios";
import { noImageClientDefaultImage } from "@/helpers/imports/images";
import { baseUrl, getProfile } from "@/helpers/api/baseUrl";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { config } from "@/helpers/functions/token";

function ClientProfile() {
  // const [profileData, setProfileData] = useState({
  //   firstName: "",
  //   lastName: "",
  //   region: "",
  //   district: "",
  //   email: "",
  //   address: "",
  //   profileImage: "",
  // });

  // Fetch profile data from the API
  useEffect(() => {
    axios
      .get(`${baseUrl}statistics-controller`)
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
    const token = localStorage.getItem('token')
    if (role == 'ROLE_SUPER_ADMIN') {
      navigate('/dashboard')
    } else if (role == 'ROLE_TESTER') {
      navigate('/category')
    }

    if (token == null) {
      navigate('/auth/Signin')
    }
  }

  const getMeUser = useQuery({
    queryKey: ['getMeUser'],
    queryFn: async () => {
      const response = await axios.get(`${getProfile}`, config);
      return response.data
    },
    onError: (error: any) => {
      console.error("Error fetching profile data:", error);
    },
    // refetchInterval: 1000 * 60 * 5, // 5 minutes
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 15, // 15 minutes
  })
  const profileData: GetMetype = getMeUser.data?.body as GetMetype
  console.log(profileData);

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
              src={profileData?.profileImage ? profileData?.profileImage : noImageClientDefaultImage}
              // src={profileData.profileImage || noImageClientDefaultImage} // user agar rasm quymasa shu default rasm quyiladi
              alt="User Image"
              // onError={(e) => {
              //   e.currentTarget.src = noImageClientDefaultImage;
              // }}
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
                value={profileData?.firstName}
                className="clientProfileDatasStyles"
                readOnly
              />
            </div>

            {/* Surname */}
            <div>
              <label className="block text-lg text-gray-600">Familiya</label>
              <input
                type="text"
                value={profileData?.lastName}
                className="clientProfileDatasStyles"
                readOnly
              />
            </div>

            {/* Region */}
            <div>
              <label className="block text-lg text-gray-600">Viloyat</label>
              <input
                type="text"
                value={profileData?.region ? profileData?.region : 'No region '}
                className="clientProfileDatasStyles"
                readOnly
              />
            </div>

            {/* District */}
            <div>
              <label className="block text-lg text-gray-600">Tuman</label>
              <input
                type="text"
                value={profileData?.district ? profileData?.district : 'No District'}
                className="clientProfileDatasStyles"
                readOnly
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-lg text-gray-600">E-pochta manzili</label>
              <input
                type="email"
                value={profileData?.email}
                className="clientProfileDatasStyles"
                readOnly
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-lg text-gray-600">Ko'cha (To'liq)</label>
              <input
                type="text"
                value={profileData?.address ? profileData?.address : 'No Adress'}
                className="clientProfileDatasStyles"
                readOnly
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-lg text-gray-600">Telefon raqamingiz <span className="text-red-500">(namuna: 998912345678)</span></label>
              <input
                type="text"
                value={profileData?.phoneNumber}
                className="clientProfileDatasStyles"
                readOnly
              />
            </div>

            {/* User Brithday */}
            <div>
              <label className="block text-lg text-gray-600">Tug'ilgan kuningiz <span>(namuna: yil-oy-kun: 2003-02-09)</span></label>
              <input
                type="text"
                value={profileData?.dateOfBirth ? profileData?.dateOfBirth : "No Brithday"}
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
