import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"
import { AdminScreenType } from "@/helpers/types/AdminScreenType"

const AdminScreen: React.FC<AdminScreenType> = ({ children }): JSX.Element => {
    return (
        <div>
            <Navbar />
            <Sidebar children={children}/>
        </div>
    )
}

export default AdminScreen