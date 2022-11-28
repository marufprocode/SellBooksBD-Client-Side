import axios from "axios";

const getAccessToken = (email) => {
  axios
    .post(
      "https://sellbooks-second-hand-books-selling-website.vercel.app/jwt",
      { email }
    )
    .then((res) => {
      if (res.data.token) {
        localStorage.setItem("accessToken", res.data.token);
      }
    })
    .catch((err) => console.error("[error]:", err));
};

export default getAccessToken;
