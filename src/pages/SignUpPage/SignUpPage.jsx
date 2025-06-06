import SignUpForm from "../../components/SignUpForm/SignUpForm";
import AdvantagesSection from "../../components/AdvantagesSection/AdvantagesSection";
import { useTranslation } from "react-i18next";
import styles from "./SignUpPage.module.css";

const SignUpPage = () => {
  const { t } = useTranslation();

  return (
    <>
        <SignUpForm />
        <AdvantagesSection />
    </>
  );
};

export default SignUpPage;
