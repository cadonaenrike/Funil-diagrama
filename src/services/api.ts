import axios from "axios";

const api = axios.create({
  // baseURL: "https://funnelads.vercel.app",
  // baseURL: "https://server-oqb147cum-softus.vercel.app",
  // baseURL: "https://server-self-pi.vercel.app",
  baseURL: "https://serve-anderson-tavares-projects.vercel.app",
  headers: {
    "content-type": "application/json",
    "api-key": import.meta.env.VITE_APY_KEY,
  },
});

export default api;
