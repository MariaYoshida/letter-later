import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Card } from "./ui/card";
import { feedback } from "./data/feedbackData";

const Feedback = () => {
  const { t } = useTranslation();

  return (
    <div className="mt-16">
      <h3 className="text-xl font-semibold text-gray-800 mb-8 text-center relative inline-block after:content-[''] after:block after:w-12 after:h-[3px] after:bg-sky-400 after:mx-auto after:mt-2">
        {t("home.feedback.title")}
      </h3>

      <Swiper
        spaceBetween={16}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1.2 },
          768: { slidesPerView: 2.0 },
          1024: { slidesPerView: 3 },
        }}
        modules={[Pagination]}
        pagination={{ clickable: true }}
        className="pb-10"
      >
        {feedback.map((tData) => (
          <SwiperSlide key={tData.id}>
            <Card className="p-4 bg-white shadow-lg hover:shadow-xl transition-shadow rounded-2xl min-h-[220px] border border-blue-200">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={tData.avatar}
                  alt={tData.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-800">{tData.name}</p>
                  <p className="text-sm text-gray-500">
                    {t(tData.locationKey)}
                  </p>
                </div>
              </div>
              <p className="text-gray-700 text-sm mb-5 italic">
                “{t(tData.messageKey)}”
              </p>
              <p className="text-sm text-gray-600">
                {t("home.feedback.recommend")}:{" "}
                <span className="text-yellow-500">
                  {"★".repeat(tData.recommended)}
                </span>
                {"☆".repeat(5 - tData.recommended)}
              </p>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Feedback;
