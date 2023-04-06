"use client";

import Image from "next/image";
import { FC, forwardRef, HTMLAttributes } from "react";

interface AvatarProps extends HTMLAttributes<HTMLImageElement> {}

const Avatar: FC<AvatarProps> = forwardRef<HTMLImageElement, AvatarProps>(
  ({ placeholder, ...props }, ref) => {
    return (
      <Image
        {...props}
        ref={ref}
        className="rounded-full"
        width={30}
        height={30}
        alt="avatar"
        src="/images/placeholder.jpg"
      />
    );
  }
);

Avatar.displayName = "Avatar";

export default Avatar;
