import { AdminScreenType } from "@/helpers/types/AdminScreenType"
import Button from "./btn"

const Sidebar: React.FC<AdminScreenType> = ({children}): JSX.Element => {
    return (
        <div>

            <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200">
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>

            <aside id="default-sidebar" className="fixed top-16 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <div className="h-full shadow-lg px-3 py-4 overflow-y-auto bg-white ">
                    <ul className="space-y-4 font-medium">
                        <li>
                            <Button
                                btnBorder="1px solid #E5E7EB"
                                btnText="Boshqaruv Paneli"
                                btnWidth="230px"
                                btnHeight="50px"
                                btnBg="bg-blue-700"
                                btnColor="text-white"
                                className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100 group"
                            />
                        </li>

                    </ul>
                </div>
            </aside>

            <div className="p-4 relative top-20 -z-10 sm:ml-64">
                {children}
            </div>

        </div>
    )
}

export default Sidebar