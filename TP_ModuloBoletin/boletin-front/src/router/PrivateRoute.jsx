import { Navigate } from "react-router-dom";
import { useAuthStore } from "../hook/useAuthStore";

export const PrivateRoute = ({children}) => {


  const {status} = useAuthStore();

  return (status === 'authenticated') 
  ? children 
  : <Navigate to="/login" />;
};
