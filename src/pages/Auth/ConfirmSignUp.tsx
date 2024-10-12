import { baseUrl } from '@/helpers/api/baseUrl'
import { Logo, registerRasm } from '@/helpers/imports/images'
import axios from 'axios'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const ConfirmSignUp = () => {
  const navigate = useNavigate()
  const code = useRef<HTMLInputElement>(null)

  function forgetPassword() {

    if (!code.current?.value) {
      toast.warning('Kodni kiriting')
      return
    }
    if (code.current?.value.length < 5) {
      toast.warning('Kod kamida 5 ta raqamdan iborat')
      return
    }
    axios.put(`${baseUrl}auth/activate?code=${code.current?.value}`)
    .then((res) => {
      toast.success("Yaxshi")
      console.log(res.data)
      navigate('/auth/SignIn')
    })
    .catch((err) => {
     if(err.response?.status === 404) {
      toast.warning('Kod tog`ri kelmadi!')
     }
     else {
      toast.error('Qayta tekshirib ko`ring!')
     }
    })
  }
  return (
    <div>
        <div className="h-screen flex items-center justify-center bg-gray-100">
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
                Yangi foydalanuvchini tasqidlash uchun Emailga code yuborildi!
              </h2>
              <div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-600">
                    Codeni kiriting
                  </label>
                  <input
                    ref={code}
                    type="text"
                    placeholder="Elektron pochtaga yuborilgan codeni kiriting"
                    className="w-full px-4 py-2 mt-4 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  />
                </div>
                <button
                  onClick={forgetPassword}
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                  Tasdiqlash
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmSignUp;
