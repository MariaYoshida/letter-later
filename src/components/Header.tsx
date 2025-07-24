import { useTranslation } from "react-i18next";
import { useAuthStore } from "../store/authStore";
import SignIn from "./SignIn";
import SignOut from "./SignOut";
import { Link, useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../components/ui/dropdown-menu";
import { Button } from "../components/ui/button";
import { Mail, Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const { user } = useAuthStore();
  const [menuOpen, setMenuOpen] = useState(false);

  const currentLang = i18n.language;

  const changeLanguage = (lang: "en" | "ja") => {
    i18n.changeLanguage(lang);
    setMenuOpen(false);
  };

  const navItems = [
    { path: "/", label: t("nav.home") },
    { path: "/write", label: t("nav.write") },
    { path: "/history", label: t("nav.history") },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4 sm:px-6 py-3">
        {/* Logo and Title */}
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-brand font-semibold text-blue-600"
        >
          <Mail className="w-6 h-6" />
          LetterLater
        </Link>

        {/* Switching Mobile Menu */}
        <Button
          className="sm:hidden p-2 rounded-md border shadow transition hover:bg-gray-100 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          variant="ghost"
        >
          {menuOpen ? (
            <X className="w-6 h-6 text-blue-600" />
          ) : (
            <Menu className="w-6 h-6 text-gray-600" />
          )}
        </Button>

        {/* PC Menu */}
        <div className="hidden sm:flex items-center gap-4 text-sm">
          {navItems.map(({ path, label }) => {
            const isActive = location.pathname === path;
            return (
              <Link to={path} key={path}>
                <span
                  className={`px-2 py-1 border-b-2 transition-all ${
                    isActive
                      ? "text-blue-800 font-semibold border-blue-600"
                      : "text-gray-600 border-transparent hover:text-blue-600 hover:border-blue-400"
                  }`}
                >
                  {label}
                </span>
              </Link>
            );
          })}

          {/* Language */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                {currentLang === "ja" ? "🇯🇵 日本語" : "🇬🇧 EN"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => changeLanguage("en")}>
                🇬🇧 English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => changeLanguage("ja")}>
                🇯🇵 日本語
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Auth */}
          {user ? <SignOut /> : <SignIn />}
        </div>
      </div>

      {/* Mobile Menu Contents */}
      {menuOpen && (
        <div className="sm:hidden border-t px-4 py-3 space-y-3 bg-white">
          {navItems.map(({ path, label }) => (
            <Link
              to={path}
              key={path}
              onClick={() => setMenuOpen(false)}
              className={`block border-l-4 pl-2 ${
                location.pathname === path
                  ? "border-blue-600 text-blue-800 font-semibold"
                  : "border-transparent text-gray-700 hover:border-blue-400 hover:text-blue-600"
              }`}
            >
              {label}
            </Link>
          ))}

          <div className="flex justify-between items-center pt-2 border-t mt-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  {currentLang === "ja" ? "🇯🇵 日本語" : "🇬🇧 EN"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem onClick={() => changeLanguage("en")}>
                  🇬🇧 English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage("ja")}>
                  🇯🇵 日本語
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {user ? <SignOut /> : <SignIn />}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
