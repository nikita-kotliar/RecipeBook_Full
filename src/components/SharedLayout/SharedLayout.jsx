import { Suspense } from "react";
import LoaderComponent from "../LoaderComponent/LoaderComponent.jsx";
import css from "./SharedLayout.module.css";

const SharedLayout = ({ children }) => {
  return (
    <div className={css.container}>
      <Suspense fallback={<LoaderComponent />}>{children}</Suspense>
    </div>
  );
};

export default SharedLayout;
