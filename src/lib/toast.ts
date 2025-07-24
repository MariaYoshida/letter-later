import { toast } from "react-hot-toast";

export const showSuccessToast = (message: string) => {
  toast.success(message);
};

export const showErrorToast = (message: string) => {
  toast.error(message);
};

export const showWarningToast = (message: string) => {
  toast(message, {
    icon: "⚠️",
    style: {
      background: "#fef3c7",
      color: "#92400e",
      border: "1px solid #fde68a",
    },
  });
};
