import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

function Archive() {
  const navigate = useNavigate()
  function checkRoleClient() {
    const role = localStorage.getItem('role')
    if (role == 'ROLE_CLIENT') {
      navigate('/client/dashboard')
    } 
  }
  useEffect(() => {
    checkRoleClient()
  }, [checkRoleClient])
  return (
    <div>Archive</div>
  );
}

export default Archive;
