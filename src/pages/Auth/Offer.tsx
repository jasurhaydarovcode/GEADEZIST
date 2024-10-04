import { FaArrowLeft } from "react-icons/fa";

const OfferPage = () => {
  return (
    <div className="bg-geadezist-100">
      <div className="container">
        <div>
          <div>
            <FaArrowLeft />
            <h1 className="text-3xl font-bold text-center text-blue-900 dark:text-gray-100 mb-6">Ommaviy Oferta Sahrtlari</h1>
          </div>
          <div className="text-gray-800 space-y-4">
            <h2 className="text-xl font-bold">Foydalanuvchi Shartnomasi</h2>
            <p>GTC — “Geodetic Testing System” test dasturidan foydalanishning qoida va shartlari...</p>

            <h3 className="text-lg font-semibold">Umumiy Qoidalar</h3>
            <p>Ushbu foydalanuvchi shartnomasi bir vaqtning uzida ...</p>

            <h4 className="text-base font-bold">1. Shartnoma Predmeti</h4>
            <p>1.1. Ushbu Shartnoma...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferPage;
