import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthenticated, selectToken } from "../redux/auth/selectors";

const PrivateRoute = ({ component, redirectTo = "/" }) => {
  const token = useSelector(selectToken);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (token || isAuthenticated) ? component : <Navigate to={redirectTo} />;
};

export default PrivateRoute;
