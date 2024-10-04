import axios from "axios"
import { AxiosResponse } from "axios";

const AdminScreen = (): JSX.Element => {
    function getApi () : void {
        axios.get('url')
            .then((res: AxiosResponse) => {console.log(res);
            })
    }
    return (
        <div></div>
    )
}

export default AdminScreen