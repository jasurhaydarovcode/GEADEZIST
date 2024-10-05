// components/clientDashboard/Sidebar.tsx
import { Logo } from "@/helpers/imports/images";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {

    const clientSidebarItems = [
        {
            label: "Boshqaruv paneli",
            path: "/client/dashboard"
        },
        {
            label: "Test",
            path: "/client/test/start"
        }
    ];

    return (
        <div className="w-80 bg-gray-100 px-4 py-8">
            <Link to={"/client/dashboard"}>
                <img src={Logo} className="w-52" alt="Geodeziya Logo" />
            </Link>

            {/* Client Sidebar content here */}
            <ul className="mt-20">
                {clientSidebarItems.map((item, index) => (
                    <Link to={item.path} key={index}>
                        <li className="border shadow-xl hover:shadow-2xl hover:bg-gray-200 transition duration-150 py-5 mb-5"><span className="p-4 text-xl text-gray-500">{item.label}</span></li>
                    </Link>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
