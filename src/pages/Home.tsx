import { useTranslation } from "react-i18next";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import Feedback from "../components/Feedback";
import Features from "../components/Features";

// Typewriter hook to simulate typing effect
const useTypewriter = (text: string, speed = 100) => {
  const [displayed, setDisplayed] = useState("");
  const [index, setIndex] = useState(0);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setDisplayed("");
    setIndex(0);
  }, [text]);

  useEffect(() => {
    if (index >= text.length) return;
    const timeout = setTimeout(() => {
      setDisplayed((prev) => prev + text.charAt(index));
      setIndex((prev) => prev + 1);
    }, speed);
    return () => clearTimeout(timeout);
  }, [index, text, speed]);

  return { displayed, isComplete: index >= text.length };
};

const BlinkingCursor = () => (
  <span className="inline-block w-[1ch] animate-blink text-black">|</span>
);

const Home = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  const fullTitle = useMemo(() => t("home.title"), [t]);
  const fullDesc = useMemo(() => t("home.description"), [t]);

  const { displayed: title, isComplete: isTitleComplete } = useTypewriter(
    fullTitle,
    150
  );
  const [startDesc, setStartDesc] = useState(false);
  const { displayed: description } = useTypewriter(
    startDesc ? fullDesc : "",
    80
  );

  useEffect(() => {
    if (!isTitleComplete) {
      setStartDesc(false);
      return;
    }
    const cursorDelay = setTimeout(() => setStartDesc(true), 3000);
    return () => clearTimeout(cursorDelay);
  }, [isTitleComplete]);

  const titleMinHeight = useMemo(() => {
    if (currentLang === "ja") {
      return "min-h-[5rem] sm:min-h-[3rem]";
    } else {
      return "min-h-[5rem] sm:min-h-[3rem]";
    }
  }, [currentLang]);

  const descMinHeight = useMemo(() => {
    if (currentLang === "ja") {
      return "min-h-[3.5rem] sm:min-h-[2rem]";
    } else {
      return "min-h-[5.5rem] sm:min-h-[2rem]";
    }
  }, [currentLang]);

  return (
    <div className="p-6 space-y-10 max-w-4xl mx-auto">
      {/* title&description */}
      <div>
        <h2 className={`text-3xl sm:text-4xl font-bold mb-2 ${titleMinHeight}`}>
          {title}
          {!startDesc && <BlinkingCursor />}
        </h2>
        <div className={`${descMinHeight} transition-opacity duration-700`}>
          <p
            className={`text-gray-700 text-lg sm:text-xl ${
              startDesc ? "opacity-100" : "opacity-0"
            } transition-opacity duration-700`}
          >
            {description}
            {startDesc && <BlinkingCursor />}
          </p>
        </div>
      </div>

      {/* CTA Button */}
      <div className="text-center">
        <Link to="/write">
          <Button
            size="lg"
            className=" hover:scale-105 transition-transform text-lg px-6 py-3 rounded-full bg-blue-200 hover:bg-blue-400 text-black shadow"
          >
            ✍️ {t("home.cta")}
          </Button>
        </Link>
      </div>

      {/* Feature Introduction Card */}
      <Features />

      {/* Client Feedback */}
      <Feedback />
    </div>
  );
};

export default Home;
