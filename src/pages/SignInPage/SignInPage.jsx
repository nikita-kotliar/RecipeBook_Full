import AdvantagesSection from "../../components/AdvantagesSection/AdvantagesSection.jsx";
import SignInForm from "../../components/SignInForm/SignInForm.jsx";
import styles from "./SignInPage.module.css";
import { useTranslation } from "react-i18next";

const SignInPage = () => {
  const { t } = useTranslation();
  return (
    <>
        <SignInForm />
        <AdvantagesSection />
    </>
  );
};

export default SignInPage;
