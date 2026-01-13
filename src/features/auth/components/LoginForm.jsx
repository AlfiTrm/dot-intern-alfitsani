import React from "react";
import { User, Lock } from "lucide-react";
import Button from "../../../shared/components/Button";
import FormInput from "./FormInput";
import { useLogin } from "../hooks";

export default function LoginForm({ onSubmit, onSwitchToRegister }) {
  const { form, loading, serverError, submitHandler } = useLogin(onSubmit);
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <form
      onSubmit={submitHandler}
      className="space-y-4 md:space-y-5 animate-fade-in"
    >
      <FormInput
        label="Username atau Email"
        name="identifier"
        placeholder="Masukkan username atau email"
        icon={User}
        register={register}
        error={errors.identifier}
      />

      <FormInput
        label="Password"
        name="password"
        type="password"
        placeholder="Masukkan password"
        icon={Lock}
        register={register}
        error={errors.password}
      />

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            {...register("rememberMe")}
            type="checkbox"
            className="w-3.5 h-3.5 md:w-4 md:h-4 rounded border-gray-300 text-sky-500 focus:ring-sky-500"
          />
          <span className="text-xs md:text-sm text-gray-600">Ingat saya</span>
        </label>
      </div>

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
        Masuk
      </Button>

      <p className="text-center text-xs md:text-sm text-gray-500">
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
