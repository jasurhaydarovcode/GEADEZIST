import { Logo } from "@/helpers/imports/images"
import { Link } from "react-router-dom"
import ListItem from "./ListItem"

const Navbar = (): JSX.Element => {
    const lists = ['Home', 'About','Services','Contact']
    return (
        <nav className="bg-white shadow-lg fixed w-full border-gray-200">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto h-16">
                <Link to={'/'} className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src={Logo} className="h-5" alt="Flowbite Logo" />
                </Link>
                <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        {lists.map((item) => {
                            return (
                               <ListItem listname={item}/>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar