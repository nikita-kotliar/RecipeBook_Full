import { lazy, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { getUserInfo } from "../redux/auth/operations.js";
import {
  selectAuthErrorMessage,
  selectAuthSuccessMessage,
  selectToken,
} from "../redux/auth/selectors.js";
import { setLoggedIn } from "../redux/auth/slice.js";
import PrivateRoute from "./PrivateRoute.jsx";
import RestrictedRoute from "./RestrictedRoute.jsx";
import SharedLayout from "./SharedLayout/SharedLayout.jsx";
const HomePage = lazy(() => import("../pages/HomePage/HomePage.jsx"));
const SignInPage = lazy(() => import("../pages/SignInPage/SignInPage.jsx"));
const SignUpPage = lazy(() => import("../pages/SignUpPage/SignUpPage.jsx"));
const RecipesPage = lazy(() => import("../pages/RecipesPage/RecipesPage.jsx"));
const GoogleSuccess = lazy(
  () => import("../components/GoogleSuccess/GoogleSuccess.jsx")
);
const NotFoundPage = lazy(
  () => import("../pages/NotFoundPage/NotFoundPage.jsx")
);

function App() {
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  const authErrorMessage = useSelector(selectAuthErrorMessage);
  const authSuccessMessage = useSelector(selectAuthSuccessMessage);

  useEffect(() => {
    if (token) {
      dispatch(getUserInfo());
      dispatch(setLoggedIn(true));
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (authErrorMessage) toast.error(authErrorMessage);
    if (authSuccessMessage) toast.success(authSuccessMessage);
  }, [authSuccessMessage, authErrorMessage]);

  return (
    <SharedLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/google-success" element={<GoogleSuccess />} />

        <Route
          path="/signup"
          element={
            <RestrictedRoute redirectTo="/recipes" component={<SignUpPage />} />
          }
        />
        <Route
          path="/signin"
          element={
            <RestrictedRoute redirectTo="/recipes" component={<SignInPage />} />
          }
        />
        <Route
          path="/recipes/*"
          element={
            <PrivateRoute redirectTo="/signin" component={<RecipesPage />} />
          }
        />        

        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Toaster
        toastOptions={{
          style: {
            padding: "16px",
            fontWeight: "700",
            color: "white",
            borderRadius: "15px",
            backgroundColor: "#323F47",
          },
          success: {
            iconTheme: {
              primary: "#9BE1A0",
              secondary: "#FFF",
            },
          },
          error: {
            iconTheme: {
              primary: "#EF5050",
              secondary: "#F0EFF4",
            },
          },
        }}
        position="top-right"
      />
    </SharedLayout>
  );
}

export default App;
