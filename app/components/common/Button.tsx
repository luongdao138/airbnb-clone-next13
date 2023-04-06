"use client";

import { merge } from "@/app/utils/tailwind-merge";
import { cva, VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes, FC, forwardRef, HTMLAttributes } from "react";
import type { IconType } from "react-icons";

const buttonProps = cva(
  "relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80",
  {
    variants: {
      variant: {
        outlined: ["bg-white", "border border-black", "text-black"],
        contained: ["bg-rose-500", "border-rose-500", "text-white"],
      },
      size: {
        small: ["py-1", "text-sm", "font-light", "border"],
        medium: ["py-3", "text-md", "font-semibold", "border-2"],
      },
      fullWith: {
        full: ["w-full"],
        none: [""],
      },
    },
    defaultVariants: {
      variant: "contained",
      size: "medium",
      fullWith: "full",
    },
  }
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonProps> {
  children: React.ReactNode;
  icon?: IconType;
}

const Button: FC<ButtonProps> = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, disabled, className, variant, size, icon: Icon, ...props }) => {
    return (
      <button
        disabled={Boolean(disabled)}
        className={merge(className, buttonProps({ variant, size }))}
        {...props}
      >
        {Icon && <Icon size={24} className="absolute left-4 top-3" />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
