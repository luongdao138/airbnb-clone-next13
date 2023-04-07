import { toast } from "react-hot-toast";

export function getInputVariant(errors: any, key: string): "error" | "normal" {
  if (key in errors) {
    return "error";
  }

  return "normal";
}

export function handleError(error: any) {
  const errorMsg = error?.response?.data?.msg;
  if (errorMsg) {
    toast.error(errorMsg);
    return;
  }

  toast.error("Something went wrong!");
}
