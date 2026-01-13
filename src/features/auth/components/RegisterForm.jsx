import React from "react";
import { User, Mail, Lock } from "lucide-react";
import Button from "../../../shared/components/Button";
import FormInput from "./FormInput";
import PasswordStrengthMeter from "./PasswordStrengthMeter";
import { useRegister } from "../hooks";

export default function RegisterForm({ onSubmit, onSwitchToLogin }) {
  const { form, loading, serverError, submitHandler } = useRegister(onSubmit);
  const {
    register,
    watch,
    formState: { errors },
  } = form;
  const password = watch("password", "");

  return (
    <form
      onSubmit={submitHandler}
      className="space-y-3 md:space-y-4 animate-fade-in"
    >
      <FormInput
        label="Username"
        name="username"
        placeholder="Pilih username"
        icon={User}
        register={register}
        error={errors.username}
      />

      <FormInput
        label="Email"
        name="email"
        type="email"
        placeholder="contoh@email.com"
        icon={Mail}
        register={register}
        error={errors.email}
      />

      <div>
        <FormInput
          label="Password"
          name="password"
          type="password"
          placeholder="Buat password"
          icon={Lock}
          register={register}
          error={errors.password}
        />
        <PasswordStrengthMeter password={password} />
      </div>

      <FormInput
        label="Konfirmasi Password"
        name="confirmPassword"
        type="password"
        placeholder="Ulangi password"
        icon={Lock}
        register={register}
        error={errors.confirmPassword}
      />

      {serverError && (
        <p className="text-red-500 text-sm bg-red-50 p-3 rounded-lg flex items-center gap-2">
          {serverError}
        </p>
      )}

      <Button
        type="submit"
        isLoading={loading}
        loadingText="Memproses..."
        fullWidth
      >
        Daftar
      </Button>

      <p className="text-center text-xs md:text-sm text-gray-500">
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
