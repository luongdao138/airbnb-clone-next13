import { twMerge } from "tailwind-merge";
import { ClassNameValue } from "tailwind-merge/dist/lib/tw-join";

export function merge(...rest: ClassNameValue[]) {
  return twMerge(rest);
}
