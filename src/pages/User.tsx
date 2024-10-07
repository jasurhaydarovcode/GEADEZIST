import Layout from "@/components/Dashboard/Layout";
import { FcSearch } from "react-icons/fc";
import { SlArrowDown } from "react-icons/sl";
import { Link } from "react-router-dom";

function User() {
  return (
    <Layout>
      <div>
        <div className="flex justify-end pt-10 pr-6">
          <div className="px-8">
            <div className="w-full">
              {/* nav */}
              <header className="flex items-center justify-between">
                <h3 className="font-bold text-[27px]">Foydalanuvchilar natejasi</h3>
                <div className="flex gap-2 text-[18px]">
                  <Link to={'/dashboard'}>
                    <h4>Boshqaruv paneli </h4>
                  </Link>
                  <h4> / </h4>
                  <h4 className="text-blue-600"> Foydalanuvchilar</h4>
                </div>
              </header>
              {/* nav */}

                {/* sort */}
                <div className="flex justify-end pt-5 gap-5">
                  <div className="flex">
                    <label htmlFor="inp1">
                      <FcSearch className="absolute mt-4 ml-3 text-[20px]" />
                    </label>
                    <input
                      type="text"
                      id="inp1"
                      className="pl-10  bg-[] border-gray-300 rounded-md h-[50px] "
                      placeholder="Foydalanuvchini qidirish"
                    />
                  </div>
                  <div className="flex">
                    <input type="text" className="w-[350px] rounded-md h-[50px] placeholder:font-extralight placeholder-gray-400 border-gray-400  placeholder:text-[14px] " placeholder="Tumanni tanlang" />
                    <SlArrowDown className="absolute ml-[320px] mt-4" />
                  </div>
                  <select className="w-[350px] text-gray-400 bg-[] rounded-md h-[50px] placeholder:font-extralight placeholder-gray-400 border-gray-400  placeholder:text-[14px] ">
                    <option value="">hello</option>
                    <option value="">byey</option>
                    <option value="">mthf</option>
                  </select>
                </div>
                {/* sort */}
                <div></div>
              </div>
            </div>
          </div>
        </div>

    </Layout>
  );
}

export default User;
