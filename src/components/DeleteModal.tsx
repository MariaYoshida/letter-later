import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../components/ui/dialog";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { useTranslation } from "react-i18next";

const MotionDiv = motion.div;

const DeleteModal = ({
  open,
  onCancel,
  onConfirm,
}: {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) => {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent className="w-[90%] max-w-sm border border-red-200 bg-white/80 backdrop-blur-md shadow-lg rounded-2xl">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.25 }}
          className="text-center px-6 py-6"
        >
          {/* Icon */}
          <div className="mt-1 mb-4 flex justify-center">
            <div className="w-14 h-14 bg-red-100 text-red-500 text-2xl rounded-full flex items-center justify-center shadow-inner">
              ⚠️
            </div>
          </div>

          {/* Header */}
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-gray-800">
              {t("history.confirmDeleteTitle")}
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-600 mt-2">
              {t("history.confirmDelete")}
            </DialogDescription>
          </DialogHeader>

          {/* Action Buttons */}
          <div className="mt-5 flex justify-center gap-4">
            <Button variant="outline" onClick={onCancel}>
              {t("cancel")}
            </Button>
            <Button
              variant="destructive"
              className="bg-red-500 hover:bg-red-600 text-white"
              onClick={onConfirm}
            >
              {t("delete")}
            </Button>
          </div>
        </MotionDiv>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
