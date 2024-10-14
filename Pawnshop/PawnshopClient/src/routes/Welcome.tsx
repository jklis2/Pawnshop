import { useTranslation } from "react-i18next";

export default function Welcome() {
  const { t } = useTranslation("welcome");

  return (
    <div>
      <h1 className="text-2xl font-bold">{t("title")}</h1>
      <p>{t("description")}</p>
    </div>
  );
}
