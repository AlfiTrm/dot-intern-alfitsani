import { AlertTriangle, Info, CheckCircle } from "lucide-react";

export const MODAL_VARIANTS = {
  danger: {
    icon: AlertTriangle,
    iconColor: "text-red-500",
    confirmClass: "bg-red-500 hover:bg-red-600 text-white",
  },
  success: {
    icon: CheckCircle,
    iconColor: "text-green-500",
    confirmClass: "bg-green-500 hover:bg-green-600 text-white",
  },
  info: {
    icon: Info,
    iconColor: "text-sky-500",
    confirmClass: "bg-sky-500 hover:bg-sky-600 text-white",
  },
  default: {
    icon: null,
    iconColor: "",
    confirmClass: "bg-sky-500 hover:bg-sky-600 text-white",
  },
};
