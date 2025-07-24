import { useTranslation } from "react-i18next";
import { Card, CardContent } from "./ui/card";
import { features } from "./data/featuresData";

const Features = () => {
  const { t } = useTranslation();

  return (
    <section>
      <h3 className="text-xl font-semibold text-gray-800 mb-8 text-center relative inline-block after:content-[''] after:block after:w-12 after:h-[3px] after:bg-pink-400 after:mx-auto after:mt-2">
        {t("home.featuresTitle")}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Card
              key={feature.titleKey}
              className={`transition-transform hover:scale-[1.03] hover:shadow-lg border-none bg-gradient-to-br ${feature.bgColor} ${feature.shadowColor}`}
            >
              <CardContent className="p-6 text-center space-y-3">
                <Icon className={`w-8 h-8 mx-auto ${feature.iconColor}`} />
                <h3 className="font-bold text-lg text-gray-800">
                  {t(feature.titleKey)}
                </h3>
                <p className="text-sm text-gray-600">{t(feature.descKey)}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

export default Features;
