import Axios from "axios";

const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_DEV_URL,
//   withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axios;
