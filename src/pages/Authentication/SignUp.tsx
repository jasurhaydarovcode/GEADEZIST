import { baseUrl } from '@/helpers/api/baseUrl';
import { Logo, registerRasm } from '@/helpers/imports/images';
import { SignUpType } from '@/helpers/types/LoginType';
import { message } from 'antd';
import axios from 'axios';
import { useRef, useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';

function SignUp() {
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const confirmPassword = useRef<HTMLInputElement>(null);
  const firstname = useRef<HTMLInputElement>(null);
  const lastname = useRef<HTMLInputElement>(null);
  const offer = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const phone = useRef<HTMLInputElement>(null);
  const [genderValue, setGenderValue] = useState<string>('');
  const [showpassword, setShowpassword] = useState<boolean>(false);
  const [showconfirmPassword, setShowconfirmPassword] =
    useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
    
  const formatPhoneNumber = (value: string) => {
    let digits = value.replace(/\D/g, '');

    if (!digits.startsWith('998')) {
      digits = '998';
    }

    if (digits.length <= 3) {
      return '' + digits;
    } else if (digits.length <= 5) {
      return `${digits.slice(0, 3)} ${digits.slice(3, 5)}`;
    } else if (digits.length <= 8) {
      return `${digits.slice(0, 3)} ${digits.slice(3, 5)} ${digits.slice(5, 8)}`;
    } else if (digits.length <= 10) {
      return `${digits.slice(0, 3)} ${digits.slice(3, 5)} ${digits.slice(5, 8)} ${digits.slice(8, 10)}`;
    } else {
      return `${digits.slice(0, 3)} ${digits.slice(3, 5)} ${digits.slice(5, 8)} ${digits.slice(8, 10)} ${digits.slice(10, 12)}`;
    }
  };

  const formatForSwagger = (value: string) => {
    return value.replace(/\s/g, ''); 
};
const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const formattedPhoneNumber = formatPhoneNumber(e.target.value);
  phone.current!.value = formattedPhoneNumber;
};
  function signUpPost() {
    const formattedPhoneNumber = formatForSwagger(phone.current!.value);
    phone.current!.value = formattedPhoneNumber;
    if (
      !firstname.current?.value ||
      !lastname.current?.value ||
      !phone.current?.value 
    ) {
      message.warning("Iltimos, bo'shliqni to'ldiring");
      return;
    }
    if (
      !email.current?.value ||
      !password.current?.value ||
      !confirmPassword.current?.value
    ) {
      message.warning("Iltimos, bo'shliqni to'ldiring");

      return;
    }
    if (!email.current?.value.includes('@gmail.com')) {
      message.warning("Iltimos, emailni to'liq kiriting");
      return;
    }
    if(phone.current?.value.length < 12){
      message.warning("Iltimos, telefon raqamni to'liq kiriting");
      return;
    }
    if(phone.current?.value.length > 12){
      message.warning("Iltimos, telefon raqam ko'payib ketdi")
    }
    if (password.current?.value.length < 5) {
      message.warning("Parol kamida 5 ta belgidan iborat bo'lishi kerak");
      return;
    }
    if (password.current?.value !== confirmPassword.current?.value) {
      message.warning('Parollar bir xil emas');
      return;
    }
    if (!offer.current?.checked) {
      message.warning('Iltimos, Offer bilan tanishib chiqing');
      return;
    }
    setIsSubmitting(true);
    if (!genderValue) {
      message.warning('Iltimos, jinsni tanlang');
      return;
    }
    const data: SignUpType = {
      firstname: firstname.current?.value,
      lastname: lastname.current?.value,
      email: email.current?.value,
      phoneNumber: phone.current?.value ,
      password: password.current?.value,
      confirmPassword: confirmPassword.current?.value,
      role: 'ROLE_USER',
    };

    axios
      .post(`${baseUrl}auth/register?genderType=${genderValue}`, data)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          message.success("Ro'yxatdan o'tdingiz");
          navigate('/auth/confirm-signup');
        }
        message.success("Emailga code yuborildi");
      })
      .catch((err) => {
        if (err.response?.status === 404) {
          message.warning('Serverda xatolik yuz berdi');
        } else if (
          err.response?.status === 400 ||
          err.response?.status === 401 ||
          err.response?.status === 403
        ) {
          message .error(err.response?.data.message);
        }
        setIsSubmitting(false);
      });
  }
  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      signUpPost()
    }
  };

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
                <label
                  htmlFor="firstName"
                  className="block text-sm font-semibold text-gray-600"
                >
                  Ism
                </label>
                <input
                  ref={firstname}
                  onKeyDown={handleEnter}
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="Ismingizni kiriting"
                  required
                  className="w-full px-4 mt-2 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-semibold text-gray-600"
                >
                  Familiya
                </label>
                <input
                  ref={lastname}
                  onKeyDown={handleEnter}
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Familiyangizni kiriting"
                  required
                  className="w-full px-4 mt-2 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-600"
                >
                  Email
                </label>
                <input
                  ref={email}
                  onKeyDown={handleEnter}
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Emailingizni kiriting"
                  required
                  className="w-full px-4 mt-2 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-semibold text-gray-600"
                >
                  Telefon raqam
                </label>
                <input
                  ref={phone}
                  type="tel"
                  id="phoneNumber"
                  onKeyDown={handleEnter}
                  onChange={handlePhoneNumberChange}
                  name="phoneNumber"
                  defaultValue={'998'}
                  required
                  className="w-full px-4 mt-2 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-semibold text-gray-600"
                >
                  Yangi parol kiriting
                </label>
                <div className="flex items-center border rounded-lg mt-2">
                  <input
                    ref={password}
                    type={showpassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    onKeyDown={handleEnter}
                    placeholder="Parolni qayta kiriting"
                    required
                    className="w-full px-4 py-2 text-sm rounded-lg "
                  />
                  <span
                    onClick={() => setShowpassword(!showpassword)}
                    className="px-3 cursor-pointer text-gray-800"
                  >
                    {showpassword ? (
                      <AiOutlineEye />
                    ) : (
                      <AiOutlineEyeInvisible />
                    )}
                  </span>
                </div>

                <p className="text-xs mt-2">
                  Parol kamida 5 ta belgidan iborat
                </p>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-semibold text-gray-600"
                >
                  Parolni tasdiqlang
                </label>

                <div className="flex items-center border rounded-lg mt-2">
                  <input
                    ref={confirmPassword}
                    type={showconfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Parolni qayta kiriting"
                    required
                    onKeyDown={handleEnter}
                    className="w-full px-4 py-2 text-sm rounded-lg "
                  />
                  <span
                    onClick={() => setShowconfirmPassword(!showconfirmPassword)}
                    className="px-3 cursor-pointer text-gray-800"
                  >
                    {showconfirmPassword ? (
                      <AiOutlineEye />
                    ) : (
                      <AiOutlineEyeInvisible />
                    )}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="gender"
                  className="block text-sm font-semibold text-gray-600"
                >
                  Jins
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={genderValue}
                  onChange={(e) => setGenderValue(e.target.value)}
                  required
                  className="w-full px-4 mt-2 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                >
                  <option value="" disabled>
                    Jinsni tanlang
                  </option>
                  <option value="MALE">Erkak</option>
                  <option value="FEMALE">Ayol</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="flex items-center">
                  <input
                    ref={offer}
                    required
                    type="checkbox"
                    name="acceptedTerms"
                    className="form-checkbox h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    Foydalanish shartlarini qabul qilaman.
                    <Link
                      to={'/auth/offer'}
                      className="text-blue-600 hover:underline"
                    >
                      Offer
                    </Link>
                  </span>
                </label>
              </div>

              <button
                onClick={signUpPost}
                type="submit"
                disabled={isSubmitting} 
                className={`w-full text-white py-2 px-4 rounded-lg ${
                  isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                } focus:outline-none focus:bg-blue-600`}
              >
                {isSubmitting ? 'Yuborilmoqda...' : 'Tasdiqlash'}
              </button>
            </div>

            <div className="flex justify-center items-center mt-4 lg:mt-6">
              <Link
                to={'/auth/SignIn'}
                className="text-sm text-blue-500 hover:underline"
              >
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
