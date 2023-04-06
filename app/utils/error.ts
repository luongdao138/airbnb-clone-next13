export function getInputVariant(errors: any, key: string): "error" | "normal" {
  if (key in errors) {
    return "error";
  }

  return "normal";
}
