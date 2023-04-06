"use client";

import { FC, forwardRef, HTMLAttributes } from "react";

interface MenuItemProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  onClick: () => void;
}

const MenuItem: FC<MenuItemProps> = forwardRef<HTMLDivElement, MenuItemProps>(
  ({ label, ...props }, ref) => {
    return (
      <div
        ref={ref}
        {...props}
        className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
      >
        {label}
      </div>
    );
  }
);

MenuItem.displayName = "MenuItem";

export default MenuItem;
