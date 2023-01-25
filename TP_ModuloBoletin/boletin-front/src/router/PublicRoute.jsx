import { Navigate } from "react-router-dom";
import { useAuthStore } from "../hook/useAuthStore";

export const PublicRoute = ({children}) => {


  const {status} = useAuthStore();

  return (status === 'not-authenticated') 
  ? children 
  : <Navigate to="/dashboard" 
  />;
};
