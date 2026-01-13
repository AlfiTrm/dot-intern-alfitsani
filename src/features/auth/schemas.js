import { z } from "zod";

export const loginSchema = z.object({
  identifier: z.string().min(1, "Username atau email wajib diisi"),
  password: z.string().min(1, "Password wajib diisi"),
  rememberMe: z.boolean().optional(),
});

export const registerSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username minimal 3 karakter")
      .regex(/^[a-zA-Z0-9_]+$/, "Hanya huruf, angka, dan underscore"),
    email: z
      .string()
      .min(1, "Email wajib diisi")
      .email("Format email tidak valid"),
    password: z
      .string()
      .min(8, "Password minimal 8 karakter")
      .regex(/[a-z]/, "Harus ada huruf kecil")
      .regex(/[A-Z]/, "Harus ada huruf besar")
      .regex(/\d/, "Harus ada angka")
      .regex(/[!@#$%^&*(),.?":{}|<>]/, "Harus ada karakter spesial"),
    confirmPassword: z.string().min(1, "Konfirmasi password wajib diisi"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password tidak cocok",
    path: ["confirmPassword"],
  });
