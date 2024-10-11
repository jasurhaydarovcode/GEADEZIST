import { baseUrl } from "@/helpers/api/baseUrl";
import { Logo, registerRasm } from "@/helpers/imports/images";
import { SignUpType } from "@/helpers/types/LoginType";
import axios from "axios";
import { AxiosError } from "axios";
import { useRef, useState } from "react";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function SignUp() {
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const confirmPassword = useRef<HTMLInputElement>(null);
  const firstname = useRef<HTMLInputElement>(null);
  const lastname = useRef<HTMLInputElement>(null);
  const phone = useRef<HTMLInputElement>(null);
  const register = useMutation({
    mutationFn: async () =>{
      const data: SignUpType = {
        firstname: firstname.current?.value || "",
        lastname: lastname.current?.value || "", 
        email: email.current?.value || "",
        phoneNumber: phone.current?.value || "",
        password: password.current?.value || "",
        confirmPassword: confirmPassword.current?.value || "",
        role: "user", // role ni kerak bo'lganda o'zgartiring
      }
      const res = await axios.post(`${baseUrl}auth/register?genderType=${genderValue.toUpperCase()}`, data)
      console.log(res.data) 
    } ,
    onError: (error: AxiosError) => {
      toast.error(error.message)
    },
    onSuccess: () => {
      toast.success("Ro'yxatdan o'tdingiz")
      navigate("/auth/")
    }
  })
  // Jinsni select orqali tanlash uchun state
  const [genderValue, setGenderValue] = useState<string>("");

  function signUpPost() {
    if (!genderValue) {
      toast.error("Iltimos, jinsni tanlang");
      return;
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col lg:flex-row w-full lg:w-5/6 lg:h-5/6 bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="lg:w-3/5 w-full flex flex-col items-center justify-center bg-gray-50 p-8">
          <img src={Logo} alt="Logo" className="w-30 lg:w-48 mb-4 lg:mb-8" />
          <div className="w-40 lg:w-60">
            <img src={registerRasm} alt="Phone Illustration" />
          </div>
        </div>

        <div className="flex justify-center items-center w-full lg:w-3/5 p-6 lg:p-8">
          <div className="w-full">
            <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4 lg:mb-6">
              Ro'yxatdan o'tish
            </h2>
            <div>
              <div className="mb-4">
                <label htmlFor="firstName" className="block text-sm font-semibold text-gray-600">
                  Ism
                </label>
                <input
                  ref={firstname}
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="Ismingizni kiriting"
                  required
                  className="w-full px-4 mt-2 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="lastName" className="block text-sm font-semibold text-gray-600">
                  Familiya
                </label>
                <input
                  ref={lastname}
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Familiyangizni kiriting"
                  required
                  className="w-full px-4 mt-2 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-semibold text-gray-600">
                  Email
                </label>
                <input
                  ref={email}
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Emailingizni kiriting"
                  required
                  className="w-full px-4 mt-2 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-600">
                  Telefon raqam
                </label>
                <input
                  ref={phone}
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="+998 XX XXX XX XX"
                  required
                  className="w-full px-4 mt-2 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-semibold text-gray-600">
                  Parol
                </label>
                <input
                  ref={password}
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Yangi parolni kiriting"
                  required
                  className="w-full px-4 mt-2 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
                <p className="text-xs ">Parol kamida 5 ta belgidan iborat</p>
              </div>

              <div className="mb-4">
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-600">
                  Parolni tasdiqlang
                </label>
                <input
                  ref={confirmPassword}
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Parolni qayta kiriting"
                  required
                  className="w-full px-4 mt-2 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
              </div>

              {/* Jins tanlash */}
              <div className="mb-4">
                <label htmlFor="gender" className="block text-sm font-semibold text-gray-600">Jins</label>
                <select
                  id="gender"
                  name="gender"
                  value={genderValue}
                  onChange={(e) => setGenderValue(e.target.value)}
                  required
                  className="w-full px-4 mt-2 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                >
                  <option value="">Jinsni tanlang</option>
                  <option value="MALE">Erkak</option>
                  <option value="FEMALE">Ayol</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="flex items-center">
                  <input
                    required
                    type="checkbox"
                    name="acceptedTerms"
                    className="form-checkbox h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    Foydalanish shartlarini qabul qilaman.
                    <Link to={'/auth/offer'} className="text-blue-600 hover:underline">Offer</Link>
                  </span>
                </label>
              </div>

              <button
                onClick={() => register.mutate()}
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                Ro'yxatdan o'tish
              </button>
            </div>

            <div className="flex justify-center items-center mt-4 lg:mt-6">
              <Link to={"/auth/SignIn"} className="text-sm text-blue-500 hover:underline">
                Tizimga kirish
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
