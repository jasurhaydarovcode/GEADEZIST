import { baseUrl } from "@/helpers/api/baseUrl";
import { registerRasm } from "@/helpers/imports/images";
import { Logo } from "@/helpers/imports/images";
import { ConfirmType} from "@/helpers/types/LoginType";
import axios from "axios";
import { useRef} from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Confirm() {
    const email = useRef<HTMLInputElement | null>(null);
    const navigate = useNavigate();

    function forgetPassword() {

      if (!email.current?.value) {
        toast.error("Iltimos, elektron pochtangizni kiriting!");
        return;
      }
     if(!email.current?.value.includes("@gmail.com")) {
        toast.error("Iltimos, emailni to'liq kiriting!");
        return;
      }

      const data : ConfirmType = {
        email: email.current?.value,
      };
      axios.put(`${baseUrl }auth/forgot-password`,data)
      .then((res) => {
          const data = res.data as { status: string; message: string };
          if(data.status === 'OK') {
            toast.success("Emailga code yuborildi");
            navigate("/auth/reset-password");
            console.log(data.message);
            
        }})
        .catch((err) => {
          if(err.response?.status === 404) {
            toast.warning('Emailni togri kiritmadingiz!');
        }
        else {
          toast.error('Qayta tekshirib ko\'ring!');
        }
      })
    }

  return(

    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col lg:flex-row w-full lg:w-5/6 lg:h-5/6 bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Left side with logo and image */}
        <div className="lg:w-2/5 w-full flex flex-col items-center justify-center bg-gray-50 p-8">
          <img src={Logo} alt="Logo" className="w-30 lg:w-48 mb-4 lg:mb-8" />
          <div className="w-40 lg:w-60">
            <img src={registerRasm} alt="Phone Illustration" />
          </div>
        </div>

        {/* Right side with form */}
        <div className="lg:w-3/5 w-full flex flex-col justify-center items-center p-8">
          <div className="w-full lg:w-5/6">
            <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4 lg:mb-6">
              Parolingizni o'zgartirish uchun elektron pochtangizni kiriting
            </h2>
            <div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-semibold text-gray-600">
                  Elektron pochtangizni kiriting
                </label>
                <input
                  ref={email}
                  type="email"
                  id="email"
                  placeholder="Elektron pochtangizni kiriting"
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
  );
}

export default Confirm;
