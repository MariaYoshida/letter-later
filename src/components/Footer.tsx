const Footer = () => {
  return (
    <footer className="border-t border-gray-200 mt-12 pt-6 pb-8 text-center text-sm text-gray-500">
      <p>&copy; {new Date().getFullYear()} LetterLater. All rights reserved.</p>
      <p className="mt-1 text-xs text-gray-400">
        Some images used on this site are provided by{" "}
        <a
          href="https://unsplash.com"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          Unsplash
        </a>{" "}
        and their photographers.
      </p>
      <p className="mt-1 text-xs text-gray-400">
        Built with ❤️ by Maria Yoshida
      </p>
    </footer>
  );
};

export default Footer;
