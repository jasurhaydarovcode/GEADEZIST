import { Logo, registerRasm } from "@/helpers/imports/images"; // Tasvirlarni import qilish

function ResetPassword() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col lg:flex-row w-full lg:w-5/6 lg:h-5/6 bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Chap tomoni: Tasvir va Logo */}
        <div className="lg:w-3/5 w-full flex flex-col items-center justify-center bg-gray-50 p-8">
          <img src={Logo} alt="Logo" className="w-30 lg:w-48 mb-4 lg:mb-8" />
          <div className="w-40 lg:w-60">
            <img src={registerRasm} alt="Phone Illustration" />
          </div>
        </div>

        {/* O'ng tomoni: Parolni almashtirish formasi */}
        <div className="flex justify-center items-center w-full lg:w-3/5 p-6 lg:p-8">
          <div className="w-full">
            <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4 lg:mb-6">
              Parolni almashtirish
            </h2>
            <form>
              {/* Tasdiqlash kodi */}
              <div className="mb-4">
                <label htmlFor="code" className="block text-sm font-semibold text-gray-600">
                  Tasdiqlash kodi
                </label>
                <input
                  type="text"
                  id="code"
                  placeholder="Tasdiqlash kodini kiriting"
                  className="w-full px-4 mt-2 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
              </div>

              {/* Yangi parol */}
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-semibold text-gray-600">
                  Parol
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Yangi parolingizni kiriting"
                  className="w-full px-4 mt-2 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
              </div>

              {/* Parolni tasdiqlash */}
              <div className="mb-6">
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-600">
                  Parolni tasdiqlang
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Parolni tasdiqlang"
                  className="w-full px-4 mt-2 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
              </div>

              {/* Saqlash tugmasi */}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                Parolni saqlash
              </button>
            </form>

            {/* Quyidagi havolalar */}
            <div className="flex justify-center items-center mt-4 lg:mt-6">
              <p className="text-sm text-black ">
                Hisobingiz bormi ?
              </p>
              <a href="/auth/SignIn" className="text-sm text-blue-500 hover:underline">
                 Ro'yhatdan o'tish    
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;

