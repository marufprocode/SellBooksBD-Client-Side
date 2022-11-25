import axios from "axios";
import { useEffect, useState } from "react"


const useUserRole = (email) => {
    const [userRole, setUserRole] = useState(null);
    const [isUserRoleLoading, setIsUserRoleLoading] = useState(true);
    useEffect(()=>{
        axios.get(`http://localhost:5000/users/role/${email}`, {
            headers:{
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res => {
            setUserRole(res.data.role);
            setIsUserRoleLoading(false);
        }).catch(err => console.error('[error]:', err))
    },[email])
    return [userRole, isUserRoleLoading];
}

export default useUserRole;