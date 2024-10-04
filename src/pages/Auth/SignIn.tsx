import { registerRasm } from "@/helpers/imports/images";
import { Logo } from "@/helpers/imports/images";

function SignIn() {
  return (
    <div>
      <div className="h-screen  flex items-center justify-center bg-gray-100">
      <div className="flex bg-white shadow-lg rounded-lg overflow-hidden">
        <div className=" w-3/5  flex flex-col items-center justify-center bg-gray-50 p-8">
          <img src={Logo} alt="Logo" className="w-32 mb-8" />
          <div className="w-48">
            <img src={registerRasm} alt="Phone Illustration" />
          </div>
        </div>
        <div className="w-3/5 p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Тизимга кириш</h2>
          <div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-semibold text-gray-600">
                Электрон почта
              </label>
              <input
                type="email"
                id="email"
                placeholder="Электрон почтангизни киритинг"

                className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-semibold text-gray-600">
                Парол
              </label>
              <input
                type="password"
                id="password"
                placeholder="Паролни киритинг"
                className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
              <small className="text-gray-500">
                Парол камида 5 та харф ёки рақамдан иборат бўлиши керак
              </small>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Тизимга кириш
            </button>
          </div>

          <div className="flex justify-between items-center mt-6">
            <a href="/register" className="text-sm text-blue-500 hover:underline">
              Рўйхатдан ўтиш
            </a>
            <a href="/forgot-password" className="text-sm text-blue-500 hover:underline">
              Паролни унутдингизми?
            </a>
          </div>
        </div>
      </div>
    </div>

    </div>
  )
}

export default SignIn;
