import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useAuthStore } from "../store/authStore";
import { useTranslation } from "react-i18next";
import SignIn from "../components/SignIn";
import { Button } from "../components/ui/button";
import { showErrorToast, showSuccessToast } from "../lib/toast";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/ui/spinner";
import DeleteModal from "../components/DeleteModal";

type Message = {
  id: string;
  title: string;
  sendDate: string;
  lang: "en" | "ja";
};

const MessageHistory = () => {
  const { user } = useAuthStore();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(
    null
  );
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDeleteConfirm = async () => {
    if (!selectedMessageId) return;

    try {
      await deleteDoc(doc(db, "messages", selectedMessageId));
      setMessages((prev) => prev.filter((msg) => msg.id !== selectedMessageId));
      showSuccessToast(t("history.deleted"));
    } catch (error) {
      console.error("削除エラー:", error);
      showErrorToast(t("history.deleteError"));
    } finally {
      setDialogOpen(false);
    }
  };

  const openDeleteDialog = (id: string) => {
    setSelectedMessageId(id);
    setDialogOpen(true);
  };

  useEffect(() => {
    const fetchMessages = async () => {
      if (!user) return;

      try {
        const q = query(
          collection(db, "messages"),
          where("userId", "==", user.uid),
          orderBy("sendDate", "desc")
        );

        const querySnapshot = await getDocs(q);
        const now = new Date();

        const fetched: Message[] = querySnapshot.docs
          .map((doc) => ({
            id: doc.id,
            title: doc.data().title,
            sendDate: doc.data().sendDate,
            lang: doc.data().lang,
          }))
          .filter((msg) => {
            const sendDate = new Date(msg.sendDate);
            return sendDate <= now;
          });

        setMessages(fetched);
      } catch (error) {
        console.error("メッセージ取得エラー:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [user]);

  if (!user) {
    return (
      <div className="max-w-xl mx-auto mt-10 bg-white shadow-md rounded-lg p-8 text-center border border-gray-200 space-y-6">
        <div className="flex flex-col items-center space-y-2">
          <span className="text-4xl">🔒</span>
          <h2 className="text-xl font-semibold text-gray-800">
            {t("history.requireLogin")}
          </h2>
        </div>
        <div className="flex justify-center">
          <SignIn />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        {t("history.title")}
        <span className="text-sm text-gray-500 font-normal">
          ({messages.length})
        </span>
      </h2>

      {loading ? (
        <div className="flex justify-center items-center h-[30vh]">
          <Spinner className="h-[30vh]" />
        </div>
      ) : messages.length === 0 ? (
        <div className="text-center text-gray-600 mt-12">
          <p className="text-lg mb-2">{t("history.empty")}</p>
          <p className="text-sm">📭 {t("history.comeBackLater")}</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {messages.map((msg) => (
            <li
              key={msg.id}
              className="rounded-xl bg-gradient-to-br from-white to-slate-50 border border-gray-200 p-5 flex justify-between items-center shadow-sm"
            >
              <div className="flex flex-col gap-1">
                <p className="text-base font-semibold text-gray-800">
                  {msg.title}
                </p>
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <span>
                    📅 {t("history.sentDate")}: {msg.sendDate}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => navigate(`/view/${msg.id}`)}
                >
                  {t("history.view")}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-red-500 border-red-300 hover:bg-red-50"
                  onClick={() => openDeleteDialog(msg.id)}
                >
                  {t("history.delete")}
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Delete Modal */}
      <DeleteModal
        open={dialogOpen}
        onCancel={() => setDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default MessageHistory;
