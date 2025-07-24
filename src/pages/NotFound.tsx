import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-[60vh] flex flex-col justify-center items-center text-center px-6">
      <img src="/notfound.svg" alt="Not Found" className="w-60 mb-6" />
      <p className="text-gray-600 mb-6">{t("notFound.message")}</p>
      <Link to="/">
        <Button className="bg-blue-500 text-white hover:bg-blue-600">
          {t("notFound.backHome")}
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
