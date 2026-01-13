import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useToast } from "../../../shared/components/Toast";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import DarkVeil from "../components/DarkVeil";
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
      setTimeout(() => navigate("/setup"), 2000);
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
      <div className="hidden lg:flex lg:w-1/2 bg-black relative overflow-hidden flex-col justify-between p-12">
        <div className="absolute inset-0 z-0">
          <DarkVeil hueShift={7} />
        </div>

        <div className="relative z-10 pointer-events-none">
          <p className="text-gray-400 font-medium tracking-widest uppercase text-sm border-l-2 border-primary pl-3">
            Platform Kuis
          </p>
        </div>

        <div className="relative z-10 text-white pointer-events-none">
          <h1 className="text-9xl font-black text-white tracking-tighter mb-6">
            QuiSip
          </h1>
          <h2 className="text-xl font-bold text-white">
            Asah otak dan raih skor tertinggi.
          </h2>
          <p className="text-gray-400 text-md opacity-90 max-w-lg">
            Tantang dirimu dengan ribuan pertanyaan seru dari berbagai kategori.
          </p>
        </div>

        <p className="relative z-10 text-gray-500 text-sm font-medium pointer-events-none flex items-center gap-2">
          Dot Intern - alfitsani
        </p>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 md:p-8 bg-gray-50/50">
        <div className="w-full max-w-md bg-white p-6 md:p-10 rounded-2xl md:rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
          <div className="text-center mb-5 md:mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-1 md:mb-2 tracking-tight">
              {isLogin ? "Masuk" : "Daftar"}
            </h2>
            <p className="text-gray-500 text-sm md:text-base">
              {isLogin
                ? "Masuk kembali ke akun QuiSip kamu"
                : "Mulai perjalanan kuis sekarang"}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {isLogin ? (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
              >
                <LoginForm
                  onSubmit={handleLogin}
                  onSwitchToRegister={() => setIsLogin(false)}
                />
              </motion.div>
            ) : (
              <motion.div
                key="register"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <RegisterForm
                  onSubmit={handleRegister}
                  onSwitchToLogin={() => setIsLogin(true)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
