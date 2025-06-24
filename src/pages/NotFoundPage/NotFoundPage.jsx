import css from "./NotFoundPage.module.css";
import { useNavigate } from "react-router-dom";
import LoaderComponent from "../../components/LoaderComponent/LoaderComponent.jsx";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/", { replace: true });
  };

  return (
    <section className={css.Section404}>
      <LoaderComponent />
      <h1 className={css.Slogan404}>404</h1>
      <div className={css.ContantBox404}>
        <p className={css.mesage404}>{`Look like you're lost the page!`}</p>
        <button onClick={goToHome} className={css.link404}>
          Go to Home
        </button>
      </div>
    </section>
  );
};

export default NotFoundPage;
