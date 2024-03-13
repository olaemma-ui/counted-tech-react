import axios from "axios";
import { LocalStoragekey } from "../_constants/enums";
import { LocalStorageService } from "./local_storage";




  const axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_COUNTEDT_TECH_COMPANY_URL,
      timeout: 6000,
      headers: {
          "Content-Type": "multipart/form-data"
      }
  });

  // Add a request interceptor
  axiosInstance.interceptors.request.use(
    config => {
      // Perform actions before the request is sent
      if(!config.url?.includes('login') || !config.url?.includes('register')){
        config.headers.Authorization = `Bearer ${LocalStorageService.getItem(LocalStoragekey.BEARER_TOKEN)}`;
      }
      return config;
    },
  );
  

  function toFormData(obj: object) {
    const formData = new FormData();
    Object.entries(obj).forEach(([key, value]) => {
      formData.append(key, value);
    });
    return formData;
  }
  


  export {axiosInstance, toFormData};