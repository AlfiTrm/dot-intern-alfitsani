import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useToast } from "../../../shared/components/Toast";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import useAuth from "../hooks/useAuth";

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleLogin = async (identifier, password) => {
    const result = login(identifier, password);
    if (result.success) {
      showToast("Login berhasil! Mengalihkan...", "success", 2000);
      setTimeout(() => navigate("/quiz"), 2000);
    } else {
      showToast(result.error, "error", 3000);
    }
    return result;
  };

  const handleRegister = async (username, email, password) => {
    const result = register(username, email, password);
    if (result.success) {
      showToast("Akun berhasil dibuat! Silakan masuk.", "success", 2000);
      setTimeout(() => setIsLogin(true), 2000);
    } else {
      showToast(result.error, "error", 3000);
    }
    return result;
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-sky-500 to-sky-600 p-12 flex-col justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white">QuiSip</h1>
          <p className="text-sky-100 mt-2">Gas tes pemahamanmu!</p>
        </div>

        <div className="text-white">
          <h2 className="text-3xl font-bold mb-4">
            Siap untuk menguji pengetahuanmu?
          </h2>
          <p className="text-sky-100 text-lg">
            Jawab pertanyaan dari berbagai kategori dan lihat seberapa pintar
            kamu!
          </p>
        </div>

        <p className="text-sky-200 text-sm">intern dot - alfitsani</p>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8 text-center">
            <h1 className="text-3xl font-bold text-sky-500">QuiSip</h1>
            <p className="text-gray-500 mt-1">Gas tes pemahamanmu!</p>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {isLogin ? "Selamat Datang!" : "Buat Akun"}
          </h2>
          <p className="text-gray-500 mb-6">
            {isLogin ? "Masuk untuk mulai kuis" : "Daftar untuk mulai kuis"}
          </p>

          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? "login" : "register"}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {isLogin ? (
                <LoginForm
                  onSubmit={handleLogin}
                  onSwitchToRegister={() => setIsLogin(false)}
                />
              ) : (
                <RegisterForm
                  onSubmit={handleRegister}
                  onSwitchToLogin={() => setIsLogin(true)}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
