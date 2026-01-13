import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schemas";

export const useLogin = (submitCallback) => {
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setServerError("");
    try {
      const result = await submitCallback(data.identifier, data.password);

      setLoading(false);
      if (!result.success) {
        setServerError(result.error);
      }
    } catch (error) {
      setLoading(false);
      setServerError("An unexpected error occurred.");
      console.error("Login submission error:", error);
    }
  };

  return {
    form,
    loading,
    serverError,
    submitHandler: form.handleSubmit(onSubmit),
  };
};
