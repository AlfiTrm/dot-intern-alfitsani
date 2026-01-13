import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../shared/components/Toast";
import useAuth from "./useAuth";

export default function useAuthScreen() {
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

  const switchToLogin = () => setIsLogin(true);
  const switchToRegister = () => setIsLogin(false);

  return {
    isLogin,
    handleLogin,
    handleRegister,
    switchToLogin,
    switchToRegister,
  };
}
