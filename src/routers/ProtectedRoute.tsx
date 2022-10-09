import { Navigate } from "react-router-dom";
import AuthenticationService from "../service/authenticationService";

export type ProtectedRouteProps = {
  authenticationPath: string;
  outlet: JSX.Element;
  permissions: string;
};

export default function ProtectedRoute({
  authenticationPath,
  outlet,
  permissions,
}: ProtectedRouteProps) {
  const authenticationService = new AuthenticationService();
  if (authenticationService.isAuthenticate()) {
    if (!authenticationService.canAccess(permissions)) {
      return <Navigate to={{ pathname: "/unauthorized" }} />;
    } else {
      return outlet;
    }
  } else {
    return <Navigate to={{ pathname: authenticationPath }} />;
  }
}
