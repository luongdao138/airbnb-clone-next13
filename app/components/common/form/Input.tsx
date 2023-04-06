"use client";

import { merge } from "@/app/utils/tailwind-merge";
import { cva, VariantProps } from "class-variance-authority";
import clsx from "clsx";
import { FC, forwardRef, HTMLAttributes, InputHTMLAttributes } from "react";
import { BiDollar } from "react-icons/bi";

const inputProps = cva(
  "peer w-full p-4 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed",
  {
    variants: {
      format: {
        normal: ["pl-4"],
        price: ["pl-9"],
      },
      variant: {
        normal: ["border-neutral-300", "focus:border-black"],
        error: ["border-rose-500", "focus:border-rose-500"],
      },
    },
    defaultVariants: {
      format: "normal",
      variant: "normal",
    },
  }
);
interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputProps> {
  label?: string;
}

const Input: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  ({ className, format, variant, label, ...props }, ref) => {
    const isPriceFormat = format === "price";
    const isError = variant === "error";

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={props.id || props.name}
            className={clsx(
              "text-md mb-1 block",
              isError ? "text-rose-500" : "text-zinc-400"
            )}
          >
            {label}
          </label>
        )}
        <div className="w-full relative">
          {isPriceFormat && (
            <BiDollar
              size={24}
              className="text-neutral-700 absolute top-1/2 -translate-y-1/2 left-2"
            />
          )}
          <input
            {...props}
            id={props.id || props.name}
            ref={ref}
            className={merge(inputProps({ format, variant }), className)}
          />
        </div>
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
