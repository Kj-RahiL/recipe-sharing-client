import { getNewAccessToken } from "@/services/AuthService";
import { Nexios } from "nexios-http";
import { cookies } from "next/headers";


const nexiosInstance = new Nexios({
  //  baseURL: " http://localhost:5000/api",
  baseURL: "https://recipe-sharing-server-olive.vercel.app/api", 
  timeout: 10000,
  headers: {
    "Content-type": "application/json",
  },
});
nexiosInstance.interceptors.request.use((config) =>{

  const accessToken = cookies().get("accessToken")?.value;
  if (accessToken) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${accessToken}`,
    };
  }

  return config;
}
  
);

nexiosInstance.interceptors.response.use(
  (response) => {
    return response; // Return response if successful
  },
  async (error) => {
    const config = error.config;

    // If access token is expired and request hasn't been retried
    if (error?.response?.status === 401 && !config?.sent) {
      config.sent = true; 

      try {
        const res = await getNewAccessToken(); 
        const accessToken = res.token;
        config.headers["Authorization"] = `Bearer ${accessToken}`; 
     
        return config
      } catch (refreshError) {
        return Promise.reject(refreshError); 
      }
    }

    return Promise.reject(error); 
  }
);

export default nexiosInstance
