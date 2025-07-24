import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useAuthStore } from "../store/authStore";
import { useTranslation } from "react-i18next";
import { Button } from "../components/ui/button";

const SignOut = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const { t } = useTranslation();

  const handleSignout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Signout failed:", error);
    }
  };

  return (
    <Button
      onClick={handleSignout}
      className="bg-gray-500 text-white hover:bg-gray-400 h-8 px-4 py-2 rounded text-sm"
    >
      {t("signout")}
    </Button>
  );
};

export default SignOut;
