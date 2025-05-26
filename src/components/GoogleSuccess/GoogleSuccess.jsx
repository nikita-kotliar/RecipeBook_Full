import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setToken } from "../../redux/auth/slice.js";

const GoogleSuccess = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const accessToken = params.get("accessToken");
      
        if (accessToken) {
          dispatch(setToken({ token: accessToken }));
          navigate("/recipes");
        }
      }, [dispatch, navigate]);
      

    return <div>Авторизація через Google!</div>;
};

export default GoogleSuccess;
