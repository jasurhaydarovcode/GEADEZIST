import { Link } from 'react-router-dom';

const ClientQuizResult = () => {
    return (
        <div className="bg-white flex flex-col items-center dark:bg-[#24303F] w-[100%] rounded-xl p-5">
            <div className="flex justify-center items-center flex-col">
                <p className="text-4xl font-bold text-red-600 dark:text-[#3C50E0]">Табриклаймиз!</p>
                <div className="tenor-gif-embed" data-postid="9526867700513320718" data-share-method="host"
                    data-aspect-ratio="1" data-width="100%">
                    <img src="https://media.tenor.com/hDY7src9Lw4AAAAi/dear-harsh-beta.gif" alt="sertificate img" />
                </div>
                <div>
                    <p className={`text-center my-3 dark:text-white`}>
                        Тест ишлаш жараёни муваффақиятли якунланди. {" "}
                        <Link className="text-blue-600 hover:underline" to={'/client/dashboard'}>Бош саҳифага</Link>
                        {" "}
                        қайтиб, тест натижаси билан танишишингиз мумкин.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ClientQuizResult;
