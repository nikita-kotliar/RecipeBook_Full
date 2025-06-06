import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  updateUserProfile,
  uploadUserPhoto,
} from "../../redux/auth/operations.js";
import {
  selectIsLoading,
  selectIsLoadingPhoto,
  selectUser,
  selectUserPhoto,
} from "../../redux/auth/selectors.js";
import css from "./UserSettingsForm.module.css";
import svg from "../../assets/icons.svg";
import svgSprite from "../../assets/icons.svg";
import LoaderComponent from "../LoaderComponent/LoaderComponent.jsx";

const UserSettingsForm = ({ handleClose }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const isLoadingPhoto = useSelector(selectIsLoadingPhoto);
  const user = useSelector(selectUser);
  const avatar = useSelector(selectUserPhoto);
  const [showPassword, setShowPassword] = useState(false);
  const [hasPassword, setHasPassword] = useState(!!user.password);

  const aboutRef = useRef(null);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const autoResizeTextarea = (el) => {
    if (el) {
      el.style.height = "48px";
      el.style.padding = "10px 10px 15px 10px";
      const scrollHeight = el.scrollHeight;
      const lineHeight = 20;
      const maxHeight = lineHeight * 10;
      el.style.height = Math.min(scrollHeight, maxHeight) + "px";
    }
  };

  const schema = yup.object({
    name: yup
      .string()
      .min(2, t("nameMinCharacters"))
      .max(20, t("nameMaxCharacters"))
      .required(t("nameRequired")),
    about: yup.string().max(500, t("aboutMaxCharacters")),
    password: yup
      .string()
      .test("password-conditional-validation", t("passwordTooShort"), function (value) {
        if (!value || value.trim() === "") return true;
        return value.length >= 5;
      })
      .max(25, t("passwordMaxCharacters"))
      .matches(/^[A-Za-z]*$/, t("passwordOnlyEnglish")),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], t("passwordsMustMatch"))
      .when("password", {
        is: (val) => val && val.length > 0,
        then: (schema) => schema.required(t("confirmPasswordRequired")),
        otherwise: (schema) => schema.notRequired(),
      }),
  });

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: user.email,
      name: user.name,
      about: user.about || "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const onSubmit = (data) => {
    const cleanedData = {
      email: data.email,
      name: data.name,
      about: data.about,
    };

    if (data.password && data.password.trim() !== "") {
      cleanedData.password = data.password;
    }

    dispatch(updateUserProfile(cleanedData)).then(() => {
      setValue("password", "");
      setValue("confirmPassword", "");
      if (cleanedData.password) {
        setHasPassword(true);
      }
    });
  };

  const handleAvatarChange = (e) => {
    const formData = new FormData();
    const file = e.target.files[0];
    if (file) {
      formData.append("avatar", file);
      dispatch(uploadUserPhoto(formData));
    }
  };

  useEffect(() => {
    autoResizeTextarea(aboutRef.current);
  }, [user.about]);

  return (
    <>
      <div className={css.userAvatar}>
        {!isLoadingPhoto ? (
          <img
            src={avatar || "/img/avatar-placeholder.jpg"}
            alt="User's photo"
          />
        ) : (
          <div className={css.loader}>
            <LoaderComponent />
          </div>
        )}
        <label>
          <div className={css.uploadContainer}>
            <svg className={css.icon}>
              <use xlinkHref={svg + "#icon-upload"}></use>
            </svg>
            <span className={css.ordinaryText}>{t("uploadPhoto")}</span>
          </div>
          <input
            className={css.hideBtn}
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
          />
          {errors.avatar && <p>{errors.avatar.message}</p>}
        </label>
      </div>
      {isLoading && (
        <span className={css.loaderWrapper}>
          <LoaderComponent />
        </span>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && e.target.tagName !== "TEXTAREA") {
            e.preventDefault();
          }
        }}
        className={css.userSettingForm}
      >
        <div className={css.userPreferences}>
          <div className={css.formNameEmail}>
            <label>
              <span className={css.boldText}>{t("yourName")}</span>
              <Controller
                render={({ field }) => (
                  <input
                    {...field}
                    className={css.inputBox}
                    placeholder={t("placeholderName")}
                  />
                )}
                name="name"
                control={control}
              />
              {errors.name && (
                <p className={css.errorMessage}>{errors.name.message}</p>
              )}
            </label>

            <label>
              <span className={css.boldText}>{t("email")}</span>
              <input
                disabled
                {...register("email")}
                className={css.inputBox}
                placeholder={t("placeholderEmail")}
              />
            </label>
          </div>

          <div className={css.formAbout}>
            <label>
              <span className={css.boldText}>{t("aboutYou")}</span>
              <Controller
                name="about"
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    ref={aboutRef}
                    className={css.inputBox}
                    placeholder={t("placeholderAbout")}
                    onInput={(e) => {
                      const value = e.target.value.slice(0, 500); 
                      field.onChange(value);
                      autoResizeTextarea(aboutRef.current);
                    }}
                  />
                )}
              />

              {errors.about && (
                <p className={css.errorMessage}>{errors.about.message}</p>
              )}
            </label>

            <label>
              <span className={css.boldText}>{t("password")}</span>
              <span>
                <input
                  type={showPassword ? "text" : "password"}
                  className={
                    errors.password?.message
                      ? css.signUpInputError
                      : css.inputBox
                  }
                  {...register("password")}
                  onInput={(e) => (e.target.value = e.target.value.trimStart())}
                  placeholder={
                    hasPassword ? t("enterNewPassword") : t("setPassword")
                  }
                />
                <button
                  className={css.passwordIconBtn}
                  type="button"
                  onClick={togglePasswordVisibility}
                >
                  <svg className={css.passwordIcon}>
                    <use
                      xlinkHref={
                        showPassword
                          ? svgSprite + "#icon-eye"
                          : svgSprite + "#icon-eye-off"
                      }
                    />
                  </svg>
                </button>
              </span>
              {hasPassword && (
                <p className={css.infoText}>{t("leaveBlankToKeepOld")}</p>
              )}
              {errors.password?.message && (
                <p className={css.signUpErrorMessage}>
                  {errors.password.message}
                </p>
              )}
            </label>

            {watch("password")?.length > 0 && (
              <label>
                <span className={css.boldText}>{t("confirmPassword")}</span>
                <input
                  type="password"
                  className={
                    errors.confirmPassword?.message
                      ? css.signUpInputError
                      : css.inputBox
                  }
                  {...register("confirmPassword")}
                  placeholder={t("confirmPassword")}
                />
                {errors.confirmPassword?.message && (
                  <p className={css.signUpErrorMessage}>
                    {errors.confirmPassword.message}
                  </p>
                )}
              </label>
            )}
          </div>
        </div>

        <button
          disabled={isLoading}
          type="submit"
          className={`${css.submitBtn} ${css.boldTextBtn}`}
        >
          {t("save")}
        </button>

      </form>
    </>
  );
};

export default UserSettingsForm;
