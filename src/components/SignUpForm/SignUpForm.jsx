import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import GoogleBtn from "../GoogleBtn/GoogleBtn.jsx";
import styles from "./SignUpForm.module.css";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import svgSprite from "../../assets/icons.svg";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../../redux/auth/operations";
import { selectIsLoading } from "../../redux/auth/selectors.js";
import LoaderComponent from "../LoaderComponent/LoaderComponent.jsx";
import SignFormFooter from "../SignFormFooter/SignFormFooter";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher.jsx";


const SignUpForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRepeat, setshowPasswordRepeat] = useState(false);

  const schemaValidation = Yup.object({
    email: Yup.string()
      .email(t("enterValidEmail"))
      .required(t("emailRequired")),
    password: Yup.string()
      .min(5, t("passwordTooShort"))
      .max(25, t("passwordTooLong"))
      .required(t("passwordRequired"))
      .matches(/^[A-Za-z]*$/, t("passwordOnlyEnglish")),
    repeatpassword: Yup.string()
      .oneOf([Yup.ref("password"), null], t("repeatPasswordMustMatch"))
      .required(t("repeatPasswordRequired")),
  });
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordRepeatVisibility = () => {
    setshowPasswordRepeat(!showPasswordRepeat);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schemaValidation) });

  const submitForm = (data) => {
    const { email, password } = data;
    dispatch(signUp({ email, password }));
    //! reset form
  };

  return (
    <div className={styles.signUpForm}>
      <form onSubmit={handleSubmit(submitForm)}>
        <h2 className={styles.signUpFormTitle}>
          <span className={styles.header}>
            <LanguageSwitcher isRegistrationPage={true} />

          </span>
          {t("signUpTitle")}
        </h2>
        <div className={styles.signUpFormInputWrapper}>
          <label className={styles.signUpFormLabel}>
            {t("email")}
            <input
              className={`${styles.signUpFormInput} ${errors.email ? styles.signUpFormInputError : ""}`}
              {...register("email")}
              placeholder={t("enterEmail")}
            />
            {errors.email && (
              <p className={styles.signUpFormInputErrorMessage}>
                {errors.email.message}
              </p>
            )}
          </label>
          
          <label className={styles.signUpFormLabel}>
            <span>{t("password")}</span>
            <span className={styles.signUpFormIconInputWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                className={`${styles.signUpFormInput} ${errors.password ? styles.signUpFormInputError : ""}`}
                {...register("password")}
                placeholder={t("enterPassword")}
              />
              <button
                className={styles.signUpFormIconButton}
                type="button"
                onClick={togglePasswordVisibility}
              >
                <svg className={styles.signUpFormInputIcon}>
                  <use xlinkHref={svgSprite + (showPassword ? "#icon-eye" : "#icon-eye-off")} />
                </svg>
              </button>
            </span>
            {errors.password && (
              <p className={styles.signUpFormInputErrorMessage}>
                {errors.password.message}
              </p>
            )}
          </label>
          
          <label className={styles.signUpFormLabel}>
            <span>{t("repeatPassword")}</span>
            <span className={styles.signUpFormIconInputWrapper}>
              <input
                type={showPasswordRepeat ? "text" : "password"}
                className={`${styles.signUpFormInput} ${errors.repeatpassword ? styles.signUpFormInputError : ""}`}
                {...register("repeatpassword")}
                placeholder={t("repeatPassword")}
              />
              <button
                className={styles.signUpFormIconButton}
                type="button"
                onClick={togglePasswordRepeatVisibility}
              >
                <svg className={styles.signUpFormInputIcon}>
                  <use xlinkHref={svgSprite + (showPasswordRepeat ? "#icon-eye" : "#icon-eye-off")} />
                </svg>
              </button>
            </span>
            {errors.repeatpassword && (
              <p className={styles.signUpFormInputErrorMessage}>
                {errors.repeatpassword.message}
              </p>
            )}
          </label>
        </div>
          
        {isLoading ? (
          <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
            <LoaderComponent height={44} width={44} />
          </div>
        ) : (
          <div className={styles.signUpFormButtonContainer}>
            <button
              disabled={isLoading}
              className={styles.signUpFormButton}
              type="submit"
            >
              {t("signUp")}
            </button>
            <GoogleBtn />
          </div>
        )}
    
        <SignFormFooter
          text={t("alreadyHaveAccount")}
          link="/signin"
          linkName={t("signIn")}
        />
      </form>
    </div>

  );
};

export default SignUpForm;

