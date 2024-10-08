import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

function checkLogin(){
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    useEffect(() => {
      if(!token){
        navigate('/auth/SignIn')
      }
    }, [token])
}

export default checkLogin