import axios from 'axios';

    const baseURL = process.env.NODE_ENV === "development" ?'http://localhost:3000':'http://localhost:5000';

const axiosInstance = axios.create({
    baseURL:baseURL,
    timeout:8000,
    // headers:{}
});

axiosInstance.interceptors.response.use(
    (response) => {
        const result = response.data;
        if(result.status === 0){
            return result.data || {};
        }else{
            return Promise.reject(result.msg) || "请求失败"
        }
    },
    (error) => {
        console.log(error);
        return Promise.reject("网络出现错误，请刷新试试")
    }
);

export default axiosInstance;