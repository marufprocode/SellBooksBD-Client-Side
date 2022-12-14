import axios from "axios";
import { useEffect, useState } from "react";

const useToken = (email) => {
  const [token, setToken] = useState("");
  useEffect(() => {
    axios.post('https://sellbooks-second-hand-books-selling-website.vercel.app/jwt', {email})
    .then(res => {
        if(res.data.token){
            // localStorage.setItem("accessToken", res.data.token);
            setToken(res.data.token);
        }
    }).catch(err => console.error('[error]:', err))
  }, [email]);
  return [token];
};

export default useToken;