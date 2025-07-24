import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "../store/authStore";
import { Button } from "../components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import Spinner from "../components/ui/spinner";

const SignIn = () => {
  const { t } = useTranslation();
  const setUser = useAuthStore((state) => state.setUser);

  const [loading, setLoading] = useState(false);

  const handleSignin = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      disabled={loading}
      onClick={handleSignin}
      className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded hover:bg-gray-300 text-sm text-gray-700 h-8"
    >
      {loading ? (
        <div className="flex justify-center items-center h-[30vh]">
          <Spinner className="h-[30vh]" />
        </div>
      ) : (
        <>
          <FcGoogle size={18} /> {t("signin.google")}
        </>
      )}
    </Button>
  );
};

export default SignIn;
