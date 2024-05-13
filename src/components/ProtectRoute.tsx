import { Navigate } from "react-router-dom";
import { LogInContex } from "../App";
import { useContext } from "react";

interface ProtectRouteProps {
  children: JSX.Element;
}

function ProtectRoute({ children }: ProtectRouteProps) {
  const { logIn } = useContext(LogInContex);
  return logIn ? children : <Navigate to="/login" />;
}

export default ProtectRoute;
