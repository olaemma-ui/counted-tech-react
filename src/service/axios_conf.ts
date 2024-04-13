import axios from "axios";
import { LocalStoragekey } from "../_constants/enums";
import { LocalStorageService } from "./local_storage";




  const axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_COUNTEDT_TECH_COMPANY_URL,
      timeout: 100000,
      headers: {
          "Content-Type": "multipart/form-data"
      }
  });

  // Add a request interceptor
  axiosInstance.interceptors.request.use(
    config => {
      console.log('url = ',config.url);
      
      // Perform actions before the request is sent
      if(!config.url?.includes('login') && !config.url?.includes('register')){
        config.headers.Authorization = `Bearer ${LocalStorageService.getItem(LocalStoragekey.BEARER_TOKEN)}`;
      }

      return config;
    },
  );

  // Add a resppnse interceptor

  axiosInstance.interceptors.response.use(
    response => response,
    error =>{
      const status = error.response ? error.response.status : null;

      if (status === 401) {
        window.location.assign('/');
        LocalStorageService.clear();
      }
    }
  );
  

  function toFormData(obj: object) {
    const formData = new FormData();
    Object.entries(obj).forEach(([key, value]) => {
      formData.append(key, value);
    });
    return formData;
  }
  


  export {axiosInstance, toFormData};