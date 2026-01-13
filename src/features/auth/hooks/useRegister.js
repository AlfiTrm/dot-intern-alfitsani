import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../schemas";

export const useRegister = (submitCallback) => {
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const form = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setServerError("");

    const result = await submitCallback(
      data.username,
      data.email,
      data.password
    );

    setLoading(false);
    if (!result.success) {
      setServerError(result.error);
    }
  };

  return {
    form,
    loading,
    serverError,
    submitHandler: form.handleSubmit(onSubmit),
  };
};
