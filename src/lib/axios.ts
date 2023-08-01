import axios from "axios";
import { useAuthHeader } from "react-auth-kit";

const authApi = axios.create({
  baseURL: `${import.meta.env.VITE_APIURL}`,
});
export const useAuthApi = () => {
  const authHeader = useAuthHeader();
  return () => {
    authApi.defaults.headers.common["Authorization"] = authHeader();
    return authApi;
  };
};
export const api = axios.create({
  baseURL: `${import.meta.env.VITE_APIURL}`,
});
