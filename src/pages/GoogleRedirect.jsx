import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { setCredentialsGoogle } from "redux/authSlice";

const GoogleRedirect = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get("token");
    const user = query.get("user");

    if (token && user) {
      const parsedUser = JSON.parse(decodeURIComponent(user));

      dispatch(setCredentialsGoogle({
        user: parsedUser,
        accessToken: token,
      }));

      navigate("/"); // Перенаправлення після входу
    } else {
      navigate("/login"); // Якщо щось пішло не так
    }
  }, [dispatch, location.search, navigate]);

  return <div>Redirecting...</div>;
};

export default GoogleRedirect;
