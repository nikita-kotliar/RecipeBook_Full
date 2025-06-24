
import { useTranslation } from "react-i18next";
import Joyride from "react-joyride";
import { enableBody, styles } from "./onboardingStyles";

const TourSteps = ({ children }) => {
  const { t } = useTranslation();

  const steps = [
    {
      target: "body", 
      content: (
        <div style={{ textAlign: "center" }}>
          <h2>{t("greatingH")}</h2>
          <p>{t("greatingP")}</p>
        </div>
      ),
      placement: "center",
    },
    {
      target: ".first-step",
      content: t("first-step"),
      placement: "right",
    },
    {
      target: ".second-step",
      content: t("second-step"),
      placement: "right",
    },
    {
      target: ".third-step",
      content: t("third-step"),
      placement: "right",
    },
    {
      target: ".four-step",
      content: t("fourth-step"),
      placement: "right",
    },
    {
      target: ".five-step",
      content: t("fifth-step"),
      placement: "right",
    },
    {
      target: ".six-step",
      content: t("sixth-step"),
      placement: "right",
    },
    {
      content: (
        <div style={{ textAlign: "center" }}>
          <h2>{t("endingH")}</h2>
        </div>
      ),
      placement: "center",
    },
  ];

  return (
    <>
      <Joyride
        steps={steps}
        disableScrolling={true} 
        callback={(data) => {
          if (data.status === "finished" || data.status === "skipped") {
            enableBody(); 
          }
        }}
        styles={styles} 
        showProgress={true} 
        showSkipButton={true} 
        continuous={true} 
        run={true} 
        locale={{
          back: t("back"),
          close: t("close"),
          last: t("last"),
          next: t("next"),
          skip: t("skip"),
        }}
      />
      {children}
    </>
  );
};

export default TourSteps;
