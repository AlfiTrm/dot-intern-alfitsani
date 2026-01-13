import React, { useState, useMemo } from "react";
import { User, Mail, Lock } from "lucide-react";

export default function RegisterForm({ onSubmit, onSwitchToLogin }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState({
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const passwordStrength = useMemo(() => {
    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;
    return score;
  }, [password]);

  const strengthLabel = [
    "",
    "Sangat Lemah",
    "Lemah",
    "Cukup",
    "Kuat",
    "Sangat Kuat",
  ][passwordStrength];
  const strengthColor = [
    "",
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-green-400",
    "bg-green-500",
  ][passwordStrength];

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const getFieldError = (field) => {
    if (!touched[field]) return null;
    if (field === "username") {
      if (!username.trim()) return "Username wajib diisi";
      if (username.length < 3) return "Username minimal 3 karakter";
      if (!/^[a-zA-Z0-9_]+$/.test(username))
        return "Username hanya boleh huruf, angka, dan underscore";
    }
    if (field === "email") {
      if (!email.trim()) return "Email wajib diisi";
      if (!validateEmail(email)) return "Format email tidak valid";
    }
    if (field === "password") {
      if (!password.trim()) return "Password wajib diisi";
      if (password.length < 6) return "Password minimal 6 karakter";
      if (!/[a-z]/.test(password))
        return "Password harus mengandung huruf kecil";
      if (!/[A-Z]/.test(password))
        return "Password harus mengandung huruf besar";
      if (!/\d/.test(password)) return "Password harus mengandung angka";
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
        return "Password harus mengandung karakter spesial";
    }
    if (field === "confirmPassword") {
      if (!confirmPassword.trim()) return "Konfirmasi password wajib diisi";
      if (password !== confirmPassword) return "Password tidak cocok";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({
      username: true,
      email: true,
      password: true,
      confirmPassword: true,
    });
    setError("");

    const hasErrors = ["username", "email", "password", "confirmPassword"].some(
      (f) => getFieldError(f)
    );
    if (hasErrors) return;

    setLoading(true);
    const result = await onSubmit(username, email, password);
    setLoading(false);

    if (!result.success) {
      setError(result.error);
    }
  };

  const getInputClass = (field, hasIcon = true) => {
    const base = `w-full ${
      hasIcon ? "pl-11" : "pl-4"
    } pr-4 py-3 rounded-xl border outline-none transition`;
    if (getFieldError(field)) {
      return `${base} border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20`;
    }
    return `${base} border-gray-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20`;
  };

  const EyeIcon = ({ show, onClick }) => (
    <button
      type="button"
      onClick={onClick}
      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
    >
      {show ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
      )}
    </button>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Username
        </label>
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, username: true }))}
            className={getInputClass("username")}
            placeholder="Pilih username"
          />
        </div>
        {getFieldError("username") && (
          <p className="text-red-500 text-xs mt-1">
            {getFieldError("username")}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Email
        </label>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, email: true }))}
            className={getInputClass("email")}
            placeholder="contoh@email.com"
          />
        </div>
        {getFieldError("email") && (
          <p className="text-red-500 text-xs mt-1">{getFieldError("email")}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, password: true }))}
            className={`${getInputClass("password")} pr-12`}
            placeholder="Buat password"
          />
          <EyeIcon
            show={showPassword}
            onClick={() => setShowPassword(!showPassword)}
          />
        </div>
        {password && (
          <div className="mt-2">
            <div className="flex gap-1 h-1.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className={`flex-1 rounded-full ${
                    i <= passwordStrength ? strengthColor : "bg-gray-200"
                  }`}
                />
              ))}
            </div>
            <p
              className={`text-xs mt-1 ${
                passwordStrength >= 4
                  ? "text-green-600"
                  : passwordStrength >= 2
                  ? "text-yellow-600"
                  : "text-red-500"
              }`}
            >
              {strengthLabel}
            </p>
          </div>
        )}
        {getFieldError("password") && (
          <p className="text-red-500 text-xs mt-1">
            {getFieldError("password")}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Konfirmasi Password
        </label>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type={showConfirm ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, confirmPassword: true }))}
            className={`${getInputClass("confirmPassword")} pr-12`}
            placeholder="Ulangi password"
          />
          <EyeIcon
            show={showConfirm}
            onClick={() => setShowConfirm(!showConfirm)}
          />
        </div>
        {getFieldError("confirmPassword") && (
          <p className="text-red-500 text-xs mt-1">
            {getFieldError("confirmPassword")}
          </p>
        )}
      </div>

      {error && (
        <p className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-xl transition disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Memproses...
          </>
        ) : (
          "Daftar"
        )}
      </button>

      <p className="text-center text-sm text-gray-500">
        Sudah punya akun?{" "}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-sky-500 hover:underline font-medium cursor-pointer"
        >
          Masuk
        </button>
      </p>
    </form>
  );
}
