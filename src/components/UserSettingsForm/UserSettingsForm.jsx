import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
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
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import LoaderComponent from "../LoaderComponent/LoaderComponent.jsx";

const UserSettingsForm = ({ handleClose }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const isLoadingPhoto = useSelector(selectIsLoadingPhoto);
  const user = useSelector(selectUser);
  const avatar = useSelector(selectUserPhoto);
  // console.log("UserSettingsForm avatar:", avatar);

  const schema = yup.object({
    name: yup
      .string()
      .min(2, "Name must contain at least 2 characters")
      .max(60, t("nameMaxCharacters"))
      .required(t("nameRequired")),
    about: yup.string().max(500, t("aboutMaxCharacters")),
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: user.email,
      name: user.name,
      about: user.about || "",
    },
    mode: "onChange",
  });

  const onSubmit = (data) => {
    dispatch(updateUserProfile(data)).then(({ error }) => {
      if (!error) {
        handleClose();
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

      <form onSubmit={handleSubmit(onSubmit)} className={css.userSettingForm}>


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
                render={({ field }) => (
                  <textarea
                    {...field}
                    className={css.inputBox}
                    placeholder={t("placeholderAbout")}
                  />
                )}
                name="about"
                control={control}
              />
              {errors.about && (
                <p className={css.errorMessage}>{errors.about.message}</p>
              )}
            </label>
          </div>
        </div>

        <button
          disabled={isLoading}
          type="submit"
          className={`${css.submitBtn} ${css.boldTextBtn}`}
        >
          {t("save")}
          {isLoading && (
            <div className={css.loaderWrapper}>
              <LoaderComponent height={56} width={56} />
            </div>
          )}
        </button>
      </form>
    </>
  );
};

export default UserSettingsForm;
