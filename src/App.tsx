import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import WriteMessage from "./pages/WriteMessage";
import MessageHistory from "./pages/MessageHistory";
import MessageDetail from "./pages/MessageDetail";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useAuthStore } from "./store/authStore";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";

const App = () => {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      useAuthStore.getState().setUser(user);
    });

    return () => unsubscribe();
  }, []);
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-stone-50">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/write" element={<WriteMessage />} />
            <Route path="/history" element={<MessageHistory />} />
            <Route path="/view/:id" element={<MessageDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster position="top-center" />
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
