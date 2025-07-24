import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "../store/authStore";
import { showWarningToast } from "../lib/toast";
import { Button } from "../components/ui/button";
import Spinner from "../components/ui/spinner";

type Message = {
  title: string;
  body: string;
  sendDate: string;
  lang: "en" | "ja";
};

const MessageDetail = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const [message, setMessage] = useState<Message | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        if (!id) throw new Error("No ID provided");

        const ref = doc(db, "messages", id);
        const snapshot = await getDoc(ref);

        if (!snapshot.exists()) {
          navigate("/notfound");
          return;
        }

        const data = snapshot.data();

        if (!user || data.userId !== user.uid) {
          showWarningToast(t("view.unauthorized"));
          navigate("/history");
          return;
        }

        const now = new Date();
        const sendDate = new Date(data.sendDate);

        if (sendDate > now) {
          showWarningToast(t("view.notYet"));
          navigate("/history");
          return;
        }

        setMessage({
          title: data.title,
          body: data.body,
          sendDate: data.sendDate,
          lang: data.lang,
        });
      } catch (error) {
        console.error("Error in fetchMessage:", error);
        navigate("/notfound");
      } finally {
        setLoading(false);
      }
    };

    if (user !== undefined) {
      fetchMessage();
    }
  }, [id, navigate, t, user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Spinner className="h-[30vh]" />
      </div>
    );
  }
  if (!message) return null;

  return (
    <div className="p-6 max-w-2xl mt-10 mx-auto bg-white rounded-lg shadow">
      <div className="text-center mb-6">
        <div className="text-5xl mb-2">📬</div>
        <p className="text-gray-500 text-sm italic">
          {t("view.openingMessage")}
        </p>
      </div>
      <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4">
        {message.title}
      </h2>

      <div className="text-sm text-gray-600 mb-4 flex gap-4 items-center">
        <span>
          📅 {t("view.sentDate")}: {message.sendDate}
        </span>
        <span title={message.lang === "ja" ? "Japanese" : "English"}>
          {message.lang === "ja" ? "🇯🇵" : "🇬🇧"}
        </span>
      </div>

      <hr className="mb-4" />

      <div className="bg-yellow-50 border border-yellow-100 rounded-md p-4 sm:p-6 whitespace-pre-wrap font-serif leading-relaxed text-gray-800 text-lg shadow-inner">
        {message.body}
      </div>

      <Link to="/history">
        <Button variant="ghost" className="text-blue-600 hover:underline mt-5">
          ← {t("view.backToHistory")}
        </Button>
      </Link>
    </div>
  );
};

export default MessageDetail;
