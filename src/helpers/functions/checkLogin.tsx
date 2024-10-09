import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

function CheckLogin(){
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    useEffect(() => {
      if(!token){
        navigate('/auth/SignIn')
      }
    }, [token, navigate])
}

export default CheckLogin