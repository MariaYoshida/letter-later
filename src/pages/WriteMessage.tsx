import { useForm, Controller } from "react-hook-form";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { messageSchema } from "../validation/messageSchema";
import { useTranslation } from "react-i18next";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ja, enGB } from "date-fns/locale";
import { format } from "date-fns";
import {
  showErrorToast,
  showSuccessToast,
  showWarningToast,
} from "../lib/toast";
import { Button } from "../components/ui/button";
import Spinner from "../components/ui/spinner";

type FormData = z.infer<typeof messageSchema>;

const WriteMessage = () => {
  const { t, i18n } = useTranslation();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    watch,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(messageSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      body: "",
      sendDate: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    if (!user) {
      showWarningToast(t("form.requireLogin"));
      return;
    }

    try {
      await addDoc(collection(db, "messages"), {
        userId: user.uid,
        title: data.title,
        body: data.body,
        sendDate: data.sendDate,
        lang: i18n.language === "ja" ? "ja" : "en",
        createdAt: serverTimestamp(),
      });

      showSuccessToast(t("form.submitted"));
      reset();
      navigate("/history");
    } catch (error) {
      console.error("Firestore write failed:", error);
      showErrorToast(t("form.submitFailed"));
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-gradient-to-br from-white to-amber-50 border border-amber-200 rounded-lg shadow-md p-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-amber-600">
          {t("form.writeMessageTitle")}
        </h2>
        <p className="text-sm text-gray-600">{t("form.subText")}</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium mb-1 text-gray-700"
          >
            {t("form.to")}
          </label>
          <input
            id="title"
            type="text"
            {...register("title")}
            className="w-full border border-amber-300 px-4 py-2 rounded focus:ring-2 focus:ring-amber-400 outline-none"
          />
          {errors.title && (
            <p className="text-sm text-red-600 mt-1">
              {t(errors.title.message || "")}
            </p>
          )}
        </div>

        {/* messageBody */}
        <div>
          <label
            htmlFor="body"
            className="block text-sm font-medium mb-1 text-gray-700"
          >
            {t("form.message")}
          </label>
          <textarea
            id="body"
            rows={6}
            {...register("body")}
            className="w-full border border-amber-300 px-4 py-2 rounded resize-none focus:ring-2 focus:ring-amber-400 outline-none"
          />
          {errors.body && (
            <p className="text-sm text-red-600 mt-1">
              {t(errors.body.message || "")}
            </p>
          )}
        </div>

        {/* Schedule Date */}
        <div>
          <label
            htmlFor="sendDate"
            className="block text-sm font-medium mb-1 text-gray-700"
          >
            {t("form.date")}
          </label>
          <Controller
            control={control}
            name="sendDate"
            render={({ field }) => (
              <DatePicker
                id="sendDate"
                selected={field.value ? new Date(field.value) : null}
                onChange={(date) => {
                  const formatted =
                    date instanceof Date ? format(date, "yyyy-MM-dd") : "";
                  field.onChange(formatted);
                }}
                dateFormat="yyyy-MM-dd"
                minDate={new Date()}
                locale={i18n.language === "ja" ? ja : enGB}
                className="w-full border border-amber-300 px-4 py-2 rounded focus:ring-2 focus:ring-amber-400 outline-none"
                placeholderText={t("form.selectDate")}
              />
            )}
          />
          {errors.sendDate && (
            <p className="text-sm text-red-600 mt-1">
              {t(errors.sendDate.message || "")}
            </p>
          )}
        </div>

        {/* Language（unselectable） */}
        <div>
          <label
            htmlFor="lang"
            className="block text-sm font-medium mb-1 text-gray-700"
          >
            {t("form.language")}
          </label>
          <select
            id="lang"
            value={i18n.language === "ja" ? "ja" : "en"}
            disabled
            className="w-full border border-amber-200 px-4 py-2 rounded bg-gray-100 text-gray-600"
          >
            <option value="en">English</option>
            <option value="ja">日本語</option>
          </select>
        </div>

        {/* Login Required Warn */}
        {!user && (
          <div className="p-4 bg-red-100 border-l-4 border-red-300 text-yellow-800 rounded">
            <p className="text-sm">{t("form.loginRequiredMessage")}</p>
          </div>
        )}

        {/* Send Button */}
        <Button
          type="submit"
          disabled={!isValid || isSubmitting}
          className="w-full bg-amber-400 text-white font-semibold py-2 px-4 rounded-full hover:bg-amber-500 transition-all disabled:opacity-50"
        >
          {t("form.send")}
        </Button>
      </form>

      {/* Loading Spinner */}
      {isSubmitting && (
        <div className="flex justify-center mt-4">
          <Spinner />
        </div>
      )}

      {/* Live Preview */}
      {watch("body") && (
        <div className="border-t border-amber-100 pt-6 text-sm italic text-gray-600 whitespace-pre-line">
          <p>{watch("body")}</p>
        </div>
      )}
    </div>
  );
};

export default WriteMessage;
