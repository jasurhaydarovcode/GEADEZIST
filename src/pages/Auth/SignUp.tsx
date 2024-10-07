
import { Logo, registerRasm } from "@/helpers/imports/images"; // Tasvirlarni import qilish
import { Link } from "react-router-dom";

function SignUp() {

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col lg:flex-row w-full lg:w-5/6 lg:h-5/6 bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Chap qism: Tasvir va Logo */}
        <div className="lg:w-3/5 w-full flex flex-col items-center justify-center bg-gray-50 p-8">
          <img src={Logo} alt="Logo" className="w-30 lg:w-48 mb-4 lg:mb-8" />
          <div className="w-40 lg:w-60">
            <img src={registerRasm} alt="Phone Illustration" />
          </div>
        </div>

        {/* O'ng qism: Ro'yxatdan o'tish formasi */}
        <div className="flex justify-center items-center w-full lg:w-3/5 p-6 lg:p-8">
          <div className="w-full">
            <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4 lg:mb-6">
              Ro'yxatdan o'tish
            </h2>
            <form>
              <div className="mb-4">
                <label htmlFor="firstName" className="block text-sm font-semibold text-gray-600">
                  Ism
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="Ismingizni kiriting"
                  required
                  className="w-full px-4 mt-2 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
              </div>

              {/* Familiya */}
              <div className="mb-4">
                <label htmlFor="lastName" className="block text-sm font-semibold text-gray-600">
                  Familiya
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Familiyangizni kiriting"

                  required
                  className="w-full px-4 mt-2 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
              </div>

              {/* Telefon raqam */}
              <div className="mb-4">
                <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-600">
                  Telefon raqam
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="+998 XX XXX XX XX"

                  required
                  className="w-full px-4 mt-2 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
              </div>

              {/* Parol */}
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-semibold text-gray-600">
                  Parol
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Yangi parolni kiriting"
                  required
                  className="w-full px-4 mt-2 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
                <p className="text-xs ">Parol kamida 5 ta belgidan iborat</p>

              </div>

              {/* Parolni tasdiqlash */}
              <div className="mb-4">
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-600">
                  Parolni tasdiqlang
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Parolni qayta kiriting"
                  required
                  className="w-full px-4 mt-2 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
              </div>

              {/* Jins */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-600">Jins</label>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      required
                      className="form-radio h-4 w-4 text-blue-600"
                    />
                    <span className="ml-2 text-sm text-gray-600">Erkak</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      required
                      className="form-radio h-4 w-4 text-blue-600"
                    />
                    <span className="ml-2 text-sm text-gray-600">Ayol</span>
                  </label>
                </div>
              </div>

              {/* Offertani qabul qilish */}
              <div className="mb-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="acceptedTerms"
                    className="form-checkbox h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    Foydalanish shartlarini qabul qilaman.<Link to={'/auth/offer'} className="text-blue-600 hover:underline">Offer</Link>
                  </span>
                </label>
              </div>
              {/* Ro'yxatdan o'tish tugmasi */}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                Ro'yxatdan o'tish
              </button>
            </form>

            {/* Quyidagi havolalar */}
            <div className="flex justify-between items-center mt-4 lg:mt-6">
              <Link to={"/auth/SignIn"} className="text-sm text-blue-500 hover:underline">
                Tizimga kirish
              </Link>
              <Link to={"/auth/confirm"} className="text-sm text-blue-500 hover:underline">
                Parolni unutdingizmi?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
