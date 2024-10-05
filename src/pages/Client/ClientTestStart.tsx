// ClientTestStart.tsx
import Layout from "@/components/clientDashboard/laytout";
import PreviewOverlay from "@/components/PreviewOverlay";

const testData = [
  {
    title: "Umumiy Geodeziya",
    time: "60 (daq.)",
    questions: "20 ta",
    retry: "3 kundan keyin",
    imgSrc: "https://via.placeholder.com/382x192",
  },
  {
    title: "Tepografiya",
    time: "60 (daq.)",
    questions: "20 ta",
    retry: "3 kundan keyin",
    imgSrc: "https://via.placeholder.com/382x192",
  },
];

function ClientTestStart() {
  return (
    <Layout>
      <div className="text-center text-red-600 text-4xl font-extrabold mb-8">Yo'nalishlar</div>

      <div className="flex flex-col space-y-8">
        {testData.map((test, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row border rounded-lg shadow-xl p-6 bg-white hover:bg-gray-50 transition-colors duration-300"
          >
            {/* Image and Overlay Section */}
            <div className="relative group w-full md:w-1/3 h-48 md:h-auto">
              <img
                src={test.imgSrc}
                alt={test.title}
                className="w-full h-full rounded-lg object-cover"
              />
              <PreviewOverlay />
            </div>

            {/* Details Section */}
            <div className="mt-6 md:mt-0 md:ml-8 w-full md:w-2/3 flex flex-col justify-between">
              {/* Labels and Values Container */}
              <div className="flex flex-col md:flex-row">
                {/* Labels */}
                <div className="md:w-1/2">
                  <h2 className="text-xl text-gray-700 font-extrabold mb-4">Yo'nalish:</h2>
                  <p className="text-lg mb-2">Test ishlashga ajratilgan vaqt:</p>
                  <p className="text-lg mb-2">Savollar soni:</p>
                  <p className="text-lg">Qayta topshirish vaqti:</p>
                </div>

                {/* Values */}
                <div className="md:w-1/2">
                  <h2 className="text-xl text-gray-700 font-extrabold mb-4">{test.title}</h2>
                  <p className="text-lg mb-2">
                    <span className="font-semibold">{test.time}</span>
                  </p>
                  <p className="text-lg mb-2">
                    <span className="font-semibold">{test.questions}</span>
                  </p>
                  <p className="text-lg">
                    <span className="font-semibold">{test.retry}</span>
                  </p>
                  {/* Start Button */}
                  <div className="mt-6">
                    <button className="bg-gray-700 text-white text-lg py-2 px-6 rounded-lg hover:bg-gray-800 transition-colors duration-300">
                      Boshlash
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default ClientTestStart;
