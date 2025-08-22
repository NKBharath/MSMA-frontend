import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.MODE === "development"
        ? "http://localhost:3000/api"
        : "https://msma-backend.onrender.com/api",
});

API.interceptors.request.use((req)=>{
    const token = localStorage.getItem("token");
    if(token){
        req.headers.Authorization=`Bearer ${token}`;
    }
    return req;
});

export default API;