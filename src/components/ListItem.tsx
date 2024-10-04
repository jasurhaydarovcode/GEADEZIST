import { ListType } from "@/helpers/types/ListType"

const ListItem: React.FC<ListType> = ({ listname }):JSX.Element => {
    return (
        <li>
            <a  className="block py-2 px-3 text-blue bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 " aria-current="page">{listname}</a>
        </li>
    )
}

export default ListItem