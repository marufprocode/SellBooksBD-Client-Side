// import { useQuery } from "@tanstack/react-query";
/* import axios from "axios";
import { useEffect, useState } from "react";


const useUserRole = (email) => {
    const [userRole, setUserRole] = useState(null);
    const [isVerified, setIsVerified] = useState(false); 
    const [isUserRoleLoading, setIsUserRoleLoading] = useState(true);
    useEffect(()=>{
        axios.get(`https://sellbooks-second-hand-books-selling-website.vercel.app/users/role/${email}`, {
            headers:{
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res => {
            setUserRole(res.data.role);
            setIsVerified(res.data.verified);
            setIsUserRoleLoading(false);
        }).catch(err => console.error('[error]:', err))
    },[email])
    return [userRole, isUserRoleLoading, isVerified];
} */
/* const useUserRole = (email) => {
    const [userRole, setUserRole] = useState(null);
    const [isVerified, setIsVerified] = useState(false); 
    const [isUserRoleLoading, setIsUserRoleLoading] = useState(true);
    const {data, isLoading} = useQuery({
        enabled: !!email,
        queryKey:['userRole'],
        queryFn: async () => {
            const response = await axios.get(`https://sellbooks-second-hand-books-selling-website.vercel.app/users/role/${email}`, {
                headers:{
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            })
            const data = response.data;
            setUserRole(data?.role);
            setIsVerified(data?.verified);
            setIsUserRoleLoading(isLoading);
            return data;
        }
    })
    console.log(userRole, isUserRoleLoading, isVerified);
    return [userRole, isUserRoleLoading, isVerified];
} */

// export default useUserRole;