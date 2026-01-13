import React, { useState } from "react";
import { User, Mail, Lock } from "lucide-react";

export default function LoginForm({ onSubmit, onSwitchToRegister }) {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState({
    identifier: false,
    password: false,
  });

  const getFieldError = (field) => {
    if (!touched[field]) return null;
    if (field === "identifier" && !identifier.trim())
      return "Username atau email wajib diisi";
    if (field === "password" && !password.trim()) return "Password wajib diisi";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ identifier: true, password: true });

    if (!identifier.trim() || !password.trim()) return;

    setError("");
    setLoading(true);
    const result = await onSubmit(identifier, password);
    setLoading(false);

    if (!result.success) {
      setError(result.error);
    }
  };

  const getInputClass = (field) => {
    const base =
      "w-full pl-11 pr-4 py-3 rounded-xl border outline-none transition";
    if (getFieldError(field)) {
      return `${base} border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20`;
    }
    return `${base} border-gray-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20`;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Username atau Email
        </label>
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, identifier: true }))}
            className={getInputClass("identifier")}
            placeholder="Masukkan username atau email"
          />
        </div>
        {getFieldError("identifier") && (
          <p className="text-red-500 text-xs mt-1">
            {getFieldError("identifier")}
          </p>
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
            placeholder="Masukkan password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? (
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
        </div>
        {getFieldError("password") && (
          <p className="text-red-500 text-xs mt-1">
            {getFieldError("password")}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="w-4 h-4 rounded border-gray-300 text-sky-500 focus:ring-sky-500"
          />
          <span className="text-sm text-gray-600">Ingat saya</span>
        </label>
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
          "Masuk"
        )}
      </button>

      <p className="text-center text-sm text-gray-500">
        Belum punya akun?{" "}
        <button
          type="button"
          onClick={onSwitchToRegister}
          className="text-sky-500 hover:underline font-medium cursor-pointer"
        >
          Daftar
        </button>
      </p>
    </form>
  );
}
